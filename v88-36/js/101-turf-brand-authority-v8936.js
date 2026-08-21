/* ============================================================
   TURF v89.36 — FINAL BRAND AUTHORITY
   Presentation only. No auth/account/game/card logic changes.

   Goals:
   - One premium TURF identity everywhere.
   - No legacy logo flashes/reappearing after render.
   - Sidebar + top-right use final T mark.
   - Home hero uses one full lockup (no duplicate T).
   - Browser favicon uses the same final mark.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_BRAND_AUTHORITY_8936__)return;
window.__TURF_BRAND_AUTHORITY_8936__=true;

var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var MARK=ROOT+'turf-mark.svg?v=8936';
var WORD=ROOT+'turf-wordmark.svg?v=8936';

function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}

function css(){
  var s=q('#turfBrandAuthority8936Css');
  if(!s){s=document.createElement('style');s.id='turfBrandAuthority8936Css'}
  s.textContent=`
    /* Prevent every known legacy brand renderer from becoming visible. */
    #fhqSidebar .fhq-brand img:not(.turf-brand-mark-8936),
    #fhqSidebar .fhq-brand svg:not(.turf-brand-svg-8936),
    #fhqSidebar .fhq-brand [class*="turf-final-logo"]:not(.turf-brand-mark-shell-8936),
    #fhqSidebar .fhq-brand [style*="turf-mark"],
    #turfTopbar img:not(.turf-top-mark-8936),
    #turfTopbar svg:not(.turf-brand-svg-8936),
    #turfTopbar [class*="turf-final-logo"]:not(.turf-brand-top-shell-8936),
    #fhqHome #turfV8918Brand img:not(.turf-home-lockup-8936),
    #fhqHome #turfV8918Brand svg,
    #fhqHome .fhq-home-brandline,
    #fhqHome #turfProHeroBrand,
    #fhqHome #turfExactHeroLogoV8901,
    #fhqHome .turf-exact-hero-logo,
    #fhqHome .turf-hero-brand-clean{
      display:none!important;visibility:hidden!important;opacity:0!important;
      width:0!important;height:0!important;min-width:0!important;max-width:0!important;
      margin:0!important;padding:0!important;border:0!important;
      background:none!important;background-image:none!important;
    }

    /* Sidebar final mark */
    #fhqSidebar .turf-brand-mark-shell-8936{
      width:54px!important;height:54px!important;min-width:54px!important;flex:0 0 54px!important;
      display:grid!important;place-items:center!important;border-radius:13px!important;overflow:hidden!important;
      background:linear-gradient(145deg,#0a1b28,#06111a)!important;
      border:1px solid rgba(57,202,255,.34)!important;
      box-shadow:inset 0 0 15px rgba(26,160,227,.10),0 8px 20px rgba(0,0,0,.28)!important;
    }
    #fhqSidebar .turf-brand-mark-8936{
      display:block!important;visibility:visible!important;opacity:1!important;
      width:43px!important;height:43px!important;max-width:43px!important;object-fit:contain!important;
      filter:drop-shadow(0 0 7px rgba(27,169,255,.34))!important;
    }

    /* Top-right final mark */
    #turfTopbar .turf-brand-top-shell-8936{
      width:46px!important;height:46px!important;min-width:46px!important;max-width:46px!important;flex:0 0 46px!important;
      display:grid!important;place-items:center!important;padding:0!important;border-radius:13px!important;overflow:hidden!important;
      background:linear-gradient(145deg,#0a1b28,#06111a)!important;background-image:none!important;
      border:1px solid rgba(57,202,255,.34)!important;
      box-shadow:inset 0 0 14px rgba(26,160,227,.10)!important;
      color:transparent!important;font-size:0!important;
    }
    #turfTopbar .turf-top-mark-8936{
      display:block!important;visibility:visible!important;opacity:1!important;
      width:36px!important;height:36px!important;max-width:36px!important;object-fit:contain!important;
      filter:drop-shadow(0 0 6px rgba(27,169,255,.28))!important;
    }

    /* Home: one authoritative full lockup only. */
    #fhqHome #turfV8918Brand{
      display:flex!important;align-items:center!important;justify-content:flex-start!important;
      width:100%!important;min-height:116px!important;margin:0 0 16px!important;overflow:visible!important;
    }
    #fhqHome .turf-home-lockup-8936{
      display:block!important;visibility:visible!important;opacity:1!important;
      width:min(590px,82%)!important;height:auto!important;max-height:132px!important;object-fit:contain!important;object-position:left center!important;
      filter:drop-shadow(0 8px 22px rgba(0,0,0,.26))!important;
    }
    #fhqHome #turfV8918Tag{display:none!important}

    /* Never show alt-text/fallback logo labels. */
    img[alt="TURF"]:not(.turf-home-lockup-8936),img[title="TURF"]:not(.turf-home-lockup-8936){
      font-size:0!important;color:transparent!important;text-indent:-9999px!important;
    }

    @media(max-width:760px){
      #fhqSidebar .turf-brand-mark-shell-8936{width:48px!important;height:48px!important;min-width:48px!important;flex-basis:48px!important}
      #fhqSidebar .turf-brand-mark-8936{width:38px!important;height:38px!important}
      #fhqHome .turf-home-lockup-8936{width:min(470px,94%)!important;max-height:112px!important}
    }
  `;
  (document.body||document.documentElement).appendChild(s);
}

function makeImg(cls,src,alt){
  var i=document.createElement('img');i.className=cls;i.src=src;i.alt=alt||'';i.decoding='async';i.draggable=false;return i;
}

function sidebar(){
  var brand=q('#fhqSidebar .fhq-brand');if(!brand)return;
  var shell=q('.turf-brand-mark-shell-8936',brand);
  if(!shell){
    shell=document.createElement('span');shell.className='turf-brand-mark-shell-8936';
    shell.appendChild(makeImg('turf-brand-mark-8936',MARK,''));
    brand.insertBefore(shell,brand.firstChild);
  }else{
    var i=q('.turf-brand-mark-8936',shell);if(i&&i.src.indexOf('8936')<0)i.src=MARK;
  }
  qa('img,svg',brand).forEach(function(el){if(!el.classList.contains('turf-brand-mark-8936'))el.setAttribute('aria-hidden','true')});
}

function topbar(){
  var bar=q('#turfTopbar');if(!bar)return;
  var kids=Array.prototype.slice.call(bar.children||[]);
  var target=q('.turf-top-profile',bar);
  if(!target&&kids.length>=2)target=kids[kids.length-2];
  if(!target)return;
  target.classList.add('turf-brand-top-shell-8936');
  var img=q('.turf-top-mark-8936',target);
  if(!img){
    qa('img,svg',target).forEach(function(el){el.style.setProperty('display','none','important')});
    target.style.setProperty('background-image','none','important');
    target.appendChild(makeImg('turf-top-mark-8936',MARK,''));
  }else if(img.src.indexOf('8936')<0){img.src=MARK}
}

function home(){
  var brand=q('#turfV8918Brand');if(!brand)return;
  var good=q('.turf-home-lockup-8936',brand);
  if(!good){
    /* Remove our previous injected brand children completely so there is no overlap/flicker. */
    while(brand.firstChild)brand.removeChild(brand.firstChild);
    good=makeImg('turf-home-lockup-8936',WORD,'TURF');
    brand.appendChild(good);
  }else if(good.src.indexOf('8936')<0){good.src=WORD}
}

function favicon(){
  try{
    qa('link[rel~="icon"],link[rel="shortcut icon"]').forEach(function(x){x.remove()});
    var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=MARK;document.head.appendChild(l);
    document.title='TURF';
  }catch(e){}
  try{window.top.postMessage({type:'turf-favicon',href:MARK,title:'TURF',version:'8936'},'*')}catch(e){}
}

function killFallbacks(){
  qa('img').forEach(function(i){
    var src=String(i.getAttribute('src')||'');
    var alt=String(i.getAttribute('alt')||'');
    if((/turf-mark|turf-wordmark/i.test(src)||/^TURF$/i.test(alt)) &&
       !i.classList.contains('turf-brand-mark-8936') &&
       !i.classList.contains('turf-top-mark-8936') &&
       !i.classList.contains('turf-home-lockup-8936')){
      i.style.setProperty('display','none','important');
      i.style.setProperty('visibility','hidden','important');
    }
  });
}

function run(){css();sidebar();topbar();home();favicon();killFallbacks()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
[40,120,300,650,1200,2200,4000,7000].forEach(function(ms){setTimeout(run,ms)});
var timer=null;
if(window.MutationObserver)new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,28)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src','style','class']});
})();
