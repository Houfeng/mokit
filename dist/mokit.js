(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mokit", [], factory);
	else if(typeof exports === 'object')
		exports["mokit"] = factory();
	else
		root["mokit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["noop"] = noop;
/* harmony export (immutable) */ __webpack_exports__["toString"] = toString;
/* harmony export (immutable) */ __webpack_exports__["getType"] = getType;
/* harmony export (immutable) */ __webpack_exports__["isNull"] = isNull;
/* harmony export (immutable) */ __webpack_exports__["trim"] = trim;
/* harmony export (immutable) */ __webpack_exports__["replace"] = replace;
/* harmony export (immutable) */ __webpack_exports__["startWith"] = startWith;
/* harmony export (immutable) */ __webpack_exports__["contains"] = contains;
/* harmony export (immutable) */ __webpack_exports__["endWith"] = endWith;
/* harmony export (immutable) */ __webpack_exports__["has"] = has;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasProperty", function() { return hasProperty; });
/* harmony export (immutable) */ __webpack_exports__["isFunction"] = isFunction;
/* harmony export (immutable) */ __webpack_exports__["isString"] = isString;
/* harmony export (immutable) */ __webpack_exports__["isNumber"] = isNumber;
/* harmony export (immutable) */ __webpack_exports__["isBoolean"] = isBoolean;
/* harmony export (immutable) */ __webpack_exports__["isElement"] = isElement;
/* harmony export (immutable) */ __webpack_exports__["isText"] = isText;
/* harmony export (immutable) */ __webpack_exports__["isObject"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["isArray"] = isArray;
/* harmony export (immutable) */ __webpack_exports__["isDate"] = isDate;
/* harmony export (immutable) */ __webpack_exports__["isRegexp"] = isRegexp;
/* harmony export (immutable) */ __webpack_exports__["toArray"] = toArray;
/* harmony export (immutable) */ __webpack_exports__["toDate"] = toDate;
/* harmony export (immutable) */ __webpack_exports__["each"] = each;
/* harmony export (immutable) */ __webpack_exports__["formatDate"] = formatDate;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["mix"] = mix;
/* harmony export (immutable) */ __webpack_exports__["defineFreezeProp"] = defineFreezeProp;
/* harmony export (immutable) */ __webpack_exports__["keys"] = keys;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["setPrototypeOf"] = setPrototypeOf;
/* harmony export (immutable) */ __webpack_exports__["getPrototypeOf"] = getPrototypeOf;
/* harmony export (immutable) */ __webpack_exports__["deepEqual"] = deepEqual;
/* harmony export (immutable) */ __webpack_exports__["fromTo"] = fromTo;
/* harmony export (immutable) */ __webpack_exports__["newGuid"] = newGuid;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["setByPath"] = setByPath;
/* harmony export (immutable) */ __webpack_exports__["getByPath"] = getByPath;
/* harmony export (immutable) */ __webpack_exports__["unique"] = unique;
/* harmony export (immutable) */ __webpack_exports__["getFunctionArgumentNames"] = getFunctionArgumentNames;
/* harmony export (immutable) */ __webpack_exports__["short"] = short;
/* harmony export (immutable) */ __webpack_exports__["firstUpper"] = firstUpper;
/* harmony export (immutable) */ __webpack_exports__["escapeRegExp"] = escapeRegExp;
/* harmony export (immutable) */ __webpack_exports__["parseDom"] = parseDom;

/**
 * 空函数
 */
function noop() { };

function toString(obj) {
  return Object.prototype.toString.call(obj);
}

function getType(obj) {
  var str = toString(obj);
  return (/^\[object (.+)\]$/i.exec(str))[1];
}

/**
 * 验证一个对象是否为NULL
 * @method isNull
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isNull(obj) {
  var type = getType(obj);
  return type === 'Undefined' || type === 'Null';
};

/**
 * 除去字符串两端的空格
 * @method trim
 * @param  {String} str 源字符串
 * @return {String}     结果字符串
 * @static
 */
function trim(str) {
  if (isNull(str)) return str;
  if (str.trim) {
    return str.trim();
  } else {
    return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
  }
};

/**
 * 替换所有
 * @method replace
 * @param {String} str 源字符串
 * @param {String} str1 要替换的字符串
 * @param {String} str2 替换为的字符串
 * @static
 */
function replace(str, str1, str2) {
  if (isNull(str)) return str;
  return str.replace(new RegExp(str1, 'g'), str2);
};

/**
 * 从字符串开头匹配
 * @method startWith
 * @param {String} str1 源字符串
 * @param {String} str2 要匹配的字符串
 * @return {Boolean} 匹配结果
 * @static
 */
function startWith(str1, str2) {
  if (isNull(str1) || isNull(str2)) return false;
  return str1.indexOf(str2) === 0;
};

/**
 * 是否包含
 * @method contains
 * @param {String} str1 源字符串
 * @param {String} str2 检查包括字符串
 * @return {Boolean} 结果
 * @static
 */
function contains(str1, str2) {
  var self = this;
  if (isNull(str1) || isNull(str2)) return false;
  return str1.indexOf(str2) > -1;
};

/**
 * 从字符串结束匹配
 * @method endWidth
 * @param {String} str1 源字符串
 * @param {String} str2 匹配字符串
 * @return {Boolean} 匹配结果
 * @static
 */
function endWith(str1, str2) {
  if (isNull(str1) || isNull(str2)) return false;
  return str1.indexOf(str2) === (str1.length - str2.length);
};

/**
 * 是否包含属性
 * @method hasProperty
 * @param  {Object}  obj  对象
 * @param  {String}  name 属性名
 * @return {Boolean}      结果
 * @static
 */
function has(obj, name) {
  if (isNull(obj) || isNull(name)) return false;
  return (name in obj) || (obj.hasOwnProperty(name));
};
var hasProperty = has;

/**
 * 验证一个对象是否为Function
 * @method isFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isFunction(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === "Function";
};

/**
 * 验证一个对象是否为String
 * @method isString
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isString(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === 'String';
};

/**
 * 验证一个对象是否为Number
 * @method isNumber
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isNumber(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === 'Number';
};

/**
 * 验证一个对象是否为Boolean
 * @method isBoolean
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isBoolean(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === 'Boolean';
};

/**
 * 验证一个对象是否为HTML Element
 * @method isElement
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isElement(obj) {
  if (isNull(obj)) return false;
  if (window.Element) {
    return obj instanceof Element;
  } else {
    return (obj.tagName && obj.nodeType &&
      obj.nodeName && obj.attributes &&
      obj.ownerDocument);
  }
};

/**
 * 验证一个对象是否为HTML Text Element
 * @method isText
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isText(obj) {
  if (isNull(obj)) return false;
  return obj instanceof Text;
};

/**
 * 验证一个对象是否为Object
 * @method isObject
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isObject(obj) {
  if (isNull(obj)) return false;
  var type = getType(obj);
  return type === 'Object' || type === 'Array';
};

/**
 * 验证一个对象是否为Array或伪Array
 * @method isArray
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isArray(obj) {
  if (isNull(obj)) return false;
  var v1 = getType(obj) === 'Array';
  var v2 = obj instanceof Array;
  var v3 = !isString(obj) && isNumber(obj.length) && isFunction(obj.splice);
  var v4 = !isString(obj) && isNumber(obj.length) && obj[0];
  return v1 || v2 || v3 || v4;
};

/**
 * 验证是不是一个日期对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
function isDate(val) {
  if (isNull(val)) return false;
  return val instanceof Date;
};

/**
 * 验证是不是一个正则对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
function isRegexp(val) {
  return val instanceof RegExp;
};

/**
 * 转换为数组
 * @method toArray
 * @param {Array|Object} array 伪数组
 * @return {Array} 转换结果数组
 * @static
 */
function toArray(array) {
  if (isNull(array)) return [];
  return Array.prototype.slice.call(array);
};

/**
 * 转为日期格式
 * @method toDate
 * @param {Number|String} val 日期字符串或整型数值
 * @return {Date} 日期对象
 * @static
 */
function toDate(val) {
  var self = this;
  if (self.isNumber(val))
    return new Date(val);
  else if (self.isString(val))
    return new Date(self.replace(self.replace(val, '-', '/'), 'T', ' '));
  else if (self.isDate(val))
    return val;
  else
    return null;
};

/**
 * 遍历一个对像或数组
 * @method each
 * @param  {Object or Array}   obj  要遍历的数组或对象
 * @param  {Function} fn            处理函数
 * @return {void}                   无返回值
 * @static
 */
function each(list, handler, scope) {
  if (isNull(list) || isNull(handler)) return;
  if (isArray(list)) {
    var listLength = list.length;
    for (var i = 0; i < listLength; i++) {
      var rs = handler.call(scope || list[i], i, list[i]);
      if (!isNull(rs)) return rs;
    }
  } else {
    for (var key in list) {
      var rs = handler.call(scope || list[key], key, list[key]);
      if (!isNull(rs)) return rs;
    }
  }
};

/**
 * 格式化日期
 * @method formatDate
 * @param {Date|String|Number} date 日期
 * @param {String} format 格式化字符串
 * @param {object} dict 反译字典
 * @return {String} 格式化结果
 * @static
 */
function formatDate(date, format, dict) {
  if (isNull(format) || isNull(date)) return date;
  date = toDate(date);
  dict = dict || {};
  var placeholder = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "w+": date.getDay(), //week
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var key in placeholder) {
    if (new RegExp("(" + key + ")").test(format)) {
      var value = placeholder[key];
      value = dict[value] || value;
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? value : ("00" + value).substr(("" + value).length));
    }
  }
  return format;
};

/**
 * 拷贝对象
 * @method copy
 * @param {Object} src 源对象
 * @param {Object} dst 目标对象
 * @static
 */
function copy(src, dst, igonres) {
  dst = dst || (isArray(src) ? [] : {});
  each(src, function (key) {
    if (igonres && igonres.indexOf(key) > -1) return;
    delete dst[key];
    if (Object.getOwnPropertyDescriptor) {
      try {
        Object.defineProperty(dst, key,
          Object.getOwnPropertyDescriptor(src, key));
      } catch (ex) {
        dst[key] = src[key];
      }
    } else {
      dst[key] = src[key];
    }
  })
  return dst;
};

/**
 * 深度克隆对象
 * @method clone
 * @param {Object} src 源对象
 * @return {Object} 新对象
 * @static
 */
function clone(src, igonres) {
  if (isNull(src) ||
    isString(src) ||
    isNumber(src) ||
    isBoolean(src) ||
    isDate(src)) {
    return src;
  }
  var objClone = src;
  try {
    objClone = new src.constructor();
  } catch (ex) { }
  each(src, function (key, value) {
    if (objClone[key] != value && !contains(igonres, key)) {
      if (isObject(value)) {
        objClone[key] = clone(value, igonres);
      } else {
        objClone[key] = value;
      }
    }
  }, this);
  ['toString', 'valueOf'].forEach(function (key) {
    if (contains(igonres, key)) return;
    defineFreezeProp(objClone, key, src[key]);
  }, this);
  return objClone;
};

/**
 * 合并对象
 * @method mix
 * @return 合并后的对象
 * @param {Object} dst 目标对象
 * @param {Object} src 源对象
 * @param {Array} igonres 忽略的属性名,
 * @param {Number} mode 模式
 */
function mix(dst, src, igonres, mode, igonreNull) {
  //根据模式来判断，默认是Obj to Obj的  
  if (mode) {
    switch (mode) {
      case 1: // proto to proto  
        return mix(dst.prototype, src.prototype, igonres, 0);
      case 2: // object to object and proto to proto  
        mix(dst.prototype, src.prototype, igonres, 0);
        break; // pass through  
      case 3: // proto to static  
        return mix(dst, src.prototype, igonres, 0);
      case 4: // static to proto  
        return mix(dst.prototype, src, igonres, 0);
      default: // object to object is what happens below  
    }
  }
  //---
  src = src || {};
  dst = dst || (isArray(src) ? [] : {});
  keys(src).forEach(function (key) {
    if (contains(igonres, key)) return;
    if (igonreNull && isNull(src[key])) return;
    if (isObject(src[key]) &&
      (src[key].constructor == Object ||
        src[key].constructor == Array ||
        src[key].constructor == null)) {
      dst[key] = mix(dst[key], src[key], igonres, 0, igonreNull);
    } else {
      dst[key] = src[key];
    }
  }, this);
  return dst;
};

/**
 * 定义不可遍历的属性
 **/
function defineFreezeProp(obj, name, value) {
  try {
    Object.defineProperty(obj, name, {
      value: value,
      enumerable: false,
      configurable: true, //能不能重写定义
      writable: false //能不能用「赋值」运算更改
    });
  } catch (err) {
    obj[name] = value;
  }
};

/**
 * 获取所有 key 
 */
function keys(obj) {
  if (Object.keys) return Object.keys(obj);
  var keys = [];
  each(obj, function (key) {
    keys.push(key);
  });
  return keys;
};

/**
 * 创建一个对象
 */
function create(proto, props) {
  if (Object.create) return Object.create(proto, props);
  function Cotr() { };
  Cotr.prototype = proto;
  var obj = new Cotr();
  if (props) copy(props, obj);
  return obj;
};

/**
 * 设置 proto
 * 在不支持 setPrototypeOf 也不支持 __proto__ 的浏览器
 * 中，会采用 copy 方式
 */
function setPrototypeOf(obj, proto) {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(obj, proto || create(null));
  } else {
    if (!('__proto__' in Object)) copy(proto, obj);
    obj.__proto__ = proto;
  }
};

