/* TURF static migration — Trials + historical Grid backend module
   Safe additive Worker module. Does not alter the live turftrials.com root.
   Source parity: current Code.gs V89.05 Trials inventory/records + V89.44 historical Grid bridge.
*/

const GRIDIRON_001 = [{"id":"tg001","name":"Conjuke","set":"The Gridiron","rarity":"common","subtitle":"Training Cone","speed":52,"burst":63,"consistency":61,"number":1,"total":24},{"id":"tg002","name":"Turfling","set":"The Gridiron","rarity":"common","subtitle":"Field Turf","speed":55,"burst":54,"consistency":53,"number":2,"total":24},{"id":"tg003","name":"Teezy","set":"The Gridiron","rarity":"common","subtitle":"Kicking Tee","speed":58,"burst":58,"consistency":58,"number":3,"total":24},{"id":"tg004","name":"Towelow","set":"The Gridiron","rarity":"common","subtitle":"Sideline Towel","speed":61,"burst":62,"consistency":63,"number":4,"total":24},{"id":"tg005","name":"Hashling","set":"The Gridiron","rarity":"common","subtitle":"Hash Mark","speed":64,"burst":53,"consistency":55,"number":5,"total":24},{"id":"tg006","name":"Cleatle","set":"The Gridiron","rarity":"uncommon","subtitle":"Game Cleat","speed":62,"burst":65,"consistency":68,"number":6,"total":24},{"id":"tg007","name":"Flagoon","set":"The Gridiron","rarity":"uncommon","subtitle":"Penalty Flag","speed":65,"burst":69,"consistency":60,"number":7,"total":24},{"id":"tg008","name":"Downster","set":"The Gridiron","rarity":"uncommon","subtitle":"Down Marker","speed":68,"burst":60,"consistency":65,"number":8,"total":24},{"id":"tg009","name":"Chaynk","set":"The Gridiron","rarity":"uncommon","subtitle":"Chain Crew","speed":71,"burst":64,"consistency":70,"number":9,"total":24},{"id":"tg010","name":"Glovolt","set":"The Gridiron","rarity":"uncommon","subtitle":"Receiver Glove","speed":60,"burst":71,"consistency":69,"number":10,"total":24},{"id":"tg011","name":"Footsu","set":"The Gridiron","rarity":"uncommon","subtitle":"The Spiral Sensei","speed":71,"burst":70,"consistency":69,"number":11,"total":24},{"id":"tg012","name":"Pylonix","set":"The Gridiron","rarity":"uncommon","subtitle":"End Zone Guardian","speed":74,"burst":74,"consistency":74,"number":12,"total":24},{"id":"tg013","name":"Visorcore","set":"The Gridiron","rarity":"uncommon","subtitle":"Lights Out Vision","speed":77,"burst":78,"consistency":79,"number":13,"total":24},{"id":"tg014","name":"Snapjaw","set":"The Gridiron","rarity":"uncommon","subtitle":"Gridiron Snapper","speed":80,"burst":69,"consistency":71,"number":14,"total":24},{"id":"tg015","name":"Endzonian","set":"The Gridiron","rarity":"rare","subtitle":"Celebration Spirit","speed":70,"burst":73,"consistency":76,"number":15,"total":24},{"id":"tg016","name":"Goalem","set":"The Gridiron","rarity":"epic","subtitle":"The Upright Guardian","speed":81,"burst":85,"consistency":76,"number":16,"total":24},{"id":"tg017","name":"Helmutt","set":"The Gridiron","rarity":"epic","subtitle":"The Friendly Wall","speed":84,"burst":76,"consistency":81,"number":17,"total":24},{"id":"tg018","name":"Turfquake","set":"The Gridiron","rarity":"epic","subtitle":"Field Breaker","speed":87,"burst":80,"consistency":86,"number":18,"total":24},{"id":"tg019","name":"Stadion","set":"The Gridiron","rarity":"legendary","subtitle":"Awakened Arena","speed":84,"burst":94,"consistency":85,"number":19,"total":24},{"id":"tg020","name":"The Gridiron","set":"The Gridiron","rarity":"obsidian","subtitle":"Midnight Field","speed":91,"burst":90,"consistency":90,"number":20,"total":24},{"id":"tg021","name":"Pylonix — Goal Line Inferno","set":"The Gridiron","rarity":"signature","subtitle":"Goal Line Inferno","speed":97,"burst":97,"consistency":97,"number":21,"total":24},{"id":"tg022","name":"Visorcore — Lights Out","set":"The Gridiron","rarity":"signature","subtitle":"Lights Out","speed":99,"burst":99,"consistency":99,"number":22,"total":24},{"id":"tg023","name":"Stadion — Sunday Awakening","set":"The Gridiron","rarity":"signature","subtitle":"Sunday Awakening","speed":99,"burst":94,"consistency":94,"number":23,"total":24},{"id":"tg024","name":"Footsu — Perfect Spiral","set":"The Gridiron","rarity":"signature","subtitle":"Perfect Spiral","speed":99,"burst":99,"consistency":99,"number":24,"total":24}];
const SIDELINE_002 = [{"id":"ts002-001","set":"The Sideline","number":1,"total":40,"name":"Conehead Cal","subtitle":"Training Cone","rarity":"common","speed":58,"burst":50,"consistency":52},{"id":"ts002-002","set":"The Sideline","number":2,"total":40,"name":"Whistle Wit","subtitle":"Sideline Whistle","rarity":"common","speed":55,"burst":40,"consistency":61},{"id":"ts002-003","set":"The Sideline","number":3,"total":40,"name":"Towel Snap","subtitle":"Rally Towel","rarity":"common","speed":55,"burst":48,"consistency":55},{"id":"ts002-004","set":"The Sideline","number":4,"total":40,"name":"Clip Kip","subtitle":"Clipboard","rarity":"common","speed":55,"burst":42,"consistency":57},{"id":"ts002-005","set":"The Sideline","number":5,"total":40,"name":"Bench Bro","subtitle":"Sideline Bench","rarity":"common","speed":56,"burst":60,"consistency":45},{"id":"ts002-006","set":"The Sideline","number":6,"total":40,"name":"Cup Stack Jack","subtitle":"Drink Cups","rarity":"common","speed":52,"burst":45,"consistency":45},{"id":"ts002-007","set":"The Sideline","number":7,"total":40,"name":"Tape Roll Tony","subtitle":"Athletic Tape","rarity":"common","speed":53,"burst":50,"consistency":50},{"id":"ts002-008","set":"The Sideline","number":8,"total":40,"name":"Lace Ace","subtitle":"Cleat Laces","rarity":"common","speed":51,"burst":40,"consistency":52},{"id":"ts002-009","set":"The Sideline","number":9,"total":40,"name":"Ball Pump Paul","subtitle":"Ball Pump","rarity":"common","speed":50,"burst":45,"consistency":48},{"id":"ts002-010","set":"The Sideline","number":10,"total":40,"name":"Waterboy Wally","subtitle":"Water Bottle","rarity":"common","speed":52,"burst":48,"consistency":47},{"id":"ts002-011","set":"The Sideline","number":11,"total":40,"name":"Glove Guy","subtitle":"Extra Gloves","rarity":"common","speed":50,"burst":44,"consistency":46},{"id":"ts002-012","set":"The Sideline","number":12,"total":40,"name":"Gator Gulp","subtitle":"Sideline Cooler Jug","rarity":"common","speed":53,"burst":48,"consistency":46},{"id":"ts002-013","set":"The Sideline","number":13,"total":40,"name":"Chalk Chuck","subtitle":"Coach's Chalk","rarity":"common","speed":51,"burst":40,"consistency":54},{"id":"ts002-014","set":"The Sideline","number":14,"total":40,"name":"Sticky Stan","subtitle":"Sticky Note","rarity":"common","speed":50,"burst":42,"consistency":58},{"id":"ts002-015","set":"The Sideline","number":15,"total":40,"name":"Headset Hank","subtitle":"Coach Headset","rarity":"uncommon","speed":62,"burst":45,"consistency":62},{"id":"ts002-016","set":"The Sideline","number":16,"total":40,"name":"Net Ripper","subtitle":"Kicking Net","rarity":"uncommon","speed":60,"burst":65,"consistency":38},{"id":"ts002-017","set":"The Sideline","number":17,"total":40,"name":"Strapzap","subtitle":"Play-Call Wristband","rarity":"uncommon","speed":62,"burst":50,"consistency":60},{"id":"ts002-018","set":"The Sideline","number":18,"total":40,"name":"Chilly Willy","subtitle":"Ice Pack","rarity":"uncommon","speed":58,"burst":60,"consistency":45},{"id":"ts002-019","set":"The Sideline","number":19,"total":40,"name":"Megaphone Moe","subtitle":"Sideline Megaphone","rarity":"uncommon","speed":58,"burst":45,"consistency":60},{"id":"ts002-020","set":"The Sideline","number":20,"total":40,"name":"Marker Mike","subtitle":"Yard Marker","rarity":"uncommon","speed":60,"burst":60,"consistency":42},{"id":"ts002-021","set":"The Sideline","number":21,"total":40,"name":"Downs Dash","subtitle":"Down Indicator","rarity":"uncommon","speed":57,"burst":60,"consistency":44},{"id":"ts002-022","set":"The Sideline","number":22,"total":40,"name":"Cable Carl","subtitle":"Sideline Cable","rarity":"uncommon","speed":55,"burst":45,"consistency":48},{"id":"ts002-023","set":"The Sideline","number":23,"total":40,"name":"Playcard Pete","subtitle":"Play-Call Card","rarity":"uncommon","speed":59,"burst":44,"consistency":60},{"id":"ts002-024","set":"The Sideline","number":24,"total":40,"name":"Chain Gang Chief","subtitle":"First-Down Chains","rarity":"rare","speed":68,"burst":65,"consistency":55},{"id":"ts002-025","set":"The Sideline","number":25,"total":40,"name":"Flagger Flash","subtitle":"Challenge Flag","rarity":"rare","speed":65,"burst":45,"consistency":63},{"id":"ts002-026","set":"The Sideline","number":26,"total":40,"name":"Cooler Crusher","subtitle":"Sideline Cooler","rarity":"rare","speed":72,"burst":70,"consistency":50},{"id":"ts002-027","set":"The Sideline","number":27,"total":40,"name":"Tablet Titan","subtitle":"Replay Tablet","rarity":"rare","speed":66,"burst":45,"consistency":70},{"id":"ts002-028","set":"The Sideline","number":28,"total":40,"name":"Equip Master","subtitle":"Equipment Manager","rarity":"rare","speed":64,"burst":60,"consistency":55},{"id":"ts002-029","set":"The Sideline","number":29,"total":40,"name":"Clock Commander","subtitle":"Game Clock","rarity":"rare","speed":66,"burst":55,"consistency":58},{"id":"ts002-030","set":"The Sideline","number":30,"total":40,"name":"Coach Circuit","subtitle":"Tactical Coach Tech","rarity":"epic","speed":75,"burst":50,"consistency":75},{"id":"ts002-031","set":"The Sideline","number":31,"total":40,"name":"Cartwheel","subtitle":"Medical Cart","rarity":"epic","speed":72,"burst":70,"consistency":55},{"id":"ts002-032","set":"The Sideline","number":32,"total":40,"name":"Playcall Phantom","subtitle":"Living Play Sheet","rarity":"epic","speed":75,"burst":45,"consistency":75},{"id":"ts002-033","set":"The Sideline","number":33,"total":40,"name":"Signal Boost","subtitle":"Communication Booster","rarity":"epic","speed":70,"burst":50,"consistency":72},{"id":"ts002-034","set":"The Sideline","number":34,"total":40,"name":"Hydration Hero","subtitle":"Recovery Station","rarity":"epic","speed":72,"burst":70,"consistency":55},{"id":"ts002-035","set":"The Sideline","number":35,"total":40,"name":"Signal Storm","subtitle":"Command System","rarity":"legendary","speed":82,"burst":60,"consistency":80},{"id":"ts002-036","set":"The Sideline","number":36,"total":40,"name":"First Down King","subtitle":"Down Marker Titan","rarity":"legendary","speed":85,"burst":75,"consistency":65},{"id":"ts002-037","set":"The Sideline","number":37,"total":40,"name":"Sideline Oracle","subtitle":"Prediction Board","rarity":"legendary","speed":80,"burst":50,"consistency":88},{"id":"ts002-038","set":"The Sideline","number":38,"total":40,"name":"Cooler Colossus","subtitle":"Legendary Cooler","rarity":"obsidian","speed":92,"burst":92,"consistency":70},{"id":"ts002-039","set":"The Sideline","number":39,"total":40,"name":"Sideline Singularity","subtitle":"The Entire Sideline","rarity":"obsidian","speed":94,"burst":88,"consistency":90},{"id":"ts002-040","set":"The Sideline","number":40,"total":40,"name":"Coach Circuit — Signature","subtitle":"Signature Edition","rarity":"signature","speed":95,"burst":65,"consistency":95}];
const CARD_CATALOG = [...GRIDIRON_001, ...SIDELINE_002];
const GRID_FIRST_YEAR = 1920;
const GRID_LAST_YEAR = 2026;

