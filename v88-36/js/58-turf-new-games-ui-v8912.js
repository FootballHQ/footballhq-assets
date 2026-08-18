/* ============================================================
   TURF V89.12 — NEW GAMES UI / NAV FOLLOW-UP
   - Competitive games live under Trials in sidebar
   - Casual page keeps Chameleon + Two Face only
   - Two Face gets NFL-name dropdowns
   - Chameleon modal stays below top bar and fits viewport
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8912__) return; window.__TURF_V8912__=true;
function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

function addCss(){
  if(qs('#turfV8912Css')) return;
  var s=document.createElement('style'); s.id='turfV8912Css';
  s.textContent=`
    /* New-game modal must live below fixed TURF top bar */
    #turfGameModal{top:var(--turf-shell-h,70px)!important;height:calc(100vh - var(--turf-shell-h,70px))!important;inset-inline:0!important;bottom:0!important;padding:14px 20px!important;align-items:center!important;overflow:hidden!important}
    #turfGameModal .turf-modal{max-height:calc(100vh - var(--turf-shell-h,70px) - 28px)!important;width:min(1040px,94vw)!important;overflow:auto!important}
    #turfGameModal .turf-game-body{padding:18px 22px!important}
    #turfGameModal .turf-modal-head{padding:14px 22px!important}
    #turfGameModal .turf-modal-head h2{font-size:26px!important}
    #turfGameModal .turf-cham-stage{width:min(760px,100%)!important;max-height:52vh!important}

    /* Casual section should contain only casual titles */
    #turfV8911Root [data-turf-new="deal"],
    #turfV8911Root [data-turf-new="ttt"],
    #turfV8911Root [data-turf-new="connect4"]{display:none!important}
    #turfV8911Root .turf-new-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}

    /* Competitive submenu under Trials */
    #turfTrialsCompetitiveLinks{margin:2px 8px 10px 18px;padding-left:13px;border-left:1px solid rgba(68,185,239,.25);display:grid;gap:4px}
    #turfTrialsCompetitiveLinks .turf-comp-nav{width:100%;min-height:34px;border:0;background:transparent;color:#a9b9c5;border-radius:8px;text-align:left;padding:7px 10px;display:flex;align-items:center;gap:8px;font:800 11px/1.15 system-ui;cursor:pointer}
    #turfTrialsCompetitiveLinks .turf-comp-nav:hover{background:rgba(24,121,166,.15);color:#effaff}
    #turfTrialsCompetitiveLinks .turf-comp-nav span{width:19px;height:19px;display:grid;place-items:center;border-radius:6px;background:#0c2534;color:#70d8ff;font-size:11px}

    /* Two Face player selectors */
    #tfA,#tfB{appearance:auto!important}
    .turf-twoface-helper{max-width:680px;margin:8px auto 0;color:#6f8795;font:700 11px/1.35 system-ui;text-align:center}

    @media(max-width:800px){
      #turfGameModal{top:var(--turf-shell-h,58px)!important;height:calc(100vh - var(--turf-shell-h,58px))!important;padding:8px!important}
      #turfGameModal .turf-modal{width:98vw!important;max-height:calc(100vh - var(--turf-shell-h,58px) - 12px)!important}
      #turfV8911Root .turf-new-grid{grid-template-columns:1fr!important}
    }
  `;
  document.head.appendChild(s);
}

function hiddenGameButton(id){return qs('#turfV8911Root [data-turf-new="'+id+'"]')}
function launchFromSidebar(id){
  var b=hiddenGameButton(id);
  if(b){b.click();return true}
  return false;
}

function ensureCompetitiveNav(){
  var trials=qs('#turfTrialsNav');
  if(!trials || qs('#turfTrialsCompetitiveLinks')) return;
  var wrap=document.createElement('div'); wrap.id='turfTrialsCompetitiveLinks';
  wrap.innerHTML=
    '<button type="button" class="turf-comp-nav" data-comp-game="deal"><span>💼</span>Deal or No Deal</button>'+ 
    '<button type="button" class="turf-comp-nav" data-comp-game="ttt"><span>✕</span>Trivia Tic-Tac-Toe</button>'+ 
    '<button type="button" class="turf-comp-nav" data-comp-game="connect4"><span>●</span>4 in a Row</button>';
  trials.insertAdjacentElement('afterend',wrap);
  qsa('[data-comp-game]',wrap).forEach(function(btn){btn.onclick=function(){launchFromSidebar(this.dataset.compGame)}});
}

var FALLBACK_NAMES=['Patrick Mahomes','Josh Allen','Justin Jefferson','JaMarr Chase','Lamar Jackson','Jalen Hurts','Maxx Crosby','Micah Parsons','Amon-Ra St. Brown','Puka Nacua','Baker Mayfield','Joe Burrow'];
function collectNFLNames(){
  var out=FALLBACK_NAMES.slice();
  try{
    var candidates=[window.ALL_PLAYERS,window.NFL_PLAYERS,window.FHQ_PLAYERS,window.__FHQ_PLAYERS,window.__fhqPlayers,window.fullNFLDatabase];
    candidates.forEach(function(arr){
      if(!Array.isArray(arr)) return;
      arr.forEach(function(p){var n=typeof p==='string'?p:(p&&(p.name||p.player||p.fullName));if(n)out.push(String(n))});
    });
  }catch(e){}
  return Array.from(new Set(out)).sort();
}
function enhanceTwoFace(){
  var a=qs('#tfA'),b=qs('#tfB'); if(!a||!b) return;
  var dl=qs('#turfTwoFaceNames');
  if(!dl){dl=document.createElement('datalist');dl.id='turfTwoFaceNames';document.body.appendChild(dl)}
  var names=collectNFLNames(); dl.innerHTML=names.map(function(n){return '<option value="'+n.replace(/"/g,'&quot;')+'"></option>'}).join('');
  [a,b].forEach(function(i){i.setAttribute('list','turfTwoFaceNames');i.setAttribute('autocomplete','off');i.placeholder='Search NFL player…'});
  var grid=a.closest('.turf-answer-grid');
  if(grid && !qs('.turf-twoface-helper',grid.parentElement)){
    var h=document.createElement('div');h.className='turf-twoface-helper';h.textContent='Start typing a player name and choose from the NFL dropdown.';grid.insertAdjacentElement('afterend',h);
  }
}

function renameCasualHeader(){
  var r=qs('#turfV8911Root'); if(!r)return;
  var h=qs('.turf-new-head h2',r);if(h)h.textContent='Casual Games';
  var tag=qs('.turf-new-head > span:last-child',r);if(tag)tag.textContent='CASUAL';
}
function run(){addCss();ensureCompetitiveNav();enhanceTwoFace();renameCasualHeader()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[250,700,1400,2500,4500].forEach(function(ms){setTimeout(run,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8912Obs);window.__turf8912Obs=setTimeout(run,80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
