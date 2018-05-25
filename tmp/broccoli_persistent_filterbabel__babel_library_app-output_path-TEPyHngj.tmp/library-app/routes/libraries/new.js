define('library-app/routes/libraries/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return this.store.createRecord('library');
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