export async function handleTrialsGridRpc(method,args,env) {
  switch(String(method||'')) {
    case 'turfV8905TrialInventory': return trialInventory(String(args?.[0]||''),env);
    case 'turfV8944GridSearch': return historicalGridSearch(String(args?.[0]||''),env);
    case 'turfV8944GridIndexStatus': return historicalGridIndexStatus(env);
    default: return null;
  }
}

export async function handleTrialsHttp(request,env) {
  const url=new URL(request.url);
  if(!url.pathname.startsWith('/trials/')) return null;
  const cors=trialCors(request,env);
  if(request.method==='OPTIONS') return new Response(null,{status:204,headers:cors});
  try {
    if(url.pathname==='/trials/inventory' && request.method==='GET') {
      const out=await trialInventory(url.searchParams.get('token')||'',env);
      return json(out,200,cors);
    }
    if(url.pathname==='/trials/records' && request.method==='GET') {
      const rows=await trialWorldRecords(url.searchParams.get('trial')||'40yard',env);
      return json({ok:true,rows},200,cors);
    }
    if(url.pathname==='/trials/records' && request.method==='POST') {
      const body=await request.json().catch(()=>({}));
      const out=await submitTrialRecord(body||{},env);
      return json(out,200,cors);
    }
    return json({ok:false,error:'Not found.'},404,cors);
  } catch(err) {
    return json({ok:false,error:safeError(err),rows:[]},err?.status||500,cors);
  }
}

