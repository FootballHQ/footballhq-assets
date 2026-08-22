/* ============================================================
   TURF v89.39 — FINAL UI + AUTH PERSISTENCE FIXES
   Fixes requested 2026-08-21:
   - Home hero/wordmark spans the same usable width as Home cards below
   - Removes legacy Shop/Locker HQ coin balance/logo blocks entirely
   - Keeps an authenticated named TURF profile authoritative and prevents
     silent Guest fallback during rerenders/navigation
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_FINAL_FIXES_8939__)return;
window.__TURF_FINAL_FIXES_8939__=true;

var PROFILE_KEY='turfAuthenticatedProfileV8921';
var TOKEN_KEY='turfAuthenticatedTokenV8921';
var WRAPPER_TOKEN_KEY='turfAuthAccountTokenV1';

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function writeJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function getStoredToken(){
  var t='';
  try{t=String(localStorage.getItem(TOKEN_KEY)||'').trim()}catch(e){}
  if(!t){try{t=String(sessionStorage.getItem(TOKEN_KEY)||'').trim()}catch(e){}}
  return t;
}
function isGuest(p){return !p||/^Guest(?:-|$)/i.test(String(p.username||''))}
function namedProfile(){
  var p=readJSON(PROFILE_KEY),t=getStoredToken();
  if(p&&p.token&&!isGuest(p)&&(!t||String(p.token)===String(t)))return p;
  try{p=window.__TURF_AUTH_PROFILE__;if(p&&p.token&&!isGuest(p))return p}catch(e){}
  return null;
}
function rememberNamed(p){
  if(!p||!p.token||isGuest(p))return;
  try{localStorage.setItem(TOKEN_KEY,String(p.token));localStorage.setItem(WRAPPER_TOKEN_KEY,String(p.token))}catch(e){}
  try{sessionStorage.setItem(TOKEN_KEY,String(p.token))}catch(e){}
  var copy={};try{Object.keys(p).forEach(function(k){copy[k]=p[k]})}catch(e){copy=p}
  copy.savedAt=Date.now();writeJSON(PROFILE_KEY,copy);
  try{window.__TURF_AUTH_PROFILE__=copy}catch(e){}
}
function applyNamed(p){
  if(!p||isGuest(p))return;
  rememberNamed(p);
  try{if(typeof window.fhqUpdateAccountUI==='function')window.fhqUpdateAccountUI(p)}catch(e){}
  try{if(typeof window.fhqRenderPass==='function')window.fhqRenderPass(p)}catch(e){}
  var n=Math.max(0,Number(p.hqCoins)||0);
  ['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=String(n)});
  try{window.parent.postMessage({type:'turf-auth-ready',token:String(p.token),profile:p,version:'8939'},'*')}catch(e){}
}

function addCss(){
  var old=q('#turfV8939Css');if(old)old.remove();
  var st=document.createElement('style');st.id='turfV8939Css';
  st.textContent=`
    /* Home hero: use the full content width instead of the old 470px cap. */
    #fhqHome #turfV8918Brand,
    #fhqHome .turf-v8918-brand,
    #fhqHome [id^="turfV8918Brand"]{
      box-sizing:border-box!important;
      width:100%!important;
      max-width:none!important;
      min-width:0!important;
      margin-left:0!important;
      margin-right:0!important;
    }
    #fhqHome #turfV8918Brand .turf-v8918-word,
    #fhqHome .turf-v8918-brand .turf-v8918-word,
    #fhqHome [id^="turfV8918Brand"] .turf-v8918-word{
      display:block!important;
      width:100%!important;
      max-width:none!important;
      min-width:0!important;
      height:auto!important;
      object-fit:fill!important;
      object-position:left center!important;
    }
    /* Exact nodes identified by cleanup are removed from layout. */
    .turf-v8939-remove-legacy-coins{display:none!important;width:0!important;height:0!important;min-width:0!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;pointer-events:none!important}
  `;
  (document.head||document.documentElement).appendChild(st);
}

function compactText(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function looksLikeLegacyCoinBlock(el){
  if(!el||el===document.body||el===document.documentElement)return false;
  var text=compactText(el);
  var hasLegacy=/\b(?:HQ\s*Coins?|Football\s*HQ\s*Coins?|FootballHQ\s*Coins?)\b/i.test(text);
  var hasCoinId=!!q('#fhqShopCoins,#fhqLockerCoins',el);
  var imgs=qa('img',el);
  var legacyImg=imgs.some(function(img){var s=String(img.src||'')+' '+String(img.alt||'');return /(football.?hq|hq.?coin|coins?)/i.test(s)});
  if(!(hasLegacy||hasCoinId||legacyImg))return false;
  /* Never remove a purchasable pack/item tile just because it mentions coins. */
  if(q('[data-pack-buy],[data-shop-buy],button[data-pack-buy],button[data-shop-buy]',el))return false;
  var r;try{r=el.getBoundingClientRect()}catch(e){r={width:9999,height:9999}}
  return (r.width<=460&&r.height<=220)||hasCoinId||hasLegacy;
}
function removeLegacyCoinsFrom(root){
  if(!root)return;
  var targets=[];
  ['fhqShopCoins','fhqLockerCoins'].forEach(function(id){
    var coin=document.getElementById(id);if(!coin||!root.contains(coin))return;
    var node=coin;
    for(var i=0;i<6&&node&&node!==root;i++,node=node.parentElement){
      if(looksLikeLegacyCoinBlock(node)){targets.push(node);break}
    }
    if(!targets.length&&coin.parentElement)targets.push(coin.parentElement);
  });
  qa('*',root).forEach(function(el){
    var t=compactText(el);
    if(!/\b(?:HQ\s*Coins?|Football\s*HQ\s*Coins?|FootballHQ\s*Coins?)\b/i.test(t))return;
    var node=el;
    for(var i=0;i<4&&node&&node!==root;i++,node=node.parentElement){if(looksLikeLegacyCoinBlock(node)){targets.push(node);break}}
  });
  targets.forEach(function(el){if(el&&el!==root)el.classList.add('turf-v8939-remove-legacy-coins')});
}
function cleanCoinBlocks(){
  removeLegacyCoinsFrom(q('#fhqShopPage'));
  removeLegacyCoinsFrom(q('#fhqLockerPage'));
}

function patchIdentity(){
  if(typeof window.fhqSetRuntimeIdentity==='function'&&!window.fhqSetRuntimeIdentity.__turf8939){
    var original=window.fhqSetRuntimeIdentity;
    var wrapped=function(profile){
      var locked=namedProfile();
      /* A stale Guest bootstrap is never allowed to replace a real signed-in profile. */
      if(locked&&isGuest(profile)){
        var out=original.call(this,locked);
        applyNamed(locked);
        return out;
      }
      var out=original.apply(this,arguments);
      if(profile&&!isGuest(profile))applyNamed(profile);
      return out;
    };
    wrapped.__turf8939=true;window.fhqSetRuntimeIdentity=wrapped;
  }
  if(typeof window.getAccountProfile==='function'&&!window.getAccountProfile.__turf8939){
    var originalGet=window.getAccountProfile;
    var wrappedGet=function(){var p=namedProfile();return p||originalGet.apply(this,arguments)};
    wrappedGet.__turf8939=true;window.getAccountProfile=wrappedGet;
  }
  if(typeof window.fhqGetToken==='function'&&!window.fhqGetToken.__turf8939){
    var originalToken=window.fhqGetToken;
    var wrappedToken=function(){var p=namedProfile();return p&&p.token?String(p.token):originalToken.apply(this,arguments)};
    wrappedToken.__turf8939=true;window.fhqGetToken=wrappedToken;
  }
}
function refreshFromServer(){
  var p=namedProfile();if(!p||!p.token||!window.google||!google.script||!google.script.run){if(p)applyNamed(p);return}
  try{
    google.script.run.withSuccessHandler(function(server){
      if(server&&server.token&&!isGuest(server)){applyNamed(server)}else{applyNamed(p)}
    }).withFailureHandler(function(){applyNamed(p)}).getFootballHQAccount(String(p.token));
  }catch(e){applyNamed(p)}
}
function run(){addCss();patchIdentity();cleanCoinBlocks();var p=namedProfile();if(p)applyNamed(p)}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[80,250,700,1400,3000].forEach(function(ms){setTimeout(run,ms)});
setTimeout(refreshFromServer,300);
setInterval(function(){patchIdentity();cleanCoinBlocks();var p=namedProfile();if(p)applyNamed(p)},700);
if(window.MutationObserver){var timer=null;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(function(){cleanCoinBlocks();patchIdentity()},60)}).observe(document.documentElement,{childList:true,subtree:true})}
})();
