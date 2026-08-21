/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   v89.36 FINAL BRAND SYSTEM

   Authentication/account logic unchanged.
   Final brand authority loads last and replaces all legacy logo renderers.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8936__)return;
window.__TURF_V8897_ENTRY_8936__=true;

function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');
  s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){}};
  (document.head||document.documentElement).appendChild(s);
}

var B='https://footballhq.github.io/footballhq-assets/v88-36/js/';
load(B+'88-turf-home2-v8918.js?v=8936','8918',function(){
  load(B+'89-turf-home2b-v8919.js?v=8936','8919',function(){
    load(B+'90-turf-favicon-v8920.js?v=8936','8920',function(){
      load(B+'91-turf-auth-session-lock-v8921.js?v=8936','8921',function(){
        load(B+'92-turf-auth-profile-authority-v8922.js?v=8936','8922',function(){
          load(B+'93-turf-pass-authority-v8923.js?v=8936','8923',function(){
            load(B+'96-turf-coin-ui-cleanup-v8928.js?v=8936','8928',function(){
              load(B+'97-turf-visual-polish-v8929.js?v=8936','8929',function(){
                load(B+'98-turf-visual-polish-v8930.js?v=8936','8930',function(){
                  load(B+'99-turf-visual-cleanup-v8931.js?v=8936','8931',function(){
                    load(B+'101-turf-brand-authority-v8936.js?v=8936','8936');
                  });
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