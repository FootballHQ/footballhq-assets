/* TURF Batch 4 final UX pass.
   Game-overlay only. Does not modify Home, sidebar, topbar, branding or Collections. */
(function(){
'use strict';
if(window.__TURF_STATIC_BATCH4_FINAL__)return;
window.__TURF_STATIC_BATCH4_FINAL__=true;
var lastFocus=null;
var MODE_NAMES={players:'Current Players',legends:'Legends',grid:'Grid',whoami:'Who Am I?',career:'Career Path',higherlower:'Higher / Lower',imposter:'Imposter',connections:'Connections',statline:'Stat Line',draftclass:'Draft Class',moggle:'Mogger',timeline:'Timeline',guessteam:'Franchise Finder',depthchart:'Depth Chart'};
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function overlay(){return q('#footballGameOverlay')}
function open(){var o=overlay();if(!o)return false;var c=getComputedStyle(o);return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||(c.display!=='none'&&c.visibility!=='hidden'&&Number(c.opacity||1)>0)}
function mode(){var o=overlay(),b=q('.fg-mode.active[data-fg-mode]',o);return b&&b.dataset.fgMode||o&&o.getAttribute('data-turf-b4-mode')||'players'}
function name(){return MODE_NAMES[mode()]||'TURF Game'}
function ensureCss(){if(q('#turfBatch4FinalCss'))return;var s=document.createElement('style');s.id='turfBatch4FinalCss';s.textContent=`
body.turf-b4-game-open #footballGameOverlay .fg-head{gap:10px!important}
#turfBatch4Crumb{display:flex;align-items:center;gap:7px;min-width:0;color:#759aad;font:900 10px/1 system-ui;letter-spacing:.10em;text-transform:uppercase}
#turfBatch4Crumb strong{max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#dff5ff}
#turfBatch4Crumb i{font-style:normal;color:#31566a}
body.turf-b4-game-open #footballGameOverlay .fg-close:focus-visible,body.turf-b4-game-open #footballGameOverlay .fg-mode:focus-visible,body.turf-b4-game-open #footballGameOverlay .fg-playtype:focus-visible{outline:2px solid #63cdf7!important;outline-offset:2px!important}
#turfBatch4Live{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
@media(max-width:680px){#turfBatch4Crumb{font-size:9px}#turfBatch4Crumb strong{max-width:155px}}
`;document.head.appendChild(s)}
function ensureCrumb(){var o=overlay(),h=q('.fg-head',o);if(!h)return;var c=q('#turfBatch4Crumb',h);if(!c){c=document.createElement('div');c.id='turfBatch4Crumb';h.insertBefore(c,h.firstChild)}c.innerHTML='<span>TURF</span><i>/</i><span>GAMES</span><i>/</i><strong></strong>';q('strong',c).textContent=name();}
function ensureLive(){var o=overlay();if(!o)return null;var l=q('#turfBatch4Live',o);if(!l){l=document.createElement('div');l.id='turfBatch4Live';l.setAttribute('role','status');l.setAttribute('aria-live','polite');o.appendChild(l)}return l}
function syncTabs(){var o=overlay();if(!o)return;var d=q('#fgDailyBtn',o),u=q('#fgUnlimitedBtn',o);if(d)d.setAttribute('aria-pressed',d.classList.contains('active')?'true':'false');if(u)u.setAttribute('aria-pressed',u.classList.contains('active')?'true':'false');var a=q('.fg-mode.active[data-fg-mode]',o);if(a){qa('.fg-mode[data-fg-mode]',o).forEach(function(x){x.setAttribute('aria-pressed',x===a?'true':'false')});try{a.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'})}catch(e){}}
}
function syncClose(){var o=overlay(),b=q('.fg-close',o);if(!b)return;b.setAttribute('aria-label','Close '+name());b.title='Back to TURF Games';}
function announce(){var l=ensureLive();if(!l)return;var u=q('#fgUnlimitedBtn'),t=u&&u.classList.contains('active')?'Unlimited':'Daily Challenge';l.textContent=name()+'. '+t+'.';}
function onOpen(){ensureCss();ensureCrumb();syncTabs();syncClose();announce();var o=overlay();if(o){o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label',name());}}
function onClosed(){var o=overlay();if(o){o.removeAttribute('aria-modal');o.removeAttribute('aria-label')}if(lastFocus&&document.contains(lastFocus)){try{lastFocus.focus({preventScroll:true})}catch(e){}}lastFocus=null;}
function run(){ensureCss();if(open())onOpen();else onClosed()}
document.addEventListener('click',function(e){var launch=e.target&&e.target.closest?e.target.closest('[data-game-open],#footballGameLaunch,[data-fhq-nav="games"]'):null;if(launch&&!open())lastFocus=launch;var relevant=e.target&&e.target.closest?e.target.closest('#footballGameOverlay .fg-mode,#fgDailyBtn,#fgUnlimitedBtn,#footballGameClose,.fg-close,#fgResultClose,#fgResultAgain'):null;if(relevant){setTimeout(run,0);setTimeout(run,90);setTimeout(run,220)}},true);
document.addEventListener('keydown',function(e){if(e.key!=='Escape'||!open())return;var r=q('#fgResultOverlay');if(r&&(r.classList.contains('open')||r.getAttribute('aria-hidden')==='false')){var rc=q('#fgResultClose',r);if(rc){e.preventDefault();rc.click();return}}var c=q('#footballGameOverlay .fg-close,#footballGameClose');if(c){e.preventDefault();c.click()}},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[80,200,500,900,1600,2800,4800].forEach(function(ms){setTimeout(run,ms)});
if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,55)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','aria-pressed','style']})}
})();