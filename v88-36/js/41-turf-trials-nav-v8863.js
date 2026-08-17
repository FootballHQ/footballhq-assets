/* ============================================================
   TURF V88.64 — BRAND + TRIALS NAV + RECOVERY FAILSAFE
   Adds Trials to the existing sidebar, updates visible branding to TURF,
   and prevents a stalled legacy account-recovery overlay from blocking
   the entire site forever. The recovery request itself is NOT cancelled.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8864_TRIALS_NAV__) return;
  window.__TURF_V8864_TRIALS_NAV__=true;

  var TRIALS_URL='https://turftrials.com/trials/';
  var RECOVERY_TEXT='recovering your football hq account';

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
        Array.prototype.forEach.call(brandCopy.childNodes,function(n){
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
    if(document.getElementById('turfV8864Css')) return;
    var s=document.createElement('style');
    s.id='turfV8864Css';
    s.textContent='\
      #turfTrialsNav{position:relative!important;}\
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px;}\
      #turfTrialsNav:hover{border-color:rgba(122,209,255,.45)!important;background:linear-gradient(90deg,rgba(34,96,132,.28),rgba(15,34,48,.35))!important;color:#eaf8ff!important;}\
    ';
    document.head.appendChild(s);
  }

  function isRecoveryText(el){
    if(!el || el.nodeType!==1) return false;
    var txt=String(el.textContent||'').toLowerCase().replace(/\s+/g,' ').trim();
    return txt.indexOf(RECOVERY_TEXT)!==-1;
  }

  function hideStalledRecoveryOverlay(){
    try{
      var nodes=document.querySelectorAll('div,section,aside,p,strong,span');
      var textNode=null;
      for(var i=0;i<nodes.length;i++){
        if(isRecoveryText(nodes[i])){
          textNode=nodes[i];
          break;
        }
      }
      if(!textNode) return false;

      var candidate=textNode;
      var best=null;
      for(var depth=0;candidate && candidate!==document.body && depth<8;depth++,candidate=candidate.parentElement){
        var r=candidate.getBoundingClientRect();
        var cs=window.getComputedStyle(candidate);
        var big=(r.width >= window.innerWidth*.70 && r.height >= window.innerHeight*.60);
        var overlayish=(cs.position==='fixed' || cs.position==='absolute' || Number(cs.zIndex||0)>=10);
        if(big && overlayish) best=candidate;
      }

      if(!best){
        candidate=textNode.parentElement;
        while(candidate && candidate!==document.body){
          var rr=candidate.getBoundingClientRect();
          if(rr.width >= window.innerWidth*.80 && rr.height >= window.innerHeight*.70){ best=candidate; break; }
          candidate=candidate.parentElement;
        }
      }

      if(best){
        best.style.setProperty('display','none','important');
        best.setAttribute('aria-hidden','true');
        best.dataset.turfRecoveryFailsafe='1';
      }else{
        textNode.style.setProperty('display','none','important');
      }

      document.body.classList.remove('rankings-loading','loading','fhq-loading','account-loading');
      document.documentElement.classList.remove('rankings-loading','loading','fhq-loading','account-loading');
      console.warn('[TURF] Legacy account recovery overlay exceeded timeout; UI unblocked while recovery may continue.');
      return true;
    }catch(err){
      console.warn('[TURF] recovery failsafe error',err);
      return false;
    }
  }

  function armRecoveryFailsafe(){
    /* Give the normal recovery path time to finish first. */
    setTimeout(hideStalledRecoveryOverlay,5000);
    setTimeout(hideStalledRecoveryOverlay,8000);
    setTimeout(hideStalledRecoveryOverlay,12000);
  }

  function apply(){
    rebrandVisible();
    style();
    addTrialsNav();
  }

  function boot(){
    apply();
    armRecoveryFailsafe();
    [150,500,1200,2500].forEach(function(ms){setTimeout(apply,ms)});
    if(window.MutationObserver){
      new MutationObserver(function(){apply()}).observe(document.documentElement,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
