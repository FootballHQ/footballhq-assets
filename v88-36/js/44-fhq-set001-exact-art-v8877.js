/* ============================================================
   TURF TRIALS / FOOTBALLHQ V88.78 — SAFE SET 001 EXACT PNG GUARD
   Uses exact PNGs from:
   v88-36/cards/001/tg001.png ... tg020.png

   SAFETY FIX
   - NO document-wide MutationObserver.
   - NO document-wide [class*=card] scans.
   - NO repeating setInterval.
   - Runs only inside pack / collection / locker card surfaces.
   - Does NOT touch rankings, home, games, draft, sidebar, or Set 002.
   - Does NOT touch Signature cards tg021–tg024.
   ============================================================ */

(function(){
  'use strict';

  window.__FHQ_V8878_SET001_EXACT_ART__ = true;

  var PAGES = 'https://footballhq.github.io/footballhq-assets/v88-36/cards/001/';
  var RAW   = 'https://raw.githubusercontent.com/FootballHQ/footballhq-assets/main/v88-36/cards/001/';

  var SET001 = [
    ['tg001','Conjuke'],
    ['tg002','Turfling'],
    ['tg003','Teezy'],
    ['tg004','Towelow'],
    ['tg005','Hashling'],
    ['tg006','Cleatle'],
    ['tg007','Flagoon'],
    ['tg008','Downster'],
    ['tg009','Chaynk'],
    ['tg010','Glovolt'],
    ['tg011','Footsu'],
    ['tg012','Pylonix'],
    ['tg013','Visorcore'],
    ['tg014','Snapjaw'],
    ['tg015','Endzonian'],
    ['tg016','Goalem'],
    ['tg017','Helmutt'],
    ['tg018','Turfquake'],
    ['tg019','Stadion'],
    ['tg020','The Gridiron']
  ];

  function norm(v){
    return String(v || '').toLowerCase().replace(/[—–-]/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  }

  function pagesUrl(id){ return PAGES + id + '.png?v=8878'; }
  function rawUrl(id){ return RAW + id + '.png?v=8878'; }

  function cardFromText(text){
    var hay = norm(text);
    if(!hay) return null;
    var rows = SET001.slice().sort(function(a,b){ return norm(b[1]).length - norm(a[1]).length; });
    for(var i=0;i<rows.length;i++){
      var n = norm(rows[i][1]);
      if(n && hay.indexOf(n) !== -1) return {id:rows[i][0], name:rows[i][1]};
    }
    return null;
  }

  function isCardShape(el){
    if(!el || el.nodeType !== 1) return false;
    var r;
    try{ r = el.getBoundingClientRect(); }catch(e){ return false; }
    if(!r || r.width < 70 || r.height < 100) return false;
    var ratio = r.width / r.height;
    return ratio >= .48 && ratio <= .90;
  }

  function findFace(host, card){
    if(!host || !card) return null;
    var selectors = [
      '[data-card-id]', '[data-card]', '[data-cardid]',
      '.fhq-v8832-front', '.fhq-card-front', '.fhq-card-face',
      '.fhq-card-art', '.fhq-v85-card-img-wrap'
    ];
    var candidates = [];
    try{
      host.querySelectorAll(selectors.join(',')).forEach(function(el){
        if(isCardShape(el)) candidates.push(el);
      });
    }catch(e){}
    if(isCardShape(host)) candidates.push(host);
    candidates = candidates.filter(function(el,idx,arr){ return arr.indexOf(el) === idx; });
    candidates.sort(function(a,b){
      var ar=a.getBoundingClientRect(), br=b.getBoundingClientRect();
      return (ar.width*ar.height)-(br.width*br.height);
    });
    return candidates[0] || null;
  }

  function install(face, card){
    if(!face || !card) return false;
    if(face.dataset && face.dataset.fhqSet001ExactId === card.id) return true;

    try{
      if(getComputedStyle(face).position === 'static') face.style.position = 'relative';
    }catch(e){ face.style.position = 'relative'; }

    var old = null;
    try{ old = face.querySelector(':scope > .fhq-v8878-set001-overlay, :scope > .fhq-v8877-set001-overlay'); }catch(e){}
    if(old) old.remove();

    var overlay = document.createElement('div');
    overlay.className = 'fhq-v8878-set001-overlay';
    overlay.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:30;pointer-events:none;';

    var img = document.createElement('img');
    img.alt = card.name;
    img.draggable = false;
    img.loading = 'eager';
    img.decoding = 'async';
    img.style.cssText = 'display:block;width:100%;height:100%;object-fit:contain;object-position:center center;margin:0;padding:0;border:0;transform:none;';
    img.dataset.pages = pagesUrl(card.id);
    img.dataset.raw = rawUrl(card.id);
    img.src = img.dataset.pages;

    img.onerror = function(){
      if(this.dataset.triedRaw !== '1'){
        this.dataset.triedRaw = '1';
        this.src = this.dataset.raw;
        return;
      }
      if(overlay.parentNode) overlay.remove();
    };

    img.onload = function(){
      face.dataset.fhqSet001ExactId = card.id;
      face.dataset.fhqExactArt = '1';
    };

    overlay.appendChild(img);
    face.appendChild(overlay);
    return true;
  }

  function repairContainer(container){
    if(!container || container.nodeType !== 1) return;

    var hosts = [];
    try{
      container.querySelectorAll([
        ':scope > *',
        '.fhq-v8832-slide',
        '.fhq-v8832-card-shell',
        '.fhq-pack-reward',
        '.fhq-collection-card',
        '.fhq-collectible-card',
        '[data-card-id]',
        '[data-card]'
      ].join(',')).forEach(function(el){
        if(hosts.indexOf(el) === -1) hosts.push(el);
      });
    }catch(e){}

    hosts.forEach(function(host){
      var card = cardFromText(host.textContent || '');
      if(!card) return;
      var face = findFace(host, card);
      if(face) install(face, card);
    });
  }

  function knownContainers(){
    return [
      document.getElementById('fhqPackRewards'),
      document.getElementById('fhqAlbumGrid'),
      document.getElementById('fhqLockerGrid')
    ].filter(Boolean);
  }

  function repairKnown(){
    knownContainers().forEach(repairContainer);
  }

  function attachObservers(){
    knownContainers().forEach(function(container){
      if(container.dataset.fhqSet001Observer === '1') return;
      container.dataset.fhqSet001Observer = '1';
      try{
        new MutationObserver(function(mutations){
          for(var i=0;i<mutations.length;i++){
            if(mutations[i].addedNodes && mutations[i].addedNodes.length){
              requestAnimationFrame(function(){ repairContainer(container); });
              break;
            }
          }
        }).observe(container,{childList:true,subtree:true});
      }catch(e){}
    });
  }

  function run(){
    repairKnown();
    attachObservers();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',run);
  else run();

  /* Recheck only after user navigation/clicks, never continuously. */
  document.addEventListener('click',function(){
    setTimeout(run,80);
    setTimeout(run,300);
  },true);

})();
