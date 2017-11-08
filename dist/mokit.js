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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(28);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(90);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(94);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(28);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 空函数
 */
function noop() { }

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
}

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
}

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
}

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
}

/**
 * 是否包含
 * @method contains
 * @param {String} str1 源字符串
 * @param {String} str2 检查包括字符串
 * @return {Boolean} 结果
 * @static
 */
function contains(str1, str2) {
  if (isNull(str1) || isNull(str2)) return false;
  return str1.indexOf(str2) > -1;
}

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
}

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
}
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
}

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
}

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
}

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
}

/**
 * 验证一个对象是否为HTML Element
 * @method isElement
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isElement(obj) {
  if (isNull(obj)) return false;
  if (win.Element) {
    return obj instanceof Element;
  } else {
    return (obj.tagName && obj.nodeType &&
      obj.nodeName && obj.attributes &&
      obj.ownerDocument);
  }
}

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
}

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
}

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
}

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
}

/**
 * 验证是不是一个正则对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
function isRegexp(val) {
  return val instanceof RegExp;
}

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
}

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
}

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
}

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
  };
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
}

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
  });
  return dst;
}

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
    final(objClone, key, src[key]);
  }, this);
  return objClone;
}

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
}

/**
 * 定义不可遍历的属性
 **/
function final(obj, name, value) {
  if (arguments.length < 1) throw new Error('Parameter missing');
  if (arguments.length < 2) {
    return each(obj, function (name, value) {
      final(obj, name, value);
    });
  }
  if (arguments.length < 3) return final(obj, name, obj[name]);
  try {
    Object.defineProperty(obj, name, {
      get: function () {
        return value;
      },
      set: function () {
        throw new Error('Cannot assign to final property:' + name);
      },
      enumerable: false, //不能枚举
      configurable: false, //不能重写定义
    });
  } catch (err) {
    obj[name] = value;
  }
}

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
}

/**
 * 创建一个对象
 */
function create(proto, props) {
  if (Object.create) return Object.create(proto, props);
  function Cotr() { }
  Cotr.prototype = proto;
  var obj = new Cotr();
  if (props) copy(props, obj);
  return obj;
}

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
}

/**
 * 获取 proto
 */
function getPrototypeOf(obj) {
  if (obj.__proto__) return obj.__proto__;
  if (Object.getPrototypeOf) return Object.getPrototypeOf(obj);
  if (obj.constructor) return obj.constructor.prototype;
}

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
}

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
}

/**
 * 生成一个Guid
 * @method newGuid
 * @return {String} GUID字符串
 * @static
 */
function newGuid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (s4() + s4() + "-" + s4() + "-" + s4() + "-" +
    s4() + "-" + s4() + s4() + s4());
}

/**
 * 对象变换
 **/
function map(list, fn) {
  var buffer = isArray(list) ? [] : {};
  each(list, function (name, value) {
    buffer[name] = fn(name, value);
  });
  return buffer;
}

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
}

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
}

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
}

/**
 * 解析 function 的参数列表
 **/
function getFunctionArgumentNames(fn) {
  if (!fn) return [];
  var src = fn.toString();
  var parts = src.split(')')[0].split('=>')[0].split('(');
  return (parts[1] || parts[0]).split(',').map(function (name) {
    return trim(name);
  }).filter(function (name) {
    return name != 'function';
  });
}

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
}

/**
 * 首字母大写
 */
