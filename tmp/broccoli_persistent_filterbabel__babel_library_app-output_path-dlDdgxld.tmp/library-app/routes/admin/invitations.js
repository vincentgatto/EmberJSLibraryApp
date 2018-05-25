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