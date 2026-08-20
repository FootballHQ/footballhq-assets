/* ============================================================
   TURF v89.26 — LEGACY IDENTITY BRIDGE
   Root fix for split identity after Google auth.

   Problem fixed:
   - authenticated overlay knows FootballHeadquarters / correct coins
   - legacy runtime still holds an older guest token
   - leaderboard/collections/locker/rewards therefore read Guest/YOU

   Strategy:
   1) Only act after a verified non-Guest authenticated profile exists.
   2) Write that token/profile into every legacy identity store the old app reads.
   3) Populate the legacy local account/cosmetics cache.
   4) If the legacy token was different, reload ONCE so the original lexical
      fhqGetToken() initializes with the authenticated token from first paint.

   Non-destructive: no account rows, purchases, cards, rewards or stats are written.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_LEGACY_IDENTITY_BRIDGE_8926__)return;
window.__TURF_LEGACY_IDENTITY_BRIDGE_8926__=true;

var AUTH_PROFILE_KEY='turfAuthenticatedProfileV8921';
var AUTH_TOKEN_KEY='turfAuthenticatedTokenV8921';
var LEGACY_TOKEN_KEY='footballHQSharedAccountTokenV1';
var LEGACY_VAULT_KEY='footballHQIdentityVaultV1';
var LEGACY_STABLE_KEY='footballHQStableGuestIdentityV1';
var LEGACY_USERNAME_KEY='footballHQSharedUsernameV1';
var LEGACY_PROFILE_KEY='footballHQAccountProfileV2';
var RELOAD_PREFIX='turf8926Reloaded:';

function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function authProfile(){
  var p=null,t='';
  try{p=readJSON(AUTH_PROFILE_KEY);t=String(localStorage.getItem(AUTH_TOKEN_KEY)||'').trim()}catch(e){}
  if(p&&p.token&&t&&String(p.token)===t&&!/^Guest(?:-|$)/i.test(String(p.username||'')))return p;
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token&&!/^Guest(?:-|$)/i.test(String(window.__TURF_AUTH_PROFILE__.username||'')))return window.__TURF_AUTH_PROFILE__}catch(e){}
  return null;
}
function currentLegacyToken(){
  try{return String(localStorage.getItem(LEGACY_TOKEN_KEY)||sessionStorage.getItem(LEGACY_TOKEN_KEY)||'').trim()}catch(e){return ''}
}
function mergeProfileForLegacy(p){
  var old=readJSON(LEGACY_PROFILE_KEY)||{};
  var out={};Object.keys(old||{}).forEach(function(k){out[k]=old[k]});
  Object.keys(p||{}).forEach(function(k){out[k]=p[k]});
  out.username=String(p.username||out.username||'');
  out.points=Number(p.points||0);
  out.totalDailies=Number(p.totalDailies||0);
  out.streakDays=Number(p.streakDays||0);
  out.dailyWins=Number(p.dailyWins||p.totalDailies||0);
  out.hqCoins=Number(p.hqCoins||0);
  out.inventory=Array.isArray(p.inventory)?p.inventory:[];
  out.collection=Array.isArray(p.collection)?p.collection:[];
  out.achievementIds=Array.isArray(p.achievementIds)?p.achievementIds:[];
  out.token=String(p.token||'');
  return out;
}
function persist(p){
  if(!p||!p.token)return false;
  var token=String(p.token),name=String(p.username||'');
  var before=currentLegacyToken();
  try{
    var vault=readJSON(LEGACY_VAULT_KEY)||{primary:'',known:[]};
    var known=Array.isArray(vault.known)?vault.known.map(String).filter(Boolean):[];
    if(known.indexOf(token)<0)known.unshift(token);
    known=known.filter(function(x,i,a){return a.indexOf(x)===i});
    vault.primary=token;vault.known=known;
    localStorage.setItem(LEGACY_VAULT_KEY,JSON.stringify(vault));
    localStorage.setItem(LEGACY_TOKEN_KEY,token);
    sessionStorage.setItem(LEGACY_TOKEN_KEY,token);
    localStorage.setItem(LEGACY_USERNAME_KEY,name);
    localStorage.setItem(LEGACY_STABLE_KEY,JSON.stringify({token:token,username:name,savedAt:Date.now()}));
    localStorage.setItem(LEGACY_PROFILE_KEY,JSON.stringify(mergeProfileForLegacy(p)));
    document.cookie='fhq_identity='+encodeURIComponent(token)+'; path=/; max-age=31536000; SameSite=Lax';
    window.name='FHQ_IDENTITY_V1:'+token;
  }catch(e){}

  try{
    window.__fhqCosmetics={
      inventory:Array.isArray(p.inventory)?p.inventory:[],
      collection:Array.isArray(p.collection)?p.collection:[],
      ring:String(p.equippedRing||''),
      banner:String(p.equippedBanner||''),
      coins:Number(p.hqCoins||0),
      dailyWins:Number(p.dailyWins||p.totalDailies||0)
    };
  }catch(e){}
  try{window.__FHQ_PROFILE__=p;window.__TURF_AUTH_TOKEN__=token;window.__TURF_AUTH_PROFILE__=p}catch(e){}
  try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(p)}catch(e){}
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(p)}catch(e){}
  return !!before&&before!==token;
}
function bridge(){
  var p=authProfile();if(!p)return;
  var changed=persist(p);
  var marker=RELOAD_PREFIX+String(p.token);
  var done=false;try{done=sessionStorage.getItem(marker)==='1'}catch(e){}
  if(changed&&!done){
    try{sessionStorage.setItem(marker,'1')}catch(e){}
    setTimeout(function(){location.reload()},80);
  }
}

window.addEventListener('turf:auth-ready',function(){setTimeout(bridge,0)});
[0,120,500,1200,3000].forEach(function(ms){setTimeout(bridge,ms)});
})();
