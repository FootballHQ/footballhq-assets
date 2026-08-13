
(function(){
  try{
    var ua=navigator.userAgent||'';
    var phoneUA=/iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var touchPhone=(navigator.maxTouchPoints||0)>1 && Math.min(screen.width||9999,screen.height||9999)<=900;
    if(phoneUA||touchPhone){
      document.body.classList.add('fhq-mobile-device');
      document.documentElement.classList.add('fhq-mobile-device-root');
    }
  }catch(e){}
})();
