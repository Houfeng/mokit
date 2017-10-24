const Directive = require('../directive');
const { trim } = require('ntils');
const { meta } = require('decorators');

@meta({
  type: Directive.types.ELEMENT,
  prefix: false
})
class TextDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    let nodeValue = trim(this.node.nodeValue);
    if (!nodeValue) return;
    this.node.nodeValue = '';
    this.contentExpr = this.parseExpr(nodeValue, true);
  }

  execute(scope) {
    if (!this.contentExpr) return;
    this.scope = scope;
    let newValue = this.contentExpr(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

}

module.exports = TextDirective;