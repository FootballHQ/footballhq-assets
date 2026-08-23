/* TURF static migration — Batch 4 completion layer
   Keeps the full-page game framework synchronized with the preserved engine.
   Safe: static migration only; does not touch the production root.
*/
(function(){
'use strict';
if(window.__TURF_STATIC_BATCH4_GAME_STATE__)return;
window.__TURF_STATIC_BATCH4_GAME_STATE__=true;

var MODE_LABELS={
 players:'Current Players',legends:'Legends',grid:'Grid',whoami:'Who Am I?',career:'Career Path',higherlower:'Higher / Lower',
 imposter:'Imposter',connections:'Connections',statline:'Stat Line',draftclass:'Draft Class',moggle:'Mogger',timeline:'Timeline',
 guessteam:'Franchise Finder',depthchart:'Depth Chart'
};
function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function openGame(){var o=qs('#footballGameOverlay');if(!o)return false;var cs=getComputedStyle(o);return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||(cs.display!=='none'&&cs.visibility!=='hidden'&&Number(cs.opacity||1)>0)}
function mode(){var b=qs('#footballGameOverlay .fg-mode.active[data-fg-mode]');return b&&b.dataset.fgMode||qs('#footballGameOverlay')?.getAttribute('data-turf-b4-mode')||'players'}
function playType(){var u=qs('#fgUnlimitedBtn'),d=qs('#fgDailyBtn');return u&&u.classList.contains('active')?'unlimited':d&&d.classList.contains('active')?'daily':'daily'}
function dailyLocked(){var d=qs('#fgDailyBtn');return !!(d&&(d.classList.contains('turf-daily-locked')||d.disabled||d.getAttribute('aria-disabled')==='true'))}
function frame(){
 var root=getComputedStyle(document.documentElement),side=root.getPropertyValue('--turf-b4-side').trim()||'0px',top=root.getPropertyValue('--turf-b4-top').trim()||'64px';
 return {side:side,top:top};
}
function ensureStatus(){
 var h=qs('#turfBatch4Header');if(!h)return null;
 var s=qs('#turfBatch4Status',h);if(!s){s=document.createElement('div');s.id='turfBatch4Status';s.className='turf-b4-statusbar';h.appendChild(s)}return s;
}
function syncStatus(){
 if(!openGame())return;
 var s=ensureStatus();if(!s)return;
 var m=mode(),type=playType(),locked=dailyLocked();
 var availability=locked?'DAILY COMPLETE':'DAILY AVAILABLE';
 var active=type==='unlimited'?'UNLIMITED':'DAILY CHALLENGE';
 s.innerHTML='<span class="turf-b4-game-name">'+String(MODE_LABELS[m]||'TURF Game')+'</span><span class="turf-b4-mode-pill">'+active+'</span><span class="turf-b4-daily '+(locked?'is-done':'')+'">'+availability+'</span>';
 var h=qs('#turfBatch4Header');if(h){var strongs=qsa('.turf-b4-info-grid strong',h);if(strongs[1])strongs[1].textContent=active;if(strongs[2]&&locked&&type==='daily')strongs[2].textContent='Daily complete — Unlimited stays open';}
}
function resultOpen(){var r=qs('#fgResultOverlay');if(!r)return false;var cs=getComputedStyle(r);return r.classList.contains('open')||r.getAttribute('aria-hidden')==='false'||(cs.display!=='none'&&cs.visibility!=='hidden'&&Number(cs.opacity||1)>0)}
function syncResult(){
 var r=qs('#fgResultOverlay');if(!r)return;
 var on=resultOpen();document.body.classList.toggle('turf-b4-result-open',on&&openGame());
 if(on&&openGame()){
   var m=mode(),label=MODE_LABELS[m]||'TURF Game',k=qs('#fgResultKicker',r),note=qs('.fg-result-note',r);
   if(k)k.textContent='TURF • '+label.toUpperCase();
   if(note)note.textContent=playType()==='daily'?'Daily Challenge saves once per account and resets at 12:00 AM Pacific. Play Again opens Unlimited.':'Unlimited stays replayable. Keep playing to chase your best result.';
 }
}
function closeCleanup(){if(!openGame()){document.body.classList.remove('turf-b4-game-open','turf-b4-result-open');var o=qs('#footballGameOverlay');if(o)o.removeAttribute('data-turf-b4-page')}}
function installCss(){
 if(qs('#turfBatch4StateCss'))return;var s=document.createElement('style');s.id='turfBatch4StateCss';s.textContent=`
 .turf-b4-statusbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:15px;padding-top:14px;border-top:1px solid rgba(129,201,235,.12)}
 .turf-b4-statusbar span{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;font:850 10px/1 system-ui;letter-spacing:.07em}
 .turf-b4-game-name{background:rgba(255,255,255,.055);border:1px solid rgba(157,209,234,.12);color:#bed9e7}
 .turf-b4-mode-pill{background:rgba(38,153,211,.13);border:1px solid rgba(63,185,240,.3);color:#8bdbff}
 .turf-b4-daily{margin-left:auto;background:rgba(54,200,130,.10);border:1px solid rgba(79,219,151,.25);color:#75e6ad}
 .turf-b4-daily.is-done{background:rgba(255,194,78,.09);border-color:rgba(255,194,78,.22);color:#ffd17a}
 body.turf-b4-result-open #fgResultOverlay{position:fixed!important;left:var(--turf-b4-side,0px)!important;right:0!important;top:var(--turf-b4-top,64px)!important;bottom:0!important;width:auto!important;height:auto!important;z-index:9200!important;background:rgba(3,10,15,.78)!important;backdrop-filter:blur(9px)!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:24px!important;box-sizing:border-box!important}
 body.turf-b4-result-open #fgResultOverlay .fg-result-card{width:min(720px,calc(100vw - var(--turf-b4-side,0px) - 48px))!important;max-width:720px!important;max-height:calc(100vh - var(--turf-b4-top,64px) - 48px)!important;overflow:auto!important;border-radius:22px!important;border:1px solid rgba(99,194,238,.24)!important;background:radial-gradient(circle at 85% 0%,rgba(49,155,207,.18),transparent 35%),linear-gradient(180deg,#0d2331,#08151e)!important;box-shadow:0 30px 90px rgba(0,0,0,.55)!important;padding:28px!important;box-sizing:border-box!important}
 body.turf-b4-result-open #fgResultOverlay .fg-result-kicker{color:#64cffa!important;letter-spacing:.14em!important;font-weight:900!important}
 body.turf-b4-result-open #fgResultOverlay .fg-result-title{color:#f5fbff!important}
 body.turf-b4-result-open #fgResultOverlay .fg-result-note{margin-top:18px!important;padding:12px 14px!important;border-radius:12px!important;background:rgba(255,255,255,.035)!important;border:1px solid rgba(132,201,233,.11)!important;color:#91b2c1!important;line-height:1.45!important}
 body.turf-b4-game-open #footballGameOverlay .fg-body input,body.turf-b4-game-open #footballGameOverlay .fg-body button{font-family:inherit!important}
 @media(max-width:680px){.turf-b4-daily{margin-left:0}body.turf-b4-result-open #fgResultOverlay{left:0!important;padding:12px!important}body.turf-b4-result-open #fgResultOverlay .fg-result-card{width:100%!important;max-height:calc(100vh - var(--turf-b4-top,56px) - 24px)!important;padding:20px!important}}
 `;document.head.appendChild(s)
}
function run(){installCss();syncStatus();syncResult();closeCleanup()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[80,180,400,800,1400,2400,4000].forEach(function(ms){setTimeout(run,ms)});
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('#footballGameLaunch,#footballGameClose,.fg-mode,#fgDailyBtn,#fgUnlimitedBtn,#fgResultClose,#fgResultAgain,[data-fhq-nav="games"]'):null;if(t){setTimeout(run,0);setTimeout(run,80);setTimeout(run,220)}},true);
new MutationObserver(function(){clearTimeout(window.__turfB4StateMut);window.__turfB4StateMut=setTimeout(run,45)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden','disabled','aria-disabled']});
})();