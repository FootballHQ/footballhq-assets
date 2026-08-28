/* ============================================================
   TURF v89.54 — ACTIVE PLAYERS EXACT APPROVED SCREEN
   Uses the approved rendered screen itself as the visual layer.
   Native game controls remain live on top; auth/loading untouched.
   Account rank + coins are read from the signed-in TURF account DOM.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_EXACT_V8954__)return;
window.__TURF_ACTIVE_PLAYERS_EXACT_V8954__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var CHUNKS=['active-players-v8954-bg-0.txt','active-players-v8954-bg-1.txt','active-players-v8954-bg-2.txt'];
var exactBg='';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;var c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0'&&el.getClientRects().length>0}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function isOpen(){var o=overlay();if(!o)return false;return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||visible(o)}
function isPlayers(){
  var o=overlay();if(!o||!isOpen())return false;
  var m=q('.fg-mode.active[data-fg-mode]',o);if(m&&m.dataset&&m.dataset.fgMode)return m.dataset.fgMode==='players';
  return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(tx(o));
}
function loadBg(){
  if(exactBg)return Promise.resolve(exactBg);
  var stamp='8954-'+Date.now();
  return Promise.all(CHUNKS.map(function(f){return fetch(ROOT+f+'?v='+stamp,{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('bg '+r.status);return r.text()})}))
    .then(function(p){exactBg='data:image/webp;base64,'+p.join('').replace(/\s+/g,'');return exactBg})
    .catch(function(){return ''});
}
function css(){
  if(q('#turf8954Css'))return;
  var s=document.createElement('style');s.id='turf8954Css';s.textContent=`
body.turf8954-players{overflow:hidden!important;background:#01070d!important}
body.turf8954-players #fhqSidebar,body.turf8954-players .fhq-sidebar,body.turf8954-players #turfTopbar,body.turf8954-players #fhqMobileTopbar,body.turf8954-players #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8954-players #fhqMain,body.turf8954-players .fhq-main,body.turf8954-players .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.turf8954-players #footballGameOverlay,body.turf8954-players .football-game-overlay,body.turf8954-players .fg-game-overlay{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;display:block!important;z-index:2147482000!important;background:#01070d!important}
body.turf8954-players #footballGameOverlay:before,body.turf8954-players .fg-game-overlay:before{display:none!important}
body.turf8954-players #footballGameOverlay .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:hidden!important;transform:none!important}
#turf8954ExactBg{position:fixed;inset:0;z-index:1;background-position:center;background-repeat:no-repeat;background-size:100% 100%;pointer-events:none}
body.turf8954-players #footballGameOverlay .fg-head,body.turf8954-players #footballGameOverlay .fg-modes,body.turf8954-players #footballGameOverlay .fg-special-title,body.turf8954-players #footballGameOverlay .fg-special-sub,body.turf8954-players #footballGameOverlay .fg-game-title,body.turf8954-players #footballGameOverlay .fg-game-sub{display:none!important}
body.turf8954-players #turf8953Hud,body.turf8954-players #turf8953Stage,body.turf8954-players #turf8953Cards,body.turf8954-players #turf8953Ball,body.turf8954-players #turf8953Empty,body.turf8954-players #turf8953Legend,body.turf8954-players #turf8952Brand,body.turf8954-players #turf8952Hero,body.turf8954-players #turf8951Brand,body.turf8954-players #turf8951Back,body.turf8954-players #turf8951Atmosphere{display:none!important}

/* Invisible hit area over the exact rendered Back to Games button. */
#turf8954Back{position:fixed;left:1.1%;top:2.0%;width:14.5%;height:6.5%;z-index:80;border:0;background:transparent;cursor:pointer;color:transparent}

/* Use the rendered Daily/Unlimited controls as the visible UI; native controls remain clickable. */
body.turf8954-players #footballGameOverlay .fg-toolbar{display:flex!important;position:fixed!important;left:36.3%!important;top:43.0%!important;width:27.9%!important;height:6.3%!important;z-index:75!important;gap:2.0%!important;padding:0!important;margin:0!important;background:transparent!important;border:0!important;transform:none!important}
body.turf8954-players #footballGameOverlay .fg-playtype{height:100%!important;min-height:0!important;flex:1 1 0!important;padding:0!important;margin:0!important;opacity:0!important;cursor:pointer!important;pointer-events:auto!important}

