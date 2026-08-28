/* ============================================================
   TURF V89.72 — ACTIVE PLAYERS APPROVED SCREEN REBUILD
   Recreates the approved Active Players destination as live DOM.
   Native game controls are re-parented into the approved layout so
   guessing, suggestions, Daily/Unlimited and result rows remain real.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_8972__)return;
window.__TURF_ACTIVE_PLAYERS_8972__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function homeActive(){var rs=[q('#fhqSidebar'),q('.fhq-sidebar'),q('nav')].filter(Boolean);for(var i=0;i<rs.length;i++){var ns=qa('.active,.selected,[aria-current="page"],[data-active="true"]',rs[i]);for(var j=0;j<ns.length;j++)if(/^HOME$/i.test(tx(ns[j]).replace(/^🏠\s*/,'')))return true}return false}
function open(o){if(!o||homeActive())return false;if(o.getAttribute('aria-hidden')==='true')return false;return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||o.classList.contains('show')}
function players(o){if(!o)return false;var m=q('.fg-mode.active[data-fg-mode]',o);if(m&&m.dataset&&m.dataset.fgMode)return m.dataset.fgMode==='players';return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(tx(o))}
function should(){var o=overlay();return !!(o&&open(o)&&players(o))}

var moved=[];
function move(node,parent){if(!node||!parent)return;var mark=document.createComment('turf8972');node.parentNode&&node.parentNode.insertBefore(mark,node);moved.push({node:node,mark:mark});parent.appendChild(node)}
function restoreMoved(){for(var i=moved.length-1;i>=0;i--){var x=moved[i];try{if(x.mark&&x.mark.parentNode)x.mark.parentNode.insertBefore(x.node,x.mark);if(x.mark&&x.mark.parentNode)x.mark.remove()}catch(e){}}moved=[]}

