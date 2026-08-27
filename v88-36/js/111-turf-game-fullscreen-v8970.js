/* ============================================================
   TURF V89.70 — FULL-SCREEN GAME DESTINATIONS
   Presentation only. Loaded only through the Worker-proxied existing TURF app.
   Keeps the native game engine/result flow and moves games to a true viewport,
   like Trials: no sidebar/topbar while playing, native result effects cover the
   whole game, and a clear Back to Games control returns to TURF.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_GAME_FULLSCREEN_8970__)return;
window.__TURF_GAME_FULLSCREEN_8970__=true;

var MODE_META={
  players:{name:'Current Players',accent:'#27c7ff',bg1:'#063958',bg2:'#04131f',glow:'rgba(39,199,255,.24)'},
  legends:{name:'Legends',accent:'#ffd45d',bg1:'#55390b',bg2:'#160f05',glow:'rgba(255,212,93,.24)'},
  grid:{name:'Grid',accent:'#45e2aa',bg1:'#0b4d39',bg2:'#061812',glow:'rgba(69,226,170,.23)'},
  whoami:{name:'Who Am I?',accent:'#ffc95a',bg1:'#593b0b',bg2:'#171006',glow:'rgba(255,201,90,.23)'},
  career:{name:'Career Path',accent:'#ff916c',bg1:'#5d2a1c',bg2:'#180b08',glow:'rgba(255,145,108,.22)'},
  higherlower:{name:'Higher / Lower',accent:'#4bdde5',bg1:'#124d54',bg2:'#071719',glow:'rgba(75,221,229,.22)'},
  imposter:{name:'Imposter',accent:'#ff729a',bg1:'#5e1a32',bg2:'#19090f',glow:'rgba(255,114,154,.22)'},
  connections:{name:'Connections',accent:'#9fdf65',bg1:'#31501b',bg2:'#0c1708',glow:'rgba(159,223,101,.22)'},
  statline:{name:'Stat Line',accent:'#67b1ff',bg1:'#183c66',bg2:'#081425',glow:'rgba(103,177,255,.22)'},
  draftclass:{name:'Draft Class',accent:'#f4bd56',bg1:'#5a3d12',bg2:'#191106',glow:'rgba(244,189,86,.22)'},
  moggle:{name:'Mogger',accent:'#df7dff',bg1:'#511e69',bg2:'#16081d',glow:'rgba(223,125,255,.22)'},
  timeline:{name:'Timeline',accent:'#82d1ff',bg1:'#194b66',bg2:'#071820',glow:'rgba(130,209,255,.22)'},
  guessteam:{name:'Franchise Finder',accent:'#ff826f',bg1:'#60241b',bg2:'#180a08',glow:'rgba(255,130,111,.22)'},
  depthchart:{name:'Depth Chart',accent:'#6cdaa4',bg1:'#1a513a',bg2:'#071711',glow:'rgba(108,218,164,.22)'}
};

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function gameOverlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function resultOverlay(){return q('#fgResultOverlay')||q('.fg-result-overlay')}
function visible(el){if(!el)return false;var c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0'&&el.getClientRects().length>0}
function gameOpen(){var o=gameOverlay();if(!o)return false;return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||visible(o)}
function resultOpen(){var r=resultOverlay();if(!r)return false;return r.getAttribute('aria-hidden')==='false'||r.classList.contains('open')||r.classList.contains('active')||visible(r)}
function mode(){
  var o=gameOverlay();
  var b=q('.fg-mode.active[data-fg-mode]',o);if(b&&b.dataset.fgMode)return b.dataset.fgMode;
  var t=text(q('#fgSpecialGame',o)||q('#fgGridGame',o)||o).toUpperCase();
  if(/CURRENT PLAYERS|ACTIVE PLAYERS|\bPLAYERS\b/.test(t))return 'players';
  if(/LEGENDS/.test(t))return 'legends';
  if(/WHO AM I/.test(t))return 'whoami';
  if(/CAREER PATH/.test(t))return 'career';
  if(/HIGHER\s*\/\s*LOWER/.test(t))return 'higherlower';
  if(/IMPOSTER/.test(t))return 'imposter';
  if(/CONNECTIONS/.test(t))return 'connections';
  if(/STAT LINE/.test(t))return 'statline';
  if(/DRAFT CLASS/.test(t))return 'draftclass';
  if(/MOGGER/.test(t))return 'moggle';
  if(/TIMELINE/.test(t))return 'timeline';
  if(/FRANCHISE FINDER|GUESS THE TEAM/.test(t))return 'guessteam';
  if(/DEPTH CHART/.test(t))return 'depthchart';
  if(/\bGRID\b/.test(t))return 'grid';
  return 'players';
}
function meta(){return MODE_META[mode()]||MODE_META.players}

function installCss(){
  if(q('#turfGameFullscreen8970Css'))return;
  var s=document.createElement('style');s.id='turfGameFullscreen8970Css';s.textContent=`
  body.turf-game-fullscreen-8970{overflow:hidden!important;background:#050a0f!important}
  body.turf-game-fullscreen-8970 #fhqSidebar,
  body.turf-game-fullscreen-8970 #turfTopbar,
  body.turf-game-fullscreen-8970 #fhqMobileTopbar,
  body.turf-game-fullscreen-8970 #fhqMobileScrim,
  body.turf-game-fullscreen-8970 #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
  body.turf-game-fullscreen-8970 #fhqMain,
  body.turf-game-fullscreen-8970 .fhq-main,
  body.turf-game-fullscreen-8970 .fhq-main-content,
  body.turf-game-fullscreen-8970 #fhqHome{margin:0!important;left:0!important;padding:0!important}

  body.turf-game-fullscreen-8970 #footballGameOverlay,
  body.turf-game-fullscreen-8970 .football-game-overlay,
  body.turf-game-fullscreen-8970 .fg-game-overlay{
    position:fixed!important;inset:0!important;left:0!important;right:0!important;top:0!important;bottom:0!important;
    width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;
    margin:0!important;padding:0!important;border:0!important;border-radius:0!important;
    z-index:2147481000!important;overflow:auto!important;align-items:flex-start!important;justify-content:stretch!important;
    background:
      radial-gradient(circle at 84% 4%,var(--turf-fs-glow),transparent 34%),
      radial-gradient(circle at 12% 0%,color-mix(in srgb,var(--turf-fs-accent) 15%,transparent),transparent 30%),
      linear-gradient(180deg,var(--turf-fs-bg1) 0%,var(--turf-fs-bg2) 36%,#050a0f 100%)!important;
  }
  body.turf-game-fullscreen-8970 #footballGameOverlay:before,
  body.turf-game-fullscreen-8970 .football-game-overlay:before,
  body.turf-game-fullscreen-8970 .fg-game-overlay:before{display:none!important}
  body.turf-game-fullscreen-8970 #footballGameOverlay .football-game-shell{
    position:relative!important;inset:auto!important;transform:none!important;width:100%!important;max-width:none!important;min-height:100vh!important;
    margin:0!important;padding:0 0 58px!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;background:transparent!important;
  }
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-head{
    position:sticky!important;top:0!important;z-index:40!important;display:flex!important;align-items:center!important;gap:12px!important;
    min-height:68px!important;height:auto!important;padding:0 26px!important;background:rgba(3,10,16,.78)!important;
    border-bottom:1px solid color-mix(in srgb,var(--turf-fs-accent) 42%,transparent)!important;backdrop-filter:blur(14px)!important;
  }
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-close{
    order:-10!important;position:static!important;margin:0!important;width:auto!important;min-width:132px!important;height:40px!important;padding:0 15px!important;
    display:inline-flex!important;align-items:center!important;justify-content:center!important;border-radius:11px!important;
    border:1px solid color-mix(in srgb,var(--turf-fs-accent) 54%,transparent)!important;
    background:color-mix(in srgb,var(--turf-fs-accent) 14%,#07131d)!important;color:#f5fbff!important;font-size:0!important;
    box-shadow:0 0 22px color-mix(in srgb,var(--turf-fs-accent) 10%,transparent)!important;
  }
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-close:after{content:'←  BACK TO GAMES';font:950 10px/1 system-ui;letter-spacing:.08em}
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-kicker{color:var(--turf-fs-accent)!important;letter-spacing:.16em!important}
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-title{color:#f7fbff!important;text-shadow:0 0 18px var(--turf-fs-glow)!important}
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-modes{padding:14px 26px 10px!important;background:rgba(3,10,16,.46)!important;overflow-x:auto!important;white-space:nowrap!important}
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-toolbar{padding:10px 26px 16px!important;background:rgba(3,10,16,.46)!important;border-bottom:1px solid color-mix(in srgb,var(--turf-fs-accent) 22%,transparent)!important}
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-mode.active,
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-playtype.active{border-color:var(--turf-fs-accent)!important;box-shadow:0 0 20px var(--turf-fs-glow)!important}
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-body{width:min(1180px,calc(100% - 48px))!important;max-width:1180px!important;margin:0 auto!important;padding:30px 0 68px!important;background:transparent!important}
  body.turf-game-fullscreen-8970 #footballGameOverlay #fgSpecialGame,
  body.turf-game-fullscreen-8970 #footballGameOverlay #fgGridGame,
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-special-game,
  body.turf-game-fullscreen-8970 #footballGameOverlay .fg-grid-game{
    border-color:color-mix(in srgb,var(--turf-fs-accent) 35%,transparent)!important;
    box-shadow:0 24px 70px rgba(0,0,0,.34),0 0 34px color-mix(in srgb,var(--turf-fs-accent) 7%,transparent)!important;
  }

  body.turf-game-fullscreen-8970 #fgResultOverlay,
  body.turf-game-fullscreen-8970 .fg-result-overlay{
    position:fixed!important;inset:0!important;left:0!important;right:0!important;top:0!important;bottom:0!important;
    width:100vw!important;height:100vh!important;z-index:2147483200!important;padding:24px!important;box-sizing:border-box!important;
    align-items:center!important;justify-content:center!important;background:rgba(2,7,11,.82)!important;backdrop-filter:blur(10px)!important;
  }
  body.turf-game-fullscreen-8970 #fgResultOverlay.open,
  body.turf-game-fullscreen-8970 #fgResultOverlay[aria-hidden="false"],
  body.turf-game-fullscreen-8970 .fg-result-overlay.open{display:flex!important}
  body.turf-game-fullscreen-8970 #fgResultOverlay .fg-result-card{
    width:min(760px,calc(100vw - 48px))!important;max-width:760px!important;max-height:calc(100vh - 48px)!important;overflow:auto!important;
    border-radius:24px!important;border:1px solid color-mix(in srgb,var(--turf-fs-accent) 38%,transparent)!important;
    background:radial-gradient(circle at 86% 0%,var(--turf-fs-glow),transparent 34%),linear-gradient(180deg,#0d2230,#07131b)!important;
    box-shadow:0 32px 100px rgba(0,0,0,.62),0 0 45px color-mix(in srgb,var(--turf-fs-accent) 8%,transparent)!important;
  }
  #turfResultBack8970{width:100%;min-height:44px;margin-top:12px;border-radius:11px;border:1px solid color-mix(in srgb,var(--turf-fs-accent) 45%,transparent);background:color-mix(in srgb,var(--turf-fs-accent) 12%,#091722);color:#f4fbff;font:950 11px/1 system-ui;letter-spacing:.08em;cursor:pointer}

  body.turf-game-fullscreen-8970 #fgConfettiCanvas{
    position:fixed!important;inset:0!important;left:0!important;top:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;
    z-index:2147483000!important;pointer-events:none!important;transform:none!important;
  }
  body.turf-game-fullscreen-8970 #fgDamageFlash,
  body.turf-game-fullscreen-8970 .fg-damage-flash{
    position:fixed!important;inset:0!important;left:0!important;right:0!important;top:0!important;bottom:0!important;width:100vw!important;height:100vh!important;
    z-index:2147483050!important;pointer-events:none!important;margin:0!important;transform:none!important;
  }
  body.turf-game-fullscreen-8970 #fgFeedbackPop,
  body.turf-game-fullscreen-8970 .fg-feedback-pop{position:fixed!important;z-index:2147483100!important;pointer-events:none!important}
  body.turf-game-fullscreen-8970 [class*="skull"],
  body.turf-game-fullscreen-8970 [id*="skull"],
  body.turf-game-fullscreen-8970 [class*="confetti"]{z-index:2147483060!important;pointer-events:none!important}

  @media(max-width:720px){
    body.turf-game-fullscreen-8970 #footballGameOverlay .fg-head{padding:0 12px!important;min-height:58px!important}
    body.turf-game-fullscreen-8970 #footballGameOverlay .fg-close{min-width:116px!important;height:36px!important;padding:0 10px!important}
    body.turf-game-fullscreen-8970 #footballGameOverlay .fg-modes{padding-left:12px!important;padding-right:12px!important}
    body.turf-game-fullscreen-8970 #footballGameOverlay .fg-toolbar{padding-left:12px!important;padding-right:12px!important}
    body.turf-game-fullscreen-8970 #footballGameOverlay .fg-body{width:calc(100% - 24px)!important;padding-top:18px!important}
    body.turf-game-fullscreen-8970 #fgResultOverlay{padding:12px!important}
    body.turf-game-fullscreen-8970 #fgResultOverlay .fg-result-card{width:100%!important;max-height:calc(100vh - 24px)!important}
  }
  `;(document.head||document.documentElement).appendChild(s);
}

function setTheme(){
  var o=gameOverlay();if(!o)return;var m=meta();
  document.documentElement.style.setProperty('--turf-fs-accent',m.accent);
  document.documentElement.style.setProperty('--turf-fs-bg1',m.bg1);
  document.documentElement.style.setProperty('--turf-fs-bg2',m.bg2);
  document.documentElement.style.setProperty('--turf-fs-glow',m.glow);
  o.setAttribute('data-turf-fullscreen-mode',mode());
}
function resizeEffects(){
  if(!gameOpen())return;
  var c=q('#fgConfettiCanvas');if(c){
    var dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    var w=Math.max(1,Math.round(window.innerWidth*dpr)),h=Math.max(1,Math.round(window.innerHeight*dpr));
    if(c.width!==w)c.width=w;if(c.height!==h)c.height=h;
    c.style.width='100vw';c.style.height='100vh';
  }
}
function ensureResultBack(){
  var r=resultOverlay();if(!r||!resultOpen())return;
  var card=q('.fg-result-card',r)||r;
  if(q('#turfResultBack8970',card))return;
  var b=document.createElement('button');b.id='turfResultBack8970';b.type='button';b.textContent='← BACK TO GAMES';
  b.addEventListener('click',function(){
    var rc=q('#fgResultClose',r);if(rc)try{rc.click()}catch(e){}
    setTimeout(function(){var gc=q('#footballGameClose')||q('#footballGameOverlay .fg-close');if(gc)try{gc.click()}catch(e){}},40);
  });
  card.appendChild(b);
}
function sync(){
  installCss();
  var open=gameOpen();document.body.classList.toggle('turf-game-fullscreen-8970',open);
  if(open){setTheme();resizeEffects();ensureResultBack();}
  else{
    document.documentElement.style.removeProperty('--turf-fs-accent');
    document.documentElement.style.removeProperty('--turf-fs-bg1');
    document.documentElement.style.removeProperty('--turf-fs-bg2');
    document.documentElement.style.removeProperty('--turf-fs-glow');
  }
}

document.addEventListener('keydown',function(e){
  if(e.key!=='Escape'||!gameOpen())return;
  if(resultOpen()){var r=q('#fgResultClose');if(r){e.preventDefault();r.click();return}}
  var c=q('#footballGameClose')||q('#footballGameOverlay .fg-close');if(c){e.preventDefault();c.click()}
},true);
window.addEventListener('resize',function(){if(gameOpen())resizeEffects()});
document.addEventListener('click',function(e){
  if(e.target&&e.target.closest&&e.target.closest('#footballGameLaunch,[data-game-open],[data-fhq-nav="games"],#footballGameClose,#fgResultClose,#fgResultAgain,.fg-mode,#fgDailyBtn,#fgUnlimitedBtn')){
    [0,40,120,260].forEach(function(ms){setTimeout(sync,ms)});
  }
},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
[80,180,400,800,1500,2600,5000].forEach(function(ms){setTimeout(sync,ms)});
if(window.MutationObserver){var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(sync,35)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']})}
})();