/**
 * 获取 proto
 */
function getPrototypeOf(obj) {
  if (obj.__proto__) return obj.__proto__;
  if (Object.getPrototypeOf) return Object.getPrototypeOf(obj);
  if (obj.constructor) return obj.constructor.prototype;
};

/**
 * 是否深度相等
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  var aKeys = keys(a);
  var bKeys = keys(b);
  if (aKeys.length !== bKeys.length) return false;
  var allKeys = aKeys.concat(bKeys);
  var checkedMap = create(null);
  var result = true;
  each(allKeys, function (i, key) {
    if (checkedMap[key]) return;
    if (!deepEqual(a[key], b[key])) result = false;
    checkedMap[key] = true;
  }, this);
  return result;
};

/**
 * 从一个数值循环到别一个数
 * @param {number} fromNum 开始数值
 * @param {Number} toNum 结束数值
 * @param {Number} step 步长值
 * @param {function} handler 执行函数
 * @returns {void} 无返回
 */
function fromTo(fromNum, toNum, step, handler) {
  if (!handler) handler = [step, step = handler][0];
  step = Math.abs(step || 1);
  if (fromNum < toNum) {
    for (var i = fromNum; i <= toNum; i += step) handler(i);
  } else {
    for (var i = fromNum; i >= toNum; i -= step) handler(i);
  }
};

/**
 * 生成一个Guid
 * @method newGuid
 * @return {String} GUID字符串
 * @static
 */
function newGuid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (s4() + s4() + "-" + s4() + "-" + s4() + "-" +
    s4() + "-" + s4() + s4() + s4());
};

/**
 * 对象变换
 **/
function map(list, fn) {
  var buffer = isArray(list) ? [] : {};
  each(list, function (name, value) {
    buffer[name] = fn(name, value);
  });
  return buffer;
};

/**
 * 通过路径设置属性值
 */
function setByPath(obj, path, value) {
  if (isNull(obj) || isNull(path) || path === '') {
    return;
  }
  if (!isArray(path)) {
    path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
  }
  each(path, function (index, name) {
    if (isNull(name) || name.length < 1) return;
    if (index === path.length - 1) {
      obj[name] = value;
    } else {
      obj[name] = obj[name] || {};
      obj = obj[name];
    }
  }, this);
};

/**
 * 通过路径获取属性值
 */
function getByPath(obj, path) {
  if (isNull(obj) || isNull(path) || path === '') {
    return obj;
  }
  if (!isArray(path)) {
    path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
  }
  each(path, function (index, name) {
    if (isNull(name) || name.length < 1) return;
    if (!isNull(obj)) obj = obj[name];
  }, this);
  return obj;
};

/**
 * 数组去重
 **/
function unique(array) {
  if (isNull(array)) return array;
  var newArray = [];
  each(array, function (i, value) {
    if (newArray.indexOf(value) > -1) return;
    newArray.push(value);
  });
  return newArray;
};

/**
 * 解析 function 的参数列表
 **/
function getFunctionArgumentNames(fn) {
  if (!fn) return [];
  var src = fn.toString();
  var parts = src.split(')')[0].split('=>')[0].split('(');
  return (parts[1] || parts[0]).split(',').map(function (name) {
    return name.trim();
  }).filter(function (name) {
    return name != 'function';
  });
};

/**
 * 缩短字符串
 */
function short(str, maxLength) {
  if (!str) return str;
  maxLength = maxLength || 40;
  var strLength = str.length;
  var trimLength = maxLength / 2;
  return strLength > maxLength ?
    str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) :
    str;
};

/**
 * 首字母大写
 */
