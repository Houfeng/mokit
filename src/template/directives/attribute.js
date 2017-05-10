const Directive = require('../directive');

/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */
module.exports = new Directive({
  level: Directive.LA,
  prefix: false,
  literal: true,
  remove: false,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.computedName = this.attribute.name;
    this.computedValue = this.attribute.value;
    this.nameExpr = new this.Expression(this.attribute.name, true);
    this.valueExpr = new this.Expression(this.attribute.value, true);
  },

  execute: function (scope) {
    let target = this.node.$target || this.node;
    let newComputedName = this.nameExpr.execute(scope);
    if (this.computedName !== newComputedName) {
      //移除旧名称
      if (target.removeAttribute) {
        target.removeAttribute(this.computedName);
      }
      //设置新名称
      this.computedName = newComputedName;
      if (!this.utils.isNull(this.computedName) && this.computedName.length > 0) {
        if (target.setAttribute) {
          target.setAttribute(this.computedName, this.computedValue || '');
        }
      }
    }
    let newComputeValue = this.valueExpr.execute(scope);
    if (this.computedValue !== newComputeValue) {
      this.computedValue = newComputeValue;
      if (target.setAttribute) {
        target.setAttribute(this.computedName, this.computedValue || '');
      } else {
        target[this.computedName] = this.computedValue;
      }
    }
  }

});