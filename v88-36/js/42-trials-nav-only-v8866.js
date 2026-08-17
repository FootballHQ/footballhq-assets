/* ============================================================
   TURF V88.89 — SAFE NAV ROLLBACK

   Stability first:
   - DO NOT reorder or move any native sidebar buttons.
   - DO NOT intercept Home / Shop / Games / Rankings / Draft / Collections.
   - Keep every original TURF/FootballHQ click handler untouched.
   - Only add the Trials button if it is missing.
   - Keep sidebar vertical scrolling available.

   We will rebuild sidebar categories later without moving native nodes.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8889_SAFE_NAV__) return;
  window.__TURF_V8889_SAFE_NAV__=true;

  var TRIALS_URL='https://turftrials.com/trials/';

  function qs(s,r){return (r||document).querySelector(s)}

  function injectStyle(){
    if(document.getElementById('turfV8889SafeNavCss')) return;
    var s=document.createElement('style');
    s.id='turfV8889SafeNavCss';
    s.textContent=`
      #fhqSidebar.fhq-sidebar{
        overflow-y:auto!important;
        overflow-x:hidden!important;
        -webkit-overflow-scrolling:touch!important;
        overscroll-behavior:contain!important;
        scrollbar-width:thin!important;
      }
      #fhqSidebar .fhq-side-spacer{flex:0 0 8px!important;min-height:8px!important}
      #turfTrialsNav{position:relative!important}
      #turfTrialsNav:after{
        content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;
        letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);
        background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px
      }
    `;
    document.head.appendChild(s);
  }

  function openTrials(e){
    if(e){e.preventDefault();e.stopPropagation()}
    try{window.top.location.assign(TRIALS_URL)}
    catch(err){window.location.assign(TRIALS_URL)}
  }

  function addTrialsButton(){
    var nav=qs('.fhq-nav');
    if(!nav) return false;

    var existing=qs('#turfTrialsNav,[data-fhq-nav="trials"]',nav);
    if(existing){
      if(existing.id!=='turfTrialsNav') existing.id='turfTrialsNav';
      if(existing.dataset.turfSafeWired!=='1'){
        existing.dataset.turfSafeWired='1';
        existing.addEventListener('click',openTrials,false);
      }
      return true;
    }

    var btn=document.createElement('button');
    btn.id='turfTrialsNav';
    btn.type='button';
    btn.setAttribute('data-fhq-nav','trials');
    btn.dataset.turfSafeWired='1';
    btn.innerHTML='<span aria-hidden="true">⚡</span> Trials';
    btn.addEventListener('click',openTrials,false);

    /* Insert once without moving or replacing any native button. */
    var coming=qs('button[data-fhq-nav="coming"]',nav);
    if(coming) nav.insertBefore(btn,coming);
    else nav.appendChild(btn);
    return true;
  }

  function boot(){
    injectStyle();
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      if(addTrialsButton()||tries>40) clearInterval(timer);
    },100);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
