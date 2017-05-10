/*istanbul ignore next*/'use strict';

var Directive = require('../directive');

module.exports = new Directive({
  update: function /*istanbul ignore next*/update(value) {
    var target = this.node.$target || this.node;
    target[this.decorates[0]] = value;
  }
  // execute: function (scope) {
  //   this.scope = scope;
  //   let newValue = this.expression.execute(scope);
  //   let target = this.node.$target || this.node;
  //   target[this.decorates[0]] = newValue;
  // }
});