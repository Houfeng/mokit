const Directive = require('../directive');

module.exports = new Directive({
  name: 'show',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (value) {
    this.node.style.display = value ? '' : 'none';
  }

});