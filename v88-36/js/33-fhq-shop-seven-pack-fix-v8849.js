/* ============================================================
   FOOTBALL HQ / TURF V88.85 — CURRENT SHOP CATALOG + HARD NO-FLASH

   The current pack renderer is unchanged.
   This version hides the shop grid BEFORE legacy Shop click handlers run,
   then reveals it only after the current catalog has been written.
   ============================================================ */
(function(){
'use strict';
if(window.__FHQ_V8849_SHOP_FIX__)return;
window.__FHQ_V8849_SHOP_FIX__=true;

const PACKS=[
  {id:'rookie_cards',name:'Rookie Pack',price:75,count:2,rarity:'common',art:'rookie',odds:'rookie',category:'card',guaranteeLabel:'2 COMMON+ CARDS',description:'2 Common-or-better cards. The fastest way to start building 001 • THE GRIDIRON.'},
  {id:'scrimmage_pack',name:'Scrimmage Pack',price:325,count:6,rarity:'uncommon',art:'scrimmage',odds:'scrimmage',category:'card',guaranteeLabel:'6 COMMON+ • BOOSTED UNCOMMON',description:'Bulk pack • 6 Common-or-better cards with a stronger Uncommon chance.'},
  {id:'gametime_pack',name:'Gametime Pack',price:225,count:4,rarity:'uncommon',art:'gametime',odds:'gametime',category:'card',guaranteeLabel:'2 COMMON+ • 2 UNCOMMON+',description:'Balanced value • 2 Common+ pulls and 2 Uncommon+ pulls.'},
  {id:'redzone_pack',name:'Red Zone Pack',price:300,count:3,rarity:'rare',art:'redzone',odds:'redzone',category:'card',guaranteeLabel:'COMMON+ • UNCOMMON+ • RARE+',description:'3 cards with one Common+, one Uncommon+, and one Rare+ pull.'},
  {id:'fourthquarter_pack',name:'Fourth Quarter Pack',price:525,count:4,rarity:'epic',art:'fourthquarter',odds:'fourthquarter',category:'card',guaranteeLabel:'2 UNCOMMON+ • RARE+ • EPIC+',description:'Pressure pack • 2 Uncommon+, 1 Rare+, and 1 Epic+ pull.'},
  {id:'hailmary_pack',name:'Hail Mary Pack',price:700,count:3,rarity:'legendary',art:'hailmary',odds:'hailmary',category:'card',guaranteeLabel:'3 RARE+ • BOOSTED TOP-END ODDS',description:'High-risk chase pack • 3 Rare+ cards with boosted premium odds. No top-rarity guarantee.'},
  {id:'primetime_pack',name:'Primetime Pack',price:850,count:5,rarity:'legendary',art:'primetime8848',odds:'primetime8848',category:'card',guaranteeLabel:'2 COMMON+ • 2 RARE+ • 1 EPIC+',description:'The marquee pack • 5 cards with 2 Rare+ and 1 Epic+ guaranteed. Legendary, Obsidian, and Signature remain chase pulls.'},
  {id:'overtime_pack',name:'Overtime Pack',price:1000,count:5,rarity:'epic',art:'primetime8848',odds:'primetime8848',category:'card',guaranteeLabel:'2 RARE+ • 3 EPIC+',description:'TEMP TEST PACK • 5 cards with 2 Rare+ and 3 Epic+ guaranteed. Built for high-end card testing.'},
  {id:'avatar_pack',name:'Avatar Pack',price:240,count:1,rarity:'rare',art:'avatar',category:'avatar',guaranteeLabel:'1 UNOWNED AVATAR',description:'1 random unowned Football HQ avatar.'}
];

const A='https://footballhq.github.io/footballhq-assets/v88-48/packs/';
const ART={
  rookie_cards:A+'pack-rookie-v8848.png?v=8849',scrimmage_pack:A+'pack-scrimmage-v8848.png?v=8849',gametime_pack:A+'pack-gametime-v8848.png?v=8849',redzone_pack:A+'pack-redzone-v8848.png?v=8849',fourthquarter_pack:A+'pack-fourthquarter-v8848.png?v=8849',hailmary_pack:A+'pack-hailmary-v8848.png?v=8849',primetime_pack:A+'pack-primetime-v8848.png?v=8849',overtime_pack:A+'pack-primetime-v8848.png?v=8849'
};

function esc2(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
function packPreview8849(pk){const url=ART[pk.id];if(url)return '<div class="fhq-v8849-pack-art"><img src="'+url+'" alt="'+esc2(pk.name)+'" draggable="false"></div>';if(typeof window.__fhq8848OldPackPreview==='function')return window.__fhq8848OldPackPreview(pk);if(typeof fhqPackPreview==='function')try{return fhqPackPreview(pk)}catch(e){}return '<div class="fhq-v8849-pack-art fallback"><strong>'+esc2(pk.name)+'</strong></div>'}

function hideGridNow(){
  const g=document.getElementById('fhqShopGrid');
  if(!g)return;
  g.removeAttribute('data-turf-shop-ready');
  g.style.visibility='hidden';
  g.style.opacity='0';
}

function revealCurrentGrid(g){
  if(!g)return;
  g.setAttribute('data-turf-shop-ready','1');
  requestAnimationFrame(function(){g.style.visibility='visible';g.style.opacity='1'});
}

function install(){
  if(typeof window.fhqRenderShop!=='function' && typeof fhqRenderShop!=='function')return false;
  const oldRender=window.fhqRenderShop||fhqRenderShop;
  window.__fhq8849OldRenderShop=window.__fhq8849OldRenderShop||oldRender;
  const render=function(x){
    try{
      const p=x&&x.profile?x.profile:(typeof getAccountProfile==='function'?getAccountProfile():{});
      if(x&&x.profile&&typeof fhqSetRuntimeIdentity==='function')fhqSetRuntimeIdentity(x.profile);
      const c=window.__fhqCosmetics||{},inv=Array.isArray(c.inventory)?c.inventory:[];
      const coins=Math.max(Number(p&&p.hqCoins)||0,Number(c.coins)||0,typeof fhqCachedCoins==='function'?fhqCachedCoins():0);
      if(typeof fhqRememberCoins==='function')fhqRememberCoins(coins);
      const g=document.getElementById('fhqShopGrid');if(!g)return;
      hideGridNow();
      const filter=(typeof fhqShopFilter!=='undefined'&&(fhqShopFilter==='pack'||fhqShopFilter==='avatar'))?fhqShopFilter:'all';
      const cardPacks=PACKS.filter(p=>p.category==='card'),avatarPack=PACKS.find(p=>p.category==='avatar');
      function packHTML(pk){return '<article class="fhq-shop-item fhq-pack-card '+esc2(pk.rarity||'')+'" data-shop-pack-card="'+esc2(pk.id)+'"><div class="fhq-shop-preview">'+packPreview8849(pk)+'</div><h3>'+esc2(pk.name)+'</h3><div class="fhq-v8831-pack-meta">'+esc2(pk.guaranteeLabel||((pk.count||1)+' CARDS'))+'</div><p>'+esc2(pk.description||'Football HQ card pack.')+'</p><div class="fhq-shop-buy"><span><span class="fhq-coin-icon" style="display:inline-grid;width:18px;height:18px;vertical-align:middle"></span> '+pk.price+' <button class="fhq-pack-odds-btn" data-pack-odds="'+esc2(pk.id)+'" aria-label="View pack odds">i</button></span><button data-pack-buy="'+esc2(pk.id)+'">PURCHASE</button></div></article>'}
      function avatarHTML(i){const owned=inv.some(v=>v&&v.source==='shop'&&v.shopId===i.id);if(typeof fhqShopPreview!=='function')return '';return '<article class="fhq-shop-item '+esc2(i.rarity||'')+'"><div class="fhq-shop-preview">'+fhqShopPreview(i)+'</div><h3>'+esc2(i.name)+'</h3><p>'+esc2(i.description||'Football HQ avatar.')+'</p><div class="fhq-shop-buy"><span><span class="fhq-coin-icon" style="display:inline-grid;width:18px;height:18px;vertical-align:middle"></span> '+i.price+'</span>'+(owned?'<b class="fhq-shop-owned">OWNED</b>':'<button data-shop-buy="'+esc2(i.id)+'">PURCHASE</button>')+'</div></article>'}
      let html='';
      if(filter==='all')html='<div class="fhq-v8831-shop-heading"><span>FEATURED</span><h2>Featured Packs</h2><p>Eight Football HQ card packs currently in rotation.</p></div>'+cardPacks.map(packHTML).join('');
      else if(filter==='pack')html='<div class="fhq-v8831-shop-heading"><span>PACKS</span><h2>Card Packs</h2><p>Collection cards only. Avatar products stay in the Avatars tab.</p></div>'+cardPacks.map(packHTML).join('');
      else html='<div class="fhq-v8831-shop-heading"><span>AVATARS</span><h2>Avatars</h2><p>Profile cosmetics and the Avatar Pack live here.</p></div>'+(avatarPack?packHTML(avatarPack):'')+((x&&Array.isArray(x.items)?x.items:[]).filter(i=>i.type==='avatar').map(avatarHTML).join(''));
      g.innerHTML=html+'<div class="fhq-shop-exclusive"><strong>Prestige stays earned.</strong> Daily/Weekly champion, achievement, and prestige HQ Pass rewards cannot be purchased.</div>';
      g.querySelectorAll('[data-shop-buy]').forEach(b=>b.onclick=function(){if(typeof fhqBuyShopItem==='function')fhqBuyShopItem(this.dataset.shopBuy)});
      g.querySelectorAll('[data-pack-buy]').forEach(b=>b.onclick=function(){if(typeof fhqV8831UnlockAudio==='function')fhqV8831UnlockAudio();if(typeof fhqBuyPack==='function')fhqBuyPack(this.dataset.packBuy)});
      g.querySelectorAll('[data-pack-odds]').forEach(b=>b.onclick=function(e){e.stopPropagation();if(typeof fhqOpenPackOdds==='function')fhqOpenPackOdds(this.dataset.packOdds)});
      revealCurrentGrid(g);
    }catch(e){console.warn('[FHQ V88.85] render failed',e);return oldRender(x)}
  };
  try{window.fhqRenderShop=render}catch(e){}try{fhqRenderShop=render}catch(e){}
  return true;
}

function injectStyle(){
  if(document.getElementById('fhqV8849ShopStyle'))return;
  const s=document.createElement('style');s.id='fhqV8849ShopStyle';s.textContent='\
  #fhqShopGrid:not([data-turf-shop-ready="1"]){visibility:hidden!important;opacity:0!important}\
  #fhqShopGrid[data-turf-shop-ready="1"]{visibility:visible;opacity:1;transition:opacity .10s ease}\
  .fhq-v8849-pack-art{width:100%;height:100%;min-height:235px;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 38%,#173040 0,#091218 60%,#05090c 100%);border-radius:14px}\
  .fhq-v8849-pack-art img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 12px 18px rgba(0,0,0,.55))}\
  #fhqShopGrid{grid-template-columns:repeat(auto-fit,minmax(285px,1fr))!important}\
  #fhqShopGrid .fhq-shop-preview{min-height:250px!important}\
  ';document.head.appendChild(s)
}

/*
  HARD NO-FLASH FIX:
  Capture Shop navigation before legacy handlers fire. Removing the ready
  flag happens in the same click event, before the browser can paint the
  legacy pack markup. Our renderer reveals the grid again when finished.
*/
document.addEventListener('click',function(e){
  const t=e.target&&e.target.closest?e.target.closest('button,a,[data-fhq-nav],[data-view]'):null;
  if(!t)return;
  const nav=String(t.getAttribute('data-fhq-nav')||t.getAttribute('data-view')||'').toLowerCase();
  const txt=String(t.textContent||'').trim().toLowerCase();
  if(nav==='shop'||txt==='shop'||txt.endsWith(' shop')) hideGridNow();
},true);

injectStyle();
let tries=0;const t=setInterval(function(){tries++;if(install()||tries>30){clearInterval(t);setTimeout(function(){try{if(typeof fhqLoadShop==='function')fhqLoadShop()}catch(e){}},120)}},100);
console.log('[TURF] V88.85 hard no-flash shop renderer active');
})();
