/* TURF static-host migration configuration.
 * SAFE DEFAULTS: this branch is isolated and does not replace the live site by itself.
 */
(function(global){
  'use strict';
  global.TURF_STATIC_CONFIG={
    migrationMode:true,
    productionCutover:false,
    apiBaseUrl:'https://turftest-api.turftrials.workers.dev',
    apiTransport:'http',
    googleClientId:'981412579361-ebftqmubklnd2pk5k88s8kcbh27cj7i8.apps.googleusercontent.com'
  };

  if(global.TurfApi){
    global.TurfApi.configure({
      transport:global.TURF_STATIC_CONFIG.apiTransport,
      baseUrl:global.TURF_STATIC_CONFIG.apiBaseUrl,
      timeout:15000
    });
  }
})(window);
