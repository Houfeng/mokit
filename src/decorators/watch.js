import utils from 'ntils';
import meta from './meta';

export default function (calcer) {
  return function (target, handler) {
    meta()(target.constructor);
    target.meta.watches = target.meta.watches || [];
    target.meta.watches.push({ calcer, handler });
  };
}