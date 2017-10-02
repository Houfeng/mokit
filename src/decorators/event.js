import utils from 'ntils';
import meta from './meta';

export default function (name) {
  return function (target, handler) {
    meta()(target);
    target.meta.events = target.meta.events || {};
    target.meta.events[name] = target.meta.events[name] || [];
    target.meta.events[name].push(handler);
  };
}