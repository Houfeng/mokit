const Directive = require('../directive');

module.exports = new Directive({
  name: 'prop',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node[this.decorates[0]] = newValue;
  }

});