function firstUpper(str) {
  if (isNull(str)) return;
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

/**
 * 编码正则字符串
 */
function escapeRegExp(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/**
 * 解析字符串为 dom 
 * @param {string} str 字符串
 * @returns {HTMLNode} 解析后的 DOM 
 */
function parseDom(str) {
  window._NTILS_PARSE_DOM_ = window._NTILS_PARSE_DOM_ ||
    document.createElement('div');
  window._NTILS_PARSE_DOM_.innerHTML = trim(str);
  var firstNode = window._NTILS_PARSE_DOM_.childNodes[0];
  //先 clone 一份再通过 innerHTML 清空
  //否则 IE9 下，清空时会导不通过返回的 DOM 没有子结点
  if (firstNode) firstNode = firstNode.cloneNode(true);
  window._NTILS_PARSE_DOM_.innerHTML = '';
  return firstNode;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class, _class2, _temp;

var _ntils = __webpack_require__(0);

var _common = __webpack_require__(2);

var _expression = __webpack_require__(7);

var _expression2 = _interopRequireDefault(_expression);

var _decorators = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//指令类型
var types = {
  ATTRIBUTE: 'A',
  ELEMENT: 'E'
};

//指令层级
var levels = {
  PREVENT: 3000, //prevent
  STATEMENT: 2000, //statement
  ELEMENT: 1000, //element
  GENERAL: 0, //general
  ATTRIBUTE: -1000, //any attribute
  CLOAK: -2000 //cloak
};

/**
 * 指令定义工场函数
 */
var Directive = (_dec = (0, _decorators.meta)({
  type: types.ATTRIBUTE,
  level: levels.GENERAL
}), _dec(_class = (_temp = _class2 = function (_Entity) {
  _inherits(Directive, _Entity);

  //指令构建函数
  function Directive(options) {
    _classCallCheck(this, Directive);

    var _this = _possibleConstructorReturn(this, _Entity.call(this));

    _this.Expression = _expression2.default;

    (0, _ntils.copy)(options, _this);
    return _this;
  }

  //处理指令选项


  //挂载指令常用的类型


  Directive.prototype.bind = function bind() {};

  Directive.prototype.update = function update() {};

  Directive.prototype.unbind = function unbind() {};

  //挂载实例核心方法


  Directive.prototype.execute = function execute(scope) {
    this.scope = scope;
    if (this.meta.type === types.ELEMENT) {
      return this.update();
    }
    var newValue = this.meta.literal ? this.attribute.value : this.expression.execute(scope);
    if (!(0, _ntils.deepEqual)(this._value_, newValue)) {
      this.update(newValue, this._value_);
      this._value_ = newValue;
    }
  };

  return Directive;
}(_common.Entity), _class2.types = types, _class2.levels = levels, _temp)) || _class);
exports.default = Directive;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _entity = __webpack_require__(19);

var _entity2 = _interopRequireDefault(_entity);

var _error = __webpack_require__(20);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Entity: _entity2.default, Error: _error2.default };
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _meta = __webpack_require__(6);

var _meta2 = _interopRequireDefault(_meta);

var _components = __webpack_require__(21);

var _components2 = _interopRequireDefault(_components);

var _directives = __webpack_require__(22);

var _directives2 = _interopRequireDefault(_directives);

var _event = __webpack_require__(23);

var _event2 = _interopRequireDefault(_event);

var _model = __webpack_require__(24);

var _model2 = _interopRequireDefault(_model);

var _template = __webpack_require__(25);

var _template2 = _interopRequireDefault(_template);

var _watch = __webpack_require__(26);

var _watch2 = _interopRequireDefault(_watch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var on = _event2.default;
var dependencies = _components2.default;

exports.default = {
  meta: _meta2.default, event: _event2.default, on: on, model: _model2.default, watch: _watch2.default,
  template: _template2.default, components: _components2.default, dependencies: dependencies, directives: _directives2.default
};
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _ntils = __webpack_require__(0);

var _common = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 事件触发器基类
 */
var EventEmitter = function () {

  /**
   * 构建一个一个事修的触发器对象
   * @param {object} target 将代理的目标对象可以省略
   * @returns {void} 无返回
   */
  function EventEmitter(target) {
    _classCallCheck(this, EventEmitter);

    target = target || this;
    var emitter = target._emitter_;
    if (emitter) return emitter;
    (0, _ntils.defineFreezeProp)(this, '_target_', target);
    (0, _ntils.defineFreezeProp)(target, '_emitter_', this);
    this._isNative_ = this._isNativeObject(this._target_);
    this._listeners_ = this._listeners_ || {};
    this.on = this.$on = this.$addListener = this.addListener;
    this.off = this.$off = this.$removeListener = this.removeListener;
    this.$emit = this.emit;
  }

  /**
   * 检查是否原生支持事件
   * @param {object} obj 对象
   * @returns {void} 检查结果
   */


  EventEmitter.prototype._isNativeObject = function _isNativeObject(obj) {
    return obj.addEventListener && obj.removeEventListener && obj.dispatchEvent;
  };

  /**
   * 添加一个事件监听函数
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */


  EventEmitter.prototype.addListener = function addListener(name, listener, capture) {
    if (this._isNative_) {
      this._addNativeEventListener(name, listener, capture);
    }
    this._listeners_[name] = this._listeners_[name] || [];
    this._listeners_[name].push(listener);
    if (this._listeners_[name].length > EventEmitter._maxListeners) {
      throw new _common.Error('The `' + name + '` event listener is not more than 10');
    }
  };

  /**
   * 移除「一个/一组/所有」事件监听函数
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */


  EventEmitter.prototype.removeListener = function removeListener(name, listener, capture) {
    if (name && listener) {
      if (this._isNative_) {
        this._removeNativeEventListener(name, listener, capture);
      }
      if (!this._listeners_[name]) return;
      var index = this._listeners_[name].indexOf(listener);
      this._listeners_[name].splice(index, 1);
    } else if (name) {
      if (this._isNative_ && this._listeners_[name]) {
        this._listeners_[name].forEach(function (_listener) {
          this.removeListener(name, _listener, capture);
        }, this);
      }
      delete this._listeners_[name];
    } else {
      (0, _ntils.each)(this._listeners_, function (name) {
        this.removeListener(name, null, capture);
      }, this);
      this._listeners_ = {};
    }
  };

  /**
   * 触发自身的一个事件
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @param {string} canBubble 能否冒泡(只在代理 dom 对象时有效)
   * @param {object} cancelAble 能否取消(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */


  EventEmitter.prototype.emit = function emit(name, data, canBubble, cancelAble) {
    if (this._isNative_) {
      return this._emitNativeEvent(name, data, canBubble, cancelAble);
    }
    if (!this._listeners_[name]) return;
    var stopPropagation = false;
    this._listeners_[name].forEach(function (handler) {
      var rs = handler.call(this._target_, data);
      if (rs === false) stopPropagation = true;
    }, this);
    return stopPropagation;
  };

  /**
   * 添加 DOM 元素事件
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件
   * @returns {void} 无返回
   */


  EventEmitter.prototype._addNativeEventListener = function _addNativeEventListener(name, listener, capture) {
    this._target_.addEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.addListener = descriptor.addListener || descriptor.on;
      descriptor.addListener(this, name, listener, capture);
    }
  };

  /**
   * 移除 DOM 元素事件
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件
   * @returns {void} 无返回
   */


  EventEmitter.prototype._removeNativeEventListener = function _removeNativeEventListener(name, listener, capture) {
    this._target_.removeEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.removeListener = descriptor.removeListener || descriptor.off;
      descriptor.removeListener(this, name, listener, capture);
    }
  };

  /**
   * 触发 DOM 元素事件
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @param {string} canBubble 能否冒泡
   * @param {object} cancelAble 能否取消
   * @returns {void} 无返回
   */


  EventEmitter.prototype._emitNativeEvent = function _emitNativeEvent(name, data, canBubble, cancelAble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(name, canBubble, cancelAble);
    (0, _ntils.copy)(data, event, ['data']);
    event.data = data;
    return this._target_.dispatchEvent(event);
  };

  return EventEmitter;
}();

//最多添加多少个 listener


EventEmitter._maxListeners = 100;

//所有自定义事件
EventEmitter._events = [];

/**
 * 注册自定义事件(只在代理 dom 对象时有效)
 * @param {object} descriptor 事件定义
 * @returns {void} 无返回
 */
EventEmitter.register = function (descriptor) {
  var names = descriptor.name;
  if (!names) return;
  if (!(0, _ntils.isArray)(names)) names = names.split(',');
  names.forEach(function (name) {
    this._events[name] = descriptor;
  }, this);
};

exports.default = EventEmitter;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = Scope;

var _ntils = __webpack_require__(0);

function Scope(parent, props) {
  //新的 scope 因为「继承」了 _observer_ 
  //所以在新 scope 上进行双向绑定时，将将值成功回写
  //如果有天不须用 cteate 继承法，需要注意 _observer_ 
  //或在新 scope 上 defineProperty 代理 parentScope
  var scope = (0, _ntils.create)(parent);
  (0, _ntils.copy)(props, scope);
  //将 func 绑定到原 scope 上;
  (0, _ntils.each)(parent, function (key, value) {
    if (!(0, _ntils.isFunction)(value)) return;
    scope[key] = value.bind(parent);
  });
  return scope;
}
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

exports.default = function (options) {
  return function (target) {
    if (!target || !target.setMeta) {
      throw new _common.Error('Invaild Entity');
    }
    target.setMeta(options);
  };
};

var _common = __webpack_require__(2);

module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _ntils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 表达式类型，将字符串构析为可执行表达式实例
 */
var Expression = function () {

  /**
   * 通过字符串构造一个表达式实例
   * @param {string} code 代码字符串
   * @param {boolean} mix 是否是混合代码
   * @returns {void} 无返回
   */
  function Expression(code, mix) {
    _classCallCheck(this, Expression);

    this.func = mix ? this._compileMixedCode(code) : this._compileCode(code);
  }

  /**
   * 编译普通表达式代码
   * @param {string} code 代码字符串
   * @returns {function} 编辑后的函数
   */


  Expression.prototype._compileCode = function _compileCode(code) {
    code = this._escapeEOL(this._wrapCode(code));
    return this._createFunction(code);
  };

  /**
   * 编辑混合的表达式代码
   * @param {string} code 代码字符串
   * @returns {function} 编辑后的函数
   */


  Expression.prototype._compileMixedCode = function _compileMixedCode(code) {
    var statements = this._parseMixedCode(code);
    code = this._escapeEOL(statements.join('+'));
    return this._createFunction(code);
  };

  /**
   * 通过符串代码创建一个可执行函数
   * @param {string} code 代码字符串
   * @returns {function} 创建的函数
   */


  Expression.prototype._createFunction = function _createFunction(code) {
    return new Function('scope', 'with(scope){return ' + code + '}');
  };

  /**
   * 解析混合代码字符串
   * @param {string} code 混合代码字符串
   * @returns {Array} 解析后的「token」列表
   */


  Expression.prototype._parseMixedCode = function _parseMixedCode(code) {
    var index = 0,
        length = code.length;
    var token = '',
        isExpr = false,
        tokens = [];
    while (index <= length) {
      var char = code[index++];
      var nextChar = code[index];
      if ((0, _ntils.isNull)(char)) {
        if (token.length > 0) {
          tokens.push('"' + this._escapeCode(token) + '"');
        }
        token = '';
        isExpr = false;
      } else if (!isExpr && char + nextChar == '{{') {
        if (token.length > 0) {
          tokens.push('"' + this._escapeCode(token) + '"');
        }
        token = '';
        isExpr = true;
        index++;
      } else if (isExpr && char + nextChar == '}}') {
        if (token.length > 0) {
          tokens.push(this._wrapCode(token));
        }
        token = '';
        isExpr = false;
        index++;
      } else {
        token += char;
      }
    }
    return tokens;
  };

  /**
   * 转义处理代码字符串
   * @param {string} code 源字符串
   * @returns {string} 处理后的字符串
   */


  Expression.prototype._escapeCode = function _escapeCode(code) {
    return code.replace(/"/, '\\"').replace('\r\n', '\\r\\n').replace('\n', '\\n');
  };

  /**
   * 转义换行符
   * @param {string} code 源字符串
   * @returns {string} 处理后的字符串
   */


  Expression.prototype._escapeEOL = function _escapeEOL(code) {
    return code.replace(/\n/gm, '\\\n');
  };

  /**
   * 通过闭包和 try/cache 包裹代码
   * 将模板中错误的代码直接显示在「模板中用到的位置」，更易于定位错误。
   * @param {string} code 源字符串
   * @returns {string} 处理后的字符串
   */


  Expression.prototype._wrapCode = function _wrapCode(code) {
    return '((function(){try{return ' + code + '}catch(err){console.error(err);return err}})())';
  };

  /**
   * 通过 scope 对象执行表达式
   * @param {Object} scope 上下文对象
   * @returns {Object} 执行结果
   */


  Expression.prototype.execute = function execute(scope) {
    if ((0, _ntils.isNull)(scope)) {
      scope = {};
    }
    return this.func.call(scope, scope);
  };

  return Expression;
}();

exports.default = Expression;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _compiler = __webpack_require__(12);

var _compiler2 = _interopRequireDefault(_compiler);

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _expression = __webpack_require__(7);

var _expression2 = _interopRequireDefault(_expression);

var _template = __webpack_require__(47);

var _template2 = _interopRequireDefault(_template);

var _directives = __webpack_require__(13);

var _directives2 = _interopRequireDefault(_directives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_template2.default.Template = _template2.default;
_template2.default.Compiler = _compiler2.default;
_template2.default.Directive = _directive2.default;
_template2.default.directives = _directives2.default;
_template2.default.Expression = _expression2.default;

exports.default = _template2.default;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports) {

exports.__esModule = true;
exports.default = { "name": "mokit", "version": "4.0.0-alpha1" };
module.exports = exports["default"];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _component = __webpack_require__(11);

var _component2 = _interopRequireDefault(_component);

var _components = __webpack_require__(49);

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_component2.default.components = _components2.default;

exports.default = _component2.default;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _template = __webpack_require__(8);

var _template2 = _interopRequireDefault(_template);

var _watcher = __webpack_require__(15);

var _watcher2 = _interopRequireDefault(_watcher);

var _ntils = __webpack_require__(0);

var _common = __webpack_require__(2);

var _directive = __webpack_require__(48);

var _directive2 = _interopRequireDefault(_directive);

var _decorators = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var directives = _template2.default.directives;

/**
 * 组件类
 * 用于定义一个新的组件
 * @param {Object} classOpts 类选项
 * @returns {Component} 组件类
 */

var Component = (_dec = (0, _decorators.meta)({
  template: '<span>Invaild template</span>'
}), _dec(_class = function (_Entity) {
  _inherits(Component, _Entity);

  /**
   * 组件类构造函数
   * @param {object} options 实例选项
   * @returns {void} 无返回
   */
  function Component(options) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, _Entity.call(this));

    options = options || (0, _ntils.create)(null);
    (0, _ntils.copy)(options, _this);
    _this._processMeta_();
    var meta = _this.meta;
    _this.$setModel(meta.model);
    _this._bindWatches_(meta.watches);
    _this._bindDirectives_(meta.directives);
    _this._bindComponents_(_extends({}, Component.components, meta.components, {
      'self': _this.constructor
    }));
    _this._bindEvents_(meta.events);
    (0, _ntils.defineFreezeProp)(_this, '$children', []);
    if (options.parent) _this.$setParent(options.parent);
    _this.$emit('beforeInit');
    return _this;
  }

  /**
   * 设定父组件
   * @param {Object} parent 父组件
   * @returns {void} 无返回
   */


  Component.prototype.$setParent = function $setParent(parent) {
    if (this.$parent === parent) return;
    if (this.$parent) {
      this.$parent.$removeChild(this);
    }
    if (parent) {
      parent.$addChild(this);
    }
  };

  /**
   * 添加子组件
   * @param {Object} child 子组件
   * @returns {void} 无返回
   */


  Component.prototype.$addChild = function $addChild(child) {
    if (!(child instanceof Component)) return;
    this.$children.push(child);
    (0, _ntils.defineFreezeProp)(child, '$parent', this);
    (0, _ntils.defineFreezeProp)(child, '$root', this.$root || this);
  };

  /**
   * 移除子组件
   * @param {Object} child 子组件
   * @returns {void} 无返回
   */


  Component.prototype.$removeChild = function $removeChild(child) {
    var index = this.$children.indexOf(child);
    this.$children.splice(index, 1);
    (0, _ntils.defineFreezeProp)(child, '$parent', null);
    //defineFreezeProp(child, '$root', null);
  };

  /**
   * 获取根组件, 为了能通过 polyfill 处理 IE8 暂不用这种方式
   */


  /**
   * 导入用到的子组件类
   * @param {Object} components 引入的组件
   * @returns {void} 无返回
   */
  Component.prototype._bindComponents_ = function _bindComponents_(components) {
    var _this2 = this;

    if (!components) return;
    this.$components = this.$components || {};
    this.$directives = this.$directives || {};
    (0, _ntils.each)(components, function (name, component) {
      if (!component) return;
      _this2.$components[name] = component;
      _this2.$directives[name] = (0, _directive2.default)({
        component: component,
        parent: _this2
      });
    });
  };

  /**
   * 导入一个用到的指令
   * @param {Object} directives 引入的指令
   * @returns {void} 无返回
   */


  Component.prototype._bindDirectives_ = function _bindDirectives_(directives) {
    var _this3 = this;

    if (!directives) return;
    this.$directives = this.$directives || {};
    (0, _ntils.each)(directives, function (name, directive) {
      if (!directive) return;
      _this3.$directives[name] = directive;
    });
  };

  /**
   * 调用生命周期 hook
   * @param {Array} events 调用 hook 的参数列表
   * @returns {void} 无反回
   */


  Component.prototype._bindEvents_ = function _bindEvents_(events) {
    var _this4 = this;

    (0, _ntils.each)(events, function (name, handlers) {
      handlers.forEach(function (handler) {
        handler = (0, _ntils.isFunction)(handler) ? handler : _this4[handler];
        _this4.$on(name, handler.bind(_this4));
      });
    });
  };

  /**
   * 创建数据对象
   * @param {Object} model 组件数据对象
   * @returns {void} 无返回
   */


  Component.prototype.$setModel = function $setModel(model) {
    if ((0, _ntils.isFunction)(model)) {
      this.$model = model.call(this);
    } else {
      this.$model = model || {};
    }
    (0, _ntils.each)(this.$model, function (name) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: function get() {
          if (!this.$model) return;
          return this.$model[name];
        },
        set: function set(value) {
          if (!this.$model) return;
          this.$model[name] = value;
        }
      });
    }, this);
  };

  /**
   * 创建监控
   * 为什么用 watches 而不是 watchers 或其它？
   * 因为，这里仅是「监控配置」并且是「复数」
   * @param {Object} watches 监控定义对象
   * @returns {void} 无返回
   */


  Component.prototype._bindWatches_ = function _bindWatches_(watches) {
    var _this5 = this;

    if (!watches) return;
    watches.forEach(function (item) {
      _this5.$watch(item.calcer, item.handler);
    });
  };

  /**
   * 在模板发生更新时
   * @returns {void} 无返回
   */


  Component.prototype._onTemplateUpdate_ = function _onTemplateUpdate_() {
    if (!this.$watchers) return;
    this.$watchers.forEach(function (watcher) {
      watcher.calc();
    });
  };

  /**
   * 添加一个监控
   * @param {string|function} calcer 计算函数或路径
   * @param {function} handler 处理函数
   * @returns {void} 无返回
   */


  Component.prototype.$watch = function $watch(calcer, handler) {
    var _this6 = this;

    this.$watchers = this.$watchers || [];
    var calcerFunc = (0, _ntils.isFunction)(calcer) ? calcer : function () {
      return (0, _ntils.getByPath)(_this6, calcer);
    };
    var handlerFunc = (0, _ntils.isFunction)(handler) ? handler : (0, _ntils.getByPath)(this, handler);
    var watcher = new _watcher2.default(calcerFunc, handlerFunc.bind(this));
    this.$watchers.push(watcher);
    return watcher;
  };

  /**
   * 取消一个 watcher 对象
   * @param {object} watcher 监控对象实例
   * @returns {void} 无返回
   */


  Component.prototype.$unWatch = function $unWatch(watcher) {
    var index = this.$watchers.findIndex(function (w) {
      return w === watcher;
    });
    this.$watchers.splice(index, 1);
  };

  Component.prototype._processMeta_ = function _processMeta_() {
    var meta = this.meta;
    if ((0, _ntils.isString)(meta.template)) {
      meta.template = (0, _ntils.parseDom)(meta.template);
    }
  };

  /**
   * 创建元素
   * @returns {void} 无返回
   */


  Component.prototype._createElement_ = function _createElement_() {
    if (this._created_) return;
    this._created_ = true;
    var meta = this.meta;
    this.$emit('create');
    var element = meta.template.cloneNode(true);
    (0, _ntils.defineFreezeProp)(this, '$element', element);
    if (!this.$element || this.$element.nodeName === '#text') {
      throw new _common.Error('Invalid component template');
    }
    this.$emit('created');
  };

  /**
   * 编译自身模板并完成绑定
   * @returns {void} 无返回
   */


  Component.prototype.$compile = function $compile() {
    var _this7 = this;

    if (this._compiled_) return;
    this._compiled_ = true;
    this.$emit('init');
    this._createElement_();
    var template = new _template2.default(this.$element, {
      directives: this.$directives,
      root: true
    });
    (0, _ntils.defineFreezeProp)(this, '$template', template);
    this.$template.bind(this);
    this.$template.on('update', this._onTemplateUpdate_.bind(this));
    this.$template.on('bind', function () {
      if (!_this7.deferReady) _this7.$emit('ready');
    });
  };

  /**
   * 向 DOM tree 中挂截组件
   * @param {HTMLNode} mountNode 挂载点元素
   * @param {append} append 是否 append 到挂载元素内
   * @returns {void} 无返回 
   */


  Component.prototype.$mount = function $mount(mountNode, append) {
    if (this._mounted_) return;
    this.$compile();
    this.$emit('mount');
    if (mountNode) {
      mountNode.$substitute = this.$element;
      this.$element._mountNode = mountNode;
      if (append) {
        mountNode.appendChild(this.$element);
      } else if (mountNode.parentNode) {
        mountNode.parentNode.insertBefore(this.$element, mountNode);
      }
    }
    this._mounted_ = true;
    this._removed_ = false;
    this.$emit('mounted');
  };

  /**
   * 将组件添加到指定容器元素内
   * @param {HTMLNode} node 容器元素
   * @returns {void} 无返回 
   */


  Component.prototype.$appendTo = function $appendTo(node) {
    this.$mount(node, true);
  };

  /**
   * 移除组件
   * @returns {void} 无返回
   */


  Component.prototype.$remove = function $remove() {
    if (this._removed_ || !this._mounted_) return;
    this.$emit('remove');
    if (this.$element.parentNode) {
      this.$element.parentNode.removeChild(this.$element);
    }
    this._removed_ = true;
    this._mounted_ = false;
    this.$emit('removed');
  };

  /**
   * 触发自身的一个事件并向上冒泡
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @returns {void} 无返回
   */


  Component.prototype.$dispatch = function $dispatch(name, data) {
    var stopPropagation = this.$emit(name, data);
    if (!stopPropagation && this.$parent) {
      this.$parent.$dispatch(name, data);
    }
  };

  /**
   * 触发自身的一个事件并向下广播
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @returns {void} 无返回
   */


  Component.prototype.$broadcast = function $broadcast(name, data) {
    var stopPropagation = this.$emit(name, data);
    if (!stopPropagation && this.$children && this.$children.length > 0) {
      this.$children.forEach(function (child) {
        child.$broadcast(name, data);
      }, this);
    }
  };

  /**
   * 释放组件
   * @returns {void} 无返回
   */


  Component.prototype.$dispose = function $dispose() {
    this.$remove();
    this._emitter_.off();
    this.$children.forEach(function (child) {
      child.$dispose();
    }, this);
    if (this.$parent) {
      var index = this.$parent.$children.indexOf(this);
      this.$parent.$children.splice(index, 1);
    }
    this.$emit('dispose');
    if (this._compiled_) {
      this.$template.unbind();
    }
    this.$emit('disposed');
    for (var key in this) {
      delete this[key];
    }
    ['_observer_', '$element', '$children', '$parent', '$template'].forEach(function (key) {
      delete this[key];
    }, this);
    setPrototypeOf(this, null);
  };

  _createClass(Component, [{
    key: '$root',
    get: function get() {
      if (this.$parent) {
        return this.$parent.$root;
      } else {
        return this;
      }
    }
  }]);

  return Component;
}(_common.Entity)) || _class);
exports.default = Component;
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _ntils = __webpack_require__(0);

