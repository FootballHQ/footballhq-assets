/* ============================================================
   TURF V89.24 — H2H LAUNCHER + CASUAL GAME CARDS
   - Rename Trivia Tic-Tac-Toe -> Trivia Tac Toe
   - Cases / Trivia Tac Toe / 4 in a Row open CPU vs H2H chooser
   - H2H gets a shared polished searching screen with timer/spinner
   - Add Chameleon + Two Face to the bottom of the main Games grid
   NOTE: this patch intentionally does NOT fake a human match.
   Real cross-user pairing still requires the Apps Script matchmaking backend.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8924__) return; window.__TURF_V8924__=true;

function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

var GAMES={
  deal:{name:'Cases',sub:'Build your lineup through cases and dealer decisions.',icon:'💼'},
  ttt:{name:'Trivia Tac Toe',sub:'Answer NFL trivia to earn each square.',icon:'⌗'},
  connect4:{name:'4 in a Row',sub:'Answer NFL trivia to drop each piece.',icon:'⠿'}
};

function addCss(){
  if(qs('#turf8924Css')) return;
  var s=document.createElement('style');s.id='turf8924Css';
  s.textContent=`
  #turf8924Overlay{position:fixed;inset:0;z-index:2200000;background:rgba(2,7,11,.88);display:grid;place-items:center;padding:86px 18px 18px;color:#eef8ff;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  #turf8924Overlay .t8924-card{width:min(900px,95vw);background:linear-gradient(145deg,#0b141b,#071016);border:1px solid #285873;border-radius:24px;box-shadow:0 32px 100px rgba(0,0,0,.68);overflow:hidden}
  #turf8924Overlay .t8924-head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #223b49;background:linear-gradient(90deg,#0d1b25,#0b151d)}
  #turf8924Overlay .t8924-head h2{margin:0;font-size:27px;font-weight:950;letter-spacing:.01em}
  #turf8924Overlay .t8924-x{width:42px;height:42px;border:0;border-radius:50%;background:#e72b35;color:white;font-size:24px;font-weight:950;cursor:pointer}
  #turf8924Overlay .t8924-body{padding:28px}
  #turf8924Overlay .t8924-kicker{text-align:center;color:#63d9ff;font-weight:900;letter-spacing:.15em;font-size:11px;text-transform:uppercase}
  #turf8924Overlay .t8924-title{text-align:center;font-size:30px;font-weight:950;margin:8px 0 5px}
  #turf8924Overlay .t8924-copy{text-align:center;color:#9eb2be;font-weight:650;font-size:13px;margin-bottom:24px}
  #turf8924Overlay .t8924-choices{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  #turf8924Overlay .t8924-mode{border:1px solid #355565;border-radius:18px;padding:28px 22px;background:linear-gradient(145deg,#11222c,#0d171e);color:#fff;text-align:left;cursor:pointer;min-height:190px;transition:.18s transform,.18s border-color,.18s box-shadow}
  #turf8924Overlay .t8924-mode:hover{transform:translateY(-3px);border-color:#43cff7;box-shadow:0 15px 35px rgba(0,170,230,.12)}
  #turf8924Overlay .t8924-mode.h2h{background:radial-gradient(circle at 80% 20%,rgba(135,74,255,.22),transparent 35%),linear-gradient(145deg,#171a31,#0c1722);border-color:#5c59a9}
  #turf8924Overlay .t8924-mode .ico{font-size:37px;margin-bottom:14px}
  #turf8924Overlay .t8924-mode b{display:block;font-size:23px;font-weight:950;margin-bottom:7px}
  #turf8924Overlay .t8924-mode span{color:#a6b8c2;font-size:13px;line-height:1.45;font-weight:650}
  #turf8924Overlay .t8924-search{text-align:center;padding:16px 0 8px}
  #turf8924Overlay .t8924-logo{width:86px;height:86px;margin:0 auto 20px;border-radius:24px;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#1c91d2,#0d2540 58%,#09131d);border:1px solid #3fc9ff;color:white;font-size:39px;font-weight:1000;font-style:italic;box-shadow:0 0 38px rgba(40,190,255,.25)}
  #turf8924Overlay .t8924-spinner{width:62px;height:62px;margin:24px auto;border-radius:50%;border:6px solid rgba(81,207,255,.14);border-top-color:#42d2ff;border-right-color:#795eff;animation:turf8924spin .85s linear infinite;box-shadow:0 0 25px rgba(82,204,255,.15)}
  #turf8924Overlay .t8924-time{font-size:28px;font-weight:950;color:#fff;margin:8px 0}
  #turf8924Overlay .t8924-status{color:#66dfff;font-weight:900;font-size:13px;letter-spacing:.05em}
  #turf8924Overlay .t8924-small{color:#8499a5;font-size:12px;font-weight:650;margin-top:12px}
  #turf8924Overlay .t8924-cancel{margin-top:24px;border:1px solid #425a67;background:#121d24;color:#eaf8ff;border-radius:10px;padding:11px 18px;font-weight:850;cursor:pointer}
  @keyframes turf8924spin{to{transform:rotate(360deg)}}
  .turf8924-casual-card{min-height:248px!important;border:1px solid #2a566b!important;border-radius:18px!important;background:linear-gradient(155deg,#102430,#0a1218)!important;color:#fff!important;overflow:hidden!important;text-align:left!important;padding:0!important;cursor:pointer!important;box-shadow:0 14px 35px rgba(0,0,0,.28)!important}
  .turf8924-casual-card:hover{transform:translateY(-2px)!important;border-color:#2cc6ff!important}
  .turf8924-casual-art{height:120px;display:grid;place-items:center;font-size:48px;background:radial-gradient(circle at 50% 100%,rgba(13,142,201,.35),transparent 62%),linear-gradient(135deg,#10344b,#121827)}
  .turf8924-casual-card[data-casual='twoface'] .turf8924-casual-art{background:linear-gradient(135deg,#512b67,#18253a)}
  .turf8924-casual-copy{padding:15px}.turf8924-casual-copy b{display:block;font-size:18px;font-weight:950;margin-bottom:7px}.turf8924-casual-copy small{display:block;color:#9eb0ba;font-size:12px;line-height:1.35;font-weight:650}.turf8924-casual-copy em{display:inline-block;margin-top:11px;padding:5px 8px;border-radius:99px;background:#0f3344;color:#6edcff;font-size:9px;font-style:normal;font-weight:950;letter-spacing:.1em}
  @media(max-width:700px){#turf8924Overlay .t8924-choices{grid-template-columns:1fr}#turf8924Overlay{padding-top:72px}#turf8924Overlay .t8924-mode{min-height:145px;padding:20px}}
  `;
  document.head.appendChild(s);
}

function closeOverlay(){
  var o=qs('#turf8924Overlay');if(o)o.remove();
  clearInterval(window.__turf8924Clock);
}
function overlay(title){
  addCss();closeOverlay();
  var o=document.createElement('div');o.id='turf8924Overlay';
  o.innerHTML='<div class="t8924-card"><div class="t8924-head"><h2>'+esc(title)+'</h2><button class="t8924-x">×</button></div><div class="t8924-body"></div></div>';
  document.body.appendChild(o);qs('.t8924-x',o).onclick=closeOverlay;o.onclick=function(e){if(e.target===o)closeOverlay()};
  return qs('.t8924-body',o);
}

function launchOriginal(id){
  closeOverlay();
  var b=qs('#turfV8911Root [data-turf-new="'+id+'"]');
  if(b){b.click();return true}
  /* fallback to any hidden/current launcher */
  b=qs('[data-turf-new="'+id+'"]');if(b){b.click();return true}
  return false;
}

