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
define('library-app/components/fader-label', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: 'span',

    classNames: ['label label-success label-fade'],
    classNameBindings: ['isShowing:label-show'],

    isShowing: false,

    isShowingChanged: Ember.observer('isShowing', function () {

      // User can navigate away from this page in less than 3 seconds, so this component will be destroyed,
      // however our "setTimeout" task try to run.
      // We save this task in a local variable, so we can clean up during the destroy process.
      // Otherwise you will see a "calling set on destroyed object" error.
      this._runLater = Ember.run.later(() => this.set('isShowing', false), 3000);
    }),

    resetRunLater() {
      this.set('isShowing', false);
      Ember.run.cancel(this._runLater);
    },

    willDestroy() {
      this.resetRunLater();
      this._super(...arguments);
    }
  });
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
define('library-app/components/number-box', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    classNames: ['panel', 'panel-warning']

  });
});
define('library-app/components/seeder-block', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const MAX_VALUE = 100;

  exports.default = Ember.Component.extend({

    counter: null,

    isCounterValid: Ember.computed.lte('counter', MAX_VALUE),
    isCounterNotValid: Ember.computed.not('isCounterValid'),
    placeholder: `Max ${MAX_VALUE}`,

    generateReady: false,
    deleteReady: false,

    generateInProgress: false,
    deleteInProgress: false,

    generateIsDisabled: Ember.computed.or('isCounterNotValid', 'generateInProgress', 'deleteInProgress'),
    deleteIsDisabled: Ember.computed.or('generateInProgress', 'deleteInProgress'),

    actions: {

      generateAction() {
        if (this.get('isCounterValid')) {

          // Action up to Seeder Controller with the requested amount
          this.sendAction('generateAction', this.get('counter'));
        }
      },

      deleteAction() {
        this.sendAction('deleteAction');
      }

    }
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
define('library-app/controllers/admin/seeder', ['exports', 'faker'], function (exports, _faker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    actions: {

      generateLibraries(volume) {

        // Progress flag, data-down to seeder-block where our lovely button will show a spinner...
        this.set('generateLibrariesInProgress', true);

        const counter = parseInt(volume);
        let savedLibraries = [];

        for (let i = 0; i < counter; i++) {

          // Collect all Promise in an array
          savedLibraries.push(this._saveRandomLibrary());
        }

        // Wait for all Promise to fulfill so we can show our label and turn off the spinner.
        Ember.RSVP.all(savedLibraries).then(() => {
          this.set('generateLibrariesInProgress', false);
          this.set('libDone', true);
        });
      },

      deleteLibraries() {

        // Progress flag, data-down to seeder-block button spinner.
        this.set('deleteLibrariesInProgress', true);

        // Our local _destroyAll return a promise, we change the label when all records destroyed.
        this._destroyAll(this.get('libraries'))

        // Data down via seeder-block to fader-label that we ready to show the label.
        // Change the progress indicator also, so the spinner can be turned off.
        .then(() => {
          this.set('libDelDone', true);
          this.set('deleteLibrariesInProgress', false);
        });
      },

      generateBooksAndAuthors(volume) {

        // Progress flag, data-down to seeder-block button spinner.
        this.set('generateBooksInProgress', true);

        const counter = parseInt(volume);
        let booksWithAuthors = [];

        for (let i = 0; i < counter; i++) {

          // Collect Promises in an array.
          const books = this._saveRandomAuthor().then(newAuthor => this._generateSomeBooks(newAuthor));
          booksWithAuthors.push(books);
        }

        // Let's wait until all async save resolved, show a label and turn off the spinner.
        Ember.RSVP.all(booksWithAuthors)

        // Data down via seeder-block to fader-label that we ready to show the label
        // Change the progress flag also, so the spinner can be turned off.
        .then(() => {
          this.set('authDone', true);
          this.set('generateBooksInProgress', false);
        });
      },

      deleteBooksAndAuthors() {

        // Progress flag, data-down to seeder-block button to show spinner.
        this.set('deleteBooksInProgress', true);

        const authors = this.get('authors');
        const books = this.get('books');

        // Remove authors first and books later, finally show the label.
        this._destroyAll(authors).then(() => this._destroyAll(books))

        // Data down via seeder-block to fader-label that we ready to show the label
        // Delete is finished, we can turn off the spinner in seeder-block button.
        .then(() => {
          this.set('authDelDone', true);
          this.set('deleteBooksInProgress', false);
        });
      }
    },

    // Private methods

    // Create a new library record and uses the randomizator, which is in our model and generates some fake data in
    // the new record. After we save it, which is a promise, so this returns a promise.
    _saveRandomLibrary() {
      return this.store.createRecord('library').randomize().save();
    },

    _saveRandomAuthor() {
      return this.store.createRecord('author').randomize().save();
    },

    _generateSomeBooks(author) {
      const bookCounter = _faker.default.random.number(10);
      let books = [];

      for (let j = 0; j < bookCounter; j++) {
        const library = this._selectRandomLibrary();

        // Creating and saving book, saving the related records also are take while, they are all a Promise.
        const bookPromise = this.store.createRecord('book').randomize(author, library).save().then(() => author.save())

        // guard library in case if we don't have any
        .then(() => library && library.save());
        books.push(bookPromise);
      }

      // Return a Promise, so we can manage the whole process on time
      return Ember.RSVP.all(books);
    },

    _selectRandomLibrary() {

      // Please note libraries are records from store, which means this is a DS.RecordArray object, it is extended from
      // Ember.ArrayProxy. If you need an element from this list, you cannot just use libraries[3], we have to use
      // libraries.objectAt(3)
      const libraries = this.get('libraries');
      const size = libraries.get('length');

      // Get a random number between 0 and size-1
      const randomItem = _faker.default.random.number(size - 1);
      return libraries.objectAt(randomItem);
    },

    _destroyAll(records) {

      // destroyRecord() is a Promise and will be fulfilled when the backend database is confirmed the delete
      // lets collect these Promises in an array
      const recordsAreDestroying = records.map(item => item.destroyRecord());

      // Wrap all Promise in one common Promise, RSVP.all is our best friend in this process. ;)
      return Ember.RSVP.all(recordsAreDestroying);
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
define('library-app/initializers/ember-faker', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{
    // application.inject('route', 'foo', 'service:foo');
  };

  exports.default = {
    name: 'ember-faker',
    initialize: initialize
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
define('library-app/models/author', ['exports', 'ember-data', 'faker'], function (exports, _emberData, _faker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    name: _emberData.default.attr('string'),
    books: _emberData.default.hasMany('book', { inverse: 'author', async: true }),

    isNotValid: Ember.computed.empty('name'),

    randomize() {
      this.set('name', _faker.default.name.findName());

      // With returning the author instance, the function can be chainable,
      // for example `this.store.createRecord('author').randomize().save()`,
      // check in Seeder Controller.
      return this;
    }
  });
});
define('library-app/models/book', ['exports', 'ember-data', 'faker'], function (exports, _emberData, _faker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    title: _emberData.default.attr('string'),
    releaseYear: _emberData.default.attr('date'),

    author: _emberData.default.belongsTo('author', { inverse: 'books', async: true }),
    library: _emberData.default.belongsTo('library', { inverse: 'books', async: true }),

    randomize(author, library) {
      this.set('title', this._bookTitle());
      this.set('author', author);
      this.set('releaseYear', this._randomYear());
      this.set('library', library);

      return this;
    },

    _bookTitle() {
      return `${_faker.default.commerce.productName()} Cookbook`;
    },

    _randomYear() {
      return new Date(this._getRandomArbitrary(1900, 2015).toPrecision(4));
    },

    _getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  });
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
define('library-app/models/library', ['exports', 'ember-data', 'faker'], function (exports, _emberData, _faker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    name: _emberData.default.attr('string'),
    address: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),

    books: _emberData.default.hasMany('book', { inverse: 'library', async: true }),

    isValid: Ember.computed.notEmpty('name'),

    randomize() {
      this.set('name', _faker.default.company.companyName() + ' Library');
      this.set('address', this._fullAddress());
      this.set('phone', _faker.default.phone.phoneNumber());

      // If you would like to use in chain.
      return this;
    },

    _fullAddress() {
      return `${_faker.default.address.streetAddress()}, ${_faker.default.address.city()}`;
    }
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
      this.route('seeder');
    });

    this.route('libraries', function () {
      this.route('new');
      this.route('edit', { path: '/:library_id/edit' });
    });
    this.route('authors');
    this.route('books');
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
define('library-app/routes/admin/seeder', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return Ember.RSVP.hash({
        libraries: this.store.findAll('library'),
        books: this.store.findAll('book'),
        authors: this.store.findAll('author')
      });
    },

    setupController(controller, model) {
      controller.set('libraries', model.libraries);
      controller.set('books', model.books);
      controller.set('authors', model.authors);

      this._super(controller, model);
    }
  });
});
define('library-app/routes/authors', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return this.store.findAll('author');
    }
  });
});
define('library-app/routes/books', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
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
define("library-app/templates/admin/seeder", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ImV8TBHu", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Seeder, our Data Center\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[1,[26,\"number-box\",null,[[\"title\",\"number\"],[\"Libraries\",[22,[\"libraries\",\"length\"]]]]],false],[9],[0,\"\\n \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[1,[26,\"number-box\",null,[[\"title\",\"number\"],[\"Authors\",[22,[\"authors\",\"length\"]]]]],false],[9],[0,\"\\n \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[1,[26,\"number-box\",null,[[\"title\",\"number\"],[\"Books\",[22,[\"books\",\"length\"]]]]],false],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[26,\"seeder-block\",null,[[\"sectionTitle\",\"generateAction\",\"deleteAction\",\"generateReady\",\"deleteReady\",\"generateInProgress\",\"deleteInProgress\"],[\"Libraries\",\"generateLibraries\",\"deleteLibraries\",[22,[\"libDone\"]],[22,[\"libDelDone\"]],[22,[\"generateLibrariesInProgress\"]],[22,[\"deleteLibrariesInProgress\"]]]]],false],[0,\"\\n\\n\"],[1,[26,\"seeder-block\",null,[[\"sectionTitle\",\"generateAction\",\"deleteAction\",\"generateReady\",\"deleteReady\",\"generateInProgress\",\"deleteInProgress\"],[\"Authors with Books\",\"generateBooksAndAuthors\",\"deleteBooksAndAuthors\",[22,[\"authDone\"]],[22,[\"authDelDone\"]],[22,[\"generateBooksInProgress\"]],[22,[\"deleteBooksInProgress\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/seeder.hbs" } });
});
define("library-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1L8PK8si", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[14,\"navbar\",[]],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
define("library-app/templates/authors", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "13l5HNBL", "block": "{\"symbols\":[\"author\",\"book\"],\"statements\":[[0,\" \"],[6,\"h1\"],[8],[0,\"Books\"],[9],[0,\"\\n\\n \"],[6,\"table\"],[10,\"class\",\"table table-bordered table-striped\"],[8],[0,\"\\n   \"],[6,\"thead\"],[8],[0,\"\\n     \"],[6,\"tr\"],[8],[0,\"\\n       \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n       \"],[6,\"th\"],[8],[0,\"Books\"],[9],[0,\"\\n     \"],[9],[0,\"\\n   \"],[9],[0,\"\\n   \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"       \"],[6,\"tr\"],[8],[0,\"\\n         \"],[6,\"td\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n         \"],[6,\"td\"],[8],[0,\"\\n           \"],[6,\"ul\"],[8],[0,\"\\n\"],[4,\"each\",[[21,1,[\"books\"]]],null,{\"statements\":[[0,\"               \"],[6,\"li\"],[8],[1,[21,2,[\"title\"]],false],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"           \"],[9],[0,\"\\n         \"],[9],[0,\"\\n       \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"   \"],[9],[0,\"\\n \"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/authors.hbs" } });
});
define("library-app/templates/books", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ajpISa91", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/books.hbs" } });
});
define("library-app/templates/components/fader-label", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IEw78qlR", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/fader-label.hbs" } });
});
define("library-app/templates/components/library-item-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nCJZgbfT", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n    \"],[6,\"div\"],[11,\"class\",[27,[\"form-group has-feedback \",[26,\"if\",[[22,[\"item\",\"isValid\"]],\"has-success\"],null]]]],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2 control-label\"],[8],[0,\"Name*\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"name\"]],\"form-control\",\"The name of the Library\"]]],false],[0,\"\\n          \"],[4,\"if\",[[22,[\"item\",\"isValid\"]]],null,{\"statements\":[[6,\"span\"],[10,\"class\",\"glyphicon glyphicon-ok form-control-feedback\"],[8],[9]],\"parameters\":[]},null],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2 control-label\"],[8],[0,\"Address\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"address\"]],\"form-control\",\"The address of the Library\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"d\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2 control-label\"],[8],[0,\"Phone\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"phone\"]],\"form-control\",\"The phone number of the Library\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-offset-2 col-sm-10\"],[8],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-default\"],[11,\"disabled\",[26,\"unless\",[[22,[\"item\",\"isValid\"]],true],null],null],[10,\"type\",\"submit\"],[3,\"action\",[[21,0,[]],\"buttonClicked\",[22,[\"item\"]]]],[8],[1,[20,\"buttonLabel\"],false],[9],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/library-item-form.hbs" } });
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
define("library-app/templates/components/number-box", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7X3+5AXV", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"panel-heading\"],[8],[0,\"\\n  \"],[6,\"h3\"],[10,\"class\",\"text-center\"],[8],[1,[20,\"title\"],false],[9],[0,\"\\n  \"],[6,\"h1\"],[10,\"class\",\"text-center\"],[8],[1,[26,\"if\",[[22,[\"number\"]],[22,[\"number\"]],\"...\"],null],false],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/number-box.hbs" } });
});
define("library-app/templates/components/seeder-block", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5ujPlME+", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"well well-sm extra-padding-bottom\"],[8],[0,\"\\n  \"],[6,\"h3\"],[8],[1,[20,\"sectionTitle\"],false],[9],[0,\"\\n  \\n  \"],[6,\"div\"],[10,\"class\",\"form-inline\"],[8],[0,\"\\n  \\n   \"],[6,\"div\"],[11,\"class\",[27,[\"form-group has-feedback \",[26,\"unless\",[[22,[\"isCounterValid\"]],\"has-error\"],null]]]],[8],[0,\"\\n     \"],[6,\"label\"],[10,\"class\",\"control-label\"],[8],[0,\"Number of new records:\"],[9],[0,\"\\n     \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"counter\"]],\"form-control\",[22,[\"placeholder\"]]]]],false],[0,\"\\n   \"],[9],[0,\"\\n  \\n   \"],[6,\"button\"],[10,\"class\",\"btn btn-primary\"],[11,\"disabled\",[20,\"generateIsDisabled\"],null],[3,\"action\",[[21,0,[]],\"generateAction\"]],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"generateInProgress\"]]],null,{\"statements\":[[0,\"       \"],[6,\"span\"],[10,\"class\",\"glyphicon glyphicon-refresh spinning\"],[8],[9],[0,\" Generating...\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"       Generate \"],[1,[20,\"sectionTitle\"],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"   \"],[9],[0,\"\\n   \"],[4,\"fader-label\",null,[[\"isShowing\"],[[22,[\"generateReady\"]]]],{\"statements\":[[0,\"Created!\"]],\"parameters\":[]},null],[0,\"\\n  \\n   \"],[6,\"button\"],[10,\"class\",\"btn btn-danger\"],[11,\"disabled\",[20,\"deleteIsDisabled\"],null],[3,\"action\",[[21,0,[]],\"deleteAction\"]],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"deleteInProgress\"]]],null,{\"statements\":[[0,\"       \"],[6,\"span\"],[10,\"class\",\"glyphicon glyphicon-refresh spinning\"],[8],[9],[0,\" Deleting...\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"       Delete All \"],[1,[20,\"sectionTitle\"],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"   \"],[9],[0,\"\\n   \"],[4,\"fader-label\",null,[[\"isShowing\"],[[22,[\"deleteReady\"]]]],{\"statements\":[[0,\"Deleted!\"]],\"parameters\":[]},null],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/seeder-block.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "4hjYI/rs", "block": "{\"symbols\":[],\"statements\":[[6,\"nav\"],[10,\"class\",\"navbar navbar-inverse\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"navbar-header\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"navbar-toggle collapsed\"],[10,\"data-toggle\",\"collapse\"],[10,\"data-target\",\"#main-navbar\"],[10,\"type\",\"button\"],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"sr-only\"],[8],[0,\"Toggle navigation\"],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"Library App\"]],\"parameters\":[]},null],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"collapse navbar-collapse\"],[10,\"id\",\"main-navbar\"],[8],[0,\"\\n      \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav\"],[8],[0,\"\\n        \"],[4,\"nav-link-to\",[\"index\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"libraries\"],null,{\"statements\":[[0,\"Libraries\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"authors\"],null,{\"statements\":[[0,\"Books\"]],\"parameters\":[]},null],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav navbar-right\"],[8],[0,\"\\n      \\t\"],[4,\"nav-link-to\",[\"about\"],null,{\"statements\":[[0,\"About\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"contact\"],null,{\"statements\":[[0,\"Contact\"]],\"parameters\":[]},null],[0,\"\\n        \"],[6,\"li\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"role\",\"button\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[8],[0,\"\\n            Admin\"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.invitations\"],null,{\"statements\":[[0,\"Invitations\"]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.contacts\"],null,{\"statements\":[[0,\"Contacts\"]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.seeder\"],null,{\"statements\":[[0,\"Seeder\"]],\"parameters\":[]},null],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[9],[2,\" /.container-fluid \"],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/navbar.hbs" } });
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
