/* ============================================================
   TURF V89.27 — COMPETITIVE SIDEBAR CLICK GUARD
   Fixes older nav rebuilds stealing clicks from Cases / Trivia Tac Toe / 4 in a Row.
   Uses document-level CAPTURE interception, so this wins before old target onclick handlers.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8927__) return; window.__TURF_V8927__=true;

var MAP={
  deal:{name:'Cases',desc:'Build your lineup through cases and dealer decisions.'},
  ttt:{name:'Trivia Tac Toe',desc:'Answer NFL trivia to earn each square.'},
  connect4:{name:'4 in a Row',desc:'Answer NFL trivia to drop each piece.'}
};
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]})}
function close(){var o=q('#t8927');if(o)o.remove();clearInterval(window.__t8927Clock)}
function css(){if(q('#t8927css'))return;var s=document.createElement('style');s.id='t8927css';s.textContent=`
#t8927{position:fixed;inset:0;z-index:2600000;background:rgba(2,7,11,.9);display:grid;place-items:center;padding:86px 18px 18px;color:#eef8ff;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
#t8927 .card{width:min(900px,95vw);background:linear-gradient(145deg,#0b141b,#071016);border:1px solid #285873;border-radius:24px;overflow:hidden;box-shadow:0 32px 100px rgba(0,0,0,.7)}
#t8927 .head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #223b49}#t8927 h2{margin:0;font-size:27px;font-weight:950}
#t8927 .x{width:42px;height:42px;border:0;border-radius:50%;background:#e72b35;color:white;font-size:24px;font-weight:950;cursor:pointer}
#t8927 .body{padding:28px}.kick{text-align:center;color:#63d9ff;font-weight:900;letter-spacing:.15em;font-size:11px;text-transform:uppercase}.title{text-align:center;font-size:30px;font-weight:950;margin:8px 0 5px}.copy{text-align:center;color:#9eb2be;font-weight:650;font-size:13px;margin-bottom:24px}
#t8927 .choices{display:grid;grid-template-columns:1fr 1fr;gap:18px}.mode,#t8927 .lvl{border:1px solid #355565;border-radius:18px;padding:28px 22px;background:linear-gradient(145deg,#11222c,#0d171e);color:#fff;text-align:left;cursor:pointer;min-height:180px;transition:.18s}
#t8927 .mode:hover,#t8927 .lvl:hover{transform:translateY(-3px);border-color:#43cff7;box-shadow:0 15px 35px rgba(0,170,230,.12)}#t8927 .mode.h2h{background:radial-gradient(circle at 80% 20%,rgba(135,74,255,.22),transparent 35%),linear-gradient(145deg,#171a31,#0c1722);border-color:#5c59a9}
#t8927 .ico{font-size:37px;margin-bottom:14px}#t8927 .mode b,#t8927 .lvl b{display:block;font-size:23px;font-weight:950;margin-bottom:7px}#t8927 .mode span,#t8927 .lvl span{color:#a6b8c2;font-size:13px;line-height:1.45;font-weight:650}
#t8927 .levels{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}#t8927 .lvl.easy{border-color:#2a8e66}#t8927 .lvl.medium{border-color:#267aa3}#t8927 .lvl.brutal{border-color:#a7424a}
#t8927 .search{text-align:center;padding:16px 0 8px}#t8927 .logo{width:86px;height:86px;margin:0 auto 20px;border-radius:24px;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#1c91d2,#0d2540 58%,#09131d);border:1px solid #3fc9ff;color:white;font-size:39px;font-weight:1000;font-style:italic;box-shadow:0 0 38px rgba(40,190,255,.25)}
#t8927 .spinner{width:62px;height:62px;margin:24px auto;border-radius:50%;border:6px solid rgba(81,207,255,.14);border-top-color:#42d2ff;border-right-color:#795eff;animation:t8927spin .85s linear infinite}#t8927 .time{font-size:28px;font-weight:950;margin:8px 0}#t8927 .status{color:#66dfff;font-weight:900;font-size:13px;letter-spacing:.05em}#t8927 .cancel{margin-top:24px;border:1px solid #425a67;background:#121d24;color:#eaf8ff;border-radius:10px;padding:11px 18px;font-weight:850;cursor:pointer}@keyframes t8927spin{to{transform:rotate(360deg)}}
@media(max-width:700px){#t8927 .choices,#t8927 .levels{grid-template-columns:1fr}#t8927{padding-top:72px}}
`;document.head.appendChild(s)}
function ov(title){css();close();var o=document.createElement('div');o.id='t8927';o.innerHTML='<div class="card"><div class="head"><h2>'+esc(title)+'</h2><button class="x">×</button></div><div class="body"></div></div>';document.body.appendChild(o);q('.x',o).onclick=close;o.onclick=function(e){if(e.target===o)close()};return q('.body',o)}

function launchOriginal(id,lvl){
  close();
  window.__TURF_CPU_LEVEL__=lvl||'easy';
  var b=q('#turfV8911Root [data-turf-new="'+id+'"]')||q('[data-turf-new="'+id+'"]');
  if(!b)return;
  /* bypass our sidebar capture because this hidden launcher is not inside competitive nav */
  b.click();
  if(lvl){setTimeout(function(){
    var nodes=qa('[data-lvl],.turf-level,.lvl,button');
    var hit=nodes.find(function(x){return String(x.textContent||'').trim().toLowerCase()===lvl});
    if(hit)hit.click();
  },120)}
}
function difficulty(id){
  var g=MAP[id],b=ov(g.name+' • CPU');
  b.innerHTML='<div class="kick">Choose difficulty</div><div class="title">'+g.name+'</div><div class="copy">Trivia difficulty changes with each mode.</div><div class="levels">'+
  '<button class="lvl easy" data-l="easy"><div class="ico">🟢</div><b>Easy</b><span>Recognizable teams, stars, divisions and common NFL knowledge.</span></button>'+
  '<button class="lvl medium" data-l="medium"><div class="ico">🔵</div><b>Medium</b><span>Draft history, awards, colleges, rivalries and less-obvious players.</span></button>'+
  '<button class="lvl brutal" data-l="brutal"><div class="ico">🔴</div><b>Brutal</b><span>Deep draft, historical, award and stat questions for serious NFL fans.</span></button></div>';
  qa('[data-l]',b).forEach(function(x){x.onclick=function(){launchOriginal(id,this.dataset.l)}})
}
function choose(id){
  var g=MAP[id],b=ov(g.name);
  b.innerHTML='<div class="kick">Choose how to play</div><div class="title">'+g.name+'</div><div class="copy">'+g.desc+'</div><div class="choices">'+
  '<button class="mode cpu"><div class="ico">🤖</div><b>CPU</b><span>Play immediately against the computer.</span></button>'+
  '<button class="mode h2h"><div class="ico">⚔️</div><b>H2H</b><span>Search for another TURF player and play head-to-head.</span></button></div>';
  q('.cpu',b).onclick=function(){id==='deal'?launchOriginal(id):difficulty(id)};
  q('.h2h',b).onclick=function(){search(id)};
}
function search(id){
  var g=MAP[id],b=ov(g.name+' • H2H');
  b.innerHTML='<div class="search"><div class="logo">T</div><div class="kick">'+g.name+' • H2H</div><div class="title">Searching for player</div><div class="spinner"></div><div class="time" id="t8927time">0:00</div><div class="status">MATCHMAKING...</div><div class="copy">Looking for another player searching for '+g.name+'.</div><button class="cancel">Cancel Search</button></div>';
  q('.cancel',b).onclick=function(){choose(id)};var sec=0;window.__t8927Clock=setInterval(function(){sec++;var e=q('#t8927time');if(e)e.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')},1000);
  try{if(typeof window.turfH2HFindMatch==='function')window.turfH2HFindMatch(id,function(m){if(m)matched(id,m)})}catch(e){}
}
function matched(id,m){clearInterval(window.__t8927Clock);var b=ov(MAP[id].name+' • H2H');b.innerHTML='<div class="search"><div class="logo">T</div><div class="kick">MATCH FOUND</div><div class="title">'+esc(m&&m.opponentName||'Opponent')+'</div><div class="copy">Preparing match…</div></div>';if(m&&typeof m.start==='function')setTimeout(m.start,650)}

/* Critical fix: capture sidebar clicks BEFORE v89.13 target onclick fires. */
document.addEventListener('click',function(e){
  if(q('#t8927')&&q('#t8927').contains(e.target))return;
  var btn=e.target&&e.target.closest?e.target.closest('#turfTrialsCompetitiveLinks [data-comp-game]'):null;
  if(!btn)return;
  var id=btn.getAttribute('data-comp-game');if(!MAP[id])return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  choose(id);
},true);

/* Also expose this for later patches / debugging. */
window.turfCompetitiveChoose=choose;
})();