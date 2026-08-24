/* ============================================================
   TURF v89.39 — FINAL UI CLEANUP (WORKER-AUTH SAFE)
   Visual cleanup only.

   Worker authentication is now owned by the turftrials.com wrapper + the
   dedicated receiver in 07-script-07.js. This file must NOT wrap identity
   functions, refresh auth, dispatch auth-ready loops, or poll account state.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_FINAL_FIXES_8939_SAFE__)return;
window.__TURF_FINAL_FIXES_8939_SAFE__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  var old=q('#turfV8939Css');if(old)old.remove();
  var st=document.createElement('style');st.id='turfV8939Css';
  st.textContent=`
    #fhqHome #turfV8918Brand,
    #fhqHome .turf-v8918-brand,
    #fhqHome [id^="turfV8918Brand"]{box-sizing:border-box!important;width:100%!important;max-width:none!important;min-width:0!important;margin-left:0!important;margin-right:0!important}
    #fhqHome #turfV8918Brand .turf-v8918-word,
    #fhqHome .turf-v8918-brand .turf-v8918-word,
    #fhqHome [id^="turfV8918Brand"] .turf-v8918-word{display:block!important;width:100%!important;max-width:none!important;min-width:0!important;height:auto!important;object-fit:fill!important;object-position:left center!important}
    .turf-v8939-remove-legacy-coins{display:none!important;width:0!important;height:0!important;min-width:0!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;pointer-events:none!important}
  `;
  (document.head||document.documentElement).appendChild(st);
}

function compactText(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function looksLikeLegacyCoinBlock(el){
  if(!el||el===document.body||el===document.documentElement)return false;
  var text=compactText(el),hasLegacy=/\b(?:HQ\s*Coins?|Football\s*HQ\s*Coins?|FootballHQ\s*Coins?)\b/i.test(text),hasCoinId=!!q('#fhqShopCoins,#fhqLockerCoins',el),imgs=qa('img',el),legacyImg=imgs.some(function(img){var s=String(img.src||'')+' '+String(img.alt||'');return /(football.?hq|hq.?coin|coins?)/i.test(s)});
  if(!(hasLegacy||hasCoinId||legacyImg))return false;
  if(q('[data-pack-buy],[data-shop-buy],button[data-pack-buy],button[data-shop-buy]',el))return false;
  var r;try{r=el.getBoundingClientRect()}catch(e){r={width:9999,height:9999}}
  return (r.width<=460&&r.height<=220)||hasCoinId||hasLegacy;
}
function removeLegacyCoinsFrom(root){
  if(!root)return;var targets=[];
  ['fhqShopCoins','fhqLockerCoins'].forEach(function(id){var coin=document.getElementById(id);if(!coin||!root.contains(coin))return;var node=coin;for(var i=0;i<6&&node&&node!==root;i++,node=node.parentElement){if(looksLikeLegacyCoinBlock(node)){targets.push(node);break}}if(!targets.length&&coin.parentElement)targets.push(coin.parentElement)});
  qa('*',root).forEach(function(el){var t=compactText(el);if(!/\b(?:HQ\s*Coins?|Football\s*HQ\s*Coins?|FootballHQ\s*Coins?)\b/i.test(t))return;var node=el;for(var i=0;i<4&&node&&node!==root;i++,node=node.parentElement){if(looksLikeLegacyCoinBlock(node)){targets.push(node);break}}});
  targets.forEach(function(el){if(el&&el!==root)el.classList.add('turf-v8939-remove-legacy-coins')});
}
function cleanCoinBlocks(){removeLegacyCoinsFrom(q('#fhqShopPage'));removeLegacyCoinsFrom(q('#fhqLockerPage'))}

function syncVisibleCoins(profile){
  if(!profile)return;
  var n=Math.max(0,Number(profile.hqCoins||profile.coins)||0);
  ['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins','turfTopCoins'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=String(n)});
}

function run(){addCss();cleanCoinBlocks()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[120,500,1200].forEach(function(ms){setTimeout(run,ms)});

/* One-way UI sync only. Never call/set/wrap identity functions here. */
window.addEventListener('turf:auth-ready',function(e){
  try{syncVisibleCoins(e&&e.detail&&e.detail.profile?e.detail.profile:(window.__TURF_AUTH_PROFILE__||null))}catch(_){}
  cleanCoinBlocks();
});

/* Child inserts can recreate old Shop/Locker coin blocks; clean those only. */
if(window.MutationObserver){
  var timer=null;
  new MutationObserver(function(muts){
    var added=muts.some(function(m){return m.addedNodes&&m.addedNodes.length});
    if(!added)return;
    clearTimeout(timer);timer=setTimeout(cleanCoinBlocks,80);
  }).observe(document.documentElement,{childList:true,subtree:true});
}
})();
