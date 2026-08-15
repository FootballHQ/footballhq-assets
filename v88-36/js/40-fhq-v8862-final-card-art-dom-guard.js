/* ============================================================
   FOOTBALL HQ V88.63 — PERMANENT CARD ART DOM GUARD
   Replace entire contents of:
   v88-36/js/40-fhq-v8862-final-card-art-dom-guard.js

   IMPORTANT:
   Filename can stay the same so Index.html does NOT need changing.

   FIXES
   - Does NOT depend on .fhq-card-art.v81 existing.
   - Finds Set 002 cards by their real visible names.
   - Works in pack reveals, collections, locker, and card viewers.
   - Forces exact PNG on top of any old procedural renderer.
   - Leaves NEW / DUPLICATE / navigation UI intact.
   - Future ts###-### cards use cards/###/ts###-###.png convention.
   ============================================================ */

(function(){
  'use strict';

  /* Replace an older loaded copy if present. */
  window.__FHQ_V8862_FINAL_ART_DOM_GUARD__ = true;
  window.__FHQ_V8863_PERMANENT_ART_GUARD__ = true;

  var RAW =
    'https://raw.githubusercontent.com/FootballHQ/footballhq-assets/main/v88-36/cards/';

  var PAGES =
    'https://footballhq.github.io/footballhq-assets/v88-36/cards/';

  var SET002 = [
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


  /* ============================================================
     BASIC HELPERS
     ============================================================ */

  function norm(v){
    return String(v || '')
      .toLowerCase()
      .replace(/[—–-]/g,' ')
      .replace(/[^a-z0-9]+/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function parts(id){
    var m = String(id || '').match(/^ts(\d{3})-(\d{3})$/i);
    if(!m) return null;

    return {
      set:m[1],
      num:m[2]
    };
  }

  function rawUrl(id){
    var p = parts(id);
    if(!p) return '';

    return RAW +
      p.set + '/' +
      String(id).toLowerCase() +
      '.png?v=8863';
  }

  function pagesUrl(id){
    var p = parts(id);
    if(!p) return '';

    return PAGES +
      p.set + '/' +
      String(id).toLowerCase() +
      '.png?v=8863';
  }


  /* ============================================================
     CARD REGISTRY
     ============================================================ */

  function registry(){
    var rows = SET002.slice();
    var seen = {};

    /*
      Also accept future catalog cards.

      This means Set 003 etc automatically works if its IDs follow:

      ts003-001
      ts003-002
      etc.
    */
    try{
      var catalog = window.__fhqCardCatalog;

      if(Array.isArray(catalog)){
        catalog.forEach(function(card){

          if(!card) return;

          var id =
            String(
              card.id ||
              card.value ||
              card.cardId ||
              ''
            );

          if(!parts(id)) return;

          rows.push([
            id,
            String(card.name || ''),
            String(card.rarity || 'common')
          ]);

        });
      }
    }catch(e){}

    return rows.filter(function(row){

      var id = String(row[0] || '');

      if(!id || seen[id]) return false;

      seen[id] = true;
      return true;

    });
  }


  function cardFromText(text){

    var haystack = norm(text);

    if(!haystack) return null;

    var rows = registry();

    /*
      Search longest names first so "Coach Circuit"
      does not accidentally win over another partial match.
    */
    rows.sort(function(a,b){
      return norm(b[1]).length - norm(a[1]).length;
    });

    for(var i=0;i<rows.length;i++){

      var row = rows[i];
      var name = norm(row[1]);

      if(!name) continue;

      if(haystack.indexOf(name) !== -1){

        return {
          id:String(row[0]),
          name:String(row[1]),
          rarity:String(row[2] || 'common')
        };

      }
    }

    return null;
  }


  /* ============================================================
     DETERMINE WHICH ELEMENT IS THE ACTUAL CARD FACE
     ============================================================ */

  function looksLikeCardBox(el){

    if(!el || el.nodeType !== 1) return false;

    var rect;

    try{
      rect = el.getBoundingClientRect();
    }catch(e){
      return false;
    }

    if(!rect) return false;

    var w = rect.width;
    var h = rect.height;

    if(w < 80 || h < 110) return false;

    /*
      Full card art is approximately 720 / 1040 = .692.
      Allow plenty of room because reveal animations may scale it.
    */
    var ratio = w / h;

    if(ratio >= .48 && ratio <= .90) return true;

    return false;
  }


  function findCardFace(host, card){

    if(!host || !card) return null;

    /*
      First use likely card classes if they exist.
      Notice: NO dependency on .v81.
    */
    var likely = host.querySelectorAll(
      [
        '[data-card-id]',
        '[data-card]',
        '[data-cardid]',
        '.fhq-card-art',
        '.fhq-card-face',
        '.fhq-card-front',
        '.fhq-card',
        '.fhq-pack-card',
        '.fhq-reveal-card',
        '.fhq-pack-reveal-card',
        '.fhq-collection-card',
        '.fhq-collectible-card',
        '.fhq-v85-card-img-wrap'
      ].join(',')
    );

    var candidates = [];

    Array.prototype.forEach.call(likely,function(el){

      if(!el) return;

      var txt = norm(el.textContent || '');

      if(
        txt.indexOf(norm(card.name)) !== -1 ||
        looksLikeCardBox(el)
      ){
        candidates.push(el);
      }

    });


    /*
      Prefer the smallest candidate that still resembles
      the physical card itself rather than the entire pack screen.
    */
    candidates.sort(function(a,b){

      var ar = a.getBoundingClientRect();
      var br = b.getBoundingClientRect();

      return (ar.width * ar.height) - (br.width * br.height);

    });

    for(var i=0;i<candidates.length;i++){

      if(looksLikeCardBox(candidates[i])){
        return candidates[i];
      }

    }


    /*
      Last-resort structural search.

      This makes us independent of old renderer class names.
    */
    var all = host.querySelectorAll('*');
    var fallback = [];

    Array.prototype.forEach.call(all,function(el){

      if(!looksLikeCardBox(el)) return;

      var txt = norm(el.textContent || '');

      if(txt.indexOf(norm(card.name)) !== -1){
        fallback.push(el);
      }

    });

    fallback.sort(function(a,b){

      var ar = a.getBoundingClientRect();
      var br = b.getBoundingClientRect();

      return (ar.width * ar.height) - (br.width * br.height);

    });

    return fallback[0] || null;
  }


  /* ============================================================
     EXACT IMAGE OVERLAY
     ============================================================ */

  function installExactArt(face,card){

    if(!face || !card) return false;

    /*
      Already correct.
    */
    if(
      face.dataset &&
      face.dataset.fhqExactCardId === card.id
    ){
      return true;
    }


    /*
      Do NOT destroy the old renderer.

      We cover it with the exact PNG instead.

      This is much safer because:
        - animations remain attached
        - rarity effects remain attached
        - duplicate handling remains attached
        - click handling remains attached
        - pack navigation remains attached
    */

    try{

      var css = window.getComputedStyle(face);

      if(css.position === 'static'){
        face.style.position = 'relative';
      }

    }catch(e){

      face.style.position = 'relative';

    }


    /*
      Remove an obsolete exact overlay if one exists.
    */
    var old = face.querySelector(':scope > .fhq-v8863-exact-overlay');

    if(old){
      old.remove();
    }


    var overlay = document.createElement('div');

    overlay.className =
      'fhq-v8863-exact-overlay';

    overlay.dataset.cardId = card.id;


    var img = document.createElement('img');

    img.alt = card.name || card.id;
    img.draggable = false;
    img.loading = 'eager';
    img.decoding = 'async';

    img.dataset.raw = rawUrl(card.id);
    img.dataset.pages = pagesUrl(card.id);

    /*
      GitHub Pages first.
      Raw GitHub becomes automatic backup.
    */
    img.src = img.dataset.pages;


    img.onerror = function(){

      if(this.dataset.triedRaw !== '1'){

        this.dataset.triedRaw = '1';
        this.src = this.dataset.raw;
        return;

      }

      console.error(
        '[FootballHQ V88.63] PNG failed:',
        card.id,
        this.dataset.pages,
        this.dataset.raw
      );

      /*
        If both sources somehow fail, remove overlay.
        This exposes the procedural fallback instead of a broken image.
      */
      if(this.parentNode){
        this.parentNode.remove();
      }

    };


    img.onload = function(){

      face.dataset.fhqExactCardId = card.id;
      face.dataset.fhqExactArt = '1';

      console.log(
        '[FootballHQ V88.63] exact art locked:',
        card.id
      );

    };


    overlay.appendChild(img);
    face.appendChild(overlay);

    return true;
  }


  /* ============================================================
     REPAIR ONE HOST CARD
     ============================================================ */

  function repairHost(host){

    if(!host || host.nodeType !== 1) return false;

    /*
      Detect card by the entire visible host, not only an
      old .fhq-card-art child.

      THIS is the key V88.62 bug fix.
    */
    var card = cardFromText(host.textContent || '');

    if(!card) return false;


    /*
      Set 001 stays on its existing renderer.
      The permanent convention starts with Set 002.
    */
    var p = parts(card.id);

    if(!p) return false;

    if(parseInt(p.set,10) < 2){
      return false;
    }


    var face = findCardFace(host,card);

    if(!face){
      return false;
    }


    /*
      Never install the image onto the giant screen container.
    */
    var rect;

    try{
      rect = face.getBoundingClientRect();
    }catch(e){
      return false;
    }

    if(
      rect.width > window.innerWidth * .80 ||
      rect.height > window.innerHeight * .90
    ){
      return false;
    }


    return installExactArt(face,card);
  }


  /* ============================================================
     GLOBAL REPAIR
     ============================================================ */

  function repairAll(root){

    root = root || document;

    var hosts = [];


    /*
      Known FootballHQ locations.
    */
    var selectors = [

      '#fhqPackRewards > *',

      '#fhqPackRewards [class*="card"]',

      '#fhqAlbumGrid [class*="card"]',

      '#fhqLockerGrid [class*="card"]',

      '[class*="pack-reward"]',

      '[class*="reveal-card"]',

      '[class*="collection-card"]',

      '[class*="collectible-card"]'

    ];


    try{

      root
        .querySelectorAll(selectors.join(','))
        .forEach(function(el){

          if(hosts.indexOf(el) === -1){
            hosts.push(el);
          }

        });

    }catch(e){}


    /*
      The direct children of pack rewards are especially important.
    */
    var pack = document.getElementById('fhqPackRewards');

    if(pack){

      Array.prototype.forEach.call(
        pack.children,
        function(el){

          if(hosts.indexOf(el) === -1){
            hosts.push(el);
          }

        }
      );

    }


    /*
      Smaller hosts first.
    */
    hosts.sort(function(a,b){

      var ar = a.getBoundingClientRect();
      var br = b.getBoundingClientRect();

      return (ar.width * ar.height) -
             (br.width * br.height);

    });


    hosts.forEach(function(host){
      repairHost(host);
    });

  }


  /* ============================================================
     OBSERVER
     ============================================================ */

  var repairScheduled = false;

  function scheduleRepair(){

    if(repairScheduled) return;

    repairScheduled = true;

    requestAnimationFrame(function(){

      repairScheduled = false;
      repairAll(document);

    });

  }


  var observer = new MutationObserver(function(records){

    var relevant = false;

    records.forEach(function(rec){

      if(rec.type === 'childList' && rec.addedNodes.length){
        relevant = true;
      }

      if(rec.type === 'attributes'){
        relevant = true;
      }

    });

    if(relevant){
      scheduleRepair();
    }

  });


  function boot(){

    repairAll(document);

    observer.observe(
      document.documentElement,
      {
        childList:true,
        subtree:true,
        attributes:true,
        attributeFilter:[
          'class',
          'data-card-id',
          'data-card',
          'style'
        ]
      }
    );

  }


  if(document.readyState === 'loading'){

    document.addEventListener(
      'DOMContentLoaded',
      boot
    );

  }else{

    boot();

  }


  /* ============================================================
     PACK / COLLECTION TRANSITION REPAIRS
     ============================================================ */

  document.addEventListener(
    'click',
    function(){

      setTimeout(scheduleRepair,0);
      setTimeout(scheduleRepair,60);
      setTimeout(scheduleRepair,180);
      setTimeout(scheduleRepair,500);

    },
    true
  );


  /*
    Packs contain animations and delayed card reveals,
    so run several deterministic safety passes.

    This is NOT endless polling.
  */
  [
    0,
    100,
    250,
    500,
    900,
    1400,
    2200,
    3500,
    5000
  ].forEach(function(ms){

    setTimeout(function(){
      repairAll(document);
    },ms);

  });


  /* ============================================================
     CSS
     ============================================================ */

  if(!document.getElementById('fhqV8863PermanentArtCss')){

    var style = document.createElement('style');

    style.id =
      'fhqV8863PermanentArtCss';

    style.textContent = `

      .fhq-v8863-exact-overlay{
        position:absolute!important;
        inset:0!important;

        width:100%!important;
        height:100%!important;

        z-index:50!important;

        display:flex!important;
        align-items:center!important;
        justify-content:center!important;

        overflow:hidden!important;

        border-radius:inherit!important;

        pointer-events:none!important;

        background:#05090b!important;
      }


      .fhq-v8863-exact-overlay > img{
        display:block!important;

        width:100%!important;
        height:100%!important;

        max-width:none!important;
        max-height:none!important;

        object-fit:contain!important;
        object-position:center center!important;

        border-radius:inherit!important;
      }

    `;

    document.head.appendChild(style);

  }


  /* ============================================================
     PUBLIC DEBUG TOOLS
     ============================================================ */

  window.FHQ_REPAIR_CARD_ART = function(){
    repairAll(document);
  };


  window.FHQ_CARD_ART_DEBUG = function(){

    var rows = registry().map(function(row){

      return {
        id:row[0],
        name:row[1],
        rarity:row[2],
        url:pagesUrl(row[0])
      };

    });

    console.table(rows);

    return rows;
  };


  console.log(
    '[FootballHQ] V88.63 PERMANENT card-art guard active'
  );

})();    ['ts002-006','Cup Stack Jack','common'],
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
