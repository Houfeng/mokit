/*istanbul ignore next*/'use strict';

var Class = require('cify');
var Directive = require('./directive');
var utils = require('ntils');
var Expression = require('./expression');
var commonDirectives = require('./directives');

var DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */
var Compiler = new Class({

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor: function /*istanbul ignore next*/constructor(options) {
    options = options || {};
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.elementDirectives = {};
    this.attributeDirectives = {};
    this.registerDirectives(commonDirectives);
    this.registerDirectives(options.directives);
  },

  /**
  * 将字符串转成「驼峰」式
  * @param {string} str 原始字符串
  * @param {number} mode 1 大驼峰，0 小驼峰
  * @return {string} 转换后的字符串
  */
  toCamelCase: function /*istanbul ignore next*/toCamelCase(str, mode) {
    if (str) {
      str = str.replace(/\-[a-z0-9]/g, function ($1) /*istanbul ignore next*/{
        return $1.slice(1).toUpperCase();
      });
      str = str.replace(/^[a-z]/i, function ($1) {
        return mode ? $1.toUpperCase() : $1.toLowerCase();
      });
    }
    return str;
  },

  /**
   * 将字符串转成分隔形式
   * @param {string} str 原始字符串
   * @return {string} 转换后的字符串
   */
  toSplitCase: function /*istanbul ignore next*/toSplitCase(str) {
    if (str) {
      str = str.replace(/([A-Z])/g, '-$1');
      if (str[0] == '-') str = str.slice(1);
    }
    return str;
  },

  /**
   * 添加指令
   * @param {Object} directives 指令集 
   * @returns {void} 无返回
   */
  registerDirectives: function /*istanbul ignore next*/registerDirectives(directives) {
    utils.each(directives, function (name, directive) {
      name = this.toSplitCase(name);
      var fullName = directive.options.prefix === false ? name : /*istanbul ignore next*/this.prefix + ':' + name;
      if (directive.options.type == Directive.TE) {
        this.elementDirectives[fullName.toUpperCase()] = directive;
      } else {
        this.attributeDirectives[fullName.toLowerCase()] = directive;
      }
    }, this);
  },

  /**
   * 解析要 attr 指令信息
   * @param {string} attrName 要解析的名称字符串
   * @returns {Object} 解析后的对象
   */
  _parseAttrInfo: function /*istanbul ignore next*/_parseAttrInfo(attrName) {
    /*istanbul ignore next*/var _this = this;

    var parts = attrName.toLowerCase().split(':');
    var info = {};
    if (parts.length > 1) {
      info.name = /*istanbul ignore next*/parts[0] + ':' + parts[1];
      info.decorates = parts.slice(2).map(function (item) /*istanbul ignore next*/{
        return (/*istanbul ignore next*/_this.toCamelCase(item)
        );
      });
    } else {
      info.name = parts[0];
      info.decorates = [];
    }
    return info;
  },

  /**
   * 创建一个指令实例
   * @param {Directive} Directive 指令类
   * @param {Object} options 指令构建选项
   * @returns {Directive} 指令实例
   */
  _createDirectiveInstance: function /*istanbul ignore next*/_createDirectiveInstance(Directive, options) {
    options.compiler = this;
    options.prefix = this.prefix;
    return new Directive(options);
  },

  /**
   * 初始化一个编译完成的 handler
   * @param {function} handler 编译后的的模板函数
   * @returns {void} 无返回
   */
  _bindHandler: function /*istanbul ignore next*/_bindHandler(handler) {
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
      //移除完成绑定的指令对应的 attribute
      if (directive.remove !== false && directive.attribute) {
        directive.node.removeAttribute(directive.attribute.name);
      }
      //如果遇到一个「终态」指令，停止向下初始化
      if (directive.final) {
        return handler.final = true;
      }
    }, this);
    handler.directives = boundDirectives;
  },

  /**
   * 编译一个元素本身
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileElement: function /*istanbul ignore next*/_compileElement(handler, node) {
    var ElementDirective = this.elementDirectives[node.nodeName.toUpperCase()];
    if (!ElementDirective) return;
    handler.directives.push(this._createDirectiveInstance(ElementDirective, {
      handler: handler,
      node: node
    }));
  },

  /**
   * 编译一个元素所有 attributes 
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileAttributes: function /*istanbul ignore next*/_compileAttributes(handler, node) {
    utils.toArray(node.attributes).forEach(function (attribute) {
      var attrInfo = this._parseAttrInfo(attribute.name);
      var AttrDirective = this.attributeDirectives[attrInfo.name] || this.attributeDirectives['*'];
      if (!AttrDirective) return;
      var directiveOptions = AttrDirective.options;
      handler.directives.push(this._createDirectiveInstance(AttrDirective, {
        handler: handler,
        node: node,
        attribute: attribute,
        expression: directiveOptions.literal ? attribute.value : new Expression(attribute.value, directiveOptions.mixed),
        decorates: attrInfo.decorates
      }));
    }, this);
  },

  /**
   * 编译所有子结点
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileChildren: function /*istanbul ignore next*/_compileChildren(handler, node) {
    if (handler.final) return;
    utils.toArray(node.childNodes).forEach(function (childNode) {
      if (childNode._compiled_) return;
      var childHandler = this.compile(childNode);
      childHandler.parent = this;
      handler.children.push(childHandler);
    }, this);
  },

  /**
   * 编译一个模板
   * @param {HTMLNode} node 模板根元素
   * @param {Object} options 选项
   * @returns {function} 模板函数
   */
  compile: function /*istanbul ignore next*/compile(node, options) {
    if (!node) {
      throw new Error('Invalid node for compile');
    }
    node._compiled_ = true;
    options = options || {};
    //定义编译结果函数
    var handler = function handler(scope) {
      if (utils.isNull(scope)) scope = {};
      handler.directives.forEach(function (directive) {
        directive.scope = scope;
        directive.execute(scope);
      }, this);
      handler.children.forEach(function (childHandler) {
        childHandler(scope);
      }, this);
    };
    //--
    handler.dispose = function () {
      handler.directives.forEach(function (directive) {
        directive.unbind();
      }, this);
      handler.children.forEach(function (childHandler) {
        childHandler.dispose();
      }, this);
    };
    handler.node = node;
    //定义 children & directives 
    handler.directives = [];
    handler.children = [];
    //编译相关指令
    if (options.element !== false) this._compileElement(handler, node);
    if (options.attribute !== false) this._compileAttributes(handler, node);
    this._bindHandler(handler);
    if (options.children !== false) this._compileChildren(handler, node);
    //返回编译后函数
    return handler;
  }

});

module.exports = Compiler;