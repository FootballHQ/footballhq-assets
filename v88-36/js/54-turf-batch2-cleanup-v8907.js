/* ============================================================
   TURF V89.07 — BATCH 2 FINAL VISUAL POLISH
   Presentation-only. Keeps Batch 1 behavior untouched.
   ============================================================ */
(function(){
'use strict';
var STYLE_ID='turfV8907LiveCss';
var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var MARK=ROOT+'turf-mark.svg?v=8907e';
var WORDMARK=ROOT+'turf-wordmark.svg?v=8907e';
function qs(s,r){return (r||document).querySelector(s)}
function addCss(){
  var old=document.getElementById(STYLE_ID);if(old)old.remove();
  var s=document.createElement('style');s.id=STYLE_ID;
  s.textContent=`
    /* HERO / BRAND */
    #fhqHome .fhq-home-brandline{display:block!important;position:relative!important;min-height:122px!important;margin:0 0 5px!important;overflow:visible!important}
    #fhqHome .fhq-home-brandline>.fhq-home-shield,#fhqHome .fhq-home-brandline>h1{display:none!important}
    #fhqHome .fhq-home-brandline:after{display:none!important;content:none!important}
    #turfBatch2HeroLogo{display:block!important;width:min(620px,100%)!important;max-width:620px!important;height:auto!important;max-height:122px!important;object-fit:contain!important;object-position:left center!important;margin:0!important;background:transparent!important;filter:drop-shadow(0 0 11px rgba(36,186,255,.18))!important}

    #fhqSidebar .fhq-brand{display:flex!important;align-items:center!important;gap:12px!important;overflow:visible!important}
    #fhqSidebar .fhq-brand-mark{width:60px!important;height:54px!important;min-width:60px!important;background:transparent url("${MARK}") center/contain no-repeat!important;border:0!important;border-radius:0!important;box-shadow:none!important;filter:drop-shadow(0 0 8px rgba(34,187,255,.28))!important;overflow:visible!important}
    #fhqSidebar .fhq-brand-mark svg,#fhqSidebar .fhq-brand-mark img,#fhqSidebar .fhq-brand-mark:after{display:none!important;content:none!important}
    #fhqSidebar .fhq-brand-copy{font-size:25px!important;line-height:.95!important;letter-spacing:.025em!important;font-weight:1000!important;white-space:nowrap!important}
    #fhqSidebar .fhq-brand-copy small{font-size:7px!important;line-height:1.15!important;letter-spacing:.16em!important;margin-top:6px!important;white-space:nowrap!important}

    /* SIDEBAR ICONS — remove black square backplates */
    #fhqSidebar .turf-nav-icon{background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important}
    #fhqSidebar .turf-nav-icon svg{filter:drop-shadow(0 0 5px currentColor)!important}

    /* TURF PASS — persistent gold shield whether active or not */
    #fhqSidebar [data-fhq-nav="pass"]{position:relative!important;display:flex!important;align-items:center!important;gap:10px!important}
    #fhqSidebar [data-fhq-nav="pass"]>.turf-nav-icon,#fhqSidebar [data-fhq-nav="pass"]>.turfBatch2PassIcon{display:none!important}
    #fhqSidebar [data-fhq-nav="pass"]::before{
      content:""!important;width:28px!important;height:28px!important;flex:0 0 28px!important;display:block!important;border-radius:0!important;
      background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffd54d' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2 20 5v6c0 5.4-3.2 9.2-8 11-4.8-1.8-8-5.6-8-11V5l8-3Z'/%3E%3Cpath d='M8 9h8M10 13h4'/%3E%3C/svg%3E") center/25px 25px no-repeat!important;
      border:0!important;box-shadow:none!important;filter:drop-shadow(0 0 6px rgba(255,213,77,.42))!important;
    }
    #fhqSidebar [data-fhq-nav="pass"].active::before{display:block!important;opacity:1!important;visibility:visible!important}

    /* DASHBOARD ICONS — remove black boxes */
    #fhqHome .fhq-dashboard-card>div:first-child,
    #fhqHome .fhq-dashboard-card .icon,
    #fhqHome .fhq-dashboard-card [class*="icon"]{background:transparent!important;border:0!important;box-shadow:none!important}

    /* LIFETIME POINTS — distinct green achievement badge, not coins */
    #fhqHome .fhq-dashboard-card:nth-child(2){border-color:rgba(54,220,112,.55)!important;background:linear-gradient(155deg,rgba(8,49,31,.88),rgba(6,22,29,.99))!important}
    #fhqHome .fhq-dashboard-card:nth-child(2)::before{
      content:"";display:block;width:54px;height:54px;flex:0 0 54px;margin-right:10px;
      background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 4 54 16v32L32 60 10 48V16Z' fill='%230e3c2c' stroke='%233fe07b' stroke-width='3'/%3E%3Cpath d='m32 16 5.2 10.5 11.6 1.7-8.4 8.2 2 11.6L32 42.5 21.6 48l2-11.6-8.4-8.2 11.6-1.7Z' fill='none' stroke='%2388f5ad' stroke-width='3'/%3E%3C/svg%3E") center/contain no-repeat;filter:drop-shadow(0 0 8px rgba(63,224,123,.30))
    }
    #fhqHome .fhq-dashboard-card:nth-child(2){position:relative!important;padding-left:78px!important}
    #fhqHome .fhq-dashboard-card:nth-child(2)::before{position:absolute;left:18px;top:50%;transform:translateY(-50%)}
    #fhqHome .fhq-dashboard-card:nth-child(2) img,#fhqHome .fhq-dashboard-card:nth-child(2) .fhq-coin-icon{display:none!important}

    /* FUTURE GREEN CURRENCY — dedicated energy-credit icon */
    #turfTopbar .turf-top-future:first-of-type .turf-future-gem{display:none!important}
    #turfTopbar .turf-top-future:first-of-type::before{
      content:"";width:22px;height:22px;flex:0 0 22px;border-radius:50%;
      background:radial-gradient(circle at 35% 30%,#d8ffe9 0 13%,#42f59a 24%,#11b968 58%,#075c3d 100%);
      border:1px solid rgba(111,255,175,.75);box-shadow:0 0 13px rgba(54,238,135,.55),inset 0 0 7px rgba(255,255,255,.22)
    }
    #turfTopbar .turf-top-future:first-of-type{border-color:rgba(50,221,123,.42)!important;background:linear-gradient(160deg,rgba(6,55,33,.86),rgba(6,23,26,.96))!important}

    /* tiny broken fallback labels */
    #fhqHome img{font-size:0!important;color:transparent!important;text-indent:-9999px!important;background-color:transparent!important}
    #fhqHome img[alt="TURF"],#fhqHome img[title="TURF"]{font-size:0!important;color:transparent!important}
  `;
  document.head.appendChild(s);
}
function textNodes(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),a=[],n;while(n=w.nextNode())a.push(n);return a}
function cleanGames(){
  var side=qs('#fhqSidebar');if(!side)return;
  side.querySelectorAll('button,a,[role="button"]').forEach(function(el){
    if(!/\bGames\b/i.test(el.textContent||''))return;
    textNodes(el).forEach(function(n){n.nodeValue=(n.nodeValue||'').replace(/[◇◈◆�]\s*(?=Games)/g,'')});
  });
}
function ensureHeroLogo(){
  var line=qs('#fhqHome .fhq-home-brandline');if(!line)return;
  var img=qs('#turfBatch2HeroLogo',line);
  if(!img){img=document.createElement('img');img.id='turfBatch2HeroLogo';img.src=WORDMARK;img.alt='';line.insertBefore(img,line.firstChild)}
}
function cleanBrokenBadges(){
  var home=qs('#fhqHome');if(!home)return;
  home.querySelectorAll('img').forEach(function(img){
    if(img.id==='turfBatch2HeroLogo')return;
    if((img.alt||'').trim().toUpperCase()==='TURF')img.alt='';
    if((img.title||'').trim().toUpperCase()==='TURF')img.removeAttribute('title');
  });
}
function apply(){addCss();cleanGames();ensureHeroLogo();cleanBrokenBadges()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,350,900,1800,3500].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8907LiveTimer);window.__turf8907LiveTimer=setTimeout(function(){cleanGames();ensureHeroLogo();cleanBrokenBadges()},80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
