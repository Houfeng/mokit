import EventEmitter from '../events';
import utils from 'ntils';

export default class Entity extends EventEmitter {

  static setMeta = function (options) {
    if (Object.getOwnPropertyNames(this).indexOf('meta') < 0) {
      let meta = utils.create(this.meta || null);
      utils.defineFreezeProp(this, 'meta', meta);
    }
    if (options) utils.copy(options, this.meta);
  };

  get meta() {
    return this.constructor && this.constructor.meta;
  }
}