/* ============================================================
   FOOTBALL HQ V88.56 — SET 002 FRONTEND RUNTIME FIX
   GitHub path: v88-36/js/35-fhq-set002-runtime-fix-v8856.js

   Fixes:
   1) Forces Set 002 cards through the live V85 image pipeline.
   2) Makes both 001 / 002 collection covers open reliably.
   3) Uses the server collection state directly so old lexical renderers
      cannot block the click.
   4) Leaves packs, odds, coins, duplicate handling and animations alone.
   ============================================================ */
(function(){
'use strict';
if(window.__FHQ_V8856_SET002_RUNTIME_FIX__) return;
window.__FHQ_V8856_SET002_RUNTIME_FIX__ = true;

var SIDELINE = 'The Sideline';
var GRIDIRON = 'The Gridiron';

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function pad(n){ return String(Number(n)||0).padStart(3,'0'); }

function cardId(x){
  if(!x) return '';
  return String(x.value || x.id || x.cardId || '');
}

/* ---------- IMAGE PIPELINE FIX ---------- */
function sidelineImage(id){
  try{
    return window.FHQ_V85_CARD_IMAGES && window.FHQ_V85_CARD_IMAGES[id]
      ? window.FHQ_V85_CARD_IMAGES[id]
      : '';
  }catch(e){ return ''; }
}

var priorImageForCard = (typeof window.fhqV85ImageForCard === 'function')
  ? window.fhqV85ImageForCard
  : null;

function v8856ImageForCard(x){
  var id = cardId(x);
  if(/^ts002-\d{3}$/.test(id)){
    var src = sidelineImage(id);
    if(src) return src;
  }
  if(priorImageForCard){
    try{return priorImageForCard.apply(this,arguments)||'';}catch(e){}
  }
  return '';
}

window.fhqV85ImageForCard = v8856ImageForCard;
try{ fhqV85ImageForCard = v8856ImageForCard; }catch(e){}

/* Re-assert after older scripts finish booting. */
setTimeout(function(){
  window.fhqV85ImageForCard = v8856ImageForCard;
  try{ fhqV85ImageForCard = v8856ImageForCard; }catch(e){}
},500);
setTimeout(function(){
  window.fhqV85ImageForCard = v8856ImageForCard;
  try{ fhqV85ImageForCard = v8856ImageForCard; }catch(e){}
},1600);

/* ---------- COLLECTION OPEN FIX ---------- */
function imageForCollectionCard(c){
  var id=String(c&&c.id||'');
  if(/^ts002-\d{3}$/.test(id)){
    return sidelineImage(id);
  }
  try{
    if(typeof window.fhqV85ImageForCard==='function'){
      return window.fhqV85ImageForCard({
        type:'card', value:id, id:id, name:c.name, set:c.set, rarity:c.rarity
      }) || '';
    }
  }catch(e){}
  return '';
}

function injectCss(){
  if(document.getElementById('fhqV8856CollectionFixCss')) return;
  var s=document.createElement('style');
  s.id='fhqV8856CollectionFixCss';
  s.textContent = `
  #fhqAlbumGrid .fhq-v8856-detail{padding:2px 0 24px}
  #fhqAlbumGrid .fhq-v8856-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:0 0 18px}
  #fhqAlbumGrid .fhq-v8856-back{border:1px solid #345565;background:#0d1b22;color:#e6f6fc;border-radius:9px;padding:9px 13px;font-weight:900;cursor:pointer;margin-bottom:14px}
  #fhqAlbumGrid .fhq-v8856-title small{display:block;color:#72d4f5;font-size:9px;letter-spacing:2px;font-weight:1000}
  #fhqAlbumGrid .fhq-v8856-title h2{margin:4px 0 5px;color:#fff;font-size:32px}
  #fhqAlbumGrid .fhq-v8856-title p{margin:0;color:#8498a4;font-size:11px}
  #fhqAlbumGrid .fhq-v8856-count{text-align:right;color:#72d4f5;font-size:10px;font-weight:1000;letter-spacing:1px}
  #fhqAlbumGrid .fhq-v8856-count strong{display:block;color:#fff;font-size:25px;letter-spacing:0}
  #fhqAlbumGrid .fhq-v8856-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:13px}
  #fhqAlbumGrid .fhq-v8856-card{aspect-ratio:720/1040;position:relative;border-radius:12px;overflow:hidden;background:#071015;border:1px solid #263e4b;box-shadow:0 12px 28px rgba(0,0,0,.32)}
  #fhqAlbumGrid .fhq-v8856-card img{display:block;width:100%;height:100%;object-fit:contain;background:#05090b}
  #fhqAlbumGrid .fhq-v8856-card.noart{display:flex;flex-direction:column;justify-content:flex-end;padding:12px}
  #fhqAlbumGrid .fhq-v8856-card.noart strong{color:#fff;font-size:12px}
  #fhqAlbumGrid .fhq-v8856-card.noart span{color:#7f96a2;font-size:9px;margin-top:5px}
  #fhqAlbumGrid .fhq-v8856-locked:after{content:"LOCKED";position:absolute;inset:0;display:grid;place-items:center;background:rgba(2,6,8,.69);color:#8da0aa;font-size:10px;font-weight:1000;letter-spacing:1.4px}
  #fhqAlbumGrid .fhq-v8856-rarity{position:absolute;right:7px;top:7px;z-index:2;background:rgba(0,0,0,.72);border:1px solid #4a6270;border-radius:99px;padding:4px 6px;color:#dce9ef;font-size:7px;font-weight:1000;text-transform:uppercase}
  @media(max-width:900px){#fhqAlbumGrid .fhq-v8856-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media(max-width:620px){#fhqAlbumGrid .fhq-v8856-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#fhqAlbumGrid .fhq-v8856-head{display:block}.fhq-v8856-count{text-align:left!important;margin-top:10px}}
  `;
  document.head.appendChild(s);
}

function renderSet(state,setName){
  injectCss();
  var root=document.getElementById('fhqAlbumGrid');
  if(!root || !state) return;
  var sets=state.sets||{};
  var cards=(sets[setName]||[]).slice();
  cards.sort(function(a,b){
    var an=Number(a.number)||Number(String(a.id||'').match(/(\d+)$/)?.[1])||999;
    var bn=Number(b.number)||Number(String(b.id||'').match(/(\d+)$/)?.[1])||999;
    return an-bn;
  });
  var owned=(state.owned||[]).map(String);
  var have=cards.filter(function(c){return owned.indexOf(String(c.id))>=0}).length;
  var code=setName===SIDELINE?'002':'001';
  var copy=setName===SIDELINE
    ? 'Tactical. Smart. Scrappy. The coaches, equipment and organized chaos beyond the white stripe.'
    : 'The field itself comes alive under stadium lights.';

  var html='<div class="fhq-v8856-detail">'+
    '<button type="button" class="fhq-v8856-back" id="fhqV8856Back">← ALL COLLECTIONS</button>'+
    '<div class="fhq-v8856-head"><div class="fhq-v8856-title"><small>FOOTBALL HQ COLLECTION • SET '+code+'</small>'+
    '<h2>'+esc(setName)+'</h2><p>'+esc(copy)+'</p></div>'+
    '<div class="fhq-v8856-count"><strong>'+have+' / '+cards.length+'</strong>COLLECTED</div></div>'+
    '<div class="fhq-v8856-grid">';

  cards.forEach(function(c){
    var src=imageForCollectionCard(c), got=owned.indexOf(String(c.id))>=0;
    if(src){
      html+='<div class="fhq-v8856-card '+(got?'':'fhq-v8856-locked')+'">'+
        '<span class="fhq-v8856-rarity">'+esc(c.rarity||'common')+'</span>'+
        '<img src="'+esc(src)+'" alt="'+esc(c.name||'Football HQ card')+'"></div>';
    }else{
      html+='<div class="fhq-v8856-card noart '+(got?'':'fhq-v8856-locked')+'">'+
        '<span class="fhq-v8856-rarity">'+esc(c.rarity||'common')+'</span>'+
        '<strong>'+esc(c.name||'Football HQ card')+'</strong>'+
        '<span>'+esc(code)+' • '+pad(c.number||0)+'/'+pad(cards.length)+'</span></div>';
    }
  });
  html+='</div></div>';
  root.innerHTML=html;

  var back=document.getElementById('fhqV8856Back');
  if(back) back.onclick=function(){
    try{
      window.__fhqOpenCollectionSet='';
      if(typeof window.fhqLoadCollections==='function'){ window.fhqLoadCollections(); return; }
      if(typeof fhqLoadCollections==='function'){ fhqLoadCollections(); return; }
      if(typeof window.fhqRenderCollections==='function' && window.__fhqLastCollectionsState){
        window.fhqRenderCollections(window.__fhqLastCollectionsState);
      }
    }catch(e){location.reload();}
  };
}

function loadSet(setName){
  var fallback=window.__fhqLastCollectionsState||null;
  if(typeof google!=='undefined' && google.script && google.script.run){
    try{
      var token='';
      try{
        if(typeof window.fhqGetToken==='function') token=window.fhqGetToken();
        else if(typeof fhqGetToken==='function') token=fhqGetToken();
      }catch(e){}
      google.script.run
        .withSuccessHandler(function(x){
          if(x){ window.__fhqLastCollectionsState=x; renderSet(x,setName); }
          else if(fallback) renderSet(fallback,setName);
        })
        .withFailureHandler(function(){ if(fallback) renderSet(fallback,setName); })
        .getFootballHQCollections(token);
      return;
    }catch(e){}
  }
  if(fallback) renderSet(fallback,setName);
}

/* Capture before older broken handlers. */
document.addEventListener('click',function(e){
  var root=document.getElementById('fhqAlbumGrid');
  if(!root || !e.target || !e.target.closest) return;
  var cover=e.target.closest('[data-v823-set],[data-open-set],[data-v8855-open-set]');
  if(!cover || !root.contains(cover)) return;
  var setName=cover.getAttribute('data-v823-set') ||
              cover.getAttribute('data-open-set') ||
              cover.getAttribute('data-v8855-open-set') || '';
  if(setName!==GRIDIRON && setName!==SIDELINE) return;
  e.preventDefault();
  e.stopPropagation();
  if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  loadSet(setName);
},true);

injectCss();
console.log('[FootballHQ] V88.56 Set 002 runtime fix active');
})();
