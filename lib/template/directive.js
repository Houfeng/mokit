const Class = require('cify');
const utils = require('ntils');
const Expression = require('./expression');

/**
 * 指令定义工场函数
 * @param {Object} classOptions 选项
 * @returns {Directive} 指令类
 */
function Directive(classOptions) {
  //处理指令选项
  classOptions = classOptions || utils.create(null);
  classOptions.type = classOptions.type || Directive.TA;
  classOptions.level = classOptions.level || Directive.LG;

  //生成指令类
  const DirectiveClass = new Class({
    $name: 'Directive',

    $extends: classOptions,
    //指令构建函数
    constructor: function (instanceOptions) {
      utils.copy(instanceOptions, this);
    },
    //挂载实例上的 options
    options: classOptions,
    //挂载实例核心方法
    bind: classOptions.bind || utils.noop,
    execute: classOptions.execute || function (scope) {
      this.scope = scope;
      if (this.options.type === Directive.TE) {
        return this.update();
      }
      let newValue = this.options.literal ?
        this.attribute.value : this.expression.execute(scope);
      if (!utils.deepEqual(this.__value__, newValue)) {
        this.update(newValue, this.__value__);
        this.__value__ = newValue;
      }
    },
    update: classOptions.update || utils.noop,
    unbind: classOptions.unbind || utils.noop,
    //挂载指令常用的类型
    utils: utils,
    Expression: Expression
  });
  //向指令类添加「指令定义信息」
  DirectiveClass.options = classOptions;
  DirectiveClass.__proto__ = classOptions;
  return DirectiveClass;
}

//指令类型
Directive.TA = 'A';
Directive.TE = 'E';

//指令级别
Directive.LP = 3000;  //prevent
Directive.LS = 2000;  //statement
Directive.LE = 1000;  //eleemtn
Directive.LG = 0;     //general
Directive.LA = -1000; //any attribute
Directive.LC = -2000; //cloak

utils.defineFreezeProp(Directive, 'name', 'Directive');

module.exports = Directive;