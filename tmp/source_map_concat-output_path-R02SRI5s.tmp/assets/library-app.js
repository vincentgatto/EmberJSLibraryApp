"use strict";



define('library-app/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default.extend({});
});
define('library-app/app', ['exports', 'library-app/resolver', 'ember-load-initializers', 'library-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('library-app/components/library-item-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    buttonLabel: 'Save',

    actions: {

      buttonClicked(param) {
        this.sendAction('action', param);
      }

    }
  });
});
define('library-app/components/library-item', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('library-app/components/nav-link-to', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.LinkComponent.extend({
    tagName: 'li'
  });
});
define('library-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('library-app/controllers/contact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    successMessage: '',
    emailAddress2: '',
    textMessage: '',

    isValidEmail: Ember.computed.match('emailAddress2', /^.+@.+\..+$/),
    isLong: Ember.computed.gte('textMessage.length', 5),

    isValid: Ember.computed.and('isValidEmail', 'isLong'),
    isDisabled2: Ember.computed.not('isValid'),

    actions: {
      saveMessage() {
        const email = this.get('emailAddress2');
        const message = this.get('textMessage');

        const newContact = this.store.createRecord('contact', { email, message });

        newContact.save().then(response => {
          this.set('successMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
          this.set('emailAddress2', '');
          this.set('textMessage', '');
        });
      }
    }
  });
});
define('library-app/controllers/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    headerMessage: 'Coming Soon',

    responseMessage: '',
    emailAddress: '',

    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isDisabled: Ember.computed.not('isValid'),

    actions: {

      saveInvitation() {
        const email = this.get('emailAddress');

        const newInvitation = this.store.createRecord('invitation', { email });

        newInvitation.save().then(response => {
          this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
          this.set('emailAddress', '');
        });
      }
    }

  });
});
define('library-app/helpers/app-version', ['exports', 'library-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('library-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('library-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('library-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'library-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('library-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('library-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('library-app/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
});
define('library-app/initializers/export-application-global', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("library-app/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('library-app/models/contact', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    email: _emberData.default.attr('string'),
    message: _emberData.default.attr('string')
  });
});
define('library-app/models/invitation', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    email: _emberData.default.attr('string')
  });
});
define('library-app/models/library', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    name: _emberData.default.attr('string'),
    address: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),

    isValid: Ember.computed.notEmpty('name')
  });
});
define('library-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('library-app/router', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // app/router.js
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {

    this.route('about');
    this.route('contact');

    this.route('admin', function () {
      this.route('invitations');
      this.route('contacts');
    });

    this.route('libraries', function () {
      this.route('new');
      this.route('edit', { path: '/:library_id/edit' });
    });
  });

  exports.default = Router;
});
define('library-app/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('library-app/routes/admin/contacts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.store.findAll('contact');
    },
    actions: {
      deleteMessage(contact) {
        let confirmation = confirm('Are you sure?');

        if (confirmation) {
          contact.destroyRecord();
        }
      }
    }
  });
});
define('library-app/routes/admin/invitations', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return this.store.findAll('invitation');
    },
    actions: {
      deleteInvitaion(invitation) {
        let confirmation = confirm('Are you sure?');

        if (confirmation) {
          invitation.destroyRecord();
        }
      }
    }

  });
});
define('library-app/routes/contact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.store.findAll('contact');
    }
  });
});
define('library-app/routes/libraries/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model(params) {
      return this.store.findRecord('library', params.library_id);
    },

    actions: {

      saveLibrary(library) {
        library.save().then(() => this.transitionTo('libraries'));
      },

      setupController(controller, model) {
        this._super(controller, model);

        controller.set('title', 'Edit library');
        controller.set('buttonLabel', 'Save changes');
      },

      renderTemplate() {
        this.render('libraries/form');
      },

      willTransition(transition) {

        let model = this.controller.get('model');

        if (model.get('hasDirtyAttributes')) {
          let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

          if (confirmation) {
            model.rollbackAttributes();
          } else {
            transition.abort();
          }
        }
      }
    }
  });
});
define('library-app/routes/libraries/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return this.store.findAll('library');
    },

    actions: {

      deleteLibrary(library) {
        let confirmation = confirm('Are you sure?');

        if (confirmation) {
          library.destroyRecord();
        }
      }
    }

  });
});
define('library-app/routes/libraries/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return this.store.createRecord('library');
    },

    setupController(controller, model) {
      this._super(controller, model);

      controller.set('title', 'Create a new library');
      controller.set('buttonLabel', 'Create');
    },

    renderTemplate() {
      this.render('libraries/form');
    },

    actions: {

      saveLibrary(newLibrary) {
        newLibrary.save().then(() => this.transitionTo('libraries'));
      },

      willTransition() {
        // rollbackAttributes() removes the record from the store
        // if the model 'isNew'
        this.controller.get('model').rollbackAttributes();
      }
    }
  });
});
define('library-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('library-app/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
define('library-app/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
define("library-app/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "325oS6g9", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"About Page\"],[9],[0,\"\\n\\n\"],[6,\"p\"],[8],[0,\"Name: Vincent Gatto\"],[9],[0,\"\\n\"],[6,\"p\"],[8],[0,\"Personal Phone: 416-995-6309\"],[9],[0,\"\\n\"],[6,\"p\"],[8],[0,\"Personal Email: vincent.gatto@hotmail.com \"],[9],[0,\"\\n\"],[6,\"p\"],[8],[0,\"Personal Website: \"],[6,\"a\"],[10,\"href\",\"http://www.buysynth.com\"],[8],[0,\"www.buysynth.com\"],[9],[0,\" \"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/about.hbs" } });
});
define("library-app/templates/admin/contacts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "k85IEWX7", "block": "{\"symbols\":[\"contact\"],\"statements\":[[6,\"h1\"],[8],[0,\"Contacts\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"panel panel-default\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"panel-heading\"],[8],[0,\"\\n      \"],[6,\"h3\"],[10,\"class\",\"panel-title\"],[8],[1,[21,1,[\"email\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"panel-body\"],[8],[0,\"\\n      \"],[6,\"p\"],[8],[0,\"Message: \"],[1,[21,1,[\"message\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"panel-footer text-right\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-danger btn-xs\"],[3,\"action\",[[21,0,[]],\"deleteMessage\",[21,1,[]]]],[8],[0,\"Delete\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/contacts.hbs" } });
});
define("library-app/templates/admin/invitations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zK1s2usI", "block": "{\"symbols\":[\"invitation\"],\"statements\":[[6,\"h1\"],[8],[0,\"Invitations\"],[9],[0,\"\\n\\n\"],[6,\"table\"],[10,\"class\",\"table table-bordered table-striped\"],[8],[0,\"\\n  \"],[6,\"thead\"],[8],[0,\"\\n    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"th\"],[8],[0,\"ID\"],[9],[0,\"\\n      \"],[6,\"th\"],[8],[0,\"E-mail\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"th\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"email\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-danger btn-xs\"],[3,\"action\",[[21,0,[]],\"deleteInvitation\",[21,1,[]]]],[8],[0,\"Delete\"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/invitations.hbs" } });
});
define("library-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1L8PK8si", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[14,\"navbar\",[]],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
define("library-app/templates/components/library-item-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "poTYEbJA", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n    \"],[6,\"div\"],[11,\"class\",[27,[\"form-group has-feedback \",[26,\"if\",[[22,[\"item\",\"isValid\"]],\"has-success\"],null]]]],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2 control-label\"],[8],[0,\"Name*\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"name\"]],\"form-control\",\"The name of the Library\"]]],false],[0,\"\\n          \"],[4,\"if\",[[22,[\"item\",\"isValid\"]]],null,{\"statements\":[[6,\"span\"],[10,\"class\",\"glyphicon glyphicon-ok form-control-feedback\"],[8],[9]],\"parameters\":[]},null],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2 control-label\"],[8],[0,\"Address\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"address\"]],\"form-control\",\"The address of the Library\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2 control-label\"],[8],[0,\"Phone\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"phone\"]],\"form-control\",\"The phone number of the Library\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-offset-2 col-sm-10\"],[8],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-default\"],[11,\"disabled\",[26,\"unless\",[[22,[\"item\",\"isValid\"]],true],null],null],[10,\"type\",\"submit\"],[3,\"action\",[[21,0,[]],\"buttonClicked\",[22,[\"item\"]]]],[8],[1,[20,\"buttonLabel\"],false],[9],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/library-item-form.hbs" } });
});
define("library-app/templates/components/library-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6mr5hBWr", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[10,\"class\",\"panel panel-default library-item\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"panel-heading\"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"panel-title\"],[8],[1,[22,[\"item\",\"name\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"panel-body\"],[8],[0,\"\\n        \"],[6,\"p\"],[8],[0,\"Address: \"],[1,[22,[\"item\",\"address\"]],false],[9],[0,\"\\n        \"],[6,\"p\"],[8],[0,\"Phone: \"],[1,[22,[\"item\",\"phone\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"panel-footer text-right\"],[8],[0,\"\\n      \"],[13,1],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/library-item.hbs" } });
});
define("library-app/templates/components/nav-link-to", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gX+Nb6v/", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"a\"],[10,\"href\",\"\"],[8],[13,1],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/nav-link-to.hbs" } });
});
define("library-app/templates/contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pFOtsL2u", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Contact\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[8],[0,\"\\n\"],[1,[26,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"email\",[22,[\"emailAddress2\"]],\"email\"]]],false],[0,\"\\n\"],[1,[26,\"input\",null,[[\"value\",\"placeholder\"],[[22,[\"textMessage\"]],\"message\"]]],false],[0,\"\\n\"],[6,\"button\"],[10,\"class\",\"btn btn-primary\"],[11,\"disabled\",[20,\"isDisabled2\"],null],[3,\"action\",[[21,0,[]],\"saveMessage\"]],[8],[0,\"Send Message\"],[9],[0,\" \\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"successMessage\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"alert alert-success\"],[8],[1,[20,\"successMessage\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/contact.hbs" } });
});
define("library-app/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HZnZaPfX", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Home Page\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"jumbotron text-center\"],[8],[0,\"\\n   \"],[6,\"h1\"],[8],[1,[20,\"headerMessage\"],false],[9],[0,\"\\n\\n   \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n\\n   \"],[6,\"p\"],[8],[0,\"Don't miss our launch date, request an invitation now.\"],[9],[0,\"\\n\\n   \"],[6,\"div\"],[10,\"class\",\"form-horizontal form-group form-group-lg row\"],[8],[0,\"\\n     \"],[6,\"div\"],[10,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2\"],[8],[0,\"\\n       \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"email\",[22,[\"emailAddress\"]],\"form-control\",\"Please type your e-mail address.\",\"autofocus\"]]],false],[0,\"\\n     \"],[9],[0,\"\\n     \"],[6,\"div\"],[10,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3\"],[8],[0,\"\\n       \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-lg btn-block\"],[11,\"disabled\",[20,\"isDisabled\"],null],[3,\"action\",[[21,0,[]],\"saveInvitation\"]],[8],[0,\"Request invitation\"],[9],[0,\"\\n     \"],[9],[0,\"\\n   \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"responseMessage\"]]],null,{\"statements\":[[0,\"     \"],[6,\"div\"],[10,\"class\",\"alert alert-success\"],[8],[1,[20,\"responseMessage\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n   \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/index.hbs" } });
});
define("library-app/templates/libraries", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "drfAENeR", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Libraries\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"well\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"nav nav-pills\"],[8],[0,\"\\n    \"],[4,\"link-to\",[\"libraries.index\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[10,\"href\",\"\"],[8],[0,\"List all\"],[9]],\"parameters\":[]},null],[0,\"\\n    \"],[4,\"link-to\",[\"libraries.new\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[10,\"href\",\"\"],[8],[0,\"Add new\"],[9]],\"parameters\":[]},null],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/libraries.hbs" } });
});
define("library-app/templates/libraries/form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ejoirnrz", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[8],[1,[20,\"title\"],false],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n    \"],[1,[26,\"library-item-form\",null,[[\"item\",\"buttonLabel\",\"action\"],[[22,[\"model\"]],[22,[\"buttonLabel\"]],\"saveLibrary\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n\"],[4,\"library-item\",null,[[\"item\"],[[22,[\"model\"]]]],{\"statements\":[[0,\"      \"],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/libraries/form.hbs" } });
});
define("library-app/templates/libraries/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RVFQkHoR", "block": "{\"symbols\":[\"library\"],\"statements\":[[6,\"h2\"],[8],[0,\"List\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n\"],[4,\"library-item\",null,[[\"item\"],[[21,1,[]]]],{\"statements\":[[0,\"        \"],[4,\"link-to\",[\"libraries.edit\",[21,1,[\"id\"]]],[[\"class\"],[\"btn btn-success btn-xs\"]],{\"statements\":[[0,\"Edit\"]],\"parameters\":[]},null],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"btn btn-danger btn-xs\"],[3,\"action\",[[21,0,[]],\"deleteLibrary\",[21,1,[]]]],[8],[0,\"Delete\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/libraries/index.hbs" } });
});
define("library-app/templates/navbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GKDSwlfc", "block": "{\"symbols\":[],\"statements\":[[6,\"nav\"],[10,\"class\",\"navbar navbar-inverse\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"navbar-header\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"navbar-toggle collapsed\"],[10,\"data-toggle\",\"collapse\"],[10,\"data-target\",\"#main-navbar\"],[10,\"type\",\"button\"],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"sr-only\"],[8],[0,\"Toggle navigation\"],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"Library App\"]],\"parameters\":[]},null],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"collapse navbar-collapse\"],[10,\"id\",\"main-navbar\"],[8],[0,\"\\n      \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav\"],[8],[0,\"\\n        \"],[4,\"nav-link-to\",[\"index\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"libraries\"],null,{\"statements\":[[0,\"Libraries\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"about\"],null,{\"statements\":[[0,\"About\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"contact\"],null,{\"statements\":[[0,\"Contact\"]],\"parameters\":[]},null],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav navbar-right\"],[8],[0,\"\\n        \"],[6,\"li\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"role\",\"button\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[8],[0,\"\\n            Admin\"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.invitations\"],null,{\"statements\":[[0,\"Invitations\"]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.contacts\"],null,{\"statements\":[[0,\"Contacts\"]],\"parameters\":[]},null],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[9],[2,\" /.container-fluid \"],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/navbar.hbs" } });
});
define('library-app/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});


define('library-app/config/environment', [], function() {
  var prefix = 'library-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("library-app/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"LOG_VIEW_LOOKUPS":true,"name":"library-app","version":"0.0.0+b0c35910"});
}
//# sourceMappingURL=library-app.map
