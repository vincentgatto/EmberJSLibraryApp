define('library-app/models/library', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    address: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string')
  });
});