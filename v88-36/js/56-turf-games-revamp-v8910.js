/* ============================================================
   TURF V89.10 — GAMES SYSTEM REVAMP / SAFETY PASS
   Global daily lock, mode-state cleanup, layout polish, and
   targeted fixes gathered during QA. Designed as a late patch
   over the existing V88.36 game engine.
   ============================================================ */
(function(){
'use strict';
var STYLE_ID='turfV8910GamesCss';
var MODE_NAMES={
  'ACTIVE PLAYERS':'players','PLAYERS':'players','LEGENDS':'legends','GRID':'grid','WHO AM I?':'whoami',
  'CAREER PATH':'career','HIGHER / LOWER':'higherlower','IMPOSTER':'imposter','CONNECTIONS':'connections',
  'STAT LINE':'statline','DRAFT CLASS':'draftclass','MOGGER':'moggle','TIMELINE':'timeline',
  'FRANCHISE FINDER':'guessteam','DEPTH CHART':'depthchart'
};
function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function pacificDate(){
  try{return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
  catch(e){return new Date().toISOString().slice(0,10)}
}
function accountToken(){
  try{return String(localStorage.getItem('footballHQAccountTokenV80')||localStorage.getItem('footballHQPrimaryAccountLockV80')||sessionStorage.getItem('footballHQAccountTokenV80')||'guest')}
  catch(e){return 'guest'}
}
function activeMode(){
  var host=qs('#fgSpecialGame')||document.body;
  var title='';
  qsa('h1,h2,.fg-newgame-title,.fg-game-title,.fg-special-title',host).some(function(el){
    var t=(el.textContent||'').trim().toUpperCase();
    if(MODE_NAMES[t]){title=t;return true}return false;
  });
  if(!title){
    var txt=(host.textContent||'').toUpperCase();
    Object.keys(MODE_NAMES).some(function(k){if(txt.indexOf(k)>=0){title=k;return true}return false});
  }
  return MODE_NAMES[title]||'';
}
function dailyKey(mode){return 'turfDailyPlayedV8910:'+accountToken()+':'+pacificDate()+':'+mode}
function isDailyLocked(mode){try{return localStorage.getItem(dailyKey(mode))==='1'}catch(e){return false}}
function lockDaily(mode){if(!mode)return;try{localStorage.setItem(dailyKey(mode),'1')}catch(e){}}
function isUnlimitedScreen(){
  var host=qs('#fgSpecialGame');if(!host)return false;
  var t=(host.textContent||'').toUpperCase();
  return /UNLIMITED/.test(t)&&(/CHOOSE YOUR|UNLIMITED SETUP|CHOOSE HOW|CHOOSE THE PLAYER POOL|CHOOSE YOUR DIFFICULTY/.test(t));
}
function syncModeButtons(){
  var d=qs('#fgDailyBtn'),u=qs('#fgUnlimitedBtn');if(!d||!u)return;
  var m=activeMode();
  if(isUnlimitedScreen()){
    u.classList.add('active');d.classList.remove('active');
    u.setAttribute('aria-pressed','true');d.setAttribute('aria-pressed','false');
  }
  if(m&&isDailyLocked(m)){
    d.classList.add('turf-daily-locked');d.setAttribute('title','Daily completed today — resets at 12:00 AM Pacific');
  }else d.classList.remove('turf-daily-locked');
}
function installDailyGuard(){
  var d=qs('#fgDailyBtn'),u=qs('#fgUnlimitedBtn');if(!d)return;
  if(d.dataset.turf8910Guard==='1')return;d.dataset.turf8910Guard='1';
  d.addEventListener('click',function(e){
    var m=activeMode();if(!m||!isDailyLocked(m))return;
    e.preventDefault();e.stopImmediatePropagation();
    if(u){u.click();setTimeout(syncModeButtons,40)}
    toast('Daily already played today. Unlimited is open until tomorrow.');
  },true);
}
function detectCompletedDaily(){
  var ov=qs('#fgResultOverlay');if(!ov||!ov.classList.contains('open'))return;
  var m=activeMode();if(!m)return;
  var text=(ov.textContent||'').toUpperCase();
  var dailyShown=/\bDAILY\b/.test(text)||qs('#fgDailyBtn.active');
  if(dailyShown){lockDaily(m);syncModeButtons()}
}
function toast(msg){
  var old=qs('#turf8910Toast');if(old)old.remove();
  var d=document.createElement('div');d.id='turf8910Toast';d.textContent=msg;document.body.appendChild(d);
  requestAnimationFrame(function(){d.classList.add('show')});setTimeout(function(){d.classList.remove('show');setTimeout(function(){d.remove()},250)},2600);
}
function cleanHigherLower(){
  var host=qs('#fgSpecialGame');if(!host)return;
  if(activeMode()!=='higherlower')return;
  qsa('button',host).forEach(function(b){if((b.textContent||'').trim().toUpperCase()==='PLAY')b.style.display='none'});
  qsa('*',host).forEach(function(el){
    var t=(el.textContent||'').trim();if(/^0\s*(?:TO|[-–—])\s*0$/i.test(t))el.style.display='none';
  });
}
function cleanConnections(){
  if(activeMode()!=='connections')return;var host=qs('#fgSpecialGame');if(!host)return;
  var solved=qsa('[class*="connection"][class*="solved"],.fg-connection-result,.fg-connection-group',host);
  if(solved.length>=4){
    qsa('button',host).forEach(function(b){
      var t=(b.textContent||'').trim();
      if(t&&t.length<45&&!/SHARE|PLAY|AGAIN|CLOSE|UNLIMITED|DAILY/i.test(t)){
        var bg=getComputedStyle(b).backgroundColor;
        if(bg==='rgb(232, 229, 220)'||bg==='rgb(255, 255, 255)'||bg==='white')b.style.display='none';
      }
    });
  }
}
function cleanTimelineResult(){
  if(activeMode()!=='timeline')return;var ov=qs('#fgResultOverlay');if(!ov||!ov.classList.contains('open'))return;
  var title=qs('#fgResultTitle',ov),sub=qs('#fgResultSub',ov),card=qs('#fgAnswerCard',ov);
  if(title)title.textContent=title.textContent.replace(/GAME OVER\s*!?/i,'GAME OVER');
  if(sub&&/Correct order:/i.test(sub.textContent||''))sub.style.display='none';
  if(card){
    var nodes=qsa('h1,h2,h3,.fg-result-heading',card);nodes.forEach(function(n,i){if(i>0&&/GAME OVER/i.test(n.textContent||''))n.style.display='none'});
  }
}
function centerForSidebar(){
  var main=qs('#fhqMain')||qs('.fhq-main')||qs('main');if(!main)return;
  var side=qs('#fhqSidebar');if(!side)return;
  var open=side.getBoundingClientRect().width>120&&getComputedStyle(side).display!=='none';
  main.classList.toggle('turf-sidebar-open',open);
}
function cleanFallbackTurfLabels(){
  qsa('img').forEach(function(img){if((img.alt||'').trim().toUpperCase()==='TURF')img.alt='';if((img.title||'').trim().toUpperCase()==='TURF')img.removeAttribute('title')});
}
function addCss(){
  var old=qs('#'+STYLE_ID);if(old)old.remove();var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=`
    #turf8910Toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,18px);opacity:0;z-index:999999;background:#071923;border:1px solid #1db7ef;color:#eaf8ff;padding:12px 18px;border-radius:12px;font:800 13px/1.2 system-ui;box-shadow:0 10px 35px #0008;transition:.2s}
    #turf8910Toast.show{opacity:1;transform:translate(-50%,0)}
    #fgDailyBtn.turf-daily-locked{opacity:.58!important;filter:saturate(.55)!important;position:relative!important}
    #fgDailyBtn.turf-daily-locked:after{content:'✓';margin-left:7px;color:#4be38b;font-weight:1000}
    #fhqMain.turf-sidebar-open,.fhq-main.turf-sidebar-open{margin-left:auto!important;margin-right:auto!important}
    /* Connections theme */
    #fgSpecialGame button{transition:background .14s,border-color .14s,color .14s,transform .14s}
    #fgSpecialGame .fg-connection-card,#fgSpecialGame [data-connection-card]{background:#121a20!important;color:#f4f8fb!important;border-color:#344751!important}
    /* Timeline result de-clutter */
    #fgResultOverlay .fg-result-card{max-height:min(82vh,760px);overflow:auto}
    /* Keep Daily/Unlimited tabs visually honest */
    #fgUnlimitedBtn.active{background:#2c6fb1!important;color:white!important}
    /* Center game modal in usable viewport */
    #fgGameOverlay,#fgSpecialGame{margin-left:auto!important;margin-right:auto!important}
  `;document.head.appendChild(s);
}
function run(){addCss();installDailyGuard();detectCompletedDaily();syncModeButtons();cleanHigherLower();cleanConnections();cleanTimelineResult();centerForSidebar();cleanFallbackTurfLabels()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[100,300,700,1400,2600,5000].forEach(function(ms){setTimeout(run,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8910Timer);window.__turf8910Timer=setTimeout(run,70)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','aria-hidden']});
})();
