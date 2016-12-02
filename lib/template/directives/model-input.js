const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: /^(input|textarea)$/i,
  test: function (matchInfo) {
    let inputType = matchInfo.node.getAttribute('type');
    return inputType !== 'radio' && inputType !== 'checkbox';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.value);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    let value = this.expression.execute(scope);
    if (this.node.value !== value) {
      this.node.value = value;
    }
  }

});