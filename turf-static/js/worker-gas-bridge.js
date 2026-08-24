/* TURF current-site backend bridge.
   Keeps the existing TURF frontend API (`google.script.run`) intact while
   routing calls to the Worker RPC backend. Presentation/UI is untouched. */
(function(){
'use strict';
if(window.__TURF_WORKER_GAS_BRIDGE__)return;
window.__TURF_WORKER_GAS_BRIDGE__=true;

var API='https://turftest-api.turftrials.workers.dev';
var TIMEOUT=20000;

function rpc(method,args){
  var ctrl=typeof AbortController==='function'?new AbortController():null;
  var timer=ctrl?setTimeout(function(){ctrl.abort()},TIMEOUT):null;
  return fetch(API+'/rpc',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({method:String(method||''),args:Array.isArray(args)?args:[]}),
    signal:ctrl?ctrl.signal:undefined,
    cache:'no-store',
    credentials:'omit'
  }).then(function(r){
    if(timer)clearTimeout(timer);
    return r.text().then(function(t){
      var data=null;try{data=t?JSON.parse(t):null}catch(e){}
      if(!r.ok)throw new Error((data&&(data.error||data.message))||('TURF backend HTTP '+r.status));
      if(data&&data.ok===false)throw new Error(data.error||data.message||'TURF request failed');
      if(data&&Object.prototype.hasOwnProperty.call(data,'result'))return data.result;
      return data;
    });
  }).catch(function(e){if(timer)clearTimeout(timer);throw e});
}

function runner(ok,bad){
  return new Proxy(function(){},{
    get:function(_,key){
      if(key==='withSuccessHandler')return function(fn){return runner(fn,bad)};
      if(key==='withFailureHandler')return function(fn){return runner(ok,fn)};
      if(key==='withUserObject')return function(){return runner(ok,bad)};
      if(key==='then')return undefined;
      return function(){
        var args=Array.prototype.slice.call(arguments);
        rpc(String(key),args).then(function(res){if(typeof ok==='function')ok(res)}).catch(function(err){
          if(typeof bad==='function')bad(err);
          else try{console.error('TURF Worker RPC failed:',String(key),err)}catch(e){}
        });
      };
    }
  });
}

window.google=window.google||{};
window.google.script=window.google.script||{};
window.google.script.run=runner();
window.TurfWorkerBridge={rpc:rpc,apiBaseUrl:API};
})();