var _expression = __webpack_require__(7);

var _expression2 = _interopRequireDefault(_expression);

var _directives = __webpack_require__(13);

var _directives2 = _interopRequireDefault(_directives);

var _common = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */

var Compiler = function () {

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Compiler(options) {
    _classCallCheck(this, Compiler);

    options = options || {};
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.elementDirectives = {};
    this.attributeDirectives = {};
    this.registerDirectives(_extends({}, _directives2.default, options.directives));
  }

  /**
  * 将字符串转成「驼峰」式
  * @param {string} str 原始字符串
  * @param {number} mode 1 大驼峰，0 小驼峰
  * @return {string} 转换后的字符串
  */


  Compiler.prototype.toCamelCase = function toCamelCase(str, mode) {
    if (str) {
      str = str.replace(/\-[a-z0-9]/g, function ($1) {
        return $1.slice(1).toUpperCase();
      });
      str = str.replace(/^[a-z]/i, function ($1) {
        return mode ? $1.toUpperCase() : $1.toLowerCase();
      });
    }
    return str;
  };

  /**
   * 将字符串转成分隔形式
   * @param {string} str 原始字符串
   * @return {string} 转换后的字符串
   */


  Compiler.prototype.toSplitCase = function toSplitCase(str) {
    if (str) {
      str = str.replace(/([A-Z])/g, '-$1');
      if (str[0] == '-') str = str.slice(1);
    }
    return str;
  };

  /**
   * 添加指令
   * @param {Object} directives 指令集 
   * @returns {void} 无返回
   */


  Compiler.prototype.registerDirectives = function registerDirectives(directives) {
    var _this = this;

    (0, _ntils.each)(directives, function (name, directive) {
      name = _this.toSplitCase(name);
      var fullName = directive.meta.prefix === false ? name : _this.prefix + ':' + name;
      if (directive.meta.type == _directive2.default.types.ELEMENT) {
        _this.elementDirectives[fullName.toUpperCase()] = directive;
      } else {
        _this.attributeDirectives[fullName.toLowerCase()] = directive;
      }
    });
  };

  /**
   * 解析要 attr 指令信息
   * @param {string} attrName 要解析的名称字符串
   * @returns {Object} 解析后的对象
   */


  Compiler.prototype._parseAttrInfo = function _parseAttrInfo(attrName) {
    var _this2 = this;

    var parts = attrName.toLowerCase().split(':');
    var info = {};
    if (parts.length > 1) {
      info.name = parts[0] + ':' + parts[1];
      info.decorates = parts.slice(2).map(function (item) {
        return _this2.toCamelCase(item);
      });
    } else {
      info.name = parts[0];
      info.decorates = [];
    }
    return info;
  };

  /**
   * 创建一个指令实例
   * @param {Directive} Directive 指令类
   * @param {Object} options 指令构建选项
   * @returns {Directive} 指令实例
   */


  Compiler.prototype._createDirectiveInstance = function _createDirectiveInstance(Directive, options) {
    options.compiler = this;
    options.prefix = this.prefix;
    return new Directive(options);
  };

  /**
   * 初始化一个编译完成的 handler
   * @param {function} handler 编译后的的模板函数
   * @returns {void} 无返回
   */


  Compiler.prototype._bindHandler = function _bindHandler(handler) {
    //排序 directives
    handler.directives = handler.directives.sort(function (a, b) {
      return b.meta.level - a.meta.level;
    });
    //初始化 directives
    var boundDirectives = [];
    (0, _ntils.each)(handler.directives, function (index, directive) {
      directive.index = index;
      directive.bind();
      boundDirectives.push(directive);
      //移除完成绑定的指令对应的 attribute
      if (directive.meta.remove !== false && directive.attribute) {
        directive.node.removeAttribute(directive.attribute.name);
      }
      //如果遇到一个「终态」指令，停止向下初始化
      if (directive.meta.final) {
        return handler.final = true;
      }
    });
    handler.directives = boundDirectives;
  };

  /**
   * 编译一个元素本身
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */


  Compiler.prototype._compileElement = function _compileElement(handler, node) {
    var ElementDirective = this.elementDirectives[node.nodeName.toUpperCase()];
    if (!ElementDirective) return;
    handler.directives.push(this._createDirectiveInstance(ElementDirective, {
      handler: handler,
      node: node
    }));
  };

  /**
   * 编译一个元素所有 attributes 
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */


  Compiler.prototype._compileAttributes = function _compileAttributes(handler, node) {
    (0, _ntils.toArray)(node.attributes).forEach(function (attribute) {
      var attrInfo = this._parseAttrInfo(attribute.name);
      var AttrDirective = this.attributeDirectives[attrInfo.name] || this.attributeDirectives['*'];
      if (!AttrDirective) return;
      var meta = AttrDirective.meta;
      handler.directives.push(this._createDirectiveInstance(AttrDirective, {
        handler: handler,
        node: node,
        attribute: attribute,
        expression: meta.literal ? attribute.value : new _expression2.default(attribute.value, meta.mixed),
        decorates: attrInfo.decorates
      }));
    }, this);
  };

  /**
   * 编译所有子结点
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */


  Compiler.prototype._compileChildren = function _compileChildren(handler, node) {
    if (handler.final) return;
    (0, _ntils.toArray)(node.childNodes).forEach(function (childNode) {
      if (childNode._compiled_) return;
      var childHandler = this.compile(childNode);
      childHandler.parent = this;
      handler.children.push(childHandler);
    }, this);
  };

  /**
   * 编译一个模板
   * @param {HTMLNode} node 模板根元素
   * @param {Object} options 选项
   * @returns {function} 模板函数
   */


  Compiler.prototype.compile = function compile(node, options) {
    if (!node) {
      throw new _common.Error('Invalid node for compile');
    }
    node._compiled_ = true;
    options = options || {};
    //定义编译结果函数
    var handler = function handler(scope) {
      if ((0, _ntils.isNull)(scope)) scope = {};
      handler.directives.forEach(function (directive) {
        directive.scope = scope;
        directive.execute(scope);
      }, this);
      handler.children.forEach(function (childHandler) {
        childHandler(scope);
      }, this);
    };
    //--
    handler.dispose = function () {
      handler.directives.forEach(function (directive) {
        directive.unbind();
      }, this);
      handler.children.forEach(function (childHandler) {
        childHandler.dispose();
      }, this);
    };
    handler.node = node;
    //定义 children & directives 
    handler.directives = [];
    handler.children = [];
    //编译相关指令
    if (options.element !== false) this._compileElement(handler, node);
    if (options.attribute !== false) this._compileAttributes(handler, node);
    this._bindHandler(handler);
    if (options.children !== false) this._compileChildren(handler, node);
    //返回编译后函数
    return handler;
  };

  return Compiler;
}();

