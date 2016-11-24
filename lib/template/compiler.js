const Class = require('cify');
const Directive = require('./directive');
const utils = require('ntils');
const Expression = require('./expression');
const directives = require('./directives');

const DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */
const Compiler = new Class({

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor: function (options) {
    options = options || Object.create(null);
    options.directives = options.directives || [];
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.directives = directives.concat(options.directives);
  },

  /**
   * 解析要匹配的名称
   * @param {string} name 要解析的名称字符串
   * @param {HTMLNode} node 当前 HTML 元素结点
   * @returns {Object} 解析后的对象
   */
  _parseMatchInfo: function (name, type, node) {
    var parts = name.toLowerCase().split(':');
    var info = {
      type: type,
      compiler: this,
      node: node
    };
    if (parts.length > 1) {
      info.prefix = parts[0];
      info.name = parts[1];
      info.decorates = parts.slice(2);
    } else {
      info.prefix = null;
      info.name = parts[0];
      info.decorates = [];
    }
    return info;
  },

  /**
   * 查找所有匹配的指令
   * @param {Object} matchInfo 匹配信息
   * @returns {Array} 指令列表
   */
  _findDirectives: function (matchInfo) {
    return this.directives.filter(function (Directive) {
      return Directive.definition.test(matchInfo);
    }, this);
  },

  /**
   * 创建一个指令实例
   * @param {Directive} Directive 指令类
   * @param {Object} options 指令构建选项
   * @returns {Directive} 指令实例
   */
  _createDirectiveInstance: function (Directive, options) {
    options.compiler = this;
    options.prefix = this.prefix;
    return new Directive(options);
  },

  /**
   * 初始化一个编译完成的 handler
   * @param {function} handler 编译后的的模板函数
   * @returns {void} 无返回
   */
  _bindHandler: function (handler) {
    //排序 directives
    handler.directives = handler.directives.sort(function (a, b) {
      return b.level - a.level;
    });
    //初始化 directives
    var boundDirectives = [];
    utils.each(handler.directives, function (index, directive) {
      directive.index = index;
      directive.bind();
      boundDirectives.push(directive);
      //如果遇到一个「终态」指令，停止向下初始化
      //如果 each、if 等为「终态指令」
      if (directive.final) return handler.final = true;
    }, this);
    handler.directives = boundDirectives;
  },

  /**
   * 编辑一个元素本身
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileElement: function (handler, node) {
    var matchInfo = this._parseMatchInfo(node.nodeName, Directive.TYPE_ELEMENT, node);
    var elementDirectives = this._findDirectives(matchInfo);
    elementDirectives.forEach(function (Directive) {
      handler.directives.push(this._createDirectiveInstance(Directive, {
        handler: handler,
        node: node,
        decorates: matchInfo.decorates
      }));
    }, this);
  },

  /**
   * 编辑一个元素所有 attributes 
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileAttributes: function (handler, node) {
    utils.toArray(node.attributes).forEach(function (attribute) {
      var matchInfo = this._parseMatchInfo(attribute.name, Directive.TYPE_ATTRIBUTE, node);
      var attributeDirectives = this._findDirectives(matchInfo);
      attributeDirectives.forEach(function (Directive) {
        var definition = Directive.definition;
        handler.directives.push(this._createDirectiveInstance(Directive, {
          handler: handler,
          node: node,
          attribute: attribute,
          expression: definition.literal ?
            attribute.value : new Expression(attribute.value),
          decorates: matchInfo.decorates
        }));
      }, this);
    }, this);
  },

  /**
   * 编辑所有子结点
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileChildren: function (handler, node) {
    if (handler.final) return;
    utils.toArray(node.childNodes).forEach(function (childNode) {
      var childHandler = this.compile(childNode);
      childHandler.parent = this;
      handler.children.push(childHandler);
    }, this);
  },

  /**
   * 编译一个模板
   * @param {HTMLNode} node 模板根元素
   * @returns {function} 模板函数
   */
  compile: function (node) {
    //定义编译结果函数
    var handler = function (scope) {
      if (utils.isNull(scope)) scope = Object.create(null);
      //执行指令
      handler.directives.forEach(function (directive) {
        directive.scope = scope;
        directive.execute(scope);
      }, this);
      //执行子元素编译函数
      handler.children.forEach(function (childHandler) {
        childHandler(scope);
      }, this);
    };
    handler.dispose = function () {
      //执行指令
      handler.directives.forEach(function (directive) {
        directive.unbind();
      }, this);
      //执行子元素编译函数
      handler.children.forEach(function (childHandler) {
        childHandler.dispose();
      }, this);
    };
    //定义 children & directives 
    handler.directives = [];
    handler.children = [];
    if (node) {
      //编辑相关指令
      this._compileElement(handler, node);
      this._compileAttributes(handler, node);
      this._bindHandler(handler);
      this._compileChildren(handler, node);
    }
    //返回编译后函数
    return handler.bind(null);
  }

});

module.exports = Compiler;