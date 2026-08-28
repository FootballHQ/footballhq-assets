/* ============================================================
   TURF V89.69 — ACTIVE PLAYERS EXACT INTERACTIVE SCREEN
   Uses the approved 8968 full-resolution artwork.
   Keeps the native game engine interactive underneath.
   Strictly isolated from Home and every other game.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_8969__) return;
window.__TURF_ACTIVE_PLAYERS_8969__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var CHUNKS=['active-players-exact-8968-0.txt','active-players-exact-8968-1.txt'];
var exactBg='';
var mounting=false;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}

function homeIsActive(){
  var roots=[q('#fhqSidebar'),q('.fhq-sidebar'),q('nav')].filter(Boolean);
  for(var i=0;i<roots.length;i++){
    var nodes=qa('.active,.selected,[aria-current="page"],[data-active="true"]',roots[i]);
    for(var j=0;j<nodes.length;j++){
      var t=tx(nodes[j]).replace(/^🏠\s*/, '');
      if(/^HOME$/i.test(t)) return true;
    }
  }
  return false;
}

function overlayOpen(o){
  if(!o || homeIsActive()) return false;
  var aria=o.getAttribute('aria-hidden');
  if(aria==='false') return true;
  return o.classList.contains('open')||o.classList.contains('active')||o.classList.contains('show');
}

function playersMode(o){
  if(!o) return false;
  var m=q('.fg-mode.active[data-fg-mode]',o);
  if(m && m.dataset && m.dataset.fgMode) return m.dataset.fgMode==='players';
  var rootText=tx(o);
  return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(rootText);
}

function shouldMount(){
  var o=overlay();
  return !!(o && overlayOpen(o) && playersMode(o) && !homeIsActive());
}

function loadExactBg(){
  if(exactBg) return Promise.resolve(exactBg);
  return Promise.all(CHUNKS.map(function(f){
    return fetch(ROOT+f+'?v=8969',{cache:'no-store'}).then(function(r){
      if(!r.ok) throw new Error('Active Players art '+r.status);
      return r.text();
    });
  })).then(function(parts){
    exactBg='data:image/webp;base64,'+parts.join('').replace(/\s+/g,'');
    return exactBg;
  }).catch(function(err){
    console.error('[TURF Active Players] exact artwork failed',err);
    return '';
  });
}

function cleanupOldAttempts(){
  var ids=[
    'ap8957img','ap8958canvas','ap8959canvas','ap8962screen','ap8963screen','ap8964screen','ap8965screen','ap8966screen',
    'ap8963back','ap8964back','ap8965back','ap8966back','ap8963rank','ap8964rank','ap8965rank','ap8966rank',
    'ap8963coins','ap8964coins','ap8965coins','ap8966coins','turf8954ExactBg','turf8954Back','turf8954RankLive',
    'turf8954CoinsLive','turf8954ResultsCover','turf8953Hud','turf8953Stage','turf8953Cards','turf8953Ball','turf8953Empty',
    'turf8953Legend','turf8952Brand','turf8952Hero','turf8951Brand','turf8951Back','turf8951Atmosphere'
  ];
  ids.forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
  ['ap8957','ap8963','ap8963rows','ap8964','ap8964rows','ap8965','ap8965rows','ap8966','ap8966rows'].forEach(function(c){document.body.classList.remove(c)});
}

