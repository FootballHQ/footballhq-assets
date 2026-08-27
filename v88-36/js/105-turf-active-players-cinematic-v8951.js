/* ============================================================
   TURF v89.51 — ACTIVE PLAYERS CINEMATIC GAME PAGE
   Dedicated full-screen game treatment approved from mockup #3.
   Keeps native game logic; presentation only.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_ACTIVE_PLAYERS_CINEMATIC_V8951__)return;
window.__TURF_ACTIVE_PLAYERS_CINEMATIC_V8951__=true;

var BRAND='https://footballhq.github.io/footballhq-assets/v88-36/brand/turf-app-icon-v8953.png?v=8951';
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;var c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden'&&c.opacity!=='0'}
function gameHost(){return q('#fgSpecialGame')||q('#fgGridGame')||q('#footballGameOverlay')}
function isPlayers(){
  var h=gameHost();if(!h||!visible(h))return false;
  var titles=qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',h).filter(visible).map(txt).join(' ').toUpperCase();
  return /ACTIVE PLAYERS|CURRENT PLAYERS|FOOTBALL DAILY/.test(titles);
}
function mark(){document.body.classList.toggle('turf-active-players-open',isPlayers())}
function ensureChrome(){
  if(!isPlayers())return;
  var h=gameHost();if(!h)return;
  h.classList.add('turf8951-active-page');

  if(!q('#turf8951Back',h)){
    var back=document.createElement('button');back.id='turf8951Back';back.type='button';back.className='turf8951-back';back.innerHTML='<span aria-hidden="true">←</span><span>BACK TO GAMES</span>';
    back.addEventListener('click',function(){
      var nativeBack=q('[data-action="back-games"],.fg-back-games,.fg-back-btn,#fgBackBtn,#footballGameBack',h)||qa('button',h).find(function(b){return /BACK TO GAMES|GAMES/.test(txt(b).toUpperCase())});
      if(nativeBack&&nativeBack!==back){nativeBack.click();return}
      var close=q('.fg-close,#fgCloseGame,[aria-label="Close"]',h);if(close)close.click();
    });
    h.insertBefore(back,h.firstChild);
  }

  if(!q('#turf8951Brand',h)){
    var brand=document.createElement('div');brand.id='turf8951Brand';brand.className='turf8951-brand';
    brand.innerHTML='<img src="'+BRAND+'" alt=""><span>TURF</span>';
    h.insertBefore(brand,h.firstChild);
  }

  if(!q('#turf8951Atmosphere',h)){
    var a=document.createElement('div');a.id='turf8951Atmosphere';a.className='turf8951-atmosphere';a.setAttribute('aria-hidden','true');
    a.innerHTML='<i class="turf8951-light l1"></i><i class="turf8951-light l2"></i><i class="turf8951-player p1"></i><i class="turf8951-player p2"></i><i class="turf8951-ball"></i>';
    h.insertBefore(a,h.firstChild);
  }

  var title=qa('.fg-game-title,.fg-special-title,.fg-newgame-title,h1,h2,h3',h).find(function(el){return /ACTIVE PLAYERS|CURRENT PLAYERS|FOOTBALL DAILY/i.test(txt(el))});
  if(title){title.textContent='ACTIVE PLAYERS';title.classList.add('turf8951-title')}
  var sub=q('.fg-game-sub,.fg-special-sub,.fg-newgame-sub',h);if(sub)sub.textContent='Guess the current NFL player in eight guesses.';

  qa('.fg-game-tabs,.fg-game-scroller,.fg-games-scroller,.fg-game-nav,.fg-top-games,.games-tabs,.game-tabs,[class*="game-scroller"]',h).forEach(function(el){
    if(!el.closest('.turf8951-main'))el.classList.add('turf8951-hide-strip');
  });
}
function addCss(){
  if(q('#turf8951ActiveCss'))return;
  var s=document.createElement('style');s.id='turf8951ActiveCss';s.textContent=`
body.turf-active-players-open{overflow:hidden!important;background:#020a12!important}
body.turf-active-players-open #fhqSidebar,
body.turf-active-players-open .fhq-sidebar,
body.turf-active-players-open .sidebar,
body.turf-active-players-open #sidebar,
body.turf-active-players-open .left-sidebar,
body.turf-active-players-open .app-sidebar{display:none!important}
body.turf-active-players-open #fhqMain,
body.turf-active-players-open .fhq-main,
body.turf-active-players-open main,
body.turf-active-players-open .main-content{margin-left:0!important;padding-left:0!important;width:100%!important;max-width:none!important}
body.turf-active-players-open .turf8951-hide-strip{display:none!important}

.turf8951-active-page{position:fixed!important;inset:0!important;z-index:2147482000!important;overflow:auto!important;box-sizing:border-box!important;padding:118px 6vw 48px!important;background:
 radial-gradient(circle at 50% 28%,rgba(0,147,255,.24),transparent 32%),
 radial-gradient(circle at 14% 20%,rgba(0,113,214,.23),transparent 28%),
 radial-gradient(circle at 88% 22%,rgba(0,122,224,.18),transparent 27%),
 repeating-linear-gradient(165deg,rgba(46,168,255,.035) 0 1px,transparent 1px 38px),
 linear-gradient(180deg,#020b16 0%,#031322 44%,#020911 100%)!important;
color:#eef8ff!important;isolation:isolate}
.turf8951-active-page:before{content:"";position:absolute;z-index:-4;left:0;right:0;top:48%;bottom:0;background:
 linear-gradient(180deg,rgba(2,12,21,.08),rgba(2,8,14,.68)),
 repeating-linear-gradient(90deg,rgba(143,214,255,.04) 0 1px,transparent 1px 9%),
 repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 1px,transparent 1px 70px);transform:perspective(500px) rotateX(8deg);transform-origin:top}
.turf8951-active-page:after{content:"";position:absolute;z-index:-3;left:0;right:0;top:43%;height:2px;background:linear-gradient(90deg,transparent,#13aefe 16%,#7bd7ff 50%,#13aefe 84%,transparent);box-shadow:0 0 38px #0b9df8;opacity:.38}
.turf8951-atmosphere{position:absolute;inset:0;z-index:-2;overflow:hidden;pointer-events:none}
.turf8951-light{position:absolute;top:15%;width:150px;height:38px;background:repeating-linear-gradient(90deg,#d8f4ff 0 9px,transparent 9px 17px);filter:blur(1px);opacity:.8;box-shadow:0 0 35px #75d8ff;transform:rotate(-9deg)}
.turf8951-light.l1{left:1.5%}.turf8951-light.l2{right:1.5%;transform:rotate(9deg)}
.turf8951-player{position:absolute;top:14%;width:20vw;height:39vh;min-width:210px;min-height:300px;max-width:340px;max-height:470px;border-radius:48% 48% 35% 35%;background:radial-gradient(circle at 50% 17%,#071724 0 17%,transparent 17.5%),linear-gradient(110deg,transparent 13%,#06131f 14% 38%,#020810 39% 72%,transparent 73%);filter:drop-shadow(0 0 20px rgba(0,136,255,.38));opacity:.78}
.turf8951-player:before{content:"";position:absolute;left:26%;top:4%;width:49%;height:23%;border:2px solid rgba(35,171,255,.38);border-radius:50%;box-shadow:12px 8px 0 -9px rgba(35,171,255,.8)}
.turf8951-player.p1{left:8%;transform:scale(1.15) rotate(-4deg)}.turf8951-player.p2{right:7%;transform:scale(.98) rotate(5deg);opacity:.62}
.turf8951-ball{position:absolute;right:-4%;bottom:2%;width:24vw;height:14vw;border-radius:50%;transform:rotate(-26deg);background:repeating-linear-gradient(62deg,#09131d 0 5px,#03080d 5px 10px);box-shadow:-18px -18px 70px rgba(21,157,255,.17);opacity:.82}

.turf8951-back{position:fixed!important;top:26px!important;left:28px!important;z-index:30!important;display:flex!important;align-items:center!important;gap:9px!important;padding:13px 18px!important;border:1px solid rgba(61,181,255,.46)!important;border-radius:12px!important;background:rgba(3,20,33,.82)!important;color:#f4fbff!important;font:900 12px/1 system-ui!important;letter-spacing:.07em!important;box-shadow:0 10px 28px rgba(0,0,0,.25)!important;backdrop-filter:blur(10px);cursor:pointer!important}
.turf8951-back:hover{border-color:#49c8ff!important;background:rgba(5,36,56,.92)!important;transform:translateY(-1px)}
.turf8951-brand{position:fixed!important;top:20px!important;left:50%!important;transform:translateX(-50%)!important;z-index:30!important;display:flex!important;align-items:center!important;gap:12px!important;color:#fff!important;font:500 22px/1 system-ui!important;letter-spacing:.22em!important;text-shadow:0 0 20px rgba(76,183,255,.35)}
.turf8951-brand img{width:36px!important;height:36px!important;object-fit:cover!important;border-radius:5px!important;filter:drop-shadow(0 0 12px rgba(44,168,255,.42))}

.turf8951-active-page .turf8951-title{position:relative!important;margin:0 auto 4px!important;max-width:850px!important;text-align:center!important;font-size:clamp(58px,7vw,116px)!important;line-height:.84!important;font-style:italic!important;font-weight:1000!important;letter-spacing:-.045em!important;color:#fff!important;text-transform:uppercase!important;text-shadow:0 5px 0 #3b91d3,0 0 28px rgba(0,175,255,.72),0 0 70px rgba(0,121,255,.36)!important;transform:skewX(-4deg)}
.turf8951-active-page .turf8951-title:after{content:"PLAYERS";display:block;margin-top:8px;font-size:.78em;line-height:.72;color:#14b8ff;text-shadow:0 4px 0 #006fb8,0 0 22px #00a9ff,0 0 55px rgba(0,166,255,.7);font-family:Impact,"Arial Black",system-ui,sans-serif;letter-spacing:-.035em}
.turf8951-active-page .turf8951-title{font-size:0!important}
.turf8951-active-page .turf8951-title:before{content:"ACTIVE";display:block;font-size:clamp(58px,7vw,116px);line-height:.72;color:#f6f8fb;text-shadow:0 5px 0 #5f8eaf,0 0 24px rgba(160,222,255,.55);font-family:Impact,"Arial Black",system-ui,sans-serif;letter-spacing:-.025em}
.turf8951-active-page .fg-game-sub,.turf8951-active-page .fg-special-sub,.turf8951-active-page .fg-newgame-sub{position:relative!important;z-index:2!important;margin:22px auto 18px!important;text-align:center!important;color:#c7d4df!important;font-size:16px!important;font-weight:700!important}

.turf8951-active-page .fg-game-mode-row,.turf8951-active-page .fg-mode-row,.turf8951-active-page .fg-tabs,.turf8951-active-page [class*="daily-unlimited"]{position:relative!important;z-index:3!important;justify-content:center!important;margin:12px auto 18px!important}
.turf8951-active-page #fgDailyBtn,.turf8951-active-page #fgUnlimitedBtn{min-height:48px!important;border-radius:12px!important;padding:0 26px!important;font-weight:900!important;letter-spacing:.03em!important}
.turf8951-active-page #fgDailyBtn.active,.turf8951-active-page #fgUnlimitedBtn.active{background:linear-gradient(180deg,#25c4ff,#087abd)!important;border-color:#63d8ff!important;color:#fff!important;box-shadow:0 0 24px rgba(0,179,255,.38)!important}

.turf8951-active-page .fg-input-row,.turf8951-active-page .fg-guess-row,.turf8951-active-page [class*="guess-input"]{position:relative!important;z-index:5!important;width:min(900px,90vw)!important;margin:16px auto!important}
.turf8951-active-page #fgInput{height:58px!important;border-radius:13px 0 0 13px!important;border:1px solid #168fd0!important;background:rgba(3,20,32,.91)!important;color:#fff!important;font-size:18px!important;box-shadow:inset 0 0 25px rgba(0,105,171,.09),0 0 22px rgba(0,136,219,.12)!important}
.turf8951-active-page #fgGuessBtn{min-width:150px!important;height:58px!important;border-radius:0 13px 13px 0!important;border:1px solid #6bdcff!important;background:linear-gradient(180deg,#29c6ff,#0876c8)!important;color:#fff!important;font-weight:1000!important;font-size:18px!important;box-shadow:0 0 25px rgba(0,178,255,.5)!important}
.turf8951-active-page #fgSuggestions{z-index:100!important;background:#061522!important;border-color:#198bc6!important}

.turf8951-active-page .fg-history,.turf8951-active-page .fg-history-wrap,.turf8951-active-page .fg-guess-history,.turf8951-active-page [class*="history"]{position:relative!important;z-index:3!important;width:min(1120px,92vw)!important;margin-left:auto!important;margin-right:auto!important;border-radius:14px!important;border-color:rgba(91,161,202,.25)!important;background:rgba(3,14,24,.84)!important;box-shadow:0 24px 70px rgba(0,0,0,.3)!important;backdrop-filter:blur(8px)}
.turf8951-active-page table{width:min(1120px,92vw)!important;margin-left:auto!important;margin-right:auto!important;background:rgba(3,14,24,.82)!important;border:1px solid rgba(82,154,196,.24)!important;border-radius:14px!important;overflow:hidden!important}
.turf8951-active-page th{height:48px!important;background:rgba(9,26,37,.92)!important;color:#aebdca!important;font-size:11px!important;letter-spacing:.08em!important;text-transform:uppercase!important}
.turf8951-active-page td{border-color:rgba(94,151,184,.14)!important}

@media(max-width:900px){
 .turf8951-active-page{padding:104px 18px 34px!important}.turf8951-player{opacity:.35}.turf8951-ball{opacity:.38}.turf8951-brand{top:22px!important}.turf8951-back{top:24px!important;left:16px!important;padding:11px 13px!important}.turf8951-brand span{display:none}.turf8951-active-page .turf8951-title:before{font-size:54px}.turf8951-active-page .turf8951-title:after{font-size:48px}.turf8951-active-page #fgInput{font-size:16px!important}.turf8951-active-page #fgGuessBtn{min-width:105px!important}
}
  `;(document.head||document.documentElement).appendChild(s);
}
function run(){addCss();mark();if(isPlayers())ensureChrome()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[0,40,100,220,500,900,1500,2500].forEach(function(ms){setTimeout(run,ms)});
var t=null;new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,20)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,characterData:true,attributeFilter:['class','style','aria-hidden']});
})();
