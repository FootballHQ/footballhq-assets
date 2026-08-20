/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   Loads Home 2.0 v89.18, cleanup v89.19, favicon v89.20.
   Existing Apps Script script tag does not need to change.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8920__)return;
window.__TURF_V8897_ENTRY_8920__=true;

function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){}};
  (document.head||document.documentElement).appendChild(s);
}

load('https://footballhq.github.io/footballhq-assets/v88-36/js/88-turf-home2-v8918.js?v=8920','8918',function(){
  load('https://footballhq.github.io/footballhq-assets/v88-36/js/89-turf-home2b-v8919.js?v=8920','8919',function(){
    load('https://footballhq.github.io/footballhq-assets/v88-36/js/90-turf-favicon-v8920.js?v=8920','8920');
  });
});
})();
