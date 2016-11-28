const Directive = require('../directive');

module.exports = new Directive({
  name: 'id',
  type: Directive.TYPE_ATTRIBUTE,
  literal: true,

  update: function (value) {
    this.scope[value] = this.node;
  }

});