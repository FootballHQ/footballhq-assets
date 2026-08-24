/* ============================================================
   TURF V88.65 — RECOVERY UI UNLOCK + TRIALS NAV
   Login-safe recovery release. Does not change the working sign-in flow.
   Preserves Trials/nav behavior while preventing the obsolete recovery
   overlay from blocking TURF after authentication succeeds.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TURF_V8865__) return;
  window.__TURF_V8865__=true;

  var TRIALS_URL='https://turftrials.com/trials/';
  var TARGETS=[
    'recovering your football hq account',
    'restoring your football hq account',
    'restoring your turf account'
  ];

  function norm(v){return String(v||'').toLowerCase().replace(/\u2026/g,'...').replace(/\s+/g,' ').trim();}

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
    var t=norm(el.textContent);
    for(var i=0;i<TARGETS.length;i++) if(t.indexOf(TARGETS[i])!==-1) return true;
    return false;
  }

  function clearRecoveryState(){
    try{window.__fhqIdentityResolving=false;}catch(_){}
    [document.documentElement,document.body].forEach(function(el){
      if(!el)return;
      ['fhq-identity-recovering','rankings-loading','loading','fhq-loading','account-loading','recovering','is-loading','modal-open'].forEach(function(c){el.classList.remove(c);});
      try{el.style.removeProperty('overflow');el.style.removeProperty('filter');el.style.removeProperty('opacity');}catch(_){}
    });
  }

  function unlockRecovery(){
    try{
      clearRecoveryState();
      var all=document.body ? document.body.querySelectorAll('*') : [];
      var released=false;
      for(var i=0;i<all.length;i++){
        var hit=all[i];
        if(!containsTarget(hit)) continue;
        var children=hit.children||[],childHas=false;
        for(var j=0;j<children.length;j++) if(containsTarget(children[j])){childHas=true;break;}
        if(childHas) continue;

        var p=hit,candidates=[];
        while(p && p!==document.body && candidates.length<14){candidates.push(p);p=p.parentElement;}

        var overlay=null;
        for(var k=0;k<candidates.length;k++){
          var el=candidates[k],r,cs;
          try{r=el.getBoundingClientRect();cs=getComputedStyle(el);}catch(_){continue;}
          var large=r.width>innerWidth*.40 && r.height>innerHeight*.24;
          var layer=cs.position==='fixed'||cs.position==='absolute'||parseInt(cs.zIndex||'0',10)>=5;
          if(large&&layer){overlay=el;break;}
        }
        if(!overlay){
          for(var q=candidates.length-1;q>=0;q--){
            var rr;try{rr=candidates[q].getBoundingClientRect();}catch(_){continue;}
            if(rr.width>innerWidth*.65 && rr.height>innerHeight*.45){overlay=candidates[q];break;}
          }
        }

        var target=overlay||hit;
        target.style.setProperty('display','none','important');
        target.style.setProperty('visibility','hidden','important');
        target.style.setProperty('opacity','0','important');
        target.style.setProperty('pointer-events','none','important');
        target.setAttribute('aria-hidden','true');
        released=true;
      }
      clearRecoveryState();
      return released;
    }catch(e){console.warn('[TURF V88.65] unlock error',e);return false;}
  }

  function apply(){brand();installStyle();addTrials();}
  function sweep(){apply();unlockRecovery();}
  function boot(){
    sweep();
    [0,30,80,160,300,550,900,1400,2200,3500,5500,8000,12000].forEach(function(ms){setTimeout(sweep,ms);});
    window.addEventListener('turf:auth-ready',function(){[0,20,60,140,300,700,1400,2600].forEach(function(ms){setTimeout(unlockRecovery,ms);});});
    if(window.MutationObserver){
      var timer=null;
      new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(sweep,16);}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
