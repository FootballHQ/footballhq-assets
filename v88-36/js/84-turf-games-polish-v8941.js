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

/* v89.59 Active Players: load the VERIFIED approved screenshot bytes first,
   then the existing live-game wiring, then paint those exact bytes. */
(function(){
  if(window.__TURF_AP_8959_LOADER__)return;
  window.__TURF_AP_8959_LOADER__=true;
  window.__TURF_AP_B64__='';
  document.querySelectorAll('script[src*="105-turf-active-players"],script[src*="106-turf-active-players"],script[src*="107-turf-active-players"],script[src*="110-turf-active-players"],script[src*="114-turf-active-players"],script[src*="ap8959-exact-"]').forEach(function(n){try{n.remove()}catch(e){}});
  var base='https://footballhq.github.io/footballhq-assets/v88-36/js/';
  function load(name,next){var s=document.createElement('script');s.src=base+name+'?v=8959-'+Date.now();s.async=false;s.onload=function(){if(next)next()};s.onerror=function(){console.error('[TURF] failed to load '+name);if(next)next()};(document.head||document.documentElement).appendChild(s)}
  load('ap8959-exact-0.js',function(){
    load('ap8959-exact-1.js',function(){
      load('ap8959-exact-2.js',function(){
        load('ap8959-exact-3.js',function(){
          load('107-turf-active-players-exact-v8957.js',function(){
            load('114-turf-active-players-exact-data-v8959.js');
          });
        });
      });
    });
  });
})();
