const Directive = require('../../directive');
const Scope = require('../../scope');

module.exports = new Directive({

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.target = this.node.$target;
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.bindProp = this.decorates[0];
    if (!this.target) {
      throw new Error(`Directive \`model:${this.bindProp}\` cannot be used on \`${this.node.tagName}\``);
    }
    this.watcher = this.target.$watch(this.bindProp, (value) => {
      if (this.utils.isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: value
      }));
    });
  },

  unbind: function () {
    this.target.$unWatch(this.watcher);
  },

  update: function (value) {
    this.target[this.bindProp] = value;
  }

});