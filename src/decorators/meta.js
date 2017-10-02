import utils from 'ntils';

export default function (options) {
  return function (target) {
    if (Object.getOwnPropertyNames(target).indexOf('meta') < 0) {
      let meta = target.meta || utils.create(null);
      utils.defineFreezeProp(target, 'meta', meta);
      if (target.prototype) {
        utils.defineFreezeProp(target.prototype, 'meta', meta);
      }
    }
    if (options) utils.copy(options, target.meta);
  };
}