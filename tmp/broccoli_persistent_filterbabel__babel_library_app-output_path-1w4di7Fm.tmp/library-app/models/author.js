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