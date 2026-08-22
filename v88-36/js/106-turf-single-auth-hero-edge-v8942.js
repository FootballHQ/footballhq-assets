/* ============================================================
   TURF v89.46 — SINGLE AUTH UI WITHOUT BREAKING AUTH HANDLERS
   - The top-level turftrials.com wrapper owns the visible Google sign-in.
   - The older Google button/gate inside the Apps Script iframe stays hidden.
   - IMPORTANT: do NOT monkeypatch google.accounts.id.initialize/renderButton/
     prompt. The legacy iframe auth code still needs those APIs so its Google
     credential/backend bridge can initialize and answer turf-auth-google.
   - Keeps exact Home hero alignment behavior.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_SINGLE_AUTH_HERO_8946__)return;
window.__TURF_SINGLE_AUTH_HERO_8946__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}

function hideLegacyInnerGate(){
  try{document.documentElement.classList.remove('turf-auth-locked')}catch(e){}
  var gate=q('#turfAuthGate');
  if(gate){
    gate.classList.add('turf-auth-hidden');
    gate.setAttribute('aria-hidden','true');
    gate.style.setProperty('display','none','important');
    gate.style.setProperty('visibility','hidden','important');
    gate.style.setProperty('pointer-events','none','important');
  }
  var btn=q('#turfGoogleButton');
  if(btn){
    /* Hide the duplicate inner button visually, but leave its DOM and the
       Google Identity API untouched so existing auth initialization can run. */
    btn.style.setProperty('position','fixed','important');
    btn.style.setProperty('left','-10000px','important');
    btn.style.setProperty('top','-10000px','important');
    btn.style.setProperty('width','1px','important');
    btn.style.setProperty('height','1px','important');
    btn.style.setProperty('overflow','hidden','important');
    btn.style.setProperty('opacity','0','important');
    btn.style.setProperty('pointer-events','none','important');
    btn.setAttribute('aria-hidden','true');
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

function run(){hideLegacyInnerGate();alignHero()}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,50,120,250,500,900,1500,2500,4000,6500].forEach(function(ms){setTimeout(run,ms)});
window.addEventListener('resize',function(){setTimeout(alignHero,30);setTimeout(alignHero,180)});
try{
  var timer=null;
  new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,25)}).observe(document.documentElement,{childList:true,subtree:true});
}catch(e){}
})();