exports.default = Compiler;
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _each = __webpack_require__(27);

var _each2 = _interopRequireDefault(_each);

var _if = __webpack_require__(28);

var _if2 = _interopRequireDefault(_if);

var _prop = __webpack_require__(29);

var _prop2 = _interopRequireDefault(_prop);

var _attr = __webpack_require__(30);

var _attr2 = _interopRequireDefault(_attr);

var _on = __webpack_require__(31);

var _on2 = _interopRequireDefault(_on);

var _innerHtml = __webpack_require__(32);

var _innerHtml2 = _interopRequireDefault(_innerHtml);

var _innerText = __webpack_require__(33);

var _innerText2 = _interopRequireDefault(_innerText);

var _prevent = __webpack_require__(34);

var _prevent2 = _interopRequireDefault(_prevent);

var _id = __webpack_require__(35);

var _id2 = _interopRequireDefault(_id);

var _show = __webpack_require__(36);

var _show2 = _interopRequireDefault(_show);

var _model = __webpack_require__(37);

var _model2 = _interopRequireDefault(_model);

var _focus = __webpack_require__(44);

var _focus2 = _interopRequireDefault(_focus);

var _attribute = __webpack_require__(45);

var _attribute2 = _interopRequireDefault(_attribute);

var _text = __webpack_require__(46);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  '#text': _text2.default,
  '*': _attribute2.default,
  'if': _if2.default,
  each: _each2.default, prop: _prop2.default, attr: _attr2.default, on: _on2.default, html: _innerHtml2.default, text: _innerText2.default,
  prevent: _prevent2.default, id: _id2.default, show: _show2.default, model: _model2.default, focus: _focus2.default
}; //处理所有未知 attr

module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _ntils = __webpack_require__(0);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _common = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OBSERVER_PROP_NAME = '_observer_';
var CHANGE_EVENT_NAME = 'change';
var EVENT_MAX_DISPATCH_LAYER = 10;
var IGNORE_REGEXPS = [/^\_(.*)\_$/i, /^\_\_/i];

/**
 * 对象观察类，可以监控对象变化
 * 目前方案问题:
 *   对于父子关系和事件冒泡，目前方案如果用 delete 删除一个属性，无关真实删除关系，
 *   即便调用 clearReference 也无法再清除关系，子对象的 parents 中会一直有一个引用，当前方案最高效
 * 其它方法一:
 *   将「关系」放入全局数组中，然后将 ob.parents 变成一个「属性」从全局数组件中 filter 出来，
 *   基本和目前方法类似，但是关系在外部存领教，所以 clearReference 可清除。
 * 其它方案二: 
 *   构造时添加到全局数组，每一个 observer change 时都让放到全局的 observer 遍历自身的，
 *   检果事件源是不是自已的子对象，如果是则触发自身 change 事件，这样 ob 对象本身没有相关引用
 *   clearReference 时只从全局清除掉就行了，并且 delete 操作也不会影响，但效率稍差。
 * 其它方案三: 
 *   给构造函数添加一个 deep 属性，只有 deep 的 ob 对象，才放入到全局数组中，检查时逻辑同方案二
 *   但是因为要检查的对象会少很多，效率会更高一点。
 */

var Observer = function (_EventEmitter) {
  _inherits(Observer, _EventEmitter);

  /**
   * 通过目标对象构造一个观察对象
   * @param {Object} target 目标对象
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Observer(target, options) {
    _classCallCheck(this, Observer);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    if ((0, _ntils.isNull)(target)) {
      throw new _common.Error('Invalid target');
    }
    options = options || {};
    var observer = target[OBSERVER_PROP_NAME];
    if (observer) {
      var _ret;

      (0, _ntils.copy)(options, observer.options);
      //当时一个组件 A 的为组件 B 的 prop 时，A 更新不会触发 B 更新
      //所在暂注释这里，另一种方法是更新 prop 指令，重写 excute 方法，而不是现在的 update 方法
      // if (observer.options.root) {
      //   observer.parents.length = 0;
      // }
      observer.apply();
      return _ret = observer, _possibleConstructorReturn(_this, _ret);
    }
    _events2.default.call(_this);
    (0, _ntils.defineFreezeProp)(_this, 'options', options);
    (0, _ntils.defineFreezeProp)(_this, 'shadow', {});
    (0, _ntils.defineFreezeProp)(_this, 'target', target);
    (0, _ntils.defineFreezeProp)(_this, 'parents', []);
    (0, _ntils.defineFreezeProp)(target, OBSERVER_PROP_NAME, _this);
    _this.apply();
    return _this;
  }

  /**
   * 添加一个属性，动态添中的属性，无法被观察，
   * 但是通过 set 方法添加的属性可能被观察。
   * @param {string} name 名称
   * @param {Object} value 值
   * @returns {void} 无返回
   */


  Observer.prototype.set = function set(name, value) {
    if ((0, _ntils.isFunction)(value) || Observer.isIgnore(name)) {
      return;
    }
    Object.defineProperty(this.target, name, {
      get: function get() {
        return this[OBSERVER_PROP_NAME].shadow[name];
      },
      set: function set(value) {
        var observer = this[OBSERVER_PROP_NAME];
        var oldValue = observer.shadow[name];
        if (oldValue === value) return;
        if ((0, _ntils.isObject)(value)) {
          var childObserver = new Observer(value);
          observer.addChild(childObserver, name);
        }
        //移除旧值的父引用
        //如果用 delete 删除属性将无法移除父子引用
        if (oldValue && oldValue[OBSERVER_PROP_NAME]) {
          observer.removeChild(oldValue[OBSERVER_PROP_NAME], name);
        }
        observer.shadow[name] = value;
        observer.emitChange({ path: name, value: value });
      },

      configurable: true,
      enumerable: true
    });
    this.target[name] = value;
  };

  /**
   * 自动应用所有动态添加的属性
   * @returns {void} 无返回
   */


  Observer.prototype.apply = function apply() {
    if ((0, _ntils.isArray)(this.target)) {
      this._wrapArray(this.target);
    }
    var names = this._getPropertyNames(this.target);
    names.forEach(function (name) {
      var desc = Object.getOwnPropertyDescriptor(this.target, name);
      if (!('value' in desc)) return;
      this.set(name, this.target[name]);
    }, this);
  };

  /**
   * 清除所有父子引用
   * @returns {void} 无返回
   */


  Observer.prototype.clearReference = function clearReference() {
    each(this.target, function (name, value) {
      if ((0, _ntils.isNull)(value)) return;
      var child = value[OBSERVER_PROP_NAME];
      if (child) this.removeChild(child);
    }, this);
  };

  /**
   * 派发一个事件，事件会向父级对象冒泡
   * @param {string} eventName 事件名称
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.dispatch = function dispatch(eventName, event) {
    if (event._src_ === this) return;
    event._src_ = event._src_ || this;
    event._layer_ = event._layer_ || 0;
    if (event._layer_++ >= EVENT_MAX_DISPATCH_LAYER) return;
    this.emit(eventName, event);
    if (!this.parents || this.parents.length < 1) return;
    this.parents.forEach(function (item) {
      if (!(item.name in item.parent.target)) {
        return item.parent.removeChild(this);
      }
      var parentEvent = (0, _ntils.copy)(event);
      parentEvent.path = item.name + '.' + event.path;
      item.parent.dispatch(eventName, parentEvent);
    }, this);
  };

  /**
   * 添子观察者对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */


  Observer.prototype.addChild = function addChild(child, name) {
    if ((0, _ntils.isNull)(child) || (0, _ntils.isNull)(name)) {
      throw new _common.Error('Invalid paramaters');
    }
    if (child.options.root) return;
    child.parents.push({ parent: this, name: name });
  };

  /**
   * 移除子对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */


  Observer.prototype.removeChild = function removeChild(child, name) {
    if ((0, _ntils.isNull)(child)) {
      throw new _common.Error('Invalid paramaters');
    }
    var foundIndex = -1;
    child.parents.forEach(function (item, index) {
      if (item.parent === this && item.name === name) {
        foundIndex = index;
      }
    }, this);
    if (foundIndex > -1) {
      child.parents.splice(foundIndex, 1);
    }
  };

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.emitChange = function emitChange(event) {
    this.dispatch(CHANGE_EVENT_NAME, event);
  };

  /**
   * 获取所有成员名称列表
   * @returns {Array} 所有成员名称列表
   */


  Observer.prototype._getPropertyNames = function _getPropertyNames() {
    var names = (0, _ntils.isArray)(this.target) ? this.target.map(function (item, index) {
      return index;
    }) : Object.keys(this.target);
    return names.filter(function (name) {
      return name !== OBSERVER_PROP_NAME;
    });
  };

  /**
   * 包裹数组
   * @param {array} array 源数组
   * @returns {array} 处理后的数组
   */


  Observer.prototype._wrapArray = function _wrapArray(array) {
    (0, _ntils.defineFreezeProp)(array, 'push', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        this[OBSERVER_PROP_NAME].set(array.length, item);
      }, this);
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
    });
    (0, _ntils.defineFreezeProp)(array, 'pop', function () {
      var item = [].pop.apply(this, arguments);
      this[OBSERVER_PROP_NAME].emitChange({ path: this.length, value: item });
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return item;
    });
    (0, _ntils.defineFreezeProp)(array, 'unshift', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        this[OBSERVER_PROP_NAME].set(0, item);
      }, this);
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
    });
    (0, _ntils.defineFreezeProp)(array, 'shift', function () {
      var item = [].shift.apply(this, arguments);
      this[OBSERVER_PROP_NAME].emitChange({ path: 0, value: item });
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return item;
    });
    (0, _ntils.defineFreezeProp)(array, 'splice', function () {
      var startIndex = arguments[0];
      var endIndex = (0, _ntils.isNull)(arguments[1]) ? startIndex + arguments[1] : this.length - 1;
      var items = [].splice.apply(this, arguments);
      for (var i = startIndex; i <= endIndex; i++) {
        this[OBSERVER_PROP_NAME].emitChange({ path: i, value: items[i - startIndex] });
      }
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return items;
    });
    (0, _ntils.defineFreezeProp)(array, 'set', function (index, value) {
      if (index >= this.length) {
        this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      }
      this[OBSERVER_PROP_NAME].set(index, value);
    });
  };

  return Observer;
}(_events2.default);

/**
 * 观察一个对象
 * @param {Object} target 目标对象
 * @return {Observer} 观察者对象
 */


Observer.observe = function (target) {
  return new Observer(target);
};

/**
 * 检查是不是忽略的属性名
 * @param {string} word 待检查的字符串
 * @returns {void} 无返回
 */
Observer.isIgnore = function (word) {
  return IGNORE_REGEXPS.some(function (re) {
    return re.test(word);
  });
};

exports.default = Observer;
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _ntils = __webpack_require__(0);

var _common = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Watcher 类
 * 通过「计算函数」、「执行函数」可以创建一个 Watcher 实例
 */
