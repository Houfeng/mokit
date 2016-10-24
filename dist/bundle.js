(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={"name":"mov","version":"0.0.2"}
},{}],2:[function(require,module,exports){
const Class = require('cify');
const Template = require('./template');
const Compiler = Template.Compiler;
const utils = Template.utils;

const App = new Class({

  constructor: function (options) {
    options = options || {};
    this.components = [];
    this.element = options.element;
    this.prefix = options.prefix;
    this.compiler = new Compiler({
      prefix: this.prefix,
      directives: this.directives
    });
  },

  directive: function (name, Directive) {
    if (!Directive) {
      Directive = name;
      name = null;
    }
    Directive.prototype.app = this;
    Directive.definition.name = name || Directive.definition.name;
    this.compiler.directives.push(Directive);
  },

  component: function (name, Component) {

  },

  start: function (scope) {
    this.template = new Template(this.element, {
      compiler: this.compiler
    });
    this.template.bind(scope);
  }

});

utils.copy(Template, App);

module.exports = App;
},{"./template":22,"cify":26}],3:[function(require,module,exports){
const Class = require('cify');
const Template = require('../template');
const Watcher = require('../watcher');
const utils = Template.utils;

const Component = function (options) {

  if (!options || !options.template) {
    throw new Error('Invalid component options');
  }

  var componentProp = Object.create(Component.prototype);
  componentProp.$props = options.props;
  utils.copy(options.methods, componentProp);

  var ComponentClass = new Class({
    _extends: componentProp,
    constructor: function () {
      this._createProps(options.props);
      this._createData(options.data);
      this._createWatchers(options.watch);
      this._callHook('init');
    },

    _callHook: function (name, args) {
      if (!utils.isFunction(options[name])) return;
      options[name].apply(this, args);
    },

    _createProps: function (props) {
      utils.each(props, function (name, define) {
        this[name] = utils.isObject(define) ?
          define.default : define;
      }, this);
    },

    _createData: function (data) {
      if (utils.isFunction(options.data)) {
        this.$data = options.data.call(this);
      } else {
        this.$data = data;
      }
      utils.each(this.$data, function (name) {
        Object.defineProperty(this, name, {
          get: function () {
            return this.$data[name];
          },
          set: function (value) {
            this.$data[name] = value;
          }
        });
      }, this);
    },

    _createWatchers: function (watchers) {
      utils.each(watchers, function (name, handler) {
        this.$watch(name, handler);
      }, this);
    },

    $compile: function () {
      if (this._compiled) return;
      this._compiled = true;
      var element = utils.parseDom(options.template)[0];
      if (!element || element.nodeName === '#text') {
        throw new Error('Invalid component template');
      }
      this._callHook('create');
      var template = new Template(element);
      template.bind(this);
      this.$element = element;
      this._callHook('ready');
    },

    $mount: function (mount) {
      this.$compile();
      this._callHook('mount');
      mount.parentNode.insertBefore(this.$element, mount);
    },

    $remove: function (disHook) {
      if (!disHook && this.onRemove) this.onRemove();
      this.$template.unbind();
      this.$element.parentNode.removeChild(this.$element);
    },

    $watch: function (calcer, handler) {
      this._watchers = this._watchers || [];
      if (!utils.isFunction(handler)) return;
      if (!utils.isFunction(calcer)) {
        var path = calcer;
        calcer = function () {
          return utils.getByPath(this, path);
        };
      }
      this._watchers.push(new Watcher(calcer.bind(this), handler.bind(this)));
    }

  });

  ComponentClass.__proto__ = Component.prototype;
  return ComponentClass;

};

module.exports = Component;
},{"../template":22,"../watcher":25,"cify":26}],4:[function(require,module,exports){
const info = require('../.tmp/info.json');
const utils = require('ntils');
const Template = require('./template');
const Component = require('./component');
const Watcher = require('./watcher');
const App = require('./app');

App.version = info.version;
App.Component = Component;
App.Watcher = Watcher;
App.Template = Template;

//持载模板相关对象
utils.copy(Template, App);

//普通脚本引入
if (window) window[info.name] = App;
//amd 模块
if (typeof define !== 'undefined' && define.amd) {
  define(info.name, [], function () {
    return App;
  });
}

App.App = App;
module.exports = App;
},{"../.tmp/info.json":1,"./app":2,"./component":3,"./template":22,"./watcher":25,"ntils":28}],5:[function(require,module,exports){
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
    var parts = name.split(':');
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
    //编辑相关指令
    this._compileElement(handler, node);
    this._compileAttributes(handler, node);
    this._bindHandler(handler);
    this._compileChildren(handler, node);
    //返回编译后函数
    return handler.bind(null);
  }

});

