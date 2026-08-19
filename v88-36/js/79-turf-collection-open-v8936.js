/* TURF V89.36 — premium collection cover open bridge */
(function(){
  'use strict';
  if(window.__TURF_V8936_COLLECTION_OPEN__) return;
  window.__TURF_V8936_COLLECTION_OPEN__=true;

  function normalizeSet(cover){
    var raw=(cover&&(
      cover.getAttribute('data-v823-set')||
      cover.getAttribute('data-open-set')||
      cover.getAttribute('data-v8855-open-set')
    ))||'';
    raw=String(raw).trim();
    if(raw)return raw;
    var txt=String(cover&&cover.textContent||'').toLowerCase();
    if(txt.indexOf('sideline')>=0)return '002';
    if(txt.indexOf('gridiron')>=0)return '001';
    return '';
  }

  function openStable(setName){
    setName=String(setName||'').trim();
    if(!setName)return false;

    /* Use the original known-good modern opener. It validates state,
       retries while account data is still painting, and confirms that
       the collection detail actually rendered before declaring success. */
    try{
      if(typeof window.fhqOpenModernCollection==='function'){
        window.fhqOpenModernCollection(setName);
        return true;
      }
    }catch(err){
      console.warn('[TURF V89.36] modern collection open failed',err);
    }

    return false;
  }

  document.addEventListener('click',function(e){
    var hit=e.target&&e.target.closest?
      e.target.closest('#fhqAlbumGrid .turf8935-open,#fhqAlbumGrid .turf8935-cover-art'):
      null;
    if(!hit)return;

    var cover=hit.closest('.fhq-v823-cover[data-v823-set],[data-v823-set],[data-open-set],[data-v8855-open-set],.turf8935-cover');
    if(!cover)return;

    var setName=normalizeSet(cover);
    if(!setName)return;

    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation)e.stopImmediatePropagation();

    if(openStable(setName))return;

    /* One click still gets several short retries if the helper itself
       has not been defined yet because another runtime patch is loading. */
    [0,30,80,160,300,500].forEach(function(ms){
      setTimeout(function(){openStable(setName)},ms);
    });
  },true);
})();
