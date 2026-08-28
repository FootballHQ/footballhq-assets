/* ============================================================
   TURF V89.65 — GAMES POLISH + ACTIVE PLAYERS ROUTE GUARD
   Keeps home/dashboard untouched. Approved Active Players shell
   only mounts while the real Current Players overlay is OPEN.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8965__) return;
window.__TURF_V8965__=true;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;var c=getComputedStyle(el),r=el.getBoundingClientRect();return c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0'&&r.width>0&&r.height>0}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function overlayOpen(o){
  if(!o||!visible(o))return false;
  if(o.getAttribute('aria-hidden')==='true')return false;
  return o.getAttribute('aria-hidden')==='false'||o.classList.contains('open')||o.classList.contains('active')||o.classList.contains('show');
}
function activePlayers(){
  var o=overlay(); if(!overlayOpen(o)) return false;
  var m=q('.fg-mode.active[data-fg-mode]',o);
  if(m&&m.dataset&&m.dataset.fgMode)return m.dataset.fgMode==='players';
  return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(txt(o));
}
document.addEventListener('click',function(e){
  var item=e.target.closest&&e.target.closest('.fg-suggestion,[data-name],[role="option"]');
  if(!item)return;
  setTimeout(function(){qa('#fgSuggestions,.fg-suggestions,[role="listbox"]').forEach(function(box){box.innerHTML='';box.classList.remove('show','open','active');box.style.setProperty('display','none','important')})},0);
},true);

var APPROVED='https://footballhq.github.io/footballhq-assets/v88-36/art/active-players-approved.jpg?v=8965';
var IDS=['ap8965screen','ap8965back','ap8965rank','ap8965coins'];
function rank(){var els=[q('#fhqDailyRank'),q('#fhqDashRank'),q('[data-user-rank]'),q('.fhq-daily-rank')].filter(Boolean);for(var i=0;i<els.length;i++){var x=txt(els[i]),m=x.match(/#\s*([\d,]+)/)||x.match(/rank\D*([\d,]+)/i);if(m)return '#'+m[1]}return '—'}
function coins(){var x=txt(q('#fhqGlobalCoins')).replace(/[^\d,]/g,'');return x||'—'}
function removeId(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}}
function purgeLegacy(){
 ['ap8959canvas','ap8958canvas','ap8957img','ap8962screen','ap8963screen','ap8964screen','ap8963back','ap8964back','ap8963rank','ap8964rank','ap8963coins','ap8964coins','turf8953Stage','turf8953Hud','turf8953Ball','turf8954ExactBg','turf8952Hero','turf8952Brand','turf8951Brand','turf8951Back','turf8951Atmosphere'].forEach(removeId);
 qa('.turf8953-player,.turf8951-active-page').forEach(function(n){try{n.remove()}catch(e){}});
 ['turf8952ActiveCss','turf8953ApprovedCss','turf8951ActiveCss','ap8962css','ap8963css','ap8964css'].forEach(removeId);
 document.body.classList.remove('ap8957','ap8963','ap8963rows','ap8964','ap8964rows','turf8952-players','turf8953-players');
}
function cleanup(){
 document.body.classList.remove('ap8965','ap8965rows');
 IDS.forEach(removeId);
 var o=overlay(),cl=o&&q('.fg-close',o); if(cl)cl.style.removeProperty('display');
}
function closeGame(){var o=overlay();if(!o)return;var b=q('.fg-close',o)||q('#fgCloseGame',o);if(b){b.click();return}o.classList.remove('open','active','show');o.setAttribute('aria-hidden','true');cleanup()}
function css(){
 if(q('#ap8965css'))return;
 var s=document.createElement('style');s.id='ap8965css';s.textContent=`
#ap8965screen,#ap8965back,#ap8965rank,#ap8965coins{display:none!important}
body.ap8965{overflow:hidden!important;background:#01060b!important}
body.ap8965 #fhqSidebar,body.ap8965 .fhq-sidebar,body.ap8965 #turfTopbar,body.ap8965 #fhqMobileTopbar,body.ap8965 #fhqWalletBar{display:none!important}
body.ap8965 #fhqMain,body.ap8965 .fhq-main,body.ap8965 .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.ap8965 #footballGameOverlay,body.ap8965 .football-game-overlay,body.ap8965 .fg-game-overlay{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;background:#01060b!important;z-index:2147482000!important;display:block!important}
body.ap8965 #footballGameOverlay .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:hidden!important}
body.ap8965 #ap8965screen{display:block!important;position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;object-fit:fill!important;z-index:2147482001!important;pointer-events:none!important;background:#01060b!important}
body.ap8965 #footballGameOverlay .fg-head,body.ap8965 #footballGameOverlay .fg-modes,body.ap8965 #footballGameOverlay .fg-special-title,body.ap8965 #footballGameOverlay .fg-special-sub,body.ap8965 #footballGameOverlay .fg-game-title,body.ap8965 #footballGameOverlay .fg-game-sub,body.ap8965 #footballGameOverlay .fg-prompt,body.ap8965 #footballGameOverlay .fg-instruction,body.ap8965 #footballGameOverlay .fg-description,body.ap8965 #footballGameOverlay .fg-legend{display:none!important}
body.ap8965 #ap8965back{display:block!important;position:fixed;left:1.05%;top:2%;width:14.5%;height:6.3%;z-index:2147482055;border:0;background:transparent;color:transparent;cursor:pointer}
body.ap8965 #footballGameOverlay .fg-toolbar{display:flex!important;position:fixed!important;left:36.2%!important;top:43%!important;width:28.2%!important;height:6.2%!important;z-index:2147482050!important;gap:2%!important;margin:0!important;padding:0!important;transform:none!important;background:transparent!important;border:0!important}
body.ap8965 #footballGameOverlay .fg-playtype{flex:1 1 0!important;height:100%!important;min-height:0!important;opacity:0!important;pointer-events:auto!important;cursor:pointer!important}
body.ap8965 #footballGameOverlay .fg-body,body.ap8965 #footballGameOverlay #fgSpecialGame,body.ap8965 #footballGameOverlay .fg-special-game{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important;z-index:2147482040!important}
body.ap8965 #footballGameOverlay .fg-input-row,body.ap8965 #footballGameOverlay .fg-guess-row{display:flex!important;position:fixed!important;left:24.45%!important;top:52.45%!important;width:52%!important;height:8.05%!important;z-index:2147482051!important;margin:0!important;padding:0!important;pointer-events:auto!important}
body.ap8965 #footballGameOverlay #fgInput{flex:1 1 auto!important;height:100%!important;margin:0!important;padding:0 1.6vw!important;border:0!important;background:transparent!important;box-shadow:none!important;color:#fff!important;font-size:clamp(16px,1.45vw,23px)!important;font-weight:650!important;outline:none!important;caret-color:#46d5ff!important}
body.ap8965 #footballGameOverlay #fgInput::placeholder{color:transparent!important}
body.ap8965 #footballGameOverlay #fgGuessBtn{flex:0 0 19.7%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:transparent!important;opacity:0!important;pointer-events:auto!important;cursor:pointer!important}
body.ap8965 #footballGameOverlay #fgSuggestions{position:absolute!important;left:0!important;right:19.7%!important;top:100%!important;z-index:2147482070!important;background:#061522!important;border:1px solid #158fd1!important;color:#fff!important;pointer-events:auto!important}
body.ap8965 #footballGameOverlay table{position:fixed!important;left:12.4%!important;top:62.8%!important;width:75.5%!important;z-index:2147482052!important;margin:0!important;border-collapse:separate!important;border-spacing:0 8px!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important}
body.ap8965 #footballGameOverlay table thead,body.ap8965 #footballGameOverlay table tbody{visibility:hidden!important}
body.ap8965.ap8965rows #footballGameOverlay table tbody{visibility:visible!important}
body.ap8965.ap8965rows #footballGameOverlay table tbody tr{height:8.4vh!important}
body.ap8965.ap8965rows #footballGameOverlay table tbody td{background:#5f6972!important;color:#fff!important;border:0!important;padding:.65vh .65vw!important;font-weight:800!important;font-size:clamp(10px,.78vw,14px)!important;vertical-align:middle!important}
body.ap8965.ap8965rows #footballGameOverlay table tbody tr td:nth-child(4){background:#c49a25!important}
body.ap8965.ap8965rows #footballGameOverlay table tbody tr td.match,body.ap8965.ap8965rows #footballGameOverlay table tbody tr td.exact{background:#328a3d!important}
body.ap8965 #ap8965rank{display:flex!important;position:fixed;right:3.4%;top:44.3%;width:10.1%;height:7.5%;z-index:2147482054;background:#03131f;flex-direction:column;justify-content:center;padding-left:1.15vw;box-sizing:border-box;color:#fff;pointer-events:none}
#ap8965rank strong{font:1000 clamp(17px,1.45vw,27px)/1 system-ui}#ap8965rank span{margin-top:7px;color:#2cc8ff;font:900 clamp(8px,.6vw,11px)/1 system-ui;letter-spacing:.05em}
body.ap8965 #ap8965coins{display:flex!important;position:fixed;left:61.1%;top:2.45%;width:8.4%;height:5.2%;z-index:2147482054;background:#061522;align-items:center;justify-content:center;color:#fff;font:1000 clamp(10px,.85vw,15px)/1 system-ui;pointer-events:none}
`;
 document.head.appendChild(s);
}
function mount(){
 css();
 if(!activePlayers()){cleanup();return}
 purgeLegacy();
 document.body.classList.add('ap8965');
 var o=overlay(),sh=q('.football-game-shell',o)||o;
 var im=q('#ap8965screen');if(!im){im=document.createElement('img');im.id='ap8965screen';im.alt='';im.src=APPROVED;sh.insertBefore(im,sh.firstChild)}
 if(!q('#ap8965back',sh)){var b=document.createElement('button');b.id='ap8965back';b.type='button';b.setAttribute('aria-label','Back to Games');b.onclick=closeGame;sh.appendChild(b)}
 if(!q('#ap8965rank',sh)){var r=document.createElement('div');r.id='ap8965rank';r.innerHTML='<strong>—</strong><span>YOUR RANK</span>';sh.appendChild(r)}
 if(!q('#ap8965coins',sh)){var c=document.createElement('div');c.id='ap8965coins';sh.appendChild(c)}
 var r=q('#ap8965rank');if(r)q('strong',r).textContent=rank();var c=q('#ap8965coins');if(c)c.textContent=coins();
 var g=q('#fgSpecialGame',o)||q('.fg-special-game',o),rows=g?qa('tbody tr',g).filter(function(x){return txt(x).length>0}):[];
 document.body.classList.toggle('ap8965rows',rows.length>0);
 var cl=q('.fg-close',o);if(cl)cl.style.setProperty('display','none','important');
}
function schedule(){[0,25,60,120,220,400,700,1100].forEach(function(ms){setTimeout(mount,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',schedule,true);
window.addEventListener('popstate',schedule);
if(window.MutationObserver)new MutationObserver(function(){setTimeout(mount,20)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
})();