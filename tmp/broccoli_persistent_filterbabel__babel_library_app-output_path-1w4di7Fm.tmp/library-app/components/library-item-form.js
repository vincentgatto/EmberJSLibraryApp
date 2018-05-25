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