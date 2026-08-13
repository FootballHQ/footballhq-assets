
/* FOOTBALL HQ V88.21 — PACK REVEAL ASSETS
   RAW JAVASCRIPT ONLY.
   Create an Apps Script HTML file named PackRevealAssets and paste this entire file.
   Do NOT add script tags.
*/
(function(){
  if(window.FHQRevealEngine)return;

  const DUR={
    common:1600,
    uncommon:2100,
    rare:3000,
    epic:3400,
    legendary:4300,
    obsidian:6800,
    signature:6200
  };

  const css=`
  #fhqCinematicReveal{
    position:fixed;inset:0;z-index:100500;display:none;place-items:center;
    background:radial-gradient(circle at 50% 45%,rgba(16,31,42,.58),rgba(0,0,0,.96) 72%);
    overflow:hidden;pointer-events:auto;
  }
  #fhqCinematicReveal.open{display:grid}
  #fhqCinematicReveal *{box-sizing:border-box}
  .fhq-cine-stage{position:relative;width:min(980px,96vw);height:min(760px,92vh);display:grid;place-items:center;perspective:1500px}
  .fhq-cine-mystery{
    position:relative;width:min(300px,58vw);aspect-ratio:5/7;border-radius:20px;z-index:20;
    border:2px solid #314856;background:radial-gradient(circle,#152631,#061018 68%);
    box-shadow:0 32px 100px #000,0 0 0 7px rgba(255,255,255,.02);
    overflow:hidden;display:grid;place-items:center;transform-style:preserve-3d
  }
  .fhq-cine-mystery:after{content:"HQ";font-size:78px;font-weight:1000;color:#263f4d}
  .fhq-cine-card{position:absolute;z-index:24;width:min(300px,58vw);aspect-ratio:5/7;opacity:0;transform:scale(.78) rotateY(86deg);filter:brightness(.35)}
  .fhq-cine-card .fhq-card-art,.fhq-cine-card .fhq-v834-fullart-card,.fhq-cine-card img{width:100%!important;height:100%!important;max-width:none!important}
  .fhq-cine-hit{
    position:fixed;left:50%;top:67%;transform:translate(-50%,-50%);z-index:40;
    font-size:clamp(31px,5.7vw,64px);font-weight:1000;letter-spacing:.15em;
    white-space:nowrap;opacity:0;text-align:center
  }
  .fhq-cine-fx{position:absolute;inset:0;pointer-events:none}
  .fhq-cine-line,.fhq-cine-ring,.fhq-cine-bolt,.fhq-cine-shard,.fhq-cine-paper,.fhq-cine-crack{position:absolute;opacity:0}
  .fhq-cine-skip{position:fixed;right:18px;bottom:18px;z-index:60;border:1px solid #506775;background:#08131a;color:#dcedf5;border-radius:10px;padding:9px 13px;font-weight:900;font-size:10px;letter-spacing:.08em}
  .fhq-cine-sub{position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:45;color:#7393a3;font-weight:900;font-size:10px;letter-spacing:.18em}

  /* COMMON — Yard-Line Flash */
  #fhqCinematicReveal.common{background:radial-gradient(circle,#1d252c 0,#080b0e 52%,#020304 100%)}
  #fhqCinematicReveal.common .fhq-cine-hit{color:#eef3f6;text-shadow:0 0 12px #d8e1e777}
  #fhqCinematicReveal.common .field{position:absolute;width:560px;height:320px;transform:perspective(600px) rotateX(62deg);background:repeating-linear-gradient(90deg,transparent 0 54px,#c7d1da22 55px 57px);border:1px solid #bbc5cd2f;opacity:0}
  #fhqCinematicReveal.common.run .field{animation:fhqCommonField 1.2s ease both}
  #fhqCinematicReveal.common .yardflash{left:22%;right:22%;top:50%;height:3px;background:linear-gradient(90deg,transparent,#fff,transparent);box-shadow:0 0 16px #dce5ec}
  #fhqCinematicReveal.common.run .yardflash{animation:fhqYardFlash 1.25s .25s ease both}
  @keyframes fhqCommonField{0%{opacity:0;transform:perspective(600px) rotateX(62deg) scale(.76)}35%,72%{opacity:.5;transform:perspective(600px) rotateX(62deg) scale(1)}100%{opacity:0}}
  @keyframes fhqYardFlash{0%,25%{opacity:0;transform:scaleX(.2)}48%,74%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(1.4)}}

  /* UNCOMMON — Field Sweep */
  #fhqCinematicReveal.uncommon{background:radial-gradient(circle,#11352a 0,#06140f 52%,#010403 100%)}
  #fhqCinematicReveal.uncommon .fhq-cine-hit{color:#e4fff5;text-shadow:0 0 14px #55e7b1,0 0 28px #1bb478}
  #fhqCinematicReveal.uncommon .ufield{position:absolute;width:620px;height:360px;border:1px solid #2aa77955;background:repeating-linear-gradient(90deg,transparent 0 61px,#49c89b22 62px 64px);transform:perspective(600px) rotateX(60deg);opacity:0}
  #fhqCinematicReveal.uncommon.run .ufield{animation:fhqUField 1.55s ease both}
  #fhqCinematicReveal.uncommon .usweep{left:12%;right:12%;height:5px;top:26%;background:linear-gradient(90deg,transparent,#b0ffe4,transparent);box-shadow:0 0 18px #55e1ae}
  #fhqCinematicReveal.uncommon.run .usweep{animation:fhqUSweep 1.55s .2s ease both}
  @keyframes fhqUField{0%{opacity:0;transform:perspective(600px) rotateX(60deg) scale(.65)}28%,72%{opacity:.82;transform:perspective(600px) rotateX(60deg) scale(1)}100%{opacity:0}}
  @keyframes fhqUSweep{0%,15%{opacity:0;transform:translateY(-120px)}36%,76%{opacity:1;transform:translateY(165px)}100%{opacity:0;transform:translateY(250px)}}

  /* RARE — Ice Break */
  #fhqCinematicReveal.rare{background:radial-gradient(circle,#12364d 0,#06131d 55%,#010408 100%)}
  #fhqCinematicReveal.rare .fhq-cine-hit{color:#e6faff;text-shadow:0 0 15px #78ddff,0 0 34px #278fc7}
  #fhqCinematicReveal.rare .icepane{position:absolute;left:50%;top:48%;width:510px;height:510px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(184,238,255,.15),rgba(69,155,199,.05) 55%,transparent 74%);opacity:0}
  #fhqCinematicReveal.rare.run .icepane{animation:fhqIcePane 2.35s ease both}
  #fhqCinematicReveal.rare .fhq-cine-crack{left:50%;top:49%;width:3px;height:245px;transform-origin:50% 0;background:linear-gradient(#fff,#a8ecff 30%,#4fb5e7 65%,transparent);box-shadow:0 0 10px #d8f9ff,0 0 18px #55c7f5}
  #fhqCinematicReveal.rare .c1{transform:rotate(15deg)}#fhqCinematicReveal.rare .c2{transform:rotate(82deg)}#fhqCinematicReveal.rare .c3{transform:rotate(151deg)}#fhqCinematicReveal.rare .c4{transform:rotate(221deg)}#fhqCinematicReveal.rare .c5{transform:rotate(293deg)}
  #fhqCinematicReveal.rare.run .fhq-cine-crack{animation:fhqCrack 2.2s ease both}
  #fhqCinematicReveal.rare .popring{position:absolute;left:50%;top:49%;width:110px;height:110px;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #b9f1ff;box-shadow:0 0 26px #7edcff,0 0 65px #299fd8;opacity:0}
  #fhqCinematicReveal.rare.run .popring{animation:fhqIcePop 2.65s ease both}
  @keyframes fhqIcePane{0%,12%{opacity:0;transform:translate(-50%,-50%) scale(.7)}32%,68%{opacity:.92;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.16)}}
  @keyframes fhqCrack{0%,28%{opacity:0;clip-path:inset(0 0 100% 0)}45%,76%{opacity:1;clip-path:inset(0)}100%{opacity:0}}
  @keyframes fhqIcePop{0%,68%{opacity:0;transform:translate(-50%,-50%) scale(.2)}78%{opacity:1;transform:translate(-50%,-50%) scale(.9)}100%{opacity:0;transform:translate(-50%,-50%) scale(4.2)}}

  /* EPIC — Fourth-Quarter Surge */
  #fhqCinematicReveal.epic{background:radial-gradient(circle,#3b1751 0,#100617 52%,#030104 100%)}
  #fhqCinematicReveal.epic .fhq-cine-hit{color:#f4e5ff;text-shadow:0 0 16px #bb6fed,0 0 35px #7d31ad}
  .epicclock{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);width:300px;height:170px;border:2px solid #8b4eb5;border-radius:18px;background:#100617;box-shadow:0 0 36px #9f53d455;display:grid;place-items:center;font-size:76px;font-weight:1000;color:#d7a6f4;text-shadow:0 0 20px #a95adb;opacity:0}
  #fhqCinematicReveal.epic.run .epicclock{animation:fhqEpicClock 2.0s ease both}
  .epicring{position:absolute;left:50%;top:48%;width:470px;height:470px;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #9f5fd0;border-left-color:transparent;border-bottom-color:transparent;opacity:0}
  #fhqCinematicReveal.epic.run .epicring{animation:fhqEpicRing 2.4s ease both}
  @keyframes fhqEpicClock{0%{opacity:0;transform:translate(-50%,-50%) scale(.7)}25%,76%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.25)}}
  @keyframes fhqEpicRing{0%{opacity:0;transform:translate(-50%,-50%) scale(.4) rotate(0)}32%,76%{opacity:.8;transform:translate(-50%,-50%) scale(1) rotate(230deg)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.7) rotate(430deg)}}

  /* LEGENDARY — Golden Storm */
  #fhqCinematicReveal.legendary{background:radial-gradient(circle,#4e3b0e 0,#110d04 54%,#020201 100%)}
  #fhqCinematicReveal.legendary .fhq-cine-hit{color:#fff5c4;text-shadow:0 0 16px #f0c848,0 0 40px #d39c1d}
  .goldring{position:absolute;left:50%;top:48%;width:560px;height:560px;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #c79a29;border-left-color:transparent;border-right-color:#ffdf75;box-shadow:0 0 35px #d3a32688;opacity:0}
  #fhqCinematicReveal.legendary.run .goldring{animation:fhqGoldRing 3.1s ease both}
  #fhqCinematicReveal.legendary .fhq-cine-bolt{left:50%;top:12%;width:7px;height:390px;background:linear-gradient(#fff,#ffe990 20%,#ffd95f 42%,#d4a126 70%,transparent);clip-path:polygon(45% 0,100% 0,64% 43%,92% 43%,25% 100%,45% 55%,10% 55%);filter:drop-shadow(0 0 12px #ffc935)}
  #fhqCinematicReveal.legendary .b1{transform:translateX(-50%)}#fhqCinematicReveal.legendary .b2{transform:translateX(-50%) rotate(31deg)}#fhqCinematicReveal.legendary .b3{transform:translateX(-50%) rotate(-31deg)}
  #fhqCinematicReveal.legendary.run .fhq-cine-bolt{animation:fhqBolt .62s 1.25s ease 3}
  @keyframes fhqGoldRing{0%{opacity:0;transform:translate(-50%,-50%) scale(.25) rotate(0)}30%,72%{opacity:.85;transform:translate(-50%,-50%) scale(1) rotate(360deg)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.9) rotate(760deg)}}
  @keyframes fhqBolt{0%,100%{opacity:0}34%,58%{opacity:1;filter:brightness(2.8) drop-shadow(0 0 18px #ffc935)}}

  /* OBSIDIAN — Event Horizon */
  #fhqCinematicReveal.obsidian{background:#000}
  #fhqCinematicReveal.obsidian .fhq-cine-hit{color:#eee9ff;text-shadow:0 0 18px #9f79ff,0 0 45px #5d2dcc}
  .vortex{position:absolute;left:50%;top:48%;width:640px;height:640px;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #7454d8;border-left-color:transparent;border-right-color:#b494ff;box-shadow:0 0 40px #6e4bf977;opacity:0}
  .vortex:after{content:"";position:absolute;inset:72px;border-radius:50%;border:3px solid #3b2f5f;border-top-color:#ad8cff}
  #fhqCinematicReveal.obsidian.run .vortex{animation:fhqVortex 4.6s ease both}
  .obs-slit{position:absolute;left:50%;top:48%;width:3px;height:0;transform:translate(-50%,-50%);background:linear-gradient(transparent,#fff 15%,#8b62ff 50%,#fff 85%,transparent);box-shadow:0 0 18px #9a76ff,0 0 55px #6a35e3;opacity:0}
  #fhqCinematicReveal.obsidian.run .obs-slit{animation:fhqObsSlit 5.2s ease both}
  .obs-shield{position:absolute;left:50%;top:48%;width:180px;height:210px;transform:translate(-50%,-50%) scale(.3);clip-path:polygon(50% 0,93% 16%,86% 70%,50% 100%,14% 70%,7% 16%);background:linear-gradient(145deg,#17131a,#020203 58%,#272033);box-shadow:0 0 55px #6e4ae9aa;display:grid;place-items:center;color:#baa9ff;font-size:52px;font-weight:1000;opacity:0}
  #fhqCinematicReveal.obsidian.run .obs-shield{animation:fhqObsShield 5.8s ease both}
  @keyframes fhqVortex{0%{opacity:0;transform:translate(-50%,-50%) scale(.05) rotate(0)}20%,50%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(620deg)}61%{opacity:0}78%{opacity:1;transform:translate(-50%,-50%) scale(1.3) rotate(260deg)}100%{opacity:0;transform:translate(-50%,-50%) scale(2.8) rotate(-180deg)}}
  @keyframes fhqObsSlit{0%,51%{opacity:0;height:0}58%,70%{opacity:1;height:72%}78%,100%{opacity:0;height:72%;width:80px}}
  @keyframes fhqObsShield{0%,62%{opacity:0;transform:translate(-50%,-50%) scale(.3)}70%,82%{opacity:1;transform:translate(-50%,-50%) scale(1)}91%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}100%{opacity:0;transform:translate(-50%,-50%) scale(2.5) rotate(8deg)}}

  /* SIGNATURE — Autograph Reveal */
  #fhqCinematicReveal.signature{background:radial-gradient(circle,#4f3a0d 0,#0e0a03 55%,#010101 100%)}
  #fhqCinematicReveal.signature .fhq-cine-hit{color:#fff5c4;text-shadow:0 0 16px #f0c848,0 0 42px #d39c1d}
  .sigsvg{position:absolute;left:50%;top:47%;width:min(700px,90vw);height:210px;transform:translate(-50%,-50%);z-index:18}
  .sigsvg path{fill:none;stroke:#ffe173;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:900;stroke-dashoffset:900;filter:drop-shadow(0 0 8px #ffc928) drop-shadow(0 0 24px #e4a800)}
  #fhqCinematicReveal.signature.run .sigsvg path{animation:fhqSignature 1.55s .8s ease forwards}
  .goldseal{position:absolute;left:50%;top:29%;width:130px;height:130px;transform:translate(-50%,-50%) scale(.2);border-radius:50%;border:2px solid #f1c54b;background:radial-gradient(circle,#2b2108 0 38%,#b88b1f 39% 42%,#161004 43%);box-shadow:0 0 34px #e8b52f88;display:grid;place-items:center;color:#ffe486;font-size:34px;font-weight:1000;opacity:0}
  #fhqCinematicReveal.signature.run .goldseal{animation:fhqSeal 3.5s ease both}
  .sigpaper{width:82px;height:52px;border:1px solid #b69032;background:linear-gradient(135deg,#e6dec8,#a99055);box-shadow:0 8px 18px #0008;opacity:0}
  #fhqCinematicReveal.signature .p1{left:14%;top:22%;transform:rotate(-14deg)}#fhqCinematicReveal.signature .p2{right:14%;top:28%;transform:rotate(17deg)}#fhqCinematicReveal.signature .p3{left:16%;bottom:18%;transform:rotate(9deg)}#fhqCinematicReveal.signature .p4{right:16%;bottom:18%;transform:rotate(-12deg)}
  #fhqCinematicReveal.signature.run .sigpaper{animation:fhqPaper 4.7s ease both}
  @keyframes fhqSignature{to{stroke-dashoffset:0}}
  @keyframes fhqSeal{0%,43%{opacity:0;transform:translate(-50%,-50%) scale(.2) rotate(-18deg)}58%,82%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.45)}}
  @keyframes fhqPaper{0%,12%{opacity:0}28%,70%{opacity:.8}100%{opacity:0;transform:translate(var(--px),var(--py)) rotate(120deg)}}
  #fhqCinematicReveal.signature .p1{--px:-330px;--py:-220px}#fhqCinematicReveal.signature .p2{--px:330px;--py:-220px}#fhqCinematicReveal.signature .p3{--px:-350px;--py:220px}#fhqCinematicReveal.signature .p4{--px:350px;--py:220px}

  /* shared rarity hit timing */
  #fhqCinematicReveal.run .fhq-cine-hit{animation:fhqRarityHit var(--hitdur,2.6s) ease both}
  @keyframes fhqRarityHit{0%,55%{opacity:0;transform:translate(-50%,-50%) scale(.78)}68%,84%{opacity:1;transform:translate(-50%,-50%) scale(1.04)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.12)}}
  #fhqCinematicReveal.reveal-card .fhq-cine-mystery{animation:fhqMysteryOut .6s ease forwards}
  #fhqCinematicReveal.reveal-card .fhq-cine-card{animation:fhqActualIn .9s cubic-bezier(.16,.85,.22,1) forwards}
  @keyframes fhqMysteryOut{to{opacity:0;transform:scale(.72) rotateY(-55deg);filter:brightness(2)}}
  @keyframes fhqActualIn{0%{opacity:0;transform:scale(.76) rotateY(86deg);filter:brightness(.3)}58%{opacity:1;transform:scale(1.1) rotateY(0);filter:brightness(2.2)}100%{opacity:1;transform:scale(1);filter:brightness(1)}}
  @media(max-width:600px){.fhq-cine-stage{height:86vh}.fhq-cine-hit{top:68%}.fhq-cine-skip{bottom:10px;right:10px}}
  `;

  function ensure(){
    if(!document.getElementById('fhqRevealStyle')){
      const s=document.createElement('style');s.id='fhqRevealStyle';s.textContent=css;document.head.appendChild(s);
    }
    let o=document.getElementById('fhqCinematicReveal');
    if(!o){
      o=document.createElement('div');o.id='fhqCinematicReveal';o.setAttribute('aria-hidden','true');
      o.innerHTML='<div class="fhq-cine-stage"><div class="fhq-cine-sub">FOOTBALL HQ PACK REVEAL</div><div class="fhq-cine-fx"></div><div class="fhq-cine-mystery"></div><div class="fhq-cine-card"></div><div class="fhq-cine-hit"></div><button type="button" class="fhq-cine-skip">SKIP</button></div>';
      document.body.appendChild(o);
    }
    return o;
  }

  function fxMarkup(r){
    if(r==='common')return '<div class="field"></div><div class="fhq-cine-line yardflash"></div>';
    if(r==='uncommon')return '<div class="ufield"></div><div class="fhq-cine-line usweep"></div>';
    if(r==='rare')return '<div class="icepane"></div><i class="fhq-cine-crack c1"></i><i class="fhq-cine-crack c2"></i><i class="fhq-cine-crack c3"></i><i class="fhq-cine-crack c4"></i><i class="fhq-cine-crack c5"></i><div class="popring"></div>';
    if(r==='epic')return '<div class="epicclock">0:04</div><div class="epicring"></div>';
    if(r==='legendary')return '<div class="goldring"></div><i class="fhq-cine-bolt b1"></i><i class="fhq-cine-bolt b2"></i><i class="fhq-cine-bolt b3"></i>';
    if(r==='obsidian')return '<div class="vortex"></div><div class="obs-slit"></div><div class="obs-shield">HQ</div>';
    if(r==='signature')return '<div class="fhq-cine-paper sigpaper p1"></div><div class="fhq-cine-paper sigpaper p2"></div><div class="fhq-cine-paper sigpaper p3"></div><div class="fhq-cine-paper sigpaper p4"></div><svg class="sigsvg" viewBox="0 0 700 200"><path d="M45 127 C92 45,126 165,171 95 S245 63,265 122 C280 160,302 64,337 84 C369 102,359 145,390 123 C423 99,447 58,469 83 C489 106,480 143,520 115 C552 91,574 71,596 96 C615 118,610 139,657 104"/></svg><div class="goldseal">HQ</div>';
    return '';
  }

  function epicCountdown(overlay){
    const clock=overlay.querySelector('.epicclock');if(!clock)return;
    ['0:04','0:03','0:02','0:01'].forEach((v,i)=>setTimeout(()=>{if(clock)clock.textContent=v},300+i*330));
  }

  let token=0;
  function play(reward,node){
    const o=ensure(),r=String(reward&&reward.rarity||node&&node.dataset.rarity||'common').toLowerCase();
    const duration=DUR[r]||1800,current=++token;
    o.className='open '+r;
    o.setAttribute('aria-hidden','false');
    o.style.setProperty('--hitdur',(duration/1000)+'s');
    o.querySelector('.fhq-cine-hit').textContent=r.toUpperCase();
    o.querySelector('.fhq-cine-fx').innerHTML=fxMarkup(r);
    const card=o.querySelector('.fhq-cine-card');
    card.innerHTML=node?node.innerHTML:'';
    o.querySelector('.fhq-cine-mystery').style.display='';
    o.classList.remove('run','reveal-card');
    void o.offsetWidth;
    o.classList.add('run');
    if(r==='epic')epicCountdown(o);
    try{if(window.FHQAudio&&FHQAudio.playRarity)FHQAudio.playRarity(r)}catch(e){}

    return new Promise(resolve=>{
      let done=false;
      const finish=()=>{
        if(done||current!==token)return;done=true;
        o.classList.add('reveal-card');
        setTimeout(()=>{
          if(node)node.classList.add('reveal');
          setTimeout(()=>{
            o.className='';o.setAttribute('aria-hidden','true');card.innerHTML='';
            resolve();
          },700);
        },520);
      };
      const t=setTimeout(finish,Math.max(750,duration-650));
      const skip=o.querySelector('.fhq-cine-skip');
      skip.onclick=()=>{clearTimeout(t);finish()};
    });
  }

  function stop(){
    token++;
    const o=document.getElementById('fhqCinematicReveal');
    if(o){o.className='';o.setAttribute('aria-hidden','true')}
    try{if(window.FHQAudio)FHQAudio.stopAll()}catch(e){}
  }

  window.FHQRevealEngine={play,stop,durations:DUR};
})();
