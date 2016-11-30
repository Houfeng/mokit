const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'on',
  type: Directive.TYPE_ATTRIBUTE,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener(this.decorates[0], function (event) {
      if (this.utils.isNull(this.scope)) return;
      var scope = { __proto__: this.scope };
      scope.event = scope.$event = event;
      this.expression.execute(scope);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
  }

});