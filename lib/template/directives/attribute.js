const Directive = require('../directive');

/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */
module.exports = new Directive({
  name: 'attribute',
  type: Directive.TA,
  level: Directive.LA,
  prefix: false,
  literal: true,
  remove: false,
  match: /[\s\S]/i,

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
    let newComputedName = this.nameExpr.execute(scope);
    if (this.computedName !== newComputedName) {
      this.node.removeAttribute(this.computedName);
      this.computedName = newComputedName;
      if (!this.utils.isNull(this.computedName) && this.computedName.length > 0) {
        this.node.setAttribute(this.computedName, '');
      }
    }
    let newComputeValue = this.valueExpr.execute(scope);
    newComputeValue = this.utils.isNull(newComputeValue) ? '' : newComputeValue;
    if (this.computedValue !== newComputeValue) {
      this.computedValue = newComputeValue;
      this.node.setAttribute(
        this.computedName,
        this.computedValue
      );
    }
  }

});