QUnit.module('ESLint | app');

QUnit.test('adapters/application.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
});

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('components/library-item-form.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/library-item-form.js should pass ESLint\n\n9:7 - Use closure actions, unless you need bubbling (ember/closure-actions)');
});

QUnit.test('components/library-item.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/library-item.js should pass ESLint\n\n');
});

QUnit.test('components/nav-link-to.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/nav-link-to.js should pass ESLint\n\n');
});

QUnit.test('controllers/contact.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'controllers/contact.js should pass ESLint\n\n');
});

QUnit.test('controllers/index.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
});

QUnit.test('models/contact.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/contact.js should pass ESLint\n\n');
});

QUnit.test('models/invitation.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/invitation.js should pass ESLint\n\n');
});

QUnit.test('models/library.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/library.js should pass ESLint\n\n');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/about.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/about.js should pass ESLint\n\n');
});

QUnit.test('routes/admin/contacts.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/admin/contacts.js should pass ESLint\n\n');
});

QUnit.test('routes/admin/invitations.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/admin/invitations.js should pass ESLint\n\n');
});

QUnit.test('routes/contact.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/contact.js should pass ESLint\n\n');
});

QUnit.test('routes/libraries/edit.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/libraries/edit.js should pass ESLint\n\n');
});

QUnit.test('routes/libraries/index.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/libraries/index.js should pass ESLint\n\n');
});

QUnit.test('routes/libraries/new.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/libraries/new.js should pass ESLint\n\n');
});

