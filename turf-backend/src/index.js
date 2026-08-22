const JSON_HEADERS = {'content-type':'application/json; charset=utf-8'};
const RPC_ALLOWLIST = new Set([
  'turfBatch1GoogleSignIn',
  'turfBatch1BContinueAsGuest',
  'turfBatch1BResolveAccountToken'
]);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, {status:204, headers:cors});
    }

    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return json({ok:true, service:'turf-api-migration', productionCutover:false}, 200, cors);
    }

    if (url.pathname !== '/rpc' || request.method !== 'POST') {
      return json({ok:false,error:'Not found.'},404,cors);
    }

    try {
      requireOrigin(origin, env);
      requireEnv(env);
      const body = await request.json();
      const method = String(body && body.method || '');
      const args = Array.isArray(body && body.args) ? body.args : [];
      if (!RPC_ALLOWLIST.has(method)) throw new HttpError(403,'RPC method is not enabled during migration.');

      let result;
      if (method === 'turfBatch1GoogleSignIn') result = await googleSignIn(String(args[0] || ''), env);
      if (method === 'turfBatch1BContinueAsGuest') result = await continueAsGuest(String(args[0] || ''), env);
      if (method === 'turfBatch1BResolveAccountToken') result = await resolveAccountToken(String(args[0] || ''), env);
      return json({ok:true,result},200,cors);
    } catch (err) {
      const status = err instanceof HttpError ? err.status : 500;
      return json({ok:false,error:safeError(err)},status,cors);
    }
  }
};

class HttpError extends Error {
  constructor(status,message){ super(message); this.status=status; }
}

function safeError(err){
  if (!err) return 'TURF backend error.';
  return String(err.message || err).slice(0,400);
}

function corsHeaders(origin, env){
  const allowed = allowedOrigins(env);
  const headers = {
    ...JSON_HEADERS,
    'access-control-allow-methods':'POST,OPTIONS',
    'access-control-allow-headers':'content-type',
    'access-control-max-age':'86400',
    'vary':'Origin',
    'cache-control':'no-store'
  };
  if (origin && allowed.has(origin)) headers['access-control-allow-origin'] = origin;
  return headers;
}

function json(value,status,headers){
  return new Response(JSON.stringify(value),{status,headers});
}

function allowedOrigins(env){
  return new Set(String(env.ALLOWED_ORIGINS || 'https://turftrials.com')
    .split(',').map(v=>v.trim()).filter(Boolean));
}

function requireOrigin(origin, env){
  if (!origin || !allowedOrigins(env).has(origin)) throw new HttpError(403,'Origin is not allowed.');
}

function requireEnv(env){
  const missing=[];
  ['GOOGLE_SERVICE_ACCOUNT_EMAIL','GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY','TURF_GOOGLE_CLIENT_ID','TURF_SPREADSHEET_ID']
    .forEach(k=>{if(!String(env[k]||'').trim())missing.push(k)});
  if(missing.length) throw new HttpError(503,'Migration backend is not configured yet: '+missing.join(', '));
}

function cleanToken(value){
  const token=String(value||'').trim();
  if(!token || token.length<8 || token.length>120) throw new HttpError(400,'Invalid account token.');
  return token;
}

function usernameKey(value){ return String(value||'').trim().toLowerCase().replace(/\s+/g,' '); }
function cleanUsername(value){
  const name=String(value||'').trim().replace(/\s+/g,' ');
  if(!/^[A-Za-z0-9_ -]{3,20}$/.test(name)) throw new HttpError(400,'Username must be 3–20 letters, numbers, spaces, _ or -.');
  return name;
}

function parseJsonArray(value){
  try { const v=JSON.parse(String(value||'[]')); return Array.isArray(v)?v:[]; } catch(_){ return []; }
}

function levelRequirement(level){
  level=Math.max(1,Number(level)||1);
  return Math.round(40 + Math.pow(level,1.72)*17);
}
function pointsForLevel(level){ let total=0; for(let l=1;l<level;l++) total+=levelRequirement(l); return total; }
function levelFromPoints(points){
  points=Math.max(0,Number(points)||0); let level=1;
  while(level<100 && points>=pointsForLevel(level+1)) level++;
  return level;
}

function accountObject(row){
  row = Array.isArray(row) ? row : [];
  const points=Number(row[3]||0), totalDailies=Number(row[4]||0);
  return {
    token:String(row[0]||''),
    username:String(row[1]||''),
    points,
    totalDailies,
    streakDays:Number(row[5]||0),
    lastDailyDate:normalizeDateCell(row[6]),
    avatarUrl:String(row[8]||''),
    avatarEmoji:String(row[9]||''),
    achievementIds:parseJsonArray(row[12]),
    equippedTitle:String(row[13]||''),
    hqCoins:Number(row[14]||0),
    inventory:parseJsonArray(row[15]),
    equippedRing:String(row[16]||''),
    equippedBanner:String(row[17]||''),
    placementClaims:parseJsonArray(row[18]),
    dailyWins:Number(row[19]||totalDailies||0),
    collection:parseJsonArray(row[21]),
    lastCoinAward:String(row[22]||''),
    level:levelFromPoints(points)
  };
}