export async function handleGridAdmin(request,env) {
  const url=new URL(request.url);
  if(url.pathname!=='/admin/grid-index/build') return null;
  const cors=trialCors(request,env);
  if(request.method==='OPTIONS') return new Response(null,{status:204,headers:cors});
  try {
    const key=request.headers.get('x-turf-admin-key')||'';
    if(!env.TURF_MIGRATION_ADMIN_KEY || key!==String(env.TURF_MIGRATION_ADMIN_KEY)) throw new HttpError(403,'Admin key required.');
    if(request.method!=='POST') throw new HttpError(405,'POST required.');
    const body=await request.json().catch(()=>({}));
    const out=await buildHistoricalGridIndexChunk(body.maxYears,env);
    return json(out,200,cors);
  } catch(err) {
    return json({ok:false,error:safeError(err)},err?.status||500,cors);
  }
}

async function trialInventory(rawToken,env) {
  const token=cleanToken(rawToken);
  const rows=await sheetValues(env,`${accountsSheet(env)}!A2:W`);
  const row=rows.find(r=>String(r[0]||'')===token);
  if(!row) throw new HttpError(404,'TURF account not found.');
  const owned=parseJsonArray(row[21]);
  const ownedSet=new Set(owned.map(String));
  const cards=CARD_CATALOG.filter(c=>ownedSet.has(String(c.id))).map(trialCard).filter(Boolean)
    .sort((a,b)=>a.set.localeCompare(b.set)||Number(a.index)-Number(b.index));
  return {ok:true,username:String(row[1]||'TURF Player'),cards};
}

