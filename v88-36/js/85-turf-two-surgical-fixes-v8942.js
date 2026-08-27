/* ============================================================
   TURF V89.42 — SURGICAL GAME FIXES (WORKER-AUTH SAFE)
   - Remove Higher/Lower PLAY control after late renders
   - Remove Who Am I Give Up + duplicate reveal buttons
   - Release only stale post-auth interaction locks
   - No sign-in flow changes
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8942_SURGICAL_SAFE__)return;
window.__TURF_V8942_SURGICAL_SAFE__=true;

function qa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;var s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'&&el.getClientRects().length>0}
function visibleGameHost(){
  var candidates=qa('#fgSpecialGame,#fgGridGame,#footballGameOverlay,.fg-game-overlay,.fg-special-overlay,[role="dialog"]');
  var hit=candidates.find(function(el){if(!visible(el))return false;var t=text(el).toUpperCase();return /WHO AM I\?|HIGHER\s*\/\s*LOWER/.test(t)});
  return hit||document.body;
}
function currentMode(root){var t=text(root).toUpperCase();if(/WHO AM I\?/.test(t))return 'whoami';if(/HIGHER\s*\/\s*LOWER/.test(t))return 'higherlower';return ''}
function fixHigherLower(root){qa('button,[role="button"]',root).forEach(function(btn){var t=text(btn).replace(/✓/g,'').trim().toUpperCase();if(t==='PLAY'){btn.style.setProperty('display','none','important');btn.style.setProperty('visibility','hidden','important');btn.style.setProperty('pointer-events','none','important');btn.setAttribute('aria-hidden','true');btn.disabled=true;if(btn.parentNode)btn.parentNode.removeChild(btn)}})}
function fixWhoAmI(root){
  qa('button,[role="button"]',root).forEach(function(btn){if(/^GIVE UP$/i.test(text(btn))&&btn.parentNode)btn.parentNode.removeChild(btn)});
  var reveals=qa('button,[role="button"]',root).filter(function(btn){return /REVEAL NEXT HINT/i.test(text(btn))});reveals.slice(1).forEach(function(btn){if(btn.parentNode)btn.parentNode.removeChild(btn)})
}
function releaseAuthShell(){
  try{window.__fhqIdentityResolving=false}catch(e){}
  [document.documentElement,document.body].forEach(function(el){
    if(!el)return;
    ['turf-auth-locked','fhq-identity-recovering','account-loading','recovering','fhq-loading','is-loading'].forEach(function(c){el.classList.remove(c)});
    try{
      el.removeAttribute('inert');
      el.style.removeProperty('pointer-events');
      el.style.removeProperty('overflow');
      el.style.removeProperty('filter');
      el.style.removeProperty('opacity');
    }catch(e){}
  });
  ['fhqSidebar','fhqMain','fhqHome','turfTopbar'].forEach(function(id){var el=document.getElementById(id);if(el)try{el.removeAttribute('inert');el.style.removeProperty('pointer-events')}catch(e){}});
  ['turfAuthGate','turfGoogleButton'].forEach(function(id){var el=document.getElementById(id);if(el){try{el.classList.add('turf-auth-hidden');el.setAttribute('aria-hidden','true');el.style.setProperty('display','none','important');el.style.setProperty('visibility','hidden','important');el.style.setProperty('opacity','0','important');el.style.setProperty('pointer-events','none','important')}catch(e){}}});
}
function enforce(){releaseAuthShell();var root=visibleGameHost(),m=currentMode(root);if(m==='higherlower')fixHigherLower(root);if(m==='whoami')fixWhoAmI(root)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enforce,{once:true});else enforce();
window.addEventListener('turf:auth-ready',function(){releaseAuthShell();[80,220,600,1400].forEach(function(ms){setTimeout(releaseAuthShell,ms)})});
[100,350,900,1800,3200,5200].forEach(function(ms){setTimeout(releaseAuthShell,ms)});
if(window.MutationObserver){
  var pending=0;new MutationObserver(function(muts){var relevant=muts.some(function(m){return m.addedNodes&&m.addedNodes.length});if(!relevant)return;clearTimeout(pending);pending=setTimeout(enforce,60)}).observe(document.body||document.documentElement,{childList:true,subtree:true})
}
})();

/* ============================================================
   BATCH 4 — REAL TURF GAME DESTINATIONS
   Presentation only. Runs inside the existing .com app.
   Keeps the exact current TURF shell/topbar/sidebar and turns the
   existing game overlay into a full-page destination beneath them.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_REAL_BATCH4_DESTINATIONS__)return;
window.__TURF_REAL_BATCH4_DESTINATIONS__=true;

var THEMES={
  players:{name:'Current Players',accent:'#28c5ff',hero:'#073a5b',bg:'#04111d',glow:'rgba(40,197,255,.24)'},
  legends:{name:'Legends',accent:'#ffd35c',hero:'#53370b',bg:'#151006',glow:'rgba(255,211,92,.23)'},
  grid:{name:'Grid',accent:'#3ee6a8',hero:'#0c4b38',bg:'#061812',glow:'rgba(62,230,168,.22)'},
  whoami:{name:'Who Am I?',accent:'#ffc95b',hero:'#5b3d0c',bg:'#171006',glow:'rgba(255,201,91,.22)'},
  career:{name:'Career Path',accent:'#ff8d68',hero:'#5b281b',bg:'#180b08',glow:'rgba(255,141,104,.22)'},
  higherlower:{name:'Higher / Lower',accent:'#49dde3',hero:'#124e55',bg:'#071719',glow:'rgba(73,221,227,.22)'},
  imposter:{name:'Imposter',accent:'#ff6e96',hero:'#5e1931',bg:'#19090f',glow:'rgba(255,110,150,.22)'},
  connections:{name:'Connections',accent:'#9edd63',hero:'#304f1a',bg:'#0c1708',glow:'rgba(158,221,99,.22)'},
  statline:{name:'Stat Line',accent:'#67adff',hero:'#173a62',bg:'#081425',glow:'rgba(103,173,255,.22)'},
  draftclass:{name:'Draft Class',accent:'#f4bd56',hero:'#5a3d12',bg:'#191106',glow:'rgba(244,189,86,.22)'},
  moggle:{name:'Mogger',accent:'#df7bff',hero:'#511d69',bg:'#16081d',glow:'rgba(223,123,255,.22)'},
  timeline:{name:'Timeline',accent:'#80ceff',hero:'#194a65',bg:'#071820',glow:'rgba(128,206,255,.22)'},
  guessteam:{name:'Franchise Finder',accent:'#ff806e',hero:'#60231b',bg:'#180a08',glow:'rgba(255,128,110,.22)'},
  depthchart:{name:'Depth Chart',accent:'#6cdaa4',hero:'#1a503a',bg:'#071711',glow:'rgba(108,218,164,.22)'}
};
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.fg-game-overlay')}
function isOpen(){var o=overlay();if(!o)return false;var c=getComputedStyle(o);return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||(c.display!=='none'&&c.visibility!=='hidden'&&Number(c.opacity||1)>0)}
function topbarHeight(){var b=q('#turfTopbar');if(!b)return 70;var r=b.getBoundingClientRect();return Math.max(58,Math.round(r.height||70))}
function sidebarRight(){var s=q('#fhqSidebar');if(!s)return 0;var c=getComputedStyle(s);if(c.display==='none'||c.visibility==='hidden'||c.transform.indexOf('matrix')===0&&s.getBoundingClientRect().right<40)return 0;var r=s.getBoundingClientRect();return Math.max(0,Math.round(r.right))}
function mode(){
  var o=overlay(),b=q('.fg-mode.active[data-fg-mode]',o);if(b&&b.dataset.fgMode)return b.dataset.fgMode;
  var t=tx(q('#fgSpecialGame',o)||q('#fgGridGame',o)||o).toUpperCase();
  if(/CURRENT PLAYERS|ACTIVE PLAYERS|PLAYERS/.test(t))return 'players';
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
  if(/GRID/.test(t))return 'grid';
  return 'players';
}
function addCss(){if(q('#turfRealBatch4Css'))return;var s=document.createElement('style');s.id='turfRealBatch4Css';s.textContent=`
body.turf-real-game-page{overflow:hidden!important}
body.turf-real-game-page #footballGameOverlay,
body.turf-real-game-page .fg-game-overlay{
  position:fixed!important;
  left:var(--turf-real-side,282px)!important;
  right:0!important;
  top:var(--turf-real-top,70px)!important;
  bottom:0!important;
  width:auto!important;height:auto!important;max-width:none!important;
  margin:0!important;padding:0!important;border:0!important;border-radius:0!important;
  z-index:2147480000!important;
  overflow:auto!important;
  background:
    radial-gradient(circle at 82% 4%,var(--turf-game-glow,rgba(40,197,255,.24)),transparent 32%),
    linear-gradient(180deg,var(--turf-game-hero,#073a5b) 0%,var(--turf-game-bg,#04111d) 32%,#050a0f 100%)!important;
  align-items:flex-start!important;justify-content:stretch!important;
}
body.turf-real-game-page #footballGameOverlay:before,body.turf-real-game-page .fg-game-overlay:before{display:none!important}
body.turf-real-game-page #footballGameOverlay .football-game-shell{
  width:100%!important;max-width:none!important;min-height:100%!important;margin:0!important;
  padding:0 0 56px!important;border:0!important;border-radius:0!important;box-shadow:none!important;
  background:transparent!important;overflow:visible!important;transform:none!important;position:relative!important;inset:auto!important;
}
body.turf-real-game-page #footballGameOverlay .fg-head{
  min-height:62px!important;height:auto!important;padding:0 34px!important;display:flex!important;align-items:center!important;
  background:rgba(3,10,16,.62)!important;border-bottom:1px solid color-mix(in srgb,var(--turf-game-accent,#28c5ff) 34%,transparent)!important;
  backdrop-filter:blur(12px)!important;
}
body.turf-real-game-page #footballGameOverlay .fg-close{
  margin-left:auto!important;position:static!important;width:auto!important;min-width:98px!important;height:38px!important;padding:0 14px!important;
  border-radius:11px!important;border:1px solid color-mix(in srgb,var(--turf-game-accent,#28c5ff) 50%,transparent)!important;
  background:color-mix(in srgb,var(--turf-game-accent,#28c5ff) 14%,#07131d)!important;color:#f5fbff!important;font-size:0!important;
  box-shadow:0 0 22px color-mix(in srgb,var(--turf-game-accent,#28c5ff) 10%,transparent)!important;
}
body.turf-real-game-page #footballGameOverlay .fg-close:after{content:'← GAMES';font:950 11px/1 system-ui;letter-spacing:.08em}
body.turf-real-game-page #footballGameOverlay .fg-head .fg-kicker{color:var(--turf-game-accent,#28c5ff)!important;letter-spacing:.18em!important}
body.turf-real-game-page #footballGameOverlay .fg-head .fg-title{color:#f7fbff!important;text-shadow:0 0 18px var(--turf-game-glow)!important}
body.turf-real-game-page #footballGameOverlay .fg-modes{display:flex!important;gap:8px!important;padding:15px 30px 10px!important;background:rgba(3,10,16,.58)!important;overflow-x:auto!important;border:0!important}
body.turf-real-game-page #footballGameOverlay .fg-mode{flex:0 0 auto!important;border-radius:10px!important;border:1px solid rgba(130,190,218,.16)!important;background:#0c202d!important;color:#91adbc!important;padding:10px 13px!important}
body.turf-real-game-page #footballGameOverlay .fg-mode.active{background:color-mix(in srgb,var(--turf-game-accent,#28c5ff) 22%,#0b1d27)!important;border-color:var(--turf-game-accent,#28c5ff)!important;color:#fff!important;box-shadow:inset 0 -2px 0 var(--turf-game-accent,#28c5ff),0 0 20px var(--turf-game-glow)!important}
body.turf-real-game-page #footballGameOverlay .fg-toolbar{display:flex!important;gap:8px!important;padding:10px 30px 18px!important;background:rgba(3,10,16,.58)!important;border-bottom:1px solid color-mix(in srgb,var(--turf-game-accent,#28c5ff) 22%,transparent)!important}
body.turf-real-game-page #footballGameOverlay .fg-playtype{min-height:42px!important;border-radius:11px!important;background:#0b1d27!important;border:1px solid #294b5d!important;color:#9ab3c0!important}
body.turf-real-game-page #footballGameOverlay .fg-playtype.active{background:linear-gradient(180deg,color-mix(in srgb,var(--turf-game-accent,#28c5ff) 78%,white 4%),color-mix(in srgb,var(--turf-game-accent,#28c5ff) 58%,#072238))!important;border-color:var(--turf-game-accent,#28c5ff)!important;color:white!important;box-shadow:0 8px 24px var(--turf-game-glow)!important}
body.turf-real-game-page #footballGameOverlay .fg-body{width:min(1180px,calc(100% - 54px))!important;max-width:1180px!important;margin:0 auto!important;padding:34px 0 60px!important;min-height:520px!important;background:transparent!important}
body.turf-real-game-page #footballGameOverlay .fg-special-game,
body.turf-real-game-page #footballGameOverlay .fg-grid-game{
  border:1px solid color-mix(in srgb,var(--turf-game-accent,#28c5ff) 30%,transparent)!important;border-radius:22px!important;padding:30px!important;
  background:
    radial-gradient(circle at 90% 8%,var(--turf-game-glow),transparent 30%),
    linear-gradient(145deg,color-mix(in srgb,var(--turf-game-hero,#073a5b) 78%,#07131d),rgba(5,12,18,.97))!important;
  box-shadow:0 28px 72px rgba(0,0,0,.32),inset 0 1px rgba(255,255,255,.025)!important;
}
body.turf-real-game-page #footballGameOverlay .fg-special-title,
body.turf-real-game-page #footballGameOverlay .fg-game-title{color:#fff!important;text-shadow:0 0 22px var(--turf-game-glow)!important;font-weight:1000!important;letter-spacing:-.02em!important}
body.turf-real-game-page #footballGameOverlay input,
body.turf-real-game-page #footballGameOverlay select{border-color:color-mix(in srgb,var(--turf-game-accent,#28c5ff) 28%,#274252)!important;background:#0a1822!important}
body.turf-real-game-page #footballGameOverlay button:not(.fg-close):not(.fg-mode):not(.fg-playtype){border-radius:11px!important}
body.turf-real-game-page #footballGameOverlay .fg-guess-btn,
body.turf-real-game-page #footballGameOverlay button[id*='Guess'],
body.turf-real-game-page #footballGameOverlay button[id*='Submit']{background:linear-gradient(180deg,var(--turf-game-accent,#28c5ff),color-mix(in srgb,var(--turf-game-accent,#28c5ff) 68%,#07131d))!important;border-color:var(--turf-game-accent,#28c5ff)!important;color:#071018!important;font-weight:950!important;box-shadow:0 10px 28px var(--turf-game-glow)!important}
body.turf-real-game-page #footballGameOverlay .fg-result-card{border-color:color-mix(in srgb,var(--turf-game-accent,#28c5ff) 36%,transparent)!important;background:linear-gradient(150deg,color-mix(in srgb,var(--turf-game-hero,#073a5b) 74%,#07131d),#071018)!important;box-shadow:0 30px 80px rgba(0,0,0,.42),0 0 32px var(--turf-game-glow)!important}
@media(max-width:800px){body.turf-real-game-page #footballGameOverlay,body.turf-real-game-page .fg-game-overlay{left:0!important;top:var(--turf-real-top,58px)!important}body.turf-real-game-page #footballGameOverlay .fg-head{padding:0 14px!important}body.turf-real-game-page #footballGameOverlay .fg-modes,body.turf-real-game-page #footballGameOverlay .fg-toolbar{padding-left:14px!important;padding-right:14px!important}body.turf-real-game-page #footballGameOverlay .fg-body{width:calc(100% - 24px)!important;padding-top:20px!important}body.turf-real-game-page #footballGameOverlay .fg-special-game,body.turf-real-game-page #footballGameOverlay .fg-grid-game{padding:18px!important}}
`;document.head.appendChild(s)}
function applyTheme(){
  addCss();var o=overlay(),open=isOpen();document.body.classList.toggle('turf-real-game-page',open);if(!open)return;
  var m=mode(),t=THEMES[m]||THEMES.players;
  document.documentElement.style.setProperty('--turf-real-top',topbarHeight()+'px');
  document.documentElement.style.setProperty('--turf-real-side',sidebarRight()+'px');
  o.style.setProperty('--turf-game-accent',t.accent);o.style.setProperty('--turf-game-hero',t.hero);o.style.setProperty('--turf-game-bg',t.bg);o.style.setProperty('--turf-game-glow',t.glow);o.setAttribute('data-turf-real-mode',m);
  var close=q('.fg-close',o);if(close){close.setAttribute('aria-label','Back to Games');close.title='Back to Games'}
}
function schedule(){[0,60,180,450].forEach(function(ms){setTimeout(applyTheme,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyTheme,{once:true});else applyTheme();
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('#footballGameOverlay,.fg-game-overlay,[data-game-open],#footballGameLaunch'))schedule()},true);
window.addEventListener('resize',applyTheme);
if(window.MutationObserver){var z;new MutationObserver(function(m){var r=m.some(function(x){return x.type==='childList'||x.attributeName==='class'||x.attributeName==='aria-hidden'||x.attributeName==='style'});if(!r)return;clearTimeout(z);z=setTimeout(applyTheme,50)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','style']})}
})();
