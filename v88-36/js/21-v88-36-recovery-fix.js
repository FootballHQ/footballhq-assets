/* FOOTBALL HQ V88.36 FIX 1
   Restores functions lost by unsafe mid-code AppPart splitting.
   The restored functions come from the last known-good V88.34 build.
*/
function adminEsc(v){
  return String(v==null?'':v).replace(/[&<>"']/g,function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[c];
  });
}

function clearDraftPlayerSearch(){
  fhqDraftPlayerSearchValue='';
  const input=document.getElementById('draftPlayerSearchInput');if(input)input.value='';
  if(sitePage==='draft')renderPlayers('');
}

function fhqBuyShopItem(id,confirmed){
    const item=FHQ_SHOP_FALLBACK.find(x=>x.id===id)||{};if(!confirmed)return fhqOpenPurchaseConfirm('item',id,item.name||'Item',Number(item.price||0));
    if(!fhqHasServer())return;const before=fhqCachedCoins();
    google.script.run.withSuccessHandler(function(r){
      if(r&&r.profile){
        const after=Number(r.profile.hqCoins)||0;fhqSetRuntimeIdentity(r.profile);fhqUpdateAccountUI(r.profile);
        fhqRenderShop({profile:r.profile,items:FHQ_SHOP_FALLBACK,packs:FHQ_PACK_FALLBACK});fhqRenderPass(r.profile);
        fhqAnimateCoinCounter(before,after);fhqCoinSound();fhqBalanceMessage('PURCHASE COMPLETE • '+(item.name||'Item'),false);
      }
      if(r&&r.purchased)fhqTone('correct');
    }).withFailureHandler(function(e){
      const msg=(e&&e.message)||'Unable to purchase item.';if(/not enough|insufficient/i.test(msg))fhqBalanceMessage('INSUFFICIENT BALANCE',true);else fhqBalanceMessage(msg,true);
    }).purchaseFootballHQShopItem({token:fhqGetToken(),itemId:id});
  }

