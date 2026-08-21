/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   v89.31 LOGIN-SAFE + HARD VISUAL CLEANUP
   Loads Home 2.0 v89.18, cleanup v89.19, favicon v89.20,
   authenticated session lock v89.21, profile authority v89.22,
   pass authority v89.23, coin cleanup v89.28, visual polish v89.29,
   v89.30 cleanup, and v89.31 hard logo/balance/fallback cleanup.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8931__)return;
window.__TURF_V8897_ENTRY_8931__=true;
function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){}};
  (document.head||document.documentElement).appendChild(s);
}
load('https://footballhq.github.io/footballhq-assets/v88-36/js/88-turf-home2-v8918.js?v=8931','8918',function(){
  load('https://footballhq.github.io/footballhq-assets/v88-36/js/89-turf-home2b-v8919.js?v=8931','8919',function(){
    load('https://footballhq.github.io/footballhq-assets/v88-36/js/90-turf-favicon-v8920.js?v=8931','8920',function(){
      load('https://footballhq.github.io/footballhq-assets/v88-36/js/91-turf-auth-session-lock-v8921.js?v=8931','8921',function(){
        load('https://footballhq.github.io/footballhq-assets/v88-36/js/92-turf-auth-profile-authority-v8922.js?v=8931','8922',function(){
          load('https://footballhq.github.io/footballhq-assets/v88-36/js/93-turf-pass-authority-v8923.js?v=8931','8923',function(){
            load('https://footballhq.github.io/footballhq-assets/v88-36/js/96-turf-coin-ui-cleanup-v8928.js?v=8931','8928',function(){
              load('https://footballhq.github.io/footballhq-assets/v88-36/js/97-turf-visual-polish-v8929.js?v=8931','8929',function(){
                load('https://footballhq.github.io/footballhq-assets/v88-36/js/98-turf-visual-polish-v8930.js?v=8931','8930',function(){
                  load('https://footballhq.github.io/footballhq-assets/v88-36/js/99-turf-visual-cleanup-v8931.js?v=8931','8931');
                });
              });
            });
          });
        });
      });
    });
  });
});
})();
