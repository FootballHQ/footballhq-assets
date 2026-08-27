/* ============================================================
   TURF V88.65 — LEGACY RECOVERY COMPATIBILITY
   Development-safe cleanup for stale legacy identity/recovery UI.
   No navigation, account creation, storage writes or game logic changes.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8865_SAFE__)return;
window.__TURF_V8865_SAFE__=true;

function cleanup(){
  try{window.__fhqIdentityResolving=false}catch(e){}
  [document.documentElement,document.body].forEach(function(el){
    if(!el)return;
    ['fhq-identity-recovering','account-loading','recovering','fhq-loading','is-loading','turf-auth-locked'].forEach(function(c){el.classList.remove(c)});
    try{el.removeAttribute('inert')}catch(e){}
    try{el.style.removeProperty('pointer-events');el.style.removeProperty('filter');el.style.removeProperty('opacity')}catch(e){}
  });
  ['turfAuthGate','turfGoogleButton'].forEach(function(id){
    var el=document.getElementById(id);if(!el)return;
    try{el.setAttribute('aria-hidden','true');el.style.setProperty('display','none','important');el.style.setProperty('pointer-events','none','important')}catch(e){}
  });
}

function schedule(){
  [0,80,180,350,700,1200,2200,4000,6500,9000].forEach(function(ms){setTimeout(cleanup,ms)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
window.addEventListener('turf:auth-ready',function(){cleanup();setTimeout(cleanup,120);setTimeout(cleanup,500)});
})();
