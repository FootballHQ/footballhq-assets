
(function(){
  window.FHQ_V883_SIGNATURE_READY = true;
  window.fhqRegisterSignatureExactArt = function(cardId, dataUrl){
    if(!cardId || !dataUrl) return false;
    window.FHQ_V88_RARITY_VARIANTS = window.FHQ_V88_RARITY_VARIANTS || {};
    window.FHQ_V88_RARITY_VARIANTS[String(cardId)+'::signature'] = dataUrl;
    return true;
  };
})();
