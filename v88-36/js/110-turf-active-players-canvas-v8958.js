/* TURF v89.58 — render the approved Active Players artwork through Canvas.
   This intentionally does NOT change auth/loading or game logic. It only
   replaces the broken <img data:...> paint path. */
(function(){
'use strict';
if(window.__TURF_AP_CANVAS_8958__)return;
window.__TURF_AP_CANVAS_8958__=true;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function isActive(){return document.body.classList.contains('ap8957')}
function bytesFromDataUrl(src){
  var p=String(src||'').indexOf(',');
  if(p<0)return null;
  var raw=atob(src.slice(p+1));
  var out=new Uint8Array(raw.length);
  for(var i=0;i<raw.length;i++)out[i]=raw.charCodeAt(i);
  return out;
}
function addCss(){
  if(q('#ap8958canvasCss'))return;
  var s=document.createElement('style');s.id='ap8958canvasCss';s.textContent=`
    body.ap8957 #ap8957img{visibility:hidden!important;opacity:0!important;pointer-events:none!important}
    #ap8958canvas{position:fixed;inset:0;width:100vw;height:100vh;z-index:1;display:block;pointer-events:none;background:#01060b}
    body:not(.ap8957) #ap8958canvas{display:none!important}
  `;(document.head||document.documentElement).appendChild(s);
}
async function paint(){
  addCss();
  if(!isActive())return;
  var img=q('#ap8957img');
  if(!img)return;
  var shell=img.parentElement||q('.football-game-shell')||document.body;
  var canvas=q('#ap8958canvas',shell);
  if(!canvas){canvas=document.createElement('canvas');canvas.id='ap8958canvas';shell.insertBefore(canvas,img)}
  if(canvas.dataset.ready==='1')return;
  var src=img.getAttribute('src')||img.src||'';
  if(!/^data:image\/(?:webp|png|jpeg);base64,/i.test(src))return;
  try{
    var bytes=bytesFromDataUrl(src);if(!bytes||!bytes.length)return;
    var mime=(src.match(/^data:([^;,]+)/i)||[])[1]||'image/webp';
    var blob=new Blob([bytes],{type:mime});
    var bmp=await createImageBitmap(blob);
    canvas.width=bmp.width;canvas.height=bmp.height;
    var ctx=canvas.getContext('2d',{alpha:false});
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    ctx.drawImage(bmp,0,0,bmp.width,bmp.height);
    if(bmp.close)bmp.close();
    canvas.dataset.ready='1';
    canvas.style.setProperty('display','block','important');
    canvas.style.setProperty('opacity','1','important');
  }catch(err){
    canvas.dataset.error=String(err&&err.message||err);
    console.error('[TURF] Active Players canvas artwork decode failed',err);
  }
}
function schedule(){[0,25,75,150,300,600,1100,2000].forEach(function(ms){setTimeout(paint,ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
document.addEventListener('click',schedule,true);
var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(paint,30)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src','style','aria-hidden']});
})();