function normalizeDateCell(v){
  const s=String(v||'').trim();
  if(/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0,10);
  return s;
}

async function googleSignIn(idToken, env){
  const g=await verifyGoogleIdToken(idToken,env);
  const protectedMap=parseProtectedMap(env.PROTECTED_GOOGLE_MAP_JSON);
  const protectedUsername=protectedMap[g.email];

  if(protectedUsername){
    const target=await findAccountByUsername(protectedUsername,env);
    if(!target) throw new HttpError(409,'Protected TURF account could not be found.');
    await upsertAuthMapping(g,target.profile,env);
    return {ok:true,signedIn:true,linked:true,repaired:true,created:false,email:g.email,profile:target.profile};
  }

  const authRows=await sheetValues(env,`${authSheet(env)}!A2:G`);
  const index=authRows.findIndex(r=>String(r[0]||'')==='google' && String(r[1]||'')===g.subject);
  if(index<0){
    return {ok:true,signedIn:false,needsLink:true,email:g.email,displayName:g.name};
  }

  const row=authRows[index];
  const token=String(row[3]||'').trim();
  const account=token ? await findAccountByToken(token,env) : null;
  if(!account) throw new HttpError(409,'Your linked TURF account could not be found.');

  await updateRange(env,`${authSheet(env)}!G${index+2}:G${index+2}`,[[new Date().toISOString()]]);
  return {ok:true,signedIn:true,needsLink:false,email:g.email,profile:account.profile};
}

async function continueAsGuest(rawToken,env){
  const token=cleanToken(rawToken);
  let account=await findAccountByToken(token,env);
  if(account) return {ok:true,mode:'guest',created:false,profile:account.profile};

  const rows=await sheetValues(env,`${accountsSheet(env)}!A2:W`);
  account=findAccountByTokenInRows(token,rows);
  if(account) return {ok:true,mode:'guest',created:false,profile:account.profile};

  const tail=token.replace(/[^A-Za-z0-9]/g,'').slice(-6).toUpperCase() || crypto.randomUUID().replace(/-/g,'').slice(0,6).toUpperCase();
  const base=cleanUsername('Guest-'+tail);
  const keys=new Set(rows.map(r=>usernameKey(r[1])));
  let username=base;
  for(let i=2; keys.has(usernameKey(username)) && i<1000; i++) username=cleanUsername(`${base}-${i}`);
  if(keys.has(usernameKey(username))) throw new HttpError(409,'Could not create a unique guest username.');

  const row=[token,username,usernameKey(username),0,0,0,'',new Date().toISOString(),'','','','','[]','',0,'[]','','','[]',0,true,'[]',''];
  await appendValues(env,`${accountsSheet(env)}!A:W`,[row]);
  account=await findAccountByToken(token,env);
  if(!account) throw new HttpError(500,'Guest account creation failed.');
  return {ok:true,mode:'guest',created:true,profile:account.profile};
}

async function resolveAccountToken(rawToken,env){
  let token;
  try { token=cleanToken(rawToken); } catch(_){ return {authenticated:false,profile:null}; }
  const account=await findAccountByToken(token,env);
  return account ? {authenticated:true,profile:account.profile} : {authenticated:false,profile:null};
}

function findAccountByTokenInRows(token,rows){
  const index=rows.findIndex(r=>String(r[0]||'')===token);
  return index<0 ? null : {sheetRow:index+2,profile:accountObject(rows[index]),raw:rows[index]};
}
async function findAccountByToken(token,env){
  const rows=await sheetValues(env,`${accountsSheet(env)}!A2:W`);
  return findAccountByTokenInRows(token,rows);
}
async function findAccountByUsername(username,env){
  const key=usernameKey(cleanUsername(username));
  const rows=await sheetValues(env,`${accountsSheet(env)}!A2:W`);
  const index=rows.findIndex(r=>usernameKey(r[2]||r[1])===key);
  return index<0 ? null : {sheetRow:index+2,profile:accountObject(rows[index]),raw:rows[index]};
}

async function upsertAuthMapping(g,profile,env){
  const rows=await sheetValues(env,`${authSheet(env)}!A2:G`);
  const index=rows.findIndex(r=>String(r[0]||'')===g.provider && String(r[1]||'')===g.subject);
  const now=new Date().toISOString();
  if(index>=0){
    const created=rows[index][5] || now;
    await updateRange(env,`${authSheet(env)}!A${index+2}:G${index+2}`,[[g.provider,g.subject,g.email,profile.token,profile.username,created,now]]);
  } else {
    await appendValues(env,`${authSheet(env)}!A:G`,[[g.provider,g.subject,g.email,profile.token,profile.username,now,now]]);
  }
}

