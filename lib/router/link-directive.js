const Directive = require('../template/directive');
const EventEmitter = require('../events');

module.exports = new Directive({
  name: 'link',
  type: Directive.TYPE_ATTRIBUTE,
  literal: true,

  bind: function () {
    let eventTarget = this.node.$target || this.node;
    this.emiter = new EventEmitter(eventTarget);
    this.emiter.addListener(this.decorates[0] || 'tap', function (event) {
      if (!this.scope || !this.scope.$router) return;
      this.scope.$router.go(this.path);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  update: function (path) {
    this.path = path;
  }

});