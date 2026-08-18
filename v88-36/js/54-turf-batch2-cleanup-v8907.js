/* ============================================================
   TURF V89.07 — BATCH 2 LIVE VISUAL CLEANUP
   Presentation-only. Keeps Batch 1 behavior untouched.
   ============================================================ */
(function(){
'use strict';
var STYLE_ID='turfV8907LiveCss';
var ROOT='https://footballhq.github.io/footballhq-assets/v88-36/brand/';
var MARK=ROOT+'turf-mark.svg?v=8907c';
var WORDMARK=ROOT+'turf-wordmark.svg?v=8907c';
function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function addCss(){
  var old=document.getElementById(STYLE_ID); if(old) old.remove();
  var s=document.createElement('style'); s.id=STYLE_ID;
  s.textContent=`
    /* HOME HERO: replace blurry/cropped raster with crisp vector wordmark */
    #fhqHome .fhq-home-brandline{display:block!important;position:relative!important;min-height:122px!important;margin:0 0 5px!important;overflow:visible!important}
    #fhqHome .fhq-home-brandline>.fhq-home-shield,#fhqHome .fhq-home-brandline>h1{display:none!important}
    #fhqHome .fhq-home-brandline:after{display:none!important;content:none!important}
    #turfBatch2HeroLogo{display:block!important;width:min(620px,100%)!important;max-width:620px!important;height:auto!important;max-height:122px!important;object-fit:contain!important;object-position:left center!important;margin:0!important;background:transparent!important;filter:drop-shadow(0 0 11px rgba(36,186,255,.18))!important}

    /* SIDEBAR BRAND: crisp standalone T mark + clean type */
    #fhqSidebar .fhq-brand{display:flex!important;align-items:center!important;gap:12px!important;overflow:visible!important}
    #fhqSidebar .fhq-brand-mark{width:60px!important;height:54px!important;min-width:60px!important;background:transparent url("${MARK}") center/contain no-repeat!important;border:0!important;border-radius:0!important;box-shadow:none!important;filter:drop-shadow(0 0 8px rgba(34,187,255,.28))!important;overflow:visible!important}
    #fhqSidebar .fhq-brand-mark svg,#fhqSidebar .fhq-brand-mark img,#fhqSidebar .fhq-brand-mark:after{display:none!important;content:none!important}
    #fhqSidebar .fhq-brand-copy{font-size:25px!important;line-height:.95!important;letter-spacing:.025em!important;font-weight:1000!important;white-space:nowrap!important}
    #fhqSidebar .fhq-brand-copy small{font-size:7px!important;line-height:1.15!important;letter-spacing:.16em!important;margin-top:6px!important;white-space:nowrap!important}

    /* TURF PASS icon */
    #fhqSidebar [data-fhq-nav="pass"]{position:relative!important;display:flex!important;align-items:center!important;gap:10px!important}
    .turfBatch2PassIcon{width:28px;height:28px;flex:0 0 28px;display:grid;place-items:center;border-radius:8px;background:linear-gradient(145deg,#6d4b08,#1a1d22);border:1px solid rgba(255,211,76,.42);box-shadow:0 0 13px rgba(255,202,53,.10);color:#ffd54d}
    .turfBatch2PassIcon svg{width:17px;height:17px;display:block}

    /* Remove tiny fallback/broken-image text badges such as gray TURF labels */
    #fhqHome img{font-size:0!important;color:transparent!important;text-indent:-9999px!important;background-color:transparent!important}
    #fhqHome img[alt="TURF"],#fhqHome img[title="TURF"]{font-size:0!important;color:transparent!important}
  `;
  document.head.appendChild(s);
}
function textNodes(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),a=[],n;while(n=w.nextNode())a.push(n);return a}
function cleanGames(){
  var side=qs('#fhqSidebar'); if(!side)return;
  side.querySelectorAll('button,a,[role="button"]').forEach(function(el){
    if(!/\bGames\b/i.test(el.textContent||''))return;
    textNodes(el).forEach(function(n){n.nodeValue=(n.nodeValue||'').replace(/[◇◈◆�]\s*(?=Games)/g,'')});
  });
}
function ensureHeroLogo(){
  var line=qs('#fhqHome .fhq-home-brandline'); if(!line)return;
  var img=qs('#turfBatch2HeroLogo',line);
  if(!img){img=document.createElement('img');img.id='turfBatch2HeroLogo';img.src=WORDMARK;img.alt='';line.insertBefore(img,line.firstChild)}
}
function ensurePassIcon(){
  var b=qs('#fhqSidebar [data-fhq-nav="pass"]'); if(!b)return;
  var old=qs('.turf-nav-icon',b);if(old)old.style.display='none';
  if(qs('.turfBatch2PassIcon',b))return;
  var span=document.createElement('span');span.className='turfBatch2PassIcon';span.setAttribute('aria-hidden','true');
  span.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 20 5v6c0 5.4-3.2 9.2-8 11-4.8-1.8-8-5.6-8-11V5l8-3Z"/><path d="M8 9h8M10 13h4"/></svg>';
  b.insertBefore(span,b.firstChild);
}
function cleanBrokenBadges(){
  var home=qs('#fhqHome'); if(!home)return;
  home.querySelectorAll('img').forEach(function(img){
    if(img.id==='turfBatch2HeroLogo')return;
    if((img.alt||'').trim().toUpperCase()==='TURF') img.alt='';
    if((img.title||'').trim().toUpperCase()==='TURF') img.removeAttribute('title');
  });
}
function apply(){addCss();cleanGames();ensureHeroLogo();ensurePassIcon();cleanBrokenBadges()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,350,900,1800,3500].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8907LiveTimer);window.__turf8907LiveTimer=setTimeout(function(){cleanGames();ensureHeroLogo();ensurePassIcon();cleanBrokenBadges()},80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
