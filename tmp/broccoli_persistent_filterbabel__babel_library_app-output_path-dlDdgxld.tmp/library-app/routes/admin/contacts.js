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