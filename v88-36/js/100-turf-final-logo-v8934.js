/* TURF v89.34 — FINAL LOGO AUTHORITY
   Presentation only. Replaces legacy turf-mark.svg visuals without touching account/game logic. */
(function(){
'use strict';
if(window.__TURF_FINAL_LOGO_8934__)return;
window.__TURF_FINAL_LOGO_8934__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  var old=q('#turfFinalLogo8934Css');if(old)old.remove();
  var s=document.createElement('style');s.id='turfFinalLogo8934Css';
  s.textContent=`
    .turf-final-logo{
      display:grid!important;place-items:center!important;position:relative!important;
      background:linear-gradient(145deg,#0a1b28,#06111a)!important;
      border:1px solid rgba(50,184,238,.32)!important;
      box-shadow:inset 0 0 14px rgba(35,153,209,.10),0 7px 18px rgba(0,0,0,.30)!important;
      overflow:hidden!important;color:transparent!important;font-size:0!important;line-height:0!important;
    }
    .turf-final-logo:after{
      content:'T'!important;display:block!important;font-family:Arial Black,Arial,sans-serif!important;
      font-style:italic!important;font-weight:950!important;line-height:1!important;color:#aeb7bf!important;
      transform:skewX(-14deg) rotate(-4deg)!important;-webkit-text-stroke:2px #05090d!important;
      text-shadow:-2px 0 #159fe7,2px 0 #159fe7,0 -2px #159fe7,0 2px #159fe7,
                  0 0 8px rgba(48,190,255,.70),4px 5px 2px rgba(0,0,0,.72)!important;
    }
    #fhqSidebar .turf-final-logo{width:56px!important;height:56px!important;min-width:56px!important;flex:0 0 56px!important;border-radius:13px!important}
    #fhqSidebar .turf-final-logo:after{font-size:37px!important}
    #turfTopbar .turf-final-logo{width:44px!important;height:44px!important;min-width:44px!important;border-radius:13px!important;padding:0!important}
    #turfTopbar .turf-final-logo:after{font-size:27px!important}
    #fhqSidebar .fhq-brand img,#fhqSidebar .fhq-brand svg,
    #fhqSidebar .fhq-brand [style*='turf-mark'],
    #turfTopbar img[src*='turf-mark'],#turfTopbar [style*='turf-mark']{display:none!important;background-image:none!important}
  `;
  (document.head||document.documentElement).appendChild(s);
}

function sidebar(){
  var brand=q('#fhqSidebar .fhq-brand');if(!brand)return;
  qa('img,svg',brand).forEach(function(x){x.style.setProperty('display','none','important')});
  qa('*',brand).forEach(function(x){
    try{var bg=getComputedStyle(x).backgroundImage||'';if(bg.indexOf('turf-mark')>-1)x.style.setProperty('background-image','none','important')}catch(e){}
  });
  var mark=q('.turf-final-logo',brand);
  if(!mark){mark=document.createElement('div');mark.className='turf-final-logo';brand.insertBefore(mark,brand.firstChild)}
}

function topbar(){
  var bar=q('#turfTopbar');if(!bar)return;
  var profile=q('.turf-top-profile',bar);
  if(!profile){
    var suspects=qa('button,div',bar).filter(function(el){
      try{var bg=getComputedStyle(el).backgroundImage||'';return bg.indexOf('turf-mark')>-1 || !!q("img[src*='turf-mark']",el)}catch(e){return false}
    });
    profile=suspects.length?suspects[suspects.length-1]:null;
  }
  if(!profile)return;
  qa('img,svg',profile).forEach(function(x){x.style.setProperty('display','none','important')});
  profile.style.setProperty('background-image','none','important');
  profile.classList.add('turf-final-logo');
}

function fixTrivia(){
  var b=q("#turfTrialsCompetitiveLinks [data-comp-game='ttt']");if(!b)return;
  var icon=q('.turf-comp-icon',b);
  b.innerHTML='';
  if(icon)b.appendChild(icon);
  var s=document.createElement('span');s.textContent='Trivia Tac Toe';b.appendChild(s);
}

function run(){addCss();sidebar();topbar();fixTrivia()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[50,150,350,700,1200,2200,4000,7000].forEach(function(ms){setTimeout(run,ms)});
var t=null;if(window.MutationObserver)new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,35)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','src','class']});
})();
