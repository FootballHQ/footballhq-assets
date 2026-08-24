/* ============================================================
   TURF V89.42 — SURGICAL GAME FIXES + AUTH INTERACTION UNLOCK
   - Remove Higher/Lower PLAY control even after late renders
   - Remove Who Am I Give Up + duplicate reveal buttons
   - Do NOT mutate clue visibility after guesses (prevents glitching)
   - Clear stale Apps Script recovery/auth interaction blockers.

   IMPORTANT AUTH ARCHITECTURE:
   turftrials.com now owns the sign-in gate. This Apps Script app is embedded
   behind that gate, so the inner legacy gate must never block pointer/scroll
   interaction after the parent reveals the app.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8942_SURGICAL__) return;
window.__TURF_V8942_SURGICAL__=true;

function qa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}
function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim();}
function visible(el){
  if(!el) return false;
  var s=getComputedStyle(el);
  return s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'&&el.getClientRects().length>0;
}
function visibleGameHost(){
  var candidates=qa('#fgSpecialGame,#fgGridGame,#footballGameOverlay,.fg-game-overlay,.fg-special-overlay,[role="dialog"]');
  var hit=candidates.find(function(el){
    if(!visible(el)) return false;
    var t=text(el).toUpperCase();
    return /WHO AM I\?|HIGHER\s*\/\s*LOWER/.test(t);
  });
  if(hit) return hit;
  return document.body;
}
function currentMode(root){
  var t=text(root).toUpperCase();
  if(/WHO AM I\?/.test(t)) return 'whoami';
  if(/HIGHER\s*\/\s*LOWER/.test(t)) return 'higherlower';
  return '';
}

function fixHigherLower(root){
  qa('button,[role="button"]',root).forEach(function(btn){
    var t=text(btn).replace(/✓/g,'').trim().toUpperCase();
    if(t==='PLAY'){
      btn.style.setProperty('display','none','important');
      btn.style.setProperty('visibility','hidden','important');
      btn.style.setProperty('pointer-events','none','important');
      btn.setAttribute('aria-hidden','true');
      btn.disabled=true;
      if(btn.parentNode) btn.parentNode.removeChild(btn);
    }
  });
}

function fixWhoAmI(root){
  qa('button,[role="button"]',root).forEach(function(btn){
    if(/^GIVE UP$/i.test(text(btn))){
      if(btn.parentNode) btn.parentNode.removeChild(btn);
    }
  });

  var reveals=qa('button,[role="button"]',root).filter(function(btn){
    return /REVEAL NEXT HINT/i.test(text(btn));
  });
  reveals.slice(1).forEach(function(btn){
    if(btn.parentNode) btn.parentNode.removeChild(btn);
  });
}

/* ---------- Live TURF parent-auth/interactivity unlock ---------- */
var RECOVERY_WORDS=[
  'recovering your football hq account',
  'restoring your football hq account',
  'restoring your turf account'
];
var parentAuthSeen=false;

function clearMainInteractionFlags(el){
  if(!el)return;
  try{el.removeAttribute('inert');}catch(e){}
  try{el.style.removeProperty('pointer-events');}catch(e){}
}
function hideRecoveryOverlay(hit){
  var p=hit;
  for(var i=0;i<12&&p&&p!==document.body;i++,p=p.parentElement){
    try{
      var cs=getComputedStyle(p),r=p.getBoundingClientRect();
      var layer=cs.position==='fixed'||cs.position==='absolute'||parseInt(cs.zIndex||'0',10)>=5;
      var large=r.width>innerWidth*.40&&r.height>innerHeight*.24;
      if(layer&&large){
        p.style.setProperty('display','none','important');
        p.style.setProperty('visibility','hidden','important');
        p.style.setProperty('opacity','0','important');
        p.style.setProperty('pointer-events','none','important');
        p.setAttribute('aria-hidden','true');
        return true;
      }
    }catch(e){}
  }
  return false;
}
function clearInteractionLock(){
  /*
     Do NOT require an inner-frame token here. The parent turftrials.com
     wrapper is the authentication authority and keeps this iframe hidden
     and pointer-disabled until Worker auth succeeds.
  */
  try{window.__fhqIdentityResolving=false;}catch(e){}

  [document.documentElement,document.body].forEach(function(el){
    if(!el)return;
    ['turf-auth-locked','fhq-identity-recovering','rankings-loading','loading','fhq-loading','account-loading','recovering','is-loading','modal-open'].forEach(function(c){el.classList.remove(c);});
    try{el.removeAttribute('inert');}catch(e){}
    try{
      el.style.removeProperty('pointer-events');
      el.style.removeProperty('filter');
      el.style.removeProperty('opacity');
      /* Do not force overflow here; native TURF sections own scrolling. */
    }catch(e){}
  });

  /* The parent wrapper owns auth now, so the legacy inner gate is obsolete. */
  var gate=document.getElementById('turfAuthGate');
  if(gate){
    gate.classList.add('turf-auth-hidden');
    gate.style.setProperty('display','none','important');
    gate.style.setProperty('visibility','hidden','important');
    gate.style.setProperty('opacity','0','important');
    gate.style.setProperty('pointer-events','none','important');
    gate.setAttribute('aria-hidden','true');
  }

  ['#fhqSidebar','#turfTopbar','#fhqHome','#fhqMain','.fhq-main','.fhq-main-content'].forEach(function(sel){
    qa(sel).forEach(clearMainInteractionFlags);
  });

  /* Remove inert/pointer locks on the actual app panes, but leave modal/game
     overlays alone so their native open/close logic is preserved. */
  qa('#fhqSidebar,#turfTopbar,#fhqHome,#fhqMain,.fhq-main,.fhq-main-content,.fhq-nav').forEach(function(el){
    try{el.removeAttribute('inert');el.style.setProperty('pointer-events','auto','important');}catch(e){}
  });

  qa('body *').forEach(function(el){
    var t=text(el).toLowerCase();
    var match=RECOVERY_WORDS.some(function(w){return t.indexOf(w)>=0;});
    if(match)hideRecoveryOverlay(el);
  });
  return true;
}

function enforce(){
  clearInteractionLock();
  var root=visibleGameHost();
  var m=currentMode(root);
  if(m==='higherlower') fixHigherLower(root);
  if(m==='whoami') fixWhoAmI(root);
}

/* Parent Worker-auth messages are explicit confirmation that the outer gate
   has authenticated the user. We only use them to re-run the unlock; we do
   not alter or replace the working login flow. */
window.addEventListener('message',function(e){
  var d=e&&e.data;
  if(!d||typeof d!=='object')return;
  if(d.type==='turf-auth-worker-profile'||d.type==='turf-auth-google'||d.type==='turf-auth-guest'||d.type==='turf-auth-wrapper-ping'){
    parentAuthSeen=true;
    [0,20,60,140,300,700,1400,2600].forEach(function(ms){setTimeout(clearInteractionLock,ms);});
  }
},true);

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',enforce,{once:true});
else enforce();
window.addEventListener('turf:auth-ready',function(){[0,30,100,250,600,1200].forEach(function(ms){setTimeout(clearInteractionLock,ms);});});

/* Child-list only observer: reacts to late renderer inserts without fighting inputs/styles. */
var pending=0;
new MutationObserver(function(muts){
  var relevant=muts.some(function(m){return m.addedNodes&&m.addedNodes.length;});
  if(!relevant) return;
  clearTimeout(pending);
  pending=setTimeout(enforce,40);
}).observe(document.body||document.documentElement,{childList:true,subtree:true});

/* Safety loop for late account/recovery renderers. */
setInterval(enforce,500);
})();
