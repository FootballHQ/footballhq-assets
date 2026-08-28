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

/* v89.60 Active Players — use the approved screen embedded in 107 directly.
   The 8959 chunk/canvas path was covering the page with a black canvas because
   those chunk files did not begin with a valid WebP header. Do not load them.
   107 already contains the complete approved artwork plus transparent live
   controls wired to the real game. */
(function(){
  if(window.__TURF_AP_8960_LOADER__)return;
  window.__TURF_AP_8960_LOADER__=true;

  function removeBrokenPainter(){
    ['ap8959canvas','ap8958canvas'].forEach(function(id){var n=document.getElementById(id);if(n)try{n.remove()}catch(e){}});
    ['ap8959css','ap8958canvasCss'].forEach(function(id){var n=document.getElementById(id);if(n)try{n.remove()}catch(e){}});
    document.querySelectorAll('script[src*="110-turf-active-players"],script[src*="114-turf-active-players"],script[src*="ap8959-exact-"]').forEach(function(n){try{n.remove()}catch(e){}});
    var im=document.getElementById('ap8957img');
    if(im){
      im.style.setProperty('display','block','important');
      im.style.setProperty('visibility','visible','important');
      im.style.setProperty('opacity','1','important');
      im.style.setProperty('z-index','2','important');
    }
  }

  removeBrokenPainter();
  var existing=document.querySelector('script[src*="107-turf-active-players-exact-v8957.js"]');
  if(!existing){
    var s=document.createElement('script');
    s.src='https://footballhq.github.io/footballhq-assets/v88-36/js/107-turf-active-players-exact-v8957.js?v=8960-'+Date.now();
    s.async=false;
    s.onload=function(){removeBrokenPainter();[0,60,180,500,1200].forEach(function(ms){setTimeout(removeBrokenPainter,ms)})};
    (document.head||document.documentElement).appendChild(s);
  }else{
    [0,60,180,500,1200].forEach(function(ms){setTimeout(removeBrokenPainter,ms)});
  }
})();
