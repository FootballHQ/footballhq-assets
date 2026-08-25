/* TURF auth controller for static hosting.
 * UI code calls TurfAuth; TurfAuth calls TurfApi. No direct google.script.run calls here.
 */
(function(global){
  'use strict';

  const SESSION_KEY='turfAuthAccountTokenV1';
  const GUEST_KEY='turfStableGuestTokenV1';
  const PROFILE_KEY='turfAuthCachedProfileV1';
  const WORKER_APP='https://turftest-api.turftrials.workers.dev/app?v=worker-auth-39';

  function getSessionToken(){try{return String(localStorage.getItem(SESSION_KEY)||'').trim()}catch(_){return ''}}
  function saveSessionToken(token){token=String(token||'').trim();if(!token)return;try{localStorage.setItem(SESSION_KEY,token)}catch(_){}}
  function clearSessionToken(){try{localStorage.removeItem(SESSION_KEY)}catch(_){} try{localStorage.removeItem(PROFILE_KEY)}catch(_){} }
  function cacheProfile(profile){if(!profile||typeof profile!=='object')return;try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))}catch(_){} }
  function getCachedProfile(){try{var p=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null');if(p&&typeof p==='object'&&p.token&&String(p.token)===getSessionToken())return p}catch(_){}return null}

  function getGuestToken(){
    let token='';
    try{token=String(localStorage.getItem(GUEST_KEY)||'').trim()}catch(_){}
    if(token)return token;
    try{const bytes=new Uint8Array(18);crypto.getRandomValues(bytes);token='turf-guest-'+Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('')}
    catch(_){token='turf-guest-'+Date.now()+'-'+Math.random().toString(36).slice(2)}
    try{localStorage.setItem(GUEST_KEY,token)}catch(_){}
    return token;
  }

  function normalizeProfileResponse(res, mode){
    if(mode==='google'){
      if(res&&res.signedIn&&res.profile)return res.profile;
      if(res&&(res.needsLink||res.needsAccount||res.needsCreate)){const err=new Error('This Google account still needs to be linked to a TURF profile.');err.code='NEEDS_LINK';throw err}
      throw new Error((res&&res.error)||'Google account is not linked to TURF.');
    }
    if(mode==='guest'){if(res&&res.ok&&res.profile)return res.profile;throw new Error((res&&res.error)||'Guest account could not be opened.')}
    if(mode==='resume'){if(res&&res.authenticated&&res.profile)return res.profile;const err=new Error('Saved TURF session is no longer valid.');err.code='SESSION_INVALID';throw err}
    throw new Error('Unknown auth response.');
  }

  async function googleSignIn(credential){
    if(!credential)throw new Error('Google sign-in did not return a credential.');
    const profile=normalizeProfileResponse(await global.TurfApi.googleSignIn(String(credential)),'google');
    if(profile.token)saveSessionToken(profile.token);cacheProfile(profile);return profile;
  }

  async function guestSignIn(){
    const token=getGuestToken();
    const profile=normalizeProfileResponse(await global.TurfApi.continueAsGuest(token),'guest');
    saveSessionToken(profile.token||token);cacheProfile(profile);return profile;
  }

  async function resume(){
    const token=getSessionToken();
    if(!token)return null;
    const cached=getCachedProfile();
    if(cached)return cached;
    try{const profile=normalizeProfileResponse(await global.TurfApi.resolveAccountToken(token),'resume');saveSessionToken(profile.token||token);cacheProfile(profile);return profile}
    catch(err){if(err&&err.code==='SESSION_INVALID')clearSessionToken();throw err}
  }

  /* Transport-only production cutover.
     The existing wrapper still assigns the old Apps Script URL to #turfApp.
     Redirect only that iframe navigation to the Worker /app proxy, which
     returns the CURRENT TURF app with the Worker google.script.run bridge
     injected. No visual/Home/logo/navigation code is touched here. */
  function installExistingAppTransport(){
    function wire(){
      var app=document.getElementById('turfApp');
      if(!app||app.dataset.workerAppTransport==='1')return;
      app.dataset.workerAppTransport='1';
      function redirect(){
        var src=String(app.getAttribute('src')||'');
        if(!/^https:\/\/script\.google\.com\/macros\/s\//i.test(src))return;
        var next=WORKER_APP+'&ts='+Date.now();
        if(app.getAttribute('src')!==next)app.setAttribute('src',next);
      }
      var obs=new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){if(muts[i].type==='attributes'&&muts[i].attributeName==='src'){redirect();break}}});
      obs.observe(app,{attributes:true,attributeFilter:['src']});
      redirect();
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();
  }
  installExistingAppTransport();

  /* Production wrapper handoff.
     Authentication is already complete at this point. Once the EXISTING TURF
     iframe has loaded, reveal that exact app immediately and keep handing it
     the verified Worker profile. Do not wait on the old Apps Script auth RPC. */
  function installExistingTurfHandoff(){
    function wire(){
      var app=document.getElementById('turfApp');
      var body=document.body;
      if(!app||!body||!String(body.getAttribute('data-turf-build')||'').startsWith('worker-auth-'))return;
      if(app.dataset.workerAuthLoadWired==='1')return;
      app.dataset.workerAuthLoadWired='1';
      app.addEventListener('load',function(){
        var profile=getCachedProfile(),token=getSessionToken();
        if(!profile||!token||String(profile.token||'')!==token)return;
        /* The iframe that just loaded is the real current TURF app. Show it. */
        body.classList.add('turf-authenticated');
        try{
          var status=document.getElementById('authStatus');
          if(status){status.textContent='';status.classList.remove('error')}
        }catch(_){ }
        var payload={type:'turf-auth-worker-profile',profile:profile,version:String(body.getAttribute('data-turf-build')||'worker-auth')};
        [0,80,180,350,700,1200,2200,4000,7000].forEach(function(ms){
          setTimeout(function(){try{app.contentWindow.postMessage(payload,'*')}catch(_){ }},ms);
        });
      });
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();
  }
  installExistingTurfHandoff();

  global.TurfAuth={googleSignIn,guestSignIn,resume,signOut(){clearSessionToken()},getSessionToken,getGuestToken,getCachedProfile};
})(window);
