
(function(){
  'use strict';

  /* ---------- COLLECTION OPENING: delegated click hotfix ----------
     Delegation survives every innerHTML re-render, unlike per-card handlers.
  ------------------------------------------------------------------ */
  function esc822(s){
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function enhanceCollectionCovers(){
    var root=document.getElementById('fhqAlbumGrid');
    if(!root) return;
    root.querySelectorAll('[data-open-set]').forEach(function(card){
      if(card.querySelector('.fhq-v822-view-set')) return;
      var bottom=card.querySelector('.fhq-collection-cover-bottom');
      if(bottom){
        var view=document.createElement('div');
        view.className='fhq-v822-view-set';
        view.textContent='VIEW COLLECTION →';
        bottom.appendChild(view);
      }
      card.setAttribute('aria-label','View '+(card.getAttribute('data-open-set')||'collection'));
    });
  }

  /* Wrap the existing renderer without replacing its collection data logic. */
  var priorRender=window.fhqRenderCollections;
  if(typeof priorRender==='function'){
    window.fhqRenderCollections=function(state){
      var out=priorRender.apply(this,arguments);
      setTimeout(enhanceCollectionCovers,0);
      return out;
    };
  }

  /* Capture-phase delegation makes opening reliable even if another old
     click handler stops bubbling. It changes UI state only. */
  document.addEventListener('click',function(e){
    var cover=e.target && e.target.closest ? e.target.closest('[data-open-set]:not([data-v823-set])') : null;
    if(cover && document.getElementById('fhqAlbumGrid') &&
       document.getElementById('fhqAlbumGrid').contains(cover)){
      e.preventDefault();
      e.stopPropagation();
      var setName=cover.getAttribute('data-open-set');
      if(!setName) return;

      /* Use the V82 renderer's existing state/open-set path when available.
         v82OpenSet is lexical in V82, so trigger its already-bound onclick
         only if it exists; otherwise open by finding the matching data in
         the currently rendered state through the original renderer. */
      if(typeof cover.onclick==='function'){
        cover.onclick.call(cover,e);
      } else {
        /* Fallback: the V82 cover normally has onclick assigned after render.
           Re-render once, then invoke the newly bound matching cover. */
        if(typeof window.fhqRenderCollections==='function'){
          var root=document.getElementById('fhqAlbumGrid');
          var before=root.innerHTML;
          window.fhqRenderCollections();
          var retry=[].slice.call(root.querySelectorAll('[data-open-set]')).find(function(x){
            return x.getAttribute('data-open-set')===setName;
          });
          if(retry && typeof retry.onclick==='function') retry.onclick.call(retry,e);
          else if(root.innerHTML===before) console.warn('V82.2: collection handler unavailable for',setName);
        }
      }
    }
  },true);

  /* Re-enhance after navigation/rendering without polling account state. */
  var observer=new MutationObserver(function(muts){
    var needs=false;
    for(var i=0;i<muts.length;i++){
      if(muts[i].target && (muts[i].target.id==='fhqAlbumGrid' ||
         (muts[i].target.closest && muts[i].target.closest('#fhqAlbumGrid')))){needs=true;break;}
    }
    if(needs) enhanceCollectionCovers();
  });
  if(document.body) observer.observe(document.body,{childList:true,subtree:true});
  enhanceCollectionCovers();

  /* Center current HQ Pass level after render, but do not alter XP/rewards. */
  function centerPassLevel(){
    var track=document.getElementById('fhqPassTrack');
    if(!track) return;
    var current=track.querySelector('.fhq-pass-reward.current');
    if(current && track.offsetParent!==null){
      var left=current.offsetLeft-(track.clientWidth-current.offsetWidth)/2;
      track.scrollLeft=Math.max(0,left);
    }
  }
  var priorPass=window.fhqRenderPass;
  if(typeof priorPass==='function'){
    window.fhqRenderPass=function(){
      var out=priorPass.apply(this,arguments);
      setTimeout(centerPassLevel,20);
      return out;
    };
  }
  setTimeout(function(){enhanceCollectionCovers();centerPassLevel();},150);
})();
