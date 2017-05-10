const Directive = require('../directive');

module.exports = new Directive({
  update: function (value) {
    this.node.style.display = value ? '' : 'none';
  }
});