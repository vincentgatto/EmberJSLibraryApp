'use strict';

define('library-app/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/fader-label.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/fader-label.js should pass ESLint\n\n');
  });

  QUnit.test('components/library-item-form.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/library-item-form.js should pass ESLint\n\n9:7 - Use closure actions, unless you need bubbling (ember/closure-actions)');
  });

  QUnit.test('components/library-item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/library-item.js should pass ESLint\n\n');
  });

  QUnit.test('components/nav-link-to.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-link-to.js should pass ESLint\n\n');
  });

  QUnit.test('components/number-box.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/number-box.js should pass ESLint\n\n');
  });

  QUnit.test('components/seeder-block.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/seeder-block.js should pass ESLint\n\n29:9 - Use closure actions, unless you need bubbling (ember/closure-actions)\n34:7 - Use closure actions, unless you need bubbling (ember/closure-actions)');
  });

  QUnit.test('controllers/admin/seeder.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/admin/seeder.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/contact.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });

  QUnit.test('models/author.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/author.js should pass ESLint\n\n');
  });

  QUnit.test('models/book.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/book.js should pass ESLint\n\n');
  });

  QUnit.test('models/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/contact.js should pass ESLint\n\n');
  });

  QUnit.test('models/invitation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/invitation.js should pass ESLint\n\n');
  });

  QUnit.test('models/library.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/library.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/contacts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/contacts.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/invitations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/invitations.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/seeder.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/seeder.js should pass ESLint\n\n');
  });

  QUnit.test('routes/authors.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/authors.js should pass ESLint\n\n');
  });

  QUnit.test('routes/books.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/books.js should pass ESLint\n\n');
  });

  QUnit.test('routes/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/contact.js should pass ESLint\n\n');
  });

  QUnit.test('routes/libraries/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/libraries/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/libraries/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/libraries/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/libraries/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/libraries/new.js should pass ESLint\n\n');
  });
});
define('library-app/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createOfflineRef;


  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */
  function createOfflineRef(initialData, url = 'https://emberfire-tests-2c814.firebaseio.com', apiKey = 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o') {

    if (!_firebase.default._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    const config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    let app;

    try {
      app = _firebase.default.app();
    } catch (e) {
      app = _firebase.default.initializeApp(config);
    }

    const ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('library-app/tests/helpers/destroy-firebase-apps', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyFirebaseApps;


  const { run } = Ember;

  /**
   * Destroy all Firebase apps.
   */
  function destroyFirebaseApps() {
    const deletions = _firebase.default.apps.map(app => app.delete());
    Ember.RSVP.all(deletions).then(() => run(() => {
      // NOOP to delay run loop until the apps are destroyed
    }));
  }
});
define('library-app/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */
  function replaceAppRef(app, ref, model = 'application') {
    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('library-app/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */
  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('library-app/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = stubFirebase;


  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */
  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase.default._unStub) {
      var originalSet = _firebase.default.database.Reference.prototype.set;
      var originalUpdate = _firebase.default.database.Reference.prototype.update;
      var originalRemove = _firebase.default.database.Reference.prototype.remove;

      _firebase.default._unStub = function () {
        _firebase.default.database.Reference.prototype.set = originalSet;
        _firebase.default.database.Reference.prototype.update = originalUpdate;
        _firebase.default.database.Reference.prototype.remove = originalRemove;
      };

      _firebase.default.database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('library-app/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = unstubFirebase;
  function unstubFirebase() {
    if (typeof _firebase.default._unStub === 'function') {
      _firebase.default._unStub();
      delete _firebase.default._unStub;
    }
  }
});
define('library-app/tests/integration/components/fader-label-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | fader-label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ZBSlcHd9",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fader-label\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sTbMBkyl",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"fader-label\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('library-app/tests/integration/components/library-item-form-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | library-item-form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "u4DE5BEx",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"library-item-form\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1lkT3iK2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"library-item-form\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('library-app/tests/integration/components/library-item-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | library-item', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "i6a5oPLk",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"library-item\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WnTbCGti",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"library-item\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('library-app/tests/integration/components/nav-link-to-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | nav-link-to', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ZC7ZeNBZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"nav-link-to\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sJERxG1b",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"nav-link-to\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('library-app/tests/integration/components/number-box-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | number-box', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "pSUBoA2p",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"number-box\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "tdiZ2P4v",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"number-box\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('library-app/tests/integration/components/seeder-block-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | seeder-block', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "YkbA7g0S",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"seeder-block\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xPA+L+c5",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"seeder-block\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('library-app/tests/test-helper', ['library-app/app', 'library-app/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('library-app/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/fader-label-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fader-label-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/library-item-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/library-item-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/library-item-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/library-item-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/nav-link-to-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/nav-link-to-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/number-box-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/number-box-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/seeder-block-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/seeder-block-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/admin/seeder-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/admin/seeder-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/contact-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/author-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/author-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/book-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/book-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/contact-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/invitation-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/invitation-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/library-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/library-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/about-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/contacts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/contacts-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/invitations-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/invitations-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/seeder-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/seeder-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/authors-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/authors-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/books-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/books-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/contact-test.js should pass ESLint\n\n');
  });
});
define('library-app/tests/unit/controllers/admin/seeder-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | admin/seeder', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:admin/seeder');
      assert.ok(controller);
    });
  });
});
define('library-app/tests/unit/controllers/contact-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:contact');
      assert.ok(controller);
    });
  });
});
define('library-app/tests/unit/controllers/index-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:index');
      assert.ok(controller);
    });
  });
});
define('library-app/tests/unit/models/author-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | author', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('author', {}));
      assert.ok(model);
    });
  });
});
define('library-app/tests/unit/models/book-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | book', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('book', {}));
      assert.ok(model);
    });
  });
});
define('library-app/tests/unit/models/contact-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('contact', {}));
      assert.ok(model);
    });
  });
});
define('library-app/tests/unit/models/invitation-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | invitation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('invitation', {}));
      assert.ok(model);
    });
  });
});
define('library-app/tests/unit/models/library-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | library', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('library', {}));
      assert.ok(model);
    });
  });
});
define('library-app/tests/unit/routes/about-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | about', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:about');
      assert.ok(route);
    });
  });
});
define('library-app/tests/unit/routes/admin/contacts-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin/contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin/contacts');
      assert.ok(route);
    });
  });
});
define('library-app/tests/unit/routes/admin/invitations-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin/invitations', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin/invitations');
      assert.ok(route);
    });
  });
});
define('library-app/tests/unit/routes/admin/seeder-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin/seeder', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin/seeder');
      assert.ok(route);
    });
  });
});
define('library-app/tests/unit/routes/authors-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | authors', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:authors');
      assert.ok(route);
    });
  });
});
define('library-app/tests/unit/routes/books-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | books', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:books');
      assert.ok(route);
    });
  });
});
define('library-app/tests/unit/routes/contact-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact');
      assert.ok(route);
    });
  });
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

require('library-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map