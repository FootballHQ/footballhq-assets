/* ============================================================
   FOOTBALL HQ / TURF V88.82 — COLLECTION STABILITY + SET 001 ART

   FIXES
   - Set 001 collection now uses the exact approved tg001-tg020 PNGs.
   - Set 001 signatures tg021-tg024 stay on the existing signature resolver.
   - Set 002 art path and rendering are intentionally unchanged.
   - Collection covers open immediately from the cached collection state.
   - BACK TO COLLECTIONS restores the already-rendered collection home
     instead of reloading the whole app / causing a white screen.
   ============================================================ */
(function(){
  'use strict';
  if(window.__FHQ_V8858_COLLECTIONS_ARTMAP__) return;
  window.__FHQ_V8858_COLLECTIONS_ARTMAP__=true;

  var SET001='The Gridiron';
  var SET002='The Sideline';
  var SET001_ROOT='https://footballhq.github.io/footballhq-assets/v88-36/cards/001/';
  var SET002_ROOT='https://footballhq.github.io/footballhq-assets/v88-36/cards/002/';

  function esc(v){
    return String(v==null?'':v)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function sidelineUrl(id){
    id=String(id||'');
    return /^ts002-\d{3}$/.test(id) ? SET002_ROOT+id+'.png' : '';
  }

  function gridironExactUrl(id){
    id=String(id||'').toLowerCase();
    return /^tg0(?:0[1-9]|1\d|20)$/.test(id) ? SET001_ROOT+id+'.png?v=8882' : '';
  }

  /* Set 002 art registry: intentionally unchanged. */
  window.FHQ_SET002_ART_URLS=window.FHQ_SET002_ART_URLS||{};
  for(var i=1;i<=40;i++){
    var id='ts002-'+String(i).padStart(3,'0');
    window.FHQ_SET002_ART_URLS[id]=sidelineUrl(id);
  }

  var previousImageForCard = typeof window.fhqV85ImageForCard==='function'
    ? window.fhqV85ImageForCard : null;

  function imageForCard(card){
    var id=String(card && (card.value||card.id||card.cardId) || '');

    /* Never change Set 002 behavior. */
    if(/^ts002-\d{3}$/.test(id)) return sidelineUrl(id);

    /* Exact approved Set 001 art for cards 001-020 only. */
    var exact001=gridironExactUrl(id);
    if(exact001) return exact001;

    /* tg021-tg024 signatures continue through the existing resolver. */
    if(previousImageForCard){
      try{return previousImageForCard.apply(this,arguments)||'';}catch(e){}
    }
    return '';
  }

  window.fhqV85ImageForCard=imageForCard;
  try{fhqV85ImageForCard=imageForCard}catch(e){}

  function getToken(){
    try{
      if(typeof window.fhqGetToken==='function') return window.fhqGetToken();
      if(typeof fhqGetToken==='function') return fhqGetToken();
    }catch(e){}
    return '';
  }

  function sortCards(cards){
    return (cards||[]).slice().sort(function(a,b){
      function num(c){
        if(Number(c&&c.number)) return Number(c.number);
        var m=String(c&&c.id||'').match(/(\d+)$/);
        return m?Number(m[1]):999;
      }
      return num(a)-num(b);
    });
  }

  function injectCss(){
    if(document.getElementById('fhqV8858Css')) return;
    var s=document.createElement('style');
    s.id='fhqV8858Css';
    s.textContent=`
      #fhqAlbumGrid .v8858-set{max-width:1220px;margin:0 auto;padding:6px 8px 28px}
      #fhqAlbumGrid .v8858-back{appearance:none;border:1px solid #355868;background:#0c1920;color:#e9f7fb;border-radius:10px;padding:10px 14px;font-weight:900;cursor:pointer;margin:0 0 18px}
      #fhqAlbumGrid .v8858-head{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:18px}
      #fhqAlbumGrid .v8858-head small{display:block;color:#66d4f7;font-size:9px;font-weight:1000;letter-spacing:2px}
      #fhqAlbumGrid .v8858-head h2{margin:5px 0 4px;color:#fff;font-size:34px}
      #fhqAlbumGrid .v8858-head p{margin:0;color:#8299a5;font-size:11px;max-width:720px}
      #fhqAlbumGrid .v8858-progress{text-align:right;color:#6ed6f6;font-size:10px;font-weight:1000}
      #fhqAlbumGrid .v8858-progress strong{display:block;color:#fff;font-size:26px}
      #fhqAlbumGrid .v8858-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px}
      #fhqAlbumGrid .v8858-card{position:relative;aspect-ratio:720/1040;border-radius:11px;overflow:hidden;background:linear-gradient(145deg,#0c171c,#050a0d);border:1px solid #29444f;box-shadow:0 10px 25px rgba(0,0,0,.30)}
      #fhqAlbumGrid .v8858-card img{width:100%;height:100%;display:block;object-fit:contain;background:#05090b}
      #fhqAlbumGrid .v8858-card .fallback{position:absolute;inset:0;padding:13px;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(180deg,#0c171c 0%,#081014 60%,#05090b 100%)}
      #fhqAlbumGrid .v8858-card .fallback b{color:#fff;font-size:12px}
      #fhqAlbumGrid .v8858-card .fallback span{color:#8296a0;font-size:8px;margin-top:5px;text-transform:uppercase}
      #fhqAlbumGrid .v8858-rarity{position:absolute;z-index:3;top:7px;right:7px;border-radius:99px;padding:4px 6px;background:rgba(2,6,8,.82);border:1px solid #49606a;color:#dce9ee;font-size:7px;font-weight:1000;text-transform:uppercase}
      #fhqAlbumGrid .v8858-locked:after{content:"LOCKED";position:absolute;z-index:4;inset:0;display:grid;place-items:center;background:rgba(2,6,8,.70);color:#81939c;font-size:9px;font-weight:1000;letter-spacing:1.4px}
      @media(max-width:1050px){#fhqAlbumGrid .v8858-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
      @media(max-width:700px){#fhqAlbumGrid .v8858-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#fhqAlbumGrid .v8858-head{display:block}#fhqAlbumGrid .v8858-progress{text-align:left;margin-top:12px}}
    `;
    document.head.appendChild(s);
  }

  function rememberCollectionsHome(){
    var root=document.getElementById('fhqAlbumGrid');
    if(!root) return;
    if(!root.querySelector('.v8858-set') && root.innerHTML.trim()){
      window.__fhqV8858CollectionsHomeHTML=root.innerHTML;
      window.__fhqV8858CollectionsHomeScroll=window.scrollY||0;
    }
  }

  function restoreCollectionsHome(){
    var root=document.getElementById('fhqAlbumGrid');
    if(!root) return false;
    var html=window.__fhqV8858CollectionsHomeHTML;
    if(!html) return false;
    root.innerHTML=html;
    window.__fhqOpenCollectionSet='';
    var y=Number(window.__fhqV8858CollectionsHomeScroll)||0;
    requestAnimationFrame(function(){window.scrollTo(0,y)});
    return true;
  }

  function renderSet(state,setName){
    injectCss();
    var root=document.getElementById('fhqAlbumGrid');
    if(!root || !state) return;

    rememberCollectionsHome();
    window.__fhqV8858State=state;
    var cards=sortCards((state.sets||{})[setName]||[]);
    var owned=(state.owned||[]).map(String);
    var have=cards.filter(function(c){return owned.indexOf(String(c.id))>=0}).length;
    var code=setName===SET002?'002':'001';
    var desc=setName===SET002
      ? 'Tactical. Smart. Scrappy. Everything beyond the white stripe comes alive.'
      : 'The field itself comes alive. Every yard. Every game.';

    var html='<section class="v8858-set">'+
      '<button type="button" class="v8858-back" id="v8858Back">← BACK TO COLLECTIONS</button>'+
      '<div class="v8858-head"><div><small>FOOTBALL HQ • SET '+code+'</small><h2>'+esc(setName)+'</h2><p>'+esc(desc)+'</p></div>'+
      '<div class="v8858-progress"><strong>'+have+' / '+cards.length+'</strong>COLLECTED</div></div>'+
      '<div class="v8858-grid">';

    cards.forEach(function(c){
      var got=owned.indexOf(String(c.id))>=0;
      var src='';

      if(setName===SET002){
        /* LOCKED: do not modify Set 002 card art. */
        src=sidelineUrl(c.id);
      }else{
        var exact001=gridironExactUrl(c.id);
        if(exact001){
          src=exact001;
        }else{
          /* Keep the existing signature artwork for tg021-tg024. */
          try{src=imageForCard({type:'card',value:c.id,id:c.id,name:c.name,set:c.set,rarity:c.rarity})||''}catch(e){}
        }
      }

      html+='<article class="v8858-card '+(got?'':'v8858-locked')+'" data-card-id="'+esc(c.id||'')+'">'+
        '<span class="v8858-rarity">'+esc(c.rarity||'common')+'</span>';

      if(src){
        html+='<img src="'+esc(src)+'" alt="'+esc(c.name||'Football HQ card')+'" loading="eager" decoding="async" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">'+
          '<div class="fallback" style="display:none"><b>'+esc(c.name||'Football HQ card')+'</b><span>'+esc(c.subtitle||c.set||'Football HQ')+'</span></div>';
      }else{
        html+='<div class="fallback"><b>'+esc(c.name||'Football HQ card')+'</b><span>'+esc(c.subtitle||c.set||'Football HQ')+'</span></div>';
      }
      html+='</article>';
    });
    html+='</div></section>';
    root.innerHTML=html;

    var back=document.getElementById('v8858Back');
    if(back) back.onclick=function(e){
      if(e){e.preventDefault();e.stopPropagation()}
      if(restoreCollectionsHome()) return;

      /* Fallback without reloading the app. */
      window.__fhqOpenCollectionSet='';
      try{
        if(typeof window.fhqLoadCollections==='function'){
          window.fhqLoadCollections();
          return;
        }
        if(typeof fhqLoadCollections==='function'){
          fhqLoadCollections();
          return;
        }
      }catch(err){console.warn('[TURF] collection back fallback failed',err)}
    };

    window.scrollTo({top:0,behavior:'auto'});
  }

  function fetchAndOpen(setName){
    var cached=window.__fhqLastCollectionsState||window.__fhqV8858State||null;

    /* Fast path: the Collections home already has the state, so open instantly. */
    if(cached){
      renderSet(cached,setName);
      return;
    }

    /* First-ever load only: fetch from Apps Script. */
    try{
      if(typeof google!=='undefined' && google.script && google.script.run){
        google.script.run
          .withSuccessHandler(function(x){
            if(x){
              window.__fhqLastCollectionsState=x;
              renderSet(x,setName);
            }
          })
          .withFailureHandler(function(){})
          .getFootballHQCollections(getToken());
        return;
      }
    }catch(e){}
  }

  function identifyCover(target){
    if(!target || !target.closest) return null;
    var cover=target.closest('[data-v823-set],[data-open-set],[data-v8855-open-set],.fhq-v823-cover,.fhq-collection-cover');
    if(!cover) return null;
    var setName=cover.getAttribute('data-v823-set')||
                cover.getAttribute('data-open-set')||
                cover.getAttribute('data-v8855-open-set')||'';
    if(!setName){
      var t=(cover.textContent||'').toLowerCase();
      if(t.indexOf('the sideline')>=0) setName=SET002;
      else if(t.indexOf('the gridiron')>=0) setName=SET001;
    }
    if(setName!==SET001 && setName!==SET002) return null;
    return {cover:cover,setName:setName};
  }

  /* Use window capture so this runs before document-level legacy handlers. */
  window.addEventListener('click',function(e){
    var root=document.getElementById('fhqAlbumGrid');
    if(!root) return;
    var hit=identifyCover(e.target);
    if(!hit || !root.contains(hit.cover)) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    rememberCollectionsHome();
    fetchAndOpen(hit.setName);
  },true);

  window.FHQ_OPEN_GRIDIRON_COLLECTION=function(){rememberCollectionsHome();fetchAndOpen(SET001)};
  window.FHQ_OPEN_SIDELINE_COLLECTION=function(){rememberCollectionsHome();fetchAndOpen(SET002)};

  injectCss();
  console.log('[TURF] V88.82 collections fixed; Set 002 art untouched');
})();
