/* TURF Batch 4 destination treatment.
   Keeps global TURF chrome visible and turns each game into its own full-page destination.
   Presentation only: game logic remains in the preserved engine. */
(function(){
'use strict';
if(window.__TURF_BATCH4_DESTINATIONS__)return;
window.__TURF_BATCH4_DESTINATIONS__=true;
var THEMES={
 players:['#18b9ff','#07314c','#05131f'],legends:['#e0b44f','#4a3210','#120f0a'],grid:['#30d89b','#0d4937','#071813'],whoami:['#ffc857','#5b3a0b','#1a1207'],career:['#ff8a65','#5a2619','#190c08'],higherlower:['#41d7df','#114750','#07171a'],imposter:['#ff668e','#5a1730','#1a0910'],connections:['#9bd85a','#2d4d18','#0d1708'],statline:['#5aa7ff','#15365d','#091426'],draftclass:['#f2b84f','#563b12','#1b1207'],moggle:['#da73ff','#4e1a64','#17081d'],timeline:['#79c9ff','#17455f','#081820'],guessteam:['#ff7d6a','#5c2019','#190a08'],depthchart:['#62d39d','#174a36','#081711']
};
var NAMES={players:'Current Players',legends:'Legends',grid:'Grid',whoami:'Who Am I?',career:'Career Path',higherlower:'Higher / Lower',imposter:'Imposter',connections:'Connections',statline:'Stat Line',draftclass:'Draft Class',moggle:'Mogger',timeline:'Timeline',guessteam:'Franchise Finder',depthchart:'Depth Chart'};
function q(s,r){return (r||document).querySelector(s)}function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function mode(){var o=q('#footballGameOverlay'),b=q('.fg-mode.active[data-fg-mode]',o);return b&&b.dataset.fgMode||o&&o.getAttribute('data-turf-b4-mode')||'players'}
function open(){var o=q('#footballGameOverlay');if(!o)return false;var c=getComputedStyle(o);return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||(c.display!=='none'&&c.visibility!=='hidden'&&Number(c.opacity||1)>0)}
function css(){if(q('#turfBatch4DestinationCss'))return;var s=document.createElement('style');s.id='turfBatch4DestinationCss';s.textContent=`
body.turf-b4-game-open #footballGameOverlay[data-turf-b4-page="1"]{background:linear-gradient(180deg,var(--b4-bg1,#07141f),var(--b4-bg2,#050a0f))!important}
body.turf-b4-game-open #footballGameOverlay .football-game-shell{width:100%!important;max-width:none!important;min-height:calc(100vh - var(--turf-b4-top,64px))!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:radial-gradient(circle at 78% 8%,color-mix(in srgb,var(--b4-accent,#34b7ff) 20%,transparent),transparent 34%),linear-gradient(180deg,var(--b4-panel,#0b2030),rgba(5,13,20,.98))!important}
body.turf-b4-game-open #footballGameOverlay .fg-head{height:58px!important;padding:0 30px!important;background:rgba(3,10,16,.7)!important;border-bottom:1px solid color-mix(in srgb,var(--b4-accent,#34b7ff) 30%,transparent)!important}
body.turf-b4-game-open #footballGameOverlay .fg-close{width:auto!important;min-width:92px!important;height:36px!important;padding:0 14px!important;border-radius:10px!important;background:color-mix(in srgb,var(--b4-accent,#34b7ff) 14%,#08131c)!important;border:1px solid color-mix(in srgb,var(--b4-accent,#34b7ff) 45%,transparent)!important;color:#effbff!important;font-size:0!important;font-weight:950!important;letter-spacing:.08em!important}
body.turf-b4-game-open #footballGameOverlay .fg-close:after{content:'← GAMES';font-size:10px!important}
body.turf-b4-game-open #footballGameOverlay .turf-b4-header{padding:34px 38px 26px!important;background:radial-gradient(circle at 86% 18%,color-mix(in srgb,var(--b4-accent,#34b7ff) 32%,transparent),transparent 34%),linear-gradient(120deg,var(--b4-hero,#0d3348),#07131d)!important;border-bottom:1px solid color-mix(in srgb,var(--b4-accent,#34b7ff) 30%,transparent)!important}
body.turf-b4-game-open #footballGameOverlay .turf-b4-eyebrow{color:var(--b4-accent,#34b7ff)!important}
body.turf-b4-game-open #footballGameOverlay .fg-modes{padding:14px 30px 10px!important;background:rgba(3,10,16,.72)!important}
body.turf-b4-game-open #footballGameOverlay .fg-mode.active{background:color-mix(in srgb,var(--b4-accent,#34b7ff) 22%,#0a1d28)!important;border-color:var(--b4-accent,#34b7ff)!important;box-shadow:inset 0 -2px 0 var(--b4-accent,#34b7ff),0 0 18px color-mix(in srgb,var(--b4-accent,#34b7ff) 16%,transparent)!important}
body.turf-b4-game-open #footballGameOverlay .fg-toolbar{padding:10px 30px 16px!important;background:rgba(3,10,16,.72)!important}
body.turf-b4-game-open #footballGameOverlay .fg-playtype.active{background:linear-gradient(180deg,color-mix(in srgb,var(--b4-accent,#34b7ff) 78%,white 4%),color-mix(in srgb,var(--b4-accent,#34b7ff) 58%,#082238))!important;border-color:var(--b4-accent,#34b7ff)!important}
body.turf-b4-game-open #footballGameOverlay .fg-body{max-width:1180px!important;width:calc(100% - 56px)!important;margin:0 auto!important;padding:30px 0 54px!important;min-height:520px!important}
body.turf-b4-game-open #footballGameOverlay .fg-special-game,body.turf-b4-game-open #footballGameOverlay .fg-grid-game{border:1px solid color-mix(in srgb,var(--b4-accent,#34b7ff) 22%,transparent)!important;border-radius:20px!important;background:linear-gradient(160deg,color-mix(in srgb,var(--b4-panel,#0b2030) 88%,black),rgba(5,12,18,.97))!important;box-shadow:0 22px 60px rgba(0,0,0,.28)!important;padding:28px!important}
body.turf-b4-game-open #footballGameOverlay .fg-special-title,body.turf-b4-game-open #footballGameOverlay .fg-game-title{color:#f6fbff!important;text-shadow:0 0 18px color-mix(in srgb,var(--b4-accent,#34b7ff) 20%,transparent)!important}
body.turf-b4-game-open #footballGameOverlay button:not(.fg-close):not(.fg-mode):not(.fg-playtype){border-radius:10px!important}
@media(max-width:680px){body.turf-b4-game-open #footballGameOverlay .fg-head{padding:0 14px!important}body.turf-b4-game-open #footballGameOverlay .turf-b4-header{padding:25px 18px 20px!important}body.turf-b4-game-open #footballGameOverlay .fg-modes,body.turf-b4-game-open #footballGameOverlay .fg-toolbar{padding-left:14px!important;padding-right:14px!important}body.turf-b4-game-open #footballGameOverlay .fg-body{width:calc(100% - 24px)!important;padding-top:18px!important}}
`;document.head.appendChild(s)}
function apply(){css();if(!open())return;var m=mode(),t=THEMES[m]||THEMES.players,o=q('#footballGameOverlay');if(!o)return;o.style.setProperty('--b4-accent',t[0]);o.style.setProperty('--b4-hero',t[1]);o.style.setProperty('--b4-panel',t[1]);o.style.setProperty('--b4-bg1',t[1]);o.style.setProperty('--b4-bg2',t[2]);o.setAttribute('data-turf-b4-theme',m);var c=q('#turfBatch4Crumb strong',o);if(c)c.textContent=NAMES[m]||'TURF Game'}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('#footballGameOverlay .fg-mode,#fgDailyBtn,#fgUnlimitedBtn,[data-game-open],#footballGameLaunch')){setTimeout(apply,0);setTimeout(apply,100);setTimeout(apply,260)}},true);
[100,300,700,1400,2600,5000].forEach(function(ms){setTimeout(apply,ms)});if(window.MutationObserver){var z;new MutationObserver(function(){clearTimeout(z);z=setTimeout(apply,60)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','style']})}
})();
