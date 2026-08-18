/* ============================================================
   TURF V89.08 — BATCH 2 FINAL POLISH (CACHE-BUSTED)
   Presentation-only. Keeps Batch 1 behavior untouched.
   ============================================================ */
(function(){
'use strict';
if(window.__TURF_V8908_BATCH2__)return;
window.__TURF_V8908_BATCH2__=true;
function qs(s,r){return (r||document).querySelector(s)}
function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function addCss(){
  var old=document.getElementById('turfV8908Css');if(old)old.remove();
  var s=document.createElement('style');s.id='turfV8908Css';
  s.textContent=`
    /* remove black backplates from sidebar icons */
    #fhqSidebar .turf-nav-icon,
    #fhqSidebar .turf-nav-icon::before,
    #fhqSidebar .turf-nav-icon::after{
      background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;
    }

    /* persistent TURF Pass shield in both normal + active states */
    #fhqSidebar [data-fhq-nav="pass"]{display:flex!important;align-items:center!important;gap:10px!important}
    #fhqSidebar [data-fhq-nav="pass"]>.turf-nav-icon,
    #fhqSidebar [data-fhq-nav="pass"]>.turfBatch2PassIcon{display:none!important}
    #fhqSidebar [data-fhq-nav="pass"]::before{
      content:""!important;width:28px!important;height:28px!important;flex:0 0 28px!important;display:block!important;
      background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffd54d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2 20 5v6c0 5.4-3.2 9.2-8 11-4.8-1.8-8-5.6-8-11V5l8-3Z'/%3E%3Cpath d='M8 9h8M10 13h4'/%3E%3C/svg%3E") center/26px 26px no-repeat!important;
      border:0!important;box-shadow:none!important;filter:drop-shadow(0 0 6px rgba(255,213,77,.45))!important;
    }
    #fhqSidebar [data-fhq-nav="pass"].active::before{display:block!important;opacity:1!important;visibility:visible!important}

    /* dashboard icons: remove black squares */
    #fhqHome .fhq-dashboard-card .turf-stat-art,
    #fhqHome .fhq-dashboard-card .icon,
    #fhqHome .fhq-dashboard-card [class*="icon"],
    #fhqHome .fhq-dashboard-card>div:first-child{
      background:transparent!important;border:0!important;box-shadow:none!important;
    }

    /* lifetime points gets a unique green achievement badge */
    #fhqHome .fhq-dashboard-card:nth-child(2){
      position:relative!important;padding-left:82px!important;
      border-color:rgba(54,220,112,.58)!important;
      background:linear-gradient(155deg,rgba(8,49,31,.88),rgba(6,22,29,.99))!important;
    }
    #fhqHome .fhq-dashboard-card:nth-child(2)::before{
      content:"";position:absolute;left:18px;top:50%;transform:translateY(-50%);width:50px;height:50px;
      background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 4 54 16v32L32 60 10 48V16Z' fill='%230d3928' stroke='%233fe07b' stroke-width='3'/%3E%3Cpath d='m32 16 5.2 10.5 11.6 1.7-8.4 8.2 2 11.6L32 42.5 21.6 48l2-11.6-8.4-8.2 11.6-1.7Z' fill='none' stroke='%2395f8b6' stroke-width='3'/%3E%3C/svg%3E") center/contain no-repeat;
      filter:drop-shadow(0 0 8px rgba(63,224,123,.32));
    }
    #fhqHome .fhq-dashboard-card:nth-child(2) .fhq-coin-icon,
    #fhqHome .fhq-dashboard-card:nth-child(2) img{display:none!important}

    /* future green currency = glowing energy orb, not coin */
    #turfTopbar .turf-top-future:first-of-type .turf-future-gem{display:none!important}
    #turfTopbar .turf-top-future:first-of-type::before{
      content:""!important;width:22px!important;height:22px!important;flex:0 0 22px!important;border-radius:50%!important;
      background:radial-gradient(circle at 35% 30%,#e6fff0 0 12%,#5cffad 23%,#20cf7c 55%,#086446 100%)!important;
      border:1px solid rgba(122,255,184,.78)!important;
      box-shadow:0 0 14px rgba(55,239,139,.62),inset 0 0 7px rgba(255,255,255,.26)!important;
    }

    /* no fallback TURF text tag on images */
    #fhqHome img[alt="TURF"],#fhqHome img[title="TURF"]{font-size:0!important;color:transparent!important;text-indent:-9999px!important}
  `;
  document.head.appendChild(s);
}
function cleanFallbacks(){
  qsa('#fhqHome img').forEach(function(img){
    if((img.alt||'').trim().toUpperCase()==='TURF')img.alt='';
    if((img.title||'').trim().toUpperCase()==='TURF')img.removeAttribute('title');
  });
}
function apply(){addCss();cleanFallbacks()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,350,900,1800,3500].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8908Timer);window.__turf8908Timer=setTimeout(apply,80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