function fhqCollectionCoverArt(name,meta,ownedCount,totalCount){
    const slug=String((meta&&meta.slug)||'').toLowerCase();
    const pct=totalCount?Math.round((ownedCount/totalCount)*100):0;
    const safeName=esc(name);
    const defs='<defs>'+
      '<linearGradient id="sky_'+slug+'" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0b2432"/><stop offset=".52" stop-color="#153849"/><stop offset="1" stop-color="#07131b"/></linearGradient>'+
      '<radialGradient id="glow_'+slug+'"><stop stop-color="#6ad9ff" stop-opacity=".55"/><stop offset="1" stop-color="#6ad9ff" stop-opacity="0"/></radialGradient>'+
      '<filter id="soft_'+slug+'"><feGaussianBlur stdDeviation="10"/></filter>'+
      '<pattern id="dots_'+slug+'" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#9de7ff" opacity=".12"/></pattern>'+
    '</defs>';

    let scene='';
    if(name==='Fantasy War Room'){
      scene=
        '<rect width="1200" height="520" fill="#0b1118"/>'+
        '<rect width="1200" height="520" fill="url(#dots_'+slug+')" opacity=".45"/>'+
        '<circle cx="915" cy="115" r="230" fill="#e0b84f" opacity=".14" filter="url(#soft_'+slug+')"/>'+
        '<path d="M0 420 L1200 360 L1200 520 L0 520Z" fill="#111a22"/>'+
        '<g transform="translate(625 72)">'+
          '<rect x="0" y="0" width="420" height="238" rx="20" fill="#101f2a" stroke="#d6b34e" stroke-width="5"/>'+
          '<rect x="25" y="22" width="370" height="156" rx="10" fill="#07131b"/>'+
          '<path d="M55 138 C110 55 178 166 235 78 S340 110 372 48" fill="none" stroke="#67d5ff" stroke-width="8"/>'+
          '<g fill="#d8b64f"><circle cx="58" cy="138" r="8"/><circle cx="142" cy="93" r="8"/><circle cx="236" cy="79" r="8"/><circle cx="333" cy="91" r="8"/></g>'+
          '<rect x="142" y="196" width="136" height="16" rx="8" fill="#d6b34e" opacity=".75"/>'+
        '</g>'+
        '<g transform="translate(100 115)">'+
          '<rect x="0" y="95" width="470" height="205" rx="18" fill="#14202a" stroke="#314754" stroke-width="4"/>'+
          '<rect x="28" y="120" width="120" height="140" rx="10" fill="#0c151c"/>'+
          '<rect x="170" y="120" width="120" height="140" rx="10" fill="#0c151c"/>'+
          '<rect x="312" y="120" width="130" height="140" rx="10" fill="#0c151c"/>'+
          '<g fill="#87dcff"><rect x="45" y="142" width="82" height="12" rx="6"/><rect x="45" y="170" width="62" height="8" rx="4"/><rect x="45" y="193" width="75" height="8" rx="4"/>'+
          '<rect x="188" y="142" width="82" height="12" rx="6"/><rect x="188" y="170" width="62" height="8" rx="4"/><rect x="188" y="193" width="75" height="8" rx="4"/>'+
          '<rect x="330" y="142" width="92" height="12" rx="6"/><rect x="330" y="170" width="66" height="8" rx="4"/><rect x="330" y="193" width="84" height="8" rx="4"/></g>'+
          '<path d="M65 75 l58 -45 58 45 -25 0 0 30 -66 0 0 -30z" fill="#d3b34f" opacity=".85"/>'+
        '</g>'+
        '<g opacity=".5"><path d="M55 395 H1145" stroke="#d6b34e" stroke-width="2"/><path d="M105 420 H1095" stroke="#d6b34e" stroke-width="1"/></g>';
    }else if(name==='Gridiron IQ'){
      scene=
        '<rect width="1200" height="520" fill="#071721"/>'+
        '<circle cx="855" cy="220" r="270" fill="#1b6c91" opacity=".25"/>'+
        '<g opacity=".24" stroke="#63d6ff" fill="none">'+
          '<path d="M90 100 H1110 M90 170 H1110 M90 240 H1110 M90 310 H1110 M90 380 H1110" stroke-width="2"/>'+
          '<path d="M210 60 V455 M360 60 V455 M510 60 V455 M660 60 V455 M810 60 V455 M960 60 V455" stroke-width="2"/>'+
        '</g>'+
        '<g transform="translate(125 92)" fill="none" stroke-linecap="round">'+
          '<circle cx="65" cy="70" r="18" fill="#75dcff" stroke="none"/><circle cx="205" cy="200" r="18" fill="#75dcff" stroke="none"/><circle cx="355" cy="112" r="18" fill="#75dcff" stroke="none"/>'+
          '<path d="M65 70 C115 70 125 175 205 200 S300 148 355 112" stroke="#75dcff" stroke-width="11"/>'+
          '<path d="M355 112 l-28 -20 M355 112 l-10 32" stroke="#75dcff" stroke-width="11"/>'+
        '</g>'+
        '<g transform="translate(700 92)">'+
          '<rect x="0" y="0" width="330" height="294" rx="26" fill="#0e2531" stroke="#5dd3ff" stroke-width="4"/>'+
          '<path d="M55 72 C130 18 202 160 270 72" fill="none" stroke="#f0cf62" stroke-width="9"/>'+
          '<circle cx="55" cy="72" r="12" fill="#f0cf62"/><circle cx="270" cy="72" r="12" fill="#f0cf62"/>'+
          '<path d="M72 210 L130 145 L190 198 L262 126" fill="none" stroke="#72e4c9" stroke-width="11"/>'+
          '<g fill="#a3dfff"><rect x="55" y="240" width="92" height="12" rx="6"/><rect x="163" y="240" width="110" height="12" rx="6"/></g>'+
        '</g>';
    }else if(name==='Game Day Moments'){
      scene=
        '<rect width="1200" height="520" fill="#130a12"/>'+
        '<radialGradient id="stad_'+slug+'"><stop stop-color="#ff5c72" stop-opacity=".34"/><stop offset="1" stop-color="#ff5c72" stop-opacity="0"/></radialGradient>'+
        '<circle cx="600" cy="235" r="360" fill="url(#stad_'+slug+')"/>'+
        '<path d="M0 390 Q600 245 1200 390 V520 H0Z" fill="#17131a"/>'+
        '<path d="M0 410 Q600 285 1200 410" fill="none" stroke="#cf536b" stroke-width="12" opacity=".35"/>'+
        '<g fill="#f8dbe1" opacity=".5">'+
        '</g>'+
        '<g transform="translate(110 105)">'+
          '<path d="M50 0 L0 220 H28 L86 0Z" fill="#f5edf1" opacity=".9"/>'+
          '<path d="M160 0 L92 230 H126 L198 0Z" fill="#f5edf1" opacity=".45"/>'+
        '</g>'+
        '<g transform="translate(720 92)">'+
          '<path d="M0 185 C60 75 140 75 205 185" fill="none" stroke="#ffbd62" stroke-width="14"/>'+
          '<rect x="83" y="170" width="42" height="125" rx="16" fill="#ffbd62"/>'+
          '<path d="M104 170 V66 M45 66 H163" stroke="#ffbd62" stroke-width="15" stroke-linecap="round"/>'+
          '<ellipse cx="104" cy="38" rx="55" ry="30" fill="#492b20" stroke="#ffbd62" stroke-width="5" transform="rotate(-18 104 38)"/>'+
          '<path d="M73 34 H134 M103 17 V58" stroke="#f9d8b2" stroke-width="4"/>'+
        '</g>'+
        '<g fill="#6ed9ff"><circle cx="430" cy="320" r="11"/><circle cx="470" cy="298" r="8"/><circle cx="510" cy="335" r="10"/><circle cx="560" cy="306" r="7"/></g>';
    }else if(name==='Fantasy Nightmares'){
      scene='<rect width="1200" height="520" fill="#130910"/><circle cx="875" cy="190" r="250" fill="#9c2947" opacity=".22"/><g transform="translate(130 85)"><rect x="0" y="0" width="420" height="285" rx="22" fill="#1b1119" stroke="#d24f70" stroke-width="4"/><path d="M45 60h330M45 120h330M45 180h330" stroke="#8e3650" stroke-width="3"/><path d="M55 70 150 210 225 120 355 245" stroke="#ff668b" stroke-width="12" fill="none"/><circle cx="355" cy="245" r="18" fill="#ff668b"/></g><g transform="translate(730 110)"><rect width="310" height="250" rx="26" fill="#0b151c" stroke="#ff668b" stroke-width="4"/><text x="155" y="95" text-anchor="middle" fill="#ff668b" font-size="38" font-weight="1000">0.1</text><text x="155" y="145" text-anchor="middle" fill="#eefaff" font-size="20" font-weight="900">POINT LOSS</text><path d="M75 192h160" stroke="#ff668b" stroke-width="8"/></g>';
    }else if(name==='Football Superstitions'){
      scene='<rect width="1200" height="520" fill="#0b1514"/><circle cx="870" cy="190" r="260" fill="#58d6aa" opacity=".14"/><g transform="translate(130 90)"><path d="M180 0 340 65v140q0 105-160 180Q20 310 20 205V65Z" fill="#123b34" stroke="#71efc2" stroke-width="5"/><path d="M105 188 160 240 270 112" stroke="#eefaff" stroke-width="18" fill="none"/><circle cx="90" cy="80" r="26" fill="#e4bb52"/><path d="M65 355q110-65 230 0" stroke="#71efc2" stroke-width="10" fill="none"/></g><g transform="translate(715 110)"><rect width="330" height="235" rx="26" fill="#0d2420" stroke="#e4bb52" stroke-width="4"/><path d="M55 70h220M55 120h220M55 170h220" stroke="#71efc2" stroke-width="9" stroke-linecap="round"/><circle cx="95" cy="70" r="16" fill="#e4bb52"/><circle cx="230" cy="120" r="16" fill="#e4bb52"/></g>';
    }else if(name==='Tailgate Legends'){
      scene='<rect width="1200" height="520" fill="#120d09"/><path d="M0 350Q600 245 1200 350V520H0Z" fill="#1c2526"/><circle cx="875" cy="130" r="170" fill="#ffb44e" opacity=".18"/><g transform="translate(120 125)"><rect x="0" y="80" width="430" height="200" rx="24" fill="#13242b" stroke="#f3a84d" stroke-width="5"/><path d="M25 80q0-90 190-90t190 90" stroke="#f3a84d" stroke-width="14" fill="none"/><circle cx="130" cy="160" r="38" fill="#e46949"/><circle cx="245" cy="165" r="38" fill="#efc65b"/><path d="M75 250h280" stroke="#eefaff" stroke-width="8"/></g><g transform="translate(720 140)"><path d="M0 200V45q0-35 35-35h245q35 0 35 35v155" fill="#15313a" stroke="#69d7ff" stroke-width="5"/><path d="M45 55h225M45 105h225M45 155h225" stroke="#69d7ff" stroke-width="8"/><circle cx="80" cy="55" r="14" fill="#f3a84d"/><circle cx="230" cy="105" r="14" fill="#f3a84d"/></g>';
    }else if(name==='Commissioner Chaos'){
      scene='<rect width="1200" height="520" fill="#0c1118"/><circle cx="900" cy="210" r="280" fill="#7d5cff" opacity=".17"/><g transform="translate(110 95)"><rect width="470" height="310" rx="24" fill="#121d28" stroke="#8f76ff" stroke-width="5"/><rect x="40" y="45" width="390" height="50" rx="12" fill="#211d35"/><rect x="40" y="120" width="390" height="50" rx="12" fill="#172b35"/><rect x="40" y="195" width="390" height="50" rx="12" fill="#2b1824"/><path d="M70 70h250M70 145h305M70 220h205" stroke="#eefaff" stroke-width="9" stroke-linecap="round"/><circle cx="385" cy="70" r="15" fill="#ff5f7a"/><circle cx="385" cy="220" r="15" fill="#ff5f7a"/></g><g transform="translate(755 105)"><circle cx="135" cy="90" r="65" fill="#8f76ff"/><path d="M35 310q18-160 100-160t100 160" fill="#1b2833" stroke="#8f76ff" stroke-width="5"/><rect x="65" y="180" width="140" height="90" rx="12" fill="#07141d" stroke="#eefaff" stroke-opacity=".5"/><path d="M90 205h90M90 230h65" stroke="#70dcff" stroke-width="8"/></g>';
    }else if(name==='Hall of HQ'){
      scene='<rect width="1200" height="520" fill="#080b10"/><radialGradient id="hall_'+slug+'"><stop stop-color="#ffe58a" stop-opacity=".35"/><stop offset="1" stop-color="#ffe58a" stop-opacity="0"/></radialGradient><circle cx="600" cy="225" r="380" fill="url(#hall_'+slug+')"/><g transform="translate(365 55)"><path d="M235 0 430 80v170q0 140-195 245Q40 390 40 250V80Z" fill="#101923" stroke="#f1c654" stroke-width="8"/><path d="M120 250 205 330 350 150" stroke="#eefaff" stroke-width="22" fill="none"/><text x="235" y="125" text-anchor="middle" fill="#f1c654" font-size="58" font-weight="1000">HQ</text></g><path d="M135 440h930" stroke="#f1c654" stroke-width="5" opacity=".45"/>';
    }else{ // Sunday Survivor
      scene=
        '<rect width="1200" height="520" fill="#071b1a"/>'+
        '<radialGradient id="tv_'+slug+'"><stop stop-color="#50dfc4" stop-opacity=".4"/><stop offset="1" stop-color="#50dfc4" stop-opacity="0"/></radialGradient>'+
        '<circle cx="825" cy="215" r="290" fill="url(#tv_'+slug+')"/>'+
        '<g transform="translate(630 92)">'+
          '<rect x="0" y="0" width="420" height="235" rx="24" fill="#0a2024" stroke="#5ee1ca" stroke-width="5"/>'+
          '<rect x="28" y="28" width="364" height="178" rx="12" fill="#082c32"/>'+
          '<path d="M64 154 C120 82 174 170 236 91 S328 143 358 64" fill="none" stroke="#68e4d2" stroke-width="10"/>'+
          '<g fill="#f2d76e"><circle cx="64" cy="154" r="9"/><circle cx="174" cy="132" r="9"/><circle cx="236" cy="92" r="9"/><circle cx="344" cy="85" r="9"/></g>'+
        '</g>'+
        '<g transform="translate(98 175)">'+
          '<path d="M10 112 Q10 38 95 38 H350 Q435 38 435 112 V205 H10Z" fill="#173633" stroke="#47766d" stroke-width="4"/>'+
          '<rect x="0" y="185" width="455" height="80" rx="24" fill="#112724"/>'+
          '<circle cx="105" cy="32" r="45" fill="#d2a074"/>'+
          '<path d="M60 126 Q105 70 150 126 V182 H60Z" fill="#2a5c56"/>'+
          '<rect x="300" y="78" width="75" height="52" rx="10" fill="#122226" stroke="#e6c763" stroke-width="4"/>'+
          '<circle cx="322" cy="104" r="8" fill="#e6c763"/><circle cx="350" cy="104" r="8" fill="#e6c763"/>'+
        '</g>';
    }

    return '<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+defs+scene+
      '<rect x="22" y="22" width="1156" height="476" rx="34" fill="none" stroke="rgba(173,229,255,.16)" stroke-width="3"/>'+
      '<g transform="translate(58 42)"><rect width="118" height="42" rx="21" fill="#07141b" opacity=".78" stroke="#79ddff" stroke-opacity=".35"/><text x="59" y="27" text-anchor="middle" fill="#d7f5ff" font-size="18" font-weight="900">HQ SET</text></g>'+
      '<g transform="translate(930 432)"><rect width="205" height="48" rx="24" fill="#06131a" opacity=".86" stroke="#79ddff" stroke-opacity=".3"/><text x="102" y="31" text-anchor="middle" fill="#d7f5ff" font-size="19" font-weight="900">'+ownedCount+'/'+totalCount+' • '+pct+'%</text></g>'+
    '</svg>';
  }

