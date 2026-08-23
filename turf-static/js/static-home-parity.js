/* TURF static migration — newer approved Home parity layer.
 * Test-only. Leaves production root untouched.
 * Rebuilds the post-hero Home layout as New Game + Featured Challenges + Daily Rewards.
 */
(function(){
'use strict';
if(window.__TURF_STATIC_HOME_PARITY__)return;
window.__TURF_STATIC_HOME_PARITY__=true;
function q(s,r){try{return (r||document).querySelector(s)}catch(e){return null}}
function qa(s,r){try{return Array.prototype.slice.call((r||document).querySelectorAll(s))}catch(e){return []}}
function txt(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim()}
function style(){
 if(q('#turfStaticHomeParityCss'))return;
 var s=document.createElement('style');s.id='turfStaticHomeParityCss';s.textContent=`
 #fhqHome{background:linear-gradient(180deg,#06121c 0%,#071620 100%)!important}
 #fhqHome .fhq-home-inner{max-width:1188px!important;margin:0 auto!important;padding:18px 20px 52px!important}
 #fhqHome #fhqDashboard{display:none!important}
 #fhqHome .turf-static-old-games-title,#fhqHome .turf-static-old-games-scroll{display:none!important}
 #fhqHome .turf-static-home-grid{display:grid!important;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)!important;gap:16px!important;margin:18px 0 16px!important}
 #fhqHome .turf-static-panel{min-width:0!important;border:1px solid rgba(54,185,239,.28)!important;border-radius:18px!important;background:linear-gradient(180deg,rgba(8,31,46,.97),rgba(5,20,31,.99))!important;box-shadow:0 16px 34px rgba(0,0,0,.18)!important;padding:18px!important;overflow:hidden!important}
 #fhqHome .turf-static-head{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:12px!important;margin-bottom:14px!important}
 #fhqHome .turf-static-head h2{margin:0!important;color:#f6fbff!important;font-size:20px!important;line-height:1.05!important;font-weight:950!important;letter-spacing:.01em!important}
 #fhqHome .turf-static-head p{margin:5px 0 0!important;color:#7895a8!important;font-size:10px!important;line-height:1.3!important;font-weight:750!important}
 #fhqHome .turf-static-game{position:relative!important;min-height:286px!important;border:1px solid rgba(62,192,244,.28)!important;border-radius:16px!important;padding:22px!important;display:flex!important;flex-direction:column!important;justify-content:flex-end!important;overflow:hidden!important;background:radial-gradient(circle at 82% 18%,rgba(40,171,245,.23),transparent 34%),linear-gradient(145deg,#0b3149 0%,#071c2d 62%,#061622 100%)!important;cursor:pointer!important}
 #fhqHome .turf-static-game:before{content:'NEW GAME'!important;position:absolute!important;left:18px!important;top:16px!important;padding:5px 9px!important;border-radius:999px!important;border:1px solid rgba(73,206,255,.4)!important;background:rgba(25,162,221,.12)!important;color:#74ddff!important;font-size:8px!important;font-weight:950!important;letter-spacing:.14em!important}
 #fhqHome .turf-static-depth-logo{position:absolute!important;right:25px!important;top:44px!important;width:112px!important;height:112px!important;border-radius:24px!important;display:grid!important;place-items:center!important;background:radial-gradient(circle at 42% 35%,rgba(56,194,255,.18),transparent 58%),linear-gradient(155deg,rgba(7,42,64,.96),rgba(4,24,39,.98))!important;border:1px solid rgba(66,201,255,.28)!important;box-shadow:0 14px 32px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.04)!important}
 #fhqHome .turf-static-depth-logo svg{width:78px!important;height:78px!important;filter:drop-shadow(0 0 8px rgba(97,221,255,.34))!important}.turf-static-depth-logo .line{stroke:#d2f6ff;stroke-width:4.2;stroke-linecap:round}.turf-static-depth-logo .gold{fill:#f7cc57}.turf-static-depth-logo .aqua{fill:#9deeff}.turf-static-depth-logo .blue{fill:#3fb7ff}.turf-static-depth-logo .arrow{stroke:#63dbff;stroke-width:4.8;stroke-linecap:round;stroke-linejoin:round;fill:none}
 #fhqHome .turf-static-game h3{margin:0 150px 7px 0!important;color:#fff!important;font-size:28px!important;line-height:1.03!important;font-weight:950!important}
 #fhqHome .turf-static-game p{margin:0!important;max-width:420px!important;color:#94adbd!important;font-size:11px!important;line-height:1.45!important;font-weight:700!important}
 #fhqHome .turf-static-play{display:inline-flex!important;align-items:center!important;justify-content:center!important;align-self:flex-start!important;min-width:150px!important;height:42px!important;margin-top:17px!important;padding:0 17px!important;border-radius:11px!important;background:linear-gradient(180deg,#28c8ff,#078de1)!important;border:1px solid #3bc1f6!important;color:white!important;font-size:10px!important;font-weight:950!important;letter-spacing:.06em!important}
 #fhqHome .turf-static-focus{display:grid!important;gap:10px!important}
 #fhqHome .turf-static-focus-item{min-height:76px!important;border:1px solid rgba(63,180,226,.18)!important;border-radius:13px!important;background:rgba(9,35,52,.74)!important;padding:12px 13px!important;display:grid!important;grid-template-columns:44px minmax(0,1fr) auto!important;gap:12px!important;align-items:center!important}
 #fhqHome .turf-static-focus-icon{width:42px!important;height:42px!important;border-radius:12px!important;display:grid!important;place-items:center!important;background:rgba(32,154,211,.11)!important;border:1px solid rgba(64,193,243,.18)!important;font-size:20px!important}
 #fhqHome .turf-static-focus-copy strong{display:block!important;color:#eef9ff!important;font-size:12px!important;font-weight:900!important}.turf-static-focus-copy span{display:block!important;margin-top:4px!important;color:#7894a5!important;font-size:9px!important;font-weight:700!important}.turf-static-focus-value{color:#76dcff!important;font-size:18px!important;font-weight:950!important}
 #fhqHome .turf-static-rewards-shell{margin:0 0 18px!important;padding:15px 16px!important;border:1px solid rgba(55,171,221,.22)!important;border-radius:18px!important;background:linear-gradient(180deg,rgba(7,27,41,.97),rgba(5,19,30,.99))!important}
 #fhqHome .turf-static-rewards-shell>.fhq-section-title{margin:0 0 11px!important;font-size:18px!important}
 #fhqHome .turf-static-rewards-shell #fhqDailyRewards{display:grid!important;grid-template-columns:1fr 1fr!important;gap:12px!important}
 #fhqHome .turf-static-rewards-shell .fhq-daily-reward{min-height:78px!important;height:78px!important;display:grid!important;grid-template-columns:54px minmax(0,1fr) 108px!important;align-items:center!important;gap:12px!important;padding:10px 13px!important;border-radius:13px!important;overflow:hidden!important}
 #fhqHome .turf-static-rewards-shell .fhq-daily-reward>.icon{width:48px!important;height:48px!important;min-width:48px!important;padding:0!important;border-radius:12px!important}
 #fhqHome .turf-static-rewards-shell .fhq-daily-reward h3{margin:0 0 3px!important;font-size:13px!important;white-space:nowrap!important}.turf-static-rewards-shell .fhq-daily-reward p{margin:0!important;font-size:9px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}.turf-static-rewards-shell .fhq-daily-reward>button{width:100%!important;height:36px!important;min-height:36px!important;padding:0 10px!important}
 @media(max-width:900px){#fhqHome .turf-static-home-grid{grid-template-columns:1fr!important}#fhqHome .turf-static-rewards-shell #fhqDailyRewards{grid-template-columns:1fr!important}}
 `;(document.head||document.documentElement).appendChild(s)
}
function logo(){return '<div class="turf-static-depth-logo" aria-hidden="true"><svg viewBox="0 0 80 80"><circle class="gold" cx="18" cy="24" r="4"/><circle class="aqua" cx="18" cy="40" r="4"/><circle class="blue" cx="18" cy="56" r="4"/><line class="line" x1="28" y1="24" x2="56" y2="24"/><line class="line" x1="28" y1="40" x2="48" y2="40"/><line class="line" x1="28" y1="56" x2="40" y2="56"/><path class="arrow" d="M50 36h14m0 0l-6-6m6 6l-6 6"/></svg></div>'}
function profile(){return window.__TURF_AUTH_PROFILE__||{}}
function findGame(){var cards=qa('#fhqHome .fhq-card[data-game-open]');return cards.find(function(c){return /depth\s*chart/i.test(txt(c))})||cards[cards.length-1]||cards[0]}
function build(){
 style();var home=q('#fhqHome .fhq-home-inner');var hero=q('#fhqHome .fhq-hero');if(!home||!hero)return;
 var old=q('#turfStaticHomeGrid');if(old)old.remove();
 var game=findGame();var gameName=game?(txt(q('h3',game))||'Depth Chart'):'Depth Chart';var gameDesc=game?(txt(q('p',game))||'Order a current position room.'):'Order a current position room.';
 var grid=document.createElement('section');grid.id='turfStaticHomeGrid';grid.className='turf-static-home-grid';
 grid.innerHTML='<section class="turf-static-panel"><div class="turf-static-head"><div><h2>New Game</h2><p>The newest or pinned TURF game.</p></div></div><div class="turf-static-game" id="turfStaticNewGame">'+logo()+'<h3>'+gameName+'</h3><p>'+gameDesc+'</p><span class="turf-static-play">PLAY NOW →</span></div></section><section class="turf-static-panel"><div class="turf-static-head"><div><h2>Featured Challenges</h2><p>Your best goals to chase today.</p></div></div><div class="turf-static-focus"><div class="turf-static-focus-item"><span class="turf-static-focus-icon">◫</span><span class="turf-static-focus-copy"><strong>Complete Today\'s Games</strong><span>Finish the Daily board and build your total.</span></span><strong class="turf-static-focus-value" id="turfStaticDaily">0 / 12</strong></div><div class="turf-static-focus-item"><span class="turf-static-focus-icon">🔥</span><span class="turf-static-focus-copy"><strong>Keep Your Streak</strong><span>Come back each day and keep climbing.</span></span><strong class="turf-static-focus-value" id="turfStaticStreak">0</strong></div><div class="turf-static-focus-item"><span class="turf-static-focus-icon">★</span><span class="turf-static-focus-copy"><strong>Lifetime Progress</strong><span>Every Daily adds to your TURF profile.</span></span><strong class="turf-static-focus-value" id="turfStaticPoints">0</strong></div></div></section>';
 var dash=q('#fhqDashboard');if(dash&&dash.parentNode)dash.parentNode.insertBefore(grid,dash.nextSibling);else hero.insertAdjacentElement('afterend',grid);
 var dailyTitle=qa('#fhqHome .fhq-section-title').find(function(x){return /^daily games$/i.test(txt(x))});if(dailyTitle){dailyTitle.classList.add('turf-static-old-games-title');var sc=dailyTitle.nextElementSibling;if(sc)sc.classList.add('turf-static-old-games-scroll')}
 var rewards=q('#fhqDailyRewards');if(rewards&&!q('#turfStaticRewardsShell')){var title=qa('#fhqHome .fhq-section-title').find(function(x){return /^daily rewards$/i.test(txt(x))});var shell=document.createElement('section');shell.id='turfStaticRewardsShell';shell.className='turf-static-rewards-shell';if(title&&title.parentNode){title.parentNode.insertBefore(shell,title);shell.appendChild(title);shell.appendChild(rewards)}}
 var ng=q('#turfStaticNewGame');if(ng&&game)ng.onclick=function(){try{game.click()}catch(e){}};
 sync();
}
function sync(){var p=profile();var points=Number(p.points||0),streak=Number(p.streakDays||0);var d=q('#turfStaticPoints');if(d)d.textContent=String(points);var s=q('#turfStaticStreak');if(s)s.textContent=String(streak);var count=0;var c=q('#fhqDailyCount');if(c){var m=txt(c).match(/(\d+)/);if(m)count=Number(m[1]||0)}var dd=q('#turfStaticDaily');if(dd)dd.textContent=count+' / 12'}
function boot(){build();[150,450,900,1700,3000,5000].forEach(function(ms){setTimeout(function(){if(!q('#turfStaticHomeGrid'))build();else sync()},ms)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();window.addEventListener('turf:auth-ready',function(){setTimeout(function(){build();sync()},80)})
})();