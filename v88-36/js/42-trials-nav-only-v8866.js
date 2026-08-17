/* ============================================================
   TURF V88.90 — SAFE TRIALS ENTRY

   - Leaves every native sidebar button untouched.
   - Adds Trials as one extra button only.
   - When TURF is inside turftrials.com, opens Trials in the parent overlay
     so the Apps Script app/account session stays alive underneath.
   - Falls back to normal navigation only when not inside the wrapper.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8890_SAFE_TRIALS__) return;
  window.__TURF_V8890_SAFE_TRIALS__=true;

  var TRIALS_URL='https://turftrials.com/trials/';

  function qs(s,r){return (r||document).querySelector(s)}

  function style(){
    if(document.getElementById('turfV8890TrialsCss')) return;
    var s=document.createElement('style');
    s.id='turfV8890TrialsCss';
    s.textContent=`
      #fhqSidebar.fhq-sidebar{overflow-y:auto!important;overflow-x:hidden!important;scrollbar-width:thin!important}
      #turfTrialsNav{position:relative!important}
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px}
    `;
    document.head.appendChild(s);
  }

  function openTrials(e){
    if(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation()}
    try{
      if(window.parent && window.parent!==window){
        window.parent.postMessage({type:'turf-open-trials',path:'/trials/'},'*');
        return false;
      }
    }catch(err){}
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
