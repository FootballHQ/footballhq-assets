/* ============================================================
   TURF v89.28 — COIN UI CLEANUP
   - Hides redundant Shop/Locker coin balance cards (global top bar is canonical)
   - Suppresses transient idle coin display drift from stale legacy caches
   - Leaves purchase clicks alone briefly so legitimate purchase flows can update
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_COIN_UI_CLEANUP_8928__)return;
window.__TURF_COIN_UI_CLEANUP_8928__=true;

var PROFILE_KEY='turfAuthenticatedProfileV8921';
var purchaseGraceUntil=0;

function readJSON(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function profile(){
  var p=readJSON(PROFILE_KEY);
  if(p&&p.token&&!/^Guest(?:-|$)/i.test(String(p.username||'')))return p;
  try{if(window.__TURF_AUTH_PROFILE__&&window.__TURF_AUTH_PROFILE__.token)return window.__TURF_AUTH_PROFILE__}catch(e){}
  return null;
}
function expectedCoins(){var p=profile();return p?Math.max(0,Number(p.hqCoins)||0):null}

function hideRedundantBalance(id){
  var el=document.getElementById(id);if(!el)return;
  var node=el;
  for(var i=0;i<4&&node&&node!==document.body;i++,node=node.parentElement){
    var txt=String(node.textContent||'').replace(/\s+/g,' ').trim();
    if(/TURF\s*Coins/i.test(txt)&&txt.length<80){node.style.display='none';return}
  }
  if(el.parentElement)el.parentElement.style.display='none';
}
function cleanLayout(){
  hideRedundantBalance('fhqShopCoins');
  hideRedundantBalance('fhqLockerCoins');
}
function stabilize(){
  cleanLayout();
  if(Date.now()<purchaseGraceUntil)return;
  var n=expectedCoins();if(n==null)return;
  var global=document.getElementById('fhqGlobalCoins');
  if(global&&String(global.textContent||'').trim()!==String(n))global.textContent=String(n);
  try{localStorage.setItem('footballHQCoinDisplayV2',String(n))}catch(e){}
  try{if(window.__fhqCosmetics)window.__fhqCosmetics.coins=n}catch(e){}
}

/* Legitimate shop purchases get a grace window; server/auth refresh may then update profile. */
document.addEventListener('click',function(e){
  var buy=e.target&&e.target.closest?e.target.closest('[data-pack-buy],[data-shop-buy]'):null;
  if(buy)purchaseGraceUntil=Date.now()+6000;
  setTimeout(cleanLayout,0);setTimeout(cleanLayout,120);
},true);

var obs=new MutationObserver(function(){setTimeout(stabilize,0)});
try{obs.observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
[0,120,500,1200].forEach(function(ms){setTimeout(stabilize,ms)});
setInterval(stabilize,250);
})();
