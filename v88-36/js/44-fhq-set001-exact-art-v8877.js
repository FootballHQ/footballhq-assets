/* ============================================================
   TURF TRIALS / FOOTBALLHQ V88.77 — SET 001 EXACT PNG GUARD
   Uses exact PNGs from:
   v88-36/cards/001/tg001.png ... tg020.png

   PURPOSE
   - Replaces procedural Set 001 art with the approved exact PNGs.
   - Works in pack reveals, collection/locker cards, and viewers.
   - Does NOT touch Set 002.
   - Does NOT touch Signature cards tg021–tg024.
   ============================================================ */

(function(){
  'use strict';

  window.__FHQ_V8877_SET001_EXACT_ART__ = true;

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
    return String(v || '')
      .toLowerCase()
      .replace(/[—–-]/g,' ')
      .replace(/[^a-z0-9]+/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function pagesUrl(id){ return PAGES + id + '.png?v=8877'; }
  function rawUrl(id){ return RAW + id + '.png?v=8877'; }

  function cardFromText(text){
    var hay = norm(text);
    if(!hay) return null;

    var rows = SET001.slice().sort(function(a,b){
      return norm(b[1]).length - norm(a[1]).length;
    });

    for(var i=0;i<rows.length;i++){
      if(hay.indexOf(norm(rows[i][1])) !== -1){
        return {id:rows[i][0], name:rows[i][1]};
      }
    }
    return null;
  }

  function looksLikeCardBox(el){
    if(!el || el.nodeType !== 1) return false;
    var r;
    try{ r = el.getBoundingClientRect(); }catch(e){ return false; }
    if(!r || r.width < 80 || r.height < 110) return false;
    var ratio = r.width / r.height;
    return ratio >= .48 && ratio <= .90;
  }

  function findFace(host, card){
    var selectors = [
      '[data-card-id]', '[data-card]', '[data-cardid]',
      '.fhq-card-art', '.fhq-card-face', '.fhq-card-front', '.fhq-card',
      '.fhq-pack-card', '.fhq-reveal-card', '.fhq-pack-reveal-card',
      '.fhq-collection-card', '.fhq-collectible-card', '.fhq-v85-card-img-wrap',
      '.fhq-v8832-front'
    ];

    var candidates = [];
    try{
      host.querySelectorAll(selectors.join(',')).forEach(function(el){
        var txt = norm(el.textContent || '');
        if(txt.indexOf(norm(card.name)) !== -1 || looksLikeCardBox(el)) candidates.push(el);
      });
    }catch(e){}

    if(looksLikeCardBox(host)) candidates.push(host);

    candidates = candidates.filter(function(el,idx,arr){ return arr.indexOf(el) === idx; });
    candidates.sort(function(a,b){
      var ar=a.getBoundingClientRect(), br=b.getBoundingClientRect();
      return (ar.width*ar.height) - (br.width*br.height);
    });

    for(var i=0;i<candidates.length;i++){
      if(looksLikeCardBox(candidates[i])) return candidates[i];
    }
    return null;
  }

  function install(face, card){
    if(!face || !card) return false;
    if(face.dataset && face.dataset.fhqSet001ExactId === card.id) return true;

    try{
      if(getComputedStyle(face).position === 'static') face.style.position = 'relative';
    }catch(e){ face.style.position = 'relative'; }

    var old = face.querySelector(':scope > .fhq-v8877-set001-overlay');
    if(old) old.remove();

    var overlay = document.createElement('div');
    overlay.className = 'fhq-v8877-set001-overlay';
    overlay.style.cssText = [
      'position:absolute','inset:0','width:100%','height:100%',
      'display:flex','align-items:center','justify-content:center',
      'overflow:hidden','z-index:30','pointer-events:none'
    ].join(';') + ';';

    var img = document.createElement('img');
    img.alt = card.name;
    img.draggable = false;
    img.loading = 'eager';
    img.decoding = 'async';
    img.style.cssText = [
      'display:block','width:100%','height:100%',
      'object-fit:contain','object-position:center center',
      'margin:0','padding:0','border:0','transform:none'
    ].join(';') + ';';

    img.dataset.pages = pagesUrl(card.id);
    img.dataset.raw = rawUrl(card.id);
    img.src = img.dataset.pages;

    img.onerror = function(){
      if(this.dataset.triedRaw !== '1'){
        this.dataset.triedRaw = '1';
        this.src = this.dataset.raw;
        return;
      }
      console.error('[V88.77] Set001 PNG failed:', card.id);
      if(overlay.parentNode) overlay.remove();
    };

    img.onload = function(){
      face.dataset.fhqSet001ExactId = card.id;
      face.dataset.fhqExactArt = '1';
      console.log('[V88.77] Set001 exact art locked:', card.id);
    };

    overlay.appendChild(img);
    face.appendChild(overlay);
    return true;
  }

  function repairHost(host){
    if(!host || host.nodeType !== 1) return false;
    var card = cardFromText(host.textContent || '');
    if(!card) return false;
    var face = findFace(host, card);
    if(!face) return false;

    var r;
    try{ r = face.getBoundingClientRect(); }catch(e){ return false; }
    if(r.width > window.innerWidth * .80 || r.height > window.innerHeight * .90) return false;

    return install(face, card);
  }

  function repairAll(root){
    root = root || document;
    var hosts=[];
    var selectors=[
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
      root.querySelectorAll(selectors.join(',')).forEach(function(el){
        if(hosts.indexOf(el)===-1) hosts.push(el);
      });
    }catch(e){}

    var pack=document.getElementById('fhqPackRewards');
    if(pack){
      Array.prototype.forEach.call(pack.children,function(el){
        if(hosts.indexOf(el)===-1) hosts.push(el);
      });
    }

    hosts.sort(function(a,b){
      var ar=a.getBoundingClientRect(), br=b.getBoundingClientRect();
      return (ar.width*ar.height)-(br.width*br.height);
    });

    hosts.forEach(repairHost);
  }

  var queued=false;
  function queueRepair(){
    if(queued) return;
    queued=true;
    requestAnimationFrame(function(){
      queued=false;
      repairAll(document);
    });
  }

  function start(){
    repairAll(document);

    var observer=new MutationObserver(function(mutations){
      var relevant=false;
      for(var i=0;i<mutations.length;i++){
        if(mutations[i].addedNodes && mutations[i].addedNodes.length){ relevant=true; break; }
      }
      if(relevant) queueRepair();
    });

    observer.observe(document.documentElement || document.body, {childList:true, subtree:true});

    setInterval(function(){ repairAll(document); }, 1200);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

})();