function installCss(){
  if(q('#turf8969Css')) return;
  var s=document.createElement('style');
  s.id='turf8969Css';
  s.textContent=`
body.turf8969-players{overflow:hidden!important;background:#01070d!important}
body.turf8969-players #fhqSidebar,
body.turf8969-players .fhq-sidebar,
body.turf8969-players #turfTopbar,
body.turf8969-players #fhqMobileTopbar,
body.turf8969-players #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8969-players #fhqMain,
body.turf8969-players .fhq-main,
body.turf8969-players .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.turf8969-players #footballGameOverlay,
body.turf8969-players .football-game-overlay,
body.turf8969-players .fg-game-overlay{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;z-index:2147482000!important;background:#01070d!important}
body.turf8969-players #footballGameOverlay .football-game-shell,
body.turf8969-players .football-game-overlay .football-game-shell,
body.turf8969-players .fg-game-overlay .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:hidden!important;transform:none!important}
body.turf8969-players #turf8969ExactBg{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;z-index:1!important;background-position:center center!important;background-repeat:no-repeat!important;background-size:100% 100%!important;pointer-events:none!important}
body:not(.turf8969-players) #turf8969ExactBg,
body:not(.turf8969-players) #turf8969Back,
body:not(.turf8969-players) #turf8969Rank,
body:not(.turf8969-players) #turf8969Coins,
body:not(.turf8969-players) #turf8969RowsMask{display:none!important}

body.turf8969-players #footballGameOverlay .fg-head,
body.turf8969-players #footballGameOverlay .fg-modes,
body.turf8969-players #footballGameOverlay .fg-special-title,
body.turf8969-players #footballGameOverlay .fg-special-sub,
body.turf8969-players #footballGameOverlay .fg-game-title,
body.turf8969-players #footballGameOverlay .fg-game-sub,
body.turf8969-players #footballGameOverlay .fg-prompt,
body.turf8969-players #footballGameOverlay .fg-instruction,
body.turf8969-players #footballGameOverlay .fg-description,
body.turf8969-players #footballGameOverlay .fg-legend,
body.turf8969-players #footballGameOverlay .fg-close{display:none!important}

body.turf8969-players #turf8969Back{display:block!important;position:fixed!important;left:1.05%!important;top:1.85%!important;width:14.3%!important;height:6.6%!important;z-index:100!important;border:0!important;background:transparent!important;color:transparent!important;cursor:pointer!important;padding:0!important}

body.turf8969-players #footballGameOverlay .fg-toolbar{display:flex!important;position:fixed!important;left:36.25%!important;top:43.05%!important;width:27.9%!important;height:6.1%!important;z-index:85!important;gap:2%!important;padding:0!important;margin:0!important;background:transparent!important;border:0!important;transform:none!important;pointer-events:auto!important}
body.turf8969-players #footballGameOverlay .fg-playtype{height:100%!important;min-height:0!important;flex:1 1 0!important;padding:0!important;margin:0!important;border:0!important;background:transparent!important;color:transparent!important;box-shadow:none!important;opacity:0!important;cursor:pointer!important;pointer-events:auto!important}

body.turf8969-players #footballGameOverlay .fg-body,
body.turf8969-players #footballGameOverlay #fgSpecialGame,
body.turf8969-players #footballGameOverlay .fg-special-game{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;z-index:55!important;pointer-events:none!important}

body.turf8969-players #footballGameOverlay .fg-input-row,
body.turf8969-players #footballGameOverlay .fg-guess-row{display:flex!important;position:fixed!important;left:24.42%!important;top:52.45%!important;width:52.05%!important;height:8.0%!important;z-index:90!important;margin:0!important;padding:0!important;pointer-events:auto!important}
body.turf8969-players #footballGameOverlay #fgInput{box-sizing:border-box!important;flex:1 1 auto!important;height:100%!important;margin:0!important;padding:0 1.65vw!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:#f2f7fb!important;font-size:clamp(16px,1.45vw,23px)!important;font-weight:600!important;outline:none!important;caret-color:#43d4ff!important;pointer-events:auto!important}
body.turf8969-players #footballGameOverlay #fgInput::placeholder{color:rgba(200,210,220,.55)!important}
body.turf8969-players #footballGameOverlay #fgGuessBtn{flex:0 0 19.6%!important;height:100%!important;min-width:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:transparent!important;opacity:0!important;cursor:pointer!important;pointer-events:auto!important}
body.turf8969-players #footballGameOverlay #fgSuggestions,
body.turf8969-players #footballGameOverlay .fg-suggestions{position:absolute!important;left:0!important;right:19.6%!important;top:100%!important;z-index:130!important;background:#061522!important;border:1px solid #159bd8!important;color:#fff!important;pointer-events:auto!important;max-height:30vh!important;overflow:auto!important}

body.turf8969-players #footballGameOverlay table{position:fixed!important;left:12.35%!important;top:62.75%!important;width:75.7%!important;z-index:70!important;margin:0!important;border-collapse:separate!important;border-spacing:0 8px!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important;table-layout:fixed!important}
body.turf8969-players #footballGameOverlay table thead{visibility:hidden!important;height:6.0vh!important}
body.turf8969-players #footballGameOverlay table thead tr{height:6.0vh!important}
body.turf8969-players #footballGameOverlay table tbody{visibility:hidden!important}
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody{visibility:visible!important}
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody tr{height:8.35vh!important;background:#5f6972!important;color:#fff!important}
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td{background:#5f6972!important;color:#fff!important;border:0!important;padding:.65vh .65vw!important;font-weight:800!important;font-size:clamp(10px,.78vw,14px)!important;vertical-align:middle!important;overflow:hidden!important;text-overflow:ellipsis!important}
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td:first-child{border-radius:9px 0 0 9px!important}
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td:last-child{border-radius:0 9px 9px 0!important}
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td.match,
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td.exact,
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td.correct{background:#328a3d!important}
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td.close,
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td.partial,
body.turf8969-players.turf8969-has-rows #footballGameOverlay table tbody td.yellow{background:#c49a25!important}

body.turf8969-players #turf8969Rank{display:flex!important;position:fixed!important;left:87.1%!important;top:45.5%!important;width:9.55%!important;height:6.4%!important;z-index:82!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;padding-left:1.1vw!important;box-sizing:border-box!important;background:#03121e!important;color:#fff!important;pointer-events:none!important}
body.turf8969-players #turf8969Rank strong{font:1000 clamp(18px,1.45vw,27px)/1 system-ui!important;margin:0!important;white-space:nowrap!important}
body.turf8969-players #turf8969Rank span{margin-top:7px!important;color:#31c8ff!important;font:900 clamp(8px,.58vw,11px)/1 system-ui!important;letter-spacing:.05em!important}
body.turf8969-players #turf8969Coins{display:flex!important;position:fixed!important;left:61.95%!important;top:3.35%!important;width:6.55%!important;height:3.4%!important;z-index:82!important;align-items:center!important;justify-content:center!important;background:#061521!important;color:#fff!important;font:1000 clamp(10px,.83vw,15px)/1 system-ui!important;pointer-events:none!important}
`;
  (document.head||document.documentElement).appendChild(s);
}

