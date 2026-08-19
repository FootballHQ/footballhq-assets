/* TURF V89.38 — H2H MATCH FOUND -> GAMEPLAY AUTOSTART
   Fixes the Match Found / Preparing match screen getting stuck.
   v89.30 creates match.start(), while v89.37 gameplay listens for
   turf:h2h:matched. This bridge actually calls match.start().
*/
(function(){
'use strict';
if(window.__TURF_V8938_H2H_AUTOSTART__) return;
window.__TURF_V8938_H2H_AUTOSTART__=true;

function install(){
  var original=window.turfH2HFindMatch;
  if(typeof original!=='function'){
    setTimeout(install,250);
    return;
  }
  if(original.__turf8938Wrapped) return;

  function wrapped(gameId,onMatch){
    return original.call(this,gameId,function(match){
      var started=false;
      function startOnce(){
        if(started) return;
        started=true;
        try{
          if(match&&typeof match.start==='function') match.start();
          else if(match) window.dispatchEvent(new CustomEvent('turf:h2h:matched',{detail:match}));
        }catch(e){
          try{window.dispatchEvent(new CustomEvent('turf:h2h:matched',{detail:match||{}}));}catch(_e){}
        }
      }

      /* Let the existing Match Found UI paint first, then enter gameplay. */
      if(typeof onMatch==='function'){
        try{onMatch(match);}catch(e){}
      }
      setTimeout(startOnce,700);
    });
  }

  wrapped.__turf8938Wrapped=true;
  wrapped.__turf8938Original=original;
  window.turfH2HFindMatch=wrapped;
}

install();
})();
