/* ============================================================
   TURF V88.91 — SAFE TRIALS ENTRY + HOME RETURN

   - Leaves every native sidebar button untouched.
   - Adds Trials as one extra button only.
   - Opens Trials in the parent overlay when TURF is wrapped by turftrials.com.
   - Listens for turf-go-home and clicks the native Home button in-place.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8891_SAFE_TRIALS__) return;
  window.__TURF_V8891_SAFE_TRIALS__=true;

  var TRIALS_URL='https://turftrials.com/trials/';

  function qs(s,r){return (r||document).querySelector(s)}

  function style(){
    if(document.getElementById('turfV8891TrialsCss')) return;
    var s=document.createElement('style');
    s.id='turfV8891TrialsCss';
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
    if(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation()}
    /* Put the underlying app on Home before covering it. */
    goHome();
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

  window.addEventListener('message',function(e){
    var d=e&&e.data;
    if(d&&typeof d==='object'&&d.type==='turf-go-home'){
      goHome();
    }
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
