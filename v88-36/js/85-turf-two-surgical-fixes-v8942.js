/* ============================================================
   TURF V89.42 — SURGICAL GAME FIXES
   - Remove Higher/Lower PLAY control even after late renders
   - Remove Who Am I Give Up + duplicate reveal buttons
   - Do NOT mutate clue visibility after guesses (prevents glitching)
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
  /* Intentionally leave clue rows alone. The native game owns clue progression. */
}

function enforce(){
  var root=visibleGameHost();
  var m=currentMode(root);
  if(m==='higherlower') fixHigherLower(root);
  if(m==='whoami') fixWhoAmI(root);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',enforce,{once:true});
else enforce();

/* Child-list only observer: reacts to late renderer inserts without fighting inputs/styles. */
var pending=0;
new MutationObserver(function(muts){
  var relevant=muts.some(function(m){return m.addedNodes&&m.addedNodes.length;});
  if(!relevant) return;
  clearTimeout(pending);
  pending=setTimeout(enforce,40);
}).observe(document.body||document.documentElement,{childList:true,subtree:true});

/* Safety loop for renderers that replace whole modal fragments asynchronously. */
setInterval(enforce,500);
})();