function fhqLoadCollections(){
    function mergeExpandedCollections(x){
      x=x||{};
      const owned=Array.isArray(x.owned)?x.owned:(Array.isArray(window.__fhqCosmetics&&window.__fhqCosmetics.collection)?window.__fhqCosmetics.collection:[]);
      const sets={};
      FHQ_CARD_CATALOG_FALLBACK.forEach(function(c){if(!sets[c.set])sets[c.set]=[];sets[c.set].push(Object.assign({},c))});
      Object.keys(x.sets||{}).forEach(function(setName){
        if(!sets[setName])sets[setName]=[];
        (x.sets[setName]||[]).forEach(function(serverCard){
          const idx=sets[setName].findIndex(function(c){return String(c.id)===String(serverCard.id)});
          if(idx>=0)sets[setName][idx]=Object.assign({},serverCard,sets[setName][idx]);
          else sets[setName].push(serverCard);
        });
      });
      return {owned:owned,sets:sets,setMeta:Object.assign({},FHQ_COLLECTION_SET_META,x.setMeta||{})};
    }
    const cached=fhqReadCollectionCache();
    if(cached)fhqV823RenderCollections(mergeExpandedCollections(cached));
    else fhqV823RenderCollections(mergeExpandedCollections(null));
    if(!fhqHasServer())return;
    google.script.run.withSuccessHandler(function(x){
      if(x){
        const merged=mergeExpandedCollections(x);
        fhqWriteCollectionCache(merged);
        fhqV823RenderCollections(merged);
      }
    }).withFailureHandler(function(e){console.warn(e)}).getFootballHQCollections(fhqGetToken());
  }

