/* ============================================================
   TURF V88.65 — RECOVERY UI UNLOCK + TRIALS NAV
   Cache-busted replacement for V88.64.
   Preserves account recovery but will never let its legacy overlay
   permanently block the site UI.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8865__) return;
  window.__TURF_V8865__=true;

  var TRIALS_URL='https://turftrials.com/trials/';
  var TARGET='recovering your football hq account';

  function norm(v){return String(v||'').toLowerCase().replace(/\s+/g,' ').trim();}

  function openTrials(e){
    if(e){e.preventDefault();e.stopPropagation();}
    try{window.top.location.href=TRIALS_URL;}catch(_){window.location.href=TRIALS_URL;}
    return false;
  }

  function brand(){
    try{
      document.title='TURF';
      var b=document.querySelector('.fhq-brand-copy');
      if(b){
        Array.prototype.forEach.call(b.childNodes,function(n){
          if(n.nodeType===3 && /football hq/i.test(n.nodeValue||'')) n.nodeValue='TURF';
        });
        var sm=b.querySelector('small'); if(sm) sm.textContent='FOOTBALL • GAMES • COLLECT';
      }
      var hero=document.querySelector('#fhqHome .fhq-home-brandline h1,.fhq-home-brandline h1');
      if(hero && /football hq/i.test(hero.textContent||'')) hero.textContent='TURF';
    }catch(_){}
  }

  function addTrials(){
    var nav=document.querySelector('.fhq-nav');
    if(!nav) return;
    if(nav.querySelector('#turfTrialsNav,[data-fhq-nav="trials"]')) return;
    var btn=document.createElement('button');
    btn.id='turfTrialsNav'; btn.type='button'; btn.setAttribute('data-fhq-nav','trials');
    btn.innerHTML='<span aria-hidden="true">⚡</span> Trials';
    btn.addEventListener('click',openTrials,true);
    var coming=nav.querySelector('[data-fhq-nav="coming"]');
    if(coming) nav.insertBefore(btn,coming); else nav.appendChild(btn);
  }

  function installStyle(){
    if(document.getElementById('turfV8865Css')) return;
    var s=document.createElement('style'); s.id='turfV8865Css';
    s.textContent='#turfTrialsNav{position:relative!important}#turfTrialsNav:after{content:"NEW";margin-left:auto;font-size:8px;font-weight:1000;letter-spacing:.12em;color:#9bddff;border:1px solid rgba(122,209,255,.35);background:rgba(122,209,255,.08);border-radius:999px;padding:2px 5px}';
    document.head.appendChild(s);
  }

  function containsTarget(el){
    if(!el || el.nodeType!==1) return false;
    return norm(el.textContent).indexOf(TARGET)!==-1;
  }

  function unlockRecovery(){
    try{
      var all=document.body ? document.body.querySelectorAll('*') : [];
      var hit=null;
      for(var i=0;i<all.length;i++){
        if(containsTarget(all[i])){
          var children=all[i].children||[];
          var childHas=false;
          for(var j=0;j<children.length;j++) if(containsTarget(children[j])){childHas=true;break;}
          if(!childHas){ hit=all[i]; break; }
        }
      }
      if(!hit) return false;

      var p=hit, candidates=[];
      while(p && p!==document.body && candidates.length<12){candidates.push(p);p=p.parentElement;}

      var overlay=null;
      for(var k=0;k<candidates.length;k++){
        var el=candidates[k], r=el.getBoundingClientRect(), cs=getComputedStyle(el);
        if(r.width>innerWidth*.65 && r.height>innerHeight*.55 && (cs.position==='fixed'||cs.position==='absolute'||parseInt(cs.zIndex||'0',10)>=5)) overlay=el;
      }
      if(!overlay){
        for(var q=candidates.length-1;q>=0;q--){
          var rr=candidates[q].getBoundingClientRect();
          if(rr.width>innerWidth*.75 && rr.height>innerHeight*.65){overlay=candidates[q];break;}
        }
      }

      (overlay||hit).style.setProperty('display','none','important');
      (overlay||hit).style.setProperty('pointer-events','none','important');
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
      ['rankings-loading','loading','fhq-loading','account-loading','recovering'].forEach(function(c){document.body.classList.remove(c);document.documentElement.classList.remove(c);});
      console.warn('[TURF V88.65] Stalled recovery UI released. Recovery data/process preserved.');
      return true;
    }catch(e){console.warn('[TURF V88.65] unlock error',e);return false;}
  }

  function apply(){brand();installStyle();addTrials();}
  function boot(){
    apply();
    [500,1500,3000,5000,8000,12000].forEach(function(ms){setTimeout(function(){apply();unlockRecovery();},ms);});
    if(window.MutationObserver){new MutationObserver(function(){apply();}).observe(document.documentElement,{childList:true,subtree:true});}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
