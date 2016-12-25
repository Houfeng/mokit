const Directive = require('../directive');

module.exports = new Directive({
  update: function (value) {
    let target = this.node.$target || this.node;
    target[this.decorates[0]] = value;
  }
});