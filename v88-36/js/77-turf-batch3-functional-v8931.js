/* ============================================================
   TURF V89.31 — BATCH 3 FUNCTIONAL CLEANUP
   - 40-Yard Dash owned-card selector guard
   - Shop preload/no legacy flash guard
   - Collections first-click reliability
   - No featured/card packs inside Avatars filter
   - Unique collection-set presentation for 001 / 002
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8931_BATCH3__) return;
window.__TURF_V8931_BATCH3__=true;

function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function txt(el){return String(el&&el.textContent||'').trim().toLowerCase()}

function addCss(){
  if(qs('#turfV8931Css')) return;
  var s=document.createElement('style');
  s.id='turfV8931Css';
  s.textContent=`
    /* shop: never expose legacy/half-painted pack state */
    #fhqShopGrid[data-turf8931-loading="1"]{visibility:hidden!important;opacity:0!important}
    #fhqShopGrid{transition:opacity .12s ease}

    /* collections: unique set identities */
    #fhqAlbumGrid .turf8931-set001,
    #fhqAlbumGrid .turf8931-set002{position:relative!important;overflow:hidden!important;isolation:isolate}
    #fhqAlbumGrid .turf8931-set001::before,
    #fhqAlbumGrid .turf8931-set002::before{
      content:"";position:absolute;inset:0;z-index:-2;pointer-events:none;
    }
    #fhqAlbumGrid .turf8931-set001::after,
    #fhqAlbumGrid .turf8931-set002::after{
      content:"";position:absolute;right:5%;top:12%;width:34%;aspect-ratio:1;border-radius:28px;z-index:-1;pointer-events:none;
      opacity:.55;filter:blur(.2px)
    }
    #fhqAlbumGrid .turf8931-set001::before{
      background:radial-gradient(circle at 70% 25%,rgba(46,210,255,.24),transparent 34%),linear-gradient(145deg,#071c2d,#0b3441 58%,#0c1d25)!important;
    }
    #fhqAlbumGrid .turf8931-set001::after{
      background:linear-gradient(135deg,rgba(62,220,255,.16),rgba(42,115,255,.08));border:1px solid rgba(90,221,255,.26);box-shadow:0 0 42px rgba(43,183,255,.12)
    }
    #fhqAlbumGrid .turf8931-set002::before{
      background:radial-gradient(circle at 72% 26%,rgba(246,191,72,.20),transparent 34%),linear-gradient(145deg,#23170b,#3b2711 52%,#141c23)!important;
    }
    #fhqAlbumGrid .turf8931-set002::after{
      background:linear-gradient(135deg,rgba(246,191,72,.18),rgba(190,91,25,.08));border:1px solid rgba(255,199,87,.28);box-shadow:0 0 42px rgba(236,158,48,.11)
    }
    #fhqAlbumGrid .turf8931-set001 .turf8931-set-tag,
    #fhqAlbumGrid .turf8931-set002 .turf8931-set-tag{
      display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:999px;font-size:9px;font-weight:1000;letter-spacing:.12em;text-transform:uppercase;margin-bottom:7px
    }
    #fhqAlbumGrid .turf8931-set001 .turf8931-set-tag{color:#8fe8ff;border:1px solid rgba(85,215,255,.38);background:rgba(6,34,48,.66)}
    #fhqAlbumGrid .turf8931-set002 .turf8931-set-tag{color:#ffd276;border:1px solid rgba(255,195,78,.38);background:rgba(48,31,9,.62)}
  `;
  document.head.appendChild(s);
}

function currentShopFilter(){
  try{if(typeof fhqShopFilter!=='undefined') return String(fhqShopFilter||'all').toLowerCase()}catch(e){}
  var active=qs('[data-shop-filter].active');
  return active ? String(active.getAttribute('data-shop-filter')||'all').toLowerCase() : 'all';
}

function hardenShop(){
  var g=qs('#fhqShopGrid'); if(!g) return;
  var filter=currentShopFilter();

  if(filter==='avatar'){
    qsa('[data-shop-pack-card]',g).forEach(function(card){card.remove()});
    qsa('.fhq-v8831-shop-heading',g).forEach(function(h){
      if(/featured packs|card packs/i.test(h.textContent||'')) h.remove();
    });
  }

  // If current renderer is available, repaint immediately and only reveal after the current cards exist.
  if(typeof window.__turfCurrentShopRender==='function'){
    var hasCurrent = !!g.querySelector('[data-shop-pack-card],.fhq-shop-item');
    if(!hasCurrent){
      g.dataset.turf8931Loading='1';
      try{window.__turfCurrentShopRender({})}catch(e){}
      requestAnimationFrame(function(){delete g.dataset.turf8931Loading});
    } else delete g.dataset.turf8931Loading;
  }
}

function collectionName(card){
  var t=(card.textContent||'').toLowerCase();
  if(t.indexOf('gridiron')>-1) return '001';
  if(t.indexOf('sideline')>-1) return '002';
  return '';
}

function decorateCollections(){
  var grid=qs('#fhqAlbumGrid'); if(!grid) return;
  var cards=qsa('article,button,.fhq-album-set,.fhq-collection-set,.collection-card',grid);
  cards.forEach(function(card){
    var set=collectionName(card); if(!set) return;
    card.classList.add(set==='001'?'turf8931-set001':'turf8931-set002');
    if(!qs('.turf8931-set-tag',card)){
      var anchor=qs('h2,h3,.title,strong',card)||card.firstElementChild;
      var tag=document.createElement('div');
      tag.className='turf8931-set-tag';
      tag.textContent=set==='001'?'001 • THE GRIDIRON':'002 • THE SIDELINE';
      if(anchor&&anchor.parentNode) anchor.parentNode.insertBefore(tag,anchor); else card.insertBefore(tag,card.firstChild);
    }
  });
}

function reliableCollectionClick(e){
  var page=qs('#fhqAlbumPage');
  if(!page || page.classList.contains('hidden') || getComputedStyle(page).display==='none') return;
  var hit=e.target&&e.target.closest?e.target.closest('#fhqAlbumGrid button,#fhqAlbumGrid [data-set],#fhqAlbumGrid [data-album-set],#fhqAlbumGrid article,.turf8906-collection-set'):null;
  if(!hit) return;
  var set=hit.getAttribute('data-set')||hit.getAttribute('data-album-set')||hit.getAttribute('data-turf8906-set')||collectionName(hit);
  if(!set) return;

  // The legacy detail render sometimes lands one tick after the first click. Retry the actual
  // set action once after state/data finishes painting, without creating a click loop.
  var key=String(set).toLowerCase();
  window.__turf8931LastSet=key;
  [70,220].forEach(function(ms){
    setTimeout(function(){
      if(window.__turf8931LastSet!==key) return;
      var detail=qs('#fhqAlbumDetail,#fhqCollectionDetail,.fhq-album-detail,.collection-detail');
      var visible=detail && getComputedStyle(detail).display!=='none' && !detail.classList.contains('hidden');
      if(visible) return;
      try{
        if(typeof window.fhqOpenAlbumSet==='function') return window.fhqOpenAlbumSet(set);
        if(typeof window.fhqOpenCollectionSet==='function') return window.fhqOpenCollectionSet(set);
        if(typeof window.fhqShowAlbumSet==='function') return window.fhqShowAlbumSet(set);
      }catch(err){}
    },ms);
  });
}

function verifyDashLink(){
  // Current 40-yard build already contains the horizontal all-owned-card chooser.
  // Preserve the account token when TURF opens the trial so the inventory endpoint can return account-owned cards.
  qsa('a[href*="40-yard-dash"],button[data-trial*="40"],[data-trial-id*="40"]').forEach(function(el){
    if(el.dataset.turf8931Dash==='1') return;
    el.dataset.turf8931Dash='1';
    if(el.tagName==='A'){
      try{
        var u=new URL(el.href,location.href);
        var token='';
        try{if(typeof getAccountProfile==='function'){var p=getAccountProfile()||{};token=p.token||p.accountToken||p.id||''}}catch(e){}
        if(token&&!u.searchParams.get('token')){u.searchParams.set('token',token);el.href=u.toString()}
      }catch(e){}
    }
  });
}

function apply(){addCss();hardenShop();decorateCollections();verifyDashLink()}

document.addEventListener('click',function(e){
  reliableCollectionClick(e);
  var nav=e.target&&e.target.closest?e.target.closest('[data-fhq-nav="shop"],[data-fhq-nav="album"],[data-shop-filter]'):null;
  if(nav){[0,80,250,700].forEach(function(ms){setTimeout(apply,ms)})}
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,400,1000,2200].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8931Timer);window.__turf8931Timer=setTimeout(apply,70)}).observe(document.documentElement,{childList:true,subtree:true});
})();
