const Directive = require('../directive');

module.exports = new Directive({
  level: Directive.LC,
  literal: true,
  prefix: false,

  bind: function () {
    this.node.removeAttribute(this.attribute.name);
  }

});