function fhqLoadShop(){const local=Object.assign({},getAccountProfile(),{hqCoins:fhqCachedCoins()});fhqRenderShop({profile:local,items:FHQ_SHOP_FALLBACK,packs:FHQ_PACK_FALLBACK});if(fhqHasServer())google.script.run.withSuccessHandler(fhqRenderShop).withFailureHandler(e=>console.warn(e)).getFootballHQShop(fhqGetToken())}

function fhqOpenPassTab(tab){
    tab=tab==='rewards'?'rewards':'pass';document.querySelectorAll('[data-pass-tab]').forEach(b=>b.classList.toggle('active',b.dataset.passTab===tab));
    const a=document.getElementById('fhqPassTabPass'),b=document.getElementById('fhqPassTabRewards');if(a)a.classList.toggle('active',tab==='pass');if(b)b.classList.toggle('active',tab==='rewards');
  }

function fhqUpgradeOpenExactCard(root){
    try{
      const img=(root||document).querySelector('.fhq-exact-card-img[data-fhq-full]');
      if(!img)return;
      const full=img.dataset.fhqFull;
      if(!full||img.dataset.fhqFullLoaded==='1')return;
      img.dataset.fhqFullLoaded='1';
      requestAnimationFrame(()=>{img.src=full;if(img.decode)img.decode().catch(()=>{});});
    }catch(e){}
  }

