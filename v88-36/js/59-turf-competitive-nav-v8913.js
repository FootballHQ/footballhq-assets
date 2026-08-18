/* ============================================================
   TURF V89.13 — COMPETITIVE NAV PLACEMENT + BRANDING
   - Move Cases / Trivia Tic-Tac-Toe / 4 in a Row directly UNDER Trials
   - Keep them inside the COMPETITIVE section (not above HOME)
   - Give each game its own original TURF-style icon
   - Rename Deal or No Deal -> Cases throughout the new-game UI
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8913__) return; window.__TURF_V8913__=true;
function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function norm(s){return String(s||'').replace(/\s+/g,' ').trim().toLowerCase()}

function icon(type){
  var c='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  if(type==='cases') return '<svg '+c+'><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4 11h16M10 13h4"/></svg>';
  if(type==='ttt') return '<svg '+c+'><path d="M8 3v18M16 3v18M3 8h18M3 16h18"/><path d="m5 5 2 2m0-2-2 2"/><circle cx="12" cy="12" r="2.1"/></svg>';
  return '<svg '+c+'><circle cx="8" cy="6" r="2.4"/><circle cx="12" cy="10" r="2.4"/><circle cx="16" cy="14" r="2.4"/><circle cx="12" cy="18" r="2.4"/></svg>';
}

function addCss(){
  if(qs('#turfV8913Css')) return;
  var s=document.createElement('style');s.id='turfV8913Css';
  s.textContent=`
    #turfTrialsCompetitiveLinks{
      margin:4px 8px 10px 22px!important;
      padding:3px 0 3px 13px!important;
      border-left:1px solid rgba(65,192,244,.30)!important;
      display:grid!important;gap:3px!important;
    }
    #turfTrialsCompetitiveLinks .turf-comp-nav{
      width:100%!important;min-height:37px!important;border:0!important;
      background:transparent!important;color:#b5c4ce!important;border-radius:9px!important;
      text-align:left!important;padding:6px 8px!important;display:flex!important;
      align-items:center!important;gap:9px!important;font:800 11px/1.15 system-ui!important;
      cursor:pointer!important;
    }
    #turfTrialsCompetitiveLinks .turf-comp-nav:hover{background:rgba(28,139,190,.16)!important;color:#fff!important}
    #turfTrialsCompetitiveLinks .turf-comp-icon{
      width:24px!important;height:24px!important;flex:0 0 24px!important;display:grid!important;place-items:center!important;
      border-radius:7px!important;border:1px solid rgba(71,184,231,.25)!important;
      background:linear-gradient(145deg,#0d2a3a,#0a1b27)!important;color:#78dcff!important;
    }
    #turfTrialsCompetitiveLinks .turf-comp-icon svg{width:15px!important;height:15px!important}
    #turfTrialsCompetitiveLinks [data-comp-game="deal"] .turf-comp-icon{color:#f4c95f!important;border-color:rgba(244,201,95,.28)!important;background:linear-gradient(145deg,#3c2c0d,#151b20)!important}
    #turfTrialsCompetitiveLinks [data-comp-game="ttt"] .turf-comp-icon{color:#65d8ff!important}
    #turfTrialsCompetitiveLinks [data-comp-game="connect4"] .turf-comp-icon{color:#ff6b72!important;border-color:rgba(255,107,114,.28)!important;background:linear-gradient(145deg,#39171b,#111d25)!important}
  `;
  document.head.appendChild(s);
}

function visibleTrialsButton(){
  var candidates=[];
  qsa('button,a,[role="button"]').forEach(function(el){
    var t=norm(el.textContent);
    if(t==='trials'||t.indexOf('trials new')===0||t.indexOf('trials')===0){
      var r=el.getBoundingClientRect();
      if(r.width>40&&r.height>20&&r.top>=0&&r.left<400)candidates.push(el);
    }
  });
  candidates.sort(function(a,b){return a.getBoundingClientRect().top-b.getBoundingClientRect().top});
  return candidates[0]||qs('#turfTrialsNav');
}

function launch(id){
  var b=qs('#turfV8911Root [data-turf-new="'+id+'"]');
  if(b){b.click();return}
}

function rebuildNav(){
  var trials=visibleTrialsButton();
  if(!trials) return;
  var wrap=qs('#turfTrialsCompetitiveLinks');
  if(!wrap){wrap=document.createElement('div');wrap.id='turfTrialsCompetitiveLinks'}
  wrap.innerHTML=
    '<button type="button" class="turf-comp-nav" data-comp-game="deal"><span class="turf-comp-icon">'+icon('cases')+'</span><span>Cases</span></button>'+ 
    '<button type="button" class="turf-comp-nav" data-comp-game="ttt"><span class="turf-comp-icon">'+icon('ttt')+'</span><span>Trivia Tic-Tac-Toe</span></button>'+ 
    '<button type="button" class="turf-comp-nav" data-comp-game="connect4"><span class="turf-comp-icon">'+icon('connect4')+'</span><span>4 in a Row</span></button>';

  /* Put submenu immediately after the VISIBLE Trials row. */
  trials.insertAdjacentElement('afterend',wrap);
  qsa('[data-comp-game]',wrap).forEach(function(btn){btn.onclick=function(){launch(this.dataset.compGame)}});
}

function renameCases(){
  /* Hidden launcher card */
  var card=qs('#turfV8911Root [data-turf-new="deal"]');
  if(card){
    var b=qs('.turf-new-copy b',card);if(b)b.textContent='Cases';
    var d=qs('.turf-new-copy small',card);if(d)d.textContent='Build a four-player weekly fantasy lineup through cases.';
  }
  /* Open modal titles / visible labels */
  qsa('#turfGameModal h1,#turfGameModal h2,#turfGameModal h3,#turfGameModal .turf-big').forEach(function(el){
    if(/deal\s+or\s+no\s+deal/i.test(el.textContent||'')) el.textContent=(el.textContent||'').replace(/deal\s+or\s+no\s+deal/ig,'CASES');
  });
  var mt=qs('#turfModalTitle');
  if(mt&&/deal\s+or\s+no\s+deal/i.test(mt.textContent||'')) mt.textContent=(mt.textContent||'').replace(/deal\s+or\s+no\s+deal/ig,'CASES');
}

function run(){addCss();rebuildNav();renameCases()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[150,400,900,1600,2800,4500].forEach(function(ms){setTimeout(run,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8913Obs);window.__turf8913Obs=setTimeout(run,80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
