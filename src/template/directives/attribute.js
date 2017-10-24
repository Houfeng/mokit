const Directive = require('../directive');
const { meta } = require('decorators');
const { isNull } = require('ntils');

/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */
@meta({
  level: Directive.levels.ATTRIBUTE,
  prefix: false,
  literal: true,
  remove: false
})
class AttributeDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.computedName = this.attribute.name;
    this.computedValue = this.attribute.value;
    this.nameExpr = this.parseExpr(this.attribute.name, true);
    this.valueExpr = this.parseExpr(this.attribute.value, true);
  }

  execute(scope) {
    let newComputedName = this.nameExpr(scope);
    if (this.computedName !== newComputedName) {
      //移除旧名称
      this.node.removeAttribute(this.computedName);
      //设置新名称
      this.computedName = newComputedName;
      if (!isNull(this.computedName) && this.computedName.length > 0) {
        this.node.setAttribute(this.computedName, this.computedValue || '');
      }
    }
    let newComputeValue = this.valueExpr(scope);
    if (this.computedValue !== newComputeValue) {
      this.computedValue = newComputeValue;
      this.node.setAttribute(this.computedName, this.computedValue || '');
    }
  }

}

module.exports = AttributeDirective;