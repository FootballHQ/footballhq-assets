/* ============================================================
   TURF V89.43 — HIGHER/LOWER + WHO AM I HARD FIX
   Fixes selector ambiguity from v89.42 and avoids DOM-removal loops.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8943_HARD_FIX__) return;
window.__TURF_V8943_HARD_FIX__=true;

function qa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim();}
function vis(el){if(!el)return false;var s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'&&el.getClientRects().length>0;}
function norm(s){return String(s||'').replace(/✓/g,'').replace(/\s+/g,' ').trim().toUpperCase();}

function pageHasVisibleTitle(re){
  return qa('h1,h2,h3,.fg-game-title,.fg-special-title,.fg-newgame-title').some(function(el){return vis(el)&&re.test(norm(txt(el)));});
}

function hardFixHigherLower(){
  if(!pageHasVisibleTitle(/^HIGHER\s*\/\s*LOWER$/)) return;
  qa('button,[role="button"]').forEach(function(b){
    if(norm(txt(b))==='PLAY'){
      b.disabled=true;
      b.setAttribute('aria-hidden','true');
      b.style.setProperty('display','none','important');
      b.style.setProperty('visibility','hidden','important');
      b.style.setProperty('opacity','0','important');
      b.style.setProperty('height','0','important');
      b.style.setProperty('min-height','0','important');
      b.style.setProperty('padding','0','important');
      b.style.setProperty('margin','0','important');
      b.style.setProperty('border','0','important');
      b.style.setProperty('pointer-events','none','important');
    }
  });
}

function hardFixWhoAmI(){
  if(!pageHasVisibleTitle(/^WHO AM I\?$/)) return;
  var giveups=qa('button,[role="button"]').filter(function(b){return vis(b)&&/^GIVE UP$/i.test(txt(b));});
  giveups.forEach(function(b){
    b.disabled=true;
    b.setAttribute('aria-hidden','true');
    b.style.setProperty('display','none','important');
    b.style.setProperty('pointer-events','none','important');
  });

  var reveals=qa('button,[role="button"]').filter(function(b){return vis(b)&&/REVEAL NEXT HINT/i.test(txt(b));});
  reveals.forEach(function(b,i){
    if(i===0){
      b.style.removeProperty('display');
      b.style.removeProperty('visibility');
      b.style.removeProperty('opacity');
      b.removeAttribute('aria-hidden');
      b.disabled=false;
    }else{
      b.disabled=true;
      b.setAttribute('aria-hidden','true');
      b.style.setProperty('display','none','important');
      b.style.setProperty('pointer-events','none','important');
    }
  });
}

function run(){hardFixHigherLower();hardFixWhoAmI();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,25,75,150,300,600,1000,1800,3000].forEach(function(ms){setTimeout(run,ms);});
var t=0;
new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,25);}).observe(document.documentElement,{childList:true,subtree:true});
setInterval(run,350);
})();
