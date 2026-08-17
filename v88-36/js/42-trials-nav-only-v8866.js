/* ============================================================
   TURF V88.66 — TRIALS NAV ONLY
   Safe patch: adds Trials to the existing sidebar and routes to the
   Trials hub. Does NOT touch branding, account recovery, identity,
   coins, rankings, or startup behavior.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8866_TRIALS_NAV_ONLY__) return;
  window.__TURF_V8866_TRIALS_NAV_ONLY__=true;

  var TRIALS_URL='https://turftrials.com/trials/';

  function openTrials(e){
    if(e){
      try{ e.preventDefault(); e.stopPropagation(); }catch(_e){}
    }
    try{ window.top.location.href=TRIALS_URL; }
    catch(err){ window.location.href=TRIALS_URL; }
    return false;
  }

  function style(){
    if(document.getElementById('turfV8866TrialsCss')) return;
    var s=document.createElement('style');
    s.id='turfV8866TrialsCss';
    s.textContent='\
      #turfTrialsNav{position:relative!important;}\
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px;}\
      #turfTrialsNav:hover{border-color:rgba(122,209,255,.45)!important;background:linear-gradient(90deg,rgba(34,96,132,.28),rgba(15,34,48,.35))!important;color:#eaf8ff!important;}\
    ';
    document.head.appendChild(s);
  }

  function addTrialsNav(){
    var nav=document.querySelector('.fhq-nav');
    if(!nav) return false;
    if(nav.querySelector('#turfTrialsNav,[data-fhq-nav="trials"]')) return true;

    var btn=document.createElement('button');
    btn.id='turfTrialsNav';
    btn.type='button';
    btn.setAttribute('data-fhq-nav','trials');
    btn.innerHTML='<span aria-hidden="true">⚡</span> Trials';
    btn.addEventListener('click',openTrials,true);

    var coming=nav.querySelector('[data-fhq-nav="coming"]');
    if(coming) nav.insertBefore(btn,coming);
    else nav.appendChild(btn);
    return true;
  }

  function apply(){
    style();
    addTrialsNav();
  }

  function boot(){
    apply();
    [150,500,1200,2500].forEach(function(ms){setTimeout(apply,ms);});
    if(window.MutationObserver){
      new MutationObserver(function(){ addTrialsNav(); }).observe(document.documentElement,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
