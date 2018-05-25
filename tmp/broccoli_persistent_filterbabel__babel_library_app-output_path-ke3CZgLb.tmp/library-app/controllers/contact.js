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