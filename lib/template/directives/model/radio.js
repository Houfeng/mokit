const Directive = require('../../directive');
const EventEmitter = require('../../../events');
const Scope = require('../../scope');

module.exports = new Directive({
  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: this.node.value
      }));
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
    let value = this.expression.execute(scope);
    this.node.checked = value == this.node.value;
  }

});