function chooseMode(id){
  var g=GAMES[id];if(!g)return;
  var b=overlay(g.name);
  b.innerHTML='<div class="t8924-kicker">Choose how to play</div><div class="t8924-title">'+esc(g.name)+'</div><div class="t8924-copy">'+esc(g.sub)+'</div><div class="t8924-choices"><button class="t8924-mode cpu"><div class="ico">🤖</div><b>CPU</b><span>Play immediately against the computer using the current game rules.</span></button><button class="t8924-mode h2h"><div class="ico">⚔️</div><b>H2H</b><span>Search for another TURF player and play a competitive head-to-head match.</span></button></div>';
  qs('.cpu',b).onclick=function(){launchOriginal(id)};
  qs('.h2h',b).onclick=function(){searchScreen(id)};
}

function searchScreen(id){
  var g=GAMES[id],b=overlay(g.name+' • H2H');
  b.innerHTML='<div class="t8924-search"><div class="t8924-logo">T</div><div class="t8924-kicker">'+esc(g.name)+' • H2H</div><div class="t8924-title">Searching for player</div><div class="t8924-spinner"></div><div class="t8924-time" id="t8924Time">0:00</div><div class="t8924-status">MATCHMAKING...</div><div class="t8924-small">Looking for another player searching for '+esc(g.name)+'.</div><button class="t8924-cancel">Cancel Search</button></div>';
  qs('.t8924-cancel',b).onclick=function(){chooseMode(id)};
  var sec=0;clearInterval(window.__turf8924Clock);window.__turf8924Clock=setInterval(function(){sec++;var m=Math.floor(sec/60),s=sec%60;var el=qs('#t8924Time');if(el)el.textContent=m+':'+String(s).padStart(2,'0')},1000);
  /* Backend hook. We do not fake a human match. If the Apps Script project exposes
     window.turfH2HFindMatch(gameId, onMatch), this screen will use it automatically. */
  try{
    if(typeof window.turfH2HFindMatch==='function'){
      window.turfH2HFindMatch(id,function(match){if(match)onMatched(id,match)});
    }
  }catch(e){}
}
function onMatched(id,match){
  clearInterval(window.__turf8924Clock);
  var g=GAMES[id],b=overlay(g.name+' • H2H');
  var who=(match&&match.opponentName)||'Opponent';
  b.innerHTML='<div class="t8924-search"><div class="t8924-logo">T</div><div class="t8924-kicker">MATCH FOUND</div><div class="t8924-title">'+esc(who)+'</div><div class="t8924-copy">Preparing '+esc(g.name)+'…</div></div>';
  if(match&&typeof match.start==='function')setTimeout(match.start,700);
}