/* Native input is aligned directly over the exact rendered input; only typed text is visible. */
body.turf8954-players #footballGameOverlay .fg-body{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important;z-index:55!important;pointer-events:none!important}
body.turf8954-players #footballGameOverlay #fgSpecialGame,body.turf8954-players #footballGameOverlay .fg-special-game{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;pointer-events:none!important}
body.turf8954-players #footballGameOverlay .fg-input-row,body.turf8954-players #footballGameOverlay .fg-guess-row{display:flex!important;position:fixed!important;left:24.45%!important;top:52.42%!important;width:52.0%!important;height:8.05%!important;z-index:76!important;margin:0!important;padding:0!important;pointer-events:auto!important}
body.turf8954-players #footballGameOverlay #fgInput{box-sizing:border-box!important;flex:1 1 auto!important;height:100%!important;margin:0!important;padding:0 1.6vw!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:#f2f7fb!important;font-size:clamp(16px,1.45vw,23px)!important;font-weight:600!important;outline:none!important;caret-color:#42cfff!important}
body.turf8954-players #footballGameOverlay #fgInput::placeholder{color:transparent!important}
body.turf8954-players #footballGameOverlay #fgGuessBtn{flex:0 0 19.5%!important;height:100%!important;min-width:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:transparent!important;opacity:0!important;cursor:pointer!important;pointer-events:auto!important}
body.turf8954-players #footballGameOverlay #fgSuggestions{position:absolute!important;left:0!important;right:19.5%!important;top:100%!important;z-index:120!important;background:#061522!important;border:1px solid #158fd1!important;color:#fff!important;pointer-events:auto!important}

/* Live guesses replace the rendered empty state only after an actual guess exists. */
#turf8954ResultsCover{display:none;position:fixed;left:12.35%;top:69.6%;width:75.7%;height:18.7%;z-index:56;background:linear-gradient(180deg,#06131e,#03101a);border-radius:0 0 16px 16px;pointer-events:none}
body.turf8954-has-rows #turf8954ResultsCover{display:block}
body.turf8954-players #footballGameOverlay table{position:fixed!important;left:12.35%!important;top:62.8%!important;width:75.7%!important;z-index:60!important;margin:0!important;border-collapse:separate!important;border-spacing:0 8px!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important}
body.turf8954-players #footballGameOverlay table thead{visibility:hidden!important;height:6.1vh!important}
body.turf8954-players #footballGameOverlay table thead tr{height:6.1vh!important}
body.turf8954-players #footballGameOverlay table tbody{visibility:hidden}
body.turf8954-has-rows #footballGameOverlay table tbody{visibility:visible!important}
body.turf8954-has-rows #footballGameOverlay table tbody tr{height:8.5vh!important;background:#5e6871!important;color:#fff!important}
body.turf8954-has-rows #footballGameOverlay table tbody td{background:#5e6871!important;color:#fff!important;border:0!important;padding:.65vh .65vw!important;font-weight:800!important;font-size:clamp(10px,.78vw,14px)!important;vertical-align:middle!important}
body.turf8954-has-rows #footballGameOverlay table tbody td:first-child{border-radius:9px 0 0 9px!important}body.turf8954-has-rows #footballGameOverlay table tbody td:last-child{border-radius:0 9px 9px 0!important}

/* Cover the mock rank value and replace it with this account's real leaderboard rank. */
#turf8954RankLive{position:fixed;left:87.25%;top:45.55%;width:9.25%;height:6.25%;z-index:70;display:flex;flex-direction:column;justify-content:center;background:#03121e;color:#fff;pointer-events:none}
#turf8954RankLive strong{font:1000 clamp(18px,1.45vw,27px)/1 system-ui;margin:0;white-space:nowrap}#turf8954RankLive span{margin-top:8px;color:#31c8ff;font:900 clamp(8px,.58vw,11px)/1 system-ui;letter-spacing:.05em}
/* Same for coins, so the visual stays account-accurate. */
#turf8954CoinsLive{position:fixed;left:62.0%;top:3.4%;width:6.45%;height:3.3%;z-index:70;display:flex;align-items:center;background:#061521;color:#fff;font:1000 clamp(10px,.83vw,15px)/1 system-ui;pointer-events:none}

