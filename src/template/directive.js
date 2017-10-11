import { each, final, deepEqual } from 'ntils';
import { Entity, Node } from 'common';
import Expression from './expression';
import { meta } from '../decorators';

//指令类型
const types = {
  ATTRIBUTE: 'A',
  ELEMENT: 'E'
};

//指令层级
const levels = {
  PREVENT: 3000,      //prevent
  STATEMENT: 2000,    //statement
  ELEMENT: 1000,      //element
  GENERAL: 0,         //general
  ATTRIBUTE: -1000,   //any attribute
  CLOAK: -2000        //cloak
};

/**
 * 指令定义工场函数
 */
@meta({
  type: types.ATTRIBUTE,
  level: levels.GENERAL
})
export default class Directive extends Entity {

  static types = types;
  static levels = levels;

  //挂载指令常用的类型
  Expression = Expression;
  Node = Node;

  //指令构建函数
  constructor(options) {
    super();
    each(options, (name, value) => final(this, name, value));
  }

  //处理指令选项
  bind() { }
  unbind() { }  
  update() { }

  //挂载实例核心方法
  execute(scope) {
    this.scope = scope;
    if (this.meta.type === types.ELEMENT) {
      return this.update();
    }
    let newValue = this.meta.literal ?
      this.attribute.value : this.expression.execute(scope);
    if (!deepEqual(this._value_, newValue)) {
      this.update(newValue, this._value_);
      this._value_ = newValue;
    }
  }

}