function fhqV823RenderCollections(x){
    const root=document.getElementById('fhqAlbumGrid');if(!root)return;
    const owned=x&&Array.isArray(x.owned)?x.owned:[],
          sets=x&&x.sets?x.sets:{},
          meta=Object.assign({},FHQ_COLLECTION_SET_META,x&&x.setMeta||{}),
          names=Object.keys(sets);
    window.__fhqLastCollectionsState=x||{owned:owned,sets:sets,setMeta:meta};

    const openName=String(window.__fhqOpenCollectionSet||'');
    if(openName && sets[openName]){
      /* V88.9: sort the opened collection from lowest rarity to chase-card rarity.
         Stable source order is preserved inside each rarity tier. */
      const fhqV889RarityOrder={common:0,uncommon:1,rare:2,epic:3,legendary:4,mythic:5,signature:6,obsidian:7},
            fhqV816SundayMeta={
              ss01:{name:'Couch Dweller',rarity:'common'},
              ss02:{name:'The Watcher',rarity:'common'},
              ss03:{name:'Sunday Sleeper',rarity:'uncommon'},
              ss07:{name:'Waiver Warrior',rarity:'uncommon'},
              ss08:{name:'Fourth-Quarter Believer',rarity:'epic'},
              ss06:{name:'Red Zone Addict',rarity:'legendary'},
              ss09:{name:'Stat Checker',rarity:'signature'},
              ss12:{name:'Iron Couch',rarity:'obsidian'}
            },
            sourceCards=(sets[openName]||[]).map(function(c){
              if(openName!=='Sunday Survivor'||!fhqV816SundayMeta[c.id])return c;
              return Object.assign({},c,fhqV816SundayMeta[c.id]);
            }),
            cards=sourceCards.map(function(c,i){return {card:c,index:i}}).sort(function(a,b){
              const ar=fhqV87NormalizeRarity(a.card),br=fhqV87NormalizeRarity(b.card);
              return (fhqV889RarityOrder[ar]??99)-(fhqV889RarityOrder[br]??99)||a.index-b.index;
            }).map(function(x){return x.card}),
            m=meta[openName]||{label:openName,copy:'Football HQ collection.',rewardCoins:400,rewardTitle:'Set Complete'},
            n=cards.filter(c=>owned.includes(c.id)).length,
            total=cards.length,
            pct=total?Math.round(n/total*100):0;

      root.innerHTML=
        '<section class="fhq-v823-detail">'+
          '<div class="fhq-v823-detail-hero">'+
            '<div class="fhq-v823-detail-art">'+fhqCollectionCoverArt(openName,m,n,total)+'</div>'+
            '<button type="button" class="fhq-v823-back" id="fhqV823Back">← ALL COLLECTIONS</button>'+
            '<div class="fhq-v823-detail-copy">'+
              '<span>FOOTBALL HQ COLLECTION</span>'+
              '<h2>'+esc(openName)+'</h2>'+
              '<p>'+esc(m.copy||'Complete this Football HQ set to earn an exclusive reward.')+'</p>'+
              '<div class="fhq-v823-detail-stats"><b>'+n+' / '+total+' COLLECTED</b><b>'+pct+'% COMPLETE</b><b>'+Number(m.rewardCoins||0)+' COINS + '+esc(m.rewardTitle||'EXCLUSIVE TITLE')+'</b></div>'+
              '<div class="fhq-v823-meter"><i style="width:'+pct+'%"></i></div>'+
            '</div>'+
          '</div>'+
          '<div class="fhq-v823-card-library">'+
            '<div class="fhq-v823-card-library-head"><div><span>THE SET</span><h3>'+esc(openName)+' Cards</h3></div><p>Owned cards can be opened and flipped. Locked cards stay hidden until collected.</p></div>'+
            '<div class="fhq-v823-card-grid">'+cards.map(function(c,index){
              const have=owned.includes(c.id), rarity=String(c.rarity||'common').toLowerCase();
              return '<button type="button" class="fhq-v823-card '+(have?'owned':'locked')+' rarity-'+esc(rarity)+'" data-v823-card="'+esc(c.id)+'">'+
                '<span class="fhq-v823-card-number">'+String(index+1).padStart(2,'0')+'/'+String(total).padStart(2,'0')+'</span>'+
                (have?fhqV85CardMarkup(c):
                  '<span class="fhq-v823-locked-card"><span class="shield">HQ</span><b>LOCKED</b><small>'+esc(rarity.toUpperCase())+'</small></span>')+
                (have?'<span class="fhq-v823-view-card">VIEW CARD ↗</span>':'')+
              '</button>';
            }).join('')+'</div>'+
          '</div>'+
        '</section>';

      const back=document.getElementById('fhqV823Back');
      if(back)back.onclick=function(){
        window.__fhqOpenCollectionSet='';
        fhqV823RenderCollections(window.__fhqLastCollectionsState);
        window.scrollTo({top:0,behavior:'smooth'});
      };
      root.querySelectorAll('[data-v823-card]').forEach(function(btn){
        btn.onclick=function(ev){
          if(ev){ev.preventDefault();ev.stopPropagation();}
          const card=cards.find(c=>String(c.id)===String(this.dataset.v823Card));
          if(!card)return false;
          const have=owned.map(String).includes(String(card.id));
          if(have)fhqV833OpenCollectionCard(card);
          return false;
        };
      });
      return;
    }

    root.innerHTML=
      '<div class="fhq-v823-library-intro">'+
        '<span>FOOTBALL HQ COLLECTION LIBRARY</span>'+
        '<h2>Build the Ultimate Football Locker</h2>'+
        '<p>Each set has its own theme, rarity chase, artwork, and completion reward. Open packs, finish sets, and collect the rarest Football HQ cards.</p>'+
      '</div>'+
      '<div class="fhq-v823-library-grid">'+
      (names.length?names.map(function(name){
        const cards=sets[name]||[],
              n=cards.filter(c=>owned.includes(c.id)).length,
              total=cards.length,
              m=meta[name]||{label:name,copy:'Football HQ collection.',rewardCoins:400,rewardTitle:'Set Complete'},
              pct=total?Math.round(n/total*100):0;
        const rareCount=cards.filter(c=>['epic','legendary','obsidian','signature'].includes(String(c.rarity||'').toLowerCase())).length;
        return '<button type="button" class="fhq-v823-cover" data-v823-set="'+esc(name)+'" onclick="return window.fhqOpenModernCollection(this.getAttribute(\'data-v823-set\'))">'+
          '<div class="fhq-v823-cover-art">'+fhqCollectionCoverArt(name,m,n,total)+'</div>'+
          '<div class="fhq-v823-cover-info">'+
            '<div class="fhq-v823-cover-title"><div><span>COLLECTION</span><h3>'+esc(name)+'</h3></div><strong>'+n+' / '+total+'</strong></div>'+
            '<p>'+esc(m.copy||'Complete this Football HQ collection.')+'</p>'+
            '<div class="fhq-v823-cover-meter"><i style="width:'+pct+'%"></i></div>'+
            '<div class="fhq-v823-cover-meta"><span>'+pct+'% COMPLETE</span><span>'+rareCount+' PREMIUM CARDS</span></div>'+
            '<div class="fhq-v823-cover-reward"><span>SET COMPLETION REWARD</span><b>'+Number(m.rewardCoins||0)+' HQ COINS + '+esc(m.rewardTitle||'EXCLUSIVE TITLE')+'</b></div>'+
            '<div class="fhq-v823-open-btn">VIEW COLLECTION <b>→</b></div>'+
          '</div>'+
        '</button>';
      }).join(''):'<div class="fhq-locker-empty"><strong>No collections available</strong><span>Open packs to begin your Football HQ collection.</span></div>')+
      '</div>';

    root.querySelectorAll('[data-v823-set]').forEach(function(btn){
      btn.onclick=function(ev){
        if(ev){ev.preventDefault();ev.stopPropagation();}
        return window.fhqOpenModernCollection(this.getAttribute('data-v823-set'));
      };
    });
  }