@media(max-width:800px){#turf8954RankLive{left:86.7%;width:10.2%}#turf8954CoinsLive{left:61.4%;width:7.2%}body.turf8954-players #footballGameOverlay #fgInput{font-size:14px!important}}
`;(document.head||document.documentElement).appendChild(s);
}
function rankText(){
  var els=[q('#fhqDailyRank'),q('#fhqDashRank'),q('[data-user-rank]'),q('.fhq-daily-rank')].filter(Boolean);
  for(var i=0;i<els.length;i++){
    var t=tx(els[i]);
    if(!t||/loading/i.test(t))continue;
    var m=t.match(/#\s*([\d,]+)/)||t.match(/rank\D*([\d,]+)/i);
    if(m)return '#'+m[1];
  }
  return '—';
}
function rankSub(){
  var els=[q('#fhqDailyRank'),q('#fhqDashRank'),q('[data-user-rank]'),q('.fhq-daily-rank')].filter(Boolean);
  for(var i=0;i<els.length;i++){
    var t=tx(els[i]);var p=t.match(/top\s*([\d.]+%)/i);if(p)return 'TOP '+p[1];
  }
  return 'DAILY RANK';
}
function coinsText(){var e=q('#fhqGlobalCoins');var t=tx(e).replace(/[^\d,]/g,'');return t||'—'}
function closeGame(){var o=overlay();if(!o)return;var c=q('.fg-close',o)||q('#fgCloseGame',o);if(c){c.click();return}o.classList.remove('open','active');o.setAttribute('aria-hidden','true')}
function ensureParts(o){
  var shell=q('.football-game-shell',o)||o;
  var bg=q('#turf8954ExactBg',shell);if(!bg){bg=document.createElement('div');bg.id='turf8954ExactBg';shell.insertBefore(bg,shell.firstChild)}
  if(exactBg)bg.style.backgroundImage='url("'+exactBg+'")';else loadBg().then(function(src){if(src&&q('#turf8954ExactBg'))q('#turf8954ExactBg').style.backgroundImage='url("'+src+'")'});
  var back=q('#turf8954Back',shell);if(!back){back=document.createElement('button');back.id='turf8954Back';back.type='button';back.setAttribute('aria-label','Back to Games');back.addEventListener('click',closeGame);shell.appendChild(back)}
  var rank=q('#turf8954RankLive',shell);if(!rank){rank=document.createElement('div');rank.id='turf8954RankLive';rank.innerHTML='<strong>—</strong><span>DAILY RANK</span>';shell.appendChild(rank)}
  var coins=q('#turf8954CoinsLive',shell);if(!coins){coins=document.createElement('div');coins.id='turf8954CoinsLive';shell.appendChild(coins)}
  var cover=q('#turf8954ResultsCover',shell);if(!cover){cover=document.createElement('div');cover.id='turf8954ResultsCover';shell.appendChild(cover)}
}
function sync(){
  css();var o=overlay(),on=isPlayers();document.body.classList.toggle('turf8954-players',on);if(!o)return;
  if(!on){document.body.classList.remove('turf8954-has-rows');return}
  ensureParts(o);
  var r=q('#turf8954RankLive');if(r){q('strong',r).textContent=rankText();q('span',r).textContent=rankSub()}
  var c=q('#turf8954CoinsLive');if(c)c.textContent=coinsText();
  var game=q('#fgSpecialGame',o)||q('.fg-special-game',o);var rows=game?qa('tbody tr',game).filter(function(x){return tx(x).length>0}):[];
  document.body.classList.toggle('turf8954-has-rows',rows.length>0);
  var nativeClose=q('.fg-close',o);if(nativeClose)nativeClose.style.setProperty('display','none','important');
}
function schedule(){[0,40,100,220,500,900,1600].forEach(function(ms){setTimeout(sync,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-game-open],#footballGameOverlay,.fg-game-overlay,.fg-mode,.fg-playtype,#fgGuessBtn'))schedule()},true);
window.addEventListener('resize',sync);
var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(sync,45)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','aria-hidden','style']});
})();
