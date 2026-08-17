/* ============================================================
   TURF V88.93 — RELIABLE TRIALS OVERLAY

   - Leaves every native sidebar button untouched.
   - Adds Trials as one extra button only.
   - Opens Trials INSIDE the already-running TURF app in a fullscreen iframe.
   - No top/parent wrapper dependency.
   - No Apps Script reload, so account recovery is not triggered.
   - Back to TURF closes the overlay and returns the live app to Home.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8893_TRIALS_OVERLAY__) return;
  window.__TURF_V8893_TRIALS_OVERLAY__=true;

  var TRIALS_URL='https://turftrials.com/trials/';
  var overlay=null;
  var frame=null;

  function qs(s,r){return (r||document).querySelector(s)}

  function style(){
    if(document.getElementById('turfV8893TrialsCss')) return;
    var s=document.createElement('style');
    s.id='turfV8893TrialsCss';
    s.textContent=`
      #fhqSidebar.fhq-sidebar{overflow-y:auto!important;overflow-x:hidden!important;scrollbar-width:thin!important}
      #turfTrialsNav{position:relative!important}
      #turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px}
      #turfTrialsOverlay{
        position:fixed!important;inset:0!important;z-index:2147483000!important;
        display:none!important;background:#07111c!important;
      }
      #turfTrialsOverlay.open{display:block!important}
      #turfTrialsOverlay iframe{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border:0!important;background:#07111c!important;display:block!important}
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

  function ensureOverlay(){
    if(overlay && document.documentElement.contains(overlay)) return overlay;
    overlay=document.createElement('div');
    overlay.id='turfTrialsOverlay';
    overlay.setAttribute('aria-hidden','true');
    frame=document.createElement('iframe');
    frame.id='turfTrialsOverlayFrame';
    frame.title='TURF Trials';
    frame.setAttribute('allow','fullscreen; clipboard-read; clipboard-write');
    overlay.appendChild(frame);
    document.body.appendChild(overlay);
    return overlay;
  }

  function openTrials(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    }

    /* Set the live app's return destination first, then cover it immediately. */
    goHome();
    ensureOverlay();
    if(!frame.getAttribute('src')) frame.setAttribute('src',TRIALS_URL);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    return false;
  }

  function closeTrials(){
    if(!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    goHome();
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

  /* Trials pages post this to their immediate parent, which is now this app. */
  window.addEventListener('message',function(e){
    var d=e&&e.data;
    if(!d || typeof d!=='object') return;
    if(d.type==='turf-close-trials') closeTrials();
    if(d.type==='turf-go-home'){closeTrials();goHome();}
  });

  function boot(){
    style();
    ensureOverlay();
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      if(addTrials()||tries>40) clearInterval(timer);
    },100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
