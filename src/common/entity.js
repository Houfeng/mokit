import EventEmitter from '../events';
import { create, final, copy } from 'ntils';

export default class Entity extends EventEmitter {

  static extend = function (options, superClass) {
    superClass = this;
    class NewEntity extends superClass {
      constructor(...args) {
        super(...args);
      }
    }
    copy(options, NewEntity);
    return NewEntity;
  };

  static setMeta = function (options) {
    if (Object.getOwnPropertyNames(this).indexOf('meta') < 0) {
      let meta = create(this.meta || null);
      final(this, 'meta', meta);
    }
    if (options) copy(options, this.meta);
  };

  get meta() {
    return this.constructor && this.constructor.meta;
  }

}