/* TURF V89.36 — premium collection cover open bridge */
(function(){
  'use strict';
  if(window.__TURF_V8936_COLLECTION_OPEN__) return;
  window.__TURF_V8936_COLLECTION_OPEN__=true;

  function openNow(setName){
    if(!setName)return false;

    /* Fast path: bypass delayed wrapper and drive the known collection renderer directly. */
    try{
      if(typeof window.fhqV823RenderCollections==='function' && window.__fhqLastCollectionsState){
        window.__fhqOpenCollectionSet=String(setName);
        window.fhqV823RenderCollections(window.__fhqLastCollectionsState);
        try{window.scrollTo({top:0,behavior:'smooth'})}catch(_){window.scrollTo(0,0)}
        return true;
      }
    }catch(err){console.warn('[TURF V89.36] direct collection open failed',err)}

    /* Fallback to the modern collection helper if the renderer is not ready yet. */
    try{
      if(typeof window.fhqOpenModernCollection==='function'){
        window.fhqOpenModernCollection(String(setName));
        return true;
      }
    }catch(err2){console.warn('[TURF V89.36] modern collection open failed',err2)}

    return false;
  }

  document.addEventListener('click',function(e){
    var hit=e.target&&e.target.closest?e.target.closest('#fhqAlbumGrid .turf8935-open,#fhqAlbumGrid .turf8935-cover-art'):null;
    if(!hit)return;
    var cover=hit.closest('.fhq-v823-cover[data-v823-set],[data-v823-set],[data-open-set],[data-v8855-open-set]');
    if(!cover)return;

    var setName=cover.getAttribute('data-v823-set')||cover.getAttribute('data-open-set')||cover.getAttribute('data-v8855-open-set')||'';
    if(!setName)return;

    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation)e.stopImmediatePropagation();

    if(openNow(setName))return;

    /* If account/collection state is still painting, retry immediately from this one click. */
    [0,25,60,120,220].forEach(function(ms){
      setTimeout(function(){openNow(setName)},ms);
    });
  },true);
})();
