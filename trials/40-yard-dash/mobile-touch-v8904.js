/* TURF V89.04 — 40-YARD DASH MOBILE TOUCH CONTROLS
   Desktop keeps alternating R/G. On touch devices, each screen tap alternates
   virtual R/G presses through the existing race engine.
*/
(function(){
  'use strict';
  if(window.__TURF_40_TOUCH_V8904__) return;
  window.__TURF_40_TOUCH_V8904__=true;

  var coarse=false;
  try{coarse=window.matchMedia('(pointer:coarse)').matches||('ontouchstart' in window)}catch(e){}
  if(!coarse) return;

  var nextKey='r';
  var race=document.getElementById('screen-race');
  if(!race) return;

  function virtualPress(){
    var key=nextKey;
    nextKey=nextKey==='r'?'g':'r';
    try{
      document.dispatchEvent(new KeyboardEvent('keydown',{key:key,bubbles:true,cancelable:true}));
    }catch(e){
      var ev=document.createEvent('Event');ev.initEvent('keydown',true,true);ev.key=key;document.dispatchEvent(ev);
    }
  }

  function shouldIgnore(target){
    return !!(target&&target.closest&&target.closest('button,a,input,select,textarea,.records-modal'));
  }

  race.addEventListener('pointerdown',function(e){
    if(shouldIgnore(e.target)) return;
    e.preventDefault();
    virtualPress();
  },{passive:false});

  race.addEventListener('touchstart',function(e){
    if(window.PointerEvent||shouldIgnore(e.target)) return;
    e.preventDefault();
    virtualPress();
  },{passive:false});

  var intro=document.querySelector('#screen-intro .hero-card > p');
  if(intro) intro.innerHTML='Top card is you. <b>Tap the screen as fast as you can</b> to sprint.';
  var demo=document.querySelector('#screen-intro .control-demo');
  if(demo) demo.innerHTML='<span class="touch-run-icon">☝</span><strong>TAP SCREEN TO RUN</strong>';
  var controls=document.querySelector('#screen-race .race-controls');
  if(controls) controls.innerHTML='<span class="touch-run-icon">☝</span><strong>TAP ANYWHERE TO RUN!</strong>';

  var style=document.createElement('style');
  style.textContent='\n    #screen-race{touch-action:manipulation!important;-webkit-user-select:none!important;user-select:none!important}\n    .touch-run-icon{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:15px;border:1px solid rgba(112,211,255,.45);background:linear-gradient(145deg,#15334a,#091a28);font-size:27px;box-shadow:0 0 20px rgba(76,198,255,.12)}\n    @media(max-width:800px){.race-controls{gap:10px!important}.race-controls strong{font-size:14px!important}.control-demo{gap:10px!important}}\n  ';
  document.head.appendChild(style);
})();