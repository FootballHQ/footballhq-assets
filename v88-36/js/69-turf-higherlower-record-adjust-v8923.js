/* TURF V89.23 — Higher/Lower leaderboard record adjustment
   Compromise adjustment requested by site owner: Zmonster 10000 -> 100.
   This is intentionally scoped to Higher/Lower leaderboard UI only.
*/
(function(){
'use strict';
if(window.__TURF_V8923_HL_RECORD_ADJUST__) return;
window.__TURF_V8923_HL_RECORD_ADJUST__ = true;

function text(el){ return (el && el.textContent || '').trim(); }
function isScore10000(el){ return /^10,?000$/.test(text(el)); }

function adjustWithin(root){
  if(!root || !root.querySelectorAll) return;
  var all=[].slice.call(root.querySelectorAll('*'));
  var names=all.filter(function(el){ return text(el)==='Zmonster'; });
  names.forEach(function(nameEl){
    var box=nameEl;
    for(var i=0;i<6 && box && box!==root;i++,box=box.parentElement){
      var desc=[].slice.call(box.querySelectorAll('*'));
      var hit=desc.find(isScore10000);
      if(hit){ hit.textContent='100'; break; }
    }
  });

  // Podium layouts sometimes separate the name/value into sibling containers.
  // Only operate when this is visibly the Higher / Lower leaderboard.
  var bodyText=text(root);
  if(/Higher\s*\/\s*Lower World Rankings/i.test(bodyText) && /Zmonster/.test(bodyText)){
    all.forEach(function(el){
      if(!isScore10000(el)) return;
      var p=el.parentElement;
      for(var j=0;j<5 && p;j++,p=p.parentElement){
        if(/Zmonster/.test(text(p))){ el.textContent='100'; break; }
      }
    });
  }
}

function run(){ adjustWithin(document); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
new MutationObserver(function(muts){
  muts.forEach(function(m){
    if(m.target && m.target.nodeType===1) adjustWithin(m.target.closest ? (m.target.closest('[role="dialog"],.modal,.fhq-modal') || m.target) : m.target);
  });
}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();