function liveCoins(){var e=q('#fhqGlobalCoins')||q('[data-turf-coins]');var t=tx(e).replace(/[^\d,]/g,'');return t||'151410'}
function liveRank(){var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];for(var i=0;i<sels.length;i++){var e=q(sels[i]);if(!e)continue;var t=tx(e),m=t.match(/#\s*([\d,]+)/)||t.match(/rank\D*([\d,]+)/i);if(m)return '#'+m[1]}return '#1,248'}
function liveTop(){var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];for(var i=0;i<sels.length;i++){var e=q(sels[i]);if(!e)continue;var m=tx(e).match(/top\s*([\d.]+%)/i);if(m)return 'TOP '+m[1]}return 'TOP 12%'}

function css(){if(q('#turf8972Css'))return;var s=document.createElement('style');s.id='turf8972Css';s.textContent=`
body.turf8972-players{overflow:hidden!important;background:#020913!important}
body.turf8972-players #fhqSidebar,body.turf8972-players .fhq-sidebar,body.turf8972-players #turfTopbar,body.turf8972-players #fhqMobileTopbar,body.turf8972-players #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8972-players #fhqMain,body.turf8972-players .fhq-main,body.turf8972-players .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.turf8972-players #footballGameOverlay,body.turf8972-players .football-game-overlay,body.turf8972-players .fg-game-overlay{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;background:#020913!important;z-index:2147482500!important}
body.turf8972-players #footballGameOverlay .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;min-height:0!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:hidden!important;transform:none!important}
body.turf8972-players #footballGameOverlay>.football-game-shell>*:not(#turf8972Screen){visibility:hidden!important;pointer-events:none!important}
body.turf8972-players #turf8972Screen,body.turf8972-players #turf8972Screen *{visibility:visible!important}
#turf8972Screen{display:none}
body.turf8972-players #turf8972Screen{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;z-index:2147482800!important;color:#fff!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;overflow:hidden!important;background:
 radial-gradient(ellipse at 50% 112%,rgba(15,79,137,.36),transparent 48%),
 radial-gradient(circle at 8% 28%,rgba(0,153,255,.29),transparent 18%),
 radial-gradient(circle at 78% 19%,rgba(0,139,255,.28),transparent 20%),
 linear-gradient(180deg,#020812 0%,#06172a 58%,#020913 100%)!important}
body.turf8972-players #turf8972Screen:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.72;background:
 linear-gradient(115deg,transparent 0 12%,rgba(0,159,255,.11) 12.15%,transparent 12.5% 23%,rgba(0,141,255,.1) 23.15%,transparent 23.5% 100%),
 repeating-linear-gradient(164deg,transparent 0 48px,rgba(38,146,222,.08) 49px,transparent 50px 82px)}
body.turf8972-players #turf8972Screen:after{content:"";position:absolute;left:0;right:0;bottom:0;height:37%;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(0,0,0,.25)),repeating-linear-gradient(0deg,rgba(27,59,85,.13) 0 2px,transparent 2px 9px);clip-path:polygon(0 38%,100% 0,100% 100%,0 100%)}
.t8972-top{position:absolute;left:1.1%;right:1.1%;top:2.1%;height:6.1%;z-index:20;display:flex;align-items:center;justify-content:space-between}
.t8972-back{height:100%;min-width:14.3%;border:1px solid #09b8ff;border-radius:15px;background:rgba(3,13,23,.78);color:#fff;font-weight:900;font-size:clamp(11px,1vw,17px);letter-spacing:.08em;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:inset 0 0 18px rgba(0,159,255,.08);cursor:pointer}.t8972-back i{font-style:normal;font-size:24px}
.t8972-brand{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:17px;letter-spacing:.24em;font-size:clamp(20px,2vw,34px);font-weight:500}.t8972-mark{width:43px;height:43px;border-radius:7px;background:linear-gradient(145deg,#18b8ff,#07162a 58%);display:grid;place-items:center;font-style:italic;font-weight:1000;font-size:30px;box-shadow:0 0 22px rgba(0,171,255,.42)}
.t8972-actions{height:100%;display:flex;gap:10px;align-items:center}.t8972-pill,.t8972-icon{height:100%;box-sizing:border-box;border:1px solid #08b7ff;border-radius:14px;background:rgba(3,13,23,.82);display:flex;align-items:center;justify-content:center}.t8972-coins{min-width:182px;gap:11px;padding:0 16px}.t8972-coins b{font-size:17px}.t8972-coins small{display:block;color:#25d8ff;font-weight:900;font-size:11px;letter-spacing:.05em}.t8972-soon{min-width:98px;gap:8px;color:#9cffb8;font-weight:900;font-size:11px;letter-spacing:.06em}.t8972-purple{border-color:#7b39d7;color:#c0a0ff}.t8972-icon{width:48px;font-size:22px}.t8972-menu{font-size:25px}
.t8972-hero{position:absolute;left:0;right:0;top:8%;height:48%;z-index:5;overflow:hidden}
.t8972-player{position:absolute;top:0;width:31%;height:100%;filter:drop-shadow(0 0 26px rgba(0,125,255,.5));opacity:.94}.t8972-player:before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,#02070d 15%,#071525 58%,#01050a);clip-path:polygon(28% 5%,54% 2%,67% 9%,72% 24%,70% 37%,78% 49%,82% 91%,54% 99%,28% 92%,21% 66%,23% 38%,14% 31%,16% 15%)}.t8972-player:after{content:"";position:absolute;left:36%;top:1%;width:29%;aspect-ratio:1;border-radius:50%;background:#02060b;box-shadow:0 0 0 5px rgba(0,144,255,.11)}.t8972-left{left:-2%;transform:scale(1.18)}.t8972-right{right:-2%;transform:scaleX(-1) scale(1.16)}
.t8972-center{position:absolute;left:50%;top:8%;transform:translateX(-50%);width:58%;text-align:center;z-index:10}.t8972-title1{font-size:clamp(52px,7vw,106px);font-weight:1000;line-height:.78;letter-spacing:.02em;font-style:italic;color:#f6fbff;text-shadow:0 4px 0 #b9c9d7,0 7px 14px #000}.t8972-title2{margin-top:11px;font-size:clamp(54px,6.2vw,98px);font-weight:1000;font-style:italic;line-height:.72;letter-spacing:-.03em;color:#10aaff;text-shadow:0 0 18px rgba(0,157,255,.75),0 6px 0 #005fa0;transform:skew(-8deg)}.t8972-sub{margin-top:31px;font-size:clamp(14px,1.25vw,20px);font-weight:800;color:#dce8f3}
.t8972-sidecard{position:absolute;top:18%;width:14.5%;height:11.4%;z-index:12;border:1px solid #08baff;background:linear-gradient(180deg,rgba(4,25,42,.92),rgba(2,13,23,.95));box-shadow:0 0 23px rgba(0,153,255,.15);clip-path:polygon(6% 0,94% 0,100% 14%,100% 86%,94% 100%,6% 100%,0 86%,0 14%);display:flex;align-items:center;padding:0 1.5%;box-sizing:border-box}.t8972-sidecard.left{left:3.1%}.t8972-sidecard.right{right:3.1%}.t8972-sidecard.lower{top:33%}.t8972-sidecard .ico{font-size:37px;margin-right:18px;color:#22d7ff}.t8972-sidecard.gold .ico{color:#ffc400}.t8972-sidecard .ey{color:#23d9ff;font-size:11px;font-weight:1000;letter-spacing:.04em}.t8972-sidecard .big{font-size:clamp(20px,1.8vw,31px);font-weight:1000;line-height:1.15;margin-top:5px}.t8972-sidecard .sm{color:#25d9ff;font-size:11px;font-weight:900;margin-top:5px;letter-spacing:.04em}
.t8972-playtypes{position:absolute;left:36.4%;top:43.7%;width:27.2%;height:6%;z-index:31;display:flex!important;gap:12px!important;padding:0!important;margin:0!important;background:transparent!important;border:0!important}.t8972-playtypes .fg-playtype{display:flex!important;align-items:center!important;justify-content:center!important;flex:1 1 0!important;height:100%!important;margin:0!important;padding:0 18px!important;border-radius:13px!important;border:1px solid #496071!important;background:#07121e!important;color:#c7d2dc!important;font-size:clamp(11px,.92vw,15px)!important;font-weight:1000!important;letter-spacing:.04em!important;opacity:1!important;pointer-events:auto!important;cursor:pointer!important;box-shadow:none!important}.t8972-playtypes .fg-playtype.active{border-color:#19c6ff!important;background:linear-gradient(180deg,#20b9f1,#128ac8)!important;color:#fff!important;box-shadow:0 0 25px rgba(0,180,255,.34)!important}
.t8972-inputrow{position:absolute;left:24.5%;top:52.2%;width:52.8%;height:8.5%;z-index:32;display:flex;border:1px solid #0cbaff;border-radius:17px;background:rgba(2,13,23,.92);box-shadow:0 0 24px rgba(0,151,255,.16);overflow:visible}.t8972-inputrow #fgInput{box-sizing:border-box!important;flex:1 1 auto!important;min-width:0!important;height:100%!important;margin:0!important;padding:0 26px!important;border:0!important;border-radius:17px 0 0 17px!important;background:transparent!important;color:#eaf5ff!important;font-size:clamp(18px,1.5vw,25px)!important;font-weight:500!important;outline:none!important;box-shadow:none!important}.t8972-inputrow #fgInput::placeholder{color:#9daab5!important}.t8972-inputrow #fgGuessBtn{flex:0 0 19.6%!important;height:100%!important;margin:0!important;border:0!important;border-left:1px solid #35d8ff!important;border-radius:0 16px 16px 0!important;background:linear-gradient(180deg,#24bdf0,#128cd8)!important;color:#fff!important;opacity:1!important;font-size:clamp(16px,1.45vw,24px)!important;font-weight:1000!important;box-shadow:inset 0 0 24px rgba(255,255,255,.09),0 0 22px rgba(0,177,255,.38)!important;pointer-events:auto!important;cursor:pointer!important}.t8972-inputrow #fgSuggestions,.t8972-inputrow .fg-suggestions{position:absolute!important;left:0!important;right:19.6%!important;top:calc(100% + 4px)!important;z-index:80!important;max-height:28vh!important;overflow:auto!important;background:#071522!important;border:1px solid #0abaff!important;border-radius:10px!important;color:#fff!important;pointer-events:auto!important}
.t8972-tablewrap{position:absolute;left:12.4%;top:62.7%;width:75.7%;height:27%;z-index:25;overflow:hidden;border:1px solid rgba(103,133,155,.32);border-radius:0 0 16px 16px;background:linear-gradient(180deg,rgba(3,17,28,.88),rgba(3,13,22,.95));box-sizing:border-box}.t8972-tablehead{height:28%;display:grid;grid-template-columns:1.25fr 1fr 1.25fr 1fr .82fr .82fr;align-items:center;text-align:center;border-bottom:1px solid rgba(100,132,156,.35);font-size:clamp(10px,.82vw,14px);font-weight:900;letter-spacing:.05em;color:#cbd5df}.t8972-empty{position:absolute;inset:28% 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#d8e2eb}.t8972-empty .target{font-size:42px;color:#0fb9ff;margin-bottom:10px}.t8972-empty strong{font-size:clamp(17px,1.4vw,23px)}.t8972-empty span{font-size:clamp(12px,1vw,16px);margin-top:8px;color:#a8b7c4}
.t8972-tablewrap table{display:table!important;position:absolute!important;left:0!important;right:0!important;top:28%!important;width:100%!important;margin:0!important;border-collapse:separate!important;border-spacing:0 7px!important;background:transparent!important;border:0!important;box-shadow:none!important;table-layout:fixed!important;pointer-events:none!important;z-index:4!important}.t8972-tablewrap table thead{display:none!important}.t8972-tablewrap table tbody{display:table-row-group!important;visibility:visible!important}.t8972-tablewrap table tbody tr{height:73px!important}.t8972-tablewrap table tbody td{background:#5f6973!important;color:#fff!important;border:0!important;padding:7px 10px!important;font-size:clamp(10px,.78vw,14px)!important;font-weight:850!important;text-align:center!important;vertical-align:middle!important;overflow:hidden!important;text-overflow:ellipsis!important}.t8972-tablewrap table tbody td:first-child{border-radius:10px 0 0 10px!important}.t8972-tablewrap table tbody td:last-child{border-radius:0 10px 10px 0!important}.t8972-tablewrap table tbody td.match,.t8972-tablewrap table tbody td.exact,.t8972-tablewrap table tbody td.correct{background:#34963f!important}.t8972-tablewrap table tbody td.close,.t8972-tablewrap table tbody td.partial,.t8972-tablewrap table tbody td.yellow{background:#c99b26!important}
.t8972-legend{position:absolute;left:12.4%;top:91.1%;width:75.7%;height:5.6%;z-index:26;border:1px solid rgba(90,124,150,.35);border-radius:14px;background:rgba(3,15,25,.91);display:flex;align-items:center;justify-content:center;gap:42px;font-size:clamp(10px,.85vw,14px);color:#bfcbd4}.t8972-dot{width:18px;height:18px;border-radius:50%;display:inline-block;vertical-align:-4px;margin-right:10px;box-shadow:0 0 12px rgba(255,255,255,.2)}.t8972-green{background:#35e77d}.t8972-yellow{background:#ffca34}.t8972-gray{background:#a7b8cb}
body.turf8972-hasrows .t8972-empty{display:none!important}
@media(max-width:900px){.t8972-sidecard{display:none}.t8972-center{width:72%}.t8972-actions .t8972-soon,.t8972-actions .t8972-purple{display:none}.t8972-playtypes{left:30%;width:40%}.t8972-inputrow{left:10%;width:80%}.t8972-tablewrap,.t8972-legend{left:5%;width:90%}.t8972-back{min-width:150px}.t8972-brand{display:none}}
`;(document.head||document.documentElement).appendChild(s)}

function closeGame(){var o=overlay(),c=o&&(q('.fg-close',o)||q('#fgCloseGame',o)||q('#footballGameClose',o));if(c)c.click();else if(o){o.classList.remove('open','active','show');o.setAttribute('aria-hidden','true')}setTimeout(unmount,0)}
function build(o){
  var shell=q('.football-game-shell',o)||o,root=q('#turf8972Screen',shell);if(root)return root;
  root=document.createElement('div');root.id='turf8972Screen';root.innerHTML=`
    <div class="t8972-top">
      <button class="t8972-back" type="button"><i>←</i> BACK TO GAMES</button>
      <div class="t8972-brand"><span class="t8972-mark">T</span><span>TURF</span></div>
      <div class="t8972-actions">
        <div class="t8972-pill t8972-coins"><span style="font-size:25px">🪙</span><div><small>TURF COINS</small><b id="t8972Coins">151410</b></div></div>
        <div class="t8972-pill t8972-soon"><span style="font-size:24px">●</span> SOON</div>
        <div class="t8972-pill t8972-soon t8972-purple"><span style="font-size:22px">◆</span> SOON</div>
        <div class="t8972-icon">🏆</div><div class="t8972-icon">🔔</div><div class="t8972-icon"><span class="t8972-mark" style="width:28px;height:28px;font-size:18px">T</span></div><div class="t8972-icon t8972-menu">≡</div>
      </div>
    </div>
    <div class="t8972-hero"><div class="t8972-player t8972-left"></div><div class="t8972-player t8972-right"></div></div>
    <div class="t8972-center"><div class="t8972-title1">ACTIVE</div><div class="t8972-title2">PLAYERS</div><div class="t8972-sub">Guess the current NFL player in eight guesses.</div></div>
    <div class="t8972-sidecard left"><span class="ico">♙</span><div><div class="ey">ACTIVE PLAYERS</div><div class="big">2,143</div><div class="sm">IN THE NFL</div></div></div>
    <div class="t8972-sidecard left lower"><span class="ico">↗</span><div><div class="ey">UPDATED DAILY</div><div class="big">24h</div><div class="sm">ACCURATE DATA</div></div></div>
    <div class="t8972-sidecard right gold"><span class="ico">🏆</span><div><div class="ey">TOP SCORE</div><div class="big">8 GUESSES</div><div class="sm">THIS WEEK</div></div></div>
    <div class="t8972-sidecard right lower"><span class="ico">▥</span><div><div class="ey">YOUR RANK</div><div class="big" id="t8972Rank">#1,248</div><div class="sm" id="t8972Top">TOP 12%</div></div></div>
    <div class="t8972-playtypes" id="t8972Playtypes"></div>
    <div class="t8972-inputrow" id="t8972Inputrow"></div>
    <div class="t8972-tablewrap"><div class="t8972-tablehead"><span>PLAYER</span><span>TEAM</span><span>DIVISION</span><span>POSITION</span><span>AGE</span><span>BYE</span></div><div class="t8972-empty"><div class="target">⌾</div><strong>Make your first guess!</strong><span>Each guess reveals more information.</span></div><div id="t8972Table"></div></div>
    <div class="t8972-legend"><span><i class="t8972-dot t8972-green"></i>Green = exact match</span><span><i class="t8972-dot t8972-yellow"></i>Yellow = same side of the ball or another division in the same conference</span><span><i class="t8972-dot t8972-gray"></i>Gray = different conference / no match</span></div>`;
  shell.appendChild(root);q('.t8972-back',root).onclick=closeGame;return root
}
function mount(){
  if(!should()){unmount();return}css();var o=overlay(),root=build(o);document.body.classList.add('turf8972-players');
  var co=q('#t8972Coins',root);if(co)co.textContent=liveCoins();var ra=q('#t8972Rank',root);if(ra)ra.textContent=liveRank();var tp=q('#t8972Top',root);if(tp)tp.textContent=liveTop();
  if(!moved.length){
    var toolbar=q('.fg-toolbar',o),input=q('#fgInput',o),btn=q('#fgGuessBtn',o),sug=q('#fgSuggestions',o)||q('.fg-suggestions',o),table=q('table',o);
    if(toolbar)move(toolbar,q('#t8972Playtypes',root));
    if(input)move(input,q('#t8972Inputrow',root));
    if(btn)move(btn,q('#t8972Inputrow',root));
    if(sug)move(sug,q('#t8972Inputrow',root));
    if(table)move(table,q('#t8972Table',root));
  }
  var tb=q('#t8972Table table tbody',root);document.body.classList.toggle('turf8972-hasrows',!!(tb&&tb.children&&tb.children.length));
}
function unmount(){if(document.body)document.body.classList.remove('turf8972-players','turf8972-hasrows');restoreMoved();var r=q('#turf8972Screen');if(r)try{r.remove()}catch(e){}}

function sync(){if(should())mount();else unmount()}
document.addEventListener('click',function(){[0,35,90,180,350].forEach(function(ms){setTimeout(sync,ms)})},true);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&should())setTimeout(sync,0)},true);
window.addEventListener('popstate',function(){setTimeout(sync,0)});window.addEventListener('resize',function(){if(should())mount()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
[50,150,350,700,1400].forEach(function(ms){setTimeout(sync,ms)});
if(window.MutationObserver){var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(sync,30)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','aria-current']})}
})();