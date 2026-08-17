/* ============================================================
   TURF V88.92 — SAFE TRIALS ENTRY

   - Leaves every native sidebar button untouched.
   - Adds Trials as one extra button only.
   - Opens Trials through the top-level turftrials.com wrapper.
   - Does NOT send the app Home before opening Trials.
   - Back to TURF can still return the live app to Home in-place.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8892_SAFE_TRIALS__) return;
  window.__TURF_V8892_SAFE_TRIALS__=true;

  var TRIALS_URL='https://turftrials.com/trials/';

  function qs(s,r){return (r||document).querySelector(s)}

  function style(){
    if(document.getElementById('turfV8892TrialsCss')) return;
    var s=document.createElement('style');
    s.id='turfV8892TrialsCss';
    s.textContent=`
      #fhqSidebar.fhq-sidebar{overflow-y:auto!important;overflow-x:hidden!important;scrollbar-width:thin!important}
      #turfTrialsNav{position:relative!important}
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px}
    `;
    document.head.appendChild(s);
  }

  function goHome(){
    try{
      var home=qs('.fhq-nav [data-fhq-nav="home"]');
      if(home){home.click();return true;}
      if(typeof window.openFootballHQSection==='function'){
        window.openFootballHQSection('home');
        return true;
      }
    }catch(e){}
    return false;
  }

  function openTrials(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    }

    /* Apps Script can be nested inside Google's own frame, so post to TOP,
       not merely parent. The turftrials.com wrapper listens there. */
    try{
      if(window.top && window.top!==window){
        window.top.postMessage({type:'turf-open-trials',path:'/trials/'},'*');
        return false;
      }
    }catch(err){}

    /* Standalone Apps Script fallback. */
    window.location.href=TRIALS_URL;
    return false;
  }

  function addTrials(){
    var nav=qs('.fhq-nav');
    if(!nav) return false;
    var btn=qs('#turfTrialsNav',nav);
    if(!btn){
      btn=document.createElement('button');
      btn.id='turfTrialsNav';
      btn.type='button';
      btn.innerHTML='<span aria-hidden="true">⚡</span> Trials';
      nav.appendChild(btn);
    }
    if(btn.dataset.turfWired!=='1'){
      btn.dataset.turfWired='1';
      btn.addEventListener('click',openTrials,true);
    }
    return true;
  }

  /* The top wrapper sends this only AFTER Back to TURF is clicked. */
  window.addEventListener('message',function(e){
    var d=e&&e.data;
    if(d&&typeof d==='object'&&d.type==='turf-go-home') goHome();
  });

  function boot(){
    style();
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      if(addTrials()||tries>40) clearInterval(timer);
    },100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
