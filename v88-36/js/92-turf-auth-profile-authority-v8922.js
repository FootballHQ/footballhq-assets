/* ============================================================
   TURF V89.22 — AUTH PROFILE AUTHORITY
   Fixes Pass/Shop using stale Guest/local profile after Google sign-in.
   Makes the authenticated profile the source of truth for getAccountProfile,
   Pass rendering, Shop rendering, and coin displays across navigation.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_AUTH_PROFILE_AUTHORITY_8922__)return;
window.__TURF_AUTH_PROFILE_AUTHORITY_8922__=true;

var PROFILE_KEY='turfAuthenticatedProfileV8921';
var TOKEN_KEY='turfAuthenticatedTokenV8921';

function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function authProfile(){
  var p=readJSON(PROFILE_KEY);
  var token='';try{token=String(localStorage.getItem(TOKEN_KEY)||'').trim()}catch(e){}
  if(p&&p.token&&token&&String(p.token)===token&&!/^Guest(?:-|$)/i.test(String(p.username||'')))return p;
  if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token&&!/^Guest(?:-|$)/i.test(String(window.__TURF_AUTH_PROFILE__.username||'')))return window.__TURF_AUTH_PROFILE__;
  return null;
}
function coins(p){return Math.max(0,Number(p&&p.hqCoins)||0)}
function paint(p){
  if(!p)return;
  var n=coins(p);
  ['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=String(n)});
  try{localStorage.setItem('footballHQCoinDisplayV2',String(n))}catch(e){}
}
function authoritativeProfile(){return authProfile()}

function patchGetAccountProfile(){
  if(typeof window.getAccountProfile!=='function'||window.getAccountProfile.__turf8922)return;
  var original=window.getAccountProfile;
  var wrapped=function(){
    var p=authoritativeProfile();
    if(p)return p;
    return original.apply(this,arguments);
  };
  wrapped.__turf8922=true;
  window.getAccountProfile=wrapped;
}

function patchPass(){
  if(typeof window.fhqRenderPass!=='function'||window.fhqRenderPass.__turf8922)return;
  var original=window.fhqRenderPass;
  var wrapped=function(profile){
    var p=authoritativeProfile()||profile;
    var out=original.call(this,p);
    setTimeout(function(){paint(p)},0);
    setTimeout(function(){paint(p)},120);
    return out;
  };
  wrapped.__turf8922=true;
  window.fhqRenderPass=wrapped;
}

function patchShop(){
  if(typeof window.__turfCurrentShopRender==='function'&&!window.__turfCurrentShopRender.__turf8922){
    var original=window.__turfCurrentShopRender;
    var wrapped=function(x){
      x=x||{};
      var p=authoritativeProfile();
      if(p)x.profile=p;
      var out=original.call(this,x);
      if(p)paint(p);
      return out;
    };
    wrapped.__turf8922=true;
    window.__turfCurrentShopRender=wrapped;
  }
}

function rerenderVisible(){
  var p=authoritativeProfile();
  if(!p)return;
  paint(p);
  try{
    var pass=document.getElementById('fhqPassPage');
    if(pass&&pass.offsetParent!==null&&typeof window.fhqRenderPass==='function')window.fhqRenderPass(p);
  }catch(e){}
  try{
    var shop=document.getElementById('fhqShopPage');
    if(shop&&shop.offsetParent!==null&&typeof window.__turfCurrentShopRender==='function')window.__turfCurrentShopRender({profile:p});
  }catch(e){}
}

function patchAll(){patchGetAccountProfile();patchPass();patchShop()}
function boot(){patchAll();rerenderVisible()}

setInterval(function(){
  patchAll();
  var p=authoritativeProfile();
  if(!p)return;
  var global=document.getElementById('fhqGlobalCoins');
  var shop=document.getElementById('fhqShopCoins');
  var pass=document.getElementById('fhqPassCoins');
  var n=String(coins(p));
  if(global&&String(global.textContent||'').trim()!==n)global.textContent=n;
  if(shop&&String(shop.textContent||'').trim()!==n)shop.textContent=n;
  if(pass&&String(pass.textContent||'').trim()!==n)pass.textContent=n;
},300);

document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest?e.target.closest('[data-fhq-nav="pass"],[data-fhq-nav="shop"],[data-shop-filter]'):null;
  if(!t)return;
  [0,80,220,600].forEach(function(ms){setTimeout(function(){patchAll();rerenderVisible()},ms)});
},true);

window.addEventListener('turf:auth-ready',function(){[0,80,250].forEach(function(ms){setTimeout(function(){patchAll();rerenderVisible()},ms)})});

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
