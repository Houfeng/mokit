/*istanbul ignore next*/'use strict';

var Directive = require('../directive');

module.exports = new Directive({
  execute: function /*istanbul ignore next*/execute(scope) {
    /*istanbul ignore next*/var _this = this;

    var state = this.expression.execute(scope);
    setTimeout(function () {
      if (state) /*istanbul ignore next*/_this.node.focus();else /*istanbul ignore next*/_this.node.blur();
    }, 0);
  }
});