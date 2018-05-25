'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'library-app',
    environment,
    rootURL: '/',
    locationType: 'auto',
    firebase: {
        apiKey: "AIzaSyAEmaywEQs8wVWPbhLc-HpQzh0CuajfnrM",
        authDomain: "library-app-e6aa1.firebaseapp.com",
        databaseURL: "https://library-app-e6aa1.firebaseio.com",
        projectId: "library-app-e6aa1",
        storageBucket: "library-app-e6aa1.appspot.com",
        messagingSenderId: "497688062772"
      },
      
      


      // if using ember-cli-content-security-policy
      contentSecurityPolicy: {
        'script-src': "'self' 'unsafe-eval' apis.google.com",
        'frame-src': "'self' https://*.firebaseapp.com",
        'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
      },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }
  
  if (environment === 'production') {
	  ENV['ember-faker'] = {
	    enabled: true
	  };
	}

  return ENV;
};