function firstUpper(str) {
  if (isNull(str)) return;
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/**
 * 编码正则字符串
 */
function escapeRegExp(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
  * 将字符串转成「驼峰」式
  * @param {string} str 原始字符串
  * @param {number} mode 1 大驼峰，0 小驼峰
  * @return {string} 转换后的字符串
  */
function toCamelCase(str, mode) {
  if (str) {
    str = str.replace(/\-[a-z0-9]/g, function ($1) {
      return $1.slice(1).toUpperCase()
    });
    str = str.replace(/^[a-z]/i, function ($1) {
      return mode ? $1.toUpperCase() : $1.toLowerCase();
    });
  }
  return str;
}

/**
 * 将字符串转成分隔形式
 * @param {string} str 原始字符串
 * @return {string} 转换后的字符串
 */
function toSplitCase(str) {
  if (str) {
    str = str.replace(/([A-Z])/g, '-$1');
    if (str[0] == '-') str = str.slice(1);
  }
  return str;
}

function htmlPrefilter(html) {
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
  return html.replace(rxhtmlTag, "<$1></$2>");
}

/**
 * 解析字符串为 dom 
 * @param {string} str 字符串
 * @returns {HTMLNode} 解析后的 DOM 
 */
function parseHTML(str) {
  str = str || ' ';
  var parent = document.createElement('div');
  parent.innerHTML = htmlPrefilter(trim(str));
  var childNodes = toArray(parent.childNodes);
  //先 clone 一份再通过 innerHTML 清空
  //否则 IE9 下，清空时会导不通过返回的 DOM 没有子结点
  // if (firstNode) firstNode = firstNode.cloneNode(true);
  // win._NPH_.innerHTML = '';
  each(childNodes, function (index, childNode) {
    parent.removeChild(childNode);
  });
  return childNodes;
}

exports.noop = noop;
exports.toString = toString;
exports.getType = getType;
exports.isNull = isNull;
exports.trim = trim;
exports.replace = replace;
exports.startWith = startWith;
exports.contains = contains;
exports.endWith = endWith;
exports.has = has;
exports.hasProperty = hasProperty;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isElement = isElement;
exports.isText = isText;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isRegexp = isRegexp;
exports.toArray = toArray;
exports.toDate = toDate;
exports.each = each;
exports.formatDate = formatDate;
exports.copy = copy;
exports.clone = clone;
exports.mix = mix;
exports.final = final;
exports.keys = keys;
exports.create = create;
exports.setPrototypeOf = setPrototypeOf;
exports.getPrototypeOf = getPrototypeOf;
exports.deepEqual = deepEqual;
exports.fromTo = fromTo;
exports.newGuid = newGuid;
exports.map = map;
exports.setByPath = setByPath;
exports.getByPath = getByPath;
exports.unique = unique;
exports.getFunctionArgumentNames = getFunctionArgumentNames;
exports.short = short;
exports.firstUpper = firstUpper;
exports.escapeRegExp = escapeRegExp;
exports.toCamelCase = toCamelCase;
exports.toSplitCase = toSplitCase;
exports.htmlPrefilter = htmlPrefilter;
exports.parseHTML = parseHTML;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(3),
    each = _require.each,
    final = _require.final,
    deepEqual = _require.deepEqual;

var _require2 = __webpack_require__(18),
    Entity = _require2.Entity,
    Node = _require2.Node;

var expression = __webpack_require__(55);

var _require3 = __webpack_require__(5),
    meta = _require3.meta;

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
var Directive = (_dec = meta({
  type: types.ATTRIBUTE,
  level: levels.GENERAL
}), _dec(_class = (_temp = _class2 = function (_Entity) {
  (0, _inherits3.default)(Directive, _Entity);

  //指令构建函数


  //挂载指令常用的类型
  function Directive(options) {
    (0, _classCallCheck3.default)(this, Directive);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Entity.call(this));

    _this.parseExpr = expression;
    _this.Node = Node;

    each(options, function (name, value) {
      return final(_this, name, value);
    });
    return _this;
  }

  //指令创建好后会首先触发绑定


  Directive.prototype.bind = function bind() {};

  //执行一个指令


  Directive.prototype.execute = function execute(scope, force) {
    this.scope = scope;
    if (this.meta.type === types.ELEMENT) {
      return this.update();
    }
    var newValue = this.meta.literal ? this.attribute.value : this.expression(scope);
    if (force || !deepEqual(this._value_, newValue)) {
      this.update(newValue, this._value_);
      this._value_ = newValue;
    }
  };

  //指令的表达式计算结果发生变化时执行


  Directive.prototype.update = function update() {};

  //解除绑定，node 的移除并不会触发 unbind
  //unbind 是需要显示触发


  Directive.prototype.unbind = function unbind() {};

  return Directive;
}(Entity), _class2.types = types, _class2.levels = levels, _temp)) || _class);

module.exports = Directive;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var meta = __webpack_require__(13);
var components = __webpack_require__(102);
var directives = __webpack_require__(103);
var event = __webpack_require__(104);
var model = __webpack_require__(105);
var template = __webpack_require__(106);
var watch = __webpack_require__(107);

var on = event;
var dependencies = components;

module.exports = {
  meta: meta, event: event, on: on, model: model, watch: watch,
  template: template, components: components, dependencies: dependencies, directives: directives
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InternalError = (_temp = _class = function (_Error) {
  (0, _inherits3.default)(InternalError, _Error);

  function InternalError(message) {
    (0, _classCallCheck3.default)(this, InternalError);

    var prefix = InternalError.prefix;

    for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      other[_key - 1] = arguments[_key];
    }

    return (0, _possibleConstructorReturn3.default)(this, _Error.call.apply(_Error, [this, prefix ? "[" + prefix + "] " + message : message].concat(other)));
  }

  return InternalError;
}(Error), _class.prefix = null, _temp);


module.exports = InternalError;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(3),
    create = _require.create,
    copy = _require.copy,
    each = _require.each,
    isFunction = _require.isFunction;

module.exports = function (parent, props) {
  //新的 scope 因为「继承」了 _observer_ 
  //所以在新 scope 上进行双向绑定时，将将值成功回写
  //如果有天不须用 cteate 继承法，需要注意 _observer_ 
  //或在新 scope 上 defineProperty 代理 parentScope
  var scope = create(parent);
  copy(props, scope);
  //将 func 绑定到原 scope 上;
  each(parent, function (key, value) {
    if (!isFunction(value)) return;
    scope[key] = value.bind(parent);
  });
  return scope;
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(19);
var IE8_DOM_DEFINE = __webpack_require__(46);
var toPrimitive = __webpack_require__(32);
var dP = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(21)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Error = __webpack_require__(6);

module.exports = function (options) {
  return function (target) {
    if (!target || !target.setMeta) {
      throw new Error('Invaild Entity');
    }
    target.setMeta(options);
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(9);
var ctx = __webpack_require__(45);
var hide = __webpack_require__(15);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(23);
module.exports = __webpack_require__(11) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(30);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(36)('wks');
var uid = __webpack_require__(25);
var Symbol = __webpack_require__(7).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Entity = __webpack_require__(97);
var Error = __webpack_require__(6);
var Node = __webpack_require__(101);

module.exports = { Entity: Entity, Error: Error, Node: Node };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(98);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(37);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(3),
    final = _require.final,
    isArray = _require.isArray,
    copy = _require.copy,
    each = _require.each;

var Error = __webpack_require__(6);

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
    (0, _classCallCheck3.default)(this, EventEmitter);

    target = target || this;
    var emitter = target._emitter_;
    if (emitter) return emitter;
    final(this, '_target_', target);
    final(target, '_emitter_', this);
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
    var maxListeners = EventEmitter._maxListeners;
    if (this._listeners_[name].length > maxListeners) {
      throw new Error('The \'' + name + '\' event listener is not more than ' + maxListeners);
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
      each(this._listeners_, function (name) {
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
    copy(data, event, ['data']);
    event.data = data;
    return this._target_.dispatchEvent(event);
  };

  return EventEmitter;
}();

//最多添加多少个 listener


EventEmitter._maxListeners = 1024;

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
  if (!isArray(names)) names = names.split(',');
  names.forEach(function (name) {
    this._events[name] = descriptor;
  }, this);
};

module.exports = EventEmitter;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(64);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(80);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(20);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(19);
var dPs = __webpack_require__(70);
var enumBugKeys = __webpack_require__(37);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(47)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(74).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(36)('keys');
var uid = __webpack_require__(25);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(12);
var TAG = __webpack_require__(17)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(17);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(9);
var LIBRARY = __webpack_require__(31);
var wksExt = __webpack_require__(39);
var defineProperty = __webpack_require__(10).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Directive = __webpack_require__(4);
var Template = __webpack_require__(108);
var directives = __webpack_require__(57);

Directive.directives = directives;

Template.Directive = Directive;
Template.directives = directives;

module.exports = Template;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(112);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(31);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(48);
var hide = __webpack_require__(15);
var has = __webpack_require__(12);
var Iterators = __webpack_require__(33);
var $iterCreate = __webpack_require__(69);
var setToStringTag = __webpack_require__(38);
var getPrototypeOf = __webpack_require__(75);
var ITERATOR = __webpack_require__(17)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(68);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(21)(function () {
  return Object.defineProperty(__webpack_require__(47)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
var document = __webpack_require__(7).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(71)(false);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(51);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(30);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(37).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(26);
var createDesc = __webpack_require__(23);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(32);
var has = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(46);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

var VARIABLE_FILTER = /(\(|\[|\{|\+|\-|\*|\/|\>|\<|\=|\!|\,|\;|\?|\:|\&|\|)\s*([a-z\_0-9\$]+)/ig;
var VARIABLE_NAME = /^[a-z\$\_]/i;
var ALLOWED_WORD = /(\$scope|true|false|null|undefined|Date|Number|String|Object|Boolean|Array|RegExp|Math|JSON|parseInt|parseFloat|isNaN|isFinite)/; //eslint-disable-line
var EXPRESSION_BLOCK = /\{\{([\s\S]+?)\}\}/;
var EXPRESSION_CACHE = {};
var TEMPLATE_CACHE = {};

function findVariables(expr) {
  expr = '(' + expr + ')';
  VARIABLE_FILTER.lastIndex = 0;
  var variables = {};
  var info = void 0;
  while (info = VARIABLE_FILTER.exec(expr)) {
    //eslint-disable-line
    var name = info[2];
    if (VARIABLE_NAME.test(name) && !ALLOWED_WORD.test(name)) {
      variables[name] = true;
    }
  }
  return Object.keys(variables);
}

function getValue(scope, name) {
  var value = scope[name];
  return value instanceof Function ? value.bind(scope) : value;
}

function expression(expr) {
  var cacheItem = EXPRESSION_CACHE[expr];
  if (cacheItem) return cacheItem;
  var keys = findVariables(expr);
  var func = new (Function.prototype.bind.apply(Function, [null].concat(['$scope'], keys, ['return(' + expr + ')'])))();
  function exec(scope) {
    var values = keys.map(function (name) {
      return getValue(scope, name);
    });
    return func.apply(undefined, [scope].concat(values));
  }
  EXPRESSION_CACHE[expr] = exec;
  return exec;
}

function template(str) {
  var cacheItem = TEMPLATE_CACHE[str];
  if (cacheItem) return cacheItem;
  var blocks = str.split(EXPRESSION_BLOCK);
  for (var i = 1; i < blocks.length; i += 2) {
    blocks[i] = expression(blocks[i]);
  }
  function exec(scope) {
    var result = '';
    blocks.forEach(function (block) {
      result += block instanceof Function ? block(scope) : block;
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

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(3),
    isFunction = _require.isFunction,
    isBoolean = _require.isBoolean,
    getByPath = _require.getByPath,
    deepEqual = _require.deepEqual,
    clone = _require.clone;

var Error = __webpack_require__(6);

var Watcher = function Watcher(calculator, handler, context) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Watcher);

  this.calc = function (force) {
    var newValue = _this.calculator.call(_this.context);
    var willExecute = isBoolean(force) ? force : !deepEqual(newValue, _this.value);
    if (willExecute) {
      _this.handler.call(_this.context, newValue, _this.value);
    }
    _this.value = clone(newValue);
  };

  if (!isFunction(calculator) || !isFunction(handler)) {
    throw new Error('Invalid parameters');
  }
  this.context = context || this;
  this.calculator = isFunction(calculator) ? calculator : function () {
    return getByPath(_this.context, calculator);
  };
  this.handler = handler;
};

module.exports = Watcher;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var each = __webpack_require__(116);
var ifDirective = __webpack_require__(117);
var prop = __webpack_require__(118);
var attr = __webpack_require__(119);
var on = __webpack_require__(120);
var html = __webpack_require__(121);
var text = __webpack_require__(122);
var prevent = __webpack_require__(123);
var id = __webpack_require__(124);
var show = __webpack_require__(125);
var model = __webpack_require__(126);
var focus = __webpack_require__(133);
var anyAttribute = __webpack_require__(134); //处理所有未知 attr
var anyText = __webpack_require__(135); //处理所有 text 
var className = __webpack_require__(136); //处理 className

module.exports = {
  '#text': anyText,
  '*': anyAttribute,
  'if': ifDirective,
  'class': className,
  each: each, prop: prop, attr: attr, on: on, html: html, text: text,
  prevent: prevent, id: id, show: show, model: model, focus: focus
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var _extends2 = __webpack_require__(43);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Template = __webpack_require__(42);
var Watcher = __webpack_require__(56);

var _require = __webpack_require__(3),
    isFunction = _require.isFunction,
    isString = _require.isString,
    each = _require.each,
    final = _require.final,
    getByPath = _require.getByPath;

var _require2 = __webpack_require__(18),
    Error = _require2.Error,
    Entity = _require2.Entity,
    Node = _require2.Node;

var createDirective = __webpack_require__(138);

var _require3 = __webpack_require__(5),
    template = _require3.template;

/**
 * 组件类
 * 用于定义一个新的组件
 * @param {Object} classOpts 类选项
 * @returns {Component} 组件类
 */


var Component = (_dec = template('<span>Error: Invaild template</span>'), _dec(_class = function (_Entity) {
  (0, _inherits3.default)(Component, _Entity);

  /**
   * 组件类构造函数
   * @param {object} options 实例选项
   * @returns {void} 无返回
   */
  function Component(options) {
    (0, _classCallCheck3.default)(this, Component);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Entity.call(this));

    options = options || {};
    _this._processMeta_();
    var meta = _this.meta;
    _this.$setModel(meta.model);
    _this._bindWatches_(meta.watches);
    _this._bindDirectives_(meta.directives);
    _this._bindComponents_((0, _extends3.default)({}, Component.components, meta.components, {
      'self': _this.constructor
    }));
    _this._bindEvents_(meta.events);
    final(_this, '$children', []);
    if (options.parent) {
      _this.$setParent(options.parent);
    }
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
    child.$parent = this;
  };

  /**
   * 移除子组件
   * @param {Object} child 子组件
   * @returns {void} 无返回
   */


  Component.prototype.$removeChild = function $removeChild(child) {
    var index = this.$children.indexOf(child);
    this.$children.splice(index, 1);
    child.$parent = null;
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
    each(components, function (name, component) {
      if (!component) return;
      _this2.$components[name] = component;
      _this2.$directives[name] = createDirective({
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
    each(directives, function (name, directive) {
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

    each(events, function (name, handlers) {
      handlers.forEach(function (handler) {
        handler = isFunction(handler) ? handler : _this4[handler];
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
    if (isFunction(model)) {
      this.$model = model.call(this);
    } else {
      this.$model = model || {};
    }
    each(this.$model, function (name) {
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
   * 在模板发生更新时计算所有 watcher
   * @returns {void} 无返回
   */


  Component.prototype._calcWatchers_ = function _calcWatchers_() {
    if (!this.$watchers) return;
    this.$watchers.forEach(function (watcher) {
      watcher.calc();
    });
  };

  /**
   * 添加一个监控
   * @param {string|function} calculator 计算函数或路径
   * @param {function} handler 处理函数
   * @returns {void} 无返回
   */


  Component.prototype.$watch = function $watch(calculator, handler) {
    var _this6 = this;

    this.$watchers = this.$watchers || [];
    var calculatorFunc = isFunction(calculator) ? calculator : function () {
      return getByPath(_this6, calculator);
    };
    var handlerFunc = isFunction(handler) ? handler : getByPath(this, handler);
    var watcher = new Watcher(calculatorFunc, handlerFunc, this);
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
    if (isString(meta.template)) {
      meta.template = Node.parse(meta.template);
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
    if (!element || element.nodeName === '#text') {
      throw new Error('Invalid component template');
    }
    this.$element = element;
    final(this, '$node', new Node(element));
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
    var template = new Template(this.$element, {
      directives: this.$directives,
      root: true
    });
    template.on('update', function () {
      if (_this7._calcWatchers_) _this7._calcWatchers_();
    });
    template.on('bound', function () {
      _this7.$emit('ready');
    });
    template.bind(this);
    this.$template = template;
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
    if (append) {
      this.$node.appendTo(mountNode);
    } else {
      this.$node.insertBy(mountNode);
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
    this.$node.remove();
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
    if (!stopPropagation && this.$children) {
      this.$children.forEach(function (child) {
        child.$broadcast(name, data);
      }, this);
    }
  };

  /**
   * 释放组件
   * @returns {void} 无返回
   */


  Component.prototype.$destroy = function $destroy() {
    this.$emit('destroy');
    this.$remove();
    this.$children.forEach(function (child) {
      child.$destroy();
    }, this);
    if (this.$parent) {
      var index = this.$parent.$children.indexOf(this);
      this.$parent.$children.splice(index, 1);
    }
    if (this._compiled_) {
      this.$template.unbind();
    }
    this.$emit('destroyed');
    this._emitter_.off();
    for (var key in this) {
      this[key] = null;
    }this.$children.splice(0, this.$children.length);
    this.$parent = null;
    this.$template = null;
    this.$element = null;
  };

  (0, _createClass3.default)(Component, [{
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
}(Entity)) || _class);


module.exports = Component;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(61);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(3),
    copy = _require.copy,
    isFunction = _require.isFunction,
    toSplitCase = _require.toSplitCase;

var info = __webpack_require__(62);
var bootstrap = __webpack_require__(63);
var Template = __webpack_require__(42);
var Component = __webpack_require__(137);
var decorators = __webpack_require__(5);
var config = __webpack_require__(58);
var Error = __webpack_require__(6);

var Directive = Template.Directive;

Error.prefix = info.name;

bootstrap.Component = Component;
bootstrap.Directive = Directive;
bootstrap.decorators = decorators;
bootstrap.bootstrap = bootstrap;
bootstrap.config = config;

//持载模板相关对象
copy(decorators, bootstrap);
copy(info, bootstrap);

bootstrap.component = function (name, component) {
  name = toSplitCase(name);
  if (!component) return Component.components[name];
  component = isFunction(component) ? component : this.component(component);
  Component.components[name] = component;
  return component;
};

bootstrap.directive = function (name, directive) {
  name = toSplitCase(name);
  if (!directive) return Directive.directives[name];
  directive = isFunction(directive) ? directive : this.directive(directive);
  Directive.directives[name] = directive;
  return directive;
};

bootstrap.defineComponent = function () {
  return Component.extend.apply(Component, arguments);
};

bootstrap.defineDirective = function () {
  return Directive.extend.apply(Directive, arguments);
};

module.exports = bootstrap;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = {"name":"mokit","version":"4.0.0-beta10"}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(3),
    isNull = _require.isNull,
    isFunction = _require.isFunction;

var Error = __webpack_require__(6);

module.exports = function (component, mountNode, options) {
  if (!component || !component.meta) {
    throw new Error('Involid Component');
  }
  options = options || {};
  if (isNull(options.append)) options.append = true;
  if (isFunction(component)) {
    component = new component();
  }
  component.$mount(mountNode, options.append);
  return component;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
__webpack_require__(76);
module.exports = __webpack_require__(39).f('iterator');


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(67)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(44)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(30);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(34);
var descriptor = __webpack_require__(23);
var setToStringTag = __webpack_require__(38);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(17)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(19);
var getKeys = __webpack_require__(24);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(72);
var toAbsoluteIndex = __webpack_require__(73);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(7).document;
module.exports = document && document.documentElement;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(12);
var toObject = __webpack_require__(52);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
var global = __webpack_require__(7);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(33);
var TO_STRING_TAG = __webpack_require__(17)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(78);
var step = __webpack_require__(79);
var Iterators = __webpack_require__(33);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(44)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
__webpack_require__(87);
__webpack_require__(88);
__webpack_require__(89);
module.exports = __webpack_require__(9).Symbol;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(7);
var has = __webpack_require__(12);
var DESCRIPTORS = __webpack_require__(11);
var $export = __webpack_require__(14);
var redefine = __webpack_require__(48);
var META = __webpack_require__(83).KEY;
var $fails = __webpack_require__(21);
var shared = __webpack_require__(36);
var setToStringTag = __webpack_require__(38);
var uid = __webpack_require__(25);
var wks = __webpack_require__(17);
var wksExt = __webpack_require__(39);
var wksDefine = __webpack_require__(40);
var enumKeys = __webpack_require__(84);
var isArray = __webpack_require__(85);
var anObject = __webpack_require__(19);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(32);
var createDesc = __webpack_require__(23);
var _create = __webpack_require__(34);
var gOPNExt = __webpack_require__(86);
var $GOPD = __webpack_require__(54);
var $DP = __webpack_require__(10);
var $keys = __webpack_require__(24);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(53).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(26).f = $propertyIsEnumerable;
  __webpack_require__(41).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(31)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(25)('meta');
var isObject = __webpack_require__(20);
var has = __webpack_require__(12);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(21)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(24);
var gOPS = __webpack_require__(41);
var pIE = __webpack_require__(26);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(51);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(53).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {



/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40)('asyncIterator');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40)('observable');


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
module.exports = __webpack_require__(9).Object.setPrototypeOf;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(14);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(93).set });


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(20);
var anObject = __webpack_require__(19);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(45)(Function.call, __webpack_require__(54).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var $Object = __webpack_require__(9).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(14);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(34) });


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = __webpack_require__(27);

var _require = __webpack_require__(3),
    create = _require.create,
    final = _require.final,
    copy = _require.copy;

var Entity = (_temp = _class = function (_EventEmitter) {
  (0, _inherits3.default)(Entity, _EventEmitter);

  function Entity() {
    (0, _classCallCheck3.default)(this, Entity);
    return (0, _possibleConstructorReturn3.default)(this, _EventEmitter.apply(this, arguments));
  }

  (0, _createClass3.default)(Entity, [{
    key: 'meta',
    get: function get() {
      return this.constructor && this.constructor.meta;
    }
  }]);
  return Entity;
}(EventEmitter), _class.extend = function (options, superClass) {
  superClass = this;

  var NewEntity = function (_superClass) {
    (0, _inherits3.default)(NewEntity, _superClass);

    function NewEntity() {
      (0, _classCallCheck3.default)(this, NewEntity);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _possibleConstructorReturn3.default)(this, _superClass.call.apply(_superClass, [this].concat(args)));
    }

    return NewEntity;
  }(superClass);

  copy(options, NewEntity);
  return NewEntity;
}, _class.setMeta = function (options) {
  if (Object.getOwnPropertyNames(this).indexOf('meta') < 0) {
    var meta = create(this.meta || null);
    final(this, 'meta', meta);
  }
  if (options) copy(options, this.meta);
}, _temp);


module.exports = Entity;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
var $Object = __webpack_require__(9).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(14);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(11), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = __webpack_require__(27);
var Error = __webpack_require__(6);

var _require = __webpack_require__(3),
    parseHTML = _require.parseHTML,
    final = _require.final;

function toDOMNode(node) {
  if (!node) {
    throw new Error('Invalid node');
  }
  var domNode = node.domNode || node;
  if (!(domNode instanceof window.Node)) {
    throw new Error('Invalid DOM node');
  }
  return domNode;
}

//托管的 dom，所有 dom 操作都需要基于这个 class 完成
//除 removed 事件外，暂不需求其它事件，考虑到性能就暂不 emit 其它事件

var Node = function (_EventEmitter) {
  (0, _inherits3.default)(Node, _EventEmitter);

  Node.create = function create(name) {
    var node = name ? document.createElement(name) : document.createTextNode('');
    return new Node(node);
  };

  Node.createFragment = function createFragment() {
    var fragment = document.createDocumentFragment();
    return new Node(fragment);
  };

  Node.parse = function parse(str) {
    var nodeItems = parseHTML(str);
    if (nodeItems.length != 1) {
      throw new Error(['Must be a single root element', str].join('\r\n'));
    }
    return nodeItems[0];
  };

  function Node(node) {
    var _ret, _ret2;

    (0, _classCallCheck3.default)(this, Node);

    var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));

    if (node instanceof Node) return _ret = node, (0, _possibleConstructorReturn3.default)(_this, _ret);
    var domNode = toDOMNode(node);
    if (domNode._node_) return _ret2 = domNode._node_, (0, _possibleConstructorReturn3.default)(_this, _ret2);
    final(_this, 'domNode', domNode);
    final(domNode, '_node_', _this);
    return _this;
  }

  Node.prototype._wrapEvent = function _wrapEvent(opts) {
    opts = opts || {};
    opts.target = opts.target || this;
    return opts;
  };

  Node.prototype.broadcast = function broadcast(name, opts) {
    opts = this._wrapEvent(opts);
    this.emit(name, opts);
    var childNodes = this.childNodes;
    if (!childNodes) return;
    childNodes.forEach(function (childNode) {
      return childNode.broadcast(name, opts);
    });
  };

  Node.prototype.dispatch = function dispatch(name, opts) {
    opts = this._wrapEvent(opts);
    this.emit(name, opts);
    var parentNode = this.parentNode;
    if (!parentNode) return;
    parentNode.dispatch(name, opts);
  };

  Node.prototype.insertBy = function insertBy(mountNode) {
    mountNode = toDOMNode(mountNode);
    if (mountNode.parentNode) {
      //this.broadcast('mount', opts);
      mountNode.parentNode.insertBefore(this.domNode, mountNode);
      //this.broadcast('mounted', opts);
    }
  };

  Node.prototype.appendTo = function appendTo(mountNode) {
    mountNode = toDOMNode(mountNode);
    //this.broadcast('mount', opts);
    mountNode.appendChild(this.domNode);
    //this.broadcast('mounted', opts);
  };

  Node.prototype.appendChild = function appendChild(childNode, opts) {
    var node = new Node(childNode);
    node.appendTo(this, opts);
  };

  Node.prototype.remove = function remove(opts) {
    if (this.domNode.parentNode) {
      //this.broadcast('remove', opts);
      this.domNode.parentNode.removeChild(this.domNode);
      this.broadcast('removed', opts);
    }
  };

  Node.prototype.cloneNode = function cloneNode(deep) {
    var node = this.domNode.cloneNode(deep);
    return new Node(node);
  };

  Node.prototype.find = function find(selector) {
    var items = [].slice.call(this.domNode.querySelectorAll(selector));
    return items.map(function (item) {
      return new Node(item);
    });
  };

  Node.prototype.focus = function focus() {
    this.domNode.focus();
  };

  Node.prototype.blur = function blur() {
    this.domNode.blur();
  };

  Node.prototype.setAttribute = function setAttribute(name, value) {
    this.domNode.setAttribute(name, value);
  };

  Node.prototype.getAttribute = function getAttribute(name) {
    return this.domNode.getAttribute(name);
  };

  Node.prototype.removeAttribute = function removeAttribute(name) {
    this.domNode.removeAttribute(name);
  };

  Node.prototype.setProperty = function setProperty(name, value) {
    this.domNode[name] = value;
    if (this.component) this.component[name] = value;
  };

  Node.prototype.getProperty = function getProperty(name) {
    if (this.component) return this.component[name];
    return this.domNode[name];
  };

  Node.prototype.removeProperty = function removeProperty(name) {
    delete this.domNode[name];
    if (this.component) delete this.component[name];
  };

  (0, _createClass3.default)(Node, [{
    key: 'compiled',
    get: function get() {
      return !!this.domNode._compiled_;
    },
    set: function set(value) {
      this.domNode._compiled_ = value;
    }
  }, {
    key: 'component',
    get: function get() {
      return this.domNode.component;
    },
    set: function set(value) {
      this.domNode.component = value;
    }
  }, {
    key: 'nodeName',
    get: function get() {
      return this.domNode.nodeName;
    }
  }, {
    key: 'tagName',
    get: function get() {
      return this.domNode.tagName;
    }
  }, {
    key: 'nodeValue',
    get: function get() {
      return this.domNode.nodeValue;
    },
    set: function set(value) {
      if (this.domNode.nodeValue === value) return;
      this.domNode.nodeValue = value;
    }
  }, {
    key: 'childNodes',
    get: function get() {
      var items = [].slice.call(this.domNode.childNodes || []);
      return items.map(function (item) {
        return new Node(item);
      });
    }
  }, {
    key: 'attributes',
    get: function get() {
      return this.domNode.attributes;
    }
  }, {
    key: 'innerHTML',
    get: function get() {
      return this.domNode.innerHTML;
    },
    set: function set(value) {
      if (this.domNode.innerHTML === value) return;
      this.domNode.innerHTML = value;
    }
  }, {
    key: 'innerText',
    get: function get() {
      return this.domNode.innerHTML;
    },
    set: function set(value) {
      if (this.domNode.innerText === value) return;
      this.domNode.innerText = value;
    }
  }, {
    key: 'options',
    get: function get() {
      var items = [].slice.call(this.domNode.options);
      return items.map(function (item) {
        return new Node(item);
      });
    }
  }, {
    key: 'classList',
    get: function get() {
      return this.domNode.classList;
    }
  }, {
    key: 'value',
    get: function get() {
      return this.domNode.value;
    },
    set: function set(val) {
      this.domNode.value = val;
    }
  }, {
    key: 'checked',
    get: function get() {
      return this.domNode.checked;
    },
    set: function set(value) {
      if (this.domNode.checked === value) return;
      this.domNode.checked = value;
    }
  }, {
    key: 'selected',
    get: function get() {
      return this.domNode.selected;
    },
    set: function set(value) {
      if (this.domNode.selected === value) return;
      this.domNode.selected = value;
    }
  }, {
    key: 'parentNode',
    get: function get() {
      var parentNode = this.domNode.parentNode;
      if (!parentNode) return null;
      return new Node(this.domNode.parentNode);
    }
  }, {
    key: 'target',
    get: function get() {
      return this.component || this.domNode;
    }
  }, {
    key: 'emitter',
    get: function get() {
      return new EventEmitter(this.target);
    }
  }]);
  return Node;
}(EventEmitter);

module.exports = Node;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var meta = __webpack_require__(13);

module.exports = function (components) {
  return meta({ components: components });
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var meta = __webpack_require__(13);

module.exports = function (directives) {
  return meta({ directives: directives });
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var meta = __webpack_require__(13);

module.exports = function (name) {
  return function (target, handler) {
    meta()(target.constructor);
    target.meta.events = target.meta.events || {};
    target.meta.events[name] = target.meta.events[name] || [];
    target.meta.events[name].push(handler);
  };
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var meta = __webpack_require__(13);

module.exports = function (target, prop) {
  if (!prop) {
    return meta({ model: target });
  } else {
    return meta({
      model: function model() {
        return this[prop]();
      }
    })(target.constructor);
  }
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var meta = __webpack_require__(13);
var Error = __webpack_require__(6);

module.exports = function (template) {
  if (!template) {
    throw new Error('Invalid template');
  }
  return meta({ template: template });
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var meta = __webpack_require__(13);

module.exports = function (calcer) {
  return function (target, handler) {
    meta()(target.constructor);
    target.meta.watches = target.meta.watches || [];
    target.meta.watches.push({ calcer: calcer, handler: handler });
  };
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof2 = __webpack_require__(28);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Observer = __webpack_require__(109);
var EventEmitter = __webpack_require__(27);
var Compiler = __webpack_require__(111);
var config = __webpack_require__(58);

/**
 * 模板类
 * 可能通过 element 作为参数，创建一个模板实例
 */

var Template = function (_EventEmitter) {
  (0, _inherits3.default)(Template, _EventEmitter);

  /**
   * 构建一个模板板实例
   * @param {HTMLNode} element HTML 元素
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Template(element, options) {
    (0, _classCallCheck3.default)(this, Template);

    var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));

    options = options || {};
    _this.options = options;
    _this.element = element;
    _this.compiler = options.compiler || new Compiler(options);
    _this.render = _this.compiler.compile(_this.element);
    _this.requestUpdate = _this.requestUpdate.bind(_this);

    if (!(typeof _this.requestUpdate === 'function')) {
      throw new TypeError('Value of "this.requestUpdate" violates contract.\n\nExpected:\n() => any\n\nGot:\n' + _inspect(_this.requestUpdate));
    }

    _this._updateTimer = 0;
    return _this;
  }

  /**
   * 更新当前模板 (会过滤不必要的更新)
   * @returns {void} 无返回
   */


  Template.prototype.requestUpdate = function requestUpdate() {
    var _this2 = this;

    if (config.debug || this.sync) {
      return this.update();
    }
    if (this._updateTimer) {
      clearTimeout(this._updateTimer);
      this._updateTimer = 0;
    }
    this._updateTimer = setTimeout(function () {
      if (_this2._updateTimer) _this2.update();
    }, 0);
  };

  /**
   * 更新当前模板内部方法 
   * @returns {void} 无返回
   */


  Template.prototype.update = function update() {
    if (!this.observer || !this.observer.target) return;
    this.$emit('update', this);
    this.render(this.observer.target);
    this.$emit('updated', this);
  };

  /**
   * 将模板绑定到一个 scope
   * @param {Object} scope 绑定的上下文对象
   * @returns {void} 无返回
   */


  Template.prototype.bind = function bind(scope) {
    if (!scope) return;
    this.unbind();
    this.$emit('bind', this);
    this.observer = new Observer(scope, {
      root: this.options.root
    });
    scope.$self = scope;
    this.observer.on('change', this.requestUpdate);
    this.update();
    this.$emit('bound', this);
  };

  /**
   * 解绑定
   * @returns {void} 无返回
   */


  Template.prototype.unbind = function unbind() {
    if (!this.observer) return;
    this.observer.removeListener('change', this.requestUpdate);
    this.observer.clearReference();
    this.observer = null;
    this.render.unbind();
    delete this.observer;
  };

  return Template;
}(EventEmitter);

module.exports = Template;

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
    return typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input);
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

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(3),
    isArray = _require.isArray,
    isFunction = _require.isFunction,
    isNull = _require.isNull,
    isObject = _require.isObject,
    copy = _require.copy,
    final = _require.final,
    each = _require.each;

var EventEmitter = __webpack_require__(27);
var Error = __webpack_require__(6);
var AutoRun = __webpack_require__(110);
var Watcher = __webpack_require__(56);

var OBSERVER_PROP_NAME = '_observer_';
var CHANGE_EVENT_NAME = 'change';
var GET_EVENT_NAME = 'get';
var EVENT_MAX_DISPATCH_LAYER = 10;
var IGNORE_REGEXPS = [/^\_(.*)\_$/, /^\_\_/, /^\$/];

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
  (0, _inherits3.default)(Observer, _EventEmitter);

  /**
   * 通过目标对象构造一个观察对象
   * @param {Object} target 目标对象
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Observer(target, options) {
    (0, _classCallCheck3.default)(this, Observer);

    var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));

    if (isNull(target)) {
      throw new Error('Invalid target');
    }
    options = options || {};
    var observer = target[OBSERVER_PROP_NAME];
    if (observer) {
      var _ret;

      copy(options, observer.options);
      //当时一个组件 A 的为组件 B 的 prop 时，A 更新不会触发 B 更新
      //所在暂注释这里，另一种方法是更新 prop 指令，重写 excute 方法，而不是现在的 update 方法
      // if (observer.options.root) {
      //   observer.parents.length = 0;
      // }
      observer.apply();
      return _ret = observer, (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    final(_this, 'options', options);
    final(_this, 'shadow', {});
    final(_this, 'target', target);
    final(_this, 'parents', []);
    final(target, OBSERVER_PROP_NAME, _this);
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
    if (isFunction(value) || Observer.isIgnore(name)) {
      return;
    }
    Object.defineProperty(this.target, name, {
      get: function get() {
        var observer = this[OBSERVER_PROP_NAME];
        observer.emitGet({ name: name, value: value });
        return observer.shadow[name];
      },
      set: function set(value) {
        var observer = this[OBSERVER_PROP_NAME];
        var oldValue = observer.shadow[name];
        if (oldValue === value) return;
        if (isObject(value)) {
          var childObserver = new Observer(value);
          observer.addChild(childObserver, name);
        }
        //移除旧值的父引用
        //如果用 delete 删除属性将无法移除父子引用
        if (oldValue && oldValue[OBSERVER_PROP_NAME]) {
          observer.removeChild(oldValue[OBSERVER_PROP_NAME], name);
        }
        observer.shadow[name] = value;
        observer.emitChange({ name: name, value: value });
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
    if (isArray(this.target)) {
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
   * 添子观察者对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */


  Observer.prototype.addChild = function addChild(child, name) {
    if (isNull(child) || isNull(name)) {
      throw new Error('Invalid paramaters');
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
    if (isNull(child)) {
      throw new Error('Invalid paramaters');
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
   * 清除所有父子引用
   * @returns {void} 无返回
   */


  Observer.prototype.clearReference = function clearReference() {
    each(this.target, function (name, value) {
      if (isNull(value)) return;
      var child = value[OBSERVER_PROP_NAME];
      if (child) this.removeChild(child);
    }, this);
  };

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.emitChange = function emitChange(event) {
    event.name = event.name || '*';
    event.path = event.name;
    this.dispatch(CHANGE_EVENT_NAME, event);
  };

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.emitGet = function emitGet(event) {
    event.name = event.name || '*';
    event.path = event.name;
    this.dispatch(GET_EVENT_NAME, event);
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
      var parentEvent = copy(event);
      parentEvent.path = isNull(event.path) ? item.name : item.name + '.' + event.path;
      item.parent.dispatch(eventName, parentEvent);
    }, this);
  };

  /**
   * 获取所有成员名称列表
   * @returns {Array} 所有成员名称列表
   */


  Observer.prototype._getPropertyNames = function _getPropertyNames() {
    var names = isArray(this.target) ? this.target.map(function (item, index) {
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
    if (array._wrapped_) return;
    final(array, '_wrapped_', true);
    final(array, 'push', function () {
      var items = [].slice.call(arguments);
      var observer = this[OBSERVER_PROP_NAME];
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        observer.set(array.length, item);
      }, this);
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
    });
    final(array, 'pop', function () {
      var item = [].pop.apply(this, arguments);
      var observer = this[OBSERVER_PROP_NAME];
      observer.emitChange({ name: this.length, value: item });
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
      return item;
    });
    final(array, 'unshift', function () {
      var items = [].slice.call(arguments);
      var observer = this[OBSERVER_PROP_NAME];
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        observer.set(0, item);
      }, this);
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
    });
    final(array, 'shift', function () {
      var item = [].shift.apply(this, arguments);
      var observer = this[OBSERVER_PROP_NAME];
      observer.emitChange({ name: 0, value: item });
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
      return item;
    });
    final(array, 'splice', function () {
      var startIndex = arguments[0];
      var endIndex = isNull(arguments[1]) ? startIndex + arguments[1] : this.length - 1;
      var observer = this[OBSERVER_PROP_NAME];
      var items = [].splice.apply(this, arguments);
      for (var i = startIndex; i <= endIndex; i++) {
        observer.emitChange({ name: i, value: items[i - startIndex] });
      }
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
      return items;
    });
    final(array, 'set', function (index, value) {
      var observer = this[OBSERVER_PROP_NAME];
      if (index >= this.length) {
        observer.emitChange({ name: 'length', value: this.length });
        observer.emitChange({ value: this.length });
      }
      observer.set(index, value);
    });
  };

  Observer.prototype.run = function run(handler, options) {
    options = options || {};
    var _options = options,
        context = _options.context,
        trigger = _options.trigger,
        immed = _options.immed,
        deep = _options.deep;

    context = context || this.target;
    var auto = new AutoRun(handler, context, trigger, deep);
    this.on('get', auto.onGet);
    this.on('change', auto.onChange);
    if (immed) auto.run();
    return auto;
  };

  Observer.prototype.stop = function stop(autoRef) {
    if (!autoRef) return;
    this.off('get', autoRef.onGet);
    this.off('change', autoRef.onChange);
  };

  Observer.prototype.watch = function watch(calculator, handler, options) {
    options = options || {};
    var _options2 = options,
        context = _options2.context;

    context = context || this.target;
    var watcher = new Watcher(calculator, handler, context);
    watcher.autoRef = this.run(watcher.calc, options);
    return watcher;
  };

  Observer.prototype.unWatch = function unWatch(watcher) {
    if (!watcher) return;
    this.stop(watcher.autoRef);
  };

  return Observer;
}(EventEmitter);

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

module.exports = Observer;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function AutoRun(handler, context, trigger, deep) {
  var _this = this;

  (0, _classCallCheck3.default)(this, AutoRun);

  this.onGet = function (event) {
    if (!_this.runing || !event || !_this.dependencies) return;
    _this.dependencies[event.path] = true;
  };

  this.isDependent = function (path) {
    if (!path) return false;
    if (!_this.dependencies || _this.dependencies[path]) return true;
    if (!_this.deep) return false;
    var paths = path.split('.');
    paths.pop();
    return _this.isDependent(paths.join('.'));
  };

  this.onChange = function (event) {
    if (_this.runing || !event || !_this.isDependent(event.path)) return;
    if (_this.timer) {
      clearTimeout(_this.timer);
      _this.timer = null;
    }
    _this.timer = setTimeout(function () {
      if (!_this.timer) return;
      _this.trigger.call(_this.context);
    }, 0);
  };

  this.run = function () {
    var _handler;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this.dependencies = {};
    _this.runing = true;
    var result = (_handler = _this.handler).call.apply(_handler, [_this.context].concat(args));
    _this.runing = false;
    return result;
  };

  this.handler = handler;
  this.context = context || this;
  this.trigger = trigger || this.run;
  this.deep = deep || false;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var _extends2 = __webpack_require__(43);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(3),
    each = _require.each,
    isNull = _require.isNull,
    toArray = _require.toArray,
    toCamelCase = _require.toCamelCase,
    toSplitCase = _require.toSplitCase;

var expression = __webpack_require__(55);
var commonDirectives = __webpack_require__(57);

var _require2 = __webpack_require__(18),
    Error = _require2.Error,
    Node = _require2.Node;

var DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */
module.exports = function () {

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Compiler(options) {
    (0, _classCallCheck3.default)(this, Compiler);

    options = options || {};
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.elementDirectives = {};
    this.attributeDirectives = {};
    this.registerDirectives((0, _extends3.default)({}, commonDirectives, options.directives));
  }

  /**
   * 添加指令
   * @param {Object} directives 指令集 
   * @returns {void} 无返回
   */


  Compiler.prototype.registerDirectives = function registerDirectives(directives) {
    var _this = this;

    each(directives, function (name, directive) {
      name = toSplitCase(name);
      var fullName = directive.meta.prefix === false ? name : _this.prefix + ':' + name;
      if (directive.meta.type == Directive.types.ELEMENT) {
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
    var parts = attrName.toLowerCase().split(':');
    var info = {};
    if (parts.length > 1) {
      info.name = parts[0] + ':' + parts[1];
      info.decorates = parts.slice(2).map(function (item) {
        return toCamelCase(item);
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
    toArray(node.attributes).forEach(function (attribute) {
      var attrInfo = this._parseAttrInfo(attribute.name);
      var AttrDirective = this.attributeDirectives[attrInfo.name] || this.attributeDirectives['*'];
      if (!AttrDirective) return;
      var meta = AttrDirective.meta;
      handler.directives.push(this._createDirectiveInstance(AttrDirective, {
        handler: handler,
        node: node,
        attribute: attribute,
        expression: meta.literal ? attribute.value : expression(attribute.value, meta.mixed),
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
    toArray(node.childNodes).forEach(function (childNode) {
      if (childNode.compiled) return;
      var childHandler = this.compile(childNode);
      childHandler.parent = this;
      handler.children.push(childHandler);
    }, this);
  };

  /**
  * 初始化一个编译完成的 handler
  * @param {function} handler 编译后的的模板函数
  * @param {Object} options 选项
  * @returns {void} 无返回
  */


  Compiler.prototype._bindHandler = function _bindHandler(handler, options) {
    //排序 directives
    handler.directives = handler.directives.sort(function (a, b) {
      return b.meta.level - a.meta.level;
    });
    //初始化 directives
    var boundDirectives = [];
    each(handler.directives, function (index, directive) {
      directive.index = index;
      directive.bind();
      boundDirectives.push(directive);
      //移除完成绑定的指令对应的 attribute
      if (directive.meta.remove !== false && directive.attribute && options.remove !== false) {
        directive.node.removeAttribute(directive.attribute.name);
      }
      //如果遇到一个「终态」指令，停止向下初始化
      if (directive.meta.final) {
        handler.final = true;
        return handler.final;
      }
    });
    handler.directives = boundDirectives;
  };

  Compiler.prototype._makeHandlerUnbindMethod = function _makeHandlerUnbindMethod() {
    return function () {
      this.directives.forEach(function (directive) {
        directive.unbind();
      });
      this.children.forEach(function (childHandler) {
        childHandler.unbind();
      });
    };
  };

  Compiler.prototype._makeHandlerExcuteMethod = function _makeHandlerExcuteMethod() {
    return function (scope, force) {
      if (isNull(scope)) scope = {};
      this.directives.forEach(function (directive) {
        directive.scope = scope;
        directive.execute(scope, force);
      });
      this.children.forEach(function (childHandler) {
        childHandler(scope, force);
      });
    };
  };

  /**
   * 编译一个模板
   * @param {HTMLNode} node 模板根元素
   * @param {Object} options 选项
   * @returns {function} 模板函数
   */


  Compiler.prototype.compile = function compile(node, options) {
    if (!node) throw new Error('Invalid node for compile');
    options = options || {};
    //实例托管 node 实例   
    node = new Node(node);
    node.compiled = true;
    //定义编译结果函数
    var handler = function handler(scope, force) {
      return handler.excute(scope, force);
    };
    handler.node = node;
    handler.directives = [];
    handler.children = [];
    //添加方法
    handler.excute = this._makeHandlerExcuteMethod();
    handler.unbind = this._makeHandlerUnbindMethod();
    //编译相关指令
    if (options.element !== false) {
      this._compileElement(handler, node);
    }
    if (options.attribute !== false) {
      this._compileAttributes(handler, node);
    }
    //绑定 handler 
    this._bindHandler(handler, options);
    //编译 children
    if (options.children !== false) {
      this._compileChildren(handler, node);
    }
    //返回编译后函数
    return handler;
  };

  return Compiler;
}();

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
module.exports = __webpack_require__(9).Object.assign;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(14);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(115) });


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(24);
var gOPS = __webpack_require__(41);
var pIE = __webpack_require__(26);
var toObject = __webpack_require__(52);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(21)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(3),
    each = _require.each;

var Scope = __webpack_require__(8);

var _require2 = __webpack_require__(5),
    meta = _require2.meta;

var EACH_EXPR = /([\s\S]+)\s+(in|of)\s+([\s\S]+)/;

var EachDirective = (_dec = meta({
  level: Directive.levels.STATEMENT + 1, //比 if 要高一个权重
  final: true,
  literal: true
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(EachDirective, _Directive);

  function EachDirective() {
    (0, _classCallCheck3.default)(this, EachDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  EachDirective.prototype.bind = function bind() {
    //创建挂载点并插入到对应位置
    this.mountNode = this.Node.create();
    this.mountNode.insertBy(this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 each 指令必须先移除，否再进行 item 编译时 each 还会生效
    this.node.removeAttribute(this.attribute.name);
    //把 item 的 node 移除掉，还在内存中待用
    this.node.remove();
    //分解 each 表达式
    this.token = this.splitEachExpr(this.attribute.value);
    //创建循环函数
    this.execEach = this.createEachFunction(this.token);
    //实始化待用变量
    this.existsItems = {};
  };

  EachDirective.prototype.splitEachExpr = function splitEachExpr(expr) {
    var tokens = EACH_EXPR.exec(expr);
    var list = tokens[3],
        type = tokens[2];
    var names = tokens[1].split(',');
    var index = names[0],
        item = names[1];
    if (type == 'of') index = [item, item = index][0];
    return { list: list, type: type, index: index, item: item };
  };

  EachDirective.prototype.createEachFunction = function createEachFunction(token) {
    var listExpr = this.parseExpr(token.list);
    return function (scope, loop) {
      var list = listExpr(scope);
      each(list, loop);
    };
  };

  EachDirective.prototype.createItemScope = function createItemScope(scope, dataIndex, dataItem) {
    var indexName = this.token.index;
    var itemName = this.token.item;
    //创建新 scope，必须选创建再设置 prototype 或采用定义「属性」的方式
    //因为指令参数指定的名称有可能和 scope 原有变量冲突
    //将导致针对 watch 变量的赋值，从引用发循环
    var itemScope = new Scope(scope);
    if (indexName) {
      Object.defineProperty(itemScope, indexName, {
        get: function get() {
          return dataIndex;
        }
      });
    }
    //item 采用「属性」进行代理，否则将会使「双向」绑定无法回设值
    if (itemName) {
      Object.defineProperty(itemScope, itemName, {
        get: function get() {
          return dataItem;
        },
        set: function set(value) {
          scope[dataIndex] = value;
        }
      });
    }
    return itemScope;
  };

  EachDirective.prototype.execute = function execute(scope) {
    var _this2 = this;

    var renderItems = [];
    var fragment = this.Node.createFragment();
    this.execEach(scope, function (dataIndex, dataItem) {
      var itemScope = _this2.createItemScope(scope, dataIndex, dataItem);
      var oldItem = _this2.existsItems[dataIndex];
      if (oldItem) {
        oldItem.handler(itemScope);
      } else {
        var eachItem = {};
        //创建新元素
        eachItem.node = _this2.node.cloneNode(true);
        fragment.appendChild(eachItem.node);
        eachItem.handler = _this2.compiler.compile(eachItem.node);
        eachItem.handler(itemScope);
        _this2.existsItems[dataIndex] = eachItem;
      }
      renderItems.push(dataIndex);
    });
    //清理旧项
    each(this.existsItems, function (index, item) {
      if (renderItems.some(function (i) {
        return i == index;
      })) return;
      item.node.remove({ destroy: true });
      delete _this2.existsItems[index];
    });
    //挂载新项
    if (fragment.childNodes.length > 0) {
      fragment.insertBy(this.mountNode);
    }
  };

  return EachDirective;
}(Directive)) || _class);


module.exports = EachDirective;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(5),
    meta = _require.meta;

var IfDirective = (_dec = meta({
  level: Directive.levels.STATEMENT,
  final: true
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(IfDirective, _Directive);

  function IfDirective() {
    (0, _classCallCheck3.default)(this, IfDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  IfDirective.prototype.bind = function bind() {
    //创建挂载点并插入到对应位置
    this.mountNode = this.Node.create();
    this.mountNode.insertBy(this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 if 指令必须先移除，否再进行 item 编译时 if 还会生效
    this.node.removeAttribute(this.attribute.name);
    //把 item 的 node 移除掉，还在内存中待用
    this.node.remove();
  };

  IfDirective.prototype.execute = function execute(scope, force) {
    var newValue = this.expression(scope);
    if (newValue) {
      //如果新计算的结果为 true 才执行 
      this._handler = this._handler || this.compiler.compile(this.node);
      this._handler(scope, force);
      //通过 parentNode 判断有没有添加，未添加到 dom 中时才添加，避免重复添加
      if (!this.itemNode.parentNode) {
        this.itemNode.insertBy(this.mountNode);
      }
    } else {
      this.itemNode.remove({ destroy: true });
    }
  };

  (0, _createClass3.default)(IfDirective, [{
    key: 'itemNode',
    get: function get() {
      if (this.node.component) {
        return this.node.component.$node;
      } else {
        return this.node;
      }
    }
  }]);
  return IfDirective;
}(Directive)) || _class);


module.exports = IfDirective;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

module.exports = function (_Directive) {
  (0, _inherits3.default)(PropDirective, _Directive);

  function PropDirective() {
    (0, _classCallCheck3.default)(this, PropDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  PropDirective.prototype.update = function update(value) {
    this.node.setProperty(this.decorates[0], value);
  };

  return PropDirective;
}(Directive);

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

module.exports = function (_Directive) {
  (0, _inherits3.default)(AttrDirective, _Directive);

  function AttrDirective() {
    (0, _classCallCheck3.default)(this, AttrDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  AttrDirective.prototype.update = function update(value) {
    this.node.setAttribute(this.decorates[0], value);
  };

  return AttrDirective;
}(Directive);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);
var Scope = __webpack_require__(8);

var _require = __webpack_require__(5),
    meta = _require.meta;

var _require2 = __webpack_require__(3),
    isNull = _require2.isNull;

var OnDirective = (_dec = meta({
  literal: true
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(OnDirective, _Directive);

  function OnDirective() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, OnDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.eventHandler = function (event) {
      if (isNull(_this.scope)) return;
      _this.eventExpr(new Scope(_this.scope, {
        $event: event
      }));
    }, _this.bindEvent = function () {
      _this.node.emitter.addListener(_this.eventName, _this.eventHandler, false);
    }, _this.unindEvent = function () {
      _this.node.emitter.removeListener(_this.eventName, _this.eventHandler);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  OnDirective.prototype.compileExpr = function compileExpr() {
    var attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    return this.parseExpr(attrValue);
  };

  /**
   * 初始化指令
   * @returns {void} 无返回
   */


  OnDirective.prototype.bind = function bind() {
    this.eventExpr = this.compileExpr();
    this.eventName = this.decorates[0];
    this.bindEvent();
  };

  OnDirective.prototype.unbind = function unbind() {
    this.unindEvent();
  };

  OnDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
  };

  return OnDirective;
}(Directive)) || _class);


module.exports = OnDirective;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

module.exports = function (_Directive) {
  (0, _inherits3.default)(InnerHtmlDirective, _Directive);

  function InnerHtmlDirective() {
    (0, _classCallCheck3.default)(this, InnerHtmlDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  InnerHtmlDirective.prototype.update = function update(newValue) {
    this.node.innerHTML = newValue;
  };

  return InnerHtmlDirective;
}(Directive);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

module.exports = function (_Directive) {
  (0, _inherits3.default)(InnerTextDirective, _Directive);

  function InnerTextDirective() {
    (0, _classCallCheck3.default)(this, InnerTextDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  InnerTextDirective.prototype.update = function update(newValue) {
    this.node.innerText = newValue;
  };

  return InnerTextDirective;
}(Directive);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(5),
    meta = _require.meta;

var PreventDirective = (_dec = meta({
  level: Directive.levels.PREVENT,
  final: true
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(PreventDirective, _Directive);

  function PreventDirective() {
    (0, _classCallCheck3.default)(this, PreventDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  return PreventDirective;
}(Directive)) || _class);


module.exports = PreventDirective;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(5),
    meta = _require.meta;

var IdDirective = (_dec = meta({
  literal: true
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(IdDirective, _Directive);

  function IdDirective() {
    (0, _classCallCheck3.default)(this, IdDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  IdDirective.prototype.update = function update(id) {
    this.scope[id] = this.node.target;
  };

  return IdDirective;
}(Directive)) || _class);


module.exports = IdDirective;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

module.exports = function (_Directive) {
  (0, _inherits3.default)(ShowDirective, _Directive);

  function ShowDirective() {
    (0, _classCallCheck3.default)(this, ShowDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  ShowDirective.prototype.update = function update(value) {
    this.node.style.display = value ? '' : 'none';
  };

  return ShowDirective;
}(Directive);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var Directive = __webpack_require__(4);
var SelectDirective = __webpack_require__(127);
var EditableDirective = __webpack_require__(128);
var InputDirective = __webpack_require__(129);
var RadioDirective = __webpack_require__(130);
var CheckboxDirective = __webpack_require__(131);
var PropDirective = __webpack_require__(132);

var _require = __webpack_require__(18),
    Error = _require.Error;

function DirectiveFactary(options) {
  var node = options.node;
  var tagName = node.tagName;
  if (options.decorates[0]) {
    return new PropDirective(options);
  } else if (tagName == 'INPUT') {
    var type = node.getAttribute('type');
    if (type == 'radio') {
      return new RadioDirective(options);
    } else if (type == 'checkbox') {
      return new CheckboxDirective(options);
    } else {
      return new InputDirective(options);
    }
  } else if (tagName == 'TEXTAREA') {
    return new InputDirective(options);
  } else if (tagName == 'SELECT') {
    return new SelectDirective(options);
  } else if (node.isContentEditable) {
    return new EditableDirective(options);
  } else {
    throw new Error('Directive `model` cannot be used on `' + tagName + '`');
  }
}

//手动添加 meta 信息
DirectiveFactary.meta = {
  level: Directive.levels.ATTRIBUTE
};

module.exports = DirectiveFactary;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);
var Scope = __webpack_require__(8);

var _require = __webpack_require__(5),
    meta = _require.meta;

var _require2 = __webpack_require__(3),
    isArray = _require2.isArray,
    isNull = _require2.isNull;

var SelectModelDirective = (_dec = meta({
  final: true
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(SelectModelDirective, _Directive);

  function SelectModelDirective() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SelectModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.changeHandler = function () {
      if (isNull(_this.scope)) return;
      var selectedOptions = _this.node.selectedOptions;
      var value = _this.node.multiple ? [].slice.call(selectedOptions).map(function (option) {
        return option.value;
      }, _this) : selectedOptions[0].value;
      _this.backExpr(new Scope(_this.scope, {
        $value: value
      }));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  SelectModelDirective.prototype.bind = function bind() {
    this.changeHandler = this.changeHandler.bind(this);
    this.backExpr = this.parseExpr('$scope.' + this.attribute.value + '=$value');
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.node.emitter.addListener('change', this.changeHandler, false);
  };

  SelectModelDirective.prototype.unbind = function unbind() {
    this.node.emitter.removeListener('change', this.changeHandler);
  };

  SelectModelDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
    this._handler(scope);
    var value = this.expression(scope);
    if (!isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  };

  return SelectModelDirective;
}(Directive)) || _class);


module.exports = SelectModelDirective;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);
var Scope = __webpack_require__(8);

var _require = __webpack_require__(3),
    isNull = _require.isNull;

module.exports = function (_Directive) {
  (0, _inherits3.default)(EditableModelDirective, _Directive);

  function EditableModelDirective() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EditableModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.inputHandler = function () {
      if (isNull(_this.scope)) return;
      _this.backExpr(new Scope(_this.scope, {
        $value: _this.node.innerHTML
      }));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  EditableModelDirective.prototype.bind = function bind() {
    this.backExpr = this.parseExpr('$scope.' + this.attribute.value + '=$value');
    this.node.emitter.addListener('input', this.inputHandler, false);
  };

  EditableModelDirective.prototype.unbind = function unbind() {
    this.node.emitter.removeListener('input', this.inputHandler);
  };

  EditableModelDirective.prototype.execute = function execute(scope) {
    var value = this.expression(scope);
    if (this.node.innerHTML !== value) {
      this.node.innerHTML = value;
    }
  };

  return EditableModelDirective;
}(Directive);

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);
var Scope = __webpack_require__(8);

var _require = __webpack_require__(3),
    isNull = _require.isNull;

module.exports = function (_Directive) {
  (0, _inherits3.default)(InputModelDirective, _Directive);

  function InputModelDirective() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, InputModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.inputHandler = function () {
      if (isNull(_this.scope)) return;
      _this.backExpr(new Scope(_this.scope, {
        $value: _this.node.value
      }));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  InputModelDirective.prototype.bind = function bind() {
    this.backExpr = this.parseExpr('$scope.' + this.attribute.value + '=$value');
    this.node.emitter.addListener('input', this.inputHandler, false);
  };

  InputModelDirective.prototype.unbind = function unbind() {
    this.node.emitter.removeListener('input', this.inputHandler);
  };

  InputModelDirective.prototype.execute = function execute(scope) {
    var value = this.expression(scope);
    if (this.node.value !== value) {
      this.node.value = value;
    }
  };

  return InputModelDirective;
}(Directive);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);
var Scope = __webpack_require__(8);

var _require = __webpack_require__(3),
    isNull = _require.isNull;

module.exports = function (_Directive) {
  (0, _inherits3.default)(RadioModelDirective, _Directive);

  function RadioModelDirective() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RadioModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.changeHandler = function () {
      if (isNull(_this.scope)) return;
      _this.backExpr(new Scope(_this.scope, {
        $value: _this.node.value
      }));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  RadioModelDirective.prototype.bind = function bind() {
    this.backExpr = this.parseExpr('$scope.' + this.attribute.value + '=$value');
    this.node.emitter.addListener('change', this.changeHandler, false);
  };

  RadioModelDirective.prototype.unbind = function unbind() {
    this.node.emitter.removeListener('change', this.changeHandler);
  };

  RadioModelDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
    var value = this.expression(scope);
    this.node.checked = value == this.node.value;
  };

  return RadioModelDirective;
}(Directive);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);
var Scope = __webpack_require__(8);

var _require = __webpack_require__(3),
    isNull = _require.isNull,
    isArray = _require.isArray;

module.exports = function (_Directive) {
  (0, _inherits3.default)(CheckBoxModelDirective, _Directive);

  function CheckBoxModelDirective() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CheckBoxModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.changeHandler = function () {
      if (isNull(_this.scope)) return;
      var value = _this.expression(_this.scope);
      if (isArray(value) && _this.node.checked) {
        value.push(_this.node.value);
      } else if (isArray(value) && !_this.node.checked) {
        var index = value.indexOf(_this.node.value);
        value.splice(index, 1);
      } else {
        _this.backExpr(new Scope(_this.scope, {
          $value: _this.node.checked
        }));
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  CheckBoxModelDirective.prototype.bind = function bind() {
    this.backExpr = this.parseExpr('$scope.' + this.attribute.value + '=$value');
    this.node.emitter.addListener('change', this.changeHandler, false);
  };

  CheckBoxModelDirective.prototype.unbind = function unbind() {
    this.node.emitter.removeListener('change', this.changeHandler);
  };

  CheckBoxModelDirective.prototype.execute = function execute(scope) {
    this.scope = scope;
    var value = this.expression(scope);
    if (isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  };

  return CheckBoxModelDirective;
}(Directive);

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);
var Scope = __webpack_require__(8);

var _require = __webpack_require__(18),
    Error = _require.Error;

var _require2 = __webpack_require__(3),
    isNull = _require2.isNull;

module.exports = function (_Directive) {
  (0, _inherits3.default)(PropModelDirective, _Directive);

  function PropModelDirective() {
    (0, _classCallCheck3.default)(this, PropModelDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  PropModelDirective.prototype.bind = function bind() {
    var _this2 = this;

    this.component = this.node.component;
    this.backExpr = this.parseExpr('$scope.' + this.attribute.value + '=$value');
    this.bindProp = this.decorates[0];
    if (!this.component) {
      throw new Error('Directive `model:' + this.bindProp + '` cannot be used on `' + this.node.tagName + '`');
    }
    this.watcher = this.component.$watch(this.bindProp, function (value) {
      if (isNull(_this2.scope)) return;
      _this2.backExpr(new Scope(_this2.scope, {
        $value: value
      }));
    });
  };

  PropModelDirective.prototype.unbind = function unbind() {
    this.component.$unWatch(this.watcher);
  };

  PropModelDirective.prototype.update = function update(value) {
    this.component[this.bindProp] = value;
  };

  return PropModelDirective;
}(Directive);

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

module.exports = function (_Directive) {
  (0, _inherits3.default)(FocusDirective, _Directive);

  function FocusDirective() {
    (0, _classCallCheck3.default)(this, FocusDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  FocusDirective.prototype.execute = function execute(scope) {
    var _this2 = this;

    var state = this.expression(scope);
    setTimeout(function () {
      if (state) _this2.node.focus();else _this2.node.blur();
    }, 0);
  };

  return FocusDirective;
}(Directive);

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(5),
    meta = _require.meta;

var _require2 = __webpack_require__(3),
    isNull = _require2.isNull;

/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */


var AttributeDirective = (_dec = meta({
  level: Directive.levels.ATTRIBUTE,
  prefix: false,
  literal: true,
  remove: false
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(AttributeDirective, _Directive);

  function AttributeDirective() {
    (0, _classCallCheck3.default)(this, AttributeDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  AttributeDirective.prototype.bind = function bind() {
    this.computedName = this.attribute.name;
    this.computedValue = this.attribute.value;
    this.nameExpr = this.parseExpr(this.attribute.name, true);
    this.valueExpr = this.parseExpr(this.attribute.value, true);
  };

  AttributeDirective.prototype.execute = function execute(scope) {
    var newComputedName = this.nameExpr(scope);
    if (this.computedName !== newComputedName) {
      //移除旧名称
      this.node.removeAttribute(this.computedName);
      //设置新名称
      this.computedName = newComputedName;
      if (!isNull(this.computedName) && this.computedName.length > 0) {
        this.node.setAttribute(this.computedName, this.computedValue || '');
      }
    }
    var newComputeValue = this.valueExpr(scope);
    if (this.computedValue !== newComputeValue) {
      this.computedValue = newComputeValue;
      this.node.setAttribute(this.computedName, this.computedValue || '');
    }
  };

  return AttributeDirective;
}(Directive)) || _class);


module.exports = AttributeDirective;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(3),
    trim = _require.trim;

var _require2 = __webpack_require__(5),
    meta = _require2.meta;

var TextDirective = (_dec = meta({
  type: Directive.types.ELEMENT,
  prefix: false
}), _dec(_class = function (_Directive) {
  (0, _inherits3.default)(TextDirective, _Directive);

  function TextDirective() {
    (0, _classCallCheck3.default)(this, TextDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  TextDirective.prototype.bind = function bind() {
    var nodeValue = trim(this.node.nodeValue);
    if (!nodeValue) return;
    this.node.nodeValue = '';
    this.contentExpr = this.parseExpr(nodeValue, true);
  };

  TextDirective.prototype.execute = function execute(scope) {
    if (!this.contentExpr) return;
    this.scope = scope;
    var newValue = this.contentExpr(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  };

  return TextDirective;
}(Directive)) || _class);


module.exports = TextDirective;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Directive = __webpack_require__(4);

var _require = __webpack_require__(3),
    isString = _require.isString,
    isArray = _require.isArray,
    isObject = _require.isObject,
    startWith = _require.startWith;

function className(name, prefix) {
  if (!name) {
    return '';
  } else if (isString(name) && name.indexOf(' ') > -1) {
    return className(name.split(' '), prefix);
  } else if (isString(name) && name.indexOf(',') > -1) {
    return className(name.split(','), prefix);
  } else if (isArray(name)) {
    return name.map(function (item) {
      return className(item, prefix);
    }).join(' ').trim();
  } else if (isObject(name)) {
    return className(Object.keys(name).filter(function (key) {
      return name[key];
    }), prefix);
  } else if (startWith(name, prefix)) {
    return name;
  } else {
    var trimedName = name.trim().replace(/([A-Z])/g, '-$1').toLowerCase();
    if (!trimedName) return '';
    return prefix ? prefix + '-' + trimedName : trimedName;
  }
}

module.exports = function (_Directive) {
  (0, _inherits3.default)(ClassNameDirective, _Directive);

  function ClassNameDirective() {
    (0, _classCallCheck3.default)(this, ClassNameDirective);
    return (0, _possibleConstructorReturn3.default)(this, _Directive.apply(this, arguments));
  }

  ClassNameDirective.prototype.update = function update(value) {
    var classNames = className(value);
    if (classNames) {
      this.node.setAttribute('class', classNames);
    } else {
      this.node.removeAttribute('class');
    }
  };

  return ClassNameDirective;
}(Directive);

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(59);
var components = __webpack_require__(139);

Component.components = components;

module.exports = Component;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = __webpack_require__(43);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Template = __webpack_require__(42);

var _require = __webpack_require__(5),
    meta = _require.meta;

var Directive = Template.Directive;

module.exports = function (options) {
  var _dec, _class;

  var ComponentDirective = (_dec = meta((0, _extends3.default)({}, options, {
    type: Directive.types.ELEMENT,
    literal: true,
    final: true,
    remove: false,
    level: Directive.levels.ELEMENT
  })), _dec(_class = function (_Directive) {
    (0, _inherits3.default)(ComponentDirective, _Directive);

    function ComponentDirective(options) {
      (0, _classCallCheck3.default)(this, ComponentDirective);
      return (0, _possibleConstructorReturn3.default)(this, _Directive.call(this, options));
    }

    /**
     * 初始化指令
     * @returns {void} 无返回
     */


    ComponentDirective.prototype.bind = function bind() {
      //创建挂载点并插入到对应位置
      this.mountNode = this.Node.create();
      this.mountNode.insertBy(this.node);
      //缓存 attributes
      this.attributes = [].slice.call(this.node.attributes);
      this.node.remove();
    };

    ComponentDirective.prototype.createComponent = function createComponent() {
      var _this2 = this;

      if (this.component) return false;
      var meta = this.meta;
      this.component = new meta.component({
        parent: meta.parent || meta.scope
      });
      this.node.component = this.component;
      this.attributeHandler = this.compiler.compile(this.node, {
        element: false,
        children: false,
        remove: false
      });
      this.component.$mount(this.mountNode);
      this.component.$template.sync = true;
      this.copyAttrbutes();
      this.compileContents();
      this.component.$node.on('removed', function (event) {
        if (!event || !event.destroy) return;
        _this2.component.$destroy();
        _this2.component = null;
        _this2.node.component = null;
      });
      return true;
    };

    ComponentDirective.prototype.copyAttrbutes = function copyAttrbutes() {
      var _this3 = this;

      var directiveRegExp = new RegExp('^' + this.prefix + ':', 'i');
      this.attributes.forEach(function (attr) {
        if (directiveRegExp.test(attr.name)) return;
        if (attr.name in _this3.component) return;
        _this3.component.$node.setAttribute(attr.name, attr.value);
      });
    };

    ComponentDirective.prototype.compileContents = function compileContents() {
      this.contentHandlers = [];
      var placeNodes = this.component.$node.find('[' + this.prefix + '\\:content]');
      placeNodes.forEach(function (placeNode) {
        //将内容插入到指定的「位置」
        var contentSelector = placeNode.getAttribute(this.prefix + ':content');
        var contentNodes = contentSelector ? this.node.find(contentSelector) : this.node.childNodes;
        if (!contentNodes || contentNodes.length < 1) return;
        placeNode.childNodes.forEach(function (childNode) {
          return childNode.remove();
        });
        contentNodes.forEach(function (contentNode) {
          return placeNode.appendChild(contentNode);
        });
        //编译插入后的子「内容模板」
        var contentHandler = this.compiler.compile(placeNode);
        this.contentHandlers.push(contentHandler);
      }, this);
    };

    ComponentDirective.prototype.execute = function execute(scope) {
      var isNew = this.createComponent();
      this.attributeHandler(scope, isNew);
      this.contentHandlers.forEach(function (contentHandler) {
        return contentHandler(scope);
      });
      this.component.$template.sync = false;
    };

    return ComponentDirective;
  }(Directive)) || _class);

  return ComponentDirective;
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var View = __webpack_require__(140);

module.exports = { View: View };

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(1);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = __webpack_require__(59);

var _require = __webpack_require__(3),
    isString = _require.isString,
    isFunction = _require.isFunction;

var _require2 = __webpack_require__(5),
    template = _require2.template;

var _require3 = __webpack_require__(18),
    Error = _require3.Error;

/**
 * 内置视图组件
 * 可以加载并显示其它组件，并可以指定「转场效果」
 */


var View = (_dec = template('<div></div>'), _dec(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(View, _Component);

  function View() {
    (0, _classCallCheck3.default)(this, View);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
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

  (0, _createClass3.default)(View, [{
    key: 'component',
    set: function set(component) {
      if (this._transitioning) return;
      this._transitioning = true;
      //如果 value 是字符串则尝试从 $parent.components 中获取组件类 
      if (isString(component)) {
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
      if (isFunction(component)) {
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
          oldComponentInstance.$destroy();
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
      if (!transition || isFunction(transition.prep) && isFunction(transition.go)) {
        if (this._transition && isFunction(this._transition.clean)) {
          this._transition.clean(this);
        }
        if (transition && isFunction(transition.init)) {
          transition.init(this);
        }
        this._transition = transition;
      } else {
        throw new Error('Invalid transition');
      }
    }
  }]);
  return View;
}(Component), _class2.transition = {
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


module.exports = View;

/***/ })
/******/ ]);
});
//# sourceMappingURL=mokit.js.map