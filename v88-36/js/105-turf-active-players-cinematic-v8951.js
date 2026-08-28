/* ============================================================
   TURF v89.53 — ACTIVE PLAYERS APPROVED CINEMATIC PAGE
   Exact approved composition: one full-screen game, custom HUD,
   football silhouettes with electric-blue rim light, four stat cards,
   centered hero, native Daily/Unlimited + guessing logic, and table.
   Loading/auth flows are untouched.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_APPROVED_V8953__)return;
window.__TURF_ACTIVE_PLAYERS_APPROVED_V8953__=true;

var BRAND='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-app-icon-v8953.png?v=8953';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function visible(el){if(!el)return false;var s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'&&el.getClientRects().length>0}
function isOpen(){var o=overlay();if(!o)return false;return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||visible(o)}
function isPlayers(){
  var o=overlay();if(!o||!isOpen())return false;
  var active=q('.fg-mode.active[data-fg-mode]',o);if(active&&active.dataset&&active.dataset.fgMode)return active.dataset.fgMode==='players';
  var t=tx(o).toUpperCase();return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/.test(t);
}
function playerSvg(side){
  var flip=side==='right'?'scale(-1,1)':'';
  return '<svg class="turf8953-player '+side+'" viewBox="0 0 420 560" aria-hidden="true" style="transform:'+flip+'">'+
  '<defs><filter id="rim'+side+'" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'+
  '<g filter="url(#rim'+side+')" fill="#01070d" stroke="#139eff" stroke-width="4" stroke-linejoin="round">'+
  '<path d="M201 33c-48 0-87 38-87 86 0 17 5 33 14 47l-14 18-2 38 24 18 7 40-36 58-35 17-25 47 8 51 34-8 27-38 43-28 8 53-22 92 57 18 47-88 28 78 59-17-23-93 3-63 49 38 26 39 35 8 8-51-26-47-36-17-44-62 8-32 25-20-3-41-15-18c10-15 15-32 15-51 0-48-39-86-87-86z"/>'+
  '<path d="M129 104c18-36 51-55 90-55 39 0 72 19 89 55l-9 55-32 20-101 0-30-20z"/>'+
  '<path d="M142 101h-24v75h26l14-12v-51zM296 101h24v75h-26l-14-12v-51z"/>'+
  '<path d="M164 175h111l22 43-21 30-115 0-20-31z" stroke="#39c8ff"/>'+
  '<path d="M168 251l-53 92 39 24 57-74 57 74 39-24-54-92z" stroke="#0a80e9"/>'+
  '</g></svg>';
}
function addCss(){
  if(q('#turf8953ApprovedCss'))return;
  var s=document.createElement('style');s.id='turf8953ApprovedCss';s.textContent=`
body.turf8953-players{overflow:hidden!important;background:#01060b!important}
body.turf8953-players #fhqSidebar,body.turf8953-players .fhq-sidebar,body.turf8953-players #turfTopbar,body.turf8953-players #fhqMobileTopbar,body.turf8953-players #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8953-players #fhqMain,body.turf8953-players .fhq-main,body.turf8953-players .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.turf8953-players #footballGameOverlay,body.turf8953-players .football-game-overlay,body.turf8953-players .fg-game-overlay{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;z-index:2147482000!important;overflow:auto!important;display:block!important;background:radial-gradient(circle at 50% 31%,rgba(0,139,255,.30),transparent 25%),radial-gradient(circle at 8% 30%,rgba(0,119,255,.22),transparent 24%),radial-gradient(circle at 92% 28%,rgba(0,119,255,.20),transparent 24%),linear-gradient(180deg,#020810 0%,#03111d 45%,#01070d 100%)!important}
body.turf8953-players #footballGameOverlay:before{content:''!important;display:block!important;position:absolute!important;inset:0!important;pointer-events:none!important;background:repeating-linear-gradient(166deg,rgba(45,168,255,.040) 0 1px,transparent 1px 39px),radial-gradient(ellipse at 50% 65%,transparent 0 52%,rgba(0,0,0,.46) 100%)!important;z-index:0!important}
body.turf8953-players #footballGameOverlay .football-game-shell{position:relative!important;inset:auto!important;transform:none!important;width:100%!important;max-width:none!important;min-height:100vh!important;margin:0!important;padding:0 0 34px!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;z-index:2!important}
body.turf8953-players #footballGameOverlay .fg-head,body.turf8953-players #footballGameOverlay .fg-modes{display:none!important}
#turf8953Hud{position:relative;z-index:60;height:84px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 24px;box-sizing:border-box}
#turf8953Back{justify-self:start;height:48px;min-width:168px;padding:0 18px;border-radius:13px;border:1px solid #17658e;background:rgba(4,17,28,.88);color:#fff;font:950 12px/1 system-ui;letter-spacing:.08em;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.28)}
#turf8953Brand{justify-self:center;display:flex;align-items:center;gap:13px;color:#fff;font:500 22px/1 system-ui;letter-spacing:.24em}
#turf8953Brand img{width:38px;height:38px;border-radius:5px;object-fit:cover;filter:drop-shadow(0 0 14px rgba(30,171,255,.46))}
#turf8953Wallet{justify-self:end;display:flex;gap:10px;align-items:center}
.turf8953-pill{height:44px;display:flex;align-items:center;gap:9px;padding:0 14px;border:1px solid #175b80;border-radius:13px;background:rgba(3,18,30,.88);color:#fff;font:900 11px/1 system-ui;letter-spacing:.04em}.turf8953-pill .small{display:block;color:#52c8ff;font-size:9px;letter-spacing:.08em}.turf8953-pill.coin{min-width:136px}.turf8953-pill.soon{min-width:74px;justify-content:center}.turf8953-dot{width:17px;height:17px;border-radius:50%;background:#24df83;box-shadow:0 0 14px #20df83}.turf8953-gem{width:18px;height:18px;transform:rotate(45deg);border-radius:4px;background:linear-gradient(135deg,#9b59ff,#4b1ecf);box-shadow:0 0 14px #7b45ff}.turf8953-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:12px;border:1px solid #175b80;background:rgba(3,18,30,.88);font-size:18px}
#turf8953Stage{position:relative;z-index:5;min-height:470px;margin-top:-6px;overflow:hidden}
#turf8953Stage:before{content:'';position:absolute;left:0;right:0;bottom:0;height:52%;background:linear-gradient(180deg,transparent,rgba(1,7,12,.45)),repeating-linear-gradient(90deg,rgba(121,205,255,.035) 0 1px,transparent 1px 8%);pointer-events:none}
#turf8953Stage .turf8953-player{position:absolute;top:-18px;width:min(28vw,390px);height:auto;opacity:.96;filter:drop-shadow(0 0 13px rgba(0,143,255,.45)) drop-shadow(0 0 32px rgba(0,96,220,.26));z-index:2}
#turf8953Stage .turf8953-player.left{left:7%}#turf8953Stage .turf8953-player.right{right:7%}
#turf8953Title{position:relative;z-index:9;text-align:center;padding-top:36px;pointer-events:none}
#turf8953Title .active{font:1000 clamp(72px,7.1vw,126px)/.73 Impact,'Arial Black',system-ui,sans-serif;font-style:italic;letter-spacing:-.025em;color:#f6f9fc;text-shadow:0 5px 0 #7a98ad,0 0 22px rgba(219,246,255,.75),0 0 58px rgba(0,149,255,.28);transform:skewX(-4deg)}
#turf8953Title .players{margin-top:5px;font:1000 clamp(70px,7.2vw,128px)/.70 Impact,'Arial Black',system-ui,sans-serif;font-style:italic;letter-spacing:-.035em;color:#14b7ff;text-shadow:0 5px 0 #0069ae,0 0 24px #00a8ff,0 0 64px rgba(0,153,255,.72);transform:skewX(-7deg)}
#turf8953Title .sub{margin-top:26px;color:#c8d4dd;font:750 16px/1.2 system-ui}
#turf8953Cards{position:absolute;inset:0;z-index:8;pointer-events:none}.turf8953-card{position:absolute;width:220px;height:102px;box-sizing:border-box;border:1px solid #0a8ed1;border-radius:9px;background:linear-gradient(145deg,rgba(3,27,43,.93),rgba(2,12,22,.88));box-shadow:inset 0 0 22px rgba(0,145,255,.08),0 0 22px rgba(0,120,220,.10);padding:18px 16px 14px 82px;color:#fff}.turf8953-card:before,.turf8953-card:after{content:'';position:absolute;width:28px;height:10px;border-color:#16baff;border-style:solid}.turf8953-card:before{left:-1px;top:-1px;border-width:2px 0 0 2px}.turf8953-card:after{right:-1px;bottom:-1px;border-width:0 2px 2px 0}.turf8953-card .ico{position:absolute;left:23px;top:31px;font-size:33px;color:#26c7ff}.turf8953-card .label{font:900 10px/1 system-ui;color:#34c8ff;letter-spacing:.06em}.turf8953-card .value{margin-top:8px;font:1000 22px/1 system-ui}.turf8953-card .foot{margin-top:7px;font:900 10px/1 system-ui;color:#37c8ff;letter-spacing:.03em}.turf8953-card.l1{left:3.7%;top:205px}.turf8953-card.l2{left:3.7%;top:330px}.turf8953-card.r1{right:3.7%;top:205px}.turf8953-card.r2{right:3.7%;top:330px}
body.turf8953-players #footballGameOverlay .fg-toolbar{position:absolute!important;left:50%!important;top:345px!important;transform:translateX(-50%)!important;z-index:25!important;display:flex!important;justify-content:center!important;gap:14px!important;padding:0!important;margin:0!important;background:transparent!important;border:0!important;width:auto!important}
body.turf8953-players #footballGameOverlay .fg-playtype{min-height:54px!important;padding:0 28px!important;border-radius:13px!important;background:#091725!important;border:1px solid #30465b!important;color:#c9d4df!important;font-weight:950!important;font-size:13px!important;letter-spacing:.04em!important}
body.turf8953-players #footballGameOverlay .fg-playtype.active{background:linear-gradient(180deg,#22c5ff,#0874c7)!important;border-color:#5be0ff!important;color:#fff!important;box-shadow:0 0 24px rgba(0,176,255,.38)!important}
body.turf8953-players #footballGameOverlay .fg-body{position:relative!important;z-index:20!important;width:min(1240px,calc(100% - 72px))!important;max-width:1240px!important;margin:-78px auto 0!important;padding:0 0 32px!important;background:transparent!important}
body.turf8953-players #footballGameOverlay #fgSpecialGame,body.turf8953-players #footballGameOverlay .fg-special-game{position:relative!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
body.turf8953-players #footballGameOverlay .fg-special-title,body.turf8953-players #footballGameOverlay .fg-game-title,body.turf8953-players #footballGameOverlay .fg-special-sub,body.turf8953-players #footballGameOverlay .fg-game-sub{display:none!important}
body.turf8953-players #footballGameOverlay .fg-input-row,body.turf8953-players #footballGameOverlay .fg-guess-row{width:min(830px,72%)!important;margin:0 auto 18px!important;position:relative!important;z-index:40!important}
body.turf8953-players #footballGameOverlay #fgInput{height:62px!important;border-radius:13px 0 0 13px!important;border:1px solid #18a3ef!important;background:rgba(2,16,28,.96)!important;color:#fff!important;font-size:19px!important;padding-left:22px!important;box-shadow:0 0 28px rgba(0,141,230,.16)!important}
body.turf8953-players #footballGameOverlay #fgGuessBtn{min-width:168px!important;height:62px!important;border-radius:0 13px 13px 0!important;border:1px solid #78e5ff!important;background:linear-gradient(180deg,#2bc9ff,#0674d2)!important;color:#fff!important;font-size:20px!important;font-weight:1000!important;box-shadow:0 0 32px rgba(0,176,255,.55)!important}
body.turf8953-players #footballGameOverlay table{width:100%!important;margin:0 auto!important;background:rgba(2,12,22,.92)!important;border:1px solid rgba(73,133,171,.35)!important;border-radius:16px!important;overflow:hidden!important;box-shadow:0 22px 55px rgba(0,0,0,.32)!important}
body.turf8953-players #footballGameOverlay th{height:55px!important;background:rgba(5,20,32,.97)!important;color:#b8c4ce!important;font-size:11px!important;letter-spacing:.08em!important;text-transform:uppercase!important;border-bottom:1px solid rgba(67,118,151,.28)!important}
body.turf8953-players #footballGameOverlay td{border-color:rgba(94,151,184,.14)!important}
#turf8953Empty{min-height:142px;margin-top:-1px;border:1px solid rgba(65,123,158,.26);border-top:0;border-radius:0 0 15px 15px;background:rgba(2,12,22,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff}.turf8953-target{width:46px;height:46px;border-radius:50%;border:2px solid #0faeff;position:relative;margin-bottom:12px;box-shadow:0 0 20px rgba(0,160,255,.28)}.turf8953-target:before,.turf8953-target:after{content:'';position:absolute;background:#0faeff}.turf8953-target:before{left:21px;top:-9px;width:2px;height:64px}.turf8953-target:after{top:21px;left:-9px;width:64px;height:2px}#turf8953Empty strong{font:950 15px/1 system-ui}#turf8953Empty span{margin-top:10px;color:#aebdca;font:600 12px/1 system-ui}
#turf8953Legend{height:48px;margin-top:10px;border:1px solid rgba(68,126,160,.32);border-radius:12px;background:rgba(2,12,22,.90);display:flex;align-items:center;justify-content:center;gap:46px;color:#aeb9c3;font:600 11px/1 system-ui}#turf8953Legend i{display:inline-block;width:15px;height:15px;border-radius:50%;margin-right:8px;vertical-align:-3px}#turf8953Legend .g{background:#35dd85}#turf8953Legend .y{background:#f4c532}#turf8953Legend .x{background:#aab9cb}
#turf8953Ball{position:fixed;right:-82px;bottom:-58px;width:310px;height:210px;border-radius:48%;transform:rotate(-28deg);z-index:3;pointer-events:none;background:repeating-linear-gradient(62deg,#0b151d 0 5px,#03090e 5px 10px);box-shadow:-22px -20px 70px rgba(19,150,255,.18);opacity:.95}#turf8953Ball:before{content:'';position:absolute;left:76px;top:81px;width:118px;height:8px;background:#263945;border-radius:8px;box-shadow:0 -18px 0 -2px #263945,0 18px 0 -2px #263945}
body.turf8953-players #turf8951Brand,body.turf8953-players #turf8951Back,body.turf8953-players #turf8951Atmosphere,body.turf8953-players #turf8952Brand,body.turf8953-players #turf8952Hero{display:none!important}
body.turf8953-players .turf8951-active-page{position:relative!important;inset:auto!important;z-index:auto!important;padding:0!important;background:transparent!important;isolation:auto!important}body.turf8953-players .turf8951-active-page:before,body.turf8953-players .turf8951-active-page:after{display:none!important}
@media(max-width:1050px){#turf8953Wallet .turf8953-pill.soon,#turf8953Wallet .turf8953-icon:nth-last-child(-n+2){display:none}.turf8953-card{transform:scale(.86)}.turf8953-card.l1,.turf8953-card.l2{left:1%}.turf8953-card.r1,.turf8953-card.r2{right:1%}#turf8953Stage .turf8953-player{opacity:.62}}
@media(max-width:800px){#turf8953Hud{padding:0 12px}#turf8953Back{min-width:122px;height:40px;padding:0 10px;font-size:10px}#turf8953Brand span{display:none}#turf8953Wallet{display:none}#turf8953Stage{min-height:405px}#turf8953Stage .turf8953-player{opacity:.28;width:42vw}.turf8953-card{display:none!important}body.turf8953-players #footballGameOverlay .fg-toolbar{top:308px!important}body.turf8953-players #footballGameOverlay .fg-body{width:calc(100% - 24px)!important;margin-top:-58px!important}body.turf8953-players #footballGameOverlay .fg-input-row,body.turf8953-players #footballGameOverlay .fg-guess-row{width:100%!important}body.turf8953-players #footballGameOverlay #fgGuessBtn{min-width:110px!important}#turf8953Legend{gap:10px;font-size:9px;padding:0 8px}}
`;(document.head||document.documentElement).appendChild(s);
}
function closeGame(){var o=overlay();if(!o)return;var c=q('.fg-close',o);if(c){c.click();return}o.classList.remove('open','active');o.setAttribute('aria-hidden','true')}
function build(){
  addCss();var o=overlay(),on=isPlayers();document.body.classList.toggle('turf8953-players',on);if(!o)return;
  if(!on){['turf8953Hud','turf8953Stage','turf8953Empty','turf8953Legend','turf8953Ball'].forEach(function(id){var e=q('#'+id);if(e)e.remove()});return}
  var shell=q('.football-game-shell',o)||o;
  if(!q('#turf8953Hud',shell)){
    var hud=document.createElement('div');hud.id='turf8953Hud';hud.innerHTML='<button id="turf8953Back" type="button">←&nbsp;&nbsp; BACK TO GAMES</button><div id="turf8953Brand"><img src="'+BRAND+'" alt=""><span>TURF</span></div><div id="turf8953Wallet"><div class="turf8953-pill coin">🪙<div><span class="small">TURF COINS</span>151410</div></div><div class="turf8953-pill soon"><span class="turf8953-dot"></span>SOON</div><div class="turf8953-pill soon"><span class="turf8953-gem"></span>SOON</div><div class="turf8953-icon">🏆</div><div class="turf8953-icon">🔔</div><div class="turf8953-icon"><img src="'+BRAND+'" alt="" style="width:24px;height:24px;border-radius:50%"></div><div class="turf8953-icon">☰</div></div>';shell.insertBefore(hud,shell.firstChild);q('#turf8953Back',hud).addEventListener('click',closeGame)
  }
  if(!q('#turf8953Stage',shell)){
    var stage=document.createElement('section');stage.id='turf8953Stage';stage.innerHTML=playerSvg('left')+playerSvg('right')+'<div id="turf8953Title"><div class="active">ACTIVE</div><div class="players">PLAYERS</div><div class="sub">Guess the current NFL player in eight guesses.</div></div><div id="turf8953Cards"><div class="turf8953-card l1"><div class="ico">♙</div><div class="label">ACTIVE PLAYERS</div><div class="value">2,143</div><div class="foot">IN THE NFL</div></div><div class="turf8953-card l2"><div class="ico">↗</div><div class="label">UPDATED DAILY</div><div class="value">24h</div><div class="foot">ACCURATE DATA</div></div><div class="turf8953-card r1"><div class="ico">🏆</div><div class="label">TOP SCORE</div><div class="value">8 GUESSES</div><div class="foot">THIS WEEK</div></div><div class="turf8953-card r2"><div class="ico">▥</div><div class="label">YOUR RANK</div><div class="value">#1,248</div><div class="foot">TOP 12%</div></div></div>';var toolbar=q('.fg-toolbar',shell);if(toolbar)toolbar.parentNode.insertBefore(stage,toolbar);else shell.appendChild(stage)
  }
  var game=q('#fgSpecialGame',o)||q('.fg-special-game',o);if(game){
    var table=q('table',game);
    if(table&&!q('#turf8953Empty',game)){var empty=document.createElement('div');empty.id='turf8953Empty';empty.innerHTML='<div class="turf8953-target"></div><strong>Make your first guess!</strong><span>Each guess reveals more information.</span>';table.insertAdjacentElement('afterend',empty)}
    if(!q('#turf8953Legend',game)){var leg=document.createElement('div');leg.id='turf8953Legend';leg.innerHTML='<span><i class="g"></i>Green = exact match</span><span><i class="y"></i>Yellow = same side of the ball or another division in the same conference</span><span><i class="x"></i>Gray = different conference / no match</span>';game.appendChild(leg)}
  }
  if(!q('#turf8953Ball')){var ball=document.createElement('div');ball.id='turf8953Ball';document.body.appendChild(ball)}
  var nativeClose=q('.fg-close',o);if(nativeClose)nativeClose.style.setProperty('display','none','important');
  var historyRows=game?qa('tbody tr',game):[];var empty=q('#turf8953Empty');if(empty)empty.style.display=historyRows.length?'none':'flex';
}
function schedule(){[0,40,100,220,500,900].forEach(function(ms){setTimeout(build,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-game-open],#footballGameOverlay,.fg-game-overlay,.fg-mode,.fg-playtype,#fgGuessBtn'))schedule()},true);
window.addEventListener('resize',build);
var z;new MutationObserver(function(){clearTimeout(z);z=setTimeout(build,35)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','style']});
})();
