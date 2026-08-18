/* TURF V89.18 — CASES gameplay/UI pass */
(function(){
'use strict';
if(window.__TURF_V8918_CASES__)return;window.__TURF_V8918_CASES__=true;
var POS=['RB','WR','TE','QB'];
var DATA={
RB:[['Jahmyr Gibbs',21.6],['Bijan Robinson',20.8],['Saquon Barkley',19.7],['Josh Jacobs',17.6],['Breece Hall',16.9],['James Cook',16.1],['Kyren Williams',15.8],['David Montgomery',13.4],['Rachaad White',10.6],['Sean Tucker',2.2]],
WR:[['JaMarr Chase',22.0],['Justin Jefferson',21.2],['CeeDee Lamb',19.8],['Amon-Ra St. Brown',19.1],['Puka Nacua',18.4],['Nico Collins',17.2],['Mike Evans',15.8],['DK Metcalf',14.9],['George Pickens',13.8],['Rome Odunze',12.4]],
TE:[['Brock Bowers',17.3],['Trey McBride',16.1],['George Kittle',15.0],['Travis Kelce',14.6],['Sam LaPorta',13.8],['Mark Andrews',12.9],['T.J. Hockenson',11.8],['Dallas Goedert',10.7],['Kyle Pitts',10.1],['Hunter Henry',8.8]],
QB:[['Josh Allen',24.8],['Lamar Jackson',24.0],['Jalen Hurts',23.1],['Jayden Daniels',22.5],['Patrick Mahomes',21.4],['Joe Burrow',21.0],['Baker Mayfield',19.7],['Dak Prescott',19.0],['Jordan Love',18.6],['Bo Nix',18.2]]};
function sh(a){a=a.slice();for(var i=a.length-1;i;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function css(){if(document.getElementById('turfCases8918Css'))return;var s=document.createElement('style');s.id='turfCases8918Css';s.textContent=`
#turfCases8918{position:fixed;inset:0;z-index:1000004;background:#02070bdc;display:grid;place-items:center;padding:18px}
#turfCases8918 .tc-modal{width:min(1110px,96vw);max-height:92vh;overflow:auto;border:1px solid #28536a;border-radius:22px;background:#0b1116;color:#eef8ff;box-shadow:0 35px 90px #000b}
#turfCases8918 .tc-head{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #283c47;background:#0d151b}
#turfCases8918 .tc-head h2{margin:0;font:950 28px/1 system-ui;letter-spacing:.01em}
#turfCases8918 .tc-x{width:40px;height:40px;border:0;border-radius:50%;background:#e52532;color:#fff;font:950 24px/1 system-ui;cursor:pointer}
#turfCases8918 .tc-body{padding:28px 24px 22px}
#turfCases8918 .tc-intro{text-align:center;color:#9eb0ba;font:700 12px/1.35 system-ui;margin:0 0 18px}
#turfCases8918 .tc-layout{display:grid;grid-template-columns:265px 1fr;gap:24px;align-items:start}
#turfCases8918 .tc-board{border:1px solid #314852;border-radius:15px;background:#10191f;padding:10px 12px}
#turfCases8918 .tc-row{display:flex;justify-content:space-between;gap:12px;padding:8px 9px;border-bottom:1px solid #24343d;font:800 12px/1.2 system-ui;transition:.15s}
#turfCases8918 .tc-row.elim{opacity:.32;text-decoration:line-through;text-decoration-thickness:2px}
#turfCases8918 .tc-main{min-width:0}
#turfCases8918 .tc-topline{display:flex;align-items:flex-start;justify-content:space-between;min-height:70px;margin-bottom:8px}
#turfCases8918 .tc-status{flex:1;text-align:center;color:#9caab2;font:850 14px/1.2 system-ui;padding-top:24px}
#turfCases8918 .tc-mycase{width:110px;text-align:center;visibility:hidden}
#turfCases8918 .tc-mycase.show{visibility:visible}
#turfCases8918 .tc-mycase-label{color:#9caab2;font:900 10px/1 system-ui;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
#turfCases8918 .tc-mycase-box{height:46px;border:2px solid #29c9ff;border-radius:10px;display:grid;place-items:center;color:#ffd95f;background:linear-gradient(#4c390f,#181b1e);font:950 20px/1 system-ui;box-shadow:0 0 0 2px #29c9ff22}
#turfCases8918 .tc-cases{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:14px}
#turfCases8918 .tc-case{min-height:94px;border:1px solid #b58e20;border-radius:12px;background:linear-gradient(#4d3a0f,#171a1d);color:#ffd85f;font:950 25px/1 system-ui;cursor:pointer;transition:.15s}
#turfCases8918 .tc-case:hover{transform:translateY(-1px);border-color:#e5bd45}
#turfCases8918 .tc-case.owned{outline:3px solid #29c9ff;outline-offset:1px}
#turfCases8918 .tc-case.open{background:#192127;border-color:#38464e;color:#8a969c;font-size:17px;cursor:default}
#turfCases8918 .tc-reveal{text-align:center;min-height:26px;margin-top:14px;color:#d8e2e7;font:800 14px/1.3 system-ui}
#turfCases8918 .tc-lineup{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:20px}
#turfCases8918 .tc-slot{padding:13px;border:1px solid #315162;border-radius:12px;background:#101a20;text-align:center;min-height:42px}
#turfCases8918 .tc-slot b{display:block;color:#6edcff;margin-bottom:4px}
#turfCases8918 .tc-finish{text-align:center;padding:18px 0 8px}.tc-total{font:950 38px/1 system-ui;margin-top:18px}
@media(max-width:800px){#turfCases8918 .tc-layout{grid-template-columns:1fr}#turfCases8918 .tc-cases{grid-template-columns:repeat(2,1fr)}#turfCases8918 .tc-topline{min-height:58px}}
`;document.head.appendChild(s)}
function close(){var m=document.getElementById('turfCases8918');if(m)m.remove()}
function openGame(){css();close();var m=document.createElement('div');m.id='turfCases8918';m.innerHTML='<div class="tc-modal"><div class="tc-head"><h2 id="tcTitle">Cases • Round 1: RB</h2><button class="tc-x">×</button></div><div id="tcBody" class="tc-body"></div></div>';document.body.appendChild(m);m.querySelector('.tc-x').onclick=close;m.addEventListener('click',function(e){if(e.target===m)close()});run(m)}
function run(m){var round=0,lineup={};function roundUI(){var pos=POS[round],players=sh(DATA[pos]),owned=null,opened={},left=9;document.getElementById('tcTitle').textContent='Cases • Round '+(round+1)+': '+pos;var body=m.querySelector('#tcBody');var sorted=players.slice().sort(function(a,b){return b[1]-a[1]});body.innerHTML='<p class="tc-intro">Choose your case. Then eliminate the other cases. Your final case becomes your '+pos+'.</p><div class="tc-layout"><div class="tc-board">'+sorted.map(function(p){return '<div class="tc-row" data-player="'+esc(p[0])+'"><span>'+esc(p[0])+'</span><b>'+p[1].toFixed(1)+'</b></div>'}).join('')+'</div><div class="tc-main"><div class="tc-topline"><div id="tcStatus" class="tc-status">Choose your case</div><div id="tcMyCase" class="tc-mycase"><div class="tc-mycase-label">My Case</div><div id="tcMyCaseBox" class="tc-mycase-box">—</div></div></div><div class="tc-cases">'+players.map(function(p,i){return '<button class="tc-case" data-case="'+i+'">'+(i+1)+'</button>'}).join('')+'</div><div id="tcReveal" class="tc-reveal"></div></div></div><div class="tc-lineup">'+POS.map(function(p){return '<div class="tc-slot"><b>'+p+'</b>'+(lineup[p]?esc(lineup[p][0])+'<br><small>'+lineup[p][1].toFixed(1)+' proj</small>':'—')+'</div>'}).join('')+'</div>';
var stat=body.querySelector('#tcStatus'),my=body.querySelector('#tcMyCase'),mybox=body.querySelector('#tcMyCaseBox'),reveal=body.querySelector('#tcReveal');
body.querySelectorAll('[data-case]').forEach(function(btn){btn.onclick=function(){var i=+btn.dataset.case;if(opened[i])return;if(owned===null){owned=i;btn.classList.add('owned');my.classList.add('show');mybox.textContent=i+1;stat.textContent=left+' remaining cases';return}if(i===owned)return;opened[i]=true;btn.classList.add('open');btn.innerHTML=esc(players[i][0])+'<br><small>'+players[i][1].toFixed(1)+'</small>';var row=body.querySelector('.tc-row[data-player="'+CSS.escape(players[i][0])+'"]');if(row)row.classList.add('elim');left--;stat.textContent=left+' remaining case'+(left===1?'':'s');reveal.textContent='Eliminated: '+players[i][0]+' ('+players[i][1].toFixed(1)+')';if(left<=0){lineup[pos]=players[owned];setTimeout(function(){round++;if(round<POS.length)roundUI();else finish()},850)}}})}
function finish(){var total=POS.reduce(function(s,p){return s+(lineup[p]?lineup[p][1]:0)},0),body=m.querySelector('#tcBody');document.getElementById('tcTitle').textContent='Cases • Lineup Complete';body.innerHTML='<div class="tc-finish"><h3 style="font:950 30px/1 system-ui;margin:0 0 8px">LINEUP LOCKED</h3><div style="color:#9eb0ba;font:700 12px system-ui">Your four-case lineup is complete.</div></div><div class="tc-lineup">'+POS.map(function(p){return '<div class="tc-slot"><b>'+p+'</b>'+esc(lineup[p][0])+'<br><small>'+lineup[p][1].toFixed(1)+' projected</small></div>'}).join('')+'</div><div class="tc-finish"><div class="tc-total">'+total.toFixed(1)+'</div><div style="color:#9eb0ba;font:800 11px system-ui;letter-spacing:.1em">TOTAL PROJECTION</div></div>'}
roundUI()}
function isCasesTarget(el){if(!el)return false;var t=(el.textContent||'').trim().replace(/\s+/g,' ');return t==='Cases'||(el.closest&&el.closest('[data-turf-new="deal"]'))}
document.addEventListener('click',function(e){var el=e.target.closest('button,a,[role="button"]');if(!isCasesTarget(el))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openGame()},true);
})();
