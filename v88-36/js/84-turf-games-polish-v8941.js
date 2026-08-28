/* ============================================================
   TURF V89.41 — GAMES POLISH / REGRESSION FIXES
   Load AFTER 83-turf-games-master-rules-v8940.js.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8941_POLISH__) return;
window.__TURF_V8941_POLISH__=true;
function q(s,r){return (r||document).querySelector(s)}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;var c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0'}
function host(){return q('#fgSpecialGame')||q('#fgGridGame')||q('#footballGameOverlay')||document.body}
function titleText(){var h=host();return qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',h).filter(visible).map(txt).join(' | ').toUpperCase()}
function mode(){var t=titleText();if(/\b(ACTIVE PLAYERS|CURRENT PLAYERS|PLAYERS)\b/.test(t))return 'players';if(/\b(NFL GRID|GRID)\b/.test(t))return 'grid';if(/\bLEGENDS\b/.test(t))return 'legends';if(/WHO AM I\?/.test(t))return 'whoami';if(/CAREER PATH/.test(t))return 'career';if(/HIGHER\s*\/\s*LOWER/.test(t))return 'higherlower';if(/\b(NFL IMPOSTER|IMPOSTER)\b/.test(t))return 'imposter';if(/\b(NFL CONNECTIONS|CONNECTIONS)\b/.test(t))return 'connections';if(/STAT LINE/.test(t))return 'statline';if(/DRAFT CLASS/.test(t))return 'draftclass';if(/\bMOGGER\b/.test(t))return 'mogger';if(/\b(NFL TIMELINE|TIMELINE)\b/.test(t))return 'timeline';if(/FRANCHISE FINDER|GUESS THE TEAM/.test(t))return 'franchise';if(/DEPTH CHART/.test(t))return 'depth';return ''}
function daily(){var d=q('#fgDailyBtn'),u=q('#fgUnlimitedBtn');if(u&&u.classList.contains('active'))return false;if(d&&d.classList.contains('active'))return true;return /DAILY CHALLENGE/i.test(txt(host()))&&!/UNLIMITED SETUP|CHOOSE YOUR DIFFICULTY/i.test(txt(host()))}
document.addEventListener('click',function(e){var item=e.target.closest&&e.target.closest('.fg-suggestion,[data-name],[role="option"]');if(!item)return;setTimeout(function(){qa('#fgSuggestions,.fg-suggestions,[role="listbox"]').forEach(function(box){box.innerHTML='';box.classList.remove('show','open','active');box.style.setProperty('display','none','important')})},0)},true);
function run(){}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();

/* v89.64 Active Players authoritative screen.
   The approved screenshot is the ONLY visual shell. All older prototype
   renderers are actively removed/hidden so no CSS silhouettes or duplicate
   hero elements can sit above it. Real game controls remain interactive. */
