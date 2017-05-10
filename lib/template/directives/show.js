/*istanbul ignore next*/'use strict';

var Directive = require('../directive');

module.exports = new Directive({
  update: function /*istanbul ignore next*/update(value) {
    this.node.style.display = value ? '' : 'none';
  }
});