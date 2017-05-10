/*istanbul ignore next*/'use strict';

var Class = require('cify');
var utils = require('ntils');
var Expression = require('./expression');

/**
 * 指令定义工场函数
 * @param {Object} classOptions 选项
 * @returns {Directive} 指令类
 */
function Directive(classOptions) {
  //处理指令选项
  classOptions = classOptions || {};
  classOptions.type = classOptions.type || Directive.TA;
  classOptions.level = classOptions.level || Directive.LG;

  //生成指令类
  var DirectiveClass = new Class({

    $extends: classOptions,
    //指令构建函数
    constructor: function /*istanbul ignore next*/constructor(instanceOptions) {
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
      var newValue = this.options.literal ? this.attribute.value : this.expression.execute(scope);
      if (!utils.deepEqual(this._value_, newValue)) {
        this.update(newValue, this._value_);
        this._value_ = newValue;
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
  utils.setPrototypeOf(DirectiveClass, classOptions);
  return DirectiveClass;
}

//指令类型
Directive.TA = 'A';
Directive.TE = 'E';

//指令级别
Directive.LP = 3000; //prevent
Directive.LS = 2000; //statement
Directive.LE = 1000; //eleemtn
Directive.LG = 0; //general
Directive.LA = -1000; //any attribute
Directive.LC = -2000; //cloak

module.exports = Directive;