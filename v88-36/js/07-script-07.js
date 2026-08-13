
(function(){
  try{
    var n=Number(localStorage.getItem('footballHQCoinDisplayV2'))||0;
    var e=document.getElementById('fhqGlobalCoins'); if(e)e.textContent=String(n);
  }catch(err){}
})();
