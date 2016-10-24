const Directive = require('../directive');

module.exports = new Directive({
  name: 'html',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node.innerHTML = newValue;
  }

});