module.exports = Compiler;
},{"./directive":6,"./directives":10,"./expression":21,"cify":26,"ntils":28}],6:[function(require,module,exports){
const Class = require('cify');
const utils = require('ntils');
const Expression = require('./expression');

/**
 * 指令定义信息类
 * 可以通过每一个「指令类」的的「静态成员」访问
 * 也可通过「指令实例」的「实例成员」访问
 */
const DirectiveDefinition = new Class({

  _extends: Directive.prototype,

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
    _extends: definition,
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
Directive.LEVEL_ATTRIBUTE = -1000;
Directive.LEVEL_GENERAL = 0;
Directive.LEVEL_STATEMENT = 1000;

module.exports = Directive;
},{"./expression":21,"cify":26,"ntils":28}],7:[function(require,module,exports){
const Directive = require('../directive');

/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */
module.exports = new Directive({
  name: 'attr',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  prefix: false,
  literal: true,
  match: /[\s\S]/i,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.computedName = this.attribute.name;
    this.computedValue = this.attribute.value;
    this.nameExpr = new this.Expression(this.attribute.name, true);
    this.valueExpr = new this.Expression(this.attribute.value, true);
  },

  execute: function (scope) {
    var newComputedName = this.nameExpr.execute(scope);
    if (this.computedName !== newComputedName) {
      this.node.removeAttribute(this.computedName);
      this.computedName = newComputedName;
      if (!this.utils.isNull(this.computedName) && this.computedName.length > 0) {
        this.node.setAttribute(this.computedName, '');
      }
    }
    var newComputeValue = this.valueExpr.execute(scope);
    newComputeValue = this.utils.isNull(newComputeValue) ? '' : newComputeValue;
    if (this.computedValue !== newComputeValue) {
      this.computedValue = newComputeValue;
      this.node.setAttribute(
        this.computedName,
        this.computedValue
      );
    }
  }

});
},{"../directive":6}],8:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'each',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_STATEMENT,
  final: true,
  literal: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
    this.parseExpr();
    this.eachItems = [];
  },

  parseExpr: function () {
    this.eachType = this.attribute.value.indexOf(' in ') > -1 ? 'in' : 'of';
    var tokens = this.attribute.value.split(' ' + this.eachType + ' ');
    var fnText = 'with(scope){utils.each(' + tokens[1] + ',fn,this)}';
    this.each = new Function('utils', 'scope', 'fn', fnText).bind(null, this.utils);
    var names = tokens[0].split(',').map(function (name) {
      return name.trim();
    });
    if (this.eachType == 'in') {
      this.keyName = names[0];
      this.valueName = names[1];
    } else {
      this.keyName = names[1];
      this.valueName = names[0];
    }
  },

  execute: function (scope) {
    var eachCount = 0;
    var itemsFragment = document.createDocumentFragment();
    this.each(scope, function (key, value) {
      //创建新 scope
      var newScope = this.utils.copy(scope);
      if (this.keyName) newScope[this.keyName] = key;
      if (this.valueName) newScope[this.valueName] = value;
      var oldItem = this.eachItems[key];
      if (oldItem) {
        if (!oldItem.handler) console.log('a', this.eachItems, oldItem);
        oldItem.handler(newScope);
      } else {
        var newItem = Object.create(null);
        //创建新元素
        newItem.node = this.node.cloneNode(true);
        itemsFragment.appendChild(newItem.node);
        newItem.handler = this.compiler.compile(newItem.node);
        newItem.handler(newScope);
        this.eachItems[key] = newItem;
      }
      eachCount++;
    }.bind(this));
    this.eachItems.splice(eachCount).forEach(function (item) {
      item.node.parentNode.removeChild(item.node);
    });
    if (itemsFragment.childNodes.length > 0) {
      this.mountNode.parentNode.insertBefore(itemsFragment, this.mountNode);
    }
  }

});
},{"../directive":6}],9:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'if',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_STATEMENT,
  final: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
    this._oldValue = false;
    this._handler = this.compiler.compile(this.node);
  },

  execute: function (scope) {
    var newValue = this.expression.execute(scope);
    if (newValue) {
      //如果新计算的结果为 true 才执行 
      this._handler(scope);
      if (!this._oldValue) {
        this.mountNode.parentNode.insertBefore(this.node, this.mountNode);
      }
    } else if (this._oldValue) {
      this.node.parentNode.removeChild(this.node);
    }
    this._oldValue = newValue;
  }

});
},{"../directive":6}],10:[function(require,module,exports){
module.exports = [
  require('./text'),
  require('./attr'),
  require('./each'),
  require('./if'),
  require('./prop'),
  require('./on'),
  require('./inner-html'),
  require('./inner-text'),
  require('./model-input'),
  require('./model-select'),
  require('./model-radio'),
  require('./model-checkbox'),
  require('./model-editable')
];
},{"./attr":7,"./each":8,"./if":9,"./inner-html":11,"./inner-text":12,"./model-checkbox":13,"./model-editable":14,"./model-input":15,"./model-radio":16,"./model-select":17,"./on":18,"./prop":19,"./text":20}],11:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'html',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node.innerHTML = newValue;
  }

});
},{"../directive":6}],12:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'text',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node.innerText = newValue;
  }

});
},{"../directive":6}],13:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: 'input',

  test: function (matchInfo) {
    var inputType = matchInfo.node.getAttribute('type');
    return inputType === 'checkbox';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.addEventListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      var value = this.utils.getByPath(this.scope, this.bindPath);
      if (this.utils.isArray(value) && this.node.checked) {
        value.push(this.node.value);
      } else if (this.utils.isArray(value) && !this.node.checked) {
        var index = value.indexOf(this.node.value);
        value.splice(index, 1);
      } else {
        this.utils.setByPath(this.scope, this.bindPath, this.node.checked);
      }
    }.bind(this), false);
  },

  execute: function (scope) {
    this.scope = scope;
    var value = this.expression.execute(scope);
    if (this.utils.isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  }

});
},{"../directive":6}],14:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  test: function (matchInfo) {
    return matchInfo.node.isContentEditable;
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.addEventListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.innerHTML);
    }.bind(this), false);
  },

  execute: function (scope) {
    var value = this.expression.execute(scope);
    if (this.node.innerHTML !== value) {
      this.node.innerHTML = value;
    }
  }

});
},{"../directive":6}],15:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: /^(input|textarea)$/i,
  test: function (matchInfo) {
    var inputType = matchInfo.node.getAttribute('type');
    return inputType !== 'radio' && inputType !== 'checkbox';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.addEventListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.value);
    }.bind(this), false);
  },

  execute: function (scope) {
    var value = this.expression.execute(scope);
    if (this.node.value !== value) {
      this.node.value = value;
    }
  }

});
},{"../directive":6}],16:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: 'input',
  test: function (matchInfo) {
    var inputType = matchInfo.node.getAttribute('type');
    return inputType === 'radio';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.addEventListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.value);
    }.bind(this), false);
  },

  execute: function (scope) {
    this.scope = scope;
    var value = this.expression.execute(scope);
    this.node.checked = value == this.node.value;
  }

});
},{"../directive":6}],17:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  final: true,
  tag: 'select',

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.node.addEventListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      var selectedOptions = this.node.selectedOptions;
      var value = this.node.multiple
        ? [].slice.call(selectedOptions).map(function (option) {
          return option.value;
        }, this)
        : selectedOptions[0].value;
      this.utils.setByPath(this.scope, this.bindPath, value);
    }.bind(this), false);
  },

  execute: function (scope) {
    this.scope = scope;
    this._handler(scope);
    var value = this.expression.execute(scope);
    if (!this.utils.isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  }

});
},{"../directive":6}],18:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'on',
  type: Directive.TYPE_ATTRIBUTE,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.node.addEventListener(this.decorates[0], function (event) {
      if (this.utils.isNull(this.scope)) return;
      var scope = this.utils.copy(this.scope);
      scope.event = scope.$event = event;
      this.expression.execute(scope);
    }.bind(this), false);
  },

  execute: function (scope) {
    this.scope = scope;
  }

});
},{"../directive":6}],19:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'prop',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node[this.decorates[0]] = newValue;
  }

});
},{"../directive":6}],20:[function(require,module,exports){
const Directive = require('../directive');
const Expression = require('../expression');

const CLOAK_CLASS_NAME = 'cloak';

module.exports = new Directive({
  name: '#text',
  type: Directive.TYPE_ELEMENT,
  prefix: false,
  test: function (matchInfo) {
    return matchInfo.node.nodeValue.trim().length > 4;
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.expr = new Expression(this.node.nodeValue, true);
    this.node.nodeValue = '';
    if (this.node.parentNode) {
      this.node.parentNode.removeAttribute(CLOAK_CLASS_NAME);
    }
  },

  execute: function (scope) {
    this.scope = scope;
    var newValue = this.expr.execute(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

});
},{"../directive":6,"../expression":21}],21:[function(require,module,exports){
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
    var statements = this._parseMixedCode(code);
    code = this._escapeEOL(statements.join('+'));
    return this._createFunction(code);
  },

  /**
   * 通过符串代码创建一个可执行函数
   * @param {string} code 代码字符串
   * @returns {function} 创建的函数
   */
  _createFunction: function (code) {
    var func = new Function('utils', 'scope', 'with(scope){return ' + code + '}');
    return func.bind(null, utils);
  },

  /**
   * 解析混合代码字符串
   * @param {string} code 混合代码字符串
   * @returns {Array} 解析后的「token」列表
   */
  _parseMixedCode: function (code) {
    var index = 0, length = code.length;
    var token = '', isExpr = false, tokens = [];
    while (index <= length) {
      var char = code[index++];
      var nextChar = code[index];
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
   * @param {string} str 源字符串
   * @returns {string} 处理后的字符串
   */
  _escapeCode: function (str) {
    return str.replace(/"/, '\\"').replace('\r\n', '\\r\\n').replace('\n', '\\n');
  },

  /**
   * 转义换行符
   * @param {string} str 源字符串
   * @returns {string} 处理后的字符串
   */
  _escapeEOL: function (code) {
    return code.replace(/\n/gm, '\\\n');
  },

  /**
   * 通过闭包和「try-cache」包裹代码
   * @param {string} str 源字符串
   * @returns {string} 处理后的字符串
   */
  _wrapCode: function (code) {
    return '((function(){try{return (' + code + ')}catch(err){return ""}})())';
  },

  /**
   * 通过 scope 对象执行表达式
   * @param {Object} scope 上下文对象
   * @returns {Object} 执行结果
   */
  execute: function (scope) {
    if (utils.isNull(scope)) {
      scope = Object.create(null);
    }
    return this.func.call(scope, scope);
  }

});

module.exports = Expression;
},{"cify":26,"ntils":28}],22:[function(require,module,exports){
const Compiler = require('./compiler');
const Directive = require('./directive');
const Expression = require('./expression');
const Observer = require('./observer');
const Template = require('./template');
const directives = require('./directives/');
const utils = require('ntils');

Template.Template = Template;
Template.Compiler = Compiler;
Template.Directive = Directive;
Template.directives = directives;
Template.Expression = Expression;
Template.Observer = Observer;
Template.utils = utils;

module.exports = Template;
},{"./compiler":5,"./directive":6,"./directives/":10,"./expression":21,"./observer":23,"./template":24,"ntils":28}],23:[function(require,module,exports){
const Class = require('cify');
const utils = require('ntils');
const EventEmitter = require('events');

const OBSERVER_PROP_NAME = '__observer__';
const CHANGE_EVENT_NAME = 'change';

/**
 * 对象观察类，可以监控对象变化
 * 目前方案问题:
 *   对于父子关系和事件冒泡，目前方案如果用 delete 删除一个属性，无关真实删除关系，
 *   即便调用 clearReference 也无法再清除关系，子对象的 parents 中会一直有一个引用，当前方案最高效
 * 其它方法一:
 *   将「关系」放入全局数组中，然后将 ob.parents 变成一个「属性」从全局数组件中 filter 出来，
 *   基本和目前方法类似，但是关系在外部存领教，所以 clearReference 可清除。
 * 其它方案二: 
 *   构造时添加到全局数组，每一个 observer change 时都让放到全局的 observer 遍历自身的，
 *   检果事件源是不是自已的子对象，如果是则触发自身 change 事件，这样 ob 对象本身没有相关引用
 *   clearReference 时只从全局清除掉就行了，并且 delete 操作也不会影响，但效率稍差。
 * 其它方案三: 
 *   给构造函数添加一个 deep 属性，只有 deep 的 ob 对象，才放入到全局数组中，检查时逻辑同方案二
 *   但是因为要检查的对象会少很多，效率会更高一点。
 */
const Observer = new Class({
  _extends: EventEmitter,

  /**
   * 通过目标对象构造一个观察对象
   * @param {Object} target 目标对象
   * @returns {void} 无返回
   */
  constructor: function (target) {
    if (utils.isNull(target)) {
      throw new Error('Invalid target');
    }
    utils.defineFreezeProp(this, 'shadow', Object.create(null));
    utils.defineFreezeProp(this, 'target', target);
    utils.defineFreezeProp(this, 'parents', []);
    utils.defineFreezeProp(target, OBSERVER_PROP_NAME, this);
    this.apply();
  },

  /**
   * 添加一个属性，动态添中的属性，无法被观察，
   * 但是通过 set 方法添加的属性可能被观察。
   */
  set: function (name, value) {
    if (utils.isFunction(value)) return;
    Object.defineProperty(this.target, name, {
      get: function () {
        return this[OBSERVER_PROP_NAME].shadow[name];
      },
      set: function (value) {
        var observer = this[OBSERVER_PROP_NAME];
        var oldValue = observer.shadow[name];
        if (oldValue === value) return;
        if (utils.isObject(value)) {
          var childObserver = new Observer(value, name);
          observer.addChild(childObserver, name);
        }
        //移除旧值的父引用
        //如果用 delete 删除属性将无法移除父子引用
        if (oldValue && oldValue[OBSERVER_PROP_NAME]) {
          observer.removeChild(oldValue[OBSERVER_PROP_NAME], name);
        }
        observer.shadow[name] = value;
        observer._emitChange({ path: name });
      },
      configurable: true,
      enumerable: true
    });
    this.target[name] = value;
  },

  /**
   * 自动应用所有动态添加的属性
   * @returns {void} 无返回
   */
  apply: function () {
    if (utils.isArray(this.target)) {
      this._wrapArray(this.target);
    }
    var names = this._getPropertyNames(this.target);
    names.forEach(function (name) {
      var desc = Object.getOwnPropertyDescriptor(this.target, name);
      if (!('value' in desc)) return;
      this.set(name, this.target[name]);
    }, this);
  },

  /**
   * 清除所有父子引用
   * @returns {void} 无返回
   */
  clearReference: function () {
    utils.each(this.target, function (name, value) {
      var child = value[OBSERVER_PROP_NAME];
      if (child) this.removeChild(child);
    }, this);
  },

  /**
   * 派发一个事件，事件会向父级对象冒泡
   * @param {string} eventName 事件名称
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */
  dispatch: function (eventName, event) {
    this.emit(eventName, event);
    if (!this.parents || this.parents.length < 1) return;
    this.parents.forEach(function (item) {
      if (!(item.name in item.parent.target)) {
        return item.parent.removeChild(this);
      }
      var parentEvent = utils.copy(event);
      parentEvent.path = item.name + '.' + event.path;
      item.parent.dispatch(eventName, parentEvent);
    }, this);
  },

  /**
   * 添子观察者对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */
  addChild: function (child, name) {
    if (utils.isNull(child) || utils.isNull(name)) {
      throw new Error('Invalid paramaters');
    }
    child.parents.push({ parent: this, name: name });
  },

  /**
   * 移除子对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */
  removeChild: function (child, name) {
    if (utils.isNull(child)) {
      throw new Error('Invalid paramaters');
    }
    var foundIndex = -1;
    child.parents.forEach(function (item, index) {
      if (item.parent === this && item.name === name) {
        foundIndex = index;
      }
    }, this);
    if (foundIndex > -1) {
      child.parents.splice(foundIndex, 1);
    }
  },

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */
  _emitChange: function (event) {
    this.dispatch(CHANGE_EVENT_NAME, event);
  },

  /**
   * 获取所有成员名称列表
   * @returns {Array} 所有成员名称列表
   */
  _getPropertyNames: function () {
    var names = utils.isArray(this.target) ?
      this.target.map(function (item, index) {
        return index;
      }) : Object.keys(this.target);
    return names.filter(function (name) {
      return name !== OBSERVER_PROP_NAME;
    });
  },

  /**
   * 包裹数组
   * @param {array} array 源数组
   * @returns {array} 处理后的数组
   */
  _wrapArray: function (array) {
    utils.defineFreezeProp(array, 'push', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        this[OBSERVER_PROP_NAME].set(array.length, item);
      }, this);
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
    });
    utils.defineFreezeProp(array, 'pop', function () {
      var item = [].pop.apply(this, arguments);
      this[OBSERVER_PROP_NAME]._emitChange({ path: this.length });
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      return item;
    });
    utils.defineFreezeProp(array, 'unshift', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        this[OBSERVER_PROP_NAME].set(0, item);
      }, this);
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
    });
    utils.defineFreezeProp(array, 'shift', function () {
      var item = [].shift.apply(this, arguments);
      this[OBSERVER_PROP_NAME]._emitChange({ path: 0 });
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      return item;
    });
    utils.defineFreezeProp(array, 'splice', function () {
      var startIndex = arguments[0];
      var endIndex = utils.isNull(arguments[1])
        ? startIndex + arguments[1]
        : this.length - 1;
      var items = [].splice.apply(this, arguments);
      for (var i = startIndex; i <= endIndex; i++) {
        this[OBSERVER_PROP_NAME]._emitChange({ path: i });
      };
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      return items;
    });
    utils.defineFreezeProp(array, 'set', function (index, value) {
      if (index >= this.length) {
        this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      }
      this[OBSERVER_PROP_NAME].set(index, value);
    });
  }

});

