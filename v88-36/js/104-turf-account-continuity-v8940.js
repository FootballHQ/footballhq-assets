/* ============================================================
   TURF v89.40 — ACCOUNT CONTINUITY + HOME ALIGNMENT
   Requested fixes:
   - Home hero right edge aligns with the Home content/cards below.
   - Profile surfaces always use the authoritative existing account.
   - A brand-new/empty Google-created profile must not replace a richer
     existing TURF/FootballHQ account already saved on this browser.
   - Legacy runtime identity stores are synchronized to the chosen account.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACCOUNT_CONTINUITY_8940__)return;
window.__TURF_ACCOUNT_CONTINUITY_8940__=true;

var AUTH_PROFILE_KEY='turfAuthenticatedProfileV8921';
var AUTH_TOKEN_KEY='turfAuthenticatedTokenV8921';
var WRAPPER_TOKEN_KEY='turfAuthAccountTokenV1';
var LEGACY_TOKEN_KEY='footballHQSharedAccountTokenV1';
var LEGACY_VAULT_KEY='footballHQIdentityVaultV1';
var LEGACY_STABLE_KEY='footballHQStableGuestIdentityV1';
var LEGACY_USERNAME_KEY='footballHQSharedUsernameV1';
var LEGACY_PROFILE_KEY='footballHQAccountProfileV2';
var RELOAD_KEY='turf8940ContinuityReload';
var busy=false;
var workerProfile=null;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function writeJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function isGuest(p){return !p||/^Guest(?:-|$)/i.test(String(p.username||''))}
function activity(p){
  if(!p)return 0;
  var pts=Math.max(0,Number(p.points)||0);
  var d=Math.max(0,Number(p.totalDailies)||0);
  var w=Math.max(0,Number(p.dailyWins)||0);
  var streak=Math.max(0,Number(p.streakDays)||0);
  var cards=Array.isArray(p.collection)?p.collection.length:0;
  var inv=Array.isArray(p.inventory)?p.inventory.length:0;
  return pts + d*50 + w*25 + streak*10 + cards*5 + inv*2;
}
function legacyProfile(){
  var p=readJSON(LEGACY_PROFILE_KEY);
  if(p&&p.token&&!isGuest(p))return p;
  var stable=readJSON(LEGACY_STABLE_KEY);
  if(p&&stable&&stable.token&&!p.token)p.token=stable.token;
  return p&&p.token&&!isGuest(p)?p:null;
}
function authProfile(){
  if(workerProfile&&workerProfile.token)return workerProfile;
  var p=readJSON(AUTH_PROFILE_KEY);
  if(p&&p.token)return p;
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__}catch(e){}
  return null;
}
function chooseProfile(){
  if(workerProfile&&workerProfile.token)return workerProfile;
  var a=authProfile(),l=legacyProfile();
  if(!l)return a;
  if(!a)return l;
  if(isGuest(a)&&!isGuest(l))return l;
  var as=activity(a),ls=activity(l);
  /* This is the key migration guard: an empty/new Google account is not
     allowed to replace an established account with real history. */
  if(!isGuest(l)&&ls>0&&as===0)return l;
  if(!isGuest(l)&&ls>as*2&&ls-as>=100)return l;
  return a;
}
function persistEverywhere(p){
  if(!p||!p.token)return;
  var token=String(p.token),name=String(p.username||'');
  var copy={};try{Object.keys(p).forEach(function(k){copy[k]=p[k]})}catch(e){copy=p}
  copy.token=token;copy.savedAt=Date.now();
  try{
    localStorage.setItem(AUTH_TOKEN_KEY,token);
    localStorage.setItem(WRAPPER_TOKEN_KEY,token);
    localStorage.setItem(LEGACY_TOKEN_KEY,token);
    sessionStorage.setItem(AUTH_TOKEN_KEY,token);
    sessionStorage.setItem(LEGACY_TOKEN_KEY,token);
    localStorage.setItem(LEGACY_USERNAME_KEY,name);
    localStorage.setItem(AUTH_PROFILE_KEY,JSON.stringify(copy));
    localStorage.setItem(LEGACY_PROFILE_KEY,JSON.stringify(copy));
    localStorage.setItem(LEGACY_STABLE_KEY,JSON.stringify({token:token,username:name,savedAt:Date.now()}));
    var vault=readJSON(LEGACY_VAULT_KEY)||{primary:'',known:[]};
    var known=Array.isArray(vault.known)?vault.known.map(String).filter(Boolean):[];
    if(known.indexOf(token)<0)known.unshift(token);
    vault.primary=token;vault.known=known.filter(function(x,i,a){return a.indexOf(x)===i});
    localStorage.setItem(LEGACY_VAULT_KEY,JSON.stringify(vault));
    document.cookie='fhq_identity='+encodeURIComponent(token)+'; path=/; max-age=31536000; SameSite=Lax';
    window.name='FHQ_IDENTITY_V1:'+token;
  }catch(e){}
  try{window.__TURF_AUTH_TOKEN__=token;window.__TURF_AUTH_PROFILE__=copy;window.__FHQ_PROFILE__=copy;window.fhqCurrentAccount=copy}catch(e){}
  try{window.__fhqCosmetics={inventory:Array.isArray(copy.inventory)?copy.inventory:[],collection:Array.isArray(copy.collection)?copy.collection:[],ring:String(copy.equippedRing||''),banner:String(copy.equippedBanner||''),coins:Number(copy.hqCoins||0),dailyWins:Number(copy.dailyWins||copy.totalDailies||0)}}catch(e){}
  try{window.parent.postMessage({type:'turf-auth-ready',token:token,profile:copy,version:'8940-worker'},'*')}catch(e){}
}
function applySurfaces(p){
  if(!p)return;
  try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(p)}catch(e){}
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(p)}catch(e){}
  var vals={fhqProfileName:p.username||'PLAYER',fhqProfileLifetimePoints:Number(p.points||0),fhqProfileDailyWins:Number(p.dailyWins||0),fhqProfileDailies:Number(p.totalDailies||0),fhqProfileStreak:Number(p.streakDays||0),fhqAccountName:p.username||'PLAYER'};
  Object.keys(vals).forEach(function(id){var el=q('#'+id);if(el)el.textContent=String(vals[id])});
  var sub=q('#fhqProfileSub');if(sub)sub.textContent=(p.equippedTitle?String(p.equippedTitle)+' • ':'')+'Level '+Number(p.level||1)+' • TURF account';
  var n=Math.max(0,Number(p.hqCoins)||0);['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins','turfTopCoins'].forEach(function(id){var el=q('#'+id);if(el)el.textContent=String(n)});
}
function fetchChosen(){
  var p=chooseProfile();if(!p||!p.token||busy||!window.google||!google.script||!google.script.run){if(p){persistEverywhere(p);applySurfaces(p)}return}
  /* A Worker-authenticated profile is authoritative. Do not block sign-in on
     an Apps Script account lookup; keep existing Apps Script calls available
     for the rest of the current app while the backend migration continues. */
  if(workerProfile&&workerProfile.token){persistEverywhere(workerProfile);applySurfaces(workerProfile);return}
  busy=true;
  try{google.script.run.withSuccessHandler(function(server){busy=false;
    var local=legacyProfile();
    var chosen=server&&server.token?server:p;
    if(local&&!isGuest(local)&&activity(local)>0&&(isGuest(chosen)||activity(chosen)===0))chosen=local;
    persistEverywhere(chosen);applySurfaces(chosen);
  }).withFailureHandler(function(){busy=false;persistEverywhere(p);applySurfaces(p)}).getFootballHQAccount(String(p.token))}catch(e){busy=false;persistEverywhere(p);applySurfaces(p)}
}
function patchRuntime(){
  if(typeof window.fhqGetToken==='function'&&!window.fhqGetToken.__turf8940){
    var old=window.fhqGetToken;var fn=function(){var p=chooseProfile();return p&&p.token?String(p.token):old.apply(this,arguments)};fn.__turf8940=true;window.fhqGetToken=fn;
  }
  if(typeof window.getAccountProfile==='function'&&!window.getAccountProfile.__turf8940){
    var oldP=window.getAccountProfile;var fp=function(){return chooseProfile()||oldP.apply(this,arguments)};fp.__turf8940=true;window.getAccountProfile=fp;
  }
}
function addCss(){
  var old=q('#turfV8940Css');if(old)old.remove();
  var st=document.createElement('style');st.id='turfV8940Css';
  st.textContent=`
    #fhqHome .fhq-home-inner{box-sizing:border-box!important;width:100%!important;max-width:1160px!important}
    #fhqHome .fhq-hero{box-sizing:border-box!important;width:100%!important;max-width:none!important;min-width:0!important;grid-column:1/-1!important;margin-left:0!important;margin-right:0!important}
    #fhqHome .fhq-hero>img,#fhqHome .fhq-hero .turf-approved-hero,#fhqHome .fhq-hero [class*="hero-logo"]{max-width:100%!important}
  `;
  (document.head||document.documentElement).appendChild(st);
}
function maybeReloadForIdentity(){
  /* Worker proxy login already persists the authoritative account in-place.
     Never reload the proxied TURF document: on the custom domain that can turn
     a legacy Apps Script navigation into a Worker route and replace the UI. */
  try{if(window.__TURF_APP_PROXY__||workerProfile)return}catch(e){}
  var p=chooseProfile();if(!p||!p.token)return;
  var legacy='';try{legacy=String(localStorage.getItem(LEGACY_TOKEN_KEY)||'')}catch(e){}
  if(legacy&&legacy!==String(p.token)){
    persistEverywhere(p);
    var mark='';try{mark=sessionStorage.getItem(RELOAD_KEY)||''}catch(e){}
    if(mark!==String(p.token)){try{sessionStorage.setItem(RELOAD_KEY,String(p.token))}catch(e){};setTimeout(function(){location.reload()},100)}
  }
}
function acceptWorkerProfile(p){
  if(!p||!p.token)return false;
  var copy={};try{Object.keys(p).forEach(function(k){copy[k]=p[k]})}catch(e){copy=p}
  copy.token=String(copy.token);
  workerProfile=copy;
  busy=false;
  persistEverywhere(copy);
  patchRuntime();
  applySurfaces(copy);
  try{window.dispatchEvent(new CustomEvent('turf:auth-ready',{detail:{profile:copy,source:'worker'}}))}catch(e){}
  [40,140,350,800,1600].forEach(function(ms){setTimeout(function(){patchRuntime();applySurfaces(copy)},ms)});
  return true;
}
function announceWorkerReceiver(){try{window.parent.postMessage({type:'turf-worker-profile-receiver-ready',version:'8940-worker'},'*')}catch(e){}}
function run(){addCss();patchRuntime();var p=chooseProfile();if(p){persistEverywhere(p);applySurfaces(p)}fetchChosen()}

window.addEventListener('message',function(e){
  if(e.source!==window.parent)return;
  var d=e&&e.data;if(!d||typeof d!=='object'||d.type!=='turf-auth-worker-profile')return;
  var p=d.profile&&typeof d.profile==='object'?d.profile:null;
  if(p&&d.token&&!p.token)p.token=String(d.token);
  acceptWorkerProfile(p);
},true);
window.addEventListener('turf:auth-ready',function(e){setTimeout(function(){run();if(!(e&&e.detail&&e.detail.source==='worker'))maybeReloadForIdentity()},0)});
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('#turfProfileBtn,#fhqProfileButton,[data-fhq-nav="leaderboard"],[data-fhq-nav="home"]'):null;if(t)[20,100,300,700].forEach(function(ms){setTimeout(run,ms)})},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,100,350,900,1800,3500].forEach(function(ms){setTimeout(function(){announceWorkerReceiver();run()},ms)});
setInterval(function(){patchRuntime();var p=chooseProfile();if(p)applySurfaces(p)},900);
})();
