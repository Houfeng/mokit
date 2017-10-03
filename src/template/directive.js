import utils from 'ntils';
import Entity from '../common/entity';
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
  utils = utils;
  Expression = Expression;

  //指令构建函数
  constructor(options) {
    super();
    utils.copy(options, this);
  }

  //处理指令选项
  bind() { }
  update() { }
  unbind() { }

  //挂载实例核心方法
  execute(scope) {
    this.scope = scope;
    if (this.meta.type === types.ELEMENT) {
      return this.update();
    }
    let newValue = this.meta.literal ?
      this.attribute.value : this.expression.execute(scope);
    if (!utils.deepEqual(this._value_, newValue)) {
      this.update(newValue, this._value_);
      this._value_ = newValue;
    }
  }

}