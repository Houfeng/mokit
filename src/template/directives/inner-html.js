const Directive = require('../directive');

module.exports = new Directive({
  update: function (newValue) {
    this.node.innerHTML = newValue;
  }
});