var Watcher = function () {

  /**
   * 通过「计算函数」、「执行函数」构建一个 Watcher 实例
   * @param {function} calcor 计算函数
   * @param {function} handler 处理函数
   * @param {boolean} first 是否自动执行第一次
   * @returns {void} 无返回
   */
  function Watcher(calcor, handler, first) {
    _classCallCheck(this, Watcher);

    if (!(0, _ntils.isFunction)(calcor) || !(0, _ntils.isFunction)(handler)) {
      throw new _common.Error('Invalid parameters');
    }
    this.calcor = calcor;
    this.handler = handler;
    if (first) this.calc(true);
  }

  /**
   * 执行计算
   * @param {boolean} force 是否强制触发「计算函数」
   * @returns {Object} 计算后的值
   */


  Watcher.prototype.calc = function calc(force) {
    var newValue = this.calcor();
    if (force || !(0, _ntils.deepEqual)(newValue, this.value)) {
      this.handler(newValue, this.value);
    }
    this.value = (0, _ntils.clone)(newValue);
  };

  return Watcher;
}();

exports.default = Watcher;
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _$info = __webpack_require__(9);

var _$info2 = _interopRequireDefault(_$info);

var _ntils = __webpack_require__(0);

var _bootstrap = __webpack_require__(18);

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _watcher = __webpack_require__(15);

var _watcher2 = _interopRequireDefault(_watcher);

var _observer = __webpack_require__(14);

var _observer2 = _interopRequireDefault(_observer);

var _template = __webpack_require__(8);

var _template2 = _interopRequireDefault(_template);

var _component = __webpack_require__(10);

var _component2 = _interopRequireDefault(_component);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _decorators = __webpack_require__(3);

var _decorators2 = _interopRequireDefault(_decorators);

var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//持载模板相关对象
(0, _ntils.copy)(_template2.default, _bootstrap2.default);
(0, _ntils.copy)(_component2.default, _bootstrap2.default);
(0, _ntils.copy)(_common2.default, _bootstrap2.default);
(0, _ntils.copy)(_decorators2.default, _bootstrap2.default);
(0, _ntils.copy)(_$info2.default, _bootstrap2.default);

_bootstrap2.default.Template = _template2.default;
_bootstrap2.default.Component = _component2.default;
_bootstrap2.default.Watcher = _watcher2.default;
_bootstrap2.default.Observer = _observer2.default;
_bootstrap2.default.EventEmitter = _events2.default;
_bootstrap2.default.decorators = _decorators2.default;
_bootstrap2.default.bootstrap = _bootstrap2.default;
_bootstrap2.default.common = _common2.default;

_bootstrap2.default.component = function (name, component) {
  if (!component) return _component2.default.components[name];
  _component2.default.components[name] = component;
};

_bootstrap2.default.directive = function (name, directive) {
  if (!directive) return _template2.default.directives[name];
  _template2.default.directives[name] = directive;
};

exports.default = _bootstrap2.default;
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = bootstrap;

var _component = __webpack_require__(10);

var _component2 = _interopRequireDefault(_component);

var _ntils = __webpack_require__(0);

var _common = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bootstrap(component, mountNode, options) {
  if (!component || !component.meta) {
    throw new _common.Error('Involid Component');
  }
  options = options || (0, _ntils.create)(null);
  if ((0, _ntils.isNull)(options.append)) options.append = true;
  if ((0, _ntils.isFunction)(component)) {
    component = new component();
  }
  component.$mount(mountNode, options.append);
  return component;
};
module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = (_temp = _class = function (_EventEmitter) {
  _inherits(Entity, _EventEmitter);

  function Entity() {
    _classCallCheck(this, Entity);

    return _possibleConstructorReturn(this, _EventEmitter.apply(this, arguments));
  }

  _createClass(Entity, [{
    key: 'meta',
    get: function get() {
      return this.constructor && this.constructor.meta;
    }
  }]);

  return Entity;
}(_events2.default), _class.setMeta = function (options) {
  if (Object.getOwnPropertyNames(this).indexOf('meta') < 0) {
    var meta = (0, _ntils.create)(this.meta || null);
    (0, _ntils.defineFreezeProp)(this, 'meta', meta);
  }
  if (options) (0, _ntils.copy)(options, this.meta);
}, _temp);
exports.default = Entity;
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _$info = __webpack_require__(9);

var _$info2 = _interopRequireDefault(_$info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LibError = function (_Error) {
  _inherits(LibError, _Error);

  function LibError(message) {
    _classCallCheck(this, LibError);

    for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      other[_key - 1] = arguments[_key];
    }

    return _possibleConstructorReturn(this, _Error.call.apply(_Error, [this, '[' + _$info2.default.name + ']: ' + message].concat(other)));
  }

  return LibError;
}(Error);

exports.default = LibError;
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

exports.default = function (components) {
  return (0, _meta2.default)({ components: components });
};

var _meta = __webpack_require__(6);

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

exports.default = function (directives) {
  return (0, _meta2.default)({ directives: directives });
};

var _meta = __webpack_require__(6);

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

exports.default = function (name) {
  return function (target, handler) {
    (0, _meta2.default)()(target.constructor);
    target.meta.events = target.meta.events || {};
    target.meta.events[name] = target.meta.events[name] || [];
    target.meta.events[name].push(handler);
  };
};

var _meta = __webpack_require__(6);

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

exports.default = function (target, prop) {
  if (!prop) {
    return (0, _meta2.default)({ model: target });
  } else {
    return (0, _meta2.default)({
      model: function model() {
        return this[prop]();
      }
    })(target.constructor);
  }
};

var _meta = __webpack_require__(6);

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

exports.default = function (template) {
  return (0, _meta2.default)({ template: template });
};

var _meta = __webpack_require__(6);

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

exports.default = function (calcer) {
  return function (target, handler) {
    (0, _meta2.default)()(target.constructor);
    target.meta.watches = target.meta.watches || [];
    target.meta.watches.push({ calcer: calcer, handler: handler });
  };
};

