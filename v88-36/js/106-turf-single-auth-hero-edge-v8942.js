/* ============================================================
   TURF v89.47 — RESTORE NATIVE APPS SCRIPT AUTH
   - Stop hiding the Apps Script auth gate and Google button.
   - Let Google sign-in run in the same Apps Script frame that owns
     google.script.run, removing the fragile cross-origin credential bridge.
   - Keep exact Home hero alignment behavior after authentication.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_NATIVE_AUTH_8947__)return;
window.__TURF_NATIVE_AUTH_8947__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}

function restoreNativeAuth(){
  var gate=q('#turfAuthGate');
  if(gate){
    gate.classList.remove('turf-auth-hidden');
    gate.removeAttribute('aria-hidden');
    gate.style.removeProperty('display');
    gate.style.removeProperty('visibility');
    gate.style.removeProperty('pointer-events');
  }
  var btn=q('#turfGoogleButton');
  if(btn){
    ['position','left','top','width','height','overflow','opacity','pointer-events','display','visibility'].forEach(function(p){btn.style.removeProperty(p)});
    btn.removeAttribute('aria-hidden');
  }
}

function alignHero(){
  var home=q('#fhqHome');
  var inner=q('#fhqHome .fhq-home-inner');
  var hero=q('#fhqHome .fhq-hero');
  if(!home||!inner||!hero)return;
  try{
    var ir=inner.getBoundingClientRect();
    var hr=hero.getBoundingClientRect();
    if(ir.width<200||hr.width<200)return;
    var exact=Math.round(ir.right-hr.left);
    if(exact<300)return;
    hero.style.setProperty('width',exact+'px','important');
    hero.style.setProperty('max-width','none','important');
    hero.style.setProperty('min-width','0','important');
    hero.style.setProperty('margin-right','0','important');
    hero.style.setProperty('box-sizing','border-box','important');
  }catch(e){}
}

function run(){restoreNativeAuth();alignHero()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,50,120,250,500,900,1500,2500,4000].forEach(function(ms){setTimeout(run,ms)});
window.addEventListener('resize',function(){setTimeout(alignHero,30);setTimeout(alignHero,180)});
window.addEventListener('turf:auth-ready',function(){setTimeout(alignHero,0);setTimeout(alignHero,250)});
})();
