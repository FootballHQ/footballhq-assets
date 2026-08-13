
/* ===================== FOOTBALL HQ V81 — COLLECTIBLE ART OVERRIDES ===================== */
(function(){
  function v81SetInfo(card){
    var setName=String((card&&card.set)||'Football HQ');
    var catalog=[];
    try{ if(typeof FHQ_CARD_CATALOG_FALLBACK!=='undefined' && Array.isArray(FHQ_CARD_CATALOG_FALLBACK)) catalog=FHQ_CARD_CATALOG_FALLBACK; }catch(e){}
    try{
      if(Array.isArray(window.__fhqCardCatalog)&&window.__fhqCardCatalog.length) catalog=window.__fhqCardCatalog;
    }catch(e){}
    var setCards=catalog.filter(function(x){return String(x&&x.set||'')===setName});
    var id=String((card&& (card.id||card.value))||'');
    var index=setCards.findIndex(function(x){return String(x&&x.id||'')===id});
    if(index<0){
      var legacy=Math.abs(Array.from(id||setName).reduce(function(a,c){return a+c.charCodeAt(0)},0));
      index=setCards.length?legacy%setCards.length:0;
    }
    return {name:setName,index:index+1,total:setCards.length||1};
  }
  function v81SetSlug(setName){
    var s=String(setName||'').toLowerCase();
    if(s.indexOf('sunday')>=0)return 'sunday';
    if(s.indexOf('gridiron')>=0)return 'iq';
    if(s.indexOf('game day')>=0)return 'moments';
    if(s.indexOf('fantasy')>=0)return 'warroom';
    return 'hq';
  }
  function v81SetEmblem(setName,color){
    var slug=v81SetSlug(setName), c=color||'#7bd7ff';
    if(slug==='sunday')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15h16v4H4zM6 10h12l2 5H4z" fill="none" stroke="'+c+'" stroke-width="2"/><path d="M7 9c0-3 2-5 5-5s5 2 5 5" fill="none" stroke="'+c+'" stroke-width="2"/></svg>';
    if(slug==='iq')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5zM9 5v14M15 5v14M5 10h14M5 15h14" fill="none" stroke="'+c+'" stroke-width="1.7"/><circle cx="15" cy="10" r="2" fill="'+c+'"/></svg>';
    if(slug==='moments')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v5c0 5-2 8-5 10-3-2-5-5-5-10zM7 6H3c0 4 2 6 5 6M17 6h4c0 4-2 6-5 6M12 19v2" fill="none" stroke="'+c+'" stroke-width="1.8"/></svg>';
    if(slug==='warroom')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v12H4zM8 20h8M12 17v3" fill="none" stroke="'+c+'" stroke-width="1.8"/><path d="m7 14 3-3 2 2 5-6" fill="none" stroke="'+c+'" stroke-width="1.8"/></svg>';
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6z" fill="none" stroke="'+c+'" stroke-width="1.8"/><text x="12" y="14" text-anchor="middle" fill="'+c+'" font-size="6" font-weight="900">HQ</text></svg>';
  }
  function v81SceneType(name){
    name=String(name||'').toLowerCase();
    if(name.indexOf('couch')>=0||name.indexOf('sleeper')>=0)return 'fan';
    if(name.indexOf('pick six')>=0||name.indexOf('coverage')>=0||name.indexOf('blitz')>=0||name.indexOf('red zone stand')>=0||name.indexOf('goal line')>=0)return 'defender';
    if(name.indexOf('clock')>=0||name.indexOf('two-minute')>=0||name.indexOf('overtime')>=0)return 'coach';
    if(name.indexOf('waiver')>=0||name.indexOf('trade')>=0||name.indexOf('value')>=0||name.indexOf('draft')>=0||name.indexOf('stash')>=0||name.indexOf('handcuff')>=0||name.indexOf('boom')>=0)return 'manager';
    if(name.indexOf('hail')>=0||name.indexOf('drive')>=0||name.indexOf('route')>=0||name.indexOf('opening')>=0)return 'receiver';
    if(name.indexOf('kick')>=0)return 'kicker';
    if(name.indexOf('snow')>=0)return 'snow';
    if(name.indexOf('oracle')>=0||name.indexOf('wizard')>=0||name.indexOf('artist')>=0||name.indexOf('master')>=0)return 'oracle';
    if(name.indexOf('watch')>=0||name.indexOf('film')>=0||name.indexOf('stat')>=0||name.indexOf('redzone addict')>=0)return 'screen';
    if(name.indexOf('remote')>=0)return 'remote';
    if(name.indexOf('snack')>=0)return 'snack';
    if(name.indexOf('championship')>=0||name.indexOf('winner')>=0)return 'champion';
    if(name.indexOf('coin toss')>=0)return 'coin';
    return 'player';
  }
  function v81Scene(kind,p,name){
    var a=p[0],b=p[1],c=p[2],w='#eefaff',dark='#061019';
    var stadium='<path d="M4 55Q36 35 68 55V73H4Z" fill="'+dark+'" opacity=".62"/><path d="M8 57Q36 42 64 57" fill="none" stroke="'+c+'" stroke-opacity=".35" stroke-width="1.2"/><path d="M15 62h42M20 67h32" stroke="'+c+'" stroke-opacity=".18" stroke-width=".7"/>';
    if(kind==='fan')return stadium+'<rect x="8" y="13" width="24" height="17" rx="2" fill="'+b+'" stroke="'+c+'" stroke-width="1.2"/><path d="M12 25h16M19 30v5h3v-5" stroke="'+w+'" stroke-width="1"/><path d="M38 45c0-8 5-13 11-13s11 5 11 13v16H38z" fill="'+a+'" stroke="'+c+'" stroke-width="1.5"/><circle cx="49" cy="26" r="7" fill="'+c+'" opacity=".72"/><path d="M39 53h21M42 61v7M57 61v7" stroke="'+w+'" stroke-width="1.8"/><path d="M43 23c4-6 9-6 13 0" stroke="'+w+'" stroke-width="1.3"/>';
    if(kind==='defender')return stadium+'<circle cx="23" cy="22" r="7" fill="'+a+'" stroke="'+c+'" stroke-width="1.5"/><path d="M14 51c1-14 4-22 10-22s11 8 15 20" fill="'+b+'" stroke="'+c+'" stroke-width="1.5"/><path d="M35 31c7 3 11 7 15 13" fill="none" stroke="'+w+'" stroke-width="2.2"/><ellipse cx="52" cy="28" rx="6" ry="3.5" transform="rotate(-24 52 28)" fill="#8b552e" stroke="'+w+'" stroke-width=".8"/><path d="M48 30c-4 5-6 10-6 15" fill="none" stroke="'+c+'" stroke-width="1.6"/><path d="M16 19h14" stroke="'+w+'" stroke-width="2"/>';
    if(kind==='coach')return stadium+'<circle cx="26" cy="24" r="7" fill="'+a+'" stroke="'+c+'" stroke-width="1.5"/><path d="M13 58c2-17 7-27 14-27s13 9 17 25" fill="'+b+'" stroke="'+c+'" stroke-width="1.6"/><rect x="40" y="14" width="23" height="26" rx="3" fill="#091821" stroke="'+c+'" stroke-width="1.5"/><text x="51.5" y="29" text-anchor="middle" fill="'+w+'" font-size="8" font-weight="900">0:12</text><path d="M30 34l14 9M45 45l9 13" stroke="'+w+'" stroke-width="1.6"/><rect x="10" y="46" width="18" height="12" rx="2" fill="'+a+'" stroke="'+c+'"/><path d="M14 50h10M14 54h7" stroke="'+w+'" stroke-width="1"/>';
    if(kind==='manager')return stadium+'<rect x="8" y="11" width="35" height="30" rx="3" fill="'+b+'" stroke="'+c+'" stroke-width="1.5"/><path d="M13 19h25M13 26h25M13 33h25M20 14v24M31 14v24" stroke="'+a+'" stroke-width="1"/><circle cx="25" cy="25" r="4" fill="'+c+'"/><circle cx="53" cy="29" r="7" fill="'+a+'" stroke="'+c+'" stroke-width="1.4"/><path d="M43 62c2-16 5-25 10-25 6 0 9 9 12 25" fill="'+b+'" stroke="'+c+'" stroke-width="1.4"/><path d="m48 48 5 5 10-14" fill="none" stroke="'+w+'" stroke-width="2"/>';
    if(kind==='receiver')return stadium+'<ellipse cx="48" cy="19" rx="7" ry="4" transform="rotate(-18 48 19)" fill="#89562f" stroke="'+w+'" stroke-width=".8"/><circle cx="27" cy="27" r="6" fill="'+a+'" stroke="'+c+'" stroke-width="1.3"/><path d="M17 57c2-15 5-23 10-23s9 6 14 18" fill="'+b+'" stroke="'+c+'" stroke-width="1.4"/><path d="M32 36c7-6 12-10 17-13M42 24l6-5 5 2" fill="none" stroke="'+w+'" stroke-width="2"/><path d="M15 62c12-9 26-11 42-3" fill="none" stroke="'+c+'" stroke-width="1.2" stroke-dasharray="2 2"/>';
    if(kind==='kicker')return stadium+'<path d="M50 11v27c0 7-5 11-14 11S22 45 22 38V11M36 49v17" fill="none" stroke="'+c+'" stroke-width="2.7"/><ellipse cx="20" cy="50" rx="5.5" ry="3" transform="rotate(-38 20 50)" fill="#8b562d" stroke="'+w+'" stroke-width=".8"/><path d="M15 55c10-2 17 1 21 7" fill="none" stroke="'+w+'" stroke-width="1.5"/>';
    if(kind==='snow')return stadium+'<circle cx="36" cy="31" r="13" fill="'+b+'" stroke="'+c+'" stroke-width="1.5"/><path d="M36 15v32M22 23l28 17M50 23 22 40" stroke="'+w+'" stroke-width="1.4"/><circle cx="14" cy="16" r="1.4" fill="'+w+'"/><circle cx="58" cy="11" r="1.1" fill="'+w+'"/><circle cx="61" cy="39" r="1.5" fill="'+w+'"/><circle cx="18" cy="43" r="1" fill="'+w+'"/>';
    if(kind==='oracle')return stadium+'<circle cx="36" cy="25" r="12" fill="'+a+'" stroke="'+c+'" stroke-width="1.7"/><path d="M17 65c3-19 10-31 19-31s16 12 19 31" fill="'+b+'" stroke="'+c+'" stroke-width="1.5"/><path d="m25 19 4-7 7 6 7-6 4 7" fill="none" stroke="'+w+'" stroke-width="1.7"/><circle cx="31" cy="25" r="1.4" fill="'+w+'"/><circle cx="41" cy="25" r="1.4" fill="'+w+'"/><path d="M13 14l4 2-4 2M58 12l-4 2 4 2" stroke="'+c+'" stroke-width="1.4" fill="none"/>';
    if(kind==='screen')return stadium+'<rect x="7" y="10" width="40" height="27" rx="3" fill="'+b+'" stroke="'+c+'" stroke-width="1.5"/><path d="M12 31l8-8 6 5 8-11 8 7" fill="none" stroke="'+c+'" stroke-width="2"/><circle cx="55" cy="31" r="7" fill="'+a+'" stroke="'+c+'" stroke-width="1.3"/><path d="M44 61c2-16 5-23 11-23s9 7 12 23" fill="'+b+'" stroke="'+c+'" stroke-width="1.4"/><path d="M23 38v7h8v-7M17 46h20" stroke="'+w+'" stroke-width="1.2"/>';
    if(kind==='remote')return stadium+'<rect x="27" y="8" width="18" height="44" rx="6" fill="'+b+'" stroke="'+c+'" stroke-width="1.8"/><circle cx="36" cy="18" r="5" fill="'+a+'"/><circle cx="32" cy="31" r="2" fill="'+w+'"/><circle cx="40" cy="31" r="2" fill="'+c+'"/><path d="M31 39h10M31 44h10" stroke="'+c+'" stroke-width="1.2"/><path d="M18 62h36" stroke="'+w+'" stroke-opacity=".35"/>';
    if(kind==='snack')return stadium+'<path d="M20 23h32l-5 38H25z" fill="'+a+'" stroke="'+c+'" stroke-width="1.6"/><path d="M18 23h36l-4-9H22z" fill="'+c+'"/><circle cx="31" cy="39" r="4" fill="#f0c667"/><circle cx="43" cy="45" r="4" fill="#dc8554"/><path d="M10 59c8-6 15-7 22-4" stroke="'+w+'" stroke-width="1.2" fill="none"/>';
    if(kind==='champion')return stadium+'<path d="M25 12h22v14c0 10-4 16-11 20-7-4-11-10-11-20z" fill="'+a+'" stroke="'+c+'" stroke-width="1.8"/><path d="M25 17H15c0 10 4 15 12 16M47 17h10c0 10-4 15-12 16M36 46v9M26 58h20" fill="none" stroke="'+w+'" stroke-width="1.8"/><path d="M13 65h46" stroke="'+c+'" stroke-width="1.2"/>';
    if(kind==='coin')return stadium+'<circle cx="36" cy="31" r="19" fill="'+a+'" stroke="'+c+'" stroke-width="2.5"/><circle cx="36" cy="31" r="13" fill="'+b+'" stroke="'+w+'" stroke-width="1.1"/><text x="36" y="35" text-anchor="middle" fill="'+w+'" font-size="10" font-weight="1000">HQ</text>';
    return stadium+'<circle cx="36" cy="23" r="8" fill="'+a+'" stroke="'+c+'" stroke-width="1.5"/><path d="M18 64c3-21 9-33 18-33s15 12 18 33" fill="'+b+'" stroke="'+c+'" stroke-width="1.5"/><path d="M28 20c4-6 12-6 16 0" stroke="'+w+'" stroke-width="1.5"/><path d="M24 44h24M30 52h12" stroke="'+c+'" stroke-width="2"/>';
  }

  window.fhqCardArtHTML=function(card){
    card=card||{};
    var rarity=String(card.rarity||'common');
    var p=(typeof fhqCardPalette==='function'?fhqCardPalette(rarity):['#617786','#173143','#8fa5b2']);
    var id=String(card.id||card.value||'hq-card');
    var safeId=('v81'+id).replace(/[^a-zA-Z0-9]/g,'').slice(-22)||'v81card';
    var set=v81SetInfo(card), kind=v81SceneType(card.name), slug=v81SetSlug(set.name);
    var num=String(set.index).padStart(2,'0')+'/'+String(set.total).padStart(2,'0');
    var defs='<defs>'+
      '<linearGradient id="v81bg'+safeId+'" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+p[1]+'"/><stop offset=".56" stop-color="'+p[0]+'"/><stop offset="1" stop-color="#061019"/></linearGradient>'+
      '<radialGradient id="v81glow'+safeId+'" cx="73%" cy="16%" r="65%"><stop stop-color="'+p[2]+'" stop-opacity=".52"/><stop offset=".55" stop-color="'+p[2]+'" stop-opacity=".09"/><stop offset="1" stop-color="'+p[2]+'" stop-opacity="0"/></radialGradient>'+
      '<pattern id="v81grain'+safeId+'" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".35" fill="#fff" opacity=".10"/><path d="M0 6h7" stroke="'+p[2]+'" stroke-opacity=".06" stroke-width=".5"/></pattern>'+
      '</defs>';
    var bg='<rect width="72" height="78" fill="url(#v81bg'+safeId+')"/><rect width="72" height="78" fill="url(#v81glow'+safeId+')"/><rect width="72" height="78" fill="url(#v81grain'+safeId+')" opacity=".55"/>'+
      '<path d="M0 13h72M0 64h72" stroke="'+p[2]+'" stroke-opacity=".18" stroke-width=".8"/>'+
      '<path d="M5 10 17 3M55 75l12-9" stroke="'+p[2]+'" stroke-opacity=".42" stroke-width="1.2"/>';
    var emblem=v81SetEmblem(set.name,p[2]);
    return '<div class="fhq-card-art v81 fhq-r-'+esc(rarity)+'" data-set="'+esc(slug)+'">'+
      '<span class="fhq-set-mark">'+emblem+'</span>'+
      '<span class="fhq-card-number">'+esc(num)+'</span>'+
      '<svg viewBox="0 0 72 78" aria-hidden="true">'+defs+bg+v81Scene(kind,p,card.name)+'</svg>'+
      '<div class="fhq-card-art-label"><strong>'+esc(card.name||'HQ Card')+'</strong>'+
      '<div class="fhq-card-subline"><span class="fhq-card-set-pill">'+esc(set.name)+'</span><span>'+esc(rarity)+'</span></div></div></div>';
  };
})();
