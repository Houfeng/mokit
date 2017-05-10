const Class = require('cify');
const utils = require('ntils');

/**
 * 表达式类型，将字符串构析为可执行表达式实例
 */
const Expression = new Class({

  /**
   * 通过字符串构造一个表达式实例
   * @param {string} code 代码字符串
   * @param {boolean} mix 是否是混合代码
   * @returns {void} 无返回
   */
  constructor: function (code, mix) {
    this.func = mix ?
      this._compileMixedCode(code) :
      this._compileCode(code);
  },

  /**
   * 编译普通表达式代码
   * @param {string} code 代码字符串
   * @returns {function} 编辑后的函数
   */
  _compileCode: function (code) {
    code = this._escapeEOL(this._wrapCode(code));
    return this._createFunction(code);
  },

  /**
   * 编辑混合的表达式代码
   * @param {string} code 代码字符串
   * @returns {function} 编辑后的函数
   */
  _compileMixedCode: function (code) {
    let statements = this._parseMixedCode(code);
    code = this._escapeEOL(statements.join('+'));
    return this._createFunction(code);
  },

  /**
   * 通过符串代码创建一个可执行函数
   * @param {string} code 代码字符串
   * @returns {function} 创建的函数
   */
  _createFunction: function (code) {
    let func = new Function('utils', 'scope', 'with(scope){return ' + code + '}');
    return func.bind(null, utils);
  },

  /**
   * 解析混合代码字符串
   * @param {string} code 混合代码字符串
   * @returns {Array} 解析后的「token」列表
   */
  _parseMixedCode: function (code) {
    let index = 0, length = code.length;
    let token = '', isExpr = false, tokens = [];
    while (index <= length) {
      let char = code[index++];
      let nextChar = code[index];
      if (utils.isNull(char)) {
        if (token.length > 0) {
          tokens.push('"' + this._escapeCode(token) + '"');
        }
        token = '';
        isExpr = false;
      } else if (!isExpr && char + nextChar == '{{') {
        if (token.length > 0) {
          tokens.push('"' + this._escapeCode(token) + '"');
        }
        token = '';
        isExpr = true;
        index++;
      } else if (isExpr && char + nextChar == '}}') {
        if (token.length > 0) {
          tokens.push(this._wrapCode(token));
        }
        token = '';
        isExpr = false;
        index++;
      } else {
        token += char;
      }
    }
    return tokens;
  },

  /**
   * 转义处理代码字符串
   * @param {string} code 源字符串
   * @returns {string} 处理后的字符串
   */
  _escapeCode: function (code) {
    return code.replace(/"/, '\\"').replace('\r\n', '\\r\\n').replace('\n', '\\n');
  },

  /**
   * 转义换行符
   * @param {string} code 源字符串
   * @returns {string} 处理后的字符串
   */
  _escapeEOL: function (code) {
    return code.replace(/\n/gm, '\\\n');
  },

  /**
   * 通过闭包和 try/cache 包裹代码
   * 将模板中错误的代码直接显示在「模板中用到的位置」，更易于定位错误。
   * @param {string} code 源字符串
   * @returns {string} 处理后的字符串
   */
  _wrapCode: function (code) {
    return '((function(){try{return (' + code + ')}catch(err){console.error(err);return err;}})())';
  },

  /**
   * 通过 scope 对象执行表达式
   * @param {Object} scope 上下文对象
   * @returns {Object} 执行结果
   */
  execute: function (scope) {
    if (utils.isNull(scope)) {
      scope = {};
    }
    return this.func.call(scope, scope);
  }

});

module.exports = Expression;