/* ============================================================
   TURF V89.06 — BATCH 1 REPAIR
   Fixes:
   - Empty Locker page fallback render
   - Empty Collections page fallback render
   - Admin controls pointer/click recovery
   - Fourth Quarter pack art hard fallback
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8906_BATCH1_REPAIR__) return;
  window.__TURF_V8906_BATCH1_REPAIR__=true;

  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  function addCss(){
    if(qs('#turfV8906RepairCss')) return;
    var s=document.createElement('style');
    s.id='turfV8906RepairCss';
    s.textContent=`
      #fhqLockerPage,#fhqAlbumPage,#fhqAdminPage{pointer-events:auto!important}
      #fhqLockerPage *,#fhqAlbumPage *,#fhqAdminPage *{pointer-events:auto}
      #fhqAdminPage button,.fhq-admin-btn,.fhq-admin-tab{position:relative!important;z-index:5!important;cursor:pointer!important}
      .turf8906-empty-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:20px}
      .turf8906-card{border:1px solid rgba(67,178,229,.30);background:linear-gradient(155deg,#0c1d29,#08131b);border-radius:16px;padding:18px;color:#f5f9fc;min-height:130px}
      .turf8906-card small{display:block;color:#77d5ff;font-size:9px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px}
      .turf8906-card strong{display:block;font-size:18px;margin-bottom:6px}.turf8906-card span{color:#93a9b8;font-size:12px;line-height:1.45}
      .turf8906-collection-set{border:1px solid rgba(71,188,239,.34);background:linear-gradient(155deg,#0d2230,#081720);border-radius:18px;padding:20px;color:#fff;cursor:pointer;text-align:left;width:100%}
      .turf8906-collection-set h3{margin:0 0 5px;font-size:21px}.turf8906-collection-set p{margin:0;color:#94aab8;font-size:12px}
    `;
    document.head.appendChild(s);
  }

  function cosmetics(){return window.__fhqCosmetics||{}}
  function catalog(){
    if(Array.isArray(window.__fhqCardCatalog)) return window.__fhqCardCatalog;
    if(Array.isArray(window.FHQ_CARD_CATALOG)) return window.FHQ_CARD_CATALOG;
    return [];
  }

  function repairLocker(){
    var page=qs('#fhqLockerPage');
    if(!page || page.classList.contains('hidden') || getComputedStyle(page).display==='none') return;
    var grid=qs('#fhqLockerGrid');
    if(!grid || String(grid.innerHTML||'').trim()) return;
    var c=cosmetics(), inv=Array.isArray(c.inventory)?c.inventory.slice():[];
    var ownedCards=Array.isArray(c.collection)?c.collection:[];
    if(!inv.length){
      inv=[
        {type:'avatar',name:'TURF Starter Avatar',source:'Starter'},
        {type:'title',name:'Rookie',source:'Starter'}
      ];
    }
    grid.innerHTML='<div class="turf8906-empty-grid">'+inv.filter(function(x){return x&&x.type!=='coins'&&x.type!=='welcome'}).map(function(x){
      var name=x.name||x.value||'Owned Item';
      return '<article class="turf8906-card"><small>'+esc(x.type||'ITEM')+'</small><strong>'+esc(name)+'</strong><span>'+esc(x.source||'Owned')+'</span></article>';
    }).join('')+(ownedCards.length?'<article class="turf8906-card"><small>CARDS</small><strong>'+ownedCards.length+' owned cards</strong><span>Your collectible cards remain saved in your collection.</span></article>':'')+'</div>';
  }

  function repairCollections(){
    var page=qs('#fhqAlbumPage');
    if(!page || page.classList.contains('hidden') || getComputedStyle(page).display==='none') return;
    var grid=qs('#fhqAlbumGrid');
    if(!grid || String(grid.innerHTML||'').trim()) return;
    var cat=catalog(), c=cosmetics(), owned=Array.isArray(c.collection)?c.collection:[];
    var sets={};
    cat.forEach(function(card){
      if(!card) return;
      var set=card.set||card.setName||'The Gridiron';
      if(!sets[set]) sets[set]=[];
      sets[set].push(card);
    });
    var names=Object.keys(sets);
    if(!names.length) names=['The Gridiron','The Sideline'];
    grid.innerHTML='<div class="turf8906-empty-grid">'+names.map(function(name){
      var cards=sets[name]||[];
      var have=cards.filter(function(card){var id=card.id||card.cardId;return owned.some(function(o){return (typeof o==='string'?o:(o&&o.id))===id})}).length;
      return '<button type="button" class="turf8906-collection-set" data-turf8906-set="'+esc(name)+'"><small>COLLECTION</small><h3>'+esc(name)+'</h3><p>'+have+' / '+(cards.length||'—')+' cards owned</p></button>';
    }).join('')+'</div>';
  }

  function repairAdmin(){
    var page=qs('#fhqAdminPage');
    if(!page || page.classList.contains('hidden') || getComputedStyle(page).display==='none') return;
    qsa('button',page).forEach(function(b){
      b.style.pointerEvents='auto';b.style.position='relative';b.style.zIndex='5';
    });
    qsa('.fhq-admin-tab,[data-admin-tab]',page).forEach(function(b){
      if(b.dataset.turf8906AdminTab==='1') return;
      b.dataset.turf8906AdminTab='1';
      b.addEventListener('click',function(){
        var name=this.dataset.adminTab;
        if(!name) return;
        qsa('.fhq-admin-tab',page).forEach(function(x){x.classList.toggle('active',x===b)});
        qsa('.fhq-admin-panel',page).forEach(function(x){x.classList.remove('show')});
        var id='fhqAdmin'+name.charAt(0).toUpperCase()+name.slice(1);
        var panel=qs('#'+id);if(panel)panel.classList.add('show');
      },false);
    });
  }

  var FOURTH='https://raw.githubusercontent.com/FootballHQ/footballhq-assets/main/v88-48/packs/pack-fourthquarter-v8848.png';
  function repairFourthQuarter(){
    var card=qs('[data-shop-pack-card="fourthquarter_pack"]');
    if(!card) return;
    var img=qs('img',card);if(!img) return;
    if(img.dataset.turf8906Fixed==='1') return;
    img.dataset.turf8906Fixed='1';
    img.onerror=function(){this.onerror=null;this.src=FOURTH+'?v=8906'};
    if(!img.complete || img.naturalWidth===0) img.src=FOURTH+'?v=8906';
  }

  function repair(){addCss();repairLocker();repairCollections();repairAdmin();repairFourthQuarter()}

  document.addEventListener('click',function(e){
    var t=e.target&&e.target.closest?e.target.closest('[data-fhq-nav="locker"],[data-fhq-nav="album"],[data-fhq-nav="shop"],#fhqAdminPage button'):null;
    if(t){setTimeout(repair,60);setTimeout(repair,220);setTimeout(repair,700)}
  },true);

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',repair,{once:true}); else repair();
  [120,400,900,1800,3500].forEach(function(ms){setTimeout(repair,ms)});
  new MutationObserver(function(){clearTimeout(window.__turf8906RepairTimer);window.__turf8906RepairTimer=setTimeout(repair,60)}).observe(document.documentElement,{childList:true,subtree:true});
})();
