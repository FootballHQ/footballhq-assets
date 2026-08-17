/* ============================================================
   TURF V88.63 — BRAND + TRIALS NAV
   Adds Trials to the existing sidebar without disturbing current
   FootballHQ game routing. Also updates the visible primary brand to TURF.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8863_TRIALS_NAV__) return;
  window.__TURF_V8863_TRIALS_NAV__=true;

  var TRIALS_URL='https://turftrials.com/trials/';

  function openTrials(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    try{ window.top.location.href=TRIALS_URL; }
    catch(err){ window.location.href=TRIALS_URL; }
    return false;
  }

  function rebrandVisible(){
    try{
      var brandCopy=document.querySelector('.fhq-brand-copy');
      if(brandCopy){
        var small=brandCopy.querySelector('small');
        brandCopy.childNodes.forEach(function(n){
          if(n.nodeType===3 && /FOOTBALL HQ/i.test(n.nodeValue||'')) n.nodeValue='TURF';
        });
        if(small) small.textContent='FOOTBALL • GAMES • COLLECT';
      }

      var mobile=document.querySelector('#fhqMobileLogo span,.fhq-mobile-logo span');
      if(mobile) mobile.textContent='TURF';

      var hero=document.querySelector('#fhqHome .fhq-home-brandline h1,.fhq-home-brandline h1');
      if(hero && /football hq/i.test(hero.textContent||'')) hero.textContent='TURF';

      var comingTitle=document.querySelector('#fhqComingModal h2');
      if(comingTitle && /Football HQ/i.test(comingTitle.textContent||'')) comingTitle.textContent='More is coming to TURF.';

      document.title='TURF';
    }catch(e){}
  }

  function addTrialsNav(){
    var nav=document.querySelector('.fhq-nav');
    if(!nav) return false;

    var existing=nav.querySelector('[data-fhq-nav="trials"],#turfTrialsNav');
    if(existing) return true;

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

  function style(){
    if(document.getElementById('turfV8863Css')) return;
    var s=document.createElement('style');
    s.id='turfV8863Css';
    s.textContent='\
      #turfTrialsNav{position:relative!important;}\
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px;}\
      #turfTrialsNav:hover{border-color:rgba(122,209,255,.45)!important;background:linear-gradient(90deg,rgba(34,96,132,.28),rgba(15,34,48,.35))!important;color:#eaf8ff!important;}\
    ';
    document.head.appendChild(s);
  }

  function apply(){
    rebrandVisible();
    style();
    addTrialsNav();
  }

  function boot(){
    apply();
    [150,500,1200,2500].forEach(function(ms){setTimeout(apply,ms)});
    if(window.MutationObserver){
      new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
