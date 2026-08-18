/* ============================================================
   TURF V89.07 — BATCH 2 LIVE VISUAL CLEANUP
   Presentation-only. Keeps Batch 1 behavior untouched.
   ============================================================ */
(function(){
'use strict';
var STYLE_ID='turfV8907LiveCss';
function addCss(){
  var old=document.getElementById(STYLE_ID); if(old) old.remove();
  var s=document.createElement('style'); s.id=STYLE_ID;
  s.textContent=`
    /* Remove tiny fallback/broken-image text badges such as gray TURF labels */
    #fhqHome img{font-size:0!important;color:transparent!important;text-indent:-9999px!important}
    #fhqHome img[alt="TURF"],#fhqHome img[title="TURF"]{font-size:0!important;color:transparent!important}
    /* Keep reward art clean and contained */
    #fhqHome img{background-color:transparent!important}
    /* Hide legacy standalone diamond glyph immediately before Games */
    #fhqSidebar button [data-legacy-glyph],#fhqSidebar a [data-legacy-glyph]{display:none!important}
  `;
  document.head.appendChild(s);
}
function textNodes(root){
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);var a=[],n;while(n=w.nextNode())a.push(n);return a;
}
function cleanGames(){
  var side=document.getElementById('fhqSidebar'); if(!side)return;
  var candidates=side.querySelectorAll('button,a,[role="button"]');
  candidates.forEach(function(el){
    if(!/\bGames\b/i.test(el.textContent||''))return;
    textNodes(el).forEach(function(n){
      n.nodeValue=(n.nodeValue||'').replace(/[◇◈◆�]\s*(?=Games)/g,'');
    });
  });
}
function cleanBrokenBadges(){
  var home=document.getElementById('fhqHome'); if(!home)return;
  home.querySelectorAll('img').forEach(function(img){
    img.addEventListener('error',function(){
      img.alt='';img.removeAttribute('title');
      if(img.parentElement && /free daily pack/i.test(img.parentElement.parentElement?.textContent||'')) img.style.visibility='hidden';
    },{once:true});
    /* Browser fallback text is what produced the small gray TURF tag. */
    if((img.alt||'').trim().toUpperCase()==='TURF') img.alt='';
    if((img.title||'').trim().toUpperCase()==='TURF') img.removeAttribute('title');
  });
}
function apply(){addCss();cleanGames();cleanBrokenBadges()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
[100,350,900,1800,3500].forEach(function(ms){setTimeout(apply,ms)});
new MutationObserver(function(){clearTimeout(window.__turf8907LiveTimer);window.__turf8907LiveTimer=setTimeout(function(){cleanGames();cleanBrokenBadges()},80)}).observe(document.documentElement,{childList:true,subtree:true});
})();
