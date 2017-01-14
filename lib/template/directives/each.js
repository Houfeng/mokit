const Directive = require('../directive');
const utils = require('ntils');
const Scope = require('../scope');

module.exports = new Directive({
  level: Directive.LS + 1, //比 if 要高一个权重
  final: true,
  literal: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 each 指令必须先移除，否再进行 item 编译时 each 还会生效
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
    this.parseExpr();
    this.eachItems = {};
  },

  parseExpr: function () {
    this.eachType = this.attribute.value.indexOf(' in ') > -1 ? 'in' : 'of';
    let tokens = this.attribute.value.split(' ' + this.eachType + ' ');
    let fnText = `with(scope){utils.each(${tokens[1]},fn.bind(this,${tokens[1]}))}`;
    this.each = new Function('utils', 'scope', 'fn', fnText).bind(null, this.utils);
    let names = tokens[0].split(',').map(function (name) {
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
    let currentEachKeys = [];
    let itemsFragment = document.createDocumentFragment();
    let self = this;
    this.each(scope, function (eachTarget, key) {
      //创建新 scope，必须选创建再设置 prototype 或采用定义「属性」的方式
      //因为指令参数指定的名称有可能和 scope 原有变量冲突
      //将导致针对 watch 变量的赋值，从引用发循环
      let newScope = new Scope(this.scope);
      if (self.keyName) {
        Object.defineProperty(newScope, self.keyName, {
          get() { return key; }
        });
      }
      //value 采用「属性」进行代理，否则将会使「双向」绑定无把回设值
      if (self.valueName) {
        Object.defineProperty(newScope, self.valueName, {
          get() { return eachTarget[key]; },
          set(value) { eachTarget[key] = value; }
        });
      }
      let oldItem = this.eachItems[key];
      if (oldItem) {
        oldItem.handler(newScope);
      } else {
        let newItem = {};
        //创建新元素
        newItem.node = this.node.cloneNode(true);
        itemsFragment.appendChild(newItem.node);
        newItem.handler = this.compiler.compile(newItem.node);
        newItem.handler(newScope);
        this.eachItems[key] = newItem;
      }
      currentEachKeys.push(key);
    }.bind(this));
    utils.each(this.eachItems, (key, item) => {
      if (currentEachKeys.some(k => k == key)) return;
      if (item.node.parentNode) {
        item.node.parentNode.removeChild(item.node);
      }
      delete this.eachItems[key];
    }, this);
    if (itemsFragment.childNodes.length > 0) {
      this.mountNode.parentNode.insertBefore(itemsFragment, this.mountNode);
    }
  }

});