function fhqV833OpenCollectionCard(card){
    if(!card)return;
    let overlay=document.getElementById('fhqV833CardOverlay');
    if(!overlay){
      overlay=document.createElement('div');
      overlay.id='fhqV833CardOverlay';
      overlay.innerHTML=
        '<div class="fhq-v833-view-shell" role="dialog" aria-modal="true">'+
          '<button type="button" class="fhq-v833-view-close" aria-label="Close">×</button>'+
          '<div class="fhq-v833-view-kicker">FOOTBALL HQ COLLECTIBLE</div>'+
          '<h2 class="fhq-v833-view-title"></h2>'+
          '<div class="fhq-v833-view-sub"></div>'+
          '<div class="fhq-v833-card-stage">'+
            '<div class="fhq-v833-card-flip">'+
              '<div class="fhq-v833-card-face fhq-v833-front"></div>'+
              '<div class="fhq-v833-card-face fhq-v833-back">'+
                '<div class="fhq-v833-back-orbit"></div>'+
                '<div class="fhq-v834-back-logo" aria-label="Football HQ logo">'+
                  '<svg viewBox="0 0 48 56" aria-hidden="true">'+
                    '<path d="M24 2 43 9v15c0 13-8 23-19 30C13 47 5 37 5 24V9L24 2Z" fill="#111a21" stroke="#8fc8ef" stroke-width="2"/>'+
                    '<text x="24" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#f6f8fa">HQ</text>'+
                    '<path d="M15 34c5-6 13-7 18-3-2 6-9 10-15 9-2-1-3-3-3-6Z" fill="#e8edf1" transform="rotate(-18 24 35)"/>'+
                  '</svg>'+
                '</div>'+
                '<div class="fhq-v833-back-brand">FOOTBALL HQ</div>'+
                '<div class="fhq-v833-back-meta"></div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="fhq-v833-view-tip">CLICK THE CARD TO FLIP • ESC TO CLOSE</div>'+
        '</div>';
      document.body.appendChild(overlay);

      overlay.querySelector('.fhq-v833-view-close').onclick=function(ev){
        ev.preventDefault();ev.stopPropagation();overlay.classList.remove('open');
      };
      overlay.onclick=function(ev){if(ev.target===overlay)overlay.classList.remove('open')};
      overlay.querySelector('.fhq-v833-card-stage').onclick=function(ev){
        ev.stopPropagation();
        overlay.querySelector('.fhq-v833-card-flip').classList.toggle('flipped');
      };
    }

    const flip=overlay.querySelector('.fhq-v833-card-flip');
    flip.classList.remove('flipped');
    overlay.querySelector('.fhq-v833-view-title').textContent=card.name||'HQ Card';
    overlay.querySelector('.fhq-v833-view-sub').textContent=
      String(card.rarity||'common').toUpperCase()+' • '+String(card.set||'Football HQ');
    overlay.querySelector('.fhq-v833-front').innerHTML=fhqV85CardMarkup(card);
    overlay.querySelector('.fhq-v833-back-meta').textContent=
      String(card.set||'Football HQ')+' • '+String(card.rarity||'common').toUpperCase();
    overlay.classList.add('open');
  }

