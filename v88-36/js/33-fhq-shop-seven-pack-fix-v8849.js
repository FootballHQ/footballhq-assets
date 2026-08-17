/* ============================================================
   TURF V88.87 — SHOP DIRECT RENDER + SIDEBAR HARD SCROLL

   FIXES
   - Shop click no longer waits for the legacy fhqLoadShop renderer.
   - Current packs are painted directly by this patch after navigation.
   - Legacy async shop writes are automatically replaced with current packs.
   - Categorized desktop sidebar is forced to exceed/scroll rather than shrink.
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
  rookie_cards:A+'pack-rookie-v8848.png?v=8887',
  scrimmage_pack:A+'pack-scrimmage-v8848.png?v=8887',
  gametime_pack:A+'pack-gametime-v8848.png?v=8887',
  redzone_pack:A+'pack-redzone-v8848.png?v=8887',
  fourthquarter_pack:A+'pack-fourthquarter-v8848.png?v=8887',
  hailmary_pack:A+'pack-hailmary-v8848.png?v=8887',
  primetime_pack:A+'pack-primetime-v8848.png?v=8887',
  overtime_pack:A+'pack-primetime-v8848.png?v=8887'
};

function esc2(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
function packPreview(pk){const url=ART[pk.id];if(url)return '<div class="fhq-v8849-pack-art"><img src="'+url+'" alt="'+esc2(pk.name)+'" draggable="false"></div>';return '<div class="fhq-v8849-pack-art fallback"><strong>'+esc2(pk.name)+'</strong></div>'}
function currentFilter(){try{return (typeof fhqShopFilter!=='undefined'&&(fhqShopFilter==='pack'||fhqShopFilter==='avatar'))?fhqShopFilter:'all'}catch(e){return 'all'}}
function profile(){try{return typeof getAccountProfile==='function'?getAccountProfile():{}}catch(e){return {}}}
function inventory(){const c=window.__fhqCosmetics||{};return Array.isArray(c.inventory)?c.inventory:[]}

let rendering=false;
function renderCurrentShop(x){
  const g=document.getElementById('fhqShopGrid');if(!g)return false;
  rendering=true;
  try{
    const p=x&&x.profile?x.profile:profile();
    const inv=inventory();
    const coins=Math.max(Number(p&&p.hqCoins)||0,Number((window.__fhqCosmetics||{}).coins)||0,(()=>{try{return typeof fhqCachedCoins==='function'?Number(fhqCachedCoins())||0:0}catch(e){return 0}})());
    const coinEl=document.getElementById('fhqShopCoins');if(coinEl)coinEl.textContent=coins;
    const filter=currentFilter();
    const cardPacks=PACKS.filter(p=>p.category==='card');
    const avatarPack=PACKS.find(p=>p.category==='avatar');
    function packHTML(pk){return '<article class="fhq-shop-item fhq-pack-card '+esc2(pk.rarity||'')+'" data-shop-pack-card="'+esc2(pk.id)+'"><div class="fhq-shop-preview">'+packPreview(pk)+'</div><h3>'+esc2(pk.name)+'</h3><div class="fhq-v8831-pack-meta">'+esc2(pk.guaranteeLabel)+'</div><p>'+esc2(pk.description)+'</p><div class="fhq-shop-buy"><span><span class="fhq-coin-icon" style="display:inline-grid;width:18px;height:18px;vertical-align:middle"></span> '+pk.price+' <button class="fhq-pack-odds-btn" data-pack-odds="'+esc2(pk.id)+'">i</button></span><button data-pack-buy="'+esc2(pk.id)+'">PURCHASE</button></div></article>'}
    function avatarHTML(i){const owned=inv.some(v=>v&&v.source==='shop'&&v.shopId===i.id);let prev='';try{if(typeof fhqShopPreview==='function')prev=fhqShopPreview(i)}catch(e){}return '<article class="fhq-shop-item '+esc2(i.rarity||'')+'"><div class="fhq-shop-preview">'+prev+'</div><h3>'+esc2(i.name)+'</h3><p>'+esc2(i.description||'TURF avatar.')+'</p><div class="fhq-shop-buy"><span>'+i.price+'</span>'+(owned?'<b class="fhq-shop-owned">OWNED</b>':'<button data-shop-buy="'+esc2(i.id)+'">PURCHASE</button>')+'</div></article>'}
    let html='';
    if(filter==='all') html='<div class="fhq-v8831-shop-heading"><span>FEATURED</span><h2>Featured Packs</h2><p>Eight current card packs in rotation.</p></div>'+cardPacks.map(packHTML).join('');
    else if(filter==='pack') html='<div class="fhq-v8831-shop-heading"><span>PACKS</span><h2>Card Packs</h2><p>Current collectible card packs.</p></div>'+cardPacks.map(packHTML).join('');
    else html='<div class="fhq-v8831-shop-heading"><span>AVATARS</span><h2>Avatars</h2><p>Profile cosmetics and the Avatar Pack live here.</p></div>'+(avatarPack?packHTML(avatarPack):'')+((x&&Array.isArray(x.items)?x.items:[]).filter(i=>i.type==='avatar').map(avatarHTML).join(''));
    g.innerHTML=html+'<div class="fhq-shop-exclusive"><strong>Prestige stays earned.</strong> Daily/Weekly champion, achievement, and prestige rewards cannot be purchased.</div>';
    g.dataset.turfShopReady='1';g.style.visibility='visible';g.style.opacity='1';
    g.querySelectorAll('[data-shop-buy]').forEach(b=>b.onclick=function(){try{if(typeof fhqBuyShopItem==='function')fhqBuyShopItem(this.dataset.shopBuy)}catch(e){}});
    g.querySelectorAll('[data-pack-buy]').forEach(b=>b.onclick=function(){try{if(typeof fhqV8831UnlockAudio==='function')fhqV8831UnlockAudio();if(typeof fhqBuyPack==='function')fhqBuyPack(this.dataset.packBuy)}catch(e){}});
    g.querySelectorAll('[data-pack-odds]').forEach(b=>b.onclick=function(e){e.stopPropagation();try{if(typeof fhqOpenPackOdds==='function')fhqOpenPackOdds(this.dataset.packOdds)}catch(err){}});
    return true;
  } finally {setTimeout(()=>{rendering=false},0)}
}
window.__turfCurrentShopRender=renderCurrentShop;

function injectStyle(){
  if(document.getElementById('turfV8887ShopSidebarCss'))return;
  const s=document.createElement('style');s.id='turfV8887ShopSidebarCss';s.textContent=`
    #fhqSidebar.fhq-sidebar,.fhq-sidebar{
      overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;
      -webkit-overflow-scrolling:touch!important;scrollbar-width:thin!important;
    }
    #fhqSidebar .fhq-nav,.fhq-sidebar .fhq-nav{flex:0 0 auto!important;overflow:visible!important;padding-bottom:14px!important}
    #fhqSidebar .fhq-side-spacer,.fhq-sidebar .fhq-side-spacer{flex:0 0 0!important;height:0!important;min-height:0!important}
    #fhqSidebar .fhq-side-foot,.fhq-sidebar .fhq-side-foot{flex:0 0 auto!important;margin-top:8px!important;padding-bottom:24px!important}
    .fhq-v8849-pack-art{width:100%;height:100%;min-height:235px;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 38%,#173040 0,#091218 60%,#05090c 100%);border-radius:14px}
    .fhq-v8849-pack-art img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 12px 18px rgba(0,0,0,.55))}
    #fhqShopGrid{grid-template-columns:repeat(auto-fit,minmax(285px,1fr))!important;visibility:visible!important;opacity:1!important}
    #fhqShopGrid .fhq-shop-preview{min-height:250px!important}
  `;document.head.appendChild(s)
}

function paintAfterShopClick(){
  const g=document.getElementById('fhqShopGrid');
  if(g){g.style.visibility='hidden';g.style.opacity='0'}
  requestAnimationFrame(function(){renderCurrentShop({profile:profile()})});
  setTimeout(function(){renderCurrentShop({profile:profile()})},80);
  setTimeout(function(){renderCurrentShop({profile:profile()})},260);
}

document.addEventListener('click',function(e){
  const t=e.target&&e.target.closest?e.target.closest('[data-fhq-nav="shop"],[data-shop-filter]'):null;
  if(!t)return;
  if(t.matches('[data-fhq-nav="shop"]')) paintAfterShopClick();
  else setTimeout(function(){renderCurrentShop({profile:profile()})},0);
},true);

function guardLegacyWrites(){
  const g=document.getElementById('fhqShopGrid');if(!g||g.__turfGuarded)return;g.__turfGuarded=true;
  new MutationObserver(function(){
    if(rendering||!document.body.classList.contains('shop-page'))return;
    if(!g.querySelector('[data-shop-pack-card]')) setTimeout(function(){if(!rendering)renderCurrentShop({profile:profile()})},0);
  }).observe(g,{childList:true,subtree:false});
}

injectStyle();
[0,120,500,1200,2500].forEach(ms=>setTimeout(function(){guardLegacyWrites();if(document.body.classList.contains('shop-page'))renderCurrentShop({profile:profile()})},ms));
console.log('[TURF] V88.87 direct shop renderer + hard sidebar scroll active');
})();