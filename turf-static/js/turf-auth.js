/* TURF auth controller for static hosting.
 * UI code calls TurfAuth; TurfAuth calls TurfApi. No direct google.script.run calls here.
 */
(function(global){
  'use strict';

  const SESSION_KEY='turfAuthAccountTokenV1';
  const GUEST_KEY='turfStableGuestTokenV1';
  const PROFILE_KEY='turfAuthCachedProfileV1';

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

  global.TurfAuth={googleSignIn,guestSignIn,resume,signOut(){clearSessionToken()},getSessionToken,getGuestToken,getCachedProfile};

  /* Production root safety: Worker auth is authoritative. The existing TURF app
     is still the exact current app; we only stop the outer sign-in shell from
     waiting forever for a legacy Apps Script acknowledgement. */
  function installRootRevealFallback(){
    var frame=document.getElementById('turfApp'),status=document.getElementById('authStatus');
    if(!frame||!status||window.__TURF_ROOT_WORKER_REVEAL_V1__)return;
    window.__TURF_ROOT_WORKER_REVEAL_V1__=true;
    var loaded=false,timer=null;
    function signedIn(){return /^Signed in\. Opening TURF/i.test(String(status.textContent||'').trim())}
    function hasProfile(){var p=getCachedProfile();return !!(p&&p.token)}
    function reveal(){
      if(!loaded||!signedIn()||!hasProfile()||document.body.classList.contains('turf-authenticated'))return;
      clearTimeout(timer);timer=setTimeout(function(){
        if(!loaded||!signedIn()||!hasProfile())return;
        document.body.classList.add('turf-authenticated');
        try{status.textContent=''}catch(_){}
      },700);
    }
    frame.addEventListener('load',function(){loaded=true;reveal()});
    try{new MutationObserver(reveal).observe(status,{childList:true,subtree:true,characterData:true})}catch(_){}
    [500,1000,1800,3000,5000,8000,12000].forEach(function(ms){setTimeout(reveal,ms)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installRootRevealFallback,{once:true});else installRootRevealFallback();
})(window);
