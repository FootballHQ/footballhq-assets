
(function(){
  try{
    var ua=navigator.userAgent||'';
    var phoneUA=/iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var touchPhone=(navigator.maxTouchPoints||0)>1 && Math.min(screen.width||9999,screen.height||9999)<=900;
    if(phoneUA||touchPhone){
      document.body.classList.add('fhq-mobile-device');
      document.documentElement.classList.add('fhq-mobile-device-root');
    }
  }catch(e){}
})();

/* TURF live auth transport shim.
   Presentation-neutral: intercepts ONLY the three auth RPCs and forwards them
   to the parent turftrials.com wrapper, which calls the Worker backend.
   Every non-auth google.script.run method continues to use Apps Script. */
(function(){
  'use strict';
  if(window.__TURF_LIVE_WORKER_AUTH_SHIM__)return;
  window.__TURF_LIVE_WORKER_AUTH_SHIM__=true;

  var TRUSTED_PARENT='https://turftrials.com';
  var AUTH_METHODS={
    turfBatch1GoogleSignIn:1,
    turfBatch1BContinueAsGuest:1,
    turfBatch1BResolveAccountToken:1
  };
  var pending={},seq=0;

  function install(){
    try{
      if(!(window.google&&google.script&&google.script.run))return false;
      if(google.script.run&&google.script.run.__turfWorkerAuthShim)return true;
      var nativeRun=google.script.run;

      function makeRunner(ok,bad){
        var target=function(){};
        return new Proxy(target,{
          get:function(_,prop){
            if(prop==='__turfWorkerAuthShim')return true;
            if(prop==='withSuccessHandler')return function(fn){return makeRunner(fn,bad)};
            if(prop==='withFailureHandler')return function(fn){return makeRunner(ok,fn)};
            if(typeof prop==='symbol')return undefined;
            return function(){
              var method=String(prop),args=Array.prototype.slice.call(arguments);
              if(!AUTH_METHODS[method]){
                try{
                  var r=nativeRun;
                  if(ok)r=r.withSuccessHandler(ok);
                  if(bad)r=r.withFailureHandler(bad);
                  return r[method].apply(r,args);
                }catch(e){if(bad)bad(e);else throw e}
                return;
              }

              var id='turf-auth-rpc-'+Date.now()+'-'+(++seq);
              var timer=setTimeout(function(){
                var p=pending[id];if(!p)return;delete pending[id];
                if(p.bad)p.bad(new Error('TURF sign-in request timed out.'));
              },15000);
              pending[id]={ok:ok,bad:bad,timer:timer};
              try{
                window.parent.postMessage({type:'turf-worker-rpc-request',id:id,method:method,args:args},TRUSTED_PARENT);
              }catch(e){
                clearTimeout(timer);delete pending[id];if(bad)bad(e);
              }
            };
          }
        });
      }

      google.script.run=makeRunner(null,null);
      return true;
    }catch(e){return false}
  }

  window.addEventListener('message',function(e){
    if(e.origin!==TRUSTED_PARENT)return;
    var d=e&&e.data;if(!d||d.type!=='turf-worker-rpc-response'||!d.id)return;
    var p=pending[d.id];if(!p)return;delete pending[d.id];clearTimeout(p.timer);
    if(d.ok){if(p.ok)p.ok(d.result);return}
    if(p.bad)p.bad(new Error(String(d.error||'TURF sign-in failed.')));
  },true);

  if(!install()){
    var tries=0,t=setInterval(function(){tries++;if(install()||tries>80)clearInterval(t)},50);
  }
})();