function liveRank(){
  var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]','[data-rank]'];
  for(var i=0;i<sels.length;i++){
    var e=q(sels[i]); if(!e) continue;
    var t=tx(e);
    var m=t.match(/#\s*([\d,]+)/)||t.match(/rank\D*([\d,]+)/i);
    if(m) return '#'+m[1];
    var d=e.getAttribute&&e.getAttribute('data-daily-rank');
    if(d&&/\d/.test(d)) return '#'+String(d).replace(/[^\d,]/g,'');
  }
  try{
    var keys=['turfDailyRank','fhqDailyRank','dailyRank','userRank'];
    for(var k=0;k<keys.length;k++){
      var v=localStorage.getItem(keys[k]);
      if(v&&/\d/.test(v)) return '#'+String(v).replace(/[^\d,]/g,'');
    }
  }catch(e){}
  return '—';
}

function liveRankSub(){
  var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];
  for(var i=0;i<sels.length;i++){
    var e=q(sels[i]);if(!e)continue;
    var p=tx(e).match(/top\s*([\d.]+%)/i);
    if(p) return 'TOP '+p[1];
  }
  return 'DAILY RANK';
}

function liveCoins(){
  var e=q('#fhqGlobalCoins')||q('[data-turf-coins]')||q('[data-coins]');
  if(e){var t=tx(e).replace(/[^\d,]/g,'');if(t)return t;}
  try{
    var v=localStorage.getItem('turfCoins')||localStorage.getItem('fhqCoins');
    if(v&&/\d/.test(v)) return String(v).replace(/[^\d,]/g,'');
  }catch(err){}
  return '—';
}

