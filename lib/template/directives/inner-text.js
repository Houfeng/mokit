const Directive = require('../directive');

module.exports = new Directive({
  name: 'text',
  type: Directive.TA,

  update: function (newValue) {
    this.node.innerText = newValue;
  }

});