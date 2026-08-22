/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   v89.47 NATIVE APPS SCRIPT AUTH
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8947__)return;
window.__TURF_V8897_ENTRY_8947__=true;

function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');
  s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){}};
  (document.head||document.documentElement).appendChild(s);
}

var B='https://footballhq.github.io/footballhq-assets/v88-36/js/';
load(B+'88-turf-home2-v8918.js?v=8947','8918',function(){
  load(B+'89-turf-home2b-v8919.js?v=8947','8919',function(){
    load(B+'90-turf-favicon-v8920.js?v=8947','8920',function(){
      load(B+'91-turf-auth-session-lock-v8921.js?v=8947','8921',function(){
        load(B+'92-turf-auth-profile-authority-v8922.js?v=8947','8922',function(){
          load(B+'93-turf-pass-authority-v8923.js?v=8947','8923',function(){
            load(B+'94-turf-account-surfaces-authority-v8924.js?v=8947','8924',function(){
              load(B+'96-turf-coin-ui-cleanup-v8928.js?v=8947','8928',function(){
                load(B+'97-turf-visual-polish-v8929.js?v=8947','8929',function(){
                  load(B+'98-turf-visual-polish-v8930.js?v=8947','8930',function(){
                    load(B+'99-turf-visual-cleanup-v8931.js?v=8947','8931',function(){
                      load(B+'102-turf-approved-brand-v8937.js?v=8947','8937',function(){
                        load(B+'103-turf-final-fixes-v8939.js?v=8947','8939',function(){
                          load(B+'104-turf-account-continuity-v8940.js?v=8947','8940',function(){
                            load(B+'105-turf-account-reconcile-hero-align-v8941.js?v=8947','8941',function(){
                              load(B+'106-turf-single-auth-hero-edge-v8942.js?v=8947','8942',function(){
                                load(B+'107-turf-auth-recovery-hero-final-v8943.js?v=8947','8943');
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
          });
        });
      });
    });
  });
});
})();