function removeParts(){
  ['turf8969ExactBg','turf8969Back','turf8969Rank','turf8969Coins'].forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
}

function restore(){
  document.body.classList.remove('turf8969-players','turf8969-has-rows');
  removeParts();
  var o=overlay();
  if(o){var c=q('.fg-close',o)||q('#fgCloseGame',o);if(c)c.style.removeProperty('display');}
}

function closeGame(){
  var o=overlay();
  if(!o){restore();return;}
  var c=q('.fg-close',o)||q('#fgCloseGame',o);
  if(c){
    c.click();
    setTimeout(restore,0);
    setTimeout(restore,120);
  }else{
    o.classList.remove('open','active','show');
    o.setAttribute('aria-hidden','true');
    restore();
  }
}

function rowsExist(o){
  var body=q('table tbody',o);
  if(!body) return false;
  return qa('tr',body).some(function(r){return tx(r).length>0});
}

function updateHud(){
  var r=q('#turf8969Rank');
  if(r){
    var strong=q('strong',r),span=q('span',r);
    if(strong) strong.textContent=liveRank();
    if(span) span.textContent=liveRankSub();
  }
  var c=q('#turf8969Coins');
  if(c) c.textContent=liveCoins();
  var o=overlay();
  if(o) document.body.classList.toggle('turf8969-has-rows',rowsExist(o));
}

function ensureParts(o){
  var shell=q('.football-game-shell',o)||o;
  var bg=q('#turf8969ExactBg',shell);
  if(!bg){
    bg=document.createElement('div');
    bg.id='turf8969ExactBg';
    shell.insertBefore(bg,shell.firstChild);
  }
  if(exactBg) bg.style.backgroundImage='url("'+exactBg+'")';
  else loadExactBg().then(function(src){var n=q('#turf8969ExactBg');if(src&&n)n.style.backgroundImage='url("'+src+'")'});

  if(!q('#turf8969Back',shell)){
    var b=document.createElement('button');
    b.id='turf8969Back';b.type='button';b.setAttribute('aria-label','Back to Games');b.onclick=closeGame;shell.appendChild(b);
  }
  if(!q('#turf8969Rank',shell)){
    var r=document.createElement('div');
    r.id='turf8969Rank';r.innerHTML='<strong>—</strong><span>DAILY RANK</span>';shell.appendChild(r);
  }
  if(!q('#turf8969Coins',shell)){
    var c=document.createElement('div');c.id='turf8969Coins';c.textContent='—';shell.appendChild(c);
  }
  updateHud();
}

function mount(){
  if(mounting || !shouldMount()) return;
  mounting=true;
  var o=overlay();
  cleanupOldAttempts();
  installCss();
  document.body.classList.add('turf8969-players');
  ensureParts(o);
  mounting=false;
}

function reconcile(){
  if(shouldMount()){
    mount();
    updateHud();
  }else if(document.body.classList.contains('turf8969-players')){
    restore();
  }
}

installCss();
loadExactBg();
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',reconcile,{once:true});
else reconcile();

var mo=new MutationObserver(function(){reconcile()});
try{mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','data-fg-mode','data-active']});}catch(e){}
window.addEventListener('hashchange',reconcile);
window.addEventListener('popstate',reconcile);
setInterval(function(){if(document.body.classList.contains('turf8969-players'))updateHud()},1000);
})();