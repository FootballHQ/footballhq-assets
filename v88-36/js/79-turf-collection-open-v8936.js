/* TURF V89.36 — premium collection cover open bridge */
(function(){
  'use strict';
  if(window.__TURF_V8936_COLLECTION_OPEN__) return;
  window.__TURF_V8936_COLLECTION_OPEN__=true;

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

    if(typeof window.fhqOpenModernCollection==='function'){
      window.fhqOpenModernCollection(setName);
      return;
    }

    /* fallback for older collection runtimes */
    try{
      window.__fhqOpenCollectionSet=setName;
      if(typeof window.fhqV823RenderCollections==='function' && window.__fhqLastCollectionsState){
        window.fhqV823RenderCollections(window.__fhqLastCollectionsState);
      }
    }catch(err){console.warn('[TURF V89.36] collection open fallback failed',err)}
  },true);
})();
