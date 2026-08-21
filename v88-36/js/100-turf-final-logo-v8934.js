/* TURF v89.35 — FINAL LOGO AUTHORITY
   Presentation only. Replaces legacy logo visuals without touching account/game logic. */
(function(){
'use strict';
if(window.__TURF_FINAL_LOGO_8935__)return;
window.__TURF_FINAL_LOGO_8935__=true;

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function addCss(){
  var old=q('#turfFinalLogo8935Css');if(old)old.remove();
  var s=document.createElement('style');s.id='turfFinalLogo8935Css';
  s.textContent=`
    .turf-final-logo{
      display:grid!important;place-items:center!important;position:relative!important;
      background:linear-gradient(145deg,#0a1b28,#06111a)!important;background-image:none!important;
      border:1px solid rgba(50,184,238,.32)!important;
      box-shadow:inset 0 0 14px rgba(35,153,209,.10),0 7px 18px rgba(0,0,0,.30)!important;
      overflow:hidden!important;color:transparent!important;font-size:0!important;line-height:0!important;
    }
    .turf-final-logo:before{content:none!important;display:none!important}
    .turf-final-logo:after{
      content:'T'!important;display:block!important;font-family:Arial Black,Arial,sans-serif!important;
      font-style:italic!important;font-weight:950!important;line-height:1!important;color:#aeb7bf!important;
      transform:skewX(-13deg) rotate(-3deg)!important;-webkit-text-stroke:1.6px #05090d!important;
      text-shadow:-1.5px 0 #159fe7,1.5px 0 #159fe7,0 -1.5px #159fe7,0 1.5px #159fe7,
                  0 0 7px rgba(48,190,255,.65),3px 4px 2px rgba(0,0,0,.68)!important;
    }
    #fhqSidebar .turf-final-logo{width:52px!important;height:52px!important;min-width:52px!important;flex:0 0 52px!important;border-radius:12px!important}
    #fhqSidebar .turf-final-logo:after{font-size:31px!important}

    /* The live top-right profile/logo button is the second-to-last direct child before hamburger. */
    #turfTopbar>.turf-final-logo,#turfTopbar>*:nth-last-child(2).turf-final-logo{
      width:44px!important;height:44px!important;min-width:44px!important;max-width:44px!important;
      flex:0 0 44px!important;border-radius:13px!important;padding:0!important;
    }
    #turfTopbar>.turf-final-logo:after,#turfTopbar>*:nth-last-child(2).turf-final-logo:after{font-size:25px!important}

    #fhqSidebar .fhq-brand img,#fhqSidebar .fhq-brand svg,
    #fhqSidebar .fhq-brand [style*='turf-mark'],
    #turfTopbar img[src*='turf-mark'],#turfTopbar [style*='turf-mark'],
    #turfTopbar>*:nth-last-child(2) img,#turfTopbar>*:nth-last-child(2) svg{
      display:none!important;background-image:none!important;
    }
  `;
  (document.head||document.documentElement).appendChild(s);
}

function sidebar(){
  var brand=q('#fhqSidebar .fhq-brand');if(!brand)return;
  qa('img,svg',brand).forEach(function(x){x.style.setProperty('display','none','important')});
  qa('*',brand).forEach(function(x){try{var bg=getComputedStyle(x).backgroundImage||'';if(bg&&bg!=='none')x.style.setProperty('background-image','none','important')}catch(e){}});
  var mark=q('.turf-final-logo',brand);
  if(!mark){mark=document.createElement('div');mark.className='turf-final-logo';brand.insertBefore(mark,brand.firstChild)}
}

function topbar(){
  var bar=q('#turfTopbar');if(!bar)return;
  var direct=Array.prototype.slice.call(bar.children||[]);
  var profile=q('.turf-top-profile',bar);
  if(!profile && direct.length>=2) profile=direct[direct.length-2];
  if(!profile)return;

  qa('img,svg',profile).forEach(function(x){x.style.setProperty('display','none','important')});
  qa('*',profile).forEach(function(x){try{x.style.setProperty('background-image','none','important')}catch(e){}});
  profile.style.setProperty('background-image','none','important');
  profile.classList.add('turf-final-logo');
}

function fixTrivia(){
  var b=q("#turfTrialsCompetitiveLinks [data-comp-game='ttt']");if(!b)return;
  var icon=q('.turf-comp-icon',b);
  var fresh=document.createElement('span');fresh.textContent='Trivia Tac Toe';
  b.innerHTML='';if(icon)b.appendChild(icon);b.appendChild(fresh);
}

function run(){addCss();sidebar();topbar();fixTrivia()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[50,150,350,700,1200,2200,4000,7000].forEach(function(ms){setTimeout(run,ms)});
var t=null;if(window.MutationObserver)new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,35)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','src','class']});
})();
