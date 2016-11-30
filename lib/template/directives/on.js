const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'on',
  type: Directive.TYPE_ATTRIBUTE,
  literal: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    var attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    this.expr = new this.Expression(attrValue);
    var eventTarget = this.node.$target || this.node;
    this.emiter = new EventEmitter(eventTarget);
    this.emiter.addListener(this.decorates[0], function (event) {
      if (this.utils.isNull(this.scope)) return;
      var scope = { __proto__: this.scope };
      scope.event = scope.$event = event;
      this.expr.execute(scope);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
  }

});