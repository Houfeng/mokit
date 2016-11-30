const Directive = require('../directive');

module.exports = new Directive({
  name: 'prop',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (value) {
    var target = this.node.$target || this.node;
    target[this.decorates[0]] = value;
  }

});