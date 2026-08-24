/* ============================================================
   TURF v89.26 — LEGACY IDENTITY COMPATIBILITY (WORKER-AUTH SAFE)
   Copies the verified Worker identity into the legacy stores old TURF code
   still reads. Never reloads the page, never fetches auth, never navigates.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_LEGACY_IDENTITY_WORKER__)return;
window.__TURF_LEGACY_IDENTITY_WORKER__=true;

var AUTH_PROFILE_KEY='turfAuthenticatedProfileV8921';
var AUTH_TOKEN_KEY='turfAuthenticatedTokenV8921';
var LEGACY_TOKEN_KEY='footballHQSharedAccountTokenV1';
var LEGACY_VAULT_KEY='footballHQIdentityVaultV1';
var LEGACY_STABLE_KEY='footballHQStableGuestIdentityV1';
var LEGACY_USERNAME_KEY='footballHQSharedUsernameV1';
var LEGACY_PROFILE_KEY='footballHQAccountProfileV2';

function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function profile(){
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__}catch(e){}
  var p=readJSON(AUTH_PROFILE_KEY);return p&&p.token?p:null;
}
function merge(p){
  var old=readJSON(LEGACY_PROFILE_KEY)||{},out={};
  Object.keys(old).forEach(function(k){out[k]=old[k]});Object.keys(p||{}).forEach(function(k){out[k]=p[k]});
  out.token=String(p.token||'');out.username=String(p.username||out.username||'');out.hqCoins=Number(p.hqCoins||p.coins||0);
  out.points=Number(p.points||0);out.totalDailies=Number(p.totalDailies||0);out.streakDays=Number(p.streakDays||0);out.dailyWins=Number(p.dailyWins||p.totalDailies||0);
  out.inventory=Array.isArray(p.inventory)?p.inventory:[];out.collection=Array.isArray(p.collection)?p.collection:[];out.achievementIds=Array.isArray(p.achievementIds)?p.achievementIds:[];
  return out;
}
function persist(p){
  if(!p||!p.token)return;
  var token=String(p.token),name=String(p.username||''),copy=merge(p);
  try{
    var vault=readJSON(LEGACY_VAULT_KEY)||{primary:'',known:[]};
    var known=Array.isArray(vault.known)?vault.known.map(String).filter(Boolean):[];if(known.indexOf(token)<0)known.unshift(token);
    vault.primary=token;vault.known=known.filter(function(x,i,a){return a.indexOf(x)===i});
    localStorage.setItem(AUTH_TOKEN_KEY,token);localStorage.setItem(AUTH_PROFILE_KEY,JSON.stringify(copy));
    localStorage.setItem(LEGACY_VAULT_KEY,JSON.stringify(vault));localStorage.setItem(LEGACY_TOKEN_KEY,token);sessionStorage.setItem(LEGACY_TOKEN_KEY,token);
    localStorage.setItem(LEGACY_USERNAME_KEY,name);localStorage.setItem(LEGACY_STABLE_KEY,JSON.stringify({token:token,username:name,savedAt:Date.now()}));
    localStorage.setItem(LEGACY_PROFILE_KEY,JSON.stringify(copy));document.cookie='fhq_identity='+encodeURIComponent(token)+'; path=/; max-age=31536000; SameSite=Lax';
  }catch(e){}
  try{window.__FHQ_PROFILE__=copy;window.__TURF_AUTH_TOKEN__=token;window.__TURF_AUTH_PROFILE__=copy;window.fhqCurrentAccount=copy}catch(e){}
}
function apply(p){persist(p||profile())}
window.addEventListener('turf:auth-ready',function(e){apply(e&&e.detail&&e.detail.profile?e.detail.profile:null)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply()},{once:true});else apply();
})();
