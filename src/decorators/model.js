import meta from './meta';

export default function (target, prop) {
  if (!prop) {
    return meta({ model: target });
  } else {
    return meta({
      model: function () {
        return this[prop]();
      }
    })(target);
  }
}