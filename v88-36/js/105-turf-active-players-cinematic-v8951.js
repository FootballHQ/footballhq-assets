/* ============================================================
   TURF V89.67 — ACTIVE PLAYERS EXACT INTERACTIVE SCREEN
   Exact approved artwork + native game engine controls.
   Strictly isolated from Home and every other game.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_8967__)return;
window.__TURF_ACTIVE_PLAYERS_8967__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var CHUNKS=['active-players-v8954-bg-0.txt','active-players-v8954-bg-1.txt','active-players-v8954-bg-2.txt'];
var exactBg='';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function navHomeActive(){
  var roots=[q('#fhqSidebar'),q('.fhq-sidebar'),q('nav')].filter(Boolean);
  for(var i=0;i<roots.length;i++){
    var nodes=qa('.active,.selected,[aria-current="page"],[data-active="true"]',roots[i]);
    for(var j=0;j<nodes.length;j++)if(/^HOME$/i.test(tx(nodes[j]).replace(/^🏠\s*/,'')))return true;
  }
  return false;
}
function explicitOpen(o){
  if(!o||navHomeActive())return false;
  return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||o.classList.contains('show');
}
function playersMode(o){
  if(!o)return false;
  var m=q('.fg-mode.active[data-fg-mode]',o);
  if(m&&m.dataset&&m.dataset.fgMode)return m.dataset.fgMode==='players';
  return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(tx(o));
}
function shouldMount(){var o=overlay();return !!(o&&explicitOpen(o)&&playersMode(o))}
function loadBg(){
  if(exactBg)return Promise.resolve(exactBg);
  return Promise.all(CHUNKS.map(function(f){return fetch(ROOT+f+'?v=8967',{cache:'force-cache'}).then(function(r){if(!r.ok)throw Error(String(r.status));return r.text()})}))
    .then(function(parts){exactBg='data:image/webp;base64,'+parts.join('').replace(/\s+/g,'');return exactBg})
    .catch(function(){return ''});
}
function css(){
  if(q('#turf8967Css'))return;
  var s=document.createElement('style');s.id='turf8967Css';s.textContent=`
body.turf8967-players{overflow:hidden!important;background:#01070d!important}
body.turf8967-players #fhqSidebar,body.turf8967-players .fhq-sidebar,body.turf8967-players #turfTopbar,body.turf8967-players #fhqMobileTopbar,body.turf8967-players #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8967-players #fhqMain,body.turf8967-players .fhq-main,body.turf8967-players .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.turf8967-players #footballGameOverlay,body.turf8967-players .football-game-overlay,body.turf8967-players .fg-game-overlay{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;z-index:2147482000!important;background:#01070d!important}
body.turf8967-players #footballGameOverlay .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:hidden!important;transform:none!important}
body.turf8967-players #turf8967ExactBg{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;z-index:1!important;background-position:center!important;background-repeat:no-repeat!important;background-size:100% 100%!important;pointer-events:none!important}
body:not(.turf8967-players) #turf8967ExactBg,body:not(.turf8967-players) #turf8967Back,body:not(.turf8967-players) #turf8967Rank,body:not(.turf8967-players) #turf8967Coins,body:not(.turf8967-players) #turf8967ResultsCover{display:none!important}
body.turf8967-players #footballGameOverlay .fg-head,body.turf8967-players #footballGameOverlay .fg-modes,body.turf8967-players #footballGameOverlay .fg-special-title,body.turf8967-players #footballGameOverlay .fg-special-sub,body.turf8967-players #footballGameOverlay .fg-game-title,body.turf8967-players #footballGameOverlay .fg-game-sub,body.turf8967-players #footballGameOverlay .fg-prompt,body.turf8967-players #footballGameOverlay .fg-instruction,body.turf8967-players #footballGameOverlay .fg-description,body.turf8967-players #footballGameOverlay .fg-legend{display:none!important}
body.turf8967-players #turf8954ExactBg,body.turf8967-players #turf8954Back,body.turf8967-players #turf8954RankLive,body.turf8967-players #turf8954CoinsLive,body.turf8967-players #turf8954ResultsCover,body.turf8967-players #turf8953Hud,body.turf8967-players #turf8953Stage,body.turf8967-players #turf8953Cards,body.turf8967-players #turf8953Ball,body.turf8967-players #turf8953Empty,body.turf8967-players #turf8953Legend,body.turf8967-players #turf8952Brand,body.turf8967-players #turf8952Hero,body.turf8967-players #turf8951Brand,body.turf8967-players #turf8951Back,body.turf8967-players #turf8951Atmosphere{display:none!important}

body.turf8967-players #turf8967Back{display:block!important;position:fixed!important;left:1.1%!important;top:2.0%!important;width:14.5%!important;height:6.5%!important;z-index:90!important;border:0!important;background:transparent!important;color:transparent!important;cursor:pointer!important}
body.turf8967-players #footballGameOverlay .fg-toolbar{display:flex!important;position:fixed!important;left:36.3%!important;top:43.0%!important;width:27.9%!important;height:6.3%!important;z-index:75!important;gap:2%!important;padding:0!important;margin:0!important;background:transparent!important;border:0!important;transform:none!important}
body.turf8967-players #footballGameOverlay .fg-playtype{height:100%!important;min-height:0!important;flex:1 1 0!important;padding:0!important;margin:0!important;opacity:0!important;cursor:pointer!important;pointer-events:auto!important}
body.turf8967-players #footballGameOverlay .fg-body,body.turf8967-players #footballGameOverlay #fgSpecialGame,body.turf8967-players #footballGameOverlay .fg-special-game{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;z-index:55!important;pointer-events:none!important}
body.turf8967-players #footballGameOverlay .fg-input-row,body.turf8967-players #footballGameOverlay .fg-guess-row{display:flex!important;position:fixed!important;left:24.45%!important;top:52.42%!important;width:52%!important;height:8.05%!important;z-index:80!important;margin:0!important;padding:0!important;pointer-events:auto!important}
body.turf8967-players #footballGameOverlay #fgInput{box-sizing:border-box!important;flex:1 1 auto!important;height:100%!important;margin:0!important;padding:0 1.6vw!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:#f2f7fb!important;font-size:clamp(16px,1.45vw,23px)!important;font-weight:600!important;outline:none!important;caret-color:#42cfff!important}
body.turf8967-players #footballGameOverlay #fgInput::placeholder{color:transparent!important}
body.turf8967-players #footballGameOverlay #fgGuessBtn{flex:0 0 19.5%!important;height:100%!important;min-width:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:transparent!important;opacity:0!important;cursor:pointer!important;pointer-events:auto!important}
body.turf8967-players #footballGameOverlay #fgSuggestions,body.turf8967-players #footballGameOverlay .fg-suggestions{position:absolute!important;left:0!important;right:19.5%!important;top:100%!important;z-index:120!important;background:#061522!important;border:1px solid #158fd1!important;color:#fff!important;pointer-events:auto!important;max-height:30vh!important;overflow:auto!important}

body.turf8967-players #turf8967ResultsCover{display:none;position:fixed!important;left:12.35%!important;top:69.6%!important;width:75.7%!important;height:18.7%!important;z-index:56!important;background:linear-gradient(180deg,#06131e,#03101a)!important;border-radius:0 0 16px 16px!important;pointer-events:none!important}
body.turf8967-players.turf8967-has-rows #turf8967ResultsCover{display:block!important}
body.turf8967-players #footballGameOverlay table{position:fixed!important;left:12.35%!important;top:62.8%!important;width:75.7%!important;z-index:60!important;margin:0!important;border-collapse:separate!important;border-spacing:0 8px!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important;table-layout:fixed!important}
body.turf8967-players #footballGameOverlay table thead{visibility:hidden!important;height:6.1vh!important}
body.turf8967-players #footballGameOverlay table thead tr{height:6.1vh!important}
body.turf8967-players #footballGameOverlay table tbody{visibility:hidden!important}
body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody{visibility:visible!important}
body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody tr{height:8.5vh!important;background:#5e6871!important;color:#fff!important}
body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td{background:#5e6871!important;color:#fff!important;border:0!important;padding:.65vh .65vw!important;font-weight:800!important;font-size:clamp(10px,.78vw,14px)!important;vertical-align:middle!important;overflow:hidden!important;text-overflow:ellipsis!important}
body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td:first-child{border-radius:9px 0 0 9px!important}body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td:last-child{border-radius:0 9px 9px 0!important}
body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td.match,body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td.exact,body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td.correct{background:#328a3d!important}
body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td.close,body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td.partial,body.turf8967-players.turf8967-has-rows #footballGameOverlay table tbody td:nth-child(4).yellow{background:#c49a25!important}

body.turf8967-players #turf8967Rank{display:flex!important;position:fixed!important;left:87.25%!important;top:45.55%!important;width:9.25%!important;height:6.25%!important;z-index:72!important;flex-direction:column!important;justify-content:center!important;background:#03121e!important;color:#fff!important;pointer-events:none!important}
body.turf8967-players #turf8967Rank strong{font:1000 clamp(18px,1.45vw,27px)/1 system-ui;margin:0;white-space:nowrap}body.turf8967-players #turf8967Rank span{margin-top:8px;color:#31c8ff;font:900 clamp(8px,.58vw,11px)/1 system-ui;letter-spacing:.05em}
body.turf8967-players #turf8967Coins{display:flex!important;position:fixed!important;left:62.0%!important;top:3.4%!important;width:6.45%!important;height:3.3%!important;z-index:72!important;align-items:center!important;background:#061521!important;color:#fff!important;font:1000 clamp(10px,.83vw,15px)/1 system-ui!important;pointer-events:none!important}
`;(document.head||document.documentElement).appendChild(s);
}
function rankText(){
  var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];
  for(var i=0;i<sels.length;i++){var e=q(sels[i]);if(!e)continue;var t=tx(e),m=t.match(/#\s*([\d,]+)/)||t.match(/rank\D*([\d,]+)/i);if(m)return '#'+m[1]}
  return '—';
}
function rankSub(){
  var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];
  for(var i=0;i<sels.length;i++){var e=q(sels[i]);if(!e)continue;var p=tx(e).match(/top\s*([\d.]+%)/i);if(p)return 'TOP '+p[1]}
  return 'DAILY RANK';
}
function coinsText(){var e=q('#fhqGlobalCoins')||q('[data-turf-coins]');var t=tx(e).replace(/[^\d,]/g,'');return t||'—'}
function removeParts(){['turf8967ExactBg','turf8967Back','turf8967Rank','turf8967Coins','turf8967ResultsCover'].forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}})}
function restore(){document.body.classList.remove('turf8967-players','turf8967-has-rows');removeParts();var o=overlay();if(o){var c=q('.fg-close',o);if(c)c.style.removeProperty('display')}}
function closeGame(){var o=overlay();if(!o){restore();return}var c=q('.fg-close',o)||q('#fgCloseGame',o);if(c){c.click();setTimeout(restore,0);setTimeout(restore,120)}else{o.classList.remove('open','active','show');o.setAttribute('aria-hidden','true');restore()}}
function ensureParts(o){
  var shell=q('.football-game-shell',o)||o;
  var bg=q('#turf8967ExactBg',shell);if(!bg){bg=document.createElement('div');bg.id='turf8967ExactBg';shell.insertBefore(bg,shell.firstChild)}
  if(exactBg)bg.style.backgroundImage='url("'+exactBg+'")';else loadBg().then(function(src){var n=q('#turf8967ExactBg');if(src&&n)n.style.backgroundImage='url("'+src+'")'});
  if(!q('#turf8967Back',shell)){var b=document.createElement('button');b.id='turf8967Back';b.type='button';b.setAttribute('aria-label','Back to Games');b.onclick=closeGame;shell.appendChild(b)}
  if(!q('#turf8967Rank',shell)){var r=document.createElement('div');r.id='turf8967Rank';r.innerHTML='<strong>—</strong><span>DAILY RANK</span>';shell.appendChild(r)}
  if(!q('#turf8967Coins',shell)){var c=document.createElement('div');c.id='turf8967Coins';shell.appendChild(c)}
  if(!q('#turf8967ResultsCover',shell)){var cover=document.createElement('div');cover.id='turf8967ResultsCover';shell.appendChild(cover)}
}
function sync(){
  css();
  if(!shouldMount()){restore();return}
  var o=overlay();document.body.classList.add('turf8967-players');ensureParts(o);
  var r=q('#turf8967Rank');if(r){q('strong',r).textContent=rankText();q('span',r).textContent=rankSub()}
  var c=q('#turf8967Coins');if(c)c.textContent=coinsText();
  var game=q('#fgSpecialGame',o)||q('.fg-special-game',o),rows=game?qa('tbody tr',game).filter(function(row){return tx(row).length>0}):[];
  document.body.classList.toggle('turf8967-has-rows',rows.length>0);
  var nativeClose=q('.fg-close',o);if(nativeClose)nativeClose.style.setProperty('display','none','important');
}
function clickedHome(e){var n=e.target&&e.target.closest&&e.target.closest('a,button,[role="button"],.nav-item,.sidebar-item');return n&&/^HOME$/i.test(tx(n).replace(/^🏠\s*/,''))}
function schedule(){[0,35,90,180,350,700,1300].forEach(function(ms){setTimeout(sync,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',function(e){if(clickedHome(e)){restore();setTimeout(restore,50);setTimeout(restore,180);return}schedule()},true);
window.addEventListener('resize',sync);
window.addEventListener('popstate',function(){setTimeout(sync,0)});
var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(sync,35)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','aria-hidden','aria-current']});
})();