function renameEverywhere(){
  qsa('button,a,span,b,h1,h2,h3,h4,div').forEach(function(el){
    if(el.children.length>3)return;
    var t=txt(el);if(t==='Trivia Tic-Tac-Toe')el.textContent='Trivia Tac Toe';
  });
  var btn=qs('#turfTrialsCompetitiveLinks [data-comp-game="ttt"] span:last-child');if(btn)btn.textContent='Trivia Tac Toe';
}

function wireCompetitiveNav(){
  qsa('#turfTrialsCompetitiveLinks [data-comp-game]').forEach(function(btn){
    if(btn.dataset.turf8924==='1')return;btn.dataset.turf8924='1';
    btn.addEventListener('click',function(e){
      var id=this.dataset.compGame;if(!GAMES[id])return;
      e.preventDefault();e.stopImmediatePropagation();chooseMode(id);
    },true);
  });
}

function findMainGameGrid(){
  var anchors=qsa('button,[role="button"],article,div').filter(function(el){var t=txt(el);return /Franchise Finder/.test(t)&&t.length<300});
  for(var i=0;i<anchors.length;i++){
    var p=anchors[i].parentElement;
    for(var d=0;d<5&&p;d++,p=p.parentElement){
      var T=txt(p);if(/Career Path/.test(T)&&/Connections/.test(T)&&/Depth Chart/.test(T))return p;
    }
  }
  return null;
}
function launchCasual(id){
  var b=qs('#turfV8911Root [data-turf-new="'+id+'"]')||qs('[data-turf-new="'+id+'"]');if(b)b.click();
}
function casualCard(id,icon,name,desc){
  var b=document.createElement('button');b.type='button';b.className='turf8924-casual-card';b.dataset.casual=id;
  b.innerHTML='<div class="turf8924-casual-art">'+icon+'</div><div class="turf8924-casual-copy"><b>'+esc(name)+'</b><small>'+esc(desc)+'</small><em>CASUAL</em></div>';
  b.onclick=function(){launchCasual(id)};return b;
}
function addCasualCards(){
  if(qs('#turf8924ChamCard')&&qs('#turf8924TwoCard'))return;
  var grid=findMainGameGrid();if(!grid)return;
  if(!qs('#turf8924ChamCard')){var c=casualCard('chameleon','🎯','Chameleon','Find the hidden TURF T inside an NFL image.');c.id='turf8924ChamCard';grid.appendChild(c)}
  if(!qs('#turf8924TwoCard')){var t=casualCard('twoface','👥','Two Face','Identify both NFL players blended into one face.');t.id='turf8924TwoCard';grid.appendChild(t)}
}

function run(){addCss();renameEverywhere();wireCompetitiveNav();addCasualCards()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[120,350,800,1500,2800,5000].forEach(function(ms){setTimeout(run,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8924Obs);window.__turf8924Obs=setTimeout(run,90)}).observe(document.documentElement,{childList:true,subtree:true});
})();
