/* ============================================================
   TURF v89.40 — WORKER ACCOUNT CONTINUITY + HOME ALIGNMENT
   The Worker-authenticated profile is authoritative. This file only mirrors
   that profile into legacy stores/surfaces still used by the existing TURF UI.
   No Apps Script account lookup, no polling, no reloads, no navigation.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACCOUNT_CONTINUITY_WORKER__)return;
window.__TURF_ACCOUNT_CONTINUITY_WORKER__=true;

var AUTH_PROFILE_KEY='turfAuthenticatedProfileV8921';
var AUTH_TOKEN_KEY='turfAuthenticatedTokenV8921';
var WRAPPER_TOKEN_KEY='turfAuthAccountTokenV1';
var LEGACY_TOKEN_KEY='footballHQSharedAccountTokenV1';
var LEGACY_VAULT_KEY='footballHQIdentityVaultV1';
var LEGACY_STABLE_KEY='footballHQStableGuestIdentityV1';
var LEGACY_USERNAME_KEY='footballHQSharedUsernameV1';
var LEGACY_PROFILE_KEY='footballHQAccountProfileV2';
var workerProfile=null;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function current(){
  if(workerProfile&&workerProfile.token)return workerProfile;
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__}catch(e){}
  var p=readJSON(AUTH_PROFILE_KEY);return p&&p.token?p:null;
}
function persist(p){
  if(!p||!p.token)return;
  var token=String(p.token),name=String(p.username||''),copy={};try{Object.keys(p).forEach(function(k){copy[k]=p[k]})}catch(e){copy=p}copy.token=token;copy.savedAt=Date.now();
  try{
    localStorage.setItem(AUTH_TOKEN_KEY,token);localStorage.setItem(WRAPPER_TOKEN_KEY,token);localStorage.setItem(LEGACY_TOKEN_KEY,token);
    sessionStorage.setItem(AUTH_TOKEN_KEY,token);sessionStorage.setItem(LEGACY_TOKEN_KEY,token);localStorage.setItem(LEGACY_USERNAME_KEY,name);
    localStorage.setItem(AUTH_PROFILE_KEY,JSON.stringify(copy));localStorage.setItem(LEGACY_PROFILE_KEY,JSON.stringify(copy));localStorage.setItem(LEGACY_STABLE_KEY,JSON.stringify({token:token,username:name,savedAt:Date.now()}));
    var vault=readJSON(LEGACY_VAULT_KEY)||{primary:'',known:[]},known=Array.isArray(vault.known)?vault.known.map(String).filter(Boolean):[];
    if(known.indexOf(token)<0)known.unshift(token);vault.primary=token;vault.known=known.filter(function(x,i,a){return a.indexOf(x)===i});localStorage.setItem(LEGACY_VAULT_KEY,JSON.stringify(vault));
  }catch(e){}
  try{window.__TURF_AUTH_TOKEN__=token;window.__TURF_AUTH_PROFILE__=copy;window.__FHQ_PROFILE__=copy;window.fhqCurrentAccount=copy}catch(e){}
}
function applySurfaces(p){
  if(!p)return;
  var vals={fhqProfileName:p.username||'PLAYER',fhqProfileLifetimePoints:Number(p.points||0),fhqProfileDailyWins:Number(p.dailyWins||0),fhqProfileDailies:Number(p.totalDailies||0),fhqProfileStreak:Number(p.streakDays||0),fhqAccountName:p.username||'PLAYER'};
  Object.keys(vals).forEach(function(id){var el=q('#'+id);if(el)el.textContent=String(vals[id])});
  var sub=q('#fhqProfileSub');if(sub)sub.textContent=(p.equippedTitle?String(p.equippedTitle)+' • ':'')+'Level '+Number(p.level||1)+' • TURF account';
  var n=Math.max(0,Number(p.hqCoins||p.coins)||0);['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins','turfTopCoins'].forEach(function(id){var el=q('#'+id);if(el)el.textContent=String(n)});
}
function patchRuntime(){
  if(typeof window.fhqGetToken==='function'&&!window.fhqGetToken.__turfWorkerContinuity){var old=window.fhqGetToken,fn=function(){var p=current();return p&&p.token?String(p.token):old.apply(this,arguments)};fn.__turfWorkerContinuity=true;window.fhqGetToken=fn}
  if(typeof window.getAccountProfile==='function'&&!window.getAccountProfile.__turfWorkerContinuity){var oldP=window.getAccountProfile,fp=function(){return current()||oldP.apply(this,arguments)};fp.__turfWorkerContinuity=true;window.getAccountProfile=fp}
}
function addCss(){
  var old=q('#turfV8940Css');if(old)old.remove();var st=document.createElement('style');st.id='turfV8940Css';
  st.textContent='#fhqHome .fhq-home-inner{box-sizing:border-box!important;width:100%!important;max-width:1160px!important}#fhqHome .fhq-hero{box-sizing:border-box!important;width:100%!important;max-width:none!important;min-width:0!important;grid-column:1/-1!important;margin-left:0!important;margin-right:0!important}#fhqHome .fhq-hero>img,#fhqHome .fhq-hero .turf-approved-hero,#fhqHome .fhq-hero [class*="hero-logo"]{max-width:100%!important}';
  (document.head||document.documentElement).appendChild(st);
}
function accept(p){if(!p||!p.token)return;workerProfile=p;persist(p);patchRuntime();applySurfaces(p)}
function run(){addCss();patchRuntime();var p=current();if(p){persist(p);applySurfaces(p)}}
window.addEventListener('turf:auth-ready',function(e){accept(e&&e.detail&&e.detail.profile?e.detail.profile:current())});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();

/* Load the single authoritative Active Players visual/game layer.
   IMPORTANT: bump the query whenever that file changes so Safari/GitHub Pages
   cannot keep serving an older cached prototype. */
(function(){
  if(window.__TURF_V8973_VISUAL_LOADER__)return;
  window.__TURF_V8973_VISUAL_LOADER__=true;
  var old=document.querySelector('script[data-turf-active-players-loader]');
  if(old)try{old.remove()}catch(e){}
  var s=document.createElement('script');
  s.setAttribute('data-turf-active-players-loader','8973');
  s.src='https://footballhq.github.io/footballhq-assets/v88-36/js/105-turf-active-players-cinematic-v8951.js?v=8973';
  s.async=false;
  (document.head||document.documentElement).appendChild(s);
})();