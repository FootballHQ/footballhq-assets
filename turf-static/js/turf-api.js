/* TURF static-host migration API layer
 * Keeps UI code independent of the backend transport.
 * In Apps Script it uses google.script.run; on a static host it uses HTTP JSON.
 */
(function(global){
  'use strict';

  const DEFAULT_TIMEOUT = 15000;
  const config = {
    baseUrl: '',
    timeout: DEFAULT_TIMEOUT,
    transport: 'auto' // auto | gas | http
  };

  function configure(next){
    if(!next || typeof next !== 'object') return {...config};
    if(typeof next.baseUrl === 'string') config.baseUrl = next.baseUrl.replace(/\/$/, '');
    if(Number.isFinite(next.timeout)) config.timeout = Math.max(1000, Number(next.timeout));
    if(['auto','gas','http'].includes(next.transport)) config.transport = next.transport;
    return {...config};
  }

  function hasGas(){
    return !!(global.google && google.script && google.script.run);
  }

  function chosenTransport(){
    if(config.transport === 'gas') return 'gas';
    if(config.transport === 'http') return 'http';
    return hasGas() ? 'gas' : 'http';
  }

  function gasCall(method, args){
    return new Promise((resolve,reject)=>{
      if(!hasGas()) return reject(new Error('Apps Script transport is unavailable.'));
      let timer = setTimeout(()=>reject(new Error('TURF backend timed out.')), config.timeout);
      try{
        let runner = google.script.run
          .withSuccessHandler((value)=>{ clearTimeout(timer); resolve(value); })
          .withFailureHandler((err)=>{ clearTimeout(timer); reject(err instanceof Error ? err : new Error((err&&err.message)||String(err||'Backend error'))); });
        const fn = runner[method];
        if(typeof fn !== 'function'){
          clearTimeout(timer);
          return reject(new Error('Unknown TURF backend method: '+method));
        }
        fn.apply(runner, args || []);
      }catch(err){
        clearTimeout(timer);
        reject(err);
      }
    });
  }

  async function httpCall(method, args){
    if(!config.baseUrl) throw new Error('TURF API base URL is not configured.');
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), config.timeout);
    try{
      const res = await fetch(config.baseUrl + '/rpc', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        signal: controller.signal,
        body: JSON.stringify({method, args: args || []})
      });
      let body = null;
      try{ body = await res.json(); }catch(_){ }
      if(!res.ok) throw new Error((body&&body.error)||('TURF API returned HTTP '+res.status));
      if(body && body.ok === false) throw new Error(body.error || 'TURF API request failed.');
      return body && Object.prototype.hasOwnProperty.call(body,'result') ? body.result : body;
    }catch(err){
      if(err && err.name === 'AbortError') throw new Error('TURF backend timed out.');
      throw err;
    }finally{
      clearTimeout(timer);
    }
  }

  function call(method, ...args){
    return chosenTransport() === 'gas' ? gasCall(method,args) : httpCall(method,args);
  }

  const api = {
    configure,
    transport: chosenTransport,
    call,

    // Auth/account calls used by the existing app.
    googleSignIn(credential){ return call('turfBatch1GoogleSignIn', credential); },
    continueAsGuest(token){ return call('turfBatch1BContinueAsGuest', token); },
    resolveAccountToken(token){ return call('turfBatch1BResolveAccountToken', token); },

    // Generic escape hatch while the rest of the app is migrated.
    rpc(method, ...args){ return call(method, ...args); }
  };

  global.TurfApi = api;
})(window);
