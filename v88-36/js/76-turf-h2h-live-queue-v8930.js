/* ============================================================
   TURF V89.30 — LIVE H2H QUEUE CLIENT
   Works with Apps Script Code.gs functions:
     turfH2HJoinOrPoll(gameId, token)
     turfH2HCancel(token)
   - Cancels queue entry when user backs out / closes search
   - Keeps the v89.24 Match Found UI
   - Dispatches turf:h2h:matched with match metadata
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8930_H2H__) return; window.__TURF_V8930_H2H__=true;

function canRun(){return !!(window.google&&google.script&&google.script.run)}
function cancelCurrent(){
  var token=window.__TURF_H2H_TOKEN__;
  window.__TURF_H2H_TOKEN__='';
  if(!token||!canRun()) return;
  try{google.script.run.turfH2HCancel(String(token))}catch(e){}
}

/* Replace older bridge so this version owns queue lifecycle. */
window.turfH2HFindMatch=function(gameId,onMatch){
  if(!canRun()) return false;
  cancelCurrent();
  var token='h2h_'+Date.now()+'_'+Math.random().toString(36).slice(2,12);
  window.__TURF_H2H_TOKEN__=token;
  window.__TURF_H2H_GAME__=String(gameId||'');
  var stopped=false;

  function poll(){
    if(stopped||window.__TURF_H2H_TOKEN__!==token) return;
    try{
      google.script.run
        .withSuccessHandler(function(res){
          if(stopped||window.__TURF_H2H_TOKEN__!==token) return;
          if(res&&res.matched){
            window.__TURF_H2H_TOKEN__='';
            var match={
              matchId:String(res.matchId||''),
              opponentName:String(res.opponentName||'TURF Player'),
              opponentId:String(res.opponentId||''),
              playerSlot:String(res.playerSlot||''),
              gameId:String(gameId||'')
            };
            match.start=function(){
              window.dispatchEvent(new CustomEvent('turf:h2h:matched',{detail:match}));
            };
            if(typeof onMatch==='function') onMatch(match);
            return;
          }
          setTimeout(poll,1200);
        })
        .withFailureHandler(function(){
          if(!stopped&&window.__TURF_H2H_TOKEN__===token)setTimeout(poll,1800);
        })
        .turfH2HJoinOrPoll(String(gameId||''),String(token));
    }catch(e){setTimeout(poll,1800)}
  }
  poll();
  return true;
};
window.turfH2HCancel=cancelCurrent;

/* The old launcher closes its own overlay. Catch those actions first and remove queue entry. */
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest?e.target.closest('#turf8924Overlay .t8924-cancel,#turf8924Overlay .t8924-x'):null;
  if(t) cancelCurrent();
},true);
window.addEventListener('pagehide',cancelCurrent);

})();
