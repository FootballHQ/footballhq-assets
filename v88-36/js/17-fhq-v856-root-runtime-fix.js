
(function(){
  'use strict';

  function reclaimImageRenderer(){
    if(typeof window.fhqV85CardMarkup==='function'){
      window.fhqCardArtHTML=window.fhqV85CardMarkup;
    }
  }
  reclaimImageRenderer();

  function showCollectionRenderError(err,setName){
    try{
      console.error('[Football HQ V85.6 collection render]',setName,err);
      var root=document.getElementById('fhqAlbumGrid');
      if(!root)return;
      root.innerHTML=
        '<div style="max-width:760px;margin:70px auto;padding:28px;border:1px solid #35586a;border-radius:18px;background:#101b22;color:#eef9ff;text-align:center">'+
          '<h2 style="margin:0 0 10px">Collection could not render</h2>'+
          '<p style="color:#91a8b5;margin:0 0 10px">Football HQ caught the collection error instead of leaving this button unresponsive.</p>'+
          '<p style="color:#66808f;font-size:11px;margin:0 0 18px">'+fhqV85EscapeHTML(err&&err.message?err.message:String(err||''))+'</p>'+
          '<button type="button" id="fhqV856CollectionRetry" style="border:1px solid #4cc9ff;background:#176b91;color:#fff;border-radius:10px;padding:11px 18px;font-weight:900">BACK TO COLLECTIONS</button>'+
        '</div>';
      var b=document.getElementById('fhqV856CollectionRetry');
      if(b)b.onclick=function(){
        window.__fhqOpenCollectionSet='';
        if(typeof window.fhqV823RenderCollections==='function'){
          window.fhqV823RenderCollections(window.__fhqLastCollectionsState);
        }
      };
    }catch(_){}
  }

  window.fhqOpenModernCollection=function(setName){
    setName=String(setName||'');
    try{
      reclaimImageRenderer();

      var state=window.__fhqLastCollectionsState;
      if(!state || !state.sets)throw new Error('Collections state is unavailable.');
      if(!Object.prototype.hasOwnProperty.call(state.sets,setName)){
        throw new Error('Collection set not found: '+setName);
      }
      if(typeof window.fhqV823RenderCollections!=='function'){
        throw new Error('Modern Collections renderer is unavailable.');
      }

      window.__fhqOpenCollectionSet=setName;
      window.fhqV823RenderCollections(state);

      var root=document.getElementById('fhqAlbumGrid');
      if(!root || !root.querySelector('.fhq-v823-detail')){
        throw new Error('Detail renderer returned without creating the collection detail screen.');
      }

      try{window.scrollTo({top:0,behavior:'smooth'});}
      catch(_scroll){window.scrollTo(0,0);}
      return false;
    }catch(err){
      showCollectionRenderError(err,setName);
      return false;
    }
  };

  document.addEventListener('click',function(e){
    var root=document.getElementById('fhqAlbumGrid');
    if(!root)return;

    var cover=e.target && e.target.closest
      ? e.target.closest('.fhq-v823-cover[data-v823-set]')
      : null;

    if(cover && root.contains(cover)){
      e.preventDefault();
      e.stopPropagation();
      window.fhqOpenModernCollection(cover.getAttribute('data-v823-set'));
      return;
    }

    var back=e.target && e.target.closest ? e.target.closest('#fhqV823Back') : null;
    if(back && root.contains(back)){
      e.preventDefault();
      e.stopPropagation();
      window.__fhqOpenCollectionSet='';
      try{
        reclaimImageRenderer();
        window.fhqV823RenderCollections(window.__fhqLastCollectionsState);
        try{window.scrollTo({top:0,behavior:'smooth'});}catch(_){window.scrollTo(0,0);}
      }catch(err){
        showCollectionRenderError(err,'BACK');
      }
    }
  },false);

  /* Deferred legacy startup code can overwrite globals after DOMContentLoaded.
     Reclaim once immediately and again after startup settles. */
  setTimeout(reclaimImageRenderer,0);
  setTimeout(reclaimImageRenderer,500);
  setTimeout(reclaimImageRenderer,1500);
})();
