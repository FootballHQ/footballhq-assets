/* TURF V89.66 — Active Players route guard + live game wiring */
(function(){
'use strict';
if(window.__TURF_AP_8966__)return;window.__TURF_AP_8966__=true;
var ART='https://footballhq.github.io/footballhq-assets/v88-36/art/active-players-approved.jpg?v=8966';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function text(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function navHomeActive(){
  var roots=[q('#fhqSidebar'),q('.fhq-sidebar'),q('nav')].filter(Boolean);
  for(var i=0;i<roots.length;i++){
    var a=qa('.active,.selected,[aria-current="page"],[data-active="true"]',roots[i]);
    for(var j=0;j<a.length;j++)if(/^HOME$/i.test(text(a[j])))return true;
  }
  return false;
}
function explicitOpen(o){
  if(!o)return false;
  if(navHomeActive())return false;
  var aria=o.getAttribute('aria-hidden');
  return aria==='false'||o.classList.contains('open')||o.classList.contains('active')||o.classList.contains('show');
}
function playersMode(o){
  var m=q('.fg-mode.active[data-fg-mode]',o);
  if(m&&m.dataset&&m.dataset.fgMode)return m.dataset.fgMode==='players';
  return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(text(o));
}
function shouldMount(){var o=overlay();return !!(o&&explicitOpen(o)&&playersMode(o))}
function dailyRank(){
  var selectors=['#fhqDailyRank','[data-daily-rank]','.fhq-daily-rank','#fhqDashRank','[data-user-rank]'];
  for(var i=0;i<selectors.length;i++){
    var el=q(selectors[i]);if(!el)continue;var s=text(el),m=s.match(/#\s*([\d,]+)/)||s.match(/rank\D*([\d,]+)/i)||s.match(/^([\d,]+)$/);
    if(m)return '#'+m[1];
  }
  return '—';
}
function coins(){var el=q('#fhqGlobalCoins')||q('[data-turf-coins]');var s=text(el).replace(/[^\d,]/g,'');return s||'—'}
var ids=['ap8966screen','ap8966back','ap8966rank','ap8966coins'];
function rm(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}}
function purgeLegacy(){
 ['ap8957img','ap8958canvas','ap8959canvas','ap8962screen','ap8963screen','ap8964screen','ap8965screen','ap8963back','ap8964back','ap8965back','ap8963rank','ap8964rank','ap8965rank','ap8963coins','ap8964coins','ap8965coins','turf8951Brand','turf8951Back','turf8951Atmosphere','turf8952Hero','turf8952Brand','turf8953Stage','turf8953Hud','turf8953Ball','turf8954ExactBg'].forEach(rm);
 qa('.turf8953-player,.turf8951-active-page').forEach(function(n){try{n.remove()}catch(e){}});
 document.body.classList.remove('ap8957','ap8963','ap8963rows','ap8964','ap8964rows','ap8965','ap8965rows','turf8952-players','turf8953-players');
}
function restoreHome(forceOverlayClosed){
 document.body.classList.remove('ap8966','ap8966rows','turf-game-fullscreen-8970');
 ids.forEach(rm);
 var o=overlay();
 if(o){var c=q('.fg-close',o);if(c)c.style.removeProperty('display');
   if(forceOverlayClosed){o.classList.remove('open','active','show');o.setAttribute('aria-hidden','true');o.style.removeProperty('display');}
 }
}
function closeGame(){var o=overlay();if(!o){restoreHome(false);return}var c=q('.fg-close',o)||q('#fgCloseGame',o);if(c){c.click();setTimeout(function(){restoreHome(true)},0)}else restoreHome(true)}
function css(){if(q('#ap8966css'))return;var s=document.createElement('style');s.id='ap8966css';s.textContent=`
#ap8966screen,#ap8966back,#ap8966rank,#ap8966coins{display:none!important}
body.ap8966{overflow:hidden!important;background:#01060b!important}
body.ap8966 #fhqSidebar,body.ap8966 .fhq-sidebar,body.ap8966 #turfTopbar,body.ap8966 #fhqMobileTopbar,body.ap8966 #fhqWalletBar{display:none!important}
body.ap8966 #footballGameOverlay,body.ap8966 .football-game-overlay,body.ap8966 .fg-game-overlay{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;margin:0!important;padding:0!important;overflow:hidden!important;background:#01060b!important;z-index:2147482000!important}
body.ap8966 #footballGameOverlay .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:hidden!important}
body.ap8966 #ap8966screen{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;object-fit:fill!important;z-index:2147482001!important;pointer-events:none!important}
body.ap8966 #footballGameOverlay .fg-head,body.ap8966 #footballGameOverlay .fg-modes,body.ap8966 #footballGameOverlay .fg-special-title,body.ap8966 #footballGameOverlay .fg-special-sub,body.ap8966 #footballGameOverlay .fg-game-title,body.ap8966 #footballGameOverlay .fg-game-sub,body.ap8966 #footballGameOverlay .fg-prompt,body.ap8966 #footballGameOverlay .fg-instruction,body.ap8966 #footballGameOverlay .fg-description,body.ap8966 #footballGameOverlay .fg-legend{display:none!important}
body.ap8966 #ap8966back{display:block!important;position:fixed;left:1.05%;top:2%;width:14.5%;height:6.3%;z-index:2147482055;border:0;background:transparent;color:transparent;cursor:pointer}
body.ap8966 #footballGameOverlay .fg-toolbar{display:flex!important;position:fixed!important;left:36.2%!important;top:43%!important;width:28.2%!important;height:6.2%!important;z-index:2147482050!important;gap:2%!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important}
body.ap8966 #footballGameOverlay .fg-playtype{flex:1 1 0!important;height:100%!important;min-height:0!important;opacity:0!important;pointer-events:auto!important;cursor:pointer!important}
body.ap8966 #footballGameOverlay .fg-body,body.ap8966 #footballGameOverlay #fgSpecialGame,body.ap8966 #footballGameOverlay .fg-special-game{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important;z-index:2147482040!important}
body.ap8966 #footballGameOverlay .fg-input-row,body.ap8966 #footballGameOverlay .fg-guess-row{display:flex!important;position:fixed!important;left:24.45%!important;top:52.45%!important;width:52%!important;height:8.05%!important;z-index:2147482051!important;margin:0!important;padding:0!important;pointer-events:auto!important}
body.ap8966 #footballGameOverlay #fgInput{flex:1 1 auto!important;height:100%!important;margin:0!important;padding:0 1.6vw!important;border:0!important;background:transparent!important;box-shadow:none!important;color:#fff!important;font-size:clamp(16px,1.45vw,23px)!important;font-weight:650!important;outline:none!important;caret-color:#46d5ff!important}
body.ap8966 #footballGameOverlay #fgInput::placeholder{color:transparent!important}
body.ap8966 #footballGameOverlay #fgGuessBtn{flex:0 0 19.7%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:transparent!important;opacity:0!important;pointer-events:auto!important;cursor:pointer!important}
body.ap8966 #footballGameOverlay #fgSuggestions{position:absolute!important;left:0!important;right:19.7%!important;top:100%!important;z-index:2147482070!important;background:#061522!important;border:1px solid #158fd1!important;color:#fff!important;pointer-events:auto!important}
body.ap8966 #footballGameOverlay table{position:fixed!important;left:12.4%!important;top:62.8%!important;width:75.5%!important;z-index:2147482052!important;margin:0!important;border-collapse:separate!important;border-spacing:0 8px!important;background:transparent!important;border:0!important;pointer-events:none!important}
body.ap8966 #footballGameOverlay table thead,body.ap8966 #footballGameOverlay table tbody{visibility:hidden!important}
body.ap8966.ap8966rows #footballGameOverlay table tbody{visibility:visible!important}
body.ap8966.ap8966rows #footballGameOverlay table tbody tr{height:8.4vh!important}
body.ap8966.ap8966rows #footballGameOverlay table tbody td{background:#5f6972!important;color:#fff!important;border:0!important;padding:.65vh .65vw!important;font-weight:800!important;font-size:clamp(10px,.78vw,14px)!important}
body.ap8966.ap8966rows #footballGameOverlay table tbody tr td:nth-child(4){background:#c49a25!important}
body.ap8966.ap8966rows #footballGameOverlay table tbody td.match,body.ap8966.ap8966rows #footballGameOverlay table tbody td.exact{background:#328a3d!important}
body.ap8966 #ap8966rank{display:flex!important;position:fixed;right:3.4%;top:44.3%;width:10.1%;height:7.5%;z-index:2147482054;background:#03131f;flex-direction:column;justify-content:center;padding-left:1.15vw;box-sizing:border-box;color:#fff;pointer-events:none}
#ap8966rank strong{font:1000 clamp(17px,1.45vw,27px)/1 system-ui}#ap8966rank span{margin-top:7px;color:#2cc8ff;font:900 clamp(8px,.6vw,11px)/1 system-ui;letter-spacing:.05em}
body.ap8966 #ap8966coins{display:flex!important;position:fixed;left:61.1%;top:2.45%;width:8.4%;height:5.2%;z-index:2147482054;background:#061522;align-items:center;justify-content:center;color:#fff;font:1000 clamp(10px,.85vw,15px)/1 system-ui;pointer-events:none}
`;document.head.appendChild(s)}
function mount(){
 css();
 if(navHomeActive()){restoreHome(true);return}
 if(!shouldMount()){restoreHome(false);return}
 purgeLegacy();document.body.classList.add('ap8966');
 var o=overlay(),sh=q('.football-game-shell',o)||o;
 var im=q('#ap8966screen');if(!im){im=document.createElement('img');im.id='ap8966screen';im.alt='';im.src=ART;sh.insertBefore(im,sh.firstChild)}
 if(!q('#ap8966back',sh)){var b=document.createElement('button');b.id='ap8966back';b.type='button';b.setAttribute('aria-label','Back to Games');b.onclick=closeGame;sh.appendChild(b)}
 if(!q('#ap8966rank',sh)){var r=document.createElement('div');r.id='ap8966rank';r.innerHTML='<strong>—</strong><span>DAILY RANK</span>';sh.appendChild(r)}
 if(!q('#ap8966coins',sh)){var c=document.createElement('div');c.id='ap8966coins';sh.appendChild(c)}
 q('#ap8966rank strong',sh).textContent=dailyRank();q('#ap8966coins',sh).textContent=coins();
 var g=q('#fgSpecialGame',o)||q('.fg-special-game',o),rows=g?qa('tbody tr',g).filter(function(x){return text(x).length>0}):[];document.body.classList.toggle('ap8966rows',rows.length>0);
 var cl=q('.fg-close',o);if(cl)cl.style.setProperty('display','none','important');
}
function clickedHome(e){var n=e.target&&e.target.closest&&e.target.closest('a,button,[role="button"],.nav-item,.sidebar-item');return n&&/^(🏠\s*)?HOME$/i.test(text(n))}
document.addEventListener('click',function(e){if(clickedHome(e)){setTimeout(function(){restoreHome(true)},0);setTimeout(function(){restoreHome(true)},150);return}var item=e.target.closest&&e.target.closest('.fg-suggestion,[data-name],[role="option"]');if(item)setTimeout(function(){qa('#fgSuggestions,.fg-suggestions,[role="listbox"]').forEach(function(box){box.innerHTML='';box.classList.remove('show','open','active');box.style.setProperty('display','none','important')})},0);[0,25,80,180,350].forEach(function(ms){setTimeout(mount,ms)})},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){mount();setTimeout(mount,250)},{once:true});else{mount();setTimeout(mount,250)}
window.addEventListener('popstate',function(){setTimeout(mount,0)});
new MutationObserver(function(){setTimeout(mount,20)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden','aria-current']});
})();