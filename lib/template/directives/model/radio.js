const Directive = require('../../directive');
const EventEmitter = require('../../../events');

module.exports = new Directive({
  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.value);
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