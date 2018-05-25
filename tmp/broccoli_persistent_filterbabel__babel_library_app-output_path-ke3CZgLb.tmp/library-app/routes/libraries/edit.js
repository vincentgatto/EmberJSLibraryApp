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