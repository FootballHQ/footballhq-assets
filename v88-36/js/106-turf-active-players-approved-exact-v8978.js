/* ============================================================
   TURF V89.78 — ACTIVE PLAYERS APPROVED EXACT SCREEN
   Uses the approved full-resolution Active Players artwork as the visual shell.
   The existing native game engine remains interactive above it.
   Strict mount rule: Current Players + explicitly-open game overlay only.
   Home and every other TURF page are left untouched.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_APPROVED_EXACT_8978__)return;
window.__TURF_ACTIVE_PLAYERS_APPROVED_EXACT_8978__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var CHUNKS=['active-players-exact-8968-0.txt','active-players-exact-8968-1.txt'];
var exactBg='';
var loadingBg=null;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function tx(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function homeActive(){
  var roots=[q('#fhqSidebar'),q('.fhq-sidebar'),q('nav')].filter(Boolean);
  for(var i=0;i<roots.length;i++){
    var nodes=qa('.active,.selected,[aria-current="page"],[data-active="true"]',roots[i]);
    for(var j=0;j<nodes.length;j++){
      var t=tx(nodes[j]).replace(/^🏠\s*/, '');
      if(/^HOME$/i.test(t))return true;
    }
  }
  return false;
}
function explicitlyOpen(o){
  if(!o||homeActive())return false;
  if(o.getAttribute('aria-hidden')==='true')return false;
  return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||o.classList.contains('show');
}
function playersMode(o){
  if(!o)return false;
  var m=q('.fg-mode.active[data-fg-mode]',o);
  if(m&&m.dataset&&m.dataset.fgMode)return String(m.dataset.fgMode)==='players';
  var current=q('[data-fg-mode="players"].active',o);
  if(current)return true;
  return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(tx(o));
}
function shouldMount(){var o=overlay();return !!(o&&explicitlyOpen(o)&&playersMode(o)&&!homeActive())}
function loadBg(){
  if(exactBg)return Promise.resolve(exactBg);
  if(loadingBg)return loadingBg;
  var stamp='8978-'+Date.now();
  loadingBg=Promise.all(CHUNKS.map(function(f){
    return fetch(ROOT+f+'?v='+stamp,{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('art '+r.status);return r.text()});
  })).then(function(parts){
    exactBg='data:image/webp;base64,'+parts.join('').replace(/\s+/g,'');
    return exactBg;
  }).catch(function(e){console.error('[TURF 89.78] approved art failed',e);return ''});
  return loadingBg;
}
function removeOldClasses(){
  var b=document.body;if(!b)return;
  ['turf8951-players','turf8952-players','turf8953-players','turf8954-players','turf8967-players','turf8968-players','turf8969-players','turf8972-players','turf8972-has-rows','turf8954-has-rows','turf8969-has-rows'].forEach(function(c){b.classList.remove(c)});
}
function css(){
  if(q('#turf8978ExactCss'))return;
  var s=document.createElement('style');s.id='turf8978ExactCss';s.textContent=`
/* Permanently suppress retired Active Players visual experiments. */
#turf8972Screen,#turf8954ExactBg,#turf8969ExactBg,#turf8953Hud,#turf8953Stage,#turf8953Cards,#turf8953Ball,#turf8953Empty,#turf8953Legend,#turf8952Brand,#turf8952Hero,#turf8951Brand,#turf8951Back,#turf8951Atmosphere,#turf8954Back,#turf8954RankLive,#turf8954CoinsLive,#turf8954ResultsCover{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8978-exact{overflow:hidden!important;background:#01070d!important}
body.turf8978-exact #fhqSidebar,body.turf8978-exact .fhq-sidebar,body.turf8978-exact #turfTopbar,body.turf8978-exact #fhqMobileTopbar,body.turf8978-exact #fhqWalletBar{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.turf8978-exact #fhqMain,body.turf8978-exact .fhq-main,body.turf8978-exact .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.turf8978-exact #footballGameOverlay,body.turf8978-exact .football-game-overlay,body.turf8978-exact .fg-game-overlay{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;background:#01070d!important;z-index:2147482000!important;transform:none!important}
body.turf8978-exact #footballGameOverlay .football-game-shell,body.turf8978-exact .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:hidden!important;transform:none!important}
#turf8978ExactBg{display:none;position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483100;background-position:center center;background-repeat:no-repeat;background-size:100% 100%;pointer-events:none}
body.turf8978-exact #turf8978ExactBg{display:block!important}
body.turf8978-exact #footballGameOverlay .fg-head,body.turf8978-exact #footballGameOverlay .fg-modes,body.turf8978-exact #footballGameOverlay .fg-special-title,body.turf8978-exact #footballGameOverlay .fg-special-sub,body.turf8978-exact #footballGameOverlay .fg-game-title,body.turf8978-exact #footballGameOverlay .fg-game-sub{display:none!important;visibility:hidden!important}
#turf8978Back{display:none;position:fixed;left:1.05%;top:2.05%;width:14.35%;height:6.2%;z-index:2147483700;border:0;background:transparent;color:transparent;cursor:pointer}
body.turf8978-exact #turf8978Back{display:block!important}
body.turf8978-exact #footballGameOverlay .fg-toolbar{display:flex!important;visibility:visible!important;position:fixed!important;left:36.35%!important;top:43.05%!important;width:27.8%!important;height:6.25%!important;z-index:2147483650!important;gap:2%!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;transform:none!important;pointer-events:auto!important}
body.turf8978-exact #footballGameOverlay .fg-toolbar .fg-playtype{display:block!important;visibility:visible!important;flex:1 1 0!important;height:100%!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;opacity:0!important;color:transparent!important;cursor:pointer!important;pointer-events:auto!important}
body.turf8978-exact #footballGameOverlay .fg-body{display:block!important;visibility:visible!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important;z-index:2147483400!important;pointer-events:none!important}
body.turf8978-exact #footballGameOverlay #fgSpecialGame,body.turf8978-exact #footballGameOverlay .fg-special-game{display:block!important;visibility:visible!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;pointer-events:none!important}
body.turf8978-exact #footballGameOverlay .fg-input-row,body.turf8978-exact #footballGameOverlay .fg-guess-row{display:flex!important;visibility:visible!important;position:fixed!important;left:24.45%!important;top:52.35%!important;width:52.1%!important;height:8.15%!important;z-index:2147483660!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;pointer-events:auto!important;transform:none!important}
body.turf8978-exact #footballGameOverlay #fgInput{display:block!important;visibility:visible!important;box-sizing:border-box!important;flex:1 1 auto!important;min-width:0!important;height:100%!important;margin:0!important;padding:0 1.55vw!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:#eef7ff!important;font-size:clamp(16px,1.45vw,24px)!important;font-weight:600!important;outline:none!important;caret-color:#44d4ff!important;pointer-events:auto!important}
body.turf8978-exact #footballGameOverlay #fgInput::placeholder{color:transparent!important}
body.turf8978-exact #footballGameOverlay #fgGuessBtn{display:block!important;visibility:visible!important;flex:0 0 19.5%!important;height:100%!important;min-width:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:transparent!important;opacity:0!important;cursor:pointer!important;pointer-events:auto!important}
body.turf8978-exact #footballGameOverlay #fgSuggestions,body.turf8978-exact #footballGameOverlay .fg-suggestions{display:block;visibility:visible;position:absolute!important;left:0!important;right:19.5%!important;top:100%!important;z-index:2147483800!important;max-height:27vh!important;overflow:auto!important;background:#061522!important;border:1px solid #159edb!important;border-radius:9px!important;color:#fff!important;pointer-events:auto!important}
#turf8978ResultsCover{display:none;position:fixed;left:12.35%;top:69.7%;width:75.7%;height:18.6%;z-index:2147483450;background:linear-gradient(180deg,#06131e,#03101a);border-radius:0 0 16px 16px;pointer-events:none}
body.turf8978-exact.turf8978-has-rows #turf8978ResultsCover{display:block!important}
body.turf8978-exact #footballGameOverlay table{display:table!important;visibility:visible!important;position:fixed!important;left:12.35%!important;top:62.7%!important;width:75.7%!important;z-index:2147483600!important;margin:0!important;border-collapse:separate!important;border-spacing:7px 7px!important;background:transparent!important;border:0!important;box-shadow:none!important;table-layout:fixed!important;pointer-events:none!important;transform:none!important}
body.turf8978-exact #footballGameOverlay table thead{visibility:hidden!important}
body.turf8978-exact #footballGameOverlay table thead tr{height:5.9vh!important}
body.turf8978-exact #footballGameOverlay table tbody{visibility:hidden!important}
body.turf8978-exact.turf8978-has-rows #footballGameOverlay table tbody{visibility:visible!important}
body.turf8978-exact.turf8978-has-rows #footballGameOverlay table tbody tr{height:7.9vh!important;background:transparent!important}
body.turf8978-exact.turf8978-has-rows #footballGameOverlay table tbody td{background:#606a73!important;color:#fff!important;border:0!important;border-radius:9px!important;padding:.65vh .7vw!important;font-weight:800!important;font-size:clamp(10px,.78vw,14px)!important;vertical-align:middle!important;box-shadow:none!important}
#turf8978RankLive,#turf8978CoinsLive{display:none;position:fixed;z-index:2147483720;pointer-events:none;background:#03121e;color:#fff}
body.turf8978-exact #turf8978RankLive,body.turf8978-exact #turf8978CoinsLive{display:flex!important}
#turf8978RankLive{left:87.2%;top:45.55%;width:9.4%;height:6.35%;flex-direction:column;justify-content:center;padding-left:.35%;box-sizing:border-box}
#turf8978RankLive strong{font:1000 clamp(18px,1.45vw,27px)/1 system-ui;white-space:nowrap}#turf8978RankLive span{margin-top:7px;color:#31c8ff;font:900 clamp(8px,.58vw,11px)/1 system-ui;letter-spacing:.05em}
#turf8978CoinsLive{left:62.05%;top:3.28%;width:6.6%;height:3.45%;align-items:center;font:1000 clamp(10px,.83vw,15px)/1 system-ui}
@media(max-width:850px){#turf8978RankLive{left:86.8%;width:10%}#turf8978CoinsLive{left:61.7%;width:7%}body.turf8978-exact #footballGameOverlay #fgInput{font-size:14px!important}}
`;
  (document.head||document.documentElement).appendChild(s);
}
function rankValue(){
  var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];
  for(var i=0;i<sels.length;i++){
    var e=q(sels[i]);if(!e)continue;var t=tx(e);if(!t||/loading/i.test(t))continue;
    var m=t.match(/#\s*([\d,]+)/)||t.match(/rank\D*([\d,]+)/i);if(m)return '#'+m[1];
  }
  return '—';
}
function rankSub(){
  var sels=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];
  for(var i=0;i<sels.length;i++){var e=q(sels[i]);if(!e)continue;var m=tx(e).match(/top\s*([\d.]+%)/i);if(m)return 'TOP '+m[1]}
  return 'DAILY RANK';
}
function coinsValue(){var e=q('#fhqGlobalCoins')||q('[data-turf-coins]');var t=tx(e).replace(/[^\d,]/g,'');return t||'—'}
function closeGame(){
  var o=overlay();if(!o)return;
  var c=q('.fg-close',o)||q('#fgCloseGame',o)||q('[data-game-close]',o);
  if(c){try{c.click();return}catch(e){}}
  o.classList.remove('open','active','show');o.setAttribute('aria-hidden','true');
}
function ensure(o){
  var shell=q('.football-game-shell',o)||o;
  var bg=q('#turf8978ExactBg',shell);if(!bg){bg=document.createElement('div');bg.id='turf8978ExactBg';shell.appendChild(bg)}
  if(exactBg)bg.style.backgroundImage='url("'+exactBg+'")';
  else loadBg().then(function(src){var n=q('#turf8978ExactBg');if(src&&n)n.style.backgroundImage='url("'+src+'")'});
  var back=q('#turf8978Back',shell);if(!back){back=document.createElement('button');back.type='button';back.id='turf8978Back';back.setAttribute('aria-label','Back to Games');back.addEventListener('click',closeGame);shell.appendChild(back)}
  var cover=q('#turf8978ResultsCover',shell);if(!cover){cover=document.createElement('div');cover.id='turf8978ResultsCover';shell.appendChild(cover)}
  var rank=q('#turf8978RankLive',shell);if(!rank){rank=document.createElement('div');rank.id='turf8978RankLive';rank.innerHTML='<strong>—</strong><span>DAILY RANK</span>';shell.appendChild(rank)}
  var coins=q('#turf8978CoinsLive',shell);if(!coins){coins=document.createElement('div');coins.id='turf8978CoinsLive';shell.appendChild(coins)}
}
function cleanupHome(){
  removeOldClasses();
  if(document.body){document.body.classList.remove('turf8978-exact','turf8978-has-rows')}
}
function sync(){
  css();var o=overlay(),on=shouldMount();
  removeOldClasses();
  if(!document.body)return;
  if(!on){cleanupHome();return}
  document.body.classList.add('turf8978-exact');
  ensure(o);
  var rank=q('#turf8978RankLive');if(rank){var st=q('strong',rank),sp=q('span',rank);if(st)st.textContent=rankValue();if(sp)sp.textContent=rankSub()}
  var coins=q('#turf8978CoinsLive');if(coins)coins.textContent=coinsValue();
  var game=q('#fgSpecialGame',o)||q('.fg-special-game',o)||o;
  var rows=qa('tbody tr',game).filter(function(r){return tx(r).length>0&&getComputedStyle(r).display!=='none'});
  document.body.classList.toggle('turf8978-has-rows',rows.length>0);
}
function schedule(){[0,30,80,160,320,650,1200,2200].forEach(function(ms){setTimeout(sync,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-game-open],#footballGameOverlay,.fg-game-overlay,.fg-mode,.fg-playtype,#fgGuessBtn,#turf8978Back'))schedule()},true);
window.addEventListener('resize',sync);
window.addEventListener('popstate',schedule);
var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(sync,35)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','aria-hidden','style']});
})();
