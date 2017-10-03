import { Error } from 'common';

export default function (options) {
  return function (target) {
    if (!target || !target.setMeta) {
      throw new Error('Invaild Entity');
    }
    target.setMeta(options);
  };
}