function parseProtectedMap(raw){
  if(!raw) return {};
  try {
    const parsed=JSON.parse(raw);
    const out={};
    Object.entries(parsed||{}).forEach(([email,username])=>{out[String(email).toLowerCase().trim()]=String(username).trim()});
    return out;
  } catch(_){ throw new HttpError(503,'Protected account mapping is misconfigured.'); }
}

async function verifyGoogleIdToken(idToken,env){
  idToken=String(idToken||'').trim();
  if(!idToken) throw new HttpError(400,'Missing Google ID token.');
  const res=await fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(idToken));
  if(!res.ok) throw new HttpError(401,'Google sign-in could not be verified.');
  const p=await res.json();
  if(String(p.aud||'')!==String(env.TURF_GOOGLE_CLIENT_ID||'')) throw new HttpError(401,'Google sign-in audience mismatch.');
  if(String(p.email_verified||'')!=='true') throw new HttpError(401,'Google email is not verified.');
  if(!p.sub) throw new HttpError(401,'Google account subject is missing.');
  return {provider:'google',subject:String(p.sub),email:String(p.email||'').toLowerCase().trim(),name:String(p.name||'')};
}

function accountsSheet(env){ return String(env.ACCOUNTS_SHEET||'Accounts'); }
function authSheet(env){ return String(env.AUTH_SHEET||'TURF_Auth'); }

async function sheetValues(env,range){
  const token=await serviceAccountAccessToken(env);
  const url=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}/values/${encodeURIComponent(range)}?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`;
  const res=await fetch(url,{headers:{authorization:`Bearer ${token}`}});
  const body=await res.json().catch(()=>({}));
  if(!res.ok) throw new HttpError(502,body?.error?.message||'Google Sheets read failed.');
  return Array.isArray(body.values)?body.values:[];
}

async function appendValues(env,range,values){
  const token=await serviceAccountAccessToken(env);
  const url=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res=await fetch(url,{method:'POST',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify({majorDimension:'ROWS',values})});
  const body=await res.json().catch(()=>({}));
  if(!res.ok) throw new HttpError(502,body?.error?.message||'Google Sheets append failed.');
  return body;
}

async function updateRange(env,range,values){
  const token=await serviceAccountAccessToken(env);
  const url=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res=await fetch(url,{method:'PUT',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify({majorDimension:'ROWS',values})});
  const body=await res.json().catch(()=>({}));
  if(!res.ok) throw new HttpError(502,body?.error?.message||'Google Sheets update failed.');
  return body;
}

let cachedAccessToken=null;
let cachedAccessTokenExp=0;
async function serviceAccountAccessToken(env){
  const now=Math.floor(Date.now()/1000);
  if(cachedAccessToken && cachedAccessTokenExp>now+60) return cachedAccessToken;

  const header=b64url(JSON.stringify({alg:'RS256',typ:'JWT'}));
  const claim=b64url(JSON.stringify({
    iss:String(env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
    scope:'https://www.googleapis.com/auth/spreadsheets',
    aud:'https://oauth2.googleapis.com/token',
    iat:now,
    exp:now+3600
  }));
  const unsigned=`${header}.${claim}`;
  const key=await importPrivateKey(String(env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY));
  const signature=await crypto.subtle.sign({name:'RSASSA-PKCS1-v1_5'},key,new TextEncoder().encode(unsigned));
  const assertion=`${unsigned}.${b64urlBytes(new Uint8Array(signature))}`;

  const res=await fetch('https://oauth2.googleapis.com/token',{
    method:'POST',
    headers:{'content-type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion})
  });
  const body=await res.json().catch(()=>({}));
  if(!res.ok || !body.access_token) throw new HttpError(502,body.error_description||'Could not authorize Google Sheets service account.');
  cachedAccessToken=body.access_token;
  cachedAccessTokenExp=now+Number(body.expires_in||3600);
  return cachedAccessToken;
}

async function importPrivateKey(pem){
  pem=pem.replace(/\\n/g,'\n').replace(/-----BEGIN PRIVATE KEY-----/g,'').replace(/-----END PRIVATE KEY-----/g,'').replace(/\s+/g,'');
  const bytes=Uint8Array.from(atob(pem),c=>c.charCodeAt(0));
  return crypto.subtle.importKey('pkcs8',bytes.buffer,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);
}

function b64url(text){ return b64urlBytes(new TextEncoder().encode(text)); }
function b64urlBytes(bytes){
  let binary=''; for(const b of bytes) binary+=String.fromCharCode(b);
  return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
