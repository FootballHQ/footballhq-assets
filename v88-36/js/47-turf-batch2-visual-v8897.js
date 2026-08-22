/* ============================================================
   TURF V88.97 — BATCH 2 VISUAL ENTRYPOINT
   v89.48 SIGN-IN FIRST / CLEAN AUTH FLOW

   Goals:
   - Google sign-in is always the first thing shown on a fresh TURF load.
   - Do not auto-resume a stale browser token before the user chooses Google.
   - Let the native Apps Script auth code call google.script.run directly.
   - Do not preload the old auth-authority/recovery patches that can overwrite
     the account chosen by the user or trigger "Recovering Football HQ...".
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8897_ENTRY_8948__)return;
window.__TURF_V8897_ENTRY_8948__=true;

/* IMPORTANT: this entrypoint is parsed well before the native Batch 1B auth
   code in Apps Script Index.html. Clearing ONLY the wrapper session token here
   means resumeSaved() sees no token and opens the Google sign-in gate instead
   of launching the stale recovery flow. Server-side account data is untouched. */
try{localStorage.removeItem('turfAuthAccountTokenV1')}catch(e){}
try{sessionStorage.removeItem('turfAuthAccountTokenV1')}catch(e){}

/* Remove any recovery veil left by older layers without exposing the app as
   authenticated. The actual native auth gate remains authoritative. */
function suppressOldRecovery(){
  try{
    var nodes=document.querySelectorAll('body *');
    for(var i=0;i<nodes.length;i++){
      var el=nodes[i];
      if(!el||!el.textContent)continue;
      var t=String(el.textContent).replace(/\s+/g,' ').trim();
      if(t==='Recovering your Football HQ account…'||t==='Recovering your Football HQ account...'||t==='Restoring your TURF account…'||t==='Restoring your TURF account...'){
        var p=el;
        while(p&&p!==document.body){
          var cs=null;try{cs=getComputedStyle(p)}catch(e){}
          if(cs&&(cs.position==='fixed'||cs.position==='absolute')&&p.getBoundingClientRect().width>window.innerWidth*.5){
            p.style.setProperty('display','none','important');
            p.setAttribute('aria-hidden','true');
            break;
          }
          p=p.parentElement;
        }
      }
    }
  }catch(e){}
}

function load(src,key,next){
  if(document.querySelector('script[data-turf-visual="'+key+'"]')){if(next)next();return}
  var s=document.createElement('script');
  s.src=src;s.async=false;s.dataset.turfVisual=key;
  s.onload=function(){if(next)next()};
  s.onerror=function(){try{console.error('TURF visual layer '+key+' failed to load')}catch(e){if(next)next()};
  (document.head||document.documentElement).appendChild(s);
}

/* Auth rule for v89.48:
   Do NOT load 91/92/93/94/103/104/105/106/107 here. Those were layered auth
   persistence/recovery shims. Native Batch 1B auth already does the direct
   Google -> google.script.run -> turfBatch1GoogleSignIn flow and is the sole
   authority now. Keep only presentation/branding cleanup. */
var B='https://footballhq.github.io/footballhq-assets/v88-36/js/';
load(B+'88-turf-home2-v8918.js?v=8948','8918',function(){
  load(B+'89-turf-home2b-v8919.js?v=8948','8919',function(){
    load(B+'90-turf-favicon-v8920.js?v=8948','8920',function(){
      load(B+'96-turf-coin-ui-cleanup-v8928.js?v=8948','8928',function(){
        load(B+'97-turf-visual-polish-v8929.js?v=8948','8929',function(){
          load(B+'98-turf-visual-polish-v8930.js?v=8948','8930',function(){
            load(B+'99-turf-visual-cleanup-v8931.js?v=8948','8931',function(){
              load(B+'102-turf-approved-brand-v8937.js?v=8948','8937',function(){
                suppressOldRecovery();
              });
            });
          });
        });
      });
    });
  });
});

[0,80,220,600,1200,2500].forEach(function(ms){setTimeout(suppressOldRecovery,ms)});
})();
