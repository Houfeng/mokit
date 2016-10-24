const Directive = require('../directive');

module.exports = new Directive({
  name: 'text',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node.innerText = newValue;
  }

});