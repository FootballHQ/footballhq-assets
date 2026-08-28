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

/* v89.62 Active Players authoritative screen.
   IMPORTANT: the little broken-image icon seen on the live page is NOT a
   canvas. It is #ap8957img failing because the embedded WebP bytes in the
   older 107 file are not the approved 1672x941 artwork. Keep the real game
   controls/data, but put the approved screen itself in front of the old shell.
   This removes every stale canvas/image layer before presenting the screen. */
(function(){
'use strict';
if(window.__TURF_AP_8962__)return;window.__TURF_AP_8962__=true;
var APPROVED='https://media.canva.com/v2/image-resize/format:JPG/height:112/quality:75/uri:ifs%3A%2F%2FM%2Fbc573fbb-8787-4b0e-8846-84e5bb8dfcba/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAPctxlFMz_0rNULGSZ5FdJvFR3yx3qKax0tvL6E1Isrk&exp=1787897693&osig=AAAAAAAAAAAAAAAAAAAAAMTJFaqCXUw_OtPyQkP3UNj1t5TcBVjW-mmSvBF7E7pI&signer=media-rpc&x-canva-quality=thumbnail';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function t(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function overlay(){return q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay')}
function activePlayers(){var o=overlay();if(!o)return false;var m=q('.fg-mode.active[data-fg-mode]',o);if(m&&m.dataset&&m.dataset.fgMode)return m.dataset.fgMode==='players';return /CURRENT PLAYERS|ACTIVE PLAYERS|GUESS THE CURRENT NFL FANTASY PLAYER/i.test(t(o))}
function purge(){
 ['ap8959canvas','ap8958canvas','turf8953Stage','turf8953Ball','turf8954ExactBg'].forEach(function(id){var n=q('#'+id);if(n)try{n.remove()}catch(e){}});
 var old=q('#ap8957img');if(old){old.style.setProperty('display','none','important');old.style.setProperty('visibility','hidden','important');}
}
function css(){if(q('#ap8962css'))return;var s=document.createElement('style');s.id='ap8962css';s.textContent=`
#ap8962screen{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;object-fit:fill!important;z-index:2147482001!important;display:none;pointer-events:none;background:#01060b}
body.ap8957 #ap8962screen{display:block!important}
body.ap8957 #footballGameOverlay .fg-toolbar{z-index:2147482050!important}
body.ap8957 #footballGameOverlay .fg-input-row,body.ap8957 #footballGameOverlay .fg-guess-row{z-index:2147482051!important}
body.ap8957 #footballGameOverlay table{z-index:2147482052!important}
body.ap8957 #ap8957rank,body.ap8957 #ap8957coins,body.ap8957 #ap8957back{z-index:2147482053!important}
`;document.head.appendChild(s)}
function ensure(){
 css();purge();
 var on=activePlayers();
 if(!on)return;
 document.body.classList.add('ap8957');
 var im=q('#ap8962screen');
 if(!im){im=document.createElement('img');im.id='ap8962screen';im.alt='Active Players';im.decoding='async';im.src=APPROVED;document.body.appendChild(im)}
 im.style.setProperty('display','block','important');
 im.style.setProperty('visibility','visible','important');
 im.style.setProperty('opacity','1','important');
}
function schedule(){[0,30,80,150,300,600,1000,1600,2500].forEach(function(ms){setTimeout(ensure,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',schedule,true);
if(window.MutationObserver)new MutationObserver(function(){setTimeout(ensure,20)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-hidden','src']});
})();
