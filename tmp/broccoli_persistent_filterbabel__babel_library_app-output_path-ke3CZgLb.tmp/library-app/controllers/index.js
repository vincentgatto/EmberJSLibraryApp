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