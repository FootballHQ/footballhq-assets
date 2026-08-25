
(function(){
  try{
    var n=Number(localStorage.getItem('footballHQCoinDisplayV2'))||0;
    var e=document.getElementById('fhqGlobalCoins'); if(e)e.textContent=String(n);
  }catch(err){}
})();

/* Worker authentication is handled by the authoritative receiver in
   109-turf-home3-polish-v8961.js. Keeping auth out of this older script avoids
   duplicate message listeners and preserves the existing TURF runtime unchanged. */