function trialCard(c) {
  if(!c) return null;
  const id=String(c.id||'');
  const is001=/^tg\d{3}$/.test(id), is002=/^ts002-\d{3}$/.test(id);
  const index=is001?Number(id.slice(2)):Number(c.number||0);
  const total=is001?24:Number(c.total||40);
  const preview=is001
    ? `https://footballhq.github.io/footballhq-assets/v88-36/cards/001/${String(index).padStart(3,'0')}.png?v=8905`
    : `https://footballhq.github.io/footballhq-assets/v88-36/cards/002/${id}.png?v=8905`;
  const art=is001
    ? `https://footballhq.github.io/footballhq-assets/v88-36/cards/art/${id}.webp?v=8836fix58`
    : preview;
  return {
    id,name:String(c.name||id),subtitle:String(c.subtitle||''),set:String(c.set||''),rarity:String(c.rarity||'common'),
    index,total,speed:Number(c.speed||55),burst:Number(c.burst||55),consistency:Number(c.consistency||55),preview,art
  };
}

async function trialWorldRecords(rawTrial,env) {
  const trial=cleanText(rawTrial||'40yard',32);
  await ensureSheet(env,trialSheet(env),['PlayerId','Player','Trial','Time','Character','Taps','UpdatedAt','CreatedAt']);
  const rows=await sheetValues(env,`${trialSheet(env)}!A2:H`);
  return rows.filter(r=>String(r[2]||'')===trial).map(r=>({
    playerId:String(r[0]||''),player:String(r[1]||'TURF Player'),trial:String(r[2]||''),time:Number(r[3]),
    character:String(r[4]||''),taps:Number(r[5]||0),updatedAt:String(r[6]||'')
  })).filter(r=>Number.isFinite(r.time)&&r.time>=4&&r.time<=8)
    .sort((a,b)=>a.time-b.time||b.taps-a.taps).slice(0,25);
}

