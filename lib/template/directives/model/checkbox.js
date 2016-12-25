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
      let value = this.utils.getByPath(this.scope, this.bindPath);
      if (this.utils.isArray(value) && this.node.checked) {
        value.push(this.node.value);
      } else if (this.utils.isArray(value) && !this.node.checked) {
        let index = value.indexOf(this.node.value);
        value.splice(index, 1);
      } else {
        this.utils.setByPath(this.scope, this.bindPath, this.node.checked);
      }
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
    let value = this.expression.execute(scope);
    if (this.utils.isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  }

});