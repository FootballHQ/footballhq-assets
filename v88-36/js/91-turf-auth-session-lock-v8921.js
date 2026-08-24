/* ============================================================
   TURF V89.21 — WORKER SESSION COMPATIBILITY
   Worker auth is authoritative. Preserve the authenticated profile for legacy
   TURF surfaces without polling Apps Script or intercepting navigation.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_AUTH_SESSION_LOCK_WORKER__)return;
window.__TURF_AUTH_SESSION_LOCK_WORKER__=true;

var PROFILE_KEY='turfAuthenticatedProfileV8921';
var TOKEN_KEY='turfAuthenticatedTokenV8921';

function readJSON(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch(e){return null}}
function isProfile(p){return !!(p&&p.token)}
function current(){
  try{if(isProfile(window.__TURF_AUTH_PROFILE__))return window.__TURF_AUTH_PROFILE__}catch(e){}
  var p=readJSON(PROFILE_KEY);return isProfile(p)?p:null;
}
function remember(p){
  if(!isProfile(p))return;
  try{localStorage.setItem(TOKEN_KEY,String(p.token));localStorage.setItem(PROFILE_KEY,JSON.stringify(p));localStorage.setItem('turfAuthAccountTokenV1',String(p.token))}catch(e){}
  try{sessionStorage.setItem(TOKEN_KEY,String(p.token))}catch(e){}
}
function paint(p){
  if(!p)return;var n=Math.max(0,Number(p.hqCoins||p.coins)||0);
  ['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins','turfTopCoins'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=String(n)});
  try{localStorage.setItem('footballHQCoinDisplayV2',String(n))}catch(e){}
}
function patchToken(){
  if(typeof window.fhqGetToken!=='function'||window.fhqGetToken.__turfWorkerSession)return;
  var old=window.fhqGetToken;
  var fn=function(){var p=current();return p&&p.token?String(p.token):old.apply(this,arguments)};
  fn.__turfWorkerSession=true;window.fhqGetToken=fn;
}
function apply(p){if(!p)p=current();if(!p)return;remember(p);paint(p);patchToken()}

window.addEventListener('turf:auth-ready',function(e){apply(e&&e.detail&&e.detail.profile?e.detail.profile:null)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){patchToken();apply()},{once:true});else{patchToken();apply()}
})();
