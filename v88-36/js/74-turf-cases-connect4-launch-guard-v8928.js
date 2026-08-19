/* ============================================================
   TURF V89.28 — HARD LAUNCH GUARD FOR CASES + 4 IN A ROW
   Fixes legacy sidebar handlers bypassing the CPU/H2H chooser.
   Uses WINDOW capture so it runs before target/sidebar listeners.
   Trivia Tac Toe is intentionally left alone because V89.25 works.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8928__) return; window.__TURF_V8928__=true;

function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function norm(s){return String(s||'').replace(/\s+/g,' ').trim().toLowerCase()}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var META={deal:{name:'Cases',desc:'Build your lineup through cases and dealer decisions.'},connect4:{name:'4 in a Row',desc:'Answer NFL trivia to drop each piece.'}};

function addCss(){
  if(q('#t8928css')) return;
  var s=document.createElement('style');s.id='t8928css';s.textContent=`
  #t8928{position:fixed;inset:0;z-index:3000000;background:rgba(2,7,11,.90);display:grid;place-items:center;padding:86px 18px 18px;color:#eef8ff;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  #t8928 .card{width:min(900px,95vw);background:linear-gradient(145deg,#0b141b,#071016);border:1px solid #285873;border-radius:24px;overflow:hidden;box-shadow:0 32px 100px rgba(0,0,0,.7)}
  #t8928 .head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #223b49}
  #t8928 h2{margin:0;font-size:27px;font-weight:950}#t8928 .x{width:42px;height:42px;border:0;border-radius:50%;background:#e72b35;color:#fff;font-size:24px;font-weight:950;cursor:pointer}
  #t8928 .body{padding:28px}#t8928 .kick{text-align:center;color:#63d9ff;font-weight:900;letter-spacing:.15em;font-size:11px;text-transform:uppercase}
  #t8928 .title{text-align:center;font-size:30px;font-weight:950;margin:8px 0 5px}#t8928 .copy{text-align:center;color:#9eb2be;font-size:13px;font-weight:650;margin-bottom:24px}
  #t8928 .choices{display:grid;grid-template-columns:1fr 1fr;gap:18px}#t8928 .levels{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  #t8928 .mode,#t8928 .lvl{border:1px solid #355565;border-radius:18px;padding:26px 22px;background:linear-gradient(145deg,#11222c,#0d171e);color:#fff;text-align:left;cursor:pointer;transition:.18s;min-height:170px}
  #t8928 .mode:hover,#t8928 .lvl:hover{transform:translateY(-3px);border-color:#43cff7}#t8928 .mode.h2h{background:radial-gradient(circle at 80% 20%,rgba(135,80,255,.22),transparent 38%),linear-gradient(145deg,#171a31,#0c1722);border-color:#605bb0}
  #t8928 .mode b,#t8928 .lvl b{display:block;font-size:23px;font-weight:950;margin:7px 0}#t8928 .mode span,#t8928 .lvl span{color:#a6b8c2;font-size:13px;line-height:1.45;font-weight:650}#t8928 .ico{font-size:36px}
  #t8928 .lvl.easy{border-color:#2a8e66}#t8928 .lvl.medium{border-color:#267aa3}#t8928 .lvl.brutal{border-color:#a7424a}
  #t8928 .search{text-align:center;padding:12px}#t8928 .logo{width:86px;height:86px;margin:0 auto 18px;border-radius:24px;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#1c91d2,#0d2540 58%,#09131d);border:1px solid #3fc9ff;font-size:39px;font-weight:1000;font-style:italic}
  #t8928 .spin{width:62px;height:62px;margin:24px auto;border-radius:50%;border:6px solid rgba(81,207,255,.14);border-top-color:#42d2ff;border-right-color:#795eff;animation:t8928spin .85s linear infinite}#t8928 .time{font-size:28px;font-weight:950}#t8928 .status{color:#66dfff;font-weight:900;margin-top:8px}#t8928 .cancel{margin-top:24px;border:1px solid #425a67;background:#121d24;color:#fff;border-radius:10px;padding:11px 18px;font-weight:850;cursor:pointer}
  @keyframes t8928spin{to{transform:rotate(360deg)}}@media(max-width:700px){#t8928 .choices,#t8928 .levels{grid-template-columns:1fr}#t8928{padding-top:72px}}
  `;document.head.appendChild(s);
}
function close(){var o=q('#t8928');if(o)o.remove();clearInterval(window.__t8928Clock)}
function ov(title){addCss();close();var o=document.createElement('div');o.id='t8928';o.innerHTML='<div class="card"><div class="head"><h2>'+esc(title)+'</h2><button class="x">×</button></div><div class="body"></div></div>';document.body.appendChild(o);q('.x',o).onclick=close;o.onclick=function(e){if(e.target===o)close()};return q('.body',o)}

function original(id,lvl){
  close();window.__TURF_CPU_LEVEL__=lvl||'easy';
  var b=q('#turfV8911Root [data-turf-new="'+id+'"]')||q('[data-turf-new="'+id+'"]');
  if(!b)return;
  /* Mark this click so our window guard ignores the programmatic original launcher. */
  window.__TURF_V8928_BYPASS__=true;
  try{b.click()}finally{setTimeout(function(){window.__TURF_V8928_BYPASS__=false},0)}
  if(lvl){setTimeout(function(){
    var hit=qa('[data-lvl],.turf-level,.lvl').find(function(x){return norm(x.textContent)===lvl});if(hit)hit.click();
  },120)}
}
function choose(id){
  var g=META[id],b=ov(g.name);
  b.innerHTML='<div class="kick">Choose how to play</div><div class="title">'+g.name+'</div><div class="copy">'+g.desc+'</div><div class="choices"><button class="mode cpu"><div class="ico">🤖</div><b>CPU</b><span>Play immediately against the computer.</span></button><button class="mode h2h"><div class="ico">⚔️</div><b>H2H</b><span>Search for another TURF player and play head-to-head.</span></button></div>';
  q('.cpu',b).onclick=function(){id==='deal'?original(id):difficulty(id)};
  q('.h2h',b).onclick=function(){search(id)};
}
function difficulty(id){
  var g=META[id],b=ov(g.name+' • CPU');
  b.innerHTML='<div class="kick">Choose difficulty</div><div class="title">'+g.name+'</div><div class="copy">Trivia difficulty changes with each mode.</div><div class="levels"><button class="lvl easy" data-l="easy"><div class="ico">🟢</div><b>Easy</b><span>Recognizable NFL knowledge.</span></button><button class="lvl medium" data-l="medium"><div class="ico">🔵</div><b>Medium</b><span>Draft, awards, divisions and less-obvious NFL knowledge.</span></button><button class="lvl brutal" data-l="brutal"><div class="ico">🔴</div><b>Brutal</b><span>Deep history, draft slots, stats and awards.</span></button></div>';
  qa('[data-l]',b).forEach(function(x){x.onclick=function(){original(id,this.dataset.l)}});
}
function search(id){
  var g=META[id],b=ov(g.name+' • H2H');
  b.innerHTML='<div class="search"><div class="logo">T</div><div class="kick">'+g.name+' • H2H</div><div class="title">Searching for player</div><div class="spin"></div><div class="time" id="t8928time">0:00</div><div class="status">MATCHMAKING...</div><div class="copy">Looking for another player searching for '+g.name+'.</div><button class="cancel">Cancel Search</button></div>';
  q('.cancel',b).onclick=function(){choose(id)};var sec=0;window.__t8928Clock=setInterval(function(){sec++;var e=q('#t8928time');if(e)e.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')},1000);
  try{if(typeof window.turfH2HFindMatch==='function')window.turfH2HFindMatch(id,function(m){if(m&&typeof m.start==='function'){clearInterval(window.__t8928Clock);setTimeout(m.start,500)}})}catch(e){}
}

function idFromClick(e){
  var t=e.target;if(!t||!t.closest)return null;
  var btn=t.closest('[data-comp-game]');
  if(btn){var id=btn.getAttribute('data-comp-game');if(id==='deal'||id==='connect4')return id}
  /* Fallback for sidebar rows rebuilt without data attributes. */
  var row=t.closest('button,a,[role="button"],div');
  for(var i=0;i<4&&row;i++,row=row.parentElement){
    var r=row.getBoundingClientRect&&row.getBoundingClientRect();
    if(r&&r.left<330&&r.width<330){
      var n=norm(row.textContent);
      if(n==='cases')return 'deal';
      if(n==='4 in a row'||n==='trivia 4 in a row')return 'connect4';
    }
  }
  return null;
}

/* WINDOW capture is intentionally used: it sits above document/target/sidebar listeners
   in the event path, so legacy handlers cannot open the old game first. */
window.addEventListener('click',function(e){
  if(window.__TURF_V8928_BYPASS__)return;
  if(q('#t8928')&&e.target.closest&&e.target.closest('#t8928'))return;
  var id=idFromClick(e);if(!id)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();choose(id);
},true);

addCss();
})();