import {HttpError,safeError,corsHeaders,json,requireOrigin} from './common.js';
import {handlesAuthRpc,handleAuthRpc} from './auth-rpc.js';
import {handlesAccountRpc,handleAccountRpc} from './account-rpc.js';
import {handlesGameRpc,handleGameRpc} from './game-rpc.js';
import {handlesDraftRpc,handleDraftRpc} from './draft-rpc.js';
import {handlesH2HRpc,handleH2HRpc} from './h2h-rpc.js';
import {handleTrialsGridRpc,handleTrialsHttp,handleGridAdmin} from './trials-grid-rpc.js';

const TRIAL_GRID_RPC=new Set(['turfV8905TrialInventory','turfV8944GridSearch','turfV8944GridIndexStatus']);
const TURF_APP_SOURCE='https://script.google.com/macros/s/AKfycbyZztqggePyYXWVuxhn-m7qaIM5xtR2OW0SSrj-_csJ4EcjTsEtgz9aAUP3yIFcAOI3yQ/exec?turfv=89.50&bridge=8967';
const TURF_WRAPPER_SOURCE='https://footballhq.github.io/footballhq-assets/index.html';
const TURF_BRIDGE_SRC='https://footballhq.github.io/footballhq-assets/turf-static/js/worker-gas-bridge.js?v=worker-login-12';
const BUILD='exact-turf-worker-v12-wrapper-app-split';

export default {
  async fetch(request,env){
    const origin=request.headers.get('Origin')||'';
    const cors=corsHeaders(origin,env);
    const url=new URL(request.url);

    if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
    if(url.pathname==='/health')return json({ok:true,service:'turf-api-migration-v2',productionCutover:false,rpcVersion:2,appProxy:true,loginBridge:12,build:BUILD},200,cors);

    try{
      /* Root is the EXISTING GitHub TURF login wrapper. No visual reconstruction. */
      if(url.pathname==='/'&&request.method==='GET')return await proxyExistingWrapper(url.origin);

      /* /app is the EXISTING TURF application, with transport injected only. */
      if(url.pathname==='/app'&&request.method==='GET')return await proxyCurrentTurfApp();

      if(url.pathname.startsWith('/trials/')){
        requireOrigin(origin,env);
        requireEnv(env);
        const response=await handleTrialsHttp(request,env);
        if(response)return response;
      }
      if(url.pathname==='/admin/grid-index/build'){
        requireOrigin(origin,env);
        requireEnv(env);
        const response=await handleGridAdmin(request,env);
        if(response)return response;
      }
      if(url.pathname==='/rpc'&&request.method==='POST'){
        requireOrigin(origin,env);
        requireEnv(env);
        const body=await request.json().catch(()=>({}));
        const method=String(body?.method||'');
        const args=Array.isArray(body?.args)?body.args:[];
        let result;

        if(handlesAuthRpc(method))result=await handleAuthRpc(method,args,env);
        else if(handlesAccountRpc(method))result=await handleAccountRpc(method,args,env);
        else if(handlesGameRpc(method))result=await handleGameRpc(method,args,env);
        else if(handlesDraftRpc(method))result=await handleDraftRpc(method,args,env);
        else if(handlesH2HRpc(method))result=await handleH2HRpc(method,args,env);
        else if(TRIAL_GRID_RPC.has(method))result=await handleTrialsGridRpc(method,args,env);
        else throw new HttpError(403,'RPC method is not enabled in TURF migration V2.');

        return json({ok:true,result},200,cors);
      }

      return json({ok:false,error:'Not found.'},404,cors);
    }catch(err){
      return json({ok:false,error:safeError(err)},err instanceof HttpError?err.status:500,cors);
    }
  }
};

async function proxyExistingWrapper(siteOrigin){
  const upstream=await fetch(TURF_WRAPPER_SOURCE+'?worker=12&ts='+Date.now(),{redirect:'follow',headers:{'User-Agent':'TURF-Worker-Wrapper-Proxy/12.0'}});
  let html=await upstream.text();
  if(!upstream.ok)throw new HttpError(502,'TURF wrapper source returned HTTP '+upstream.status+'.');
  if(!/<html|<!doctype/i.test(html))throw new HttpError(502,'TURF wrapper source is unavailable.');

  /* Change transport only: the exact wrapper now points its iframe to same-origin /app. */
  html=html.replace(/var APP_SRC='[^']*';/,"var APP_SRC='/app?v=worker12';");
  html=html.replace(/wrapper-8967/g,'wrapper-worker12');

  return new Response(html,{status:200,headers:{
    'Content-Type':'text/html; charset=utf-8',
    'Cache-Control':'no-store, no-cache, must-revalidate, max-age=0',
    'Pragma':'no-cache',
    'Expires':'0',
    'Referrer-Policy':'strict-origin-when-cross-origin',
    'X-Content-Type-Options':'nosniff'
  }});
}

async function proxyCurrentTurfApp(){
  const sourceUrl=TURF_APP_SOURCE+'&proxyts='+Date.now();
  const upstream=await fetch(sourceUrl,{redirect:'follow',headers:{'User-Agent':'TURF-Worker-App-Proxy/12.0'}});
  const html=await upstream.text();
  if(!upstream.ok)throw new HttpError(502,'Current TURF app source returned HTTP '+upstream.status+'.');
  if(!/<html|<!doctype/i.test(html)||/Sorry, unable to open the file/i.test(html))throw new HttpError(502,'Current TURF app source is temporarily unavailable.');

  /* Preserve the current TURF application exactly. Inject transport only. */
  const bridge='<script src="'+TURF_BRIDGE_SRC+'"></script>'+ 
    '<script>try{window.__TURF_APP_PROXY__=true;window.__TURF_APP_PROXY_VERSION__="worker-login-12";}catch(e){}</script>';
  let out=html;
  out=out.replace(/104-turf-account-continuity-v8940\.js(?:\?v=[^"'<>]*)?/g,'104-turf-account-continuity-v8940.js?v=8940-worker12');
  if(/<head[^>]*>/i.test(out))out=out.replace(/<head([^>]*)>/i,'<head$1>'+bridge);
  else if(/<body[^>]*>/i.test(out))out=out.replace(/<body([^>]*)>/i,'<body$1>'+bridge);
  else out=bridge+out;

  return new Response(out,{status:200,headers:{
    'Content-Type':'text/html; charset=utf-8',
    'Cache-Control':'no-store, no-cache, must-revalidate, max-age=0',
    'Pragma':'no-cache',
    'Expires':'0',
    'Referrer-Policy':'strict-origin-when-cross-origin',
    'X-Content-Type-Options':'nosniff'
  }});
}

function requireEnv(env){
  const missing=[];
  ['GOOGLE_SERVICE_ACCOUNT_EMAIL','GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY','TURF_GOOGLE_CLIENT_ID','TURF_SPREADSHEET_ID'].forEach(k=>{
    if(!String(env[k]||'').trim())missing.push(k);
  });
  if(missing.length)throw new HttpError(503,'Migration backend is not configured yet: '+missing.join(', '));
}
