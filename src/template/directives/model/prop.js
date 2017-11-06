const Directive = require('../../directive');
const Scope = require('../../scope');
const { Error } = require('common');
const { isNull } = require('ntils');

module.exports = class PropModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.component = this.node.component;
    this.backExpr = this.parseExpr(`$scope.${this.attribute.value}=$value`);
    this.bindProp = this.decorates[0];
    if (!this.component) {
      throw new Error(
        `Directive \`model:${this.bindProp}\` cannot be used on \`${this.node.tagName}\``
      );
    }
    this.watcher = this.component.$watch(this.bindProp, (value) => {
      if (isNull(this.scope)) return;
      this.backExpr(new Scope(this.scope, {
        $value: value
      }));
    });
  }

  unbind() {
    this.component.$unWatch(this.watcher);
  }

  update(value) {
    this.component[this.bindProp] = value;
  }

};