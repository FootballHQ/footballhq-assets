/* ============================================================
   TURF V89.22 — WORKER PROFILE AUTHORITY
   The Worker-authenticated profile is the source of truth for legacy TURF
   profile/pass/shop surfaces. No polling, no server fetches, no navigation.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_AUTH_PROFILE_AUTHORITY_WORKER__)return;
window.__TURF_AUTH_PROFILE_AUTHORITY_WORKER__=true;

var PROFILE_KEY='turfAuthenticatedProfileV8921';
function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function authProfile(){
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__}catch(e){}
  var p=readJSON(PROFILE_KEY);return p&&p.token?p:null;
}
function coins(p){return Math.max(0,Number(p&&(p.hqCoins||p.coins))||0)}
function paint(p){
  if(!p)return;var n=coins(p);
  ['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins','turfTopCoins'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=String(n)});
  try{localStorage.setItem('footballHQCoinDisplayV2',String(n))}catch(e){}
}
function patchGetAccountProfile(){
  if(typeof window.getAccountProfile!=='function'||window.getAccountProfile.__turfWorkerProfile)return;
  var original=window.getAccountProfile;
  var wrapped=function(){var p=authProfile();return p||original.apply(this,arguments)};
  wrapped.__turfWorkerProfile=true;window.getAccountProfile=wrapped;
}
function patchPass(){
  if(typeof window.fhqRenderPass!=='function'||window.fhqRenderPass.__turfWorkerProfile)return;
  var original=window.fhqRenderPass;
  var wrapped=function(profile){var p=authProfile()||profile;var out=original.call(this,p);paint(p);return out};
  wrapped.__turfWorkerProfile=true;window.fhqRenderPass=wrapped;
}
function patchShop(){
  if(typeof window.__turfCurrentShopRender!=='function'||window.__turfCurrentShopRender.__turfWorkerProfile)return;
  var original=window.__turfCurrentShopRender;
  var wrapped=function(x){x=x||{};var p=authProfile();if(p)x.profile=p;var out=original.call(this,x);paint(p);return out};
  wrapped.__turfWorkerProfile=true;window.__turfCurrentShopRender=wrapped;
}
function patchAll(){patchGetAccountProfile();patchPass();patchShop()}
function apply(){patchAll();paint(authProfile())}

window.addEventListener('turf:auth-ready',function(){apply();setTimeout(apply,120)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
