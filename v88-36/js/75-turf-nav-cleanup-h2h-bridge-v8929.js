/* ============================================================
   TURF V89.29 — NAV CLEANUP + H2H BACKEND BRIDGE
   - Restore Trivia Tac Toe sidebar icon
   - Remove duplicate TURF Pass icon
   - Expose turfH2HFindMatch() through google.script.run when backend exists
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8929__) return; window.__TURF_V8929__=true;
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function txt(e){return String(e&&e.textContent||'').replace(/\s+/g,' ').trim()}
function svgTac(){return '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5v22M21 5v22M5 11h22M5 21h22" stroke="#55D6FF" stroke-width="2.2" stroke-linecap="round"/><circle cx="8" cy="8" r="2" fill="#55D6FF"/><path d="M23.5 23.5l3 3m0-3l-3 3" stroke="#55D6FF" stroke-width="2" stroke-linecap="round"/></svg>'}
function navFix(){
  var box=q('#turfTrialsCompetitiveLinks,#turfCompetitiveGames,#turfCompetitiveSubnav,[data-turf-competitive-games]');
  if(box){
    var ttt=q('[data-comp-game="ttt"]',box);
    if(ttt){
      var icon=q('.turf-comp-icon',ttt);
      if(!icon){icon=document.createElement('span');icon.className='turf-comp-icon';ttt.insertBefore(icon,ttt.firstChild)}
      if(!q('svg',icon)) icon.innerHTML=svgTac();
      icon.style.setProperty('display','grid','important');
      icon.style.setProperty('place-items','center','important');
      icon.style.setProperty('width','34px','important');icon.style.setProperty('height','34px','important');icon.style.setProperty('flex','0 0 34px','important');
    }
  }
  /* TURF Pass should have one intentional gold icon, never two. */
  var pass=qa('button,a,[role="button"],div').find(function(el){var t=txt(el);return /^TURF Pass(?:\s*PASS)?$/i.test(t) && el.children.length<8});
  if(pass){
    var imgs=qa('img,svg',pass).filter(function(el){var r=el.getBoundingClientRect();return r.width>=16&&r.width<=64&&r.height>=16&&r.height<=64});
    if(imgs.length>1){
      /* Keep the last icon (newer gold shield from the cleanup patch), hide earlier duplicates. */
      imgs.slice(0,-1).forEach(function(el){el.style.setProperty('display','none','important')});
    }
    var iconWraps=qa('span,div',pass).filter(function(el){return el.children.length===1 && (q('img',el)||q('svg',el)) && el.getBoundingClientRect().width<70});
    if(iconWraps.length>1) iconWraps.slice(0,-1).forEach(function(el){el.style.setProperty('display','none','important')});
  }
}

/* Real H2H bridge. The launcher in v89.24/v89.25 already calls this hook when present. */
if(typeof window.turfH2HFindMatch!=='function'){
  window.turfH2HFindMatch=function(gameId,onMatch){
    if(!(window.google&&google.script&&google.script.run)) return false;
    var token='h2h_'+Date.now()+'_'+Math.random().toString(36).slice(2,10);
    window.__TURF_H2H_TOKEN__=token;
    function poll(){
      if(window.__TURF_H2H_TOKEN__!==token)return;
      try{
        google.script.run
          .withSuccessHandler(function(res){
            if(window.__TURF_H2H_TOKEN__!==token)return;
            if(res&&res.matched){
              var match={matchId:res.matchId,opponentName:res.opponentName||'Opponent',opponentId:res.opponentId||'',gameId:gameId};
              match.start=function(){window.dispatchEvent(new CustomEvent('turf:h2h:matched',{detail:match}))};
              onMatch(match);return;
            }
            setTimeout(poll,1600);
          })
          .withFailureHandler(function(){setTimeout(poll,2200)})
          .turfH2HJoinOrPoll(String(gameId||''),token);
      }catch(e){setTimeout(poll,2200)}
    }
    poll();return true;
  };
  window.turfH2HCancel=function(){
    var token=window.__TURF_H2H_TOKEN__;window.__TURF_H2H_TOKEN__='';
    try{if(token&&window.google&&google.script&&google.script.run)google.script.run.turfH2HCancel(token)}catch(e){}
  };
}
function run(){navFix()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[100,300,700,1400,2600,5000].forEach(function(ms){setTimeout(run,ms)});
new MutationObserver(function(){clearTimeout(window.__v8929mo);window.__v8929mo=setTimeout(run,70)}).observe(document.documentElement,{childList:true,subtree:true});
})();