async function submitTrialRecord(params,env) {
  const trial=cleanText(params.trial||'40yard',32);
  const playerId=cleanText(params.playerId,80);
  const player=cleanText(params.player||'TURF Player',40)||'TURF Player';
  const character=cleanText(params.character,40);
  const time=Number(params.time), taps=Math.max(0,Math.min(500,Math.round(Number(params.taps)||0)));
  if(!playerId || playerId.length<6) throw new HttpError(400,'Invalid Trials player id.');
  if(!Number.isFinite(time)||time<4||time>8) throw new HttpError(400,'Invalid 40-yard time.');
  await ensureSheet(env,trialSheet(env),['PlayerId','Player','Trial','Time','Character','Taps','UpdatedAt','CreatedAt']);
  const rows=await sheetValues(env,`${trialSheet(env)}!A2:H`);
  const i=rows.findIndex(r=>String(r[0]||'')===playerId&&String(r[2]||'')===trial);
  const now=new Date().toISOString();
  if(i>=0) {
    const old=Number(rows[i][3]);
    if(!Number.isFinite(old)||time<old) await updateRange(env,`${trialSheet(env)}!B${i+2}:G${i+2}`,[[player,trial,time,character,taps,now]]);
  } else {
    await appendValues(env,`${trialSheet(env)}!A:H`,[[playerId,player,trial,time,character,taps,now,now]]);
  }
  return {ok:true,submittedTime:time,rows:await trialWorldRecords(trial,env)};
}

