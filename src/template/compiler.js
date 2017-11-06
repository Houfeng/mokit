const Directive = require('./directive');
const { each, isNull, toArray, toCamelCase, toSplitCase } = require('ntils');
const expression = require('./expression');
const commonDirectives = require('./directives');
const { Error, Node } = require('common');

const DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */
module.exports = class Compiler {

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor(options) {
    options = options || {};
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.elementDirectives = {};
    this.attributeDirectives = {};
    this.registerDirectives({
      ...commonDirectives,
      ...options.directives
    });
  }

  /**
   * 添加指令
   * @param {Object} directives 指令集 
   * @returns {void} 无返回
   */
  registerDirectives(directives) {
    each(directives, (name, directive) => {
      name = toSplitCase(name);
      let fullName = directive.meta.prefix === false ?
        name : `${this.prefix}:${name}`;
      if (directive.meta.type == Directive.types.ELEMENT) {
        this.elementDirectives[fullName.toUpperCase()] = directive;
      } else {
        this.attributeDirectives[fullName.toLowerCase()] = directive;
      }
    });
  }

  /**
   * 解析要 attr 指令信息
   * @param {string} attrName 要解析的名称字符串
   * @returns {Object} 解析后的对象
   */
  _parseAttrInfo(attrName) {
    let parts = attrName.toLowerCase().split(':');
    let info = {};
    if (parts.length > 1) {
      info.name = `${parts[0]}:${parts[1]}`;
      info.decorates = parts.slice(2).map(item => toCamelCase(item));
    } else {
      info.name = parts[0];
      info.decorates = [];
    }
    return info;
  }

  /**
   * 创建一个指令实例
   * @param {Directive} Directive 指令类
   * @param {Object} options 指令构建选项
   * @returns {Directive} 指令实例
   */
  _createDirectiveInstance(Directive, options) {
    options.compiler = this;
    options.prefix = this.prefix;
    return new Directive(options);
  }

  /**
   * 编译一个元素本身
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileElement(handler, node) {
    let ElementDirective = this.elementDirectives[node.nodeName.toUpperCase()];
    if (!ElementDirective) return;
    handler.directives.push(this._createDirectiveInstance(ElementDirective, {
      handler: handler,
      node: node
    }));
  }

  /**
   * 编译一个元素所有 attributes 
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileAttributes(handler, node) {
    toArray(node.attributes).forEach(function (attribute) {
      let attrInfo = this._parseAttrInfo(attribute.name);
      let AttrDirective = this.attributeDirectives[attrInfo.name] ||
        this.attributeDirectives['*'];
      if (!AttrDirective) return;
      let meta = AttrDirective.meta;
      handler.directives.push(this._createDirectiveInstance(AttrDirective, {
        handler: handler,
        node: node,
        attribute: attribute,
        expression: meta.literal ?
          attribute.value : expression(attribute.value, meta.mixed),
        decorates: attrInfo.decorates
      }));
    }, this);
  }

  /**
   * 编译所有子结点
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileChildren(handler, node) {
    if (handler.final) return;
    toArray(node.childNodes).forEach(function (childNode) {
      if (childNode.compiled) return;
      let childHandler = this.compile(childNode);
      childHandler.parent = this;
      handler.children.push(childHandler);
    }, this);
  }

  /**
  * 初始化一个编译完成的 handler
  * @param {function} handler 编译后的的模板函数
  * @param {Object} options 选项
  * @returns {void} 无返回
  */
  _bindHandler(handler, options) {
    //排序 directives
    handler.directives = handler.directives.sort(function (a, b) {
      return b.meta.level - a.meta.level;
    });
    //初始化 directives
    let boundDirectives = [];
    each(handler.directives, (index, directive) => {
      directive.index = index;
      directive.bind();
      boundDirectives.push(directive);
      //移除完成绑定的指令对应的 attribute
      if (directive.meta.remove !== false &&
        directive.attribute && options.remove !== false) {
        directive.node.removeAttribute(directive.attribute.name);
      }
      //如果遇到一个「终态」指令，停止向下初始化
      if (directive.meta.final) {
        handler.final = true;
        return handler.final;
      }
    });
    handler.directives = boundDirectives;
  }

  _makeHandlerUnbindMethod() {
    return function () {
      this.directives.forEach(directive => {
        directive.unbind();
      });
      this.children.forEach(childHandler => {
        childHandler.unbind();
      });
    };
  }

  _makeHandlerExcuteMethod() {
    return function (scope, force) {
      if (isNull(scope)) scope = {};
      this.directives.forEach(directive => {
        directive.scope = scope;
        directive.execute(scope, force);
      });
      this.children.forEach(childHandler => {
        childHandler(scope, force);
      });
    };
  }

  /**
   * 编译一个模板
   * @param {HTMLNode} node 模板根元素
   * @param {Object} options 选项
   * @returns {function} 模板函数
   */
  compile(node, options) {
    if (!node) throw new Error('Invalid node for compile');
    options = options || {};
    //实例托管 node 实例   
    node = new Node(node);
    node.compiled = true;
    //定义编译结果函数
    let handler = (scope, force) => handler.excute(scope, force);
    handler.node = node;
    handler.directives = [];
    handler.children = [];
    //添加方法
    handler.excute = this._makeHandlerExcuteMethod();
    handler.unbind = this._makeHandlerUnbindMethod();
    //编译相关指令
    if (options.element !== false) {
      this._compileElement(handler, node);
    }
    if (options.attribute !== false) {
      this._compileAttributes(handler, node);
    }
    //绑定 handler 
    this._bindHandler(handler, options);
    //编译 children
    if (options.children !== false) {
      this._compileChildren(handler, node);
    }
    //返回编译后函数
    return handler;
  }

};