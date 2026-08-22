/* ============================================================
   TURF v89.41 — ACCOUNT RECONCILIATION + EXACT HERO EDGE ALIGN
   - Reconciles every known browser account token against server data and
     keeps the richest established TURF account authoritative.
   - Prevents a newly-created empty Google profile from becoming the runtime
     identity when an older established account is already known.
   - Measures the visible Featured Challenges right edge and forces the Home
     hero panel to end at that exact pixel edge.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_RECONCILE_8941__)return;
window.__TURF_RECONCILE_8941__=true;

var KEYS={
  authProfile:'turfAuthenticatedProfileV8921',
  authToken:'turfAuthenticatedTokenV8921',
  wrapper:'turfAuthAccountTokenV1',
  legacyToken:'footballHQSharedAccountTokenV1',
  vault:'footballHQIdentityVaultV1',
  stable:'footballHQStableGuestIdentityV1',
  username:'footballHQSharedUsernameV1',
  legacyProfile:'footballHQAccountProfileV2'
};
var reconciling=false,lastWinner='';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function isGuest(p){return !p||/^Guest(?:-|$)/i.test(String(p.username||''))}
function score(p){
  if(!p||!p.token)return -1;
  var pts=Math.max(0,Number(p.points)||0),d=Math.max(0,Number(p.totalDailies)||0),w=Math.max(0,Number(p.dailyWins)||0),s=Math.max(0,Number(p.streakDays)||0),coins=Math.max(0,Number(p.hqCoins)||0);
  var cards=Array.isArray(p.collection)?p.collection.length:0,inv=Array.isArray(p.inventory)?p.inventory.length:0,ach=Array.isArray(p.achievementIds)?p.achievementIds.length:0;
  var named=isGuest(p)?0:500;
  return named + pts*10 + d*100 + w*80 + s*25 + cards*12 + inv*6 + ach*20 + Math.min(coins,1000000)/1000;
}
function allKnownTokens(){
  var out=[];
  function add(v){v=String(v||'').trim();if(v&&out.indexOf(v)<0)out.push(v)}
  try{add(localStorage.getItem(KEYS.authToken));add(localStorage.getItem(KEYS.wrapper));add(localStorage.getItem(KEYS.legacyToken));add(sessionStorage.getItem(KEYS.authToken));add(sessionStorage.getItem(KEYS.legacyToken))}catch(e){}
  var ap=readJSON(KEYS.authProfile),lp=readJSON(KEYS.legacyProfile),st=readJSON(KEYS.stable),v=readJSON(KEYS.vault);
  if(ap)add(ap.token);if(lp)add(lp.token);if(st)add(st.token);
  if(v){add(v.primary);(Array.isArray(v.known)?v.known:[]).forEach(add)}
  try{if(window.__TURF_AUTH_PROFILE__)add(window.__TURF_AUTH_PROFILE__.token);if(window.__FHQ_PROFILE__)add(window.__FHQ_PROFILE__.token)}catch(e){}
  return out;
}
function persistWinner(p){
  if(!p||!p.token)return;
  var token=String(p.token),copy={};try{Object.keys(p).forEach(function(k){copy[k]=p[k]})}catch(e){copy=p}
  copy.token=token;copy.savedAt=Date.now();
  try{
    localStorage.setItem(KEYS.authToken,token);localStorage.setItem(KEYS.wrapper,token);localStorage.setItem(KEYS.legacyToken,token);
    sessionStorage.setItem(KEYS.authToken,token);sessionStorage.setItem(KEYS.legacyToken,token);
    localStorage.setItem(KEYS.authProfile,JSON.stringify(copy));localStorage.setItem(KEYS.legacyProfile,JSON.stringify(copy));
    localStorage.setItem(KEYS.username,String(copy.username||''));
    localStorage.setItem(KEYS.stable,JSON.stringify({token:token,username:String(copy.username||''),savedAt:Date.now()}));
    var v=readJSON(KEYS.vault)||{primary:'',known:[]},known=Array.isArray(v.known)?v.known.map(String).filter(Boolean):[];
    if(known.indexOf(token)<0)known.unshift(token);v.primary=token;v.known=known.filter(function(x,i,a){return a.indexOf(x)===i});localStorage.setItem(KEYS.vault,JSON.stringify(v));
    document.cookie='fhq_identity='+encodeURIComponent(token)+'; path=/; max-age=31536000; SameSite=Lax';window.name='FHQ_IDENTITY_V1:'+token;
  }catch(e){}
  try{window.__TURF_AUTH_TOKEN__=token;window.__TURF_AUTH_PROFILE__=copy;window.__FHQ_PROFILE__=copy;window.fhqCurrentAccount=copy}catch(e){}
  try{window.__fhqCosmetics={inventory:Array.isArray(copy.inventory)?copy.inventory:[],collection:Array.isArray(copy.collection)?copy.collection:[],ring:String(copy.equippedRing||''),banner:String(copy.equippedBanner||''),coins:Number(copy.hqCoins||0),dailyWins:Number(copy.dailyWins||copy.totalDailies||0)}}catch(e){}
  try{if(typeof window.fhqSetRuntimeIdentity==='function')window.fhqSetRuntimeIdentity(copy)}catch(e){}
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(copy)}catch(e){}
  applyProfile(copy);
  lastWinner=token;
}
function applyProfile(p){
  var vals={fhqProfileName:p.username||'PLAYER',fhqProfileLifetimePoints:Number(p.points||0),fhqProfileDailyWins:Number(p.dailyWins||0),fhqProfileDailies:Number(p.totalDailies||0),fhqProfileStreak:Number(p.streakDays||0),fhqAccountName:p.username||'PLAYER'};
  Object.keys(vals).forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=String(vals[id])});
  var sub=document.getElementById('fhqProfileSub');if(sub)sub.textContent=(p.equippedTitle?String(p.equippedTitle)+' • ':'')+'Level '+Number(p.level||1)+' • TURF account';
  var n=Math.max(0,Number(p.hqCoins)||0);['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=String(n)});
}
function reconcile(){
  if(reconciling||!window.google||!google.script||!google.script.run)return;
  var tokens=allKnownTokens();if(!tokens.length)return;
  reconciling=true;var pending=tokens.length,profiles=[];
  function done(){if(--pending>0)return;reconciling=false;if(!profiles.length)return;profiles.sort(function(a,b){return score(b)-score(a)});var winner=profiles[0];if(winner)persistWinner(winner)}
  tokens.forEach(function(token){
    try{google.script.run.withSuccessHandler(function(p){if(p&&p.token)profiles.push(p);done()}).withFailureHandler(done).getFootballHQAccount(token)}catch(e){done()}
  });
}
function patchIdentityReads(){
  if(typeof window.fhqGetToken==='function'&&!window.fhqGetToken.__turf8941){var old=window.fhqGetToken,fn=function(){var p=readJSON(KEYS.authProfile);return p&&p.token?String(p.token):old.apply(this,arguments)};fn.__turf8941=true;window.fhqGetToken=fn}
  if(typeof window.getAccountProfile==='function'&&!window.getAccountProfile.__turf8941){var oldp=window.getAccountProfile,fp=function(){var p=readJSON(KEYS.authProfile);return p&&p.token?p:oldp.apply(this,arguments)};fp.__turf8941=true;window.getAccountProfile=fp}
}

function featuredPanel(){
  var home=q('#fhqHome');if(!home)return null;
  var nodes=qa('h1,h2,h3,h4,strong,div,span',home).filter(function(el){return /FEATURED\s+CHALLENGES/i.test(String(el.textContent||'').replace(/\s+/g,' ').trim())});
  for(var i=0;i<nodes.length;i++){
    var n=nodes[i],p=n;
    for(var j=0;j<6&&p&&p!==home;j++,p=p.parentElement){
      var r;try{r=p.getBoundingClientRect()}catch(e){continue}
      if(r.width>=300&&r.height>=120&&r.width<900&&r.right<=window.innerWidth+2)return p;
    }
  }
  return null;
}
function heroPanel(){
  var home=q('#fhqHome');if(!home)return null;
  return q('.fhq-hero',home)||q('[id*="Hero"]',home)||q('[class*="hero"]',home);
}
function alignHeroExact(){
  var hero=heroPanel(),feat=featuredPanel();if(!hero||!feat)return;
  var hr=hero.getBoundingClientRect(),fr=feat.getBoundingClientRect();
  if(!hr.width||!fr.width)return;
  var targetRight=fr.right;
  if(targetRight<=hr.left+300)return;
  var width=Math.round((targetRight-hr.left)*100)/100;
  hero.style.setProperty('box-sizing','border-box','important');
  hero.style.setProperty('width',width+'px','important');
  hero.style.setProperty('max-width','none','important');
  hero.style.setProperty('margin-right','0','important');
  hero.style.setProperty('justify-self','start','important');
  hero.setAttribute('data-turf-exact-right',String(Math.round(targetRight)));
}
function run(){patchIdentityReads();alignHeroExact();var p=readJSON(KEYS.authProfile);if(p&&p.token)applyProfile(p)}

window.addEventListener('resize',function(){setTimeout(alignHeroExact,30)});
window.addEventListener('turf:auth-ready',function(){[0,100,350].forEach(function(ms){setTimeout(function(){reconcile();run()},ms)})});
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('#turfProfileBtn,#fhqProfileButton,[data-fhq-nav="leaderboard"],[data-fhq-nav="home"]'):null;if(t)[20,100,300,700].forEach(function(ms){setTimeout(function(){run();if(ms===300)reconcile()},ms)})},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){run();reconcile()},{once:true});else{run();reconcile()}
[120,350,800,1500,2800,5000].forEach(function(ms){setTimeout(function(){run();if(ms===800||ms===2800)reconcile()},ms)});
setInterval(function(){patchIdentityReads();alignHeroExact();var p=readJSON(KEYS.authProfile);if(p&&p.token)applyProfile(p)},1000);
})();
