/* TURF live parent-side Worker auth bridge.
   This file does not change TURF presentation. It only completes the existing
   child-frame auth transport in v88-36/js/08-script-08.js. */
(function(){
'use strict';
if(window.__TURF_LIVE_WORKER_PARENT__)return;
window.__TURF_LIVE_WORKER_PARENT__=true;

var API='https://turftest-api.turftrials.workers.dev';
var ALLOWED={
  turfBatch1GoogleSignIn:1,
  turfBatch1BContinueAsGuest:1,
  turfBatch1BResolveAccountToken:1
};

async function rpc(method,args){
  if(!ALLOWED[method])throw new Error('Unsupported TURF auth method.');
  var controller=new AbortController();
  var timer=setTimeout(function(){controller.abort()},15000);
  try{
    var res=await fetch(API+'/rpc',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({method:method,args:Array.isArray(args)?args:[]}),
      signal:controller.signal,
      cache:'no-store'
    });
    var body=null;
    try{body=await res.json()}catch(e){}
    if(!res.ok)throw new Error(body&&body.error?body.error:'TURF backend returned HTTP '+res.status);
    if(body&&body.ok===false)throw new Error(body.error||'TURF sign-in failed.');
    return body&&Object.prototype.hasOwnProperty.call(body,'result')?body.result:body;
  }catch(e){
    if(e&&e.name==='AbortError')throw new Error('TURF sign-in request timed out.');
    throw e;
  }finally{clearTimeout(timer)}
}

window.addEventListener('message',function(e){
  var d=e&&e.data;
  if(!d||d.type!=='turf-worker-rpc-request'||!d.id)return;
  var app=document.getElementById('turfApp');
  if(!app||e.source!==app.contentWindow)return;
  var method=String(d.method||'');
  if(!ALLOWED[method]){
    try{e.source.postMessage({type:'turf-worker-rpc-response',id:String(d.id),ok:false,error:'Unsupported TURF auth method.'},'*')}catch(_e){}
    return;
  }
  rpc(method,d.args).then(function(result){
    try{e.source.postMessage({type:'turf-worker-rpc-response',id:String(d.id),ok:true,result:result},'*')}catch(_e){}
  }).catch(function(err){
    try{e.source.postMessage({type:'turf-worker-rpc-response',id:String(d.id),ok:false,error:String(err&&err.message||err||'TURF sign-in failed.')},'*')}catch(_e){}
  });
},true);
})();