(function(){
'use strict';
if(window.__TURF_AP_8964__)return;window.__TURF_AP_8964__=true;
var APPROVED='https://footballhq.github.io/footballhq-assets/v88-36/art/active-players-approved.jpg?v=8964';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function t(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function activePlayers(){var o=overlay();if(!o)return false;var m=q('.fg-mode.active[data-fg-mode]',o);if(m&&m.dataset&&m.dataset.fgMode)return m.dataset.fgMode==='players';return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(t(o))}
function rank(){var els=[q('#fhqDailyRank'),q('#fhqDashRank'),q('[data-user-rank]'),q('.fhq-daily-rank')].filter(Boolean);for(var i=0;i<els.length;i++){var x=t(els[i]),m=x.match(/#\s*([\d,]+)/)||x.match(/rank\D*([\d,]+)/i);if(m)return '#'+m[1]}return '—'}
function coins(){var x=t(q('#fhqGlobalCoins')).replace(/[^\d,]/g,'');return x||'—'}
function purge(){
 ['ap8959canvas','ap8958canvas','turf8953Stage','turf8953Hud','turf8953Ball','turf8954ExactBg','turf8952Hero','turf8952Brand','turf8951Brand','turf8951Back','turf8951Atmosphere'].forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
 ['ap8957img','ap8962screen'].forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
 qa('.turf8953-player,.turf8951-active-page').forEach(function(n){try{n.remove()}catch(e){}});
 ['turf8952ActiveCss','turf8953ApprovedCss','turf8951ActiveCss'].forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
 document.body.classList.remove('turf8952-players','turf8953-players');
}
function closeGame(){var o=overlay();if(!o)return;var b=q('.fg-close',o)||q('#fgCloseGame',o);if(b){b.click();return}o.classList.remove('open','active');o.setAttribute('aria-hidden','true')}
function css(){if(q('#ap8964css'))return;var s=document.createElement('style');s.id='ap8964css';s.textContent=`
body.ap8964{overflow:hidden!important;background:#01060b!important}
body.ap8964 #fhqSidebar,body.ap8964 .fhq-sidebar,body.ap8964 #turfTopbar,body.ap8964 #fhqMobileTopbar,body.ap8964 #fhqWalletBar{display:none!important}
body.ap8964 #fhqMain,body.ap8964 .fhq-main,body.ap8964 .fhq-main-content{margin:0!important;padding:0!important;width:100%!important;max-width:none!important}
body.ap8964 #footballGameOverlay,body.ap8964 .football-game-overlay,body.ap8964 .fg-game-overlay{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;background:#01060b!important;z-index:2147482000!important;display:block!important}
body.ap8964 #footballGameOverlay .football-game-shell{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:hidden!important}
#ap8964screen{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;object-fit:fill!important;z-index:2147482001!important;display:block!important;pointer-events:none!important;background:#01060b!important}
/* absolutely suppress every known legacy prototype layer */
body.ap8964 #turf8952Hero,body.ap8964 #turf8952Brand,body.ap8964 #turf8953Stage,body.ap8964 #turf8953Hud,body.ap8964 #turf8953Ball,body.ap8964 #turf8954ExactBg,body.ap8964 #turf8951Brand,body.ap8964 #turf8951Back,body.ap8964 #turf8951Atmosphere,body.ap8964 .turf8953-player,body.ap8964 .turf8951-active-page{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
body.ap8964 #footballGameOverlay .fg-head,body.ap8964 #footballGameOverlay .fg-modes,body.ap8964 #footballGameOverlay .fg-special-title,body.ap8964 #footballGameOverlay .fg-special-sub,body.ap8964 #footballGameOverlay .fg-game-title,body.ap8964 #footballGameOverlay .fg-game-sub,body.ap8964 #footballGameOverlay .fg-prompt,body.ap8964 #footballGameOverlay .fg-instruction,body.ap8964 #footballGameOverlay .fg-description,body.ap8964 #footballGameOverlay .fg-legend{display:none!important}
#ap8964back{position:fixed;left:1.05%;top:2%;width:14.5%;height:6.3%;z-index:2147482055;border:0;background:transparent;color:transparent;cursor:pointer}
body.ap8964 #footballGameOverlay .fg-toolbar{display:flex!important;position:fixed!important;left:36.2%!important;top:43.0%!important;width:28.2%!important;height:6.2%!important;z-index:2147482050!important;gap:2%!important;margin:0!important;padding:0!important;transform:none!important;background:transparent!important;border:0!important}
body.ap8964 #footballGameOverlay .fg-playtype{flex:1 1 0!important;height:100%!important;min-height:0!important;opacity:0!important;pointer-events:auto!important;cursor:pointer!important}
body.ap8964 #footballGameOverlay .fg-body,body.ap8964 #footballGameOverlay #fgSpecialGame,body.ap8964 #footballGameOverlay .fg-special-game{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important;z-index:2147482040!important}
body.ap8964 #footballGameOverlay .fg-input-row,body.ap8964 #footballGameOverlay .fg-guess-row{display:flex!important;position:fixed!important;left:24.45%!important;top:52.45%!important;width:52%!important;height:8.05%!important;z-index:2147482051!important;margin:0!important;padding:0!important;pointer-events:auto!important}
body.ap8964 #footballGameOverlay #fgInput{flex:1 1 auto!important;height:100%!important;margin:0!important;padding:0 1.6vw!important;border:0!important;background:transparent!important;box-shadow:none!important;color:#fff!important;font-size:clamp(16px,1.45vw,23px)!important;font-weight:650!important;outline:none!important;caret-color:#46d5ff!important}
body.ap8964 #footballGameOverlay #fgInput::placeholder{color:transparent!important}
body.ap8964 #footballGameOverlay #fgGuessBtn{flex:0 0 19.7%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:transparent!important;opacity:0!important;pointer-events:auto!important;cursor:pointer!important}
body.ap8964 #footballGameOverlay #fgSuggestions{position:absolute!important;left:0!important;right:19.7%!important;top:100%!important;z-index:2147482070!important;background:#061522!important;border:1px solid #158fd1!important;color:#fff!important;pointer-events:auto!important}
body.ap8964 #footballGameOverlay table{position:fixed!important;left:12.4%!important;top:62.8%!important;width:75.5%!important;z-index:2147482052!important;margin:0!important;border-collapse:separate!important;border-spacing:0 8px!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:none!important}
body.ap8964 #footballGameOverlay table thead{visibility:hidden!important;height:6vh!important}
body.ap8964 #footballGameOverlay table tbody{visibility:hidden!important}
body.ap8964.ap8964rows #footballGameOverlay table tbody{visibility:visible!important}
body.ap8964.ap8964rows #footballGameOverlay table tbody tr{height:8.4vh!important}
body.ap8964.ap8964rows #footballGameOverlay table tbody td{background:#5f6972!important;color:#fff!important;border:0!important;padding:.65vh .65vw!important;font-weight:800!important;font-size:clamp(10px,.78vw,14px)!important;vertical-align:middle!important}
body.ap8964.ap8964rows #footballGameOverlay table tbody tr td:nth-child(4){background:#c49a25!important}
body.ap8964.ap8964rows #footballGameOverlay table tbody tr td.match,body.ap8964.ap8964rows #footballGameOverlay table tbody tr td.exact{background:#328a3d!important}
/* live account overlays replace the static numbers painted in the screenshot */
#ap8964rank{position:fixed;right:3.4%;top:44.3%;width:10.1%;height:7.5%;z-index:2147482054;background:#03131f;display:flex;flex-direction:column;justify-content:center;padding-left:1.15vw;box-sizing:border-box;color:#fff;pointer-events:none}
#ap8964rank strong{font:1000 clamp(17px,1.45vw,27px)/1 system-ui}#ap8964rank span{margin-top:7px;color:#2cc8ff;font:900 clamp(8px,.6vw,11px)/1 system-ui;letter-spacing:.05em}
#ap8964coins{position:fixed;left:61.1%;top:2.45%;width:8.4%;height:5.2%;z-index:2147482054;background:#061522;display:flex;align-items:center;justify-content:center;color:#fff;font:1000 clamp(10px,.85vw,15px)/1 system-ui;pointer-events:none}
`;document.head.appendChild(s)}
function ensure(){
 css();var on=activePlayers();document.body.classList.toggle('ap8964',on);if(!on){document.body.classList.remove('ap8964rows');return}
 purge();var o=overlay(),sh=q('.football-game-shell',o)||o;
 var old=q('#ap8963screen');if(old)try{old.remove()}catch(e){}
 var im=q('#ap8964screen');if(!im){im=document.createElement('img');im.id='ap8964screen';im.alt='';im.src=APPROVED;sh.insertBefore(im,sh.firstChild)}
 if(!q('#ap8964back',sh)){var b=document.createElement('button');b.id='ap8964back';b.type='button';b.setAttribute('aria-label','Back to Games');b.onclick=closeGame;sh.appendChild(b)}
 if(!q('#ap8964rank',sh)){var r=document.createElement('div');r.id='ap8964rank';r.innerHTML='<strong>—</strong><span>YOUR RANK</span>';sh.appendChild(r)}
 if(!q('#ap8964coins',sh)){var c=document.createElement('div');c.id='ap8964coins';sh.appendChild(c)}
 var r=q('#ap8964rank');if(r)q('strong',r).textContent=rank();var c=q('#ap8964coins');if(c)c.textContent=coins();
 var g=q('#fgSpecialGame',o)||q('.fg-special-game',o),rows=g?qa('tbody tr',g).filter(function(x){return t(x).length>0}):[];document.body.classList.toggle('ap8964rows',rows.length>0);
 var cl=q('.fg-close',o);if(cl)cl.style.setProperty('display','none','important');
}
function schedule(){[0,20,50,100,180,300,500,800,1200,1800,2600].forEach(function(ms){setTimeout(ensure,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',schedule,true);
if(window.MutationObserver)new MutationObserver(function(){setTimeout(ensure,10)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden','src']});
})();
