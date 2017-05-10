/*istanbul ignore next*/'use strict';

var Directive = require('../directive');

module.exports = new Directive({
  level: Directive.LC,
  literal: true,
  prefix: false,

  bind: function /*istanbul ignore next*/bind() {
    this.node.removeAttribute(this.attribute.name);
  }

});