/**
 * 观察一个对象
 * @param {Object} target 目标对象
 * @return {Observer} 观察者对象
 */
Observer.observe = function (target) {
  return new Observer(target);
};

module.exports = Observer;
},{"cify":26,"events":27,"ntils":28}],24:[function(require,module,exports){
const Class = require('cify');
const Observer = require('./observer');
const EventEmitter = require('events');
const Compiler = require('./compiler');

/**
 * 模板类
 * 可能通过 element 作为参数，创建一个模板实例
 */
const Template = new Class({
  _extends: EventEmitter,

  /**
   * 构建一个模板板实例
   * @param {HTMLNode} element HTML 元素
   * @param {Object} options 选项
   * @returns void 无返回
   */
  constructor: function (element, options) {
    options = options || Object.create(null);
    this.element = element;
    this.compiler = options.compiler || new Compiler(options);
    this.render = this.compiler.compile(this.element);
    this.update = this.update.bind(this);
    this._update = this._update.bind(this);
    this._updateTimer = 0;
  },

  /**
   * 更新当前模板 (会过滤不必要的更新)
   * @returns {void} 无返回
   */
  update: function () {
    if (this._updateTimer) {
      clearTimeout(this._updateTimer);
      this._updateTimer = null;
    }
    this._updateTimer = setTimeout(this._update, 0);
  },

  /**
   * 更新当前模板内部方法 
   * @returns {void} 无返回
   */
  _update: function () {
    if (!this._updateTimer || !this.observer) return;
    this.emit('update', this);
    this.render(this.observer.target);
  },

  /**
   * 将模板绑定到一个 scope
   * @param {Object} scope 绑定的上下文对象
   * @param {boolean} disFirst 是否禁用第一次的自动渲染
   * @returns {void} 无返回
   */
  bind: function (scope, disFirst) {
    this.unbind();
    this.observer = new Observer(scope);
    this.observer.on('change', this.update);
    if (!disFirst) this.update();
  },

  /**
   * 解绑定
   * @returns {void} 无返回
   */
  unbind: function () {
    if (!this.observer) return;
    this.observer.removeListener('change', this.update);
    this.observer.clearReference();
    this.observer = null;
  },

  /**
   * 释放
   * @returns {void} 无返回
   */
  dispose: function () {
    this.unbind();
    this.render.dispose();
  }

});

module.exports = Template;
},{"./compiler":5,"./observer":23,"cify":26,"events":27}],25:[function(require,module,exports){
const Class = require('cify');
const utils = require('ntils');

/**
 * Watcher 类
 * 通过「计算函数」、「执行函数」可以创建一个 Watcher 实例
 */
const Watcher = new Class({

  /**
   * 通过「计算函数」、「执行函数」构建一个 Watcher 实例
   * @param {function} calcor 计算函数
   * @param {function} handler 处理函数
   * @param {boolean} first 是否自动执行第一次
   * @param {void} 无返回
   */
  constructor: function (calcor, handler, first) {
    if (!utils.isFunction(calcor) || !utils.isFunction(handler)) {
      throw new Error('Invalid parameters');
    }
    this.calcor = calcor;
    this.handler = handler;
    if (first) this.calc(true);
  },

  /**
   * 执行计算
   * @param {boolean} force 是否强制触发「计算函数」
   * @returns {Object} 计算后的值
   */
  calc: function (force) {
    var newValue = this.calcor();
    if (force || !utils.deepEqual(newValue, this.value)) {
      this.handler(newValue, this.value);
    }
    this.value = newValue;
  }

});

module.exports = Watcher;
},{"cify":26,"ntils":28}],26:[function(require,module,exports){
; (function () {
  var createInstance = (function () {
    var fnBody = ['switch(args.length){']
    for (var i = 20; i > 0; i--) {
      var fnArgs = []
      for (var j = 0; j < i; j++) fnArgs.push('args[' + j + ']')
      fnBody.push('case ' + i + ':return new Fn(' + fnArgs.join(',') + ');')
    }
    fnBody.push('case 0:default:return new Fn();}')
    return new Function('Fn', 'args', fnBody.join(''))
  })()

  function getPropertyNames(obj) {
    var nameList = Object.getOwnPropertyNames(obj)
    if (obj.__proto__) {
      nameList.push.apply(nameList, getPropertyNames(obj.__proto__))
    }
    return nameList
  }

  function isChildClass(_child, _super) {
    if (_child.__proto__ == _super.prototype) {
      return true
    } else if (_child.prototype) {
      return isChildClass(_child.prototype, _super)
    } else {
      return false
    }
  }

  function createSuper(_self, proto) {
    var _super = function () {
      if (proto.constructor) {
        proto.constructor.apply(_self, arguments)
      }
    }
    delete _super.name
    var nameList = getPropertyNames(proto)
    nameList.forEach(function (name) {
      if (name == '_super' ||
        name == '_extends' ||
        name == '_static' ||
        name == 'constructor') {
        return
      }
      if (typeof proto[name] === 'function') {
        _super[name] = _super[name] || proto[name].bind(_self)
      } else {
        _super[name] = _super[name] || proto[name]
      }
    })
    _super.__proto__ = {}
    return _super
  }

  function defineClass(def) {
    var classProto = ((typeof def === 'function') ? def() : def) || {}
    var classExtends = classProto._extends
    var clsssStatic = classProto._static || {}
    if (typeof classExtends === 'function') {
      classProto.__proto__ = classExtends.prototype
      clsssStatic.__proto__ = classExtends
    } else if (classExtends) {
      classProto.__proto__ = classExtends
    } else {
      classProto.__proto__ = {}
    }
    classProto.__defineGetter__('_super', function () {
      this.__super__ = this.__super__ || createSuper(this, classProto.__proto__)
      return this.__super__
    })
    Class.prototype = classProto
    Class.__proto__ = clsssStatic
    function Class() {
      var instance = this
      if (typeof classExtends === 'function') {
        instance = createInstance(classExtends, arguments)
      }
      instance.constructor = Class
      instance._static = instance.Class = Class
      instance.__proto__ = Class.prototype
      var constructor = instance.__proto__.constructor
      if (constructor != null &&
        constructor != Object) {
        var rs = constructor.apply(instance, arguments)
        instance = rs && classProto.hasOwnProperty('constructor') ? rs : instance
      }
      instance.__proto__ = Class.prototype
      delete instance._extends
      return instance
    }
    Class.extendsOf = function (_super) {
      return isChildClass(this, _super)
    };
    Class.superOf = function (_child) {
      return isChildClass(_child, this)
    };
    return Class
  }

  defineClass.prototype.__proto__ = Function.prototype
  defineClass.Class = defineClass

  if (typeof module != 'undefined') {
    module.exports = defineClass
  }

  if (typeof define == 'function' && define.amd) {
    define('cify', [], function () {
      return defineClass
    })
  }

  if (typeof window != 'undefined') {
    window.cify = window.Class = defineClass
  }
})()

},{}],27:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],28:[function(require,module,exports){
(function (owner) {
  "use strict";

  /**
   * 空函数
   */
  owner.noop = function () { };

  /**
   * 验证一个对象是否为NULL
   * @method isNull
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isNull = function (obj) {
    return obj === null || typeof obj === "undefined";
  };

  /**
   * 除去字符串两端的空格
   * @method trim
   * @param  {String} str 源字符串
   * @return {String}     结果字符串
   * @static
   */
  owner.trim = function (str) {
    if (this.isNull(str)) return str;
    if (str.trim) {
      return str.trim();
    } else {
      return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
    }
  };

  /**
   * 替换所有
   * @method replace
   * @param {String} str 源字符串
   * @param {String} str1 要替换的字符串
   * @param {String} str2 替换为的字符串
   * @static
   */
  owner.replace = function (str, str1, str2) {
    if (this.isNull(str)) return str;
    return str.replace(new RegExp(str1, 'g'), str2);
  };

  /**
   * 从字符串开头匹配
   * @method startWith
   * @param {String} str1 源字符串
   * @param {String} str2 要匹配的字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  owner.startWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === 0;
  };

  /**
   * 是否包含
   * @method contains
   * @param {String} str1 源字符串
   * @param {String} str2 检查包括字符串
   * @return {Boolean} 结果
   * @static
   */
  owner.contains = function (str1, str2) {
    var self = this;
    if (this.isNull(str1) || this.isNull(str2)) return false;
    if (self.isArray(str1)) {
      return self.each(str1, function (i, str) {
        if (str == str2) return true;
      });
    } else {
      return str1 && str2 && str1.indexOf(str2) > -1;
    }
  };

  /**
   * 从字符串结束匹配
   * @method endWidth
   * @param {String} str1 源字符串
   * @param {String} str2 匹配字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  owner.endWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === (str1.length - str2.length);
  };

  /**
   * 是否包含属性
   * @method hasProperty
   * @param  {Object}  obj  对象
   * @param  {String}  name 属性名
   * @return {Boolean}      结果
   * @static
   */
  owner.has = owner.hasProperty = function (obj, name) {
    if (this.isNull(obj) || this.isNull(name)) return false;
    return (name in obj) || (obj.hasOwnProperty(name));
  };

  /**
   * 验证一个对象是否为Function
   * @method isFunction
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isFunction = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "function";
  };

  /**
   * 验证一个对象是否为String
   * @method isString
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isString = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'string' || obj instanceof String;
  };

  /**
   * 验证一个对象是否为Number
   * @method isNumber
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isNumber = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'number' || obj instanceof Number;
  };

  /**
   * 验证一个对象是否为Boolean
   * @method isBoolean
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isBoolean = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'boolean' || obj instanceof Boolean;
  };

  /**
   * 验证一个对象是否为HTML Element
   * @method isElement
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isElement = function (obj) {
    if (this.isNull(obj)) return false;
    if (window.Element) return obj instanceof Element;
    else return (obj.tagName && obj.nodeType && obj.nodeName && obj.attributes && obj.ownerDocument);
  };

  /**
   * 验证一个对象是否为HTML Text Element
   * @method isText
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isText = function (obj) {
    if (this.isNull(obj)) return false;
    return obj instanceof Text;
  };

  /**
   * 验证一个对象是否为Object
   * @method isObject
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isObject = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "object";
  };

  /**
   * 验证一个对象是否为Array或伪Array
   * @method isArray
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isArray = function (obj) {
    if (this.isNull(obj)) return false;
    var v1 = Object.prototype.toString.call(obj) === '[object Array]';
    var v2 = obj instanceof Array;
    var v3 = !this.isString(obj) && this.isNumber(obj.length) && this.isFunction(obj.splice);
    var v4 = !this.isString(obj) && this.isNumber(obj.length) && obj[0];
    return v1 || v2 || v3 || v4;
  };

  /**
   * 验证是不是一个日期对象
   * @method isDate
   * @param {Object} val   要检查的对象
   * @return {Boolean}           结果
   * @static
   */
  owner.isDate = function (val) {
    if (this.isNull(val)) return false;
    return val instanceof Date;
  };

  /**
   * 转换为数组
   * @method toArray
   * @param {Array|Object} array 伪数组
   * @return {Array} 转换结果数组
   * @static
   */
  owner.toArray = function (array) {
    if (this.isNull(array)) return [];
    return Array.prototype.slice.call(array);
  };

  /**
   * 转为日期格式
   * @method toDate
   * @param {Number|String} val 日期字符串或整型数值
   * @return {Date} 日期对象
   * @static
   */
  owner.toDate = function (val) {
    var self = this;
    if (self.isNumber(val))
      return new Date(val);
    else if (self.isString(val))
      return new Date(self.replace(self.replace(val, '-', '/'), 'T', ' '));
    else if (self.isDate(val))
      return val;
    else
      return null;
  };

  /**
   * 遍历一个对像或数组
   * @method each
   * @param  {Object or Array}   obj  要遍历的数组或对象
   * @param  {Function} fn            处理函数
   * @return {void}                   无返回值
   * @static
   */
  owner.each = function (list, handler, scope) {
    if (this.isNull(list) || this.isNull(handler)) return;
    if (this.isArray(list)) {
      var listLength = list.length;
      for (var i = 0; i < listLength; i++) {
        var rs = handler.call(scope || list[i], i, list[i]);
        if (!this.isNull(rs)) return rs;
      }
    } else {
      for (var key in list) {
        var rs = handler.call(scope || list[key], key, list[key]);
        if (!this.isNull(rs)) return rs;
      }
    }
  };

  /**
   * 格式化日期
   * @method formatDate
   * @param {Date|String|Number} date 日期
   * @param {String} format 格式化字符串
   * @return {String} 格式化结果
   * @static
   */
  owner.formatDate = function (date, format) {
    if (this.isNull(format) || this.isNull(date)) return date;
    date = this.toDate(date);
    var placeholder = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var key in placeholder) {
      if (new RegExp("(" + key + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ?
            placeholder[key] : ("00" + placeholder[key]).substr(("" + placeholder[key]).length)
        );
      }
    }
    return format;
  };

  /**
   * 深度克隆对象
   * @method clone
   * @param {Object} obj 源对象
   * @return {Object} 新对象
   * @static
   */
  owner.clone = function (obj, igonreArray) {
    if (this.isNull(obj) || this.isString(obj) || this.isNumber(obj) || this.isBoolean(obj) || this.isDate(obj)) {
      return obj;
    }
    var objClone = obj;
    try {
      objClone = new obj.constructor();
    } catch (ex) { }
    for (var key in obj) {
      if (objClone[key] != obj[key] && !this.contains(igonreArray, key)) {
        if (typeof (obj[key]) === 'object') {
          objClone[key] = this.clone(obj[key], igonreArray);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
    this.each(['toString', 'valueOf'], function (i, name) {
      if (this.contains(igonreArray, key)) return;
      objClone[name] = obj[name];
    }, this);
    return objClone;
  };

  /**
   * 拷贝对象
   * @method copy
   * @param {Object} obj1 源对象
   * @param {Object} obj2 目标���象
   * @static
   */
  owner.copy = function (obj1, obj2) {
    obj2 = obj2 || {};
    this.each(obj1, function (name) {
      try {
        obj2[name] = obj1[name];
      } catch (ex) { }
    })
    return obj2;
  };

  /**
   * 定义不可遍历的属性
   **/
  owner.defineFreezeProp = function (obj, name, value) {
    Object.defineProperty(obj, name, {
      value: value,
      enumerable: false,
      configurable: true, //能不能重写定义
      writable: false //能不能用「赋值」运算更改
    });
  };

  /**
   * 获取所有 key 
   */
  owner.keys = function (obj) {
    if (Object.keys) return Object.keys(obj);
    var keys = [];
    this.each(obj, function (key) {
      keys.push(key);
    });
    return keys;
  };

  /**
   * 创建一个对象
   */
  owner.create = function (proto) {
    if (Object.create) return Object.create(proto);
    return { __proto__: proto };
  };

  /**
   * 是否深度相等
   */
  owner.deepEqual = function (a, b) {
    if (a === b) return true;
    if (!this.isObject(a) || !this.isObject(b)) return false;
    var aKeys = this.keys(a);
    var bKeys = this.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    var allKeys = aKeys.concat(bKeys);
    var checkedMap = this.create(null);
    var result = true;
    this.each(allKeys, function (i, key) {
      if (checkedMap[key]) return;
      if (!this.deepEqual(a[key], b[key])) result = false;
      checkedMap[key] = true;
    }, this);
    return result;
  };

  /**
   * 从一个数值循环到别一个数
   * @param {number} fromNum 开始数值
   * @param {Number} toNum 结束数值
   * @param {Number} step 步长值
   * @param {function} handler 执行函数
   * @returns {void} 无返回
   */
  owner.fromTo = function (fromNum, toNum, step, handler) {
    if (!handler) handler = [step, step = handler][0];
    step = Math.abs(step || 1);
    if (fromNum < toNum) {
      for (var i = fromNum; i <= toNum; i += step) handler(i);
    } else {
      for (var i = fromNum; i >= toNum; i -= step) handler(i);
    }
  };

  /**
   * 生成一个Guid
   * @method newGuid
   * @return {String} GUID字符串
   * @static
   */
  owner.newGuid = function () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  /**
   * 对象变换
   **/
  owner.map = function (list, fn) {
    var buffer = this.isArray(list) ? [] : {};
    this.each(list, function (name, value) {
      buffer[name] = fn(name, value);
    });
    return buffer;
  };

  /**
   * 通过路径设置属性值
   */
  owner.setByPath = function (obj, path, value) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (index === path.length - 1) {
        obj[name] = value;
      } else {
        obj[name] = obj[name] || {};
        obj = obj[name];
      }
    }, this);
  };

  /**
   * 通过路径获取属性值
   */
  owner.getByPath = function (obj, path) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return obj;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (!this.isNull(obj)) obj = obj[name];
    }, this);
    return obj;
  };

  /**
   * 数组去重
   **/
  owner.unique = function (array) {
    if (this.isNull(array)) return array;
    var newArray = [];
    var map = {};
    this.each(array, function (i, value) {
      if (map[value]) return;
      map[value] = true;
      newArray.push(value);
    });
    return newArray;
  };

  /**
   * 解析 function 的参数列表
   **/
  owner.getFunctionArgumentNames = function (fn) {
    if (!fn) return [];
    var src = fn.toString();
    var parts = src.split(')')[0].split('=>')[0].split('(');
    return (parts[1] || parts[0]).split(',').map(function (name) {
      return name.trim();
    }).filter(function (name) {
      return name != 'function';
    });
  };

  /**
   * 处理URL
   * @method wrapUrl
   * @param  {String} _url 原始URL
   * @return {String}      处理过的URL
   * @static
   */
  owner.wrapUrl = function (url) {
    if (this.isNull(url)) return url;
    if (url.indexOf('?') > -1) {
      url += "&__t=" + this.newGuid();
    } else {
      url += "?__t=" + this.newGuid();
    }
    return url;
  };

  /**
   * 休眼
   * @method sleep
   * @param {Number} s 休眠时间（毫秒）
   * @static
   */
  owner.sleep = function (s) {
    var time = (new Date()).getTime() + s;
    while ((new Date()).getTime() + 1 < time);
    return;
  };

  /**
   * 合并对象
   * @method mix
   * @return 合并后的对象
   * @param {Object} r 目标对象
   * @param {Object} s 源对象
   * @param {Boolean} ov 是否覆盖
   * @param {Object} wl 白名单
   * @param {Number} mode 模式
   * @param {Boolean} merge 深度合并
   */
  owner.mix = function (r, s, ov, wl, mode, merge) {
    if (!s || !r) {
      return r || owner;
    }
    //根据模式来判断，默认是Obj to Obj的  
    if (mode) {
      switch (mode) {
        case 1: // proto to proto  
          return owner.mix(r.prototype, s.prototype, ov, wl, 0, merge);
        case 2: // object to object and proto to proto  
          owner.mix(r.prototype, s.prototype, ov, wl, 0, merge);
          break; // pass through  
        case 3: // proto to static  
          return owner.mix(r, s.prototype, ov, wl, 0, merge);
        case 4: // static to proto  
          return owner.mix(r.prototype, s, ov, wl, 0, merge);
        default: // object to object is what happens below  
      }
    }
    // Maybe don't even need this wl && wl.length check anymore??  
    var i, l, p, type;
    //白名单如果有值，就对白名单里面的属性进行合并，如果有ov，那么就  
    if (wl && wl.length) {
      for (i = 0, l = wl.length; i < l; ++i) {
        p = wl[i];
        isObject = owner.isObject(r[p]); //看具体的属性是什么类型的  
        if (s.hasOwnProperty(p)) { //如果这个属性是p自己的  
          if (merge && isObject) { //如果设定了merge并且属性是一个对象，那么就调用mix本身，把s[p]的属性加到r[p]上面  
            owner.mix(r[p], s[p]);
          } else if (ov || !(p in r)) { //如果允许ov或者r里面没有p，那么就在r里面加上p这个属性  
            r[p] = s[p];
          }
        }
      }
    } else { //如果没有wl  
      for (i in s) { //遍历s里面的属性  
        if (s.hasOwnProperty(i)) { //如果i是s本身的属性，就按规则合并属性  
          if (merge && owner.isObject(r[i], true)) {
            owner.mix(r[i], s[i], ov, wl, 0, true); // recursive  
          } else if (ov || !(i in r)) {
            r[i] = s[i];
          }
        }
      }
    }
    return r;
  };

  /**
   * 缩短字符串
   */
  owner.short = function (str, maxLength) {
    if (!str) return str;
    maxLength = maxLength || 40;
    var strLength = str.length;
    var trimLength = maxLength / 2;
    return strLength > maxLength ? str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) : str;
  };

  /**
   * 首字母大写
   */
  owner.firstUpper = function (str) {
    if (this.isNull(str)) return;
    str[0] = str[0].toLowerCase();
    return str;
  };

  /**
   * 解析字符串为 dom 
   * @param {string} str 字符串
   * @returns {HTMLNode} 解析后的 DOM 
   */
  owner.parseDom = function (str) {
    this._PARSER_DOM_DIV = this._PARSER_DOM_DIV || document.createElement('dev');
    this._PARSER_DOM_DIV.innerHTML = str;
    var domNodes = this.toArray(this._PARSER_DOM_DIV.childNodes);
    this._PARSER_DOM_DIV.innerHTML = '';
    return domNodes;
  };

  //----

  //兼容AMD模块
  if (typeof define === 'function' && define.amd) {
    define('ntils', [], function () {
      return owner;
    });
  }

})((typeof exports === 'undefined') ? (window.ntils = {}) : exports);
//-
},{}]},{},[4])
//# sourceMappingURL=bundle.js.map
