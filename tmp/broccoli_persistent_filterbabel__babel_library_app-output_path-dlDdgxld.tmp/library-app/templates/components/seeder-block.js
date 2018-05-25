define("library-app/templates/components/seeder-block", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5ujPlME+", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"well well-sm extra-padding-bottom\"],[8],[0,\"\\n  \"],[6,\"h3\"],[8],[1,[20,\"sectionTitle\"],false],[9],[0,\"\\n  \\n  \"],[6,\"div\"],[10,\"class\",\"form-inline\"],[8],[0,\"\\n  \\n   \"],[6,\"div\"],[11,\"class\",[27,[\"form-group has-feedback \",[26,\"unless\",[[22,[\"isCounterValid\"]],\"has-error\"],null]]]],[8],[0,\"\\n     \"],[6,\"label\"],[10,\"class\",\"control-label\"],[8],[0,\"Number of new records:\"],[9],[0,\"\\n     \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"counter\"]],\"form-control\",[22,[\"placeholder\"]]]]],false],[0,\"\\n   \"],[9],[0,\"\\n  \\n   \"],[6,\"button\"],[10,\"class\",\"btn btn-primary\"],[11,\"disabled\",[20,\"generateIsDisabled\"],null],[3,\"action\",[[21,0,[]],\"generateAction\"]],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"generateInProgress\"]]],null,{\"statements\":[[0,\"       \"],[6,\"span\"],[10,\"class\",\"glyphicon glyphicon-refresh spinning\"],[8],[9],[0,\" Generating...\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"       Generate \"],[1,[20,\"sectionTitle\"],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"   \"],[9],[0,\"\\n   \"],[4,\"fader-label\",null,[[\"isShowing\"],[[22,[\"generateReady\"]]]],{\"statements\":[[0,\"Created!\"]],\"parameters\":[]},null],[0,\"\\n  \\n   \"],[6,\"button\"],[10,\"class\",\"btn btn-danger\"],[11,\"disabled\",[20,\"deleteIsDisabled\"],null],[3,\"action\",[[21,0,[]],\"deleteAction\"]],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"deleteInProgress\"]]],null,{\"statements\":[[0,\"       \"],[6,\"span\"],[10,\"class\",\"glyphicon glyphicon-refresh spinning\"],[8],[9],[0,\" Deleting...\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"       Delete All \"],[1,[20,\"sectionTitle\"],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"   \"],[9],[0,\"\\n   \"],[4,\"fader-label\",null,[[\"isShowing\"],[[22,[\"deleteReady\"]]]],{\"statements\":[[0,\"Deleted!\"]],\"parameters\":[]},null],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/seeder-block.hbs" } });
});