var _meta = __webpack_require__(6);

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _ntils = __webpack_require__(0);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _decorators = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EachDirective = (_dec = (0, _decorators.meta)({
  level: _directive2.default.levels.STATEMENT + 1, //比 if 要高一个权重
  final: true,
  literal: true
}), _dec(_class = function (_Directive) {
  _inherits(EachDirective, _Directive);

  function EachDirective() {
    _classCallCheck(this, EachDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  EachDirective.prototype.bind = function bind() {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 each 指令必须先移除，否再进行 item 编译时 each 还会生效
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
    this.parseExpr();
    this.eachItems = {};
  };

  EachDirective.prototype.parseExpr = function parseExpr() {
    this.eachType = this.attribute.value.indexOf(' in ') > -1 ? 'in' : 'of';
    var tokens = this.attribute.value.split(' ' + this.eachType + ' ');
    var fnText = 'with(scope){each(' + tokens[1] + ',fn.bind(this,' + tokens[1] + '))}';
    this.each = new Function('each', 'scope', 'fn', fnText).bind(null, _ntils.each);
    var names = tokens[0].split(',').map(function (name) {
      return name.trim();
    });
    if (this.eachType == 'in') {
      this.keyName = names[0];
      this.valueName = names[1];
    } else {
      this.keyName = names[1];
      this.valueName = names[0];
    }
  };

  EachDirective.prototype.execute = function execute(scope) {
    var _this2 = this;

    var currentEachKeys = [];
    var itemsFragment = document.createDocumentFragment();
    var self = this;
    this.each(scope, function (eachTarget, key) {
      //创建新 scope，必须选创建再设置 prototype 或采用定义「属性」的方式
      //因为指令参数指定的名称有可能和 scope 原有变量冲突
      //将导致针对 watch 变量的赋值，从引用发循环
      var newScope = new _scope2.default(this.scope);
      if (self.keyName) {
        Object.defineProperty(newScope, self.keyName, {
          get: function get() {
            return key;
          }
        });
      }
      //value 采用「属性」进行代理，否则将会使「双向」绑定无把回设值
      if (self.valueName) {
        Object.defineProperty(newScope, self.valueName, {
          get: function get() {
            return eachTarget[key];
          },
          set: function set(value) {
            eachTarget[key] = value;
          }
        });
      }
      var oldItem = this.eachItems[key];
      if (oldItem) {
        oldItem.handler(newScope);
      } else {
        var newItem = {};
        //创建新元素
        newItem.node = this.node.cloneNode(true);
        itemsFragment.appendChild(newItem.node);
        newItem.handler = this.compiler.compile(newItem.node);
        newItem.handler(newScope);
        this.eachItems[key] = newItem;
      }
      currentEachKeys.push(key);
    }.bind(this));
    (0, _ntils.each)(this.eachItems, function (key, item) {
      if (currentEachKeys.some(function (k) {
        return k == key;
      })) return;
      if (item.node.parentNode) {
        item.node.parentNode.removeChild(item.node);
      }
      delete _this2.eachItems[key];
    }, this);
    if (itemsFragment.childNodes.length > 0) {
      this.mountNode.parentNode.insertBefore(itemsFragment, this.mountNode);
    }
  };

  return EachDirective;
}(_directive2.default)) || _class);
exports.default = EachDirective;
module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _decorators = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IfDirective = (_dec = (0, _decorators.meta)({
  level: _directive2.default.levels.STATEMENT,
  final: true
}), _dec(_class = function (_Directive) {
  _inherits(IfDirective, _Directive);

  function IfDirective() {
    _classCallCheck(this, IfDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  IfDirective.prototype.bind = function bind() {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 if 指令必须先移除，否再进行 item 编译时 if 还会生效
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
  };

  IfDirective.prototype.execute = function execute(scope) {
    var newValue = this.expression.execute(scope);
    if (newValue) {
      //如果新计算的结果为 true 才执行 
      this._handler = this._handler || this.compiler.compile(this.node);
      this._handler(scope);
      var node = this.node.$substitute || this.node;
      if (!node.parentNode) {
        this.mountNode.parentNode.insertBefore(node, this.mountNode);
      }
    } else {
      var _node = this.node.$substitute || this.node;
      if (_node.parentNode) _node.parentNode.removeChild(_node);
    }
  };

  return IfDirective;
}(_directive2.default)) || _class);
exports.default = IfDirective;
module.exports = exports['default'];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropDirective = function (_Directive) {
  _inherits(PropDirective, _Directive);

  function PropDirective() {
    _classCallCheck(this, PropDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  PropDirective.prototype.update = function update(value) {
    var target = this.node.$target || this.node;
    target[this.decorates[0]] = value;
  };
  // execute (scope) {
  //   this.scope = scope;
  //   let newValue = this.expression.execute(scope);
  //   let target = this.node.$target || this.node;
  //   target[this.decorates[0]] = newValue;
  // }


  return PropDirective;
}(_directive2.default);

exports.default = PropDirective;
module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttrDirective = function (_Directive) {
  _inherits(AttrDirective, _Directive);

  function AttrDirective() {
    _classCallCheck(this, AttrDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  AttrDirective.prototype.update = function update(value) {
    var target = this.node.$target || this.node;
    if (target.setAttribute) {
      target.setAttribute(this.decorates[0], value);
    } else {
      target[this.decorates[0]] = value;
    }
  };

  return AttrDirective;
}(_directive2.default);

exports.default = AttrDirective;
module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _decorators = __webpack_require__(3);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OnDirective = (_dec = (0, _decorators.meta)({
  literal: true
}), _dec(_class = function (_Directive) {
  _inherits(OnDirective, _Directive);

  function OnDirective() {
    _classCallCheck(this, OnDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  OnDirective.prototype.bind = function bind() {
    var attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    this.expr = new this.Expression(attrValue);
    var eventTarget = this.node.$target || this.node;
    this.emiter = new _events2.default(eventTarget);
    this.emiter.addListener(this.decorates[0], function (event) {
      if ((0, _ntils.isNull)(this.scope)) return;
      this.expr.execute(new _scope2.default(this.scope, {
        $event: event
      }));
    }.bind(this), false);
  };

  OnDirective.prototype.unbind = function unbind() {
    this.emiter.removeListener();
  };

  OnDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
  };

  return OnDirective;
}(_directive2.default)) || _class);
exports.default = OnDirective;
module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InnerHtmlDirective = function (_Directive) {
  _inherits(InnerHtmlDirective, _Directive);

  function InnerHtmlDirective() {
    _classCallCheck(this, InnerHtmlDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  InnerHtmlDirective.prototype.update = function update(newValue) {
    this.node.innerHTML = newValue;
  };

  return InnerHtmlDirective;
}(_directive2.default);

exports.default = InnerHtmlDirective;
module.exports = exports['default'];

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InnerTextDirective = function (_Directive) {
  _inherits(InnerTextDirective, _Directive);

  function InnerTextDirective() {
    _classCallCheck(this, InnerTextDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  InnerTextDirective.prototype.update = function update(newValue) {
    this.node.innerText = newValue;
  };

  return InnerTextDirective;
}(_directive2.default);

exports.default = InnerTextDirective;
module.exports = exports['default'];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _decorators = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreventDirective = (_dec = (0, _decorators.meta)({
  level: _directive2.default.levels.PREVENT,
  final: true
}), _dec(_class = function (_Directive) {
  _inherits(PreventDirective, _Directive);

  function PreventDirective() {
    _classCallCheck(this, PreventDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  return PreventDirective;
}(_directive2.default)) || _class);
exports.default = PreventDirective;
module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _decorators = __webpack_require__(3);

var _common = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdDirective = (_dec = (0, _decorators.meta)({
  literal: true
}), _dec(_class = function (_Directive) {
  _inherits(IdDirective, _Directive);

  function IdDirective() {
    _classCallCheck(this, IdDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  IdDirective.prototype.update = function update(id) {
    if (id in this.scope) {
      throw new _common.Error('Conflicting component id `' + id + '`');
    }
    this.scope[id] = this.node.$target || this.node;
  };

  return IdDirective;
}(_directive2.default)) || _class);
exports.default = IdDirective;
module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowDirective = function (_Directive) {
  _inherits(ShowDirective, _Directive);

  function ShowDirective() {
    _classCallCheck(this, ShowDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  ShowDirective.prototype.update = function update(value) {
    this.node.style.display = value ? '' : 'none';
  };

  return ShowDirective;
}(_directive2.default);

exports.default = ShowDirective;
module.exports = exports['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _select = __webpack_require__(38);

var _select2 = _interopRequireDefault(_select);

var _editable = __webpack_require__(39);

var _editable2 = _interopRequireDefault(_editable);

var _input = __webpack_require__(40);

var _input2 = _interopRequireDefault(_input);

var _radio = __webpack_require__(41);

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = __webpack_require__(42);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _prop = __webpack_require__(43);

var _prop2 = _interopRequireDefault(_prop);

var _common = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DirectiveFactary(options) {
  var node = options.node;
  var tagName = node.tagName;
  if (options.decorates[0]) {
    return new _prop2.default(options);
  } else if (tagName == 'INPUT') {
    var type = node.getAttribute('type');
    if (type == 'radio') {
      return new _radio2.default(options);
    } else if (type == 'checkbox') {
      return new _checkbox2.default(options);
    } else {
      return new _input2.default(options);
    }
  } else if (tagName == 'TEXTAREA') {
    return new _input2.default(options);
  } else if (tagName == 'SELECT') {
    return new _select2.default(options);
  } else if (node.isContentEditable) {
    return new _editable2.default(options);
  } else {
    throw new _common.Error('Directive `model` cannot be used on `' + tagName + '`');
  }
};

//手动添加 meta 信息
DirectiveFactary.meta = {
  level: _directive2.default.levels.ATTRIBUTE
};

exports.default = DirectiveFactary;
module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _decorators = __webpack_require__(3);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectModelDirective = (_dec = (0, _decorators.meta)({
  final: true
}), _dec(_class = function (_Directive) {
  _inherits(SelectModelDirective, _Directive);

  function SelectModelDirective() {
    _classCallCheck(this, SelectModelDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  SelectModelDirective.prototype.bind = function bind() {
    this.backExpr = new this.Expression(this.attribute.value + '=_value_');
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.emiter = new _events2.default(this.node);
    this.emiter.addListener('change', function () {
      if ((0, _ntils.isNull)(this.scope)) return;
      var selectedOptions = this.node.selectedOptions;
      var value = this.node.multiple ? [].slice.call(selectedOptions).map(function (option) {
        return option.value;
      }, this) : selectedOptions[0].value;
      this.backExpr.execute(new _scope2.default(this.scope, {
        _value_: value
      }));
    }.bind(this), false);
  };

  SelectModelDirective.prototype.unbind = function unbind() {
    this.emiter.removeListener();
  };

  SelectModelDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
    this._handler(scope);
    var value = this.expression.execute(scope);
    if (!(0, _ntils.isArray)(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  };

  return SelectModelDirective;
}(_directive2.default)) || _class);
exports.default = SelectModelDirective;
module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableModelDirective = function (_Directive) {
  _inherits(EditableModelDirective, _Directive);

  function EditableModelDirective() {
    _classCallCheck(this, EditableModelDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  EditableModelDirective.prototype.bind = function bind() {
    this.backExpr = new this.Expression(this.attribute.value + '=_value_');
    this.emiter = new _events2.default(this.node);
    this.emiter.addListener('input', function () {
      if ((0, _ntils.isNull)(this.scope)) return;
      this.backExpr.execute(new _scope2.default(this.scope, {
        _value_: this.node.innerHTML
      }));
    }.bind(this), false);
  };

  EditableModelDirective.prototype.unbind = function unbind() {
    this.emiter.removeListener();
  };

  EditableModelDirective.prototype.execute = function execute(scope) {
    var value = this.expression.execute(scope);
    if (this.node.innerHTML !== value) {
      this.node.innerHTML = value;
    }
  };

  return EditableModelDirective;
}(_directive2.default);

exports.default = EditableModelDirective;
module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputModelDirective = function (_Directive) {
  _inherits(InputModelDirective, _Directive);

  function InputModelDirective() {
    _classCallCheck(this, InputModelDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  InputModelDirective.prototype.bind = function bind() {
    this.backExpr = new this.Expression(this.attribute.value + '=_value_');
    this.emiter = new _events2.default(this.node);
    this.emiter.addListener('input', function () {
      if ((0, _ntils.isNull)(this.scope)) return;
      this.backExpr.execute(new _scope2.default(this.scope, {
        _value_: this.node.value
      }));
    }.bind(this), false);
  };

  InputModelDirective.prototype.unbind = function unbind() {
    this.emiter.removeListener();
  };

  InputModelDirective.prototype.execute = function execute(scope) {
    var value = this.expression.execute(scope);
    if (this.node.value !== value) {
      this.node.value = value;
    }
  };

  return InputModelDirective;
}(_directive2.default);

exports.default = InputModelDirective;
module.exports = exports['default'];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioModelDirective = function (_Directive) {
  _inherits(RadioModelDirective, _Directive);

  function RadioModelDirective() {
    _classCallCheck(this, RadioModelDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  RadioModelDirective.prototype.bind = function bind() {
    this.backExpr = new this.Expression(this.attribute.value + '=_value_');
    this.emiter = new _events2.default(this.node);
    this.emiter.addListener('change', function () {
      if ((0, _ntils.isNull)(this.scope)) return;
      this.backExpr.execute(new _scope2.default(this.scope, {
        _value_: this.node.value
      }));
    }.bind(this), false);
  };

  RadioModelDirective.prototype.unbind = function unbind() {
    this.emiter.removeListener();
  };

  RadioModelDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
    var value = this.expression.execute(scope);
    this.node.checked = value == this.node.value;
  };

  return RadioModelDirective;
}(_directive2.default);

exports.default = RadioModelDirective;
module.exports = exports['default'];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBoxModelDirective = function (_Directive) {
  _inherits(CheckBoxModelDirective, _Directive);

  function CheckBoxModelDirective() {
    _classCallCheck(this, CheckBoxModelDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  CheckBoxModelDirective.prototype.bind = function bind() {
    this.backExpr = new this.Expression(this.attribute.value + '=_value_');
    this.emiter = new _events2.default(this.node);
    this.emiter.addListener('change', function () {
      if ((0, _ntils.isNull)(this.scope)) return;
      var value = this.expression.execute(this.scope);
      if ((0, _ntils.isArray)(value) && this.node.checked) {
        value.push(this.node.value);
      } else if ((0, _ntils.isArray)(value) && !this.node.checked) {
        var index = value.indexOf(this.node.value);
        value.splice(index, 1);
      } else {
        this.backExpr.execute(new _scope2.default(this.scope, {
          _value_: this.node.checked
        }));
      }
    }.bind(this), false);
  };

  CheckBoxModelDirective.prototype.unbind = function unbind() {
    this.emiter.removeListener();
  };

  CheckBoxModelDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
    var value = this.expression.execute(scope);
    if ((0, _ntils.isArray)(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  };

  return CheckBoxModelDirective;
}(_directive2.default);

exports.default = CheckBoxModelDirective;
module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _scope = __webpack_require__(5);

var _scope2 = _interopRequireDefault(_scope);

var _common = __webpack_require__(2);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropModelDirective = function (_Directive) {
  _inherits(PropModelDirective, _Directive);

  function PropModelDirective() {
    _classCallCheck(this, PropModelDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  PropModelDirective.prototype.bind = function bind() {
    var _this2 = this;

    this.target = this.node.$target;
    this.backExpr = new this.Expression(this.attribute.value + '=_value_');
    this.bindProp = this.decorates[0];
    if (!this.target) {
      throw new _common.Error('Directive `model:' + this.bindProp + '` cannot be used on `' + this.node.tagName + '`');
    }
    this.watcher = this.target.$watch(this.bindProp, function (value) {
      if ((0, _ntils.isNull)(_this2.scope)) return;
      _this2.backExpr.execute(new _scope2.default(_this2.scope, {
        _value_: value
      }));
    });
  };

  PropModelDirective.prototype.unbind = function unbind() {
    this.target.$unWatch(this.watcher);
  };

  PropModelDirective.prototype.update = function update(value) {
    this.target[this.bindProp] = value;
  };

  return PropModelDirective;
}(_directive2.default);

exports.default = PropModelDirective;
module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FocusDirective = function (_Directive) {
  _inherits(FocusDirective, _Directive);

  function FocusDirective() {
    _classCallCheck(this, FocusDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  FocusDirective.prototype.execute = function execute(scope) {
    var _this2 = this;

    var state = this.expression.execute(scope);
    setTimeout(function () {
      if (state) _this2.node.focus();else _this2.node.blur();
    }, 0);
  };

  return FocusDirective;
}(_directive2.default);

exports.default = FocusDirective;
module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _decorators = __webpack_require__(3);

var _ntils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */
var AttributeDirective = (_dec = (0, _decorators.meta)({
  level: _directive2.default.levels.ATTRIBUTE,
  prefix: false,
  literal: true,
  remove: false
}), _dec(_class = function (_Directive) {
  _inherits(AttributeDirective, _Directive);

  function AttributeDirective() {
    _classCallCheck(this, AttributeDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  AttributeDirective.prototype.bind = function bind() {
    this.computedName = this.attribute.name;
    this.computedValue = this.attribute.value;
    this.nameExpr = new this.Expression(this.attribute.name, true);
    this.valueExpr = new this.Expression(this.attribute.value, true);
  };

  AttributeDirective.prototype.execute = function execute(scope) {
    var target = this.node.$target || this.node;
    var newComputedName = this.nameExpr.execute(scope);
    if (this.computedName !== newComputedName) {
      //移除旧名称
      if (target.removeAttribute) {
        target.removeAttribute(this.computedName);
      }
      //设置新名称
      this.computedName = newComputedName;
      if (!(0, _ntils.isNull)(this.computedName) && this.computedName.length > 0) {
        if (target.setAttribute) {
          target.setAttribute(this.computedName, this.computedValue || '');
        }
      }
    }
    var newComputeValue = this.valueExpr.execute(scope);
    if (this.computedValue !== newComputeValue) {
      this.computedValue = newComputeValue;
      if (target.setAttribute) {
        target.setAttribute(this.computedName, this.computedValue || '');
      } else {
        target[this.computedName] = this.computedValue;
      }
    }
  };

  return AttributeDirective;
}(_directive2.default)) || _class);
exports.default = AttributeDirective;
module.exports = exports['default'];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _expression = __webpack_require__(7);

var _expression2 = _interopRequireDefault(_expression);

var _ntils = __webpack_require__(0);

var _decorators = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextDirective = (_dec = (0, _decorators.meta)({
  type: _directive2.default.types.ELEMENT,
  prefix: false
}), _dec(_class = function (_Directive) {
  _inherits(TextDirective, _Directive);

  function TextDirective() {
    _classCallCheck(this, TextDirective);

    return _possibleConstructorReturn(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  TextDirective.prototype.bind = function bind() {
    var nodeValue = (0, _ntils.trim)(this.node.nodeValue);
    if (!nodeValue) return;
    this.node.nodeValue = '';
    this.expr = new _expression2.default(nodeValue, true);
  };

  TextDirective.prototype.execute = function execute(scope) {
    if (!this.expr) return;
    this.scope = scope;
    var newValue = this.expr.execute(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  };

  return TextDirective;
}(_directive2.default)) || _class);
exports.default = TextDirective;
module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _observer = __webpack_require__(14);

var _observer2 = _interopRequireDefault(_observer);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _compiler = __webpack_require__(12);

var _compiler2 = _interopRequireDefault(_compiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 模板类
 * 可能通过 element 作为参数，创建一个模板实例
 */
var Template = function (_EventEmitter) {
  _inherits(Template, _EventEmitter);

  /**
   * 构建一个模板板实例
   * @param {HTMLNode} element HTML 元素
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Template(element, options) {
    _classCallCheck(this, Template);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    options = options || {};
    _this.options = options;
    _this.element = element;
    _this.compiler = options.compiler || new _compiler2.default(options);
    _this.render = _this.compiler.compile(_this.element);
    _this.update = _this.update.bind(_this);

    if (!(typeof _this.update === 'function')) {
      throw new TypeError('Value of "this.update" violates contract.\n\nExpected:\n() => any\n\nGot:\n' + _inspect(_this.update));
    }

    _this._update = _this._update.bind(_this);

    if (!(typeof _this._update === 'function')) {
      throw new TypeError('Value of "this._update" violates contract.\n\nExpected:\n() => any\n\nGot:\n' + _inspect(_this._update));
    }

    _this._updateTimer = 0;
    return _this;
  }

  /**
   * 更新当前模板 (会过滤不必要的更新)
   * @returns {void} 无返回
   */


  Template.prototype.update = function update() {
    if (this._updateTimer) {
      clearTimeout(this._updateTimer);
      this._updateTimer = null;
    }
    this._updateTimer = setTimeout(this._update, 0);
  };

  /**
   * 更新当前模板内部方法 
   * @returns {void} 无返回
   */


  Template.prototype._update = function _update() {
    if (!this._updateTimer || !this.observer) return;
    this.emit('update', this);
    this.render(this.observer.target);
    this._onBind();
  };

  /**
   * 在绑定成功时
   * @returns {void} 无返回
   */


  Template.prototype._onBind = function _onBind() {
    if (this._bound) return;
    this._bound = true;
    this.emit('bind', this);
  };

  /**
   * 将模板绑定到一个 scope
   * @param {Object} scope 绑定的上下文对象
   * @param {boolean} disableFirst 是否禁用第一次的自动渲染
   * @returns {void} 无返回
   */


  Template.prototype.bind = function bind(scope, disableFirst) {
    if (!scope) return;
    this.unbind();
    this.observer = new _observer2.default(scope, {
      root: this.options.root
    });
    scope.$self = scope;
    this.observer.on('change', this.update);
    if (disableFirst) {
      this._onBind();
    } else {
      this.update();
    }
  };

  /**
   * 解绑定
   * @returns {void} 无返回
   */


  Template.prototype.unbind = function unbind() {
    if (!this.observer) return;
    this.observer.removeListener('change', this.update);
    this.observer.clearReference();
    this.observer = null;
  };

  /**
   * 释放
   * @returns {void} 无返回
   */


  Template.prototype.dispose = function dispose() {
    this.unbind();
    this.render.dispose();
  };

  return Template;
}(_events2.default);

exports.default = Template;

function _inspect(input, depth) {
  var maxDepth = 4;
  var maxKeys = 15;

  if (depth === undefined) {
    depth = 0;
  }

  depth += 1;

  if (input === null) {
    return 'null';
  } else if (input === undefined) {
    return 'void';
  } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return typeof input === 'undefined' ? 'undefined' : _typeof(input);
  } else if (Array.isArray(input)) {
    if (input.length > 0) {
      if (depth > maxDepth) return '[...]';

      var first = _inspect(input[0], depth);

      if (input.every(function (item) {
        return _inspect(item, depth) === first;
      })) {
        return first.trim() + '[]';
      } else {
        return '[' + input.slice(0, maxKeys).map(function (item) {
          return _inspect(item, depth);
        }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
      }
    } else {
      return 'Array';
    }
  } else {
    var keys = Object.keys(input);

    if (!keys.length) {
      if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
        return input.constructor.name;
      } else {
        return 'Object';
      }
    }

    if (depth > maxDepth) return '{...}';
    var indent = '  '.repeat(depth - 1);
    var entries = keys.slice(0, maxKeys).map(function (key) {
      return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
    }).join('\n  ' + indent);

    if (keys.length >= maxKeys) {
      entries += '\n  ' + indent + '...';
    }

    if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
      return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
    } else {
      return '{\n  ' + indent + entries + '\n' + indent + '}';
    }
  }
}

module.exports = exports['default'];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (options) {
  var _dec, _class;

  var ComponentDirective = (_dec = (0, _decorators.meta)(_extends({}, options, {
    type: Directive.types.ELEMENT,
    literal: true,
    final: true,
    level: Directive.levels.ELEMENT
  })), _dec(_class = function (_Directive) {
    _inherits(ComponentDirective, _Directive);

    function ComponentDirective(options) {
      _classCallCheck(this, ComponentDirective);

      var _this = _possibleConstructorReturn(this, _Directive.call(this, options));

      var meta = _this.meta;
      _this.component = new meta.component({
        deferReady: true,
        parent: meta.parent || meta.scope
      });
      return _this;
    }

    ComponentDirective.prototype.bind = function bind() {
      this.handleAttrs();
      this.node.$target = this.component;
      this.handler = this.compiler.compile(this.node, {
        element: false,
        children: false
      });
      this.component.$mount(this.node);
      this.handleContents();
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
    };

    ComponentDirective.prototype.handleAttrs = function handleAttrs() {
      this.attrs = [].slice.call(this.node.attributes);
      var directiveRegexp = new RegExp('^' + this.prefix + ':', 'i');
      this.attrs.forEach(function (attr) {
        if (directiveRegexp.test(attr.name)) return;
        if (attr.name in this.component) return;
        this.component.$element.setAttribute(attr.name, attr.value);
        this.node.removeAttribute(attr.name);
      }, this);
    };

    ComponentDirective.prototype.handleContents = function handleContents() {
      this.placeHandlers = [];
      var places = [].slice.call(this.component.$element.querySelectorAll('[' + this.prefix + '\\:content]'));
      places.forEach(function (place) {
        //将内容插入到指定的「位置」
        var contents = null;
        var selector = place.getAttribute(this.prefix + ':content');
        if (!selector) {
          contents = [].slice.call(this.node.childNodes);
        } else {
          contents = [].slice.call(this.node.querySelectorAll(selector));
        }
        if (!contents || contents.length < 1) return;
        place.innerHTML = '';
        contents.forEach(function (content) {
          place.appendChild(content.cloneNode(true));
        }, this);
        //编译插入后的子「内容模板」
        var handler = this.compiler.compile(place);
        this.placeHandlers.push(handler);
      }, this);
    };

    ComponentDirective.prototype.execute = function execute(scope) {
      this.handler(scope);
      if (!this._ready_) {
        this._ready_ = true;
        this.component.$emit('ready');
      }
      this.placeHandlers.forEach(function (handler) {
        handler(scope);
      }, this);
    };

    return ComponentDirective;
  }(Directive)) || _class);

  return ComponentDirective;
};

var _template = __webpack_require__(8);

var _template2 = _interopRequireDefault(_template);

var _decorators = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Directive = _template2.default.Directive;

module.exports = exports['default'];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _view = __webpack_require__(50);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { View: _view2.default };
module.exports = exports['default'];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _component = __webpack_require__(11);

var _component2 = _interopRequireDefault(_component);

var _ntils = __webpack_require__(0);

var _decorators = __webpack_require__(3);

var _common = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 内置视图组件
 * 可以加载并显示其它组件，并可以指定「转场效果」
 */
var View = (_dec = (0, _decorators.template)('<div></div>'), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(View, _Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  /**
   * 切换到指定的组件
   * @param {Component} component 组件
   * @param {transition} transition 转场控制组件
   * @returns {void} 无返回
   */
  View.prototype.switchTo = function switchTo(component, transition) {
    if (transition) {
      this.transition = transition;
    }
    this.component = component;
  };

  _createClass(View, [{
    key: 'component',
    set: function set(component) {
      if (this._transitioning) return;
      this._transitioning = true;
      //如果 value 是字符串则尝试从 $parent.components 中获取组件类 
      if ((0, _ntils.isString)(component)) {
        if (this.$parent && this.$parent.$components) {
          this.component = this.$parent.$components[component];
        } else {
          this.component = null;
        }
        return;
      }
      //声明新旧组件变量
      var newComponentInstance = null;
      var oldComponentInstance = this.componentInstance;
      //创建新组件实例
      if ((0, _ntils.isFunction)(component)) {
        newComponentInstance = new component({
          parent: this
        });
      } else {
        component.$setParent(this);
        newComponentInstance = component;
      }
      //通过转场控制器进行转场准备
      this.transition.prep(newComponentInstance, oldComponentInstance);
      //挂载新组件实例
      newComponentInstance.$appendTo(this.$element);
      //通过转场控制器进行转场
      this.transition.go(newComponentInstance, oldComponentInstance, function () {
        //触发相关事件
        this.$emit('enter', newComponentInstance);
        this.$emit('leave', oldComponentInstance);
        //销毁旧组件实例
        if (oldComponentInstance) {
          oldComponentInstance.$dispose();
        }
        this._transitioning = false;
      }.bind(this));
      //暂存当前组件实例
      this.componentInstance = newComponentInstance;
    },
    get: function get() {
      return this._Component;
    }
  }, {
    key: 'transition',
    get: function get() {
      return this._transition || View.transition;
    },
    set: function set(transition) {
      if (this._transitioning) return;
      if (!transition || (0, _ntils.isFunction)(transition.prep) && (0, _ntils.isFunction)(transition.go)) {
        if (this._transition && (0, _ntils.isFunction)(this._transition.clean)) {
          this._transition.clean(this);
        }
        if (transition && (0, _ntils.isFunction)(transition.init)) {
          transition.init(this);
        }
        this._transition = transition;
      } else {
        throw new _common.Error('Invalid transition');
      }
    }
  }]);

  return View;
}(_component2.default), _class2.transition = {
  //init: function () { },
  //clean: function () { },
  /**
   * 转场开始前的准备
   * @param {Component} newComponent 新组件
   * @param {Component} oldComponent 旧组件
   * @returns {void} 无返回
   */
  prep: function prep(newComponent, oldComponent) {
    if (oldComponent) oldComponent.$element.style.display = 'none';
  },

  /**
   * 执行转场动画
   * @param {Component} newComponent 新组件
   * @param {Component} oldComponent 旧组件
   * @param {Function} done 完成后的回调
   * @returns {void} 无返回
   */
  go: function go(newComponent, oldComponent, done) {
    done();
  }
}, _temp)) || _class);
exports.default = View;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=mokit.js.map