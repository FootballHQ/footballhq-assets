/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   Loads Home 2.0 v89.18, cleanup v89.19, favicon v89.20,
   authenticated session lock v89.21, and profile authority v89.22.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8922__)return;
window.__TURF_V8897_ENTRY_8922__=true;

function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){}};
  (document.head||document.documentElement).appendChild(s);
}

load('https://footballhq.github.io/footballhq-assets/v88-36/js/88-turf-home2-v8918.js?v=8922','8918',function(){
  load('https://footballhq.github.io/footballhq-assets/v88-36/js/89-turf-home2b-v8919.js?v=8922','8919',function(){
    load('https://footballhq.github.io/footballhq-assets/v88-36/js/90-turf-favicon-v8920.js?v=8922','8920',function(){
      load('https://footballhq.github.io/footballhq-assets/v88-36/js/91-turf-auth-session-lock-v8921.js?v=8922','8921',function(){
        load('https://footballhq.github.io/footballhq-assets/v88-36/js/92-turf-auth-profile-authority-v8922.js?v=8922','8922');
      });
    });
  });
});
})();
