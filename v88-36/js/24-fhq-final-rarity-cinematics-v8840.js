/* FootballHQ V88.40 — CLEAN REVEAL / NO MID-ANIMATION CARD ART
   Common -> Uncommon -> Rare -> Epic -> Legendary -> Obsidian -> Signature
   Signature = Shooting Star + Signature Series + Shockwave Crater
   Obsidian = Dark purple/amethyst + gold crystal-door destruction
*/
(function(){
  'use strict';
  if (window.__FHQ_V8840_RARITY_RUNTIME__) return;
  window.__FHQ_V8840_RARITY_RUNTIME__ = true;

  const ORDER = ['COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','OBSIDIAN','SIGNATURE'];
  const DURATION = {
    COMMON:3000, UNCOMMON:3400, RARE:3800, EPIC:4300,
    LEGENDARY:5000, OBSIDIAN:6200, SIGNATURE:7200
  };

  const style = document.createElement('style');
  style.id='fhq-v8837-rarity-style';
  style.textContent=`
  .fhq8837-cine{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;overflow:hidden;background:
    radial-gradient(circle at 50% 40%,rgba(92,45,126,.18),transparent 36%),
    linear-gradient(180deg,#05030a,#020104 72%,#000);opacity:0;pointer-events:none;transition:opacity .16s ease}
  .fhq8837-cine.on{opacity:1;pointer-events:auto}
  body.fhq8839-cinematic-active #fhqDuplicateOverlay{visibility:hidden!important;opacity:0!important;pointer-events:none!important}
  body.fhq8839-cinematic-active #fhqPackOverlay .fhq-pack-close{pointer-events:none!important;opacity:.25!important}
  body.fhq8839-cinematic-active #fhqPackOverlay{pointer-events:none!important}

  .fhq8837-cine *{box-sizing:border-box}
  .fhq8837-stage{position:absolute;inset:0;overflow:hidden;transform:translateZ(0)}
  .fhq8837-cardslot{position:absolute;left:50%;top:53%;width:min(34vw,330px);aspect-ratio:720/1040;
    transform:translate(-50%,-50%) scale(.82);opacity:0;border-radius:22px;z-index:50;
    background:linear-gradient(145deg,rgba(255,255,255,.025),rgba(255,255,255,.008));
    border:1px solid rgba(255,255,255,.08);box-shadow:0 40px 120px rgba(0,0,0,.72);will-change:transform,opacity}
  .fhq8837-cardslot img{display:none!important}
  .fhq8837-flash{position:absolute;left:50%;top:50%;width:280px;height:280px;transform:translate(-50%,-50%) scale(.2);border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,.95) 0 4%,rgba(255,230,167,.56) 9%,rgba(175,102,255,.22) 20%,transparent 56%);
    opacity:0;filter:blur(2px);z-index:42}
  .fhq8837-rarity-label{position:absolute;left:50%;top:13%;transform:translateX(-50%);font:900 clamp(12px,1.3vw,18px)/1 Arial;
    letter-spacing:.34em;text-transform:uppercase;color:#f3e5ff;opacity:0;z-index:55;text-shadow:0 0 24px currentColor}
  .fhq8837-particle{position:absolute;width:6px;height:6px;border-radius:50%;opacity:0;will-change:transform,opacity}
  .fhq8837-beam{position:absolute;left:50%;bottom:20%;width:4px;height:54%;transform-origin:bottom;background:linear-gradient(to top,rgba(255,214,112,.92),rgba(255,245,218,.4),transparent);
    opacity:0;filter:blur(1px)}
  .fhq8837-ring{position:absolute;left:50%;bottom:18%;width:180px;height:48px;border-radius:50%;border:3px solid rgba(255,223,149,.82);transform:translateX(-50%) scale(.2);opacity:0}
  .fhq8837-door{position:absolute;top:18%;bottom:16%;width:50%;background:linear-gradient(135deg,#0e0715,#1b0a27 55%,#08040d);border:1px solid rgba(177,104,255,.28);z-index:18;
    box-shadow:inset 0 0 70px rgba(132,63,197,.12)}
  .fhq8837-door.left{left:0;transform-origin:left center}.fhq8837-door.right{right:0;transform-origin:right center}
  .fhq8837-crystal{position:absolute;width:82px;height:125px;clip-path:polygon(50% 0,90% 28%,75% 100%,25% 100%,10% 28%);
    background:linear-gradient(150deg,#fff 0 4%,#a873ff 15%,#5b2395 48%,#251036 78%,#d4a449 100%);filter:drop-shadow(0 0 16px rgba(160,90,255,.38));z-index:28;opacity:0}
  .fhq8837-banner{position:absolute;left:50%;top:42%;width:min(720px,82vw);height:148px;transform:translate(-50%,-50%) scaleX(.05);opacity:0;z-index:34;
    border:1px solid rgba(255,225,150,.48);border-radius:28px;background:
    linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,201,87,.08) 35%,rgba(213,221,255,.08) 55%,rgba(219,119,255,.08));
    box-shadow:0 24px 80px rgba(0,0,0,.5), inset 0 0 42px rgba(255,224,160,.06)}
  .fhq8837-banner:before,.fhq8837-banner:after{content:"";position:absolute;top:50%;height:1px;width:28%;background:linear-gradient(90deg,transparent,#e6be67)}
  .fhq8837-banner:before{left:4%}.fhq8837-banner:after{right:4%;transform:scaleX(-1)}
  .fhq8837-banner strong{position:absolute;inset:0;display:grid;place-items:center;font:900 clamp(25px,4.3vw,58px)/1 Arial;letter-spacing:.16em;color:#fff7e2;
    text-shadow:0 0 12px rgba(255,216,125,.6),0 0 32px rgba(219,119,255,.2)}
  .fhq8837-star{position:absolute;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle,#fff 0 20%,#fff4cc 28%,#e7bc57 48%,rgba(255,210,92,.2) 66%,transparent 72%);
    box-shadow:0 0 24px #fff,0 0 56px rgba(255,212,104,.9),0 0 88px rgba(211,127,255,.35);z-index:40;opacity:0}
  .fhq8837-startrail{position:absolute;width:340px;height:26px;border-radius:999px;transform-origin:right center;
    background:linear-gradient(90deg,transparent,rgba(124,218,255,.45),rgba(223,126,255,.52),rgba(214,223,239,.8),rgba(255,202,77,.94),#fff5d3);
    filter:blur(4px);opacity:0;z-index:35}
  .fhq8837-chrome{position:absolute;inset:0;background:linear-gradient(115deg,transparent 0 32%,rgba(255,255,255,.28) 43%,rgba(208,230,255,.17) 48%,rgba(250,169,255,.16) 53%,transparent 64%);opacity:0;z-index:60;pointer-events:none}
  @keyframes fhq8837CardIn{0%{opacity:0;transform:translate(-50%,-50%) scale(.08) rotateY(-18deg)}55%{opacity:1;transform:translate(-50%,-50%) scale(1.08) rotateY(5deg)}78%{transform:translate(-50%,-50%) scale(.98) rotateY(-2deg)}100%{opacity:1;transform:translate(-50%,-50%) scale(1) rotateY(0)}}
  @keyframes fhq8837Flash{0%,100%{opacity:0;transform:translate(-50%,-50%) scale(.15)}25%{opacity:.95}60%{opacity:.32;transform:translate(-50%,-50%) scale(1.2)}}
  @keyframes fhq8837Ring{0%{opacity:.95;transform:translateX(-50%) scale(.2)}100%{opacity:0;transform:translateX(-50%) scale(5.4)}}
  @keyframes fhq8837Chrome{0%{opacity:0;transform:translateX(-120%)}25%{opacity:.8}100%{opacity:0;transform:translateX(120%)}}
  `;
  document.head.appendChild(style);

  function rarityFromNode(node){
    if(!node) return null;
    let s='';
    try{s=(node.textContent||'')+' '+(node.innerHTML||'');}catch(_){}
    s=s.toUpperCase();
    for(let i=ORDER.length-1;i>=0;i--) if(s.includes(ORDER[i])) return ORDER[i];
    const img=node.querySelector?.('img');
    const src=((img&&img.src)||'').toUpperCase();
    if(src.includes('TG024')) return 'SIGNATURE';
    if(src.includes('TG023')||src.includes('TG020-OBSIDIAN')) return 'OBSIDIAN';
    return null;
  }

  function extractImage(node){
    const img=node?.querySelector?.('img');
    return img?.src||'';
  }

  function particles(stage, count, colors){
    for(let i=0;i<count;i++){
      const p=document.createElement('i'); p.className='fhq8837-particle';
      p.style.left=(18+Math.random()*64)+'%';
      p.style.top=(35+Math.random()*42)+'%';
      p.style.background=colors[i%colors.length];
      p.style.boxShadow='0 0 12px '+colors[i%colors.length];
      stage.appendChild(p);
      const dx=(Math.random()-.5)*520, dy=-(80+Math.random()*360), rot=(Math.random()*440-220);
      p.animate([
        {opacity:0,transform:'translate(0,0) scale(.4)'},
        {opacity:.95,offset:.15},
        {opacity:0,transform:`translate(${dx}px,${dy}px) scale(${.5+Math.random()*1.2}) rotate(${rot}deg)`}
      ],{duration:950+Math.random()*750,delay:260+Math.random()*320,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
    }
  }


  let cinematicDepth=0;
  let pendingDuplicateRestore=null;

  function lockGameForCinematic(){
    cinematicDepth++;
    document.body.classList.add('fhq8839-cinematic-active');

    const dup=document.getElementById('fhqDuplicateOverlay');
    if(dup && !pendingDuplicateRestore){
      pendingDuplicateRestore={
        node:dup,
        style:dup.getAttribute('style'),
        aria:dup.getAttribute('aria-hidden')
      };
    }
  }

  function unlockGameAfterCinematic(){
    cinematicDepth=Math.max(0,cinematicDepth-1);
    if(cinematicDepth>0) return;

    document.body.classList.remove('fhq8839-cinematic-active');

    // If the old duplicate system opened while the cinematic was playing,
    // allow that conversion screen to appear only now.
    if(pendingDuplicateRestore){
      const d=pendingDuplicateRestore.node;
      if(d && d.isConnected){
        if(pendingDuplicateRestore.style===null) d.removeAttribute('style');
        else d.setAttribute('style',pendingDuplicateRestore.style);

        // Do NOT force aria-hidden back to true if the old duplicate runtime
        // already opened it during the cinematic.
        const nowAria=d.getAttribute('aria-hidden');
        if(nowAria!=='false' && pendingDuplicateRestore.aria!==null){
          d.setAttribute('aria-hidden',pendingDuplicateRestore.aria);
        }
      }
      pendingDuplicateRestore=null;
    }
  }

  function buildBase(rarity, imgSrc){
    lockGameForCinematic();
    const o=document.createElement('div'); o.className='fhq8837-cine';
    o.innerHTML='<div class="fhq8837-stage"></div><div class="fhq8837-rarity-label">'+rarity+'</div>';
    const stage=o.querySelector('.fhq8837-stage');
    const flash=document.createElement('div'); flash.className='fhq8837-flash'; stage.appendChild(flash);

    // IMPORTANT V88.40:
    // Never inject the carousel <img> into the cinematic. Some carousel images
    // are art-only crops/preloads, which caused square art and wrong-card flashes.
    // The actual finished card remains underneath in the real carousel and is
    // revealed only when this overlay fades away.
    const card=document.createElement('div'); card.className='fhq8837-cardslot';
    stage.appendChild(card);

    const chrome=document.createElement('div'); chrome.className='fhq8837-chrome'; stage.appendChild(chrome);
    document.body.appendChild(o);
    requestAnimationFrame(()=>o.classList.add('on'));
    return {o,stage,flash,card,chrome,label:o.querySelector('.fhq8837-rarity-label')};
  }

  function finish(ctx, duration){
    const fadeAt=Math.max(500,duration-620);
    setTimeout(()=>{
      // Final reveal event: flash, then fade the cinematic away to expose the
      // actual finished card already centered in the real pack carousel.
      ctx.flash.style.animation='none';
      void ctx.flash.offsetWidth;
      ctx.flash.style.animation='fhq8837Flash .58s ease-out both';
      ctx.o.style.transition='opacity .52s cubic-bezier(.2,.8,.2,1)';
      setTimeout(()=>ctx.o.classList.remove('on'),120);
    },fadeAt);

    setTimeout(()=>{
      ctx.o.remove();
      unlockGameAfterCinematic();
    },duration+40);
  }

  function revealCard(ctx, delay, rarity){
    setTimeout(()=>{
      ctx.flash.style.animation='fhq8837Flash .78s ease-out both';
      ctx.label.animate(
        [{opacity:0,transform:'translateX(-50%) translateY(-8px)'},
         {opacity:1,transform:'translateX(-50%) translateY(0)'}],
        {duration:430,fill:'both'}
      );

      // A restrained mystery-card silhouette gives the reveal a focal point
      // without ever showing the wrong artwork.
      ctx.card.animate([
        {opacity:0,transform:'translate(-50%,-50%) scale(.72)'},
        {opacity:.18,transform:'translate(-50%,-50%) scale(.96)',offset:.58},
        {opacity:0,transform:'translate(-50%,-50%) scale(1.04)'}
      ],{duration:900,easing:'cubic-bezier(.18,.8,.2,1)',fill:'both'});

      setTimeout(()=>ctx.chrome.style.animation='fhq8837Chrome .8s ease both',420);
    },delay);
  }

  function common(ctx){
    const locker=document.createElement('div');
    locker.style.cssText='position:absolute;left:50%;top:50%;width:390px;height:480px;transform:translate(-50%,-50%);border:2px solid rgba(205,215,224,.35);background:linear-gradient(#182028,#0d1217);box-shadow:inset 0 0 50px rgba(255,255,255,.03);z-index:12';
    locker.innerHTML='<span style="position:absolute;left:50%;top:0;bottom:0;width:2px;background:#05080b"></span>';
    ctx.stage.appendChild(locker);
    locker.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.94)'},{opacity:1,transform:'translate(-50%,-50%) scale(1)'}],{duration:350,fill:'both'});
    setTimeout(()=>locker.animate([{opacity:1},{opacity:0,transform:'translate(-50%,-50%) scale(1.08)'}],{duration:500,fill:'both'}),650);
    revealCard(ctx,720,'COMMON'); finish(ctx,DURATION.COMMON);
  }

  function uncommon(ctx){
    ctx.stage.style.background='radial-gradient(circle at 50% 50%,rgba(68,255,151,.12),transparent 36%)';
    const tunnel=document.createElement('div'); tunnel.style.cssText='position:absolute;inset:10% 12%;border:3px solid rgba(80,255,150,.34);clip-path:polygon(8% 0,92% 0,100% 50%,92% 100%,8% 100%,0 50%);box-shadow:inset 0 0 80px rgba(67,255,154,.08)';
    ctx.stage.appendChild(tunnel);
    tunnel.animate([{transform:'scale(.55)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:650,easing:'ease-out',fill:'both'});
    revealCard(ctx,920,'UNCOMMON'); finish(ctx,DURATION.UNCOMMON);
  }

  function rare(ctx){
    const vault=document.createElement('div'); vault.style.cssText='position:absolute;left:50%;top:49%;width:440px;height:440px;border-radius:50%;transform:translate(-50%,-50%);border:18px double rgba(105,184,255,.48);box-shadow:0 0 70px rgba(69,158,255,.16),inset 0 0 80px rgba(72,155,255,.09)';
    ctx.stage.appendChild(vault);
    vault.animate([{transform:'translate(-50%,-50%) rotate(0)'},{transform:'translate(-50%,-50%) rotate(170deg)'}],{duration:900,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
    revealCard(ctx,1050,'RARE'); finish(ctx,DURATION.RARE);
  }

  function epic(ctx){
    const portal=document.createElement('div'); portal.style.cssText='position:absolute;left:50%;top:51%;width:360px;height:360px;border-radius:50%;transform:translate(-50%,-50%) scale(.2);border:8px solid rgba(194,92,255,.75);box-shadow:0 0 45px #8e37dc,0 0 100px rgba(118,34,179,.45),inset 0 0 60px rgba(219,132,255,.28);opacity:0';
    ctx.stage.appendChild(portal);
    portal.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.2) rotate(0)'},{opacity:1,transform:'translate(-50%,-50%) scale(1) rotate(220deg)'},{opacity:.25,transform:'translate(-50%,-50%) scale(1.3) rotate(330deg)'}],{duration:1500,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
    particles(ctx.stage,16,['#c263ff','#8d32d6','#ffffff']);
    revealCard(ctx,1250,'EPIC'); finish(ctx,DURATION.EPIC);
  }

  function legendary(ctx){
    for(let i=0;i<6;i++){
      const b=document.createElement('div'); b.className='fhq8837-beam';
      b.style.transform=`translateX(-50%) rotate(${(-38+i*15)}deg)`;
      b.style.left=(42+i*3.2)+'%'; ctx.stage.appendChild(b);
      b.animate([{opacity:0,transform:b.style.transform+' scaleY(.15)'},{opacity:.8,transform:b.style.transform+' scaleY(1)'},{opacity:.16}],{duration:1200,delay:i*70,fill:'both'});
    }
    particles(ctx.stage,22,['#ffd67c','#fff2c8','#e7b752']);
    revealCard(ctx,1450,'LEGENDARY'); finish(ctx,DURATION.LEGENDARY);
  }

  function obsidian(ctx){
    ctx.stage.style.background='radial-gradient(circle at 50% 48%,rgba(101,39,151,.23),transparent 38%),linear-gradient(#07030b,#010102)';
    const left=document.createElement('div'), right=document.createElement('div');
    left.className='fhq8837-door left'; right.className='fhq8837-door right';
    ctx.stage.append(left,right);
    const positions=[[13,35,-18],[22,60,22],[32,28,-8],[68,30,10],[77,58,-20],[86,37,18]];
    positions.forEach((a,i)=>{
      const c=document.createElement('div'); c.className='fhq8837-crystal'; c.style.left=a[0]+'%';c.style.top=a[1]+'%';c.style.transform=`rotate(${a[2]}deg) scale(.4)`;ctx.stage.appendChild(c);
      c.animate([{opacity:0,transform:`rotate(${a[2]}deg) scale(.35)`},{opacity:1,transform:`rotate(${a[2]}deg) scale(1.02)`,offset:.55},{opacity:.2,transform:`rotate(${a[2]+(i<3?18:-18)}deg) translate(${i<3?90:-90}px,-18px) scale(.82)`}],{duration:1450,delay:160+i*85,easing:'cubic-bezier(.18,.82,.2,1)',fill:'both'});
    });
    setTimeout(()=>{
      left.animate([{transform:'translateX(0) skewY(0)'},{transform:'translateX(-8%) skewY(-2deg)'},{transform:'translateX(-104%) skewY(-5deg)'}],{duration:920,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
      right.animate([{transform:'translateX(0) skewY(0)'},{transform:'translateX(8%) skewY(2deg)'},{transform:'translateX(104%) skewY(5deg)'}],{duration:920,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
      ctx.flash.style.animation='fhq8837Flash .8s ease-out both';
      particles(ctx.stage,28,['#8e49d5','#c99cff','#d5a64a','#fff1c8']);
    },1180);
    revealCard(ctx,1950,'OBSIDIAN'); finish(ctx,DURATION.OBSIDIAN);
  }

  function signature(ctx){
    ctx.stage.style.background='radial-gradient(circle at 50% 20%,rgba(255,224,145,.08),transparent 24%),radial-gradient(circle at 54% 48%,rgba(190,98,255,.08),transparent 32%)';
    const star=document.createElement('div');star.className='fhq8837-star';
    const trail=document.createElement('div');trail.className='fhq8837-startrail';
    ctx.stage.append(trail,star);

    // premium shooting-star pass across screen
    star.animate([
      {opacity:0,transform:'translate(-20vw,38vh) scale(.65)'},
      {opacity:1,offset:.08},
      {opacity:1,transform:'translate(112vw,24vh) scale(1.18)'}
    ],{duration:950,easing:'cubic-bezier(.22,.75,.25,1)',fill:'both'});
    trail.animate([
      {opacity:0,transform:'translate(-42vw,40vh) rotate(-6deg) scaleX(.35)'},
      {opacity:.95,offset:.12},
      {opacity:.74,transform:'translate(93vw,26vh) rotate(-6deg) scaleX(1.2)'},
      {opacity:0}
    ],{duration:1100,easing:'cubic-bezier(.22,.75,.25,1)',fill:'both'});
    particles(ctx.stage,18,['#ffd46c','#e7eef8','#f39eff','#74d8ff']);

    const banner=document.createElement('div');banner.className='fhq8837-banner';banner.innerHTML='<strong>SIGNATURE SERIES</strong>';ctx.stage.appendChild(banner);
    banner.animate([
      {opacity:0,transform:'translate(-50%,-50%) scaleX(.05)'},
      {opacity:1,transform:'translate(-50%,-50%) scaleX(1)',offset:.45},
      {opacity:1,transform:'translate(-50%,-50%) scaleX(1)',offset:.82},
      {opacity:0,transform:'translate(-50%,-58%) scaleX(1.03)'}
    ],{duration:1500,delay:620,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});

    // camera follows star upward, then star dives to center
    setTimeout(()=>{
      const dive=document.createElement('div');dive.className='fhq8837-star';ctx.stage.appendChild(dive);
      dive.animate([
        {opacity:0,transform:'translate(62vw,-10vh) scale(.8)'},
        {opacity:1,offset:.08},
        {opacity:1,transform:'translate(50vw,73vh) scale(1.55)'}
      ],{duration:930,easing:'cubic-bezier(.55,.02,.82,.2)',fill:'both'});
      setTimeout(()=>{
        dive.style.opacity='0';
        ctx.flash.style.animation='fhq8837Flash .8s ease-out both';
        const ring=document.createElement('div');ring.className='fhq8837-ring';ctx.stage.appendChild(ring);
        ring.style.animation='fhq8837Ring 1s ease-out both';
        ctx.o.animate([{transform:'translate(0,0)'},{transform:'translate(-7px,5px)',offset:.12},{transform:'translate(6px,-4px)',offset:.24},{transform:'translate(-4px,3px)',offset:.36},{transform:'translate(0,0)'}],{duration:480,fill:'both'});
        particles(ctx.stage,34,['#ffd36c','#fff1c0','#dce8f4','#f3a0ff','#80dcff']);
      },790);
    },1720);

    revealCard(ctx,2650,'SIGNATURE'); finish(ctx,DURATION.SIGNATURE);
  }

  let activeCinematic=false;
  const cinematicQueue=[];

  function runQueued(){
    if(activeCinematic || !cinematicQueue.length) return;
    const job=cinematicQueue.shift();
    activeCinematic=true;
    const ctx=buildBase(job.rarity,job.imgSrc);
    ({COMMON:common,UNCOMMON:uncommon,RARE:rare,EPIC:epic,LEGENDARY:legendary,OBSIDIAN:obsidian,SIGNATURE:signature}[job.rarity])(ctx);
    setTimeout(()=>{
      activeCinematic=false;
      runQueued();
    },DURATION[job.rarity]+340);
  }

  function play(rarity,imgSrc){
    if(!ORDER.includes(rarity)) return;
    cinematicQueue.push({rarity,imgSrc});
    runQueued();
  }

  // Public hook: existing pack code can call this directly.
  window.FHQ_playRarityCinematic = function(rarity, cardOrUrl){
    const r=String(rarity||'').toUpperCase();
    play(r,'');
  };

  // V88.38 — CAROUSEL-AWARE PACK HOOK
  // The V88.36 carousel rebuilds/updates its center card after the old reward DOM
  // has already been created, so watching only #fhqPackRewards children is too early.
  // This hook finds the largest visible card image inside the live pack overlay,
  // derives rarity from the card id / visible rarity text, and fires exactly once
  // when that image becomes the center card.

  const shownCinematics = new Set();
  let lastCenterKey = '';
  let scanTimer = 0;

  function normalizeRarityText(v){
    const r=String(v||'').trim().toUpperCase().replace(/[-_]/g,' ');
    if(r.includes('SIGNATURE')) return 'SIGNATURE';
    if(r.includes('OBSIDIAN')) return 'OBSIDIAN';
    if(r.includes('LEGENDARY')) return 'LEGENDARY';
    if(r.includes('EPIC')) return 'EPIC';
    if(r.includes('UNCOMMON')) return 'UNCOMMON';
    if(r.includes('RARE')) return 'RARE';
    if(r.includes('COMMON')) return 'COMMON';
    return null;
  }

  function visible(el){
    if(!el) return false;
    const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity||'1')<.04) return false;
    const r=el.getBoundingClientRect();
    return r.width>80 && r.height>100 && r.bottom>0 && r.right>0 &&
           r.top<innerHeight && r.left<innerWidth;
  }

  function scoreCardNode(node){
    const r=node.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    const dx=Math.abs(cx-innerWidth/2), dy=Math.abs(cy-innerHeight/2);
    return (r.width*r.height) - dx*520 - dy*180;
  }

  function findCenterCardNode(){
    const overlay=document.getElementById('fhqPackOverlay');
    if(!overlay || !visible(overlay)) return null;

    // Prefer the exact image-only wrappers because they carry both data-card-id
    // and data-rarity. Fall back to any descendant carrying those attributes.
    let nodes=[...overlay.querySelectorAll('.fhq-v85-card-img-wrap[data-card-id][data-rarity]')]
      .filter(visible);

    if(!nodes.length){
      nodes=[...overlay.querySelectorAll('[data-card-id][data-rarity]')].filter(visible);
    }
    if(!nodes.length) return null;

    nodes.sort((a,b)=>scoreCardNode(b)-scoreCardNode(a));
    return nodes[0];
  }

  function cardIdentity(node){
    if(!node) return null;
    const rarity=normalizeRarityText(node.dataset.rarity);
    const id=String(node.dataset.cardId||'').trim();
    if(!rarity) return null;
    return {rarity,id,key:rarity+'|'+id};
  }

  function scanLiveCarousel(force){
    clearTimeout(scanTimer);
    scanTimer=setTimeout(()=>{
      const node=findCenterCardNode();
      const info=cardIdentity(node);
      if(!info) return;

      // Require the same candidate to remain centered for a short settle period.
      // This prevents the outgoing/previous card from being queued during a slide.
      const candidateKey=info.key;
      setTimeout(()=>{
        const current=findCenterCardNode();
        const now=cardIdentity(current);
        if(!now || now.key!==candidateKey) return;

        if(!force && now.key===lastCenterKey) return;
        lastCenterKey=now.key;

        const overlay=document.getElementById('fhqPackOverlay');
        const session=(overlay && overlay.dataset.fhq8838Session)||'0';
        const sessionKey=session+'|'+now.key;
        if(shownCinematics.has(sessionKey)) return;
        shownCinematics.add(sessionKey);

        // No image is passed. The cinematic never displays card artwork itself.
        play(now.rarity,'');
      },260);
    },110);
  }

  function bindCarouselHook(){
    const overlay=document.getElementById('fhqPackOverlay');
    if(!overlay) return false;
    if(overlay.dataset.fhq8840Bound==='1') return true;
    overlay.dataset.fhq8840Bound='1';
    overlay.dataset.fhq8838Session=overlay.dataset.fhq8838Session||'0';

    let wasOpen=false;
    const updateSession=()=>{
      const nowOpen=visible(overlay);
      if(nowOpen && !wasOpen){
        const n=(parseInt(overlay.dataset.fhq8838Session||'0',10)||0)+1;
        overlay.dataset.fhq8838Session=String(n);
        lastCenterKey='';
        setTimeout(()=>scanLiveCarousel(true),420);
      }
      wasOpen=nowOpen;
    };

    const mo=new MutationObserver(()=>{
      updateSession();
      scanLiveCarousel(false);
    });
    mo.observe(overlay,{
      subtree:true,childList:true,attributes:true,
      attributeFilter:['class','style','src','aria-hidden','data-rarity','data-card-id']
    });

    overlay.addEventListener('click',()=>{
      // Do not force immediately on click; wait until carousel motion settles.
      setTimeout(()=>scanLiveCarousel(false),420);
      setTimeout(()=>scanLiveCarousel(false),720);
    },true);

    setInterval(()=>{
      updateSession();
      if(visible(overlay)) scanLiveCarousel(false);
    },650);

    updateSession();
    return true;
  }

  if(!bindCarouselHook()){
    const wait=setInterval(()=>{
      if(bindCarouselHook()) clearInterval(wait);
    },300);
    setTimeout(()=>clearInterval(wait),12000);
  }

  // V88.39 duplicate bridge:
  // old duplicate conversion may open during the rarity cinematic.
  // We suppress it until the cinematic ends, then release it.
  function bindDuplicateBridge(){
    const dup=document.getElementById('fhqDuplicateOverlay');
    if(!dup || dup.dataset.fhq8839Bound==='1') return !!dup;
    dup.dataset.fhq8839Bound='1';

    const mo=new MutationObserver(()=>{
      const opened=dup.getAttribute('aria-hidden')==='false' ||
                   dup.classList.contains('show') ||
                   dup.classList.contains('open') ||
                   parseFloat(getComputedStyle(dup).opacity||'0')>.1;
      if(opened && activeCinematic){
        if(!pendingDuplicateRestore){
          pendingDuplicateRestore={
            node:dup,
            style:dup.getAttribute('style'),
            aria:'false'
          };
        } else {
          pendingDuplicateRestore.aria='false';
        }
        dup.style.setProperty('visibility','hidden','important');
        dup.style.setProperty('opacity','0','important');
        dup.style.setProperty('pointer-events','none','important');
      }
    });
    mo.observe(dup,{attributes:true,attributeFilter:['class','style','aria-hidden']});
    return true;
  }

  if(!bindDuplicateBridge()){
    const dWait=setInterval(()=>{
      if(bindDuplicateBridge()) clearInterval(dWait);
    },300);
    setTimeout(()=>clearInterval(dWait),12000);
  }

  // Royal Obsidian asset fallback/override. This makes tg020 use the new design
  // even if CardAssetsExternal loads before this runtime.
  function installRoyalObsidian(){
    const map=window.FHQ_V85_CARD_IMAGES;
    if(!map) return;
    map.tg020='https://footballhq.github.io/footballhq-assets/001-gridiron/tg020-obsidian-v2.png';
  }
  installRoyalObsidian();
  setTimeout(installRoyalObsidian,700);
  setTimeout(installRoyalObsidian,1800);

  console.log('[FootballHQ] V88.40 clean rarity cinematics ready — data-rarity hook, no mid-animation artwork.');
})();
