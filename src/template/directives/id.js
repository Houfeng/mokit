const Directive = require('../directive');

module.exports = new Directive({
  literal: true,

  update: function (id) {
    if (id in this.scope) {
      throw new Error('Conflicting component id `' + id + '`');
    }
    this.scope[id] = this.node.$target || this.node;
  }

});