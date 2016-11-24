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
      var newScope = { __proto__: scope };
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