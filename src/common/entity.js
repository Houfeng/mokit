import EventEmitter from '../events';
import { create, defineFreezeProp, copy } from 'ntils';

export default class Entity extends EventEmitter {

  static setMeta = function (options) {
    if (Object.getOwnPropertyNames(this).indexOf('meta') < 0) {
      let meta = create(this.meta || null);
      defineFreezeProp(this, 'meta', meta);
    }
    if (options) copy(options, this.meta);
  };

  get meta() {
    return this.constructor && this.constructor.meta;
  }
}