/* TURF static migration — Batch 4 full-page game framework
   Presentation/navigation layer only. Reuses the preserved game engine and
   existing Daily/Unlimited controls instead of replacing game logic.
   Safe: loaded only by /turf-static/real-app.html until approved.
*/
(function(){
'use strict';
if(window.__TURF_STATIC_BATCH4_GAME_PAGES__)return;
window.__TURF_STATIC_BATCH4_GAME_PAGES__=true;

var GAME_META={
  players:{title:'Current Players',eyebrow:'DAILY PLAYER ID',desc:'Identify the active NFL player from the clues before your guesses run out.',rules:'Use team, position, age and number feedback to narrow the field.',daily:'Daily: one scored challenge',unlimited:'Unlimited: replay anytime',accent:'#34b7ff'},
  legends:{title:'Legends',eyebrow:'NFL HISTORY',desc:'Use the clue grid to identify a player from NFL history.',rules:'Green is exact, yellow is close, gray eliminates that clue.',daily:'Daily: one scored challenge',unlimited:'Unlimited: replay anytime',accent:'#b48cff'},
  grid:{title:'Grid',eyebrow:'ROSTER CONNECTIONS',desc:'Fill the grid with players who satisfy both row and column conditions.',rules:'Each square must match both sides. Use your football knowledge, not luck.',daily:'Daily: shared grid',unlimited:'Unlimited: fresh boards',accent:'#49d6a3'},
  whoami:{title:'Who Am I?',eyebrow:'CLUE LADDER',desc:'Identify the mystery player as clues are revealed.',rules:'Fewer clues means a stronger finish. Read carefully before committing.',daily:'Daily: one mystery player',unlimited:'Unlimited: keep guessing',accent:'#ffca58'},
  career:{title:'Career Path',eyebrow:'TEAM JOURNEY',desc:'Follow a player’s NFL stops and identify the career behind the path.',rules:'Use the order of teams and career context to make the final call.',daily:'Daily: one career',unlimited:'Unlimited: new careers',accent:'#ff8d6b'},
  higherlower:{title:'Higher / Lower',eyebrow:'STAT DUEL',desc:'Build a streak by deciding which player owns the higher stat.',rules:'One wrong call ends the run. Chase your best streak.',daily:'Daily: scored run',unlimited:'Unlimited: chase records',accent:'#35d0d8'},
  imposter:{title:'Imposter',eyebrow:'FIND THE OUTLIER',desc:'Spot the one player who does not belong with the group.',rules:'Look for the shared football connection, then remove the exception.',daily:'Daily: one board',unlimited:'Unlimited: fresh groups',accent:'#ff6e8d'},
  connections:{title:'Connections',eyebrow:'FOUR GROUPS',desc:'Sort the players into four hidden football connections.',rules:'Select four at a time. Correct groups lock in; wrong groups cost mistakes.',daily:'Daily: shared puzzle',unlimited:'Unlimited: fresh puzzles',accent:'#9bd15e'},
  statline:{title:'Stat Line',eyebrow:'NAME THAT SEASON',desc:'Identify the player behind the season stat line.',rules:'Use position and production context to decode the line.',daily:'Daily: one stat line',unlimited:'Unlimited: new stat lines',accent:'#56a8ff'},
  draftclass:{title:'Draft Class',eyebrow:'DRAFT MEMORY',desc:'Identify the player or class from NFL Draft clues.',rules:'Use year, pick, team and class context to solve the board.',daily:'Daily: one draft puzzle',unlimited:'Unlimited: new classes',accent:'#f3b759'},
  moggle:{title:'Mogger',eyebrow:'PLAYER FACE-OFF',desc:'Compare NFL players and build the strongest run you can.',rules:'Make the better football call each round and protect your streak.',daily:'Daily: scored run',unlimited:'Unlimited: chase records',accent:'#ea79ff'},
  timeline:{title:'Timeline',eyebrow:'PUT IT IN ORDER',desc:'Arrange NFL moments from oldest to newest.',rules:'Drag or choose the events in chronological order before submitting.',daily:'Daily: one timeline',unlimited:'Unlimited: new timelines',accent:'#75c8ff'},
  guessteam:{title:'Franchise Finder',eyebrow:'NAME THE TEAM',desc:'Use the clues to identify the NFL franchise.',rules:'Every clue narrows the possibilities. Lock in the team when you are ready.',daily:'Daily: one franchise',unlimited:'Unlimited: new teams',accent:'#f47f68'},
  depthchart:{title:'Depth Chart',eyebrow:'BUILD THE ORDER',desc:'Place players into the correct depth-chart order.',rules:'Use current role and roster context to place each player correctly.',daily:'Daily: one chart',unlimited:'Unlimited: fresh charts',accent:'#62d197'}
};

var NAME_TO_MODE={
  'CURRENT PLAYERS':'players','ACTIVE PLAYERS':'players','PLAYERS':'players','LEGENDS':'legends','GRID':'grid','WHO AM I?':'whoami',
  'CAREER PATH':'career','HIGHER / LOWER':'higherlower','IMPOSTER':'imposter','CONNECTIONS':'connections','STAT LINE':'statline',
  'DRAFT CLASS':'draftclass','MOGGER':'moggle','TIMELINE':'timeline','FRANCHISE FINDER':'guessteam','DEPTH CHART':'depthchart'
};

function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
function overlay(){return qs('#footballGameOverlay')}
function shell(){return qs('#footballGameOverlay .football-game-shell')}
function isOpen(){var o=overlay();if(!o)return false;var a=o.getAttribute('aria-hidden');var cs=getComputedStyle(o);return a==='false'||o.classList.contains('open')||o.classList.contains('active')||(cs.display!=='none'&&cs.visibility!=='hidden'&&Number(cs.opacity||1)>0)}
function activeMode(){
  var b=qs('#footballGameOverlay .fg-mode.active,[data-fg-mode].active');
  if(b&&b.dataset.fgMode)return b.dataset.fgMode;
  var host=qs('#fgSpecialGame')||shell();
  if(host){
    var txt=(host.textContent||'').toUpperCase();
    var names=Object.keys(NAME_TO_MODE);for(var i=0;i<names.length;i++)if(txt.indexOf(names[i])>=0)return NAME_TO_MODE[names[i]];
  }
  return 'players';
}
function playType(){var u=qs('#fgUnlimitedBtn'),d=qs('#fgDailyBtn');if(u&&u.classList.contains('active'))return 'unlimited';if(d&&d.classList.contains('active'))return 'daily';return 'daily'}
function sidebarWidth(){
  var s=qs('#fhqSidebar');if(!s)return 0;var cs=getComputedStyle(s);if(cs.display==='none'||cs.visibility==='hidden')return 0;var r=s.getBoundingClientRect();return r.width>80?Math.round(r.right):0;
}
function topOffset(){
  var candidates=['#turfTopbar','.turf-topbar','.fhq-topbar','header'];
  for(var i=0;i<candidates.length;i++){var el=qs(candidates[i]);if(!el)continue;var cs=getComputedStyle(el);if(cs.display==='none'||cs.position!=='fixed'&&cs.position!=='sticky')continue;var r=el.getBoundingClientRect();if(r.height>20&&r.height<140)return Math.max(0,Math.round(r.bottom));}
  return 64;
}
function setFrameVars(){document.documentElement.style.setProperty('--turf-b4-side',sidebarWidth()+'px');document.documentElement.style.setProperty('--turf-b4-top',topOffset()+'px')}
function ensureHeader(){
  var sh=shell();if(!sh)return null;
  var h=qs('#turfBatch4Header',sh);if(h)return h;
  h=document.createElement('section');h.id='turfBatch4Header';h.className='turf-b4-header';
  var modes=qs('.fg-modes',sh);if(modes)modes.parentNode.insertBefore(h,modes);else sh.insertBefore(h,sh.firstChild);
  return h;
}
function renderHeader(){
  var h=ensureHeader();if(!h)return;
  var mode=activeMode(),m=GAME_META[mode]||GAME_META.players,type=playType();
  var reward=type==='daily'?m.daily:m.unlimited;
  h.style.setProperty('--b4-accent',m.accent||'#34b7ff');
  h.innerHTML='<div class="turf-b4-hero-copy"><span class="turf-b4-eyebrow">'+esc(m.eyebrow)+'</span><h1>'+esc(m.title)+'</h1><p>'+esc(m.desc)+'</p></div>'+
    '<div class="turf-b4-info-grid"><div><span>HOW TO PLAY</span><strong>'+esc(m.rules)+'</strong></div><div><span>ACTIVE MODE</span><strong>'+esc(type==='daily'?'DAILY CHALLENGE':'UNLIMITED')+'</strong></div><div><span>REWARD LOOP</span><strong>'+esc(reward)+'</strong></div></div>';
  var o=overlay();if(o)o.setAttribute('data-turf-b4-mode',mode);
}
function updateOpenState(){
  setFrameVars();var open=isOpen();document.body.classList.toggle('turf-b4-game-open',open);
  if(open){renderHeader();var o=overlay();if(o)o.setAttribute('data-turf-b4-page','1');}
}
function decorateModes(){
  qsa('#footballGameOverlay .fg-mode[data-fg-mode]').forEach(function(b){if(!b.dataset.turfB4Bound){b.dataset.turfB4Bound='1';b.addEventListener('click',function(){setTimeout(renderHeader,0);setTimeout(renderHeader,80)},true)}});
  ['#fgDailyBtn','#fgUnlimitedBtn'].forEach(function(sel){var b=qs(sel);if(b&&!b.dataset.turfB4Bound){b.dataset.turfB4Bound='1';b.addEventListener('click',function(){setTimeout(renderHeader,0);setTimeout(renderHeader,100)},true)}})
}
function installCss(){
  if(qs('#turfBatch4GamePageCss'))return;var s=document.createElement('style');s.id='turfBatch4GamePageCss';s.textContent=`
  body.turf-b4-game-open{overflow:hidden!important}
  body.turf-b4-game-open #footballGameOverlay[data-turf-b4-page="1"]{
    position:fixed!important;left:var(--turf-b4-side,0px)!important;right:0!important;top:var(--turf-b4-top,64px)!important;bottom:0!important;
    width:auto!important;height:auto!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;
    background:radial-gradient(circle at 80% 0%,rgba(31,137,197,.18),transparent 34%),linear-gradient(180deg,#07141f 0%,#081018 58%,#050a0f 100%)!important;
    backdrop-filter:none!important;z-index:7000!important;overflow:auto!important;align-items:flex-start!important;justify-content:center!important;
  }
  body.turf-b4-game-open #footballGameOverlay[data-turf-b4-page="1"]:before{display:none!important}
  body.turf-b4-game-open #footballGameOverlay .football-game-shell{
    position:relative!important;inset:auto!important;transform:none!important;width:min(1180px,calc(100% - 38px))!important;max-width:1180px!important;
    min-height:calc(100vh - var(--turf-b4-top,64px) - 28px)!important;margin:18px auto 42px!important;padding:0 0 34px!important;
    border:1px solid rgba(120,198,238,.16)!important;border-radius:22px!important;overflow:hidden!important;
    background:linear-gradient(180deg,rgba(10,29,42,.98),rgba(6,15,23,.98))!important;box-shadow:0 24px 70px rgba(0,0,0,.38)!important;
  }
  body.turf-b4-game-open #footballGameOverlay .fg-head{height:52px!important;min-height:52px!important;padding:0 18px!important;display:flex!important;align-items:center!important;border-bottom:1px solid rgba(125,196,232,.12)!important;background:rgba(3,12,18,.75)!important}
  body.turf-b4-game-open #footballGameOverlay .fg-head .fg-kicker,body.turf-b4-game-open #footballGameOverlay .fg-head .fg-title,body.turf-b4-game-open #footballGameOverlay .fg-head .fg-sub{display:none!important}
  body.turf-b4-game-open #footballGameOverlay .fg-close{position:static!important;margin-left:auto!important;width:34px!important;height:34px!important;border-radius:10px!important;background:#122836!important;border:1px solid #2c5367!important;color:#dff5ff!important;font-size:22px!important;display:grid!important;place-items:center!important}
  .turf-b4-header{--b4-accent:#34b7ff;padding:28px 30px 22px!important;background:radial-gradient(circle at 88% 15%,color-mix(in srgb,var(--b4-accent) 24%,transparent),transparent 34%),linear-gradient(120deg,rgba(12,42,59,.98),rgba(8,20,30,.98));border-bottom:1px solid rgba(137,211,247,.14)}
  .turf-b4-hero-copy{max-width:760px}.turf-b4-eyebrow{display:inline-block;font:900 11px/1 system-ui;letter-spacing:.18em;color:var(--b4-accent);margin-bottom:10px}.turf-b4-hero-copy h1{margin:0!important;font:950 clamp(30px,4vw,52px)/.98 system-ui!important;letter-spacing:-.04em!important;color:#f3fbff!important}.turf-b4-hero-copy p{margin:12px 0 0!important;max-width:760px;color:#a7c5d5!important;font:600 15px/1.5 system-ui!important}
  .turf-b4-info-grid{display:grid;grid-template-columns:1.35fr .8fr .9fr;gap:10px;margin-top:22px}.turf-b4-info-grid>div{min-height:72px;padding:13px 14px;border-radius:14px;background:rgba(3,12,18,.48);border:1px solid rgba(129,201,235,.12)}.turf-b4-info-grid span{display:block;color:#6f98ab;font:850 10px/1.1 system-ui;letter-spacing:.12em;margin-bottom:7px}.turf-b4-info-grid strong{display:block;color:#e8f7ff;font:750 12px/1.35 system-ui}
  body.turf-b4-game-open #footballGameOverlay .fg-modes{display:flex!important;gap:7px!important;padding:14px 22px 10px!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;border:0!important;background:rgba(4,13,20,.72)!important;scrollbar-width:thin!important}
  body.turf-b4-game-open #footballGameOverlay .fg-mode{flex:0 0 auto!important;min-width:0!important;padding:9px 12px!important;border-radius:10px!important;border:1px solid rgba(124,190,222,.15)!important;background:#0d202c!important;color:#91adbc!important;font:850 10px/1 system-ui!important;letter-spacing:.04em!important}
  body.turf-b4-game-open #footballGameOverlay .fg-mode.active{background:#12374b!important;border-color:#3bb8ef!important;color:#effbff!important;box-shadow:inset 0 -2px 0 #3bb8ef!important}
  body.turf-b4-game-open #footballGameOverlay .fg-toolbar{display:flex!important;gap:8px!important;padding:10px 22px 16px!important;background:rgba(4,13,20,.72)!important;border-bottom:1px solid rgba(129,200,235,.12)!important}
  body.turf-b4-game-open #footballGameOverlay .fg-playtype{min-height:42px!important;padding:0 18px!important;border-radius:12px!important;border:1px solid #274a5c!important;background:#0c1d27!important;color:#8ca9b8!important;font-weight:900!important}
  body.turf-b4-game-open #footballGameOverlay .fg-playtype.active{background:linear-gradient(180deg,#1c80ae,#12698f)!important;border-color:#4bc7fb!important;color:white!important;box-shadow:0 8px 24px rgba(19,132,181,.2)!important}
  body.turf-b4-game-open #footballGameOverlay .fg-body{padding:24px 26px 32px!important;min-height:470px!important;background:transparent!important}
  body.turf-b4-game-open #footballGameOverlay .fg-special-wrap,body.turf-b4-game-open #footballGameOverlay .fg-grid-game,body.turf-b4-game-open #footballGameOverlay .fg-grid-wrap{max-width:1040px!important;margin-left:auto!important;margin-right:auto!important}
  body.turf-b4-game-open #footballGameOverlay .fg-result-overlay{z-index:9000!important}
  @media(max-width:900px){.turf-b4-info-grid{grid-template-columns:1fr}.turf-b4-header{padding:22px 18px 18px!important}body.turf-b4-game-open #footballGameOverlay .football-game-shell{width:calc(100% - 16px)!important;margin:8px auto 22px!important;border-radius:16px!important}body.turf-b4-game-open #footballGameOverlay .fg-body{padding:18px 14px 26px!important}}
  @media(max-width:680px){body.turf-b4-game-open #footballGameOverlay[data-turf-b4-page="1"]{left:0!important;top:var(--turf-b4-top,56px)!important}.turf-b4-hero-copy h1{font-size:34px!important}}
  `;document.head.appendChild(s)
}
function run(){installCss();decorateModes();updateOpenState()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[80,220,500,1000,1800,3200].forEach(function(ms){setTimeout(run,ms)});
window.addEventListener('resize',setFrameVars,{passive:true});
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('#footballGameLaunch,[data-fhq-nav="games"],#footballGameClose,.fg-mode,#fgDailyBtn,#fgUnlimitedBtn'))setTimeout(run,40)},true);
new MutationObserver(function(){clearTimeout(window.__turfB4Mut);window.__turfB4Mut=setTimeout(run,60)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
})();