function gameSupportsDaily(game){
    return DAILY_SCORING_GAMES.has(game);
  }

function mergeExpandedCollections(x){
      x=x||{};
      const owned=Array.isArray(x.owned)?x.owned:(Array.isArray(window.__fhqCosmetics&&window.__fhqCosmetics.collection)?window.__fhqCosmetics.collection:[]);
      const sets={};
      FHQ_CARD_CATALOG_FALLBACK.forEach(function(c){if(!sets[c.set])sets[c.set]=[];sets[c.set].push(Object.assign({},c))});
      Object.keys(x.sets||{}).forEach(function(setName){
        if(!sets[setName])sets[setName]=[];
        (x.sets[setName]||[]).forEach(function(serverCard){
          const idx=sets[setName].findIndex(function(c){return String(c.id)===String(serverCard.id)});
          if(idx>=0)sets[setName][idx]=Object.assign({},serverCard,sets[setName][idx]);
          else sets[setName].push(serverCard);
        });
      });
      return {owned:owned,sets:sets,setMeta:Object.assign({},FHQ_COLLECTION_SET_META,x.setMeta||{})};
    }

function openFootballHQSection(section){
    section=String(section||'home').toLowerCase();
    syncFootballHQPageChrome(section);

    const home=document.getElementById('fhqHome');
    const leader=document.getElementById('fhqLeaderboardPage');
    const gamesHub=document.getElementById('fhqGamesHub');
    const passPage=document.getElementById('fhqPassPage');
    const shopPage=document.getElementById('fhqShopPage');
    const lockerPage=document.getElementById('fhqLockerPage');
    const albumPage=document.getElementById('fhqAlbumPage');
    const admin=document.getElementById('fhqAdminPage');
    const core=document.getElementById('fhqCorePage');
    const gameOverlay=document.getElementById('footballGameOverlay');

    if(gameOverlay){
      gameOverlay.classList.remove('fhq-game-page');
      gameOverlay.classList.remove('open');
      gameOverlay.setAttribute('aria-hidden','true');
    }

    /* Pause, never destroy, an active draft when leaving Draft Sim. */
    if(section!=='draft'&&simulatorActive&&typeof pauseDraftForNavigation==='function'){
      pauseDraftForNavigation();
    }

    /* Reset ALL top-level page classes first. */
    document.body.classList.remove(
      'home-page','rankings-page','draft-page','games-page','leaderboard-page','pass-page','shop-page','locker-page','album-page','admin-page',
      'draft-flow-landing','draft-flow-settings','draft-flow-lobby','draft-flow-live'
    );

    /* Hide all standalone page roots. */
    if(home){home.classList.add('hidden');home.style.display='none'}
    if(leader){leader.classList.add('hidden');leader.style.display='none'}
    if(gamesHub){gamesHub.classList.add('hidden');gamesHub.style.display='none'}
    if(passPage){passPage.classList.add('hidden');passPage.style.display='none'}
    if(shopPage){shopPage.classList.add('hidden');shopPage.style.display='none'}
    if(lockerPage){lockerPage.classList.add('hidden');lockerPage.style.display='none'}
    if(albumPage){albumPage.classList.add('hidden');albumPage.style.display='none'}
    if(admin){admin.classList.remove('show');admin.style.display='none'}

    document.querySelectorAll('[data-fhq-nav]').forEach(function(b){
      b.classList.toggle('active',b.dataset.fhqNav===section);
    });
    document.querySelectorAll('.side-nav-item').forEach(function(b){
      if(!b.hasAttribute('data-fhq-nav'))b.classList.remove('active');
    });

    if(section==='coming'){
      const modal=document.getElementById('fhqComingModal');if(modal){modal.classList.add('open');modal.setAttribute('aria-hidden','false')}
      document.querySelectorAll('[data-fhq-nav]').forEach(function(b){b.classList.toggle('active',b.dataset.fhqNav==='home')});
      return;
    }
    if(section==='home'){
      sitePage='home';
      document.body.classList.add('home-page');
      if(core)core.style.display='none';
      if(home){home.classList.remove('hidden');home.style.display='block'}
      refreshFootballHQScoreDisplays();
      if(fhqHasServer()){
        google.script.run
          .withSuccessHandler(function(data){if(data){window.__fhqLeaderboardPeriodsCache=data;window.__fhqLeaderboardPeriodsCacheAt=Date.now();fhqPaintHomeDailyRank(data)}})
          .withFailureHandler(function(){})
          .getFootballHQLeaderboardPeriods(fhqGetToken());
      }
      window.scrollTo(0,0);
      return;
    }

    if(section==='pass'){
      sitePage='pass';document.body.classList.add('pass-page');if(core)core.style.display='none';
      if(passPage){passPage.classList.remove('hidden');passPage.style.display='block'}
      fhqRenderPass();window.scrollTo(0,0);return;
    }

    if(section==='shop'){sitePage='shop';document.body.classList.add('shop-page');if(core)core.style.display='none';if(shopPage){shopPage.classList.remove('hidden');shopPage.style.display='block'}fhqLoadShop();window.scrollTo(0,0);return;}
    if(section==='locker'){sitePage='locker';document.body.classList.add('locker-page');if(core)core.style.display='none';if(lockerPage){lockerPage.classList.remove('hidden');lockerPage.style.display='block'}fhqRenderLocker();window.scrollTo(0,0);return;}
    if(section==='album'){sitePage='album';document.body.classList.add('album-page');if(core)core.style.display='none';if(albumPage){albumPage.classList.remove('hidden');albumPage.style.display='block'}fhqLoadCollections();window.scrollTo(0,0);return;}
    if(section==='admin'){
      sitePage='admin';
      document.body.classList.add('admin-page');
      if(core)core.style.display='none';
      if(admin){admin.classList.add('show');admin.style.display='block'}
      const note=document.getElementById('fhqAdminNote');
      if(note){note.classList.add('v70-quick');note.textContent='Quick Admin mode. Use Run Full Audit only when you need a fresh database scan.'}
      // V70: opening Admin is lightweight. Heavy database auditing is explicitly opt-in.
      openFootballHQAdminTab('overview');
      window.scrollTo(0,0);
      return;
    }

    if(section==='games'){
      sitePage='games';
      document.body.classList.add('games-page');
      if(core)core.style.display='none';
      if(gamesHub){gamesHub.classList.remove('hidden');gamesHub.style.display='block'}
      window.scrollTo(0,0);
      return;
    }

    if(section==='leaderboard'){
      sitePage='leaderboard';
      document.body.classList.add('leaderboard-page');
      if(core)core.style.display='none';
      if(leader){leader.classList.remove('hidden');leader.style.display='block'}
      renderStandaloneLeaderboard();
      window.scrollTo(0,0);
      return;
    }

    if(section==='rankings'){
      sitePage='rankings';
      document.body.classList.add('rankings-page');
      if(core)core.style.display='block';

      const rankings=document.getElementById('rankingsStandalone');
      if(rankings)rankings.style.display='block';

      /* Hide every Draft flow panel while Rankings is open. */
      ['draftLanding','simSetup','draftWaitingRoom','draftControls','simRoom','draftTabsShell','draftChatPanel'].forEach(function(id){
        const el=document.getElementById(id);if(el)el.style.display='none';
      });

      restoreRankingsView();
      updateFootballHQRankingsStatus();
      window.scrollTo(0,0);
      return;
    }

    if(section==='draft'){
      sitePage='draft';
      document.body.classList.add('draft-page');
      if(core)core.style.display='block';

      const rankings=document.getElementById('rankingsStandalone');
      if(rankings)rankings.style.display='none';

      if(simulatorActive){
        draftFlowStage='live';
        document.body.classList.add('draft-flow-live');
        renderDraftFlowStage();
        updateDraftUI();
        switchDraftTab(activeDraftTab||'players');
        resumeDraftAfterNavigation();
        if(typeof updateDraftResumeNote==='function')updateDraftResumeNote();
      }else{
        draftFlowStage='choice';
        document.body.classList.add('draft-flow-landing');
        renderDraftFlowStage();
      }

      window.scrollTo(0,0);
      return;
    }

    /* Safety fallback */
    openFootballHQSection('home');
  }

