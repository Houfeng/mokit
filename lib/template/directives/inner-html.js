/*istanbul ignore next*/'use strict';

var Directive = require('../directive');

module.exports = new Directive({
  update: function /*istanbul ignore next*/update(newValue) {
    this.node.innerHTML = newValue;
  }
});