const { create, copy, each, isFunction } = require('ntils');

module.exports = function (parent, props) {
  //新的 scope 因为「继承」了 _observer_ 
  //所以在新 scope 上进行双向绑定时，将将值成功回写
  //如果有天不须用 cteate 继承法，需要注意 _observer_ 
  //或在新 scope 上 defineProperty 代理 parentScope
  let scope = create(parent);
  copy(props, scope);
  //将 func 绑定到原 scope 上;
  each(parent, (key, value) => {
    if (!isFunction(value)) return;
    scope[key] = value.bind(parent);
  });
  return scope;
};