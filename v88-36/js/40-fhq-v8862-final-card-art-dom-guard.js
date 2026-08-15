/* ============================================================
   FOOTBALL HQ V88.62 — FINAL CARD ART DOM GUARD
   GitHub path:
   v88-36/js/40-fhq-v8862-final-card-art-dom-guard.js

   PURPOSE
   The live site still has an older V81 procedural renderer that can replace
   exact images AFTER newer image maps are registered. That is why Set 002
   names appeared inside the old HQ placeholder/template.

   This guard runs AFTER render and replaces ANY procedural card whose
   catalog ID follows ts###-### with the exact PNG for that ID.

   FUTURE-PROOF RULE:
     ts002-026 -> /v88-36/cards/002/ts002-026.png
     ts003-017 -> /v88-36/cards/003/ts003-017.png
   Future sets therefore only need:
     1) catalog IDs using ts###-###
     2) matching PNG filenames in cards/###/
   No per-card renderer coding.
   ============================================================ */
(function(){
  'use strict';
  if(window.__FHQ_V8862_FINAL_ART_DOM_GUARD__) return;
  window.__FHQ_V8862_FINAL_ART_DOM_GUARD__=true;

  var RAW='https://raw.githubusercontent.com/FootballHQ/footballhq-assets/main/v88-36/cards/';
  var PAGES='https://footballhq.github.io/footballhq-assets/v88-36/cards/';

  /* Locked Set 002 fallback registry. Used even before Collections has loaded. */
  var SET002=[
    ['ts002-001','Conehead Cal','common'],
    ['ts002-002','Whistle Wit','common'],
    ['ts002-003','Towel Snap','common'],
    ['ts002-004','Clip Kip','common'],
    ['ts002-005','Bench Bro','common'],
    ['ts002-006','Cup Stack Jack','common'],
    ['ts002-007','Tape Roll Tony','common'],
    ['ts002-008','Lace Ace','common'],
    ['ts002-009','Ball Pump Paul','common'],
    ['ts002-010','Waterboy Wally','common'],
    ['ts002-011','Glove Guy','common'],
    ['ts002-012','Gator Gulp','common'],
    ['ts002-013','Chalk Chuck','common'],
    ['ts002-014','Sticky Stan','common'],
    ['ts002-015','Headset Hank','uncommon'],
    ['ts002-016','Net Ripper','uncommon'],
    ['ts002-017','Strapzap','uncommon'],
    ['ts002-018','Chilly Willy','uncommon'],
    ['ts002-019','Megaphone Moe','uncommon'],
    ['ts002-020','Marker Mike','uncommon'],
    ['ts002-021','Downs Dash','uncommon'],
    ['ts002-022','Cable Carl','uncommon'],
    ['ts002-023','Playcard Pete','uncommon'],
    ['ts002-024','Chain Gang Chief','rare'],
    ['ts002-025','Flagger Flash','rare'],
    ['ts002-026','Cooler Crusher','rare'],
    ['ts002-027','Tablet Titan','rare'],
    ['ts002-028','Equip Master','rare'],
    ['ts002-029','Clock Commander','rare'],
    ['ts002-030','Coach Circuit','epic'],
    ['ts002-031','Cartwheel','epic'],
    ['ts002-032','Playcall Phantom','epic'],
    ['ts002-033','Signal Boost','epic'],
    ['ts002-034','Hydration Hero','epic'],
    ['ts002-035','Signal Storm','legendary'],
    ['ts002-036','First Down King','legendary'],
    ['ts002-037','Sideline Supreme','legendary'],
    ['ts002-038','Momentum Meter','legendary'],
    ['ts002-039','The Command Center','obsidian'],
    ['ts002-040','Coach Circuit','signature']
  ];

  function norm(s){
    return String(s||'').toLowerCase().replace(/[—–-]/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
  }
  function parts(id){
    var m=String(id||'').match(/^ts(\d{3})-(\d{3})$/i);
    return m?{set:m[1],num:m[2]}:null;
  }
  function rawUrl(id){
    var p=parts(id); return p ? RAW+p.set+'/'+id+'.png?v=8862' : '';
  }
  function pagesUrl(id){
    var p=parts(id); return p ? PAGES+p.set+'/'+id+'.png?v=8862' : '';
  }

  function registry(){
    var rows=SET002.slice();
    try{
      var c=window.__fhqCardCatalog;
      if(Array.isArray(c)){
        c.forEach(function(x){
          if(x && parts(x.id)) rows.push([String(x.id),String(x.name||''),String(x.rarity||'common')]);
        });
      }
    }catch(e){}
    var seen={}, out=[];
    rows.forEach(function(r){
      var k=r[0];
      if(!seen[k]){seen[k]=1;out.push(r);}
    });
    return out;
  }

  function findByVisibleCard(node){
    var text=norm(node.textContent||'');
    if(!text) return null;

    var cls=String(node.className||'').toLowerCase();
    var rarity='';
    ['signature','obsidian','legendary','epic','rare','uncommon','common'].some(function(r){
      if(cls.indexOf(r)>=0 || cls.indexOf('fhq-r-'+r)>=0){rarity=r;return true}
      return false;
    });

    var rows=registry(), candidates=[];
    rows.forEach(function(r){
      var name=norm(r[1]);
      if(name && text.indexOf(name)>=0) candidates.push(r);
    });
    if(!candidates.length) return null;
    if(rarity){
      var exact=candidates.find(function(r){return String(r[2]).toLowerCase()===rarity});
      if(exact) return {id:exact[0],name:exact[1],rarity:exact[2]};
    }
    var r=candidates[0];
    return {id:r[0],name:r[1],rarity:r[2]};
  }

  function exactWrap(card){
    var id=card.id, src=rawUrl(id), backup=pagesUrl(id);
    var wrap=document.createElement('div');
    wrap.className='fhq-v85-card-img-wrap fhq-v8862-exact-art';
    wrap.dataset.cardId=id;
    wrap.dataset.exact='1';

    var im=document.createElement('img');
    im.className='fhq-v85-card-img';
    im.alt=card.name||id;
    im.draggable=false;
    im.loading='eager';
    im.decoding='async';
    im.src=src;
    im.dataset.backup=backup;
    im.onerror=function(){
      if(this.dataset.triedBackup!=='1'){
        this.dataset.triedBackup='1';
        this.src=this.dataset.backup;
      }else{
        console.error('[FootballHQ] exact art file failed:',id,src,backup);
      }
    };
    wrap.appendChild(im);
    return wrap;
  }

  function repairContainer(container){
    if(!container || container.nodeType!==1) return;

    /* Covers both pack rewards and collection/locker cards. */
    var art=container.matches && container.matches('.fhq-card-art.v81,.fhq-card-art:not(.fhq-v8862-exact-art)')
      ? container
      : container.querySelector && container.querySelector('.fhq-card-art.v81');

    if(!art) return;
    if(art.dataset && art.dataset.v8862Done==='1') return;

    var card=findByVisibleCard(art);
    if(!card) return;

    var replacement=exactWrap(card);
    art.replaceWith(replacement);
  }

  function repairAll(root){
    root=root||document;
    var selectors=[
      '.fhq-pack-reward',
      '#fhqAlbumGrid .fhq-card-art',
      '#fhqLockerGrid .fhq-card-art',
      '.fhq-card-art.v81'
    ];
    try{
      root.querySelectorAll(selectors.join(',')).forEach(function(n){
        repairContainer(n);
        if(n.matches && n.matches('.fhq-card-art.v81')) repairContainer(n);
      });
    }catch(e){}
  }

  /* If a pack renderer creates a V81 placeholder, repair it immediately. */
  var observer=new MutationObserver(function(records){
    records.forEach(function(rec){
      rec.addedNodes.forEach(function(n){
        if(n.nodeType!==1) return;
        repairContainer(n);
        repairAll(n);
      });
    });
  });

  function boot(){
    repairAll(document);
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();

  /* One extra repair on click/navigation/pack transitions. */
  document.addEventListener('click',function(){setTimeout(function(){repairAll(document)},30)},true);
  [250,800,1800,3500].forEach(function(ms){setTimeout(function(){repairAll(document)},ms)});

  if(!document.getElementById('fhqV8862ExactArtCss')){
    var s=document.createElement('style');
    s.id='fhqV8862ExactArtCss';
    s.textContent=`
      .fhq-v8862-exact-art{
        width:100%!important;
        aspect-ratio:720/1040!important;
        overflow:hidden!important;
        background:#05090b!important;
      }
      .fhq-v8862-exact-art>img{
        width:100%!important;
        height:100%!important;
        object-fit:contain!important;
        object-position:center!important;
        display:block!important;
      }
    `;
    document.head.appendChild(s);
  }

  window.FHQ_REPAIR_CARD_ART=function(){repairAll(document)};
  console.log('[FootballHQ] V88.62 final card-art DOM guard active');
})();