function savedDailyFinishedForGame(game){
    try{
      const raw=localStorage.getItem('footballDailyV9:'+dailyDateKey()+':'+game);
      const s=JSON.parse(raw||'null');
      return !!(s&&s.finished);
    }catch(e){return false}
  }

function scheduleDraftPlayerSearch(value){
  fhqDraftPlayerSearchValue=String(value||'');
  clearTimeout(fhqDraftSearchTimer);
  fhqDraftSearchTimer=setTimeout(function(){
    if(sitePage==='draft')renderPlayers(fhqDraftPlayerSearchValue);
  },70);
}

function scheduleRankingsRender(value){
  clearTimeout(fhqRankSearchTimer);
  fhqRankSearchTimer=setTimeout(function(){
    renderPlayers(String(value||''));
  },90);
}

function startRankingsHealthMonitor(){
  if(startRankingsHealthMonitor._started)return;
  startRankingsHealthMonitor._started=true;
  let lastCount=-1;
  setInterval(function(){
    if(isEditorMode)return;
    if(sitePage==='rankings'){
      ensureFootballHQRankingsMounted();
      const n=Array.isArray(players)?players.length:0;
      if(n!==lastCount){lastCount=n;updateFootballHQRankingsStatus();}
    }
    if((sitePage==='rankings'||sitePage==='draft')&&Array.isArray(players)&&players.length<500){
      scheduleTop500Extension(0);
    }
  },2500);
}

/* Authoritative first-page repair. */
function fhqV8836ForceHome(){
  try{
    if(typeof openFootballHQSection==='function') openFootballHQSection('home');
  }catch(e){ console.error('FootballHQ Home boot repair failed',e); }
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){setTimeout(fhqV8836ForceHome,0);});
}else{
  setTimeout(fhqV8836ForceHome,0);
}
