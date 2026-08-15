/* ============================================================
   FOOTBALL HQ V88.55 — SET 002: THE SIDELINE
   Frontend additive patch
   GitHub path: v88-36/js/34-fhq-set002-sideline-v8855.js
   - Registers all 40 Set 002 cards client-side
   - Gives Set 002 portrait card assets immediately (safe SVG fallback)
   - Rarity values flow into the existing approved reveal animations
   - Rebuilds Collections so 001 + 002 both OPEN reliably
   - Does NOT change pack/shop purchase behavior
   ============================================================ */
(function(){
'use strict';
if(window.__FHQ_V8855_SET002__)return;
window.__FHQ_V8855_SET002__=true;

const SET='The Sideline';
const CARDS=[
['ts002-001',1,'Conehead Cal','Training Cone','common','Always in position. Never overlooked.',58,50,52,48],
['ts002-002',2,'Whistle Wit','Sideline Whistle','common','One blast and everybody listens.',55,40,61,46],
['ts002-003',3,'Towel Snap','Rally Towel','common','Wave it. Wear it. Never quit.',55,48,55,56],
['ts002-004',4,'Clip Kip','Clipboard','common','Every great plan needs somewhere to live.',55,42,57,44],
['ts002-005',5,'Bench Bro','Sideline Bench','common','Ready whenever the number gets called.',56,60,45,40],
['ts002-006',6,'Cup Stack Jack','Drink Cups','common','Hydration comes in layers.',52,45,45,50],
['ts002-007',7,'Tape Roll Tony','Athletic Tape','common','If it moves, tape it. If it hurts, tape it twice.',53,50,50,45],
['ts002-008',8,'Lace Ace','Cleat Laces','common','Tied tight when the game gets loose.',51,40,52,46],
['ts002-009',9,'Ball Pump Paul','Ball Pump','common','Pressure is literally the job.',50,45,48,43],
['ts002-010',10,'Waterboy Wally','Water Bottle','common','Every drive starts with a refill.',52,48,47,50],
['ts002-011',11,'Glove Guy','Extra Gloves','common','Grip now. Questions later.',50,44,46,43],
['ts002-012',12,'Gator Gulp','Sideline Cooler Jug','common','Cold, loaded, and always ready.',53,48,46,49],
['ts002-013',13,'Chalk Chuck',"Coach's Chalk",'common','Draw it up. Wipe it off. Draw it better.',51,40,54,41],
['ts002-014',14,'Sticky Stan','Sticky Note','common','Small note. Big reminder.',50,42,58,45],
['ts002-015',15,'Headset Hank','Coach Headset','uncommon','The play starts before the snap.',62,45,62,55],
['ts002-016',16,'Net Ripper','Kicking Net','uncommon','Kick it here if you dare.',60,65,38,42],
['ts002-017',17,'Strapzap','Play-Call Wristband','uncommon','The whole playbook on one wrist.',62,50,60,50],
['ts002-018',18,'Chilly Willy','Ice Pack','uncommon','Ice fixes everything. Eventually.',58,60,45,48],
['ts002-019',19,'Megaphone Moe','Sideline Megaphone','uncommon','Volume is a strategy.',58,45,60,56],
['ts002-020',20,'Marker Mike','Yard Marker','uncommon','Every yard has to answer to somebody.',60,60,42,46],
['ts002-021',21,'Downs Dash','Down Indicator','uncommon','One number closer to six.',57,60,44,46],
['ts002-022',22,'Cable Carl','Sideline Cable','uncommon','Keeping the whole sideline connected.',55,45,48,44],
['ts002-023',23,'Playcard Pete','Play-Call Card','uncommon','He already knows the next call.',59,44,60,53],
['ts002-024',24,'Chain Gang Chief','First-Down Chains','rare','Ten yards. No negotiations.',68,65,55,58],
['ts002-025',25,'Flagger Flash','Challenge Flag','rare',"Throw me when you know you're right.",65,45,63,56],
['ts002-026',26,'Cooler Crusher','Sideline Cooler','rare','Built cold. Hits heavy.',72,70,50,55],
['ts002-027',27,'Tablet Titan','Replay Tablet','rare','Replay everything. Forget nothing.',66,45,70,60],
['ts002-028',28,'Equip Master','Equipment Manager','rare','If they need it, he already packed it.',64,60,55,58],
['ts002-029',29,'Clock Commander','Game Clock','rare','Everybody answers to the clock.',66,55,58,54],
['ts002-030',30,'Coach Circuit','Tactical Coach Tech','epic','Thinking three plays ahead.',75,50,75,65],
['ts002-031',31,'Cartwheel','Medical Cart','epic','When somebody goes down, he rolls in.',72,70,55,60],
['ts002-032',32,'Playcall Phantom','Living Play Sheet','epic','The defense never sees him coming.',75,45,75,65],
['ts002-033',33,'Signal Boost','Communication Booster','epic','No static. No excuses.',70,50,72,60],
['ts002-034',34,'Hydration Hero','Recovery Station','epic','Recovery wins the fourth quarter.',72,70,55,62],
['ts002-035',35,'Signal Storm','Command System','legendary','Every voice on the sideline runs through him.',82,60,80,70],
['ts002-036',36,'First Down King','Down Marker Titan','legendary','Move the chains. Bow to the marker.',85,75,65,70],
['ts002-037',37,'Sideline Supreme','Bench General','legendary',"He doesn't enter the game. He controls it.",83,75,70,75],
['ts002-038',38,'Momentum Meter','Energy Engine','legendary','Once the needle moves, good luck stopping it.',80,65,78,70],
['ts002-039',39,'The Command Center','Dark Ops Sideline HQ','obsidian','Every signal. Every screen. Every decision.',90,70,99,80],
['ts002-040',40,'Coach Circuit — Signature','Signature Edition','signature','The perfect call leaves a mark.',95,65,95,90]
].map(x=>({id:x[0],set:SET,setCode:'002',number:x[1],total:40,name:x[2],subtitle:x[3],rarity:x[4],flavor:x[5],stats:{spd:x[6],str:x[7],iq:x[8],cha:x[9]}}));
window.FHQ_SET002_SIDELINE_CARDS=CARDS;

const SET_META={
 'The Gridiron':{code:'001',label:'001 — THE GRIDIRON',copy:'The field itself comes alive under stadium lights.',accent:'#53c9f5',accent2:'#a9eaff'},
 'The Sideline':{code:'002',label:'002 — THE SIDELINE',copy:'Tactical. Smart. Scrappy. The coaches, equipment and organized chaos beyond the white stripe.',accent:'#d8ff49',accent2:'#f4d255'}
};

function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function pad(n){return String(Number(n)||0).padStart(3,'0')}
function palette(r){return {
 common:['#707b82','#171d21','#cbd2d6','#8e989e'],
 uncommon:['#28d59a','#0b352c','#a8ffe1','#4cf1b2'],
 rare:['#2297f2','#082c52','#9bdaff','#48a8ff'],
 epic:['#873dff','#25104e','#e1b7ff','#aa6cff'],
 legendary:['#f0b21d','#382807','#fff0a1','#ffcf4e'],
 obsidian:['#6f36ff','#07060d','#d6c7ff','#b36dff'],
 signature:['#e4ba55','#151719','#ffffff','#a7e9ff']
 }[r]||['#707b82','#171d21','#cbd2d6','#8e989e'];}

/* Portrait fallback art. These URLs can later be replaced 1:1 with the approved
   final PNG/JPG assets without touching IDs, packs, serials, or collection logic. */
function cardSVG(c){
 const p=palette(c.rarity), sig=c.rarity==='signature', obs=c.rarity==='obsidian', leg=c.rarity==='legendary';
 const rainbow=sig?'<defs><linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffd56b"/><stop offset=".28" stop-color="#fff"/><stop offset=".48" stop-color="#9cecff"/><stop offset=".64" stop-color="#e4b7ff"/><stop offset=".82" stop-color="#ffe07b"/><stop offset="1" stop-color="#bfc8ce"/></linearGradient></defs>':'';
 const border=sig?'url(#foil)':p[0];
 const effect=obs?'#7b3cff':leg?'#ffbf28':sig?'#d8f4ff':p[3];
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1040">${rainbow}
 <rect width="720" height="1040" rx="34" fill="#06090c"/>
 <rect x="13" y="13" width="694" height="1014" rx="28" fill="${p[1]}" stroke="${border}" stroke-width="12"/>
 <rect x="34" y="34" width="652" height="972" rx="20" fill="#0b1116" stroke="${p[2]}" stroke-opacity=".45" stroke-width="2"/>
 <g opacity=".34" fill="none" stroke="${effect}" stroke-width="5"><path d="M55 185C205 92 319 276 505 121"/><path d="M109 298C247 202 415 389 640 195"/><path d="M79 415h566M106 462h512" stroke-dasharray="20 15"/><circle cx="550" cy="265" r="72"/><path d="M498 265h104M550 213v104"/></g>
 <g transform="translate(360 444)"><circle r="192" fill="${effect}" opacity=".11"/><circle r="148" fill="#121a20" stroke="${effect}" stroke-width="9"/><path d="M-97 62C-73-60-42-127 0-127S72-60 98 62L75 130H-75Z" fill="${p[0]}"/><circle cy="-83" r="58" fill="${p[2]}" opacity=".78"/><path d="M-82-107Q0-179 82-107" fill="none" stroke="#101417" stroke-width="30" stroke-linecap="round"/><path d="M-76 10Q0-42 76 10" fill="none" stroke="${p[2]}" stroke-opacity=".55" stroke-width="10"/></g>
 <text x="58" y="91" fill="${p[2]}" font-family="Arial" font-size="24" font-weight="900">002 • THE SIDELINE</text>
 <text x="662" y="91" text-anchor="end" fill="${p[2]}" font-family="Arial" font-size="24" font-weight="900">${pad(c.number)}/040</text>
 <rect x="50" y="692" width="620" height="190" rx="18" fill="#070a0d" stroke="${border}" stroke-width="4"/>
 <text x="76" y="750" fill="#fff" font-family="Arial" font-size="42" font-weight="900">${esc(c.name)}</text>
 <text x="76" y="790" fill="${p[2]}" font-family="Arial" font-size="21" font-weight="800" letter-spacing="2">${esc(c.subtitle).toUpperCase()}</text>
 <text x="76" y="837" fill="#b6c1c7" font-family="Arial" font-size="18" font-style="italic">${esc(c.flavor)}</text>
 <g font-family="Arial" font-size="20" font-weight="900" fill="#eaf2f5"><text x="72" y="935">SPD ${c.stats.spd}</text><text x="220" y="935">STR ${c.stats.str}</text><text x="370" y="935">IQ ${c.stats.iq}</text><text x="500" y="935">CHA ${c.stats.cha}</text></g>
 <text x="658" y="986" text-anchor="end" fill="${border}" font-family="Arial" font-size="19" font-weight="900">${c.rarity.toUpperCase()} • FOOTBALL HQ</text>
 ${sig?'<path d="M121 866q90-75 175-5t165-10q75-55 139 2" fill="none" stroke="url(#foil)" stroke-width="8" opacity=".88"/>':''}
 </svg>`;
}
function dataUri(c){return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(cardSVG(c));}
function installImages(){
 window.FHQ_V85_CARD_IMAGES=window.FHQ_V85_CARD_IMAGES||{};
 CARDS.forEach(c=>{if(!window.FHQ_V85_CARD_IMAGES[c.id])window.FHQ_V85_CARD_IMAGES[c.id]=dataUri(c);});
}
function mergeArray(arr){if(!Array.isArray(arr))return;const ids=new Set(arr.map(c=>String(c&&c.id||'')));CARDS.forEach(c=>{if(!ids.has(c.id)){arr.push(c);ids.add(c.id)}});}
function installCatalog(){
 try{mergeArray(window.FHQ_CARD_CATALOG_FALLBACK)}catch(e){}
 try{mergeArray(window.__fhqCardCatalog)}catch(e){}
 try{if(typeof FHQ_CARD_CATALOG_FALLBACK!=='undefined')mergeArray(FHQ_CARD_CATALOG_FALLBACK)}catch(e){}
}
installImages();installCatalog();setTimeout(installImages,500);setTimeout(installCatalog,700);

function injectCSS(){if(document.getElementById('fhqV8855Set002Css'))return;const s=document.createElement('style');s.id='fhqV8855Set002Css';s.textContent=`
#fhqAlbumGrid .fhq-v8855-intro{margin:0 0 22px;padding:0 2px}.fhq-v8855-intro small{color:#75cfee;font-weight:1000;letter-spacing:2px}.fhq-v8855-intro h2{margin:6px 0;color:#f4f8fa;font-size:30px}.fhq-v8855-intro p{margin:0;color:#8597a1;font-size:12px}
#fhqAlbumGrid .fhq-v8855-library{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
#fhqAlbumGrid .fhq-v8855-cover{appearance:none;text-align:left;padding:0;overflow:hidden;border-radius:20px;border:1px solid #304a58;background:#0b151b;color:inherit;cursor:pointer;box-shadow:0 18px 50px rgba(0,0,0,.25);transition:.2s}
#fhqAlbumGrid .fhq-v8855-cover:hover{transform:translateY(-4px);border-color:#63c9ef}.fhq-v8855-coverArt{position:relative;height:245px;overflow:hidden;background:radial-gradient(circle at 76% 18%,var(--accent) 0,transparent 22%),linear-gradient(145deg,#122630,#071016 70%)}
.fhq-v8855-coverArt:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(125deg,transparent 0 70px,color-mix(in srgb,var(--accent) 18%,transparent) 72px 75px,transparent 77px 150px);opacity:.65}.fhq-v8855-field{position:absolute;left:-8%;right:-8%;bottom:-22%;height:60%;border:2px solid color-mix(in srgb,var(--accent) 45%,transparent);transform:perspective(500px) rotateX(56deg);background:repeating-linear-gradient(90deg,transparent 0 74px,color-mix(in srgb,var(--accent) 16%,transparent) 75px 77px)}
.fhq-v8855-coverLabel{position:absolute;inset:auto 24px 22px;z-index:2}.fhq-v8855-coverLabel small{display:block;color:var(--accent);font-size:10px;font-weight:1000;letter-spacing:2px}.fhq-v8855-coverLabel strong{display:block;margin-top:5px;color:#fff;font-size:31px}.fhq-v8855-coverBottom{padding:16px 18px 18px}.fhq-v8855-coverBottom p{min-height:34px;color:#8496a0;font-size:11px;line-height:1.5}.fhq-v8855-progress{height:7px;border-radius:99px;background:#18262e;overflow:hidden}.fhq-v8855-progress i{display:block;height:100%;background:linear-gradient(90deg,#44b9e7,var(--accent));}.fhq-v8855-coverStats{display:flex;justify-content:space-between;margin-top:9px;color:#94a7b2;font-size:10px;font-weight:900}.fhq-v8855-coverStats b{color:#e6f6fd}
#fhqAlbumGrid .fhq-v8855-detailHead{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:end;margin-bottom:18px}.fhq-v8855-back{grid-column:1/-1;width:max-content;border:1px solid #345465;background:#0e1b22;color:#d8f5ff;border-radius:9px;padding:9px 12px;font-weight:900;cursor:pointer}.fhq-v8855-detailHead h2{margin:0;color:#fff;font-size:34px}.fhq-v8855-detailHead p{margin:6px 0 0;color:#8497a2;max-width:690px}.fhq-v8855-bigProgress{text-align:right}.fhq-v8855-bigProgress strong{display:block;color:#fff;font-size:26px}.fhq-v8855-bigProgress span{color:#77d4f5;font-size:9px;font-weight:1000;letter-spacing:1.5px}
#fhqAlbumGrid .fhq-v8855-cardGrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:13px}.fhq-v8855-card{appearance:none;padding:0;border:0;background:transparent;aspect-ratio:720/1040;border-radius:13px;overflow:hidden;position:relative;cursor:pointer;box-shadow:0 13px 30px rgba(0,0,0,.28)}.fhq-v8855-card img{width:100%;height:100%;display:block;object-fit:contain;background:#05080a}.fhq-v8855-card.locked img{filter:grayscale(.9) brightness(.23)}.fhq-v8855-lock{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:#dce8ed;font-weight:1000;font-size:12px;letter-spacing:1px;background:linear-gradient(transparent,rgba(2,5,7,.44))}.fhq-v8855-lock small{display:block;color:#80919b;font-size:8px;margin-top:5px}
#fhqV8855CardModal{position:fixed;inset:0;z-index:500000;background:rgba(0,0,0,.88);display:none;place-items:center;padding:25px}#fhqV8855CardModal.open{display:grid}.fhq-v8855-modalShell{position:relative;width:min(92vw,460px)}.fhq-v8855-modalShell img{width:100%;display:block;border-radius:22px;box-shadow:0 40px 100px #000}.fhq-v8855-modalClose{position:absolute;right:-12px;top:-12px;width:40px;height:40px;border-radius:50%;background:#8f2020;border:2px solid #fff;color:#fff;font-size:24px;font-weight:900;z-index:2;cursor:pointer}
@media(max-width:900px){#fhqAlbumGrid .fhq-v8855-cardGrid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:650px){#fhqAlbumGrid .fhq-v8855-library{grid-template-columns:1fr}#fhqAlbumGrid .fhq-v8855-cardGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.fhq-v8855-coverArt{height:210px}.fhq-v8855-detailHead{grid-template-columns:1fr}.fhq-v8855-bigProgress{text-align:left}}
`;document.head.appendChild(s)}

let state=null,openSet='';
function normalizeState(x){
 x=x||state||{};const sets=Object.assign({},x.sets||{});
 if(!sets[SET]||!sets[SET].length)sets[SET]=CARDS.slice();
 else{const ids=new Set(sets[SET].map(c=>c.id));CARDS.forEach(c=>{if(!ids.has(c.id))sets[SET].push(c)});}
 /* Keep official set ordering stable. */
 Object.keys(sets).forEach(k=>sets[k].sort((a,b)=>(Number(a.number)||999)-(Number(b.number)||999)||String(a.id).localeCompare(String(b.id))));
 return Object.assign({},x,{sets:sets});
}
function artUrl(c){if(c&&window.FHQ_V85_CARD_IMAGES&&window.FHQ_V85_CARD_IMAGES[c.id])return window.FHQ_V85_CARD_IMAGES[c.id];return c&&c.set===SET?dataUri(c):'';}
function cardHTML(c,owned){const src=artUrl(c);return `<button type="button" class="fhq-v8855-card ${owned?'owned':'locked'}" data-v8855-card="${esc(c.id)}"><img src="${esc(src)}" alt="${esc(c.name)}">${owned?'':`<span class="fhq-v8855-lock"><span>LOCKED<small>${esc(String(c.rarity).toUpperCase())} • ${pad(c.number||0)}/${String(c.total||40).padStart(3,'0')}</small></span></span>`}</button>`}
function coverHTML(name,cards,owned){const m=SET_META[name]||{code:'HQ',label:name,copy:'Football HQ collection.',accent:'#56c6ed'},have=cards.filter(c=>owned.includes(c.id)).length,total=cards.length,pct=total?Math.round(have/total*100):0;return `<button class="fhq-v8855-cover" type="button" data-v8855-open-set="${esc(name)}" style="--accent:${m.accent}"><div class="fhq-v8855-coverArt"><div class="fhq-v8855-field"></div><div class="fhq-v8855-coverLabel"><small>FOOTBALL HQ COLLECTION • SET ${esc(m.code)}</small><strong>${esc(m.label||name)}</strong></div></div><div class="fhq-v8855-coverBottom"><p>${esc(m.copy)}</p><div class="fhq-v8855-progress"><i style="width:${pct}%"></i></div><div class="fhq-v8855-coverStats"><span>${have} / ${total} COLLECTED</span><b>${pct}%</b></div></div></button>`}
function render(x){
 injectCSS();installImages();installCatalog();state=normalizeState(x);const root=document.getElementById('fhqAlbumGrid');if(!root)return;const owned=Array.isArray(state.owned)?state.owned:[];const sets=state.sets||{};
 let names=Object.keys(sets);names.sort((a,b)=>{const oa=a==='The Gridiron'?1:a===SET?2:99,ob=b==='The Gridiron'?1:b===SET?2:99;return oa-ob||a.localeCompare(b)});
 if(openSet&&sets[openSet]){const cards=sets[openSet],m=SET_META[openSet]||{label:openSet,copy:'Football HQ collection.'},have=cards.filter(c=>owned.includes(c.id)).length,pct=cards.length?Math.round(have/cards.length*100):0;root.innerHTML=`<div class="fhq-v8855-detailHead"><button class="fhq-v8855-back" id="fhqV8855Back">← ALL COLLECTIONS</button><div><h2>${esc(m.label||openSet)}</h2><p>${esc(m.copy)}</p></div><div class="fhq-v8855-bigProgress"><strong>${have} / ${cards.length}</strong><span>${pct}% COMPLETE</span></div></div><div class="fhq-v8855-cardGrid">${cards.map(c=>cardHTML(c,owned.includes(c.id))).join('')}</div>`;const back=document.getElementById('fhqV8855Back');if(back)back.onclick=()=>{openSet='';render(state)};root.querySelectorAll('[data-v8855-card]').forEach(b=>b.onclick=()=>openCard(cards.find(c=>c.id===b.dataset.v8855Card),owned.includes(b.dataset.v8855Card)));return;}
 root.innerHTML=`<div class="fhq-v8855-intro"><small>FOOTBALL HQ COLLECTIONS</small><h2>Collection Library</h2><p>Open a set to view every card, rarity, serial number, and your collection progress.</p></div><div class="fhq-v8855-library">${names.map(n=>coverHTML(n,sets[n],owned)).join('')}</div>`;root.querySelectorAll('[data-v8855-open-set]').forEach(b=>b.onclick=()=>{openSet=b.dataset.v8855OpenSet;render(state);window.scrollTo({top:0,behavior:'smooth'})});
}
function ensureModal(){let o=document.getElementById('fhqV8855CardModal');if(o)return o;o=document.createElement('div');o.id='fhqV8855CardModal';o.innerHTML='<div class="fhq-v8855-modalShell"><button type="button" class="fhq-v8855-modalClose">×</button><img alt="Football HQ card"></div>';document.body.appendChild(o);o.querySelector('.fhq-v8855-modalClose').onclick=()=>o.classList.remove('open');o.onclick=e=>{if(e.target===o)o.classList.remove('open')};return o}
function openCard(c,owned){if(!c||!owned)return;const src=artUrl(c);if(!src)return;const o=ensureModal();o.querySelector('img').src=src;o.classList.add('open')}

/* Wrap the native collection renderer, but leave every other system untouched. */
function installRenderer(){
 const old=window.fhqRenderCollections;
 if(old&&old.__v8855)return;
 const wrapped=function(x){try{return render(x)}catch(e){console.warn('[FHQ V88.55] collection renderer fallback',e);if(typeof old==='function')return old.apply(this,arguments)}};
 wrapped.__v8855=true;window.fhqRenderCollections=wrapped;
 try{fhqRenderCollections=wrapped}catch(e){}
 if(state)render(state);
}
function boot(){injectCSS();installImages();installCatalog();installRenderer();setTimeout(installRenderer,500);setTimeout(installRenderer,1500);try{if(typeof fhqLoadCollections==='function')setTimeout(fhqLoadCollections,650)}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
console.log('[FootballHQ] V88.55 Set 002 — The Sideline active');
})();
