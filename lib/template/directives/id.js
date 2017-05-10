/*istanbul ignore next*/'use strict';

var Directive = require('../directive');

module.exports = new Directive({
  literal: true,

  update: function /*istanbul ignore next*/update(id) {
    if (id in this.scope) {
      throw new Error('Conflicting component id `' + id + '`');
    }
    this.scope[id] = this.node.$target || this.node;
  }

});