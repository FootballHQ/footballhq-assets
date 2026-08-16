/* ============================================================
   TURF TRIALS / FOOTBALLHQ V88.80 — SET 001 EXACT PNG GUARD
   PERFORMANCE FIX
   - Keeps the V88.79 per-card number resolver.
   - Removes repeated pack scans on every click.
   - Debounces DOM changes so animations do not trigger dozens of scans.
   - Scans only the actual pack / collection / locker card surfaces.
   - Never replaces an already-correct overlay.
   ============================================================ */
(function(){
  'use strict';

  window.__FHQ_V8880_SET001_EXACT_ART__ = true;

  var PAGES = 'https://footballhq.github.io/footballhq-assets/v88-36/cards/001/';
  var RAW   = 'https://raw.githubusercontent.com/FootballHQ/footballhq-assets/main/v88-36/cards/001/';

  var SET001 = {
    tg001:'Conjuke', tg002:'Turfling', tg003:'Teezy', tg004:'Towelow', tg005:'Hashling',
    tg006:'Cleatle', tg007:'Flagoon', tg008:'Downster', tg009:'Chaynk', tg010:'Glovolt',
    tg011:'Footsu', tg012:'Pylonix', tg013:'Visorcore', tg014:'Snapjaw', tg015:'Endzonian',
    tg016:'Goalem', tg017:'Helmutt', tg018:'Turfquake', tg019:'Stadion', tg020:'Midnight Field'
  };

  function norm(v){
    return String(v || '').toLowerCase().replace(/[—–-]/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  }

  function validId(v){
    var s = String(v || '').toLowerCase().trim();
    var m = s.match(/(?:^|[^a-z0-9])tg(0(?:0[1-9]|1\d|20))(?:$|[^a-z0-9])/i);
    if(m) return 'tg' + m[1];
    if(/^tg0(?:0[1-9]|1\d|20)$/i.test(s)) return s.toLowerCase();
    return null;
  }

  function cardFromHost(host){
    if(!host || host.nodeType !== 1) return null;

    var attrs = ['data-card-id','data-card','data-cardid','data-id'];
    for(var a=0;a<attrs.length;a++){
      var id = validId(host.getAttribute && host.getAttribute(attrs[a]));
      if(id && SET001[id]) return {id:id,name:SET001[id]};
    }

    try{
      var tagged = host.querySelector('[data-card-id],[data-card],[data-cardid],[data-id]');
      if(tagged){
        for(var b=0;b<attrs.length;b++){
          var tid = validId(tagged.getAttribute(attrs[b]));
          if(tid && SET001[tid]) return {id:tid,name:SET001[tid]};
        }
      }
    }catch(e){}

    var rawText = String(host.textContent || '');

    var num = rawText.match(/\b(00[1-9]|01\d|020)\s*\/\s*24\b/);
    if(num){
      var byNum = 'tg' + num[1];
      if(SET001[byNum]) return {id:byNum,name:SET001[byNum]};
    }

    var hay = norm(rawText);
    if(!hay) return null;

    var ids = Object.keys(SET001).filter(function(id){ return id !== 'tg020'; });
    ids.sort(function(a,b){ return norm(SET001[b]).length - norm(SET001[a]).length; });
    for(var i=0;i<ids.length;i++){
      var n = norm(SET001[ids[i]]);
      if(n && hay.indexOf(n) !== -1) return {id:ids[i],name:SET001[ids[i]]};
    }

    if(hay.indexOf('midnight field') !== -1){
      return {id:'tg020',name:'Midnight Field'};
    }

    return null;
  }

  function pagesUrl(id){ return PAGES + id + '.png?v=8880'; }
  function rawUrl(id){ return RAW + id + '.png?v=8880'; }

  function isCardShape(el){
    if(!el || el.nodeType !== 1) return false;
    var r;
    try{ r = el.getBoundingClientRect(); }catch(e){ return false; }
    if(!r || r.width < 70 || r.height < 100) return false;
    var ratio = r.width / r.height;
    return ratio >= .48 && ratio <= .90;
  }

  function findFace(host){
    if(!host) return null;

    /* Fast path for the current pack renderer. */
    try{
      var front = host.matches && host.matches('.fhq-v8832-front') ? host : host.querySelector('.fhq-v8832-front');
      if(front && isCardShape(front)) return front;
    }catch(e){}

    var selectors = '.fhq-card-front,.fhq-card-face,.fhq-card-art,.fhq-v85-card-img-wrap,[data-card-id],[data-card]';
    var candidates=[];
    if(isCardShape(host)) candidates.push(host);

    try{
      host.querySelectorAll(selectors).forEach(function(el){
        if(isCardShape(el) && candidates.indexOf(el)===-1) candidates.push(el);
      });
    }catch(e){}

    candidates.sort(function(a,b){
      var ar=a.getBoundingClientRect(), br=b.getBoundingClientRect();
      return (ar.width*ar.height)-(br.width*br.height);
    });
    return candidates[0] || null;
  }

  function install(face,card){
    if(!face || !card) return false;

    /* Fastest path: correct art already installed. Do nothing. */
    var existing = null;
    try{ existing = face.querySelector(':scope > .fhq-v8880-set001-overlay'); }catch(e){}
    if(face.dataset && face.dataset.fhqSet001ExactId === card.id && existing && existing.dataset.cardId === card.id){
      return true;
    }

    /* Remove only an old/wrong Set 001 overlay. */
    try{
      face.querySelectorAll(':scope > .fhq-v8877-set001-overlay,:scope > .fhq-v8878-set001-overlay,:scope > .fhq-v8879-set001-overlay,:scope > .fhq-v8880-set001-overlay').forEach(function(el){
        if(el.dataset.cardId !== card.id) el.remove();
      });
    }catch(e){}

    try{
      existing = face.querySelector(':scope > .fhq-v8880-set001-overlay[data-card-id="'+card.id+'"]');
    }catch(e){ existing = null; }
    if(existing){
      face.dataset.fhqSet001ExactId = card.id;
      return true;
    }

    try{
      if(getComputedStyle(face).position === 'static') face.style.position='relative';
    }catch(e){ face.style.position='relative'; }

    var overlay=document.createElement('div');
    overlay.className='fhq-v8880-set001-overlay';
    overlay.dataset.cardId=card.id;
    overlay.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:30;pointer-events:none;';

    var img=document.createElement('img');
    img.alt=card.name;
    img.draggable=false;
    img.loading='eager';
    img.decoding='async';
    img.style.cssText='display:block;width:100%;height:100%;object-fit:contain;object-position:center center;margin:0;padding:0;border:0;transform:none;';
    img.dataset.pages=pagesUrl(card.id);
    img.dataset.raw=rawUrl(card.id);
    img.src=img.dataset.pages;

    img.onerror=function(){
      if(this.dataset.triedRaw!=='1'){
        this.dataset.triedRaw='1';
        this.src=this.dataset.raw;
        return;
      }
      if(overlay.parentNode) overlay.remove();
    };

    img.onload=function(){
      face.dataset.fhqSet001ExactId=card.id;
      face.dataset.fhqExactArt='1';
    };

    overlay.appendChild(img);
    face.appendChild(overlay);
    return true;
  }

  function repairHost(host){
    if(!host || host.nodeType!==1) return;
    var card=cardFromHost(host);
    if(!card) return;
    var face=findFace(host);
    if(face) install(face,card);
  }

  function repairContainer(container){
    if(!container || container.nodeType!==1) return;

    var hosts=[];
    var selector;

    if(container.id === 'fhqPackRewards'){
      /* Pack only: five-ish slide/shell hosts, not every descendant. */
      selector = ':scope > .fhq-v8832-slide,:scope > .fhq-v8832-card-shell,.fhq-v8832-slide';
    }else{
      selector = '.fhq-collection-card,.fhq-collectible-card,[data-card-id],[data-card]';
    }

    try{
      container.querySelectorAll(selector).forEach(function(el){
        if(hosts.indexOf(el)===-1) hosts.push(el);
      });
    }catch(e){}

    /* Fallback for pack structures whose slides are direct children with changing classes. */
    if(container.id === 'fhqPackRewards' && hosts.length===0){
      Array.prototype.forEach.call(container.children,function(el){
        if(el && el.nodeType===1) hosts.push(el);
      });
    }

    hosts.forEach(repairHost);
  }

  var timers = new WeakMap();
  function scheduleRepair(container,delay){
    if(!container) return;
    var old = timers.get(container);
    if(old) clearTimeout(old);
    var t = setTimeout(function(){
      timers.delete(container);
      repairContainer(container);
    }, delay || 120);
    timers.set(container,t);
  }

  function knownContainers(){
    return [
      document.getElementById('fhqPackRewards'),
      document.getElementById('fhqAlbumGrid'),
      document.getElementById('fhqLockerGrid')
    ].filter(Boolean);
  }

  function attachObserver(container){
    if(!container || container.dataset.fhqSet001Observer8880==='1') return;
    container.dataset.fhqSet001Observer8880='1';

    try{
      var obs = new MutationObserver(function(mutations){
        var added=false;
        for(var i=0;i<mutations.length;i++){
          if(mutations[i].addedNodes && mutations[i].addedNodes.length){ added=true; break; }
        }
        if(added) scheduleRepair(container,160);
      });

      /* subtree is needed for late card content, but the callback is heavily debounced. */
      obs.observe(container,{childList:true,subtree:true});
    }catch(e){}
  }

  function start(){
    knownContainers().forEach(function(container){
      repairContainer(container);
      attachObserver(container);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();

  /*
     Tiny navigation hook only when a known surface may have just been opened.
     No repeated 80ms/300ms scans on every pack arrow click.
  */
  document.addEventListener('click',function(e){
    var t=e.target;
    if(!t || !t.closest) return;

    if(t.closest('[data-view="collections"],#fhqCollectionsBtn,#fhqLockerBtn,[href*="collection"],[href*="locker"],[href*="shop"]')){
      setTimeout(start,220);
    }
  },true);
})();
