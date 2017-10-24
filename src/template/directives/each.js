const Directive = require('../directive');
const { each } = require('ntils');
const Scope = require('../scope');
const { meta } = require('decorators');

const EACH_EXPR = /([\s\S]+)\s+(in|of)\s+([\s\S]+)/;

@meta({
  level: Directive.levels.STATEMENT + 1, //比 if 要高一个权重
  final: true,
  literal: true,
})
class EachDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    //创建挂载点并插入到对应位置
    this.mountNode = this.Node.create();
    this.mountNode.insertBy(this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 each 指令必须先移除，否再进行 item 编译时 each 还会生效
    this.node.removeAttribute(this.attribute.name);
    //把 item 的 node 移除掉，还在内存中待用
    this.node.remove();
    //分解 each 表达式
    this.token = this.splitEachExpr(this.attribute.value);
    //创建循环函数
    this.execEach = this.createEachFunction(this.token);
    //实始化待用变量
    this.existsItems = {};
  }

  splitEachExpr(expr) {
    let tokens = EACH_EXPR.exec(expr);
    let list = tokens[3], type = tokens[2];
    let names = tokens[1].split(',');
    let index = names[0], item = names[1];
    if (type == 'of') index = [item, item = index][0];
    return { list, type, index, item };
  }

  createEachFunction(token) {
    let listExpr = this.parseExpr(token.list);
    return function (scope, loop) {
      let list = listExpr(scope);
      each(list, loop);
    };
  }

  createItemScope(scope, dataIndex, dataItem) {
    let indexName = this.token.index;
    let itemName = this.token.item;
    //创建新 scope，必须选创建再设置 prototype 或采用定义「属性」的方式
    //因为指令参数指定的名称有可能和 scope 原有变量冲突
    //将导致针对 watch 变量的赋值，从引用发循环
    let itemScope = new Scope(scope);
    if (indexName) {
      Object.defineProperty(itemScope, indexName, {
        get() { return dataIndex; }
      });
    }
    //item 采用「属性」进行代理，否则将会使「双向」绑定无法回设值
    if (itemName) {
      Object.defineProperty(itemScope, itemName, {
        get() { return dataItem; },
        set(value) { scope[dataIndex] = value; }
      });
    }
    return itemScope;
  }

  execute(scope) {
    let renderItems = [];
    let fragment = this.Node.createFragment();
    this.execEach(scope, (dataIndex, dataItem) => {
      let itemScope = this.createItemScope(scope, dataIndex, dataItem);
      let oldItem = this.existsItems[dataIndex];
      if (oldItem) {
        oldItem.handler(itemScope);
      } else {
        let eachItem = {};
        //创建新元素
        eachItem.node = this.node.cloneNode(true);
        fragment.appendChild(eachItem.node);
        eachItem.handler = this.compiler.compile(eachItem.node);
        eachItem.handler(itemScope);
        this.existsItems[dataIndex] = eachItem;
      }
      renderItems.push(dataIndex);
    });
    //清理旧项
    each(this.existsItems, (index, item) => {
      if (renderItems.some(i => i == index)) return;
      item.node.remove({ destroy: true });
      delete this.existsItems[index];
    });
    //挂载新项
    if (fragment.childNodes.length > 0) {
      fragment.insertBy(this.mountNode);
    }
  }

}

module.exports = EachDirective;