async function historicalGridSearch(rawQuery,env) {
  const query=norm(rawQuery);
  if(query.length<2) return {ok:true,players:[]};
  await ensureSheet(env,gridSheet(env),['Prefix','Name','Team','Position','FirstYear']);
  const rows=await sheetValues(env,`${gridSheet(env)}!A2:E`);
  const map=new Map();
  for(const r of rows) {
    const prefix=String(r[0]||''), name=String(r[1]||''), team=String(r[2]||''), pos=String(r[3]||'');
    if(prefix!==query.slice(0,2) || !norm(name).startsWith(query)) continue;
    const key=norm(name);
    if(!map.has(key)) map.set(key,{name,teams:[],positions:[]});
    const x=map.get(key);
    if(team&&!x.teams.includes(team)) x.teams.push(team);
    if(pos&&!x.positions.includes(pos)) x.positions.push(pos);
    if(map.size>=40) break;
  }
  return {ok:true,players:[...map.values()].slice(0,40)};
}

async function historicalGridIndexStatus(env) {
  await ensureSheet(env,gridMetaSheet(env),['Key','Value','UpdatedAt']);
  const rows=await sheetValues(env,`${gridMetaSheet(env)}!A2:C`);
  const r=rows.find(x=>String(x[0]||'')==='cursor');
  const nextYear=Number(r?.[1]||GRID_FIRST_YEAR);
  return {ok:true,nextYear,done:nextYear>GRID_LAST_YEAR};
}

async function buildHistoricalGridIndexChunk(maxYears,env) {
  maxYears=Math.max(1,Math.min(Number(maxYears)||6,10));
  await ensureSheet(env,gridSheet(env),['Prefix','Name','Team','Position','FirstYear']);
  await ensureSheet(env,gridMetaSheet(env),['Key','Value','UpdatedAt']);
  const status=await historicalGridIndexStatus(env);
  let cursor=Number(status.nextYear||GRID_FIRST_YEAR);
  if(cursor>GRID_LAST_YEAR) return {ok:true,done:true,next:null,processed:[]};
  const existing=await sheetValues(env,`${gridSheet(env)}!A2:E`);
  const seen=new Set(existing.map(r=>`${norm(r[1])}|${String(r[2]||'').toUpperCase()}|${String(r[3]||'').toUpperCase()}`));
  const append=[], processed=[];
  for(let y=cursor;y<=GRID_LAST_YEAR&&processed.length<maxYears;y++) {
    const url=`https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_${y}.csv`;
    try {
      const res=await fetch(url,{redirect:'follow',headers:{'user-agent':'TURF historical-grid migration'}});
      if(!res.ok) { processed.push({year:y,ok:false,http:res.status}); continue; }
      const rows=parseCsv(await res.text());
      if(rows.length<2) { processed.push({year:y,ok:false}); continue; }
      const head=rows[0].map(x=>String(x||'').trim().toLowerCase());
      const col=names=>names.map(n=>head.indexOf(n)).find(i=>i>=0)??-1;
      const nameCol=col(['full_name','player_name','name']), teamCol=col(['team','team_abbr','team_abbreviation']), posCol=col(['position','pos']);
      if(nameCol<0||teamCol<0) { processed.push({year:y,ok:false,error:'columns'}); continue; }
      for(let i=1;i<rows.length;i++) {
        const name=String(rows[i][nameCol]||'').trim(),team=String(rows[i][teamCol]||'').trim(),pos=posCol>=0?String(rows[i][posCol]||'').trim():'';
        if(!name||!team) continue;
        const n=norm(name); if(!n) continue;
        const k=`${n}|${team.toUpperCase()}|${pos.toUpperCase()}`;
        if(seen.has(k)) continue;
        seen.add(k); append.push([n.slice(0,2)||'__',name,team,pos,y]);
      }
      processed.push({year:y,ok:true});
    } catch(err) { processed.push({year:y,ok:false,error:safeError(err)}); }
  }
  if(append.length) await appendValues(env,`${gridSheet(env)}!A:E`,append);
  const next=cursor+processed.length;
  await setMeta(env,'cursor',String(next));
  return {ok:true,done:next>GRID_LAST_YEAR,next,processed,added:append.length};
}

async function setMeta(env,key,value) {
  const rows=await sheetValues(env,`${gridMetaSheet(env)}!A2:C`);
  const i=rows.findIndex(r=>String(r[0]||'')===key);
  const now=new Date().toISOString();
  if(i>=0) await updateRange(env,`${gridMetaSheet(env)}!A${i+2}:C${i+2}`,[[key,value,now]]);
  else await appendValues(env,`${gridMetaSheet(env)}!A:C`,[[key,value,now]]);
}

function parseCsv(text) {
  const rows=[]; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++) {
    const ch=text[i];
    if(quoted) {
      if(ch==='"'&&text[i+1]==='"') {cell+='"';i++;}
      else if(ch==='"') quoted=false; else cell+=ch;
    } else if(ch==='"') quoted=true;
    else if(ch===',') {row.push(cell);cell='';}
    else if(ch==='\n') {row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}
    else cell+=ch;
  }
  if(cell||row.length) {row.push(cell.replace(/\r$/,''));rows.push(row);}
  return rows;
}

function norm(v) {return String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function cleanText(v,maxLen) {return String(v||'').replace(/[<>]/g,'').trim().slice(0,Number(maxLen)||80);}
function cleanToken(v) {const t=String(v||'').trim();if(!t||t.length<8||t.length>120)throw new HttpError(400,'Invalid account token.');return t;}
function parseJsonArray(v) {try{const x=JSON.parse(String(v||'[]'));return Array.isArray(x)?x:[];}catch{return [];}}
function safeError(err) {return String(err?.message||err||'TURF backend error.').slice(0,400);}
class HttpError extends Error {constructor(status,message){super(message);this.status=status;}}
function json(v,status,headers) {return new Response(JSON.stringify(v),{status,headers});}
function accountsSheet(env) {return String(env.ACCOUNTS_SHEET||'FootballHQ_Accounts');}
function trialSheet(env) {return String(env.TRIAL_RECORDS_SHEET||'TURF_TrialRecords');}
function gridSheet(env) {return String(env.GRID_INDEX_SHEET||'TURF_HistoricalGridIndex');}
function gridMetaSheet(env) {return String(env.GRID_META_SHEET||'TURF_HistoricalGridMeta');}
function allowedOrigins(env) {return new Set(String(env.ALLOWED_ORIGINS||'https://turftrials.com').split(',').map(v=>v.trim()).filter(Boolean));}
function trialCors(request,env) {const origin=request.headers.get('Origin')||'';const h={'content-type':'application/json; charset=utf-8','cache-control':'no-store','vary':'Origin','access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'content-type,x-turf-admin-key'};if(origin&&allowedOrigins(env).has(origin))h['access-control-allow-origin']=origin;return h;}

async function ensureSheet(env,title,headers) {
  const token=await serviceAccountAccessToken(env);
  const metaUrl=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}?fields=sheets.properties.title`;
  const metaRes=await fetch(metaUrl,{headers:{authorization:`Bearer ${token}`}});
  const meta=await metaRes.json().catch(()=>({}));
  if(!metaRes.ok) throw new HttpError(502,meta?.error?.message||'Google Sheets metadata read failed.');
  if(!(meta.sheets||[]).some(s=>s?.properties?.title===title)) {
    const u=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}:batchUpdate`;
    const r=await fetch(u,{method:'POST',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify({requests:[{addSheet:{properties:{title}}}]})});
    const b=await r.json().catch(()=>({}));if(!r.ok)throw new HttpError(502,b?.error?.message||'Could not create TURF sheet.');
  }
  const first=await sheetValues(env,`${title}!A1:${colLetter(headers.length)}1`);
  if(!first.length||headers.some((h,i)=>String(first[0]?.[i]||'')!==h)) await updateRange(env,`${title}!A1:${colLetter(headers.length)}1`,[headers]);
}
function colLetter(n) {let s='';while(n>0){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s;}

async function sheetValues(env,range) {
  const token=await serviceAccountAccessToken(env);
  const url=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}/values/${encodeURIComponent(range)}?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`;
  const res=await fetch(url,{headers:{authorization:`Bearer ${token}`}});const body=await res.json().catch(()=>({}));
  if(!res.ok) throw new HttpError(502,body?.error?.message||'Google Sheets read failed.');return Array.isArray(body.values)?body.values:[];
}
async function appendValues(env,range,values) {
  const token=await serviceAccountAccessToken(env);
  const url=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res=await fetch(url,{method:'POST',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify({majorDimension:'ROWS',values})});const body=await res.json().catch(()=>({}));
  if(!res.ok) throw new HttpError(502,body?.error?.message||'Google Sheets append failed.');return body;
}
async function updateRange(env,range,values) {
  const token=await serviceAccountAccessToken(env);
  const url=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.TURF_SPREADSHEET_ID)}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res=await fetch(url,{method:'PUT',headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},body:JSON.stringify({majorDimension:'ROWS',values})});const body=await res.json().catch(()=>({}));
  if(!res.ok) throw new HttpError(502,body?.error?.message||'Google Sheets update failed.');return body;
}
let cachedAccessToken=null,cachedAccessTokenExp=0;
async function serviceAccountAccessToken(env) {
  const now=Math.floor(Date.now()/1000);if(cachedAccessToken&&cachedAccessTokenExp>now+60)return cachedAccessToken;
  const header=b64url(JSON.stringify({alg:'RS256',typ:'JWT'}));const claim=b64url(JSON.stringify({iss:String(env.GOOGLE_SERVICE_ACCOUNT_EMAIL),scope:'https://www.googleapis.com/auth/spreadsheets',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600}));
  const unsigned=`${header}.${claim}`,key=await importPrivateKey(String(env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY));
  const signature=await crypto.subtle.sign({name:'RSASSA-PKCS1-v1_5'},key,new TextEncoder().encode(unsigned));const assertion=`${unsigned}.${b64urlBytes(new Uint8Array(signature))}`;
  const res=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion})});const body=await res.json().catch(()=>({}));
  if(!res.ok||!body.access_token)throw new HttpError(502,body.error_description||'Could not authorize Google Sheets service account.');cachedAccessToken=body.access_token;cachedAccessTokenExp=now+Number(body.expires_in||3600);return cachedAccessToken;
}
async function importPrivateKey(pem) {pem=pem.replace(/\\n/g,'\n').replace(/-----BEGIN PRIVATE KEY-----/g,'').replace(/-----END PRIVATE KEY-----/g,'').replace(/\s+/g,'');const bytes=Uint8Array.from(atob(pem),c=>c.charCodeAt(0));return crypto.subtle.importKey('pkcs8',bytes.buffer,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);}
function b64url(text) {return b64urlBytes(new TextEncoder().encode(text));}
function b64urlBytes(bytes) {let binary='';for(const b of bytes)binary+=String.fromCharCode(b);return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
