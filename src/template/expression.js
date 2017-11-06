const VARIABLE_FILTER = /(\(|\[|\{|\+|\-|\*|\/|\>|\<|\=|\!|\,|\;|\?|\:|\&|\|)\s*([a-z\_0-9\$]+)/ig;
const VARIABLE_NAME = /^[a-z\$\_]/i;
const ALLOWED_WORD = /(\$scope|true|false|null|undefined|Date|Number|String|Object|Boolean|Array|RegExp|Math|JSON|parseInt|parseFloat|isNaN|isFinite)/; //eslint-disable-line
const EXPRESSION_BLOCK = /\{\{([\s\S]+?)\}\}/;
const EXPRESSION_CACHE = {};
const TEMPLATE_CACHE = {};

function findVariables(expr) {
  expr = `(${expr})`;
  VARIABLE_FILTER.lastIndex = 0;
  let variables = {};
  let info;
  while (info = VARIABLE_FILTER.exec(expr)) { //eslint-disable-line
    let name = info[2];
    if (VARIABLE_NAME.test(name) && !ALLOWED_WORD.test(name)) {
      variables[name] = true;
    }
  }
  return Object.keys(variables);
}

function getValue(scope, name) {
  let value = scope[name];
  return (value instanceof Function) ? value.bind(scope) : value;
}

function expression(expr) {
  let cacheItem = EXPRESSION_CACHE[expr];
  if (cacheItem) return cacheItem;
  let keys = findVariables(expr);
  let func = new Function('$scope', ...keys, `return(${expr})`);
  function exec(scope) {
    let values = keys.map(name => getValue(scope, name));
    return func(scope, ...values);
  }
  EXPRESSION_CACHE[expr] = exec;
  return exec;
}

function template(str) {
  let cacheItem = TEMPLATE_CACHE[str];
  if (cacheItem) return cacheItem;
  let blocks = str.split(EXPRESSION_BLOCK);
  for (let i = 1; i < blocks.length; i += 2) {
    blocks[i] = expression(blocks[i]);
  }
  function exec(scope) {
    let result = '';
    blocks.forEach(function (block) {
      result += (block instanceof Function) ? block(scope) : block;
    });
    return result;
  }
  TEMPLATE_CACHE[str] = exec;
  return exec;
}

function compile(str, mixed) {
  return mixed ? template(str) : expression(str);
}

compile.expression = expression;
compile.template = template;

module.exports = compile;