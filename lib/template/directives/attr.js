/*istanbul ignore next*/'use strict';

var Directive = require('../directive');

module.exports = new Directive({
  update: function /*istanbul ignore next*/update(value) {
    var target = this.node.$target || this.node;
    if (target.setAttribute) {
      target.setAttribute(this.decorates[0], value);
    } else {
      target[this.decorates[0]] = value;
    }
  }
});