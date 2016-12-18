const Directive = require('../directive');

module.exports = new Directive({
  name: 'html',
  type: Directive.TA,

  update: function (newValue) {
    this.node.innerHTML = newValue;
  }

});