/* TURF auth controller for static hosting.
 * UI code calls TurfAuth; TurfAuth calls TurfApi. No direct google.script.run calls here.
 */
(function(global){
  'use strict';

  const SESSION_KEY='turfAuthAccountTokenV1';
  const GUEST_KEY='turfStableGuestTokenV1';

  function getSessionToken(){
    try{return String(localStorage.getItem(SESSION_KEY)||'').trim()}catch(_){return ''}
  }
  function saveSessionToken(token){
    token=String(token||'').trim();
    if(!token)return;
    try{localStorage.setItem(SESSION_KEY,token)}catch(_){}
  }
  function clearSessionToken(){try{localStorage.removeItem(SESSION_KEY)}catch(_){}}

  function getGuestToken(){
    let token='';
    try{token=String(localStorage.getItem(GUEST_KEY)||'').trim()}catch(_){}
    if(token)return token;
    try{
      const bytes=new Uint8Array(18); crypto.getRandomValues(bytes);
      token='turf-guest-'+Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
    }catch(_){token='turf-guest-'+Date.now()+'-'+Math.random().toString(36).slice(2)}
    try{localStorage.setItem(GUEST_KEY,token)}catch(_){}
    return token;
  }

  function normalizeProfileResponse(res, mode){
    if(mode==='google'){
      if(res&&res.signedIn&&res.profile)return res.profile;
      if(res&&(res.needsLink||res.needsAccount||res.needsCreate)){
        const err=new Error('This Google account still needs to be linked to a TURF profile.');
        err.code='NEEDS_LINK'; throw err;
      }
      throw new Error((res&&res.error)||'Google account is not linked to TURF.');
    }
    if(mode==='guest'){
      if(res&&res.ok&&res.profile)return res.profile;
      throw new Error((res&&res.error)||'Guest account could not be opened.');
    }
    if(mode==='resume'){
      if(res&&res.authenticated&&res.profile)return res.profile;
      const err=new Error('Saved TURF session is no longer valid.'); err.code='SESSION_INVALID'; throw err;
    }
    throw new Error('Unknown auth response.');
  }

  async function googleSignIn(credential){
    if(!credential)throw new Error('Google sign-in did not return a credential.');
    const profile=normalizeProfileResponse(await global.TurfApi.googleSignIn(String(credential)),'google');
    if(profile.token)saveSessionToken(profile.token);
    return profile;
  }

  async function guestSignIn(){
    const token=getGuestToken();
    const profile=normalizeProfileResponse(await global.TurfApi.continueAsGuest(token),'guest');
    saveSessionToken(profile.token||token);
    return profile;
  }

  async function resume(){
    const token=getSessionToken();
    if(!token)return null;
    try{
      const profile=normalizeProfileResponse(await global.TurfApi.resolveAccountToken(token),'resume');
      saveSessionToken(profile.token||token);
      return profile;
    }catch(err){
      if(err&&err.code==='SESSION_INVALID')clearSessionToken();
      throw err;
    }
  }

  global.TurfAuth={
    googleSignIn,
    guestSignIn,
    resume,
    signOut(){clearSessionToken()},
    getSessionToken,
    getGuestToken
  };
})(window);
