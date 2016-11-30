const Class = require('cify');
const utils = require('ntils');
const Expression = require('./expression');

/**
 * 指令定义信息类
 * 可以通过每一个「指令类」的的「静态成员」访问
 * 也可通过「指令实例」的「实例成员」访问
 */
const DirectiveDefinition = new Class({
  $name: 'DirectiveDefinition',

  $extends: Directive.prototype,

  /**
   * 构造一个指令定义信息对象
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor: function (options) {
    if (!options ||
      !utils.isString(options.name) ||
      options.name.length < 1) {
      throw new Error('Invalid directive options');
    }
    //拷贝所有成员到当前 definition 实例
    this.customTest = options.test;
    delete options.test;
    utils.copy(this._faultHanlde(options), this);
  },

  /**
   * 针对「选项」做容错处理
   * @param {Object} options 原姓选项
   * @returns {Object} 处理后的选项
   */
  _faultHanlde: function (options) {
    options.type = options.type || Directive.TYPE_ATTRIBUTE;
    options.level = options.level || Directive.LEVEL_GENERAL;
    options.match = options.match || options.name;
    if (!(options.match instanceof RegExp)) {
      options.match = new RegExp('^' + options.match + '$', 'i');
    }
    if (options.tag && !(options.tag instanceof RegExp)) {
      options.tag = new RegExp('^' + options.tag + '$', 'i');
    }
    return options;
  },

  /**
   * 检查指令是否匹配
   * @returns {boolean} 测试结果
   */
  test: function (matchInfo) {
    return (this.type === matchInfo.type) &&
      (!this.tag || matchInfo.node && this.tag.test(matchInfo.node.nodeName)) &&
      (this.prefix === false || matchInfo.prefix === matchInfo.compiler.prefix) &&
      (this.match.test(matchInfo.name)) &&
      (!this.customTest || this.customTest(matchInfo));
  }

});

/**
 * 指定定义工场函数
 * @param {Object} defineOpts 选项
 * @returns {Directive} 指令类
 */
function Directive(options) {
  //创建 definition 实例
  const definition = new DirectiveDefinition(options);
  //生成指令类
  const DirectiveClass = new Class({
    $name: 'Directive',

    $extends: definition,
    //指令构建函数
    constructor: function (instanceOptions) {
      utils.copy(instanceOptions, this);
    },
    //挂载实例上的 definition
    definition: definition,
    //挂载实例核心方法
    bind: options.bind || utils.noop,
    execute: options.execute || function (scope) {
      this.scope = scope;
      if (this.definition.type === Directive.TYPE_ELEMENT) {
        return this.update();
      }
      var newValue = this.definition.literal ?
        this.attribute.value : this.expression.execute(scope);
      if (!utils.deepEqual(this.__value__, newValue)) {
        this.update(newValue, this.__value__);
        this.__value__ = newValue;
      }
    },
    update: options.update || utils.noop,
    unbind: options.unbind || utils.noop,
    //挂载指令常用的类型
    utils: utils,
    Expression: Expression
  });
  //向指令类添加「指令定义信息」
  DirectiveClass.definition = definition;
  DirectiveClass.__proto__ = definition;
  return DirectiveClass;
};

//挂载指令定义信息类
Directive.Definition = DirectiveDefinition;

//指令类型
Directive.TYPE_ATTRIBUTE = 'attribute';
Directive.TYPE_ELEMENT = 'element';

//指令级别
Directive.LEVEL_PREVENT = 3000;
Directive.LEVEL_STATEMENT = 2000;
Directive.LEVEL_ELEMENT = 1000;
Directive.LEVEL_GENERAL = 0;
Directive.LEVEL_ATTRIBUTE = -1000;
Directive.LEVEL_CLOAK = -2000;

utils.defineFreezeProp(Directive, 'name', 'Directive');

module.exports = Directive;