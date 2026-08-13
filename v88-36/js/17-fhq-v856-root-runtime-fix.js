(function(){
  'use strict';

  function reclaimImageRenderer(){
    if(typeof window.fhqV85CardMarkup==='function')window.fhqCardArtHTML=window.fhqV85CardMarkup;
  }
  function root(){return document.getElementById('fhqAlbumGrid')}
  function state(){return window.__fhqLastCollectionsState||null}
  function hasHome(r){return !!(r&&(r.querySelector('.fhq-v823-cover[data-v823-set]')||r.querySelector('[data-fix3-set]')||r.querySelector('[data-open-set]')))}
  function hasDetail(r){return !!(r&&(r.querySelector('.fhq-v823-detail')||r.querySelector('.fhq-collection-detail')))}
  function render(s){
    reclaimImageRenderer();
    if(typeof window.fhqV823RenderCollections!=='function')throw new Error('Collections renderer unavailable.');
    window.fhqV823RenderCollections(s);
  }
  function home(attempt){
    attempt=Number(attempt||0);
    var s=state();
    if(!s||!s.sets){
      if(attempt<5)return setTimeout(function(){home(attempt+1)},50+attempt*40);
      return false;
    }
    window.__fhqOpenCollectionSet='';
    try{
      render(s);
      if(!hasHome(root()))throw new Error('Collection home did not finish rendering.');
      return true;
    }catch(err){
      console.warn('[Football HQ FIX4.1 collection home retry '+attempt+']',err);
      if(attempt<4)setTimeout(function(){home(attempt+1)},60+attempt*50);
      return false;
    }
  }
  function openSet(name,attempt){
    name=String(name||'');attempt=Number(attempt||0);
    var s=state();
    if(!s||!s.sets){
      if(attempt<5)return setTimeout(function(){openSet(name,attempt+1)},45+attempt*45);
      return home(0);
    }
    if(!Object.prototype.hasOwnProperty.call(s.sets,name))return home(0);
    try{
      window.__fhqOpenCollectionSet=name;
      render(s);
      if(!hasDetail(root()))throw new Error('Collection detail did not finish rendering.');
      try{window.scrollTo({top:0,behavior:'smooth'})}catch(_){window.scrollTo(0,0)}
    }catch(err){
      console.warn('[Football HQ FIX4.1 collection detail retry '+attempt+']',name,err);
      if(attempt<4)setTimeout(function(){openSet(name,attempt+1)},60+attempt*55);
      else home(0);
    }
  }

  window.fhqOpenModernCollection=function(name){
    requestAnimationFrame(function(){openSet(name,0)});
    return false;
  };

  document.addEventListener('click',function(e){
    var r=root();if(!r)return;
    var cover=e.target&&e.target.closest?e.target.closest('.fhq-v823-cover[data-v823-set]'):null;
    if(cover&&r.contains(cover)){
      e.preventDefault();e.stopImmediatePropagation();
      window.fhqOpenModernCollection(cover.getAttribute('data-v823-set'));
      return;
    }
    var back=e.target&&e.target.closest?e.target.closest('#fhqV823Back'):null;
    if(back&&r.contains(back)){
      e.preventDefault();e.stopImmediatePropagation();
      window.__fhqOpenCollectionSet='';
      requestAnimationFrame(function(){home(0);try{window.scrollTo({top:0,behavior:'smooth'})}catch(_){window.scrollTo(0,0)}});
    }
  },true);

  reclaimImageRenderer();
  setTimeout(reclaimImageRenderer,0);
  setTimeout(reclaimImageRenderer,300);
  setTimeout(reclaimImageRenderer,900);
  window.FHQ_FIX41_COLLECTIONS=true;
})();