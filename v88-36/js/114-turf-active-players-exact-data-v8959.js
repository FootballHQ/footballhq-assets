/* TURF v89.59 — exact approved Active Players artwork + live game overlay. */
(function(){
'use strict';
if(window.__TURF_AP_EXACT_8959__)return;window.__TURF_AP_EXACT_8959__=true;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function active(){return document.body.classList.contains('ap8957')}
function css(){if(q('#ap8959css'))return;var s=document.createElement('style');s.id='ap8959css';s.textContent=`
body.ap8957 #ap8957img{display:none!important;visibility:hidden!important;opacity:0!important}
#ap8959canvas{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;display:block!important;z-index:1!important;pointer-events:none!important;background:#01060b!important}
body:not(.ap8957) #ap8959canvas{display:none!important}
`;(document.head||document.documentElement).appendChild(s)}
function decode(data){var p=data.indexOf(',');if(p<0)throw new Error('missing data url');var raw=atob(data.slice(p+1)),u=new Uint8Array(raw.length);for(var i=0;i<raw.length;i++)u[i]=raw.charCodeAt(i);return u}
async function paint(){
 css();if(!active()||!window.__TURF_AP_EXACT_DATA__)return;
 var o=q('#footballGameOverlay')||q('.football-game-overlay')||q('.fg-game-overlay');if(!o)return;
 var sh=q('.football-game-shell',o)||o;
 var c=q('#ap8959canvas',sh);if(!c){c=document.createElement('canvas');c.id='ap8959canvas';sh.insertBefore(c,sh.firstChild)}
 if(c.dataset.ready==='1')return;
 try{
   var bytes=decode(window.__TURF_AP_EXACT_DATA__),blob=new Blob([bytes],{type:'image/webp'}),bmp;
   if(window.createImageBitmap)bmp=await createImageBitmap(blob);
   if(bmp){c.width=bmp.width;c.height=bmp.height;var x=c.getContext('2d',{alpha:false});x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(bmp,0,0,bmp.width,bmp.height);if(bmp.close)bmp.close();c.dataset.ready='1';return}
   var url=URL.createObjectURL(blob),im=new Image();im.onload=function(){c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d',{alpha:false}).drawImage(im,0,0);c.dataset.ready='1';URL.revokeObjectURL(url)};im.src=url;
 }catch(e){c.dataset.error=String(e&&e.message||e);console.error('[TURF] exact Active Players artwork failed',e)}
}
function sync(){
 if(window.__TURF_AP_EXACT_DATA__){var im=q('#ap8957img');if(im&&im.getAttribute('src')!==window.__TURF_AP_EXACT_DATA__){im.src=window.__TURF_AP_EXACT_DATA__;var old=q('#ap8958canvas');if(old)old.remove();var c=q('#ap8959canvas');if(c)c.dataset.ready='0'}}
 paint();
}
function schedule(){[0,25,75,150,300,600,1000,1600,2500].forEach(function(ms){setTimeout(sync,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();document.addEventListener('click',schedule,true);window.addEventListener('resize',sync);var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(sync,30)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-hidden','style','src']});
})();
