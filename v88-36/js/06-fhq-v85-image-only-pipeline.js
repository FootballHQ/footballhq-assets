
const FHQ_V85_CARD_IMAGES = window.FHQ_V85_CARD_IMAGES;
const FHQ_V85_PLACEHOLDER = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20360%20550%22%3E%0A%3Crect%20width%3D%22360%22%20height%3D%22550%22%20rx%3D%2220%22%20fill%3D%22%230b151d%22/%3E%0A%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22336%22%20height%3D%22526%22%20rx%3D%2216%22%20fill%3D%22%23111e27%22%20stroke%3D%22%2331586c%22%20stroke-width%3D%223%22/%3E%0A%3Cpath%20d%3D%22M180%20150%20250%20176v65c0%2061-27%20105-70%20133-43-28-70-72-70-133v-65Z%22%20fill%3D%22%23183243%22%20stroke%3D%22%2366d7ff%22%20stroke-width%3D%225%22/%3E%0A%3Ctext%20x%3D%22180%22%20y%3D%22250%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2256%22%20font-weight%3D%22900%22%3EHQ%3C/text%3E%0A%3Ctext%20x%3D%22180%22%20y%3D%22425%22%20text-anchor%3D%22middle%22%20fill%3D%22%2396afbd%22%20font-family%3D%22Arial%22%20font-size%3D%2219%22%20font-weight%3D%22700%22%20letter-spacing%3D%223%22%3EARTWORK%20COMING%20SOON%3C/text%3E%0A%3C/svg%3E";

function fhqV85ImageForCard(card) {
  if(!card) return FHQ_V85_PLACEHOLDER;
  const id=String(card.id || card.value || '');
  const rarity=(typeof fhqV87NormalizeRarity==='function'?fhqV87NormalizeRarity(card):String(card.rarity||'common').toLowerCase());
  const variantKey=id+'::'+rarity;
  if(window.FHQ_V88_RARITY_VARIANTS && window.FHQ_V88_RARITY_VARIANTS[variantKey]){
    return window.FHQ_V88_RARITY_VARIANTS[variantKey];
  }
  return FHQ_V85_CARD_IMAGES[id] || FHQ_V85_PLACEHOLDER;
}

function fhqV85EscapeHTML(value) {
  return String(value == null ? '' : value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function fhqV87NormalizeRarity(card) {
  let r=String(card && card.rarity || 'common').toLowerCase().trim();
  if(r==='mythic') return 'mythic';
  if(r==='obsidian' || r==='mythic obsidian') return 'obsidian';
  if(r==='signature series' || r==='signature-series' || r==='signature') return 'signature';
  if(r==='legendary') return 'legendary';
  if(r==='epic') return 'epic';
  if(r==='rare') return 'rare';
  if(r==='uncommon') return 'uncommon';
  return 'common';
}

function fhqV87DisplayRarity(card) {
  const r=fhqV87NormalizeRarity(card);
  return r==='signature'?'SIGNATURE SERIES':r.toUpperCase();
}

function fhqV85CardMarkup(card) {
  const src = fhqV85ImageForCard(card);
  const id = String(card && (card.id || card.value) || '');
  const rarity = fhqV87NormalizeRarity(card);
  const variantKey = id+'::'+rarity;
  const hasExact = !!(
    (window.FHQ_V88_RARITY_VARIANTS && window.FHQ_V88_RARITY_VARIANTS[variantKey]) ||
    FHQ_V85_CARD_IMAGES[id]
  );
  const nm = fhqV85EscapeHTML(String(card && card.name || 'Football HQ Card'));
  return '<div class="fhq-v85-card-img-wrap fhq-v88-art-only" data-card-id="'+fhqV85EscapeHTML(id)+'" data-card-set="'+fhqV85EscapeHTML(String(card&&card.set||''))+'" data-rarity="'+rarity+'" data-exact="'+(hasExact?'1':'0')+'">'+
    '<img class="fhq-v85-card-img" src="'+src+'" alt="'+nm+'" loading="lazy" decoding="async" draggable="false">'+
  '</div>';
}
