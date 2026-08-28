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

/* v89.61 Active Players exact-screen loader.
   107 contains the approved screenshot artwork and the real game wiring.
   Safari was showing only the live rows/rank because the huge data: image was
   not being painted reliably. Convert that embedded image to an origin-owned
   blob: URL and force it visible. No canvas, no placeholder renderer. */
(function(){
'use strict';
if(window.__TURF_AP_8961_LOADER__)return;
window.__TURF_AP_8961_LOADER__=true;
var objectUrl='';
function cleanup(){
 ['ap8959canvas','ap8958canvas'].forEach(function(id){var n=document.getElementById(id);if(n)try{n.remove()}catch(e){}});
 ['ap8959css','ap8958canvasCss'].forEach(function(id){var n=document.getElementById(id);if(n)try{n.remove()}catch(e){}});
 document.querySelectorAll('script[src*="110-turf-active-players"],script[src*="114-turf-active-players"],script[src*="ap8959-exact-"]').forEach(function(n){try{n.remove()}catch(e){}});
}
function dataToBlobUrl(src){
 if(!/^data:image\/webp;base64,/i.test(src||''))return '';
 try{
  var raw=atob(src.slice(src.indexOf(',')+1));
  var bytes=new Uint8Array(raw.length);
  for(var i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
 }catch(e){console.error('[TURF] Active Players artwork decode failed',e);return ''}
}
function promoteArtwork(){
 cleanup();
 var im=document.getElementById('ap8957img');
 if(!im)return;
 var src=im.getAttribute('src')||'';
 if(/^data:image\/webp;base64,/i.test(src)){
  var url=dataToBlobUrl(src);
  if(url){if(objectUrl)try{URL.revokeObjectURL(objectUrl)}catch(e){};objectUrl=url;im.src=url;}
 }
 im.style.setProperty('display','block','important');
 im.style.setProperty('visibility','visible','important');
 im.style.setProperty('opacity','1','important');
 im.style.setProperty('position','fixed','important');
 im.style.setProperty('inset','0','important');
 im.style.setProperty('width','100vw','important');
 im.style.setProperty('height','100vh','important');
 im.style.setProperty('object-fit','fill','important');
 im.style.setProperty('z-index','2','important');
 im.style.setProperty('pointer-events','none','important');
 var shell=im.parentElement;if(shell){shell.style.setProperty('background','#01060b','important')}
}
function afterLoad(){[0,25,60,120,250,500,900,1500,2600].forEach(function(ms){setTimeout(promoteArtwork,ms)})}
cleanup();
var old=document.querySelector('script[src*="107-turf-active-players-exact-v8957.js"]');
if(old)try{old.remove()}catch(e){}
var s=document.createElement('script');
s.src='https://footballhq.github.io/footballhq-assets/v88-36/js/107-turf-active-players-exact-v8957.js?v=8961-'+Date.now();
s.async=false;s.onload=afterLoad;s.onerror=function(){console.error('[TURF] failed to load exact Active Players screen')};
(document.head||document.documentElement).appendChild(s);
document.addEventListener('click',afterLoad,true);
if(window.MutationObserver)new MutationObserver(function(){setTimeout(promoteArtwork,20)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src','style','aria-hidden']});
})();
