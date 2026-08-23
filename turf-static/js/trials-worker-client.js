/* TURF static migration — Trials Worker client.
   Additive only. Nothing calls this file until the static migration shell opts in.
*/
(function(global){
  'use strict';
  if(global.TurfTrialsApi) return;

  function base(){
    try{
      if(global.TURF_CONFIG && global.TURF_CONFIG.apiBaseUrl) return String(global.TURF_CONFIG.apiBaseUrl).replace(/\/$/,'');
      if(global.TurfConfig && global.TurfConfig.apiBaseUrl) return String(global.TurfConfig.apiBaseUrl).replace(/\/$/,'');
    }catch(e){}
    return 'https://turftest-api.turftrials.workers.dev';
  }

  async function request(path,options){
    var controller=new AbortController();
    var timer=setTimeout(function(){controller.abort();},12000);
    try{
      var res=await fetch(base()+path,Object.assign({signal:controller.signal,headers:{'content-type':'application/json'}},options||{}));
      var body=await res.json().catch(function(){return {ok:false,error:'Invalid TURF backend response.'};});
      if(!res.ok || body.ok===false){
        var err=new Error(body.error||('TURF backend HTTP '+res.status));
        err.status=res.status;
        throw err;
      }
      return body;
    } finally {
      clearTimeout(timer);
    }
  }

  global.TurfTrialsApi={
    inventory:function(token){return request('/trials/inventory?token='+encodeURIComponent(String(token||'')));},
    records:function(trial){return request('/trials/records?trial='+encodeURIComponent(String(trial||'40yard')));},
    submitRecord:function(payload){return request('/trials/records',{method:'POST',body:JSON.stringify(payload||{})});}
  };
})(window);
