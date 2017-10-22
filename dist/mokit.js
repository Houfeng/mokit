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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
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

var _setPrototypeOf = __webpack_require__(81);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(85);

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
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(36);
var toPrimitive = __webpack_require__(21);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(14)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(4);
var ctx = __webpack_require__(35);
var hide = __webpack_require__(9);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(39);
var defined = __webpack_require__(22);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(25)('wks');
var uid = __webpack_require__(18);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(56);

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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(38);
var enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(48);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(13);
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
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys');
var uid = __webpack_require__(18);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 27 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(59);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(71);

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

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(12);
var dPs = __webpack_require__(64);
var enumBugKeys = __webpack_require__(26);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(37)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(65).appendChild(iframe);
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(11)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(33);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(51);
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(14)(function () {
  return Object.defineProperty(__webpack_require__(37)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(53)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(40);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(43);
var hide = __webpack_require__(9);
var has = __webpack_require__(7);
var Iterators = __webpack_require__(30);
var $iterCreate = __webpack_require__(63);
var setToStringTag = __webpack_require__(32);
var getPrototypeOf = __webpack_require__(66);
var ITERATOR = __webpack_require__(11)('iterator');
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(38);
var hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(19);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(21);
var has = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(36);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(47);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/_ntils@3.1.5@ntils/src/utils.js
/**
 * 空函数
 */
function noop() { };

function utils_toString(obj) {
  return Object.prototype.toString.call(obj);
}

function getType(obj) {
  var str = utils_toString(obj);
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
  if (win.Element) {
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
    utils_final(objClone, key, src[key]);
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
  utils_keys(src).forEach(function (key) {
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
function utils_final(obj, name, value) {
  if (arguments.length < 1) throw new Error('Parameter missing');
  if (arguments.length < 2) {
    return each(obj, function (name, value) {
      utils_final(obj, name, value);
    });
  }
  if (arguments.length < 3) return utils_final(obj, name, obj[name]);
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
};

/**
 * 获取所有 key 
 */
function utils_keys(obj) {
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
  var aKeys = utils_keys(a);
  var bKeys = utils_keys(b);
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
    return trim(name);
  }).filter(function (name) {
    return name != 'function';
  });
};

/**
 * 缩短字符串
 */
function utils_short(str, maxLength) {
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
};
// CONCATENATED MODULE: /private/var/folders/7d/bf741r6j1psb64d_yd0zn_mh0000gn/T/323c5d47e93aeac869a10e176ec75647.js
/* harmony default export */ var _23c5d47e93aeac869a10e176ec75647 = ({ "name": "mokit", "version": "4.0.0-alpha18" });
// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(20);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(0);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(15);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(1);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(2);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// CONCATENATED MODULE: ./src/common/error.js




var error__class, error__temp;

var error_InternalError = (error__temp = error__class = function (_Error) {
  inherits_default()(InternalError, _Error);

  function InternalError(message) {
    classCallCheck_default()(this, InternalError);

    var prefix = InternalError.prefix;

    for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      other[_key - 1] = arguments[_key];
    }

    return possibleConstructorReturn_default()(this, _Error.call.apply(_Error, [this, prefix ? "[" + prefix + "] " + message : message].concat(other)));
  }

  return InternalError;
}(Error), error__class.prefix = null, error__temp);

// CONCATENATED MODULE: ./src/events/index.js




/**
 * 事件触发器基类
 */

var events_EventEmitter = function () {

  /**
   * 构建一个一个事修的触发器对象
   * @param {object} target 将代理的目标对象可以省略
   * @returns {void} 无返回
   */
  function EventEmitter(target) {
    classCallCheck_default()(this, EventEmitter);

    target = target || this;
    var emitter = target._emitter_;
    if (emitter) return emitter;
    utils_final(this, '_target_', target);
    utils_final(target, '_emitter_', this);
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
      throw new error_InternalError('The `' + name + '` event listener is not more than 10');
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


events_EventEmitter._maxListeners = 100;

//所有自定义事件
events_EventEmitter._events = [];

/**
 * 注册自定义事件(只在代理 dom 对象时有效)
 * @param {object} descriptor 事件定义
 * @returns {void} 无返回
 */
events_EventEmitter.register = function (descriptor) {
  var names = descriptor.name;
  if (!names) return;
  if (!isArray(names)) names = names.split(',');
  names.forEach(function (name) {
    this._events[name] = descriptor;
  }, this);
};

/* harmony default export */ var src_events = (events_EventEmitter);
// CONCATENATED MODULE: ./src/common/entity.js





var entity__class, entity__temp;




var entity_Entity = (entity__temp = entity__class = function (_EventEmitter) {
  inherits_default()(Entity, _EventEmitter);

  function Entity() {
    classCallCheck_default()(this, Entity);

    return possibleConstructorReturn_default()(this, _EventEmitter.apply(this, arguments));
  }

  createClass_default()(Entity, [{
    key: 'meta',
    get: function get() {
      return this.constructor && this.constructor.meta;
    }
  }]);

  return Entity;
}(src_events), entity__class.extend = function (options, superClass) {
  superClass = this;

  var NewEntity = function (_superClass) {
    inherits_default()(NewEntity, _superClass);

    function NewEntity() {
      classCallCheck_default()(this, NewEntity);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return possibleConstructorReturn_default()(this, _superClass.call.apply(_superClass, [this].concat(args)));
    }

    return NewEntity;
  }(superClass);

  copy(options, NewEntity);
  return NewEntity;
}, entity__class.setMeta = function (options) {
  if (Object.getOwnPropertyNames(this).indexOf('meta') < 0) {
    var meta = create(this.meta || null);
    utils_final(this, 'meta', meta);
  }
  if (options) copy(options, this.meta);
}, entity__temp);

// CONCATENATED MODULE: ./src/common/node.js








function toDOMNode(node) {
  if (!node) {
    throw new error_InternalError('Invalid node');
  }
  var domNode = node.domNode || node;
  if (!(domNode instanceof window.Node)) {
    throw new error_InternalError('Invalid DOM node');
  }
  return domNode;
}

//托管的 dom，所有 dom 操作都需要基于这个 class 完成
//除 removed 事件外，暂不需求其它事件，考虑到性能就暂不 emit 其它事件

var node_Node = function (_EventEmitter) {
  inherits_default()(Node, _EventEmitter);

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
      throw new error_InternalError(['Must be a single root element', str].join('\r\n'));
    }
    return nodeItems[0];
  };

  function Node(node) {
    var _ret, _ret2;

    classCallCheck_default()(this, Node);

    var _this = possibleConstructorReturn_default()(this, _EventEmitter.call(this));

    if (node instanceof Node) return _ret = node, possibleConstructorReturn_default()(_this, _ret);
    var domNode = toDOMNode(node);
    if (domNode._node_) return _ret2 = domNode._node_, possibleConstructorReturn_default()(_this, _ret2);
    utils_final(_this, 'domNode', domNode);
    utils_final(domNode, '_node_', _this);
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

  Node.prototype.insertBy = function insertBy(mountNode, opts) {
    mountNode = toDOMNode(mountNode);
    if (mountNode.parentNode) {
      //this.broadcast('mount', opts);
      mountNode.parentNode.insertBefore(this.domNode, mountNode);
      //this.broadcast('mounted', opts);
    }
  };

  Node.prototype.appendTo = function appendTo(mountNode, opts) {
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

  Node.prototype.getProperty = function getProperty(name, value) {
    if (this.component) return this.component[name];
    return this.domNode[name];
  };

  Node.prototype.removeProperty = function removeProperty(name) {
    delete this.domNode[name];
    if (this.component) delete this.component[name];
  };

  createClass_default()(Node, [{
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
      return new src_events(this.target);
    }
  }]);

  return Node;
}(src_events);


// CONCATENATED MODULE: ./src/common/index.js





/* harmony default export */ var common = ({ Entity: entity_Entity, Error: error_InternalError, Node: node_Node });
// CONCATENATED MODULE: ./src/template/expression.js
var VARIABLE_FILTER = /(\(|\[|\{|\+|\-|\*|\/|\>|\<|\=|\!|\,|\;|\?|\:|\&|\|)\s*([a-z\_0-9\$]+)/ig;
var VARIABLE_NAME = /^[a-z\$\_]/i;
var ALLOWED_WORD = /(\$scope|true|false|null|undefined|Date|Number|String|Object|Boolean|Array|RegExp|Math|JSON|parseInt|parseFloat|isNaN|isFinite)/;
var EXPRESSION_BLOCK = /\{\{([\s\S]+?)\}\}/;
var EXPRESSION_CACHE = {};
var TEMPLATE_CACHE = {};

function findVariables(expr) {
  expr = '(' + expr + ')';
  VARIABLE_FILTER.lastIndex = 0;
  var variables = {};
  var info = void 0;
  while (info = VARIABLE_FILTER.exec(expr)) {
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

function expression_template(str) {
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

function expression_compile(str, mixed) {
  return mixed ? expression_template(str) : expression(str);
}

/* harmony default export */ var template_expression = (expression_compile);
// CONCATENATED MODULE: ./src/decorators/meta.js


/* harmony default export */ var decorators_meta = (function (options) {
  return function (target) {
    if (!target || !target.setMeta) {
      throw new error_InternalError('Invaild Entity');
    }
    target.setMeta(options);
  };
});
// CONCATENATED MODULE: ./src/decorators/components.js


/* harmony default export */ var decorators_components = (function (components) {
  return decorators_meta({ components: components });
});
// CONCATENATED MODULE: ./src/decorators/directives.js


/* harmony default export */ var decorators_directives = (function (directives) {
  return decorators_meta({ directives: directives });
});
// CONCATENATED MODULE: ./src/decorators/event.js


/* harmony default export */ var decorators_event = (function (name) {
  return function (target, handler) {
    decorators_meta()(target.constructor);
    target.meta.events = target.meta.events || {};
    target.meta.events[name] = target.meta.events[name] || [];
    target.meta.events[name].push(handler);
  };
});
// CONCATENATED MODULE: ./src/decorators/model.js


/* harmony default export */ var decorators_model = (function (target, prop) {
  if (!prop) {
    return decorators_meta({ model: target });
  } else {
    return decorators_meta({
      model: function model() {
        return this[prop]();
      }
    })(target.constructor);
  }
});
// CONCATENATED MODULE: ./src/decorators/template.js



/* harmony default export */ var decorators_template = (function (template) {
  if (!template) {
    throw new error_InternalError('Invalid template');
  }
  return decorators_meta({ template: template });
});
// CONCATENATED MODULE: ./src/decorators/watch.js


/* harmony default export */ var watch = (function (calcer) {
  return function (target, handler) {
    decorators_meta()(target.constructor);
    target.meta.watches = target.meta.watches || [];
    target.meta.watches.push({ calcer: calcer, handler: handler });
  };
});
// CONCATENATED MODULE: ./src/decorators/index.js








var on = decorators_event;
var dependencies = decorators_components;



/* harmony default export */ var decorators = ({
  meta: decorators_meta, event: decorators_event, on: on, model: decorators_model, watch: watch,
  template: decorators_template, components: decorators_components, dependencies: dependencies, directives: decorators_directives
});
// CONCATENATED MODULE: ./src/template/directive.js




var directive__dec, directive__class, _class2, directive__temp;






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
var directive_Directive = (directive__dec = decorators_meta({
  type: types.ATTRIBUTE,
  level: levels.GENERAL
}), directive__dec(directive__class = (directive__temp = _class2 = function (_Entity) {
  inherits_default()(Directive, _Entity);

  //指令构建函数


  //挂载指令常用的类型
  function Directive(options) {
    classCallCheck_default()(this, Directive);

    var _this = possibleConstructorReturn_default()(this, _Entity.call(this));

    _this.parseExpr = template_expression;
    _this.Node = node_Node;

    each(options, function (name, value) {
      return utils_final(_this, name, value);
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
}(entity_Entity), _class2.types = types, _class2.levels = levels, directive__temp)) || directive__class);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(28);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/observer/autorun.js


var autorun__class, autorun__temp, _initialiseProps;

var autorun_AutoRun = (autorun__temp = autorun__class = function AutoRun(func, trigger, ctx) {
  classCallCheck_default()(this, AutoRun);

  _initialiseProps.call(this);

  this.func = func;
  this.trigger = trigger || this.run;
  this.ctx = ctx || this;
}, _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.deps = null;
  this.runing = false;
  this.ctx = null;

  this.onGet = function (event) {
    if (!_this.runing) return;
    _this.deps[event.path] = true;
  };

  this.onChange = function (event) {
    if (!_this.deps || _this.deps[event.path]) {
      _this.trigger.call(_this.ctx);
    }
  };

  this.run = function (ctx) {
    _this.ctx = ctx || _this;
    _this.deps = {};
    _this.runing = true;
    var result = _this.func.call(_this.ctx);
    _this.runing = false;
    return result;
  };
}, autorun__temp);

// CONCATENATED MODULE: ./src/observer/index.js








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

var observer_Observer = function (_EventEmitter) {
  inherits_default()(Observer, _EventEmitter);

  /**
   * 通过目标对象构造一个观察对象
   * @param {Object} target 目标对象
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Observer(target, options) {
    classCallCheck_default()(this, Observer);

    var _this = possibleConstructorReturn_default()(this, _EventEmitter.call(this));

    if (isNull(target)) {
      throw new error_InternalError('Invalid target');
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
      return _ret = observer, possibleConstructorReturn_default()(_this, _ret);
    }
    utils_final(_this, 'options', options);
    utils_final(_this, 'shadow', {});
    utils_final(_this, 'target', target);
    utils_final(_this, 'parents', []);
    utils_final(target, OBSERVER_PROP_NAME, _this);
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
        observer.emitGet({ path: name, value: value });
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
    if (isNull(child) || isNull(name)) {
      throw new error_InternalError('Invalid paramaters');
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
      throw new error_InternalError('Invalid paramaters');
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
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.emitGet = function emitGet(event) {
    this.dispatch(GET_EVENT_NAME, event);
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
    utils_final(array, '_wrapped_', true);
    utils_final(array, 'push', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        this[OBSERVER_PROP_NAME].set(array.length, item);
      }, this);
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
    });
    utils_final(array, 'pop', function () {
      var item = [].pop.apply(this, arguments);
      this[OBSERVER_PROP_NAME].emitChange({ path: this.length, value: item });
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return item;
    });
    utils_final(array, 'unshift', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        this[OBSERVER_PROP_NAME].set(0, item);
      }, this);
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
    });
    utils_final(array, 'shift', function () {
      var item = [].shift.apply(this, arguments);
      this[OBSERVER_PROP_NAME].emitChange({ path: 0, value: item });
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return item;
    });
    utils_final(array, 'splice', function () {
      var startIndex = arguments[0];
      var endIndex = isNull(arguments[1]) ? startIndex + arguments[1] : this.length - 1;
      var items = [].splice.apply(this, arguments);
      for (var i = startIndex; i <= endIndex; i++) {
        this[OBSERVER_PROP_NAME].emitChange({ path: i, value: items[i - startIndex] });
      }
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return items;
    });
    utils_final(array, 'set', function (index, value) {
      if (index >= this.length) {
        this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      }
      this[OBSERVER_PROP_NAME].set(index, value);
    });
  };

  Observer.prototype.start = function start(func, trigger) {
    if (func._ctx_) return func._ctx_;
    var ctx = new autorun_AutoRun(func, trigger);
    this.on('get', ctx.onGet);
    this.on('change', ctx.onChange);
    func._ctx_ = ctx;
    return ctx;
  };

  Observer.prototype.stop = function stop(func) {
    var ctx = func._ctx_;
    if (!ctx) return;
    this.off('get', ctx.onGet);
    this.off('change', ctx.onChange);
    delete func._ctx_;
  };

  return Observer;
}(src_events);

/**
 * 观察一个对象
 * @param {Object} target 目标对象
 * @return {Observer} 观察者对象
 */


observer_Observer.observe = function (target) {
  return new observer_Observer(target);
};

/**
 * 检查是不是忽略的属性名
 * @param {string} word 待检查的字符串
 * @returns {void} 无返回
 */
observer_Observer.isIgnore = function (word) {
  return IGNORE_REGEXPS.some(function (re) {
    return re.test(word);
  });
};

/* harmony default export */ var src_observer = (observer_Observer);
// CONCATENATED MODULE: ./src/template/scope.js


function Scope(parent, props) {
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
}
// CONCATENATED MODULE: ./src/template/directives/each.js




var each__dec, each__class;






var EACH_EXPR = /([\s\S]+)\s+(in|of)\s+([\s\S]+)/;

var each_EachDirective = (each__dec = decorators_meta({
  level: directive_Directive.levels.STATEMENT + 1, //比 if 要高一个权重
  final: true,
  literal: true
}), each__dec(each__class = function (_Directive) {
  inherits_default()(EachDirective, _Directive);

  function EachDirective() {
    classCallCheck_default()(this, EachDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
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
}(directive_Directive)) || each__class);

// CONCATENATED MODULE: ./src/template/directives/if.js





var if__dec, if__class;




var if_IfDirective = (if__dec = decorators_meta({
  level: directive_Directive.levels.STATEMENT,
  final: true
}), if__dec(if__class = function (_Directive) {
  inherits_default()(IfDirective, _Directive);

  function IfDirective() {
    classCallCheck_default()(this, IfDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
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

  createClass_default()(IfDirective, [{
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
}(directive_Directive)) || if__class);

// CONCATENATED MODULE: ./src/template/directives/prop.js





var prop_PropDirective = function (_Directive) {
  inherits_default()(PropDirective, _Directive);

  function PropDirective() {
    classCallCheck_default()(this, PropDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  PropDirective.prototype.update = function update(value) {
    this.node.setProperty(this.decorates[0], value);
  };

  return PropDirective;
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/attr.js





var attr_AttrDirective = function (_Directive) {
  inherits_default()(AttrDirective, _Directive);

  function AttrDirective() {
    classCallCheck_default()(this, AttrDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  AttrDirective.prototype.update = function update(value) {
    this.node.setAttribute(this.decorates[0], value);
  };

  return AttrDirective;
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/on.js




var on__dec, on__class;






var on_OnDirective = (on__dec = decorators_meta({
  literal: true
}), on__dec(on__class = function (_Directive) {
  inherits_default()(OnDirective, _Directive);

  function OnDirective() {
    var _temp, _this, _ret;

    classCallCheck_default()(this, OnDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.eventHandler = function (event) {
      if (isNull(_this.scope)) return;
      _this.eventExpr(new Scope(_this.scope, {
        $event: event
      }));
    }, _this.bindEvent = function () {
      _this.node.emitter.addListener(_this.eventName, _this.eventHandler, false);
    }, _this.unindEvent = function () {
      _this.node.emitter.removeListener(_this.eventName, _this.eventHandler);
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
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
}(directive_Directive)) || on__class);

// CONCATENATED MODULE: ./src/template/directives/inner-html.js





var inner_html_InnerHtmlDirective = function (_Directive) {
  inherits_default()(InnerHtmlDirective, _Directive);

  function InnerHtmlDirective() {
    classCallCheck_default()(this, InnerHtmlDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  InnerHtmlDirective.prototype.update = function update(newValue) {
    this.node.innerHTML = newValue;
  };

  return InnerHtmlDirective;
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/inner-text.js





var inner_text_InnerTextDirective = function (_Directive) {
  inherits_default()(InnerTextDirective, _Directive);

  function InnerTextDirective() {
    classCallCheck_default()(this, InnerTextDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  InnerTextDirective.prototype.update = function update(newValue) {
    this.node.innerText = newValue;
  };

  return InnerTextDirective;
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/prevent.js




var prevent__dec, prevent__class;




var prevent_PreventDirective = (prevent__dec = decorators_meta({
  level: directive_Directive.levels.PREVENT,
  final: true
}), prevent__dec(prevent__class = function (_Directive) {
  inherits_default()(PreventDirective, _Directive);

  function PreventDirective() {
    classCallCheck_default()(this, PreventDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  return PreventDirective;
}(directive_Directive)) || prevent__class);

// CONCATENATED MODULE: ./src/template/directives/id.js




var id__dec, id__class;





var id_IdDirective = (id__dec = decorators_meta({
  literal: true
}), id__dec(id__class = function (_Directive) {
  inherits_default()(IdDirective, _Directive);

  function IdDirective() {
    classCallCheck_default()(this, IdDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  IdDirective.prototype.update = function update(id) {
    this.scope[id] = this.node.target;
  };

  return IdDirective;
}(directive_Directive)) || id__class);

// CONCATENATED MODULE: ./src/template/directives/show.js





var show_ShowDirective = function (_Directive) {
  inherits_default()(ShowDirective, _Directive);

  function ShowDirective() {
    classCallCheck_default()(this, ShowDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  ShowDirective.prototype.update = function update(value) {
    this.node.style.display = value ? '' : 'none';
  };

  return ShowDirective;
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/model/select.js




var select__dec, select__class;







var select_SelectModelDirective = (select__dec = decorators_meta({
  final: true
}), select__dec(select__class = function (_Directive) {
  inherits_default()(SelectModelDirective, _Directive);

  function SelectModelDirective() {
    var _temp, _this, _ret;

    classCallCheck_default()(this, SelectModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.changeHandler = function () {
      if (isNull(_this.scope)) return;
      var selectedOptions = _this.node.selectedOptions;
      var value = _this.node.multiple ? [].slice.call(selectedOptions).map(function (option) {
        return option.value;
      }, _this) : selectedOptions[0].value;
      _this.backExpr(new Scope(_this.scope, {
        $value: value
      }));
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
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
}(directive_Directive)) || select__class);

// CONCATENATED MODULE: ./src/template/directives/model/editable.js







var editable_EditableModelDirective = function (_Directive) {
  inherits_default()(EditableModelDirective, _Directive);

  function EditableModelDirective() {
    var _temp, _this, _ret;

    classCallCheck_default()(this, EditableModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.inputHandler = function () {
      if (isNull(_this.scope)) return;
      _this.backExpr(new Scope(_this.scope, {
        $value: _this.node.innerHTML
      }));
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
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
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/model/input.js







var input_InputModelDirective = function (_Directive) {
  inherits_default()(InputModelDirective, _Directive);

  function InputModelDirective() {
    var _temp, _this, _ret;

    classCallCheck_default()(this, InputModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.inputHandler = function () {
      if (isNull(_this.scope)) return;
      _this.backExpr(new Scope(_this.scope, {
        $value: _this.node.value
      }));
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
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
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/model/radio.js







var radio_RadioModelDirective = function (_Directive) {
  inherits_default()(RadioModelDirective, _Directive);

  function RadioModelDirective() {
    var _temp, _this, _ret;

    classCallCheck_default()(this, RadioModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.changeHandler = function () {
      if (isNull(_this.scope)) return;
      _this.backExpr(new Scope(_this.scope, {
        $value: _this.node.value
      }));
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
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
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/model/checkbox.js







var checkbox_CheckBoxModelDirective = function (_Directive) {
  inherits_default()(CheckBoxModelDirective, _Directive);

  function CheckBoxModelDirective() {
    var _temp, _this, _ret;

    classCallCheck_default()(this, CheckBoxModelDirective);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, _Directive.call.apply(_Directive, [this].concat(args))), _this), _this.changeHandler = function () {
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
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
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
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/model/prop.js








var prop_PropModelDirective = function (_Directive) {
  inherits_default()(PropModelDirective, _Directive);

  function PropModelDirective() {
    classCallCheck_default()(this, PropModelDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
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
      throw new error_InternalError('Directive `model:' + this.bindProp + '` cannot be used on `' + this.node.tagName + '`');
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
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/model/index.js









function DirectiveFactary(options) {
  var node = options.node;
  var tagName = node.tagName;
  if (options.decorates[0]) {
    return new prop_PropModelDirective(options);
  } else if (tagName == 'INPUT') {
    var type = node.getAttribute('type');
    if (type == 'radio') {
      return new radio_RadioModelDirective(options);
    } else if (type == 'checkbox') {
      return new checkbox_CheckBoxModelDirective(options);
    } else {
      return new input_InputModelDirective(options);
    }
  } else if (tagName == 'TEXTAREA') {
    return new input_InputModelDirective(options);
  } else if (tagName == 'SELECT') {
    return new select_SelectModelDirective(options);
  } else if (node.isContentEditable) {
    return new editable_EditableModelDirective(options);
  } else {
    throw new error_InternalError('Directive `model` cannot be used on `' + tagName + '`');
  }
};

//手动添加 meta 信息
DirectiveFactary.meta = {
  level: directive_Directive.levels.ATTRIBUTE
};

/* harmony default export */ var directives_model = (DirectiveFactary);
// CONCATENATED MODULE: ./src/template/directives/focus.js





var focus_FocusDirective = function (_Directive) {
  inherits_default()(FocusDirective, _Directive);

  function FocusDirective() {
    classCallCheck_default()(this, FocusDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
  }

  FocusDirective.prototype.execute = function execute(scope) {
    var _this2 = this;

    var state = this.expression(scope);
    setTimeout(function () {
      if (state) _this2.node.focus();else _this2.node.blur();
    }, 0);
  };

  return FocusDirective;
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/attribute.js




var attribute__dec, attribute__class;





/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */
var attribute_AttributeDirective = (attribute__dec = decorators_meta({
  level: directive_Directive.levels.ATTRIBUTE,
  prefix: false,
  literal: true,
  remove: false
}), attribute__dec(attribute__class = function (_Directive) {
  inherits_default()(AttributeDirective, _Directive);

  function AttributeDirective() {
    classCallCheck_default()(this, AttributeDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
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
}(directive_Directive)) || attribute__class);

// CONCATENATED MODULE: ./src/template/directives/text.js




var text__dec, text__class;





var text_TextDirective = (text__dec = decorators_meta({
  type: directive_Directive.types.ELEMENT,
  prefix: false
}), text__dec(text__class = function (_Directive) {
  inherits_default()(TextDirective, _Directive);

  function TextDirective() {
    classCallCheck_default()(this, TextDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
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
}(directive_Directive)) || text__class);

// CONCATENATED MODULE: ./src/template/directives/class.js






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

var class_ClassNameDirective = function (_Directive) {
  inherits_default()(ClassNameDirective, _Directive);

  function ClassNameDirective() {
    classCallCheck_default()(this, ClassNameDirective);

    return possibleConstructorReturn_default()(this, _Directive.apply(this, arguments));
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
}(directive_Directive);


// CONCATENATED MODULE: ./src/template/directives/index.js












 //处理所有未知 attr
 //处理所有 text 
 //处理 className

/* harmony default export */ var template_directives = ({
  '#text': text_TextDirective,
  '*': attribute_AttributeDirective,
  'if': if_IfDirective,
  'class': class_ClassNameDirective,
  each: each_EachDirective, prop: prop_PropDirective, attr: attr_AttrDirective, on: on_OnDirective, html: inner_html_InnerHtmlDirective, text: inner_text_InnerTextDirective,
  prevent: prevent_PreventDirective, id: id_IdDirective, show: show_ShowDirective, model: directives_model, focus: focus_FocusDirective
});
// CONCATENATED MODULE: ./src/template/compiler.js








var DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */

var compiler_Compiler = function () {

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Compiler(options) {
    classCallCheck_default()(this, Compiler);

    options = options || {};
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.elementDirectives = {};
    this.attributeDirectives = {};
    this.registerDirectives(extends_default()({}, template_directives, options.directives));
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
      if (directive.meta.type == directive_Directive.types.ELEMENT) {
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
        expression: meta.literal ? attribute.value : template_expression(attribute.value, meta.mixed),
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
        return handler.final = true;
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
    if (!node) throw new error_InternalError('Invalid node for compile');
    options = options || {};
    //实例托管 node 实例   
    node = new node_Node(node);
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


// CONCATENATED MODULE: /private/var/folders/7d/bf741r6j1psb64d_yd0zn_mh0000gn/T/a6a012e4b2330a1d222c55e1ab9811ca.js
/* harmony default export */ var a6a012e4b2330a1d222c55e1ab9811ca = ({});
// CONCATENATED MODULE: ./src/template/template.js









/**
 * 模板类
 * 可能通过 element 作为参数，创建一个模板实例
 */

var template_Template = function (_EventEmitter) {
  inherits_default()(Template, _EventEmitter);

  /**
   * 构建一个模板板实例
   * @param {HTMLNode} element HTML 元素
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Template(element, options) {
    classCallCheck_default()(this, Template);

    var _this = possibleConstructorReturn_default()(this, _EventEmitter.call(this));

    options = options || {};
    _this.options = options;
    _this.element = element;
    _this.compiler = options.compiler || new compiler_Compiler(options);
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

    if (a6a012e4b2330a1d222c55e1ab9811ca.debug || this.sync) {
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
    this.observer = new src_observer(scope, {
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
}(src_events);



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
    return typeof input === 'undefined' ? 'undefined' : typeof_default()(input);
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
// CONCATENATED MODULE: ./src/template/index.js




directive_Directive.directives = template_directives;

template_Template.Directive = directive_Directive;
template_Template.directives = template_directives;

/* harmony default export */ var src_template = (template_Template);
// CONCATENATED MODULE: ./src/watcher/index.js




/**
 * Watcher 类
 * 通过「计算函数」、「执行函数」可以创建一个 Watcher 实例
 */

var watcher_Watcher = function () {

  /**
   * 通过「计算函数」、「执行函数」构建一个 Watcher 实例
   * @param {function} calcor 计算函数
   * @param {function} handler 处理函数
   * @param {boolean} first 是否自动执行第一次
   * @returns {void} 无返回
   */
  function Watcher(calcor, handler, first) {
    classCallCheck_default()(this, Watcher);

    if (!isFunction(calcor) || !isFunction(handler)) {
      throw new error_InternalError('Invalid parameters');
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
    if (force || !deepEqual(newValue, this.value)) {
      this.handler(newValue, this.value);
    }
    this.value = clone(newValue);
  };

  return Watcher;
}();


// CONCATENATED MODULE: ./src/component/directive.js







var component_directive_Directive = src_template.Directive;

/* harmony default export */ var component_directive = (function (options) {
  var _dec, _class;

  var ComponentDirective = (_dec = decorators_meta(extends_default()({}, options, {
    type: component_directive_Directive.types.ELEMENT,
    literal: true,
    final: true,
    remove: false,
    level: component_directive_Directive.levels.ELEMENT
  })), _dec(_class = function (_Directive) {
    inherits_default()(ComponentDirective, _Directive);

    function ComponentDirective(options) {
      classCallCheck_default()(this, ComponentDirective);

      return possibleConstructorReturn_default()(this, _Directive.call(this, options));
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
  }(component_directive_Directive)) || _class);

  return ComponentDirective;
});
// CONCATENATED MODULE: ./src/component/component.js






var component__dec, component__class;








var component_directives = src_template.directives;

/**
 * 组件类
 * 用于定义一个新的组件
 * @param {Object} classOpts 类选项
 * @returns {Component} 组件类
 */

var component_Component = (component__dec = decorators_template('<span>Error: Invaild template</span>'), component__dec(component__class = function (_Entity) {
  inherits_default()(Component, _Entity);

  /**
   * 组件类构造函数
   * @param {object} options 实例选项
   * @returns {void} 无返回
   */
  function Component(options) {
    classCallCheck_default()(this, Component);

    var _this = possibleConstructorReturn_default()(this, _Entity.call(this));

    options = options || {};
    _this._processMeta_();
    var meta = _this.meta;
    _this.$setModel(meta.model);
    _this._bindWatches_(meta.watches);
    _this._bindDirectives_(meta.directives);
    _this._bindComponents_(extends_default()({}, Component.components, meta.components, {
      'self': _this.constructor
    }));
    _this._bindEvents_(meta.events);
    utils_final(_this, '$children', []);
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
      _this2.$directives[name] = component_directive({
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
   * @param {string|function} calcer 计算函数或路径
   * @param {function} handler 处理函数
   * @returns {void} 无返回
   */


  Component.prototype.$watch = function $watch(calcer, handler) {
    var _this6 = this;

    this.$watchers = this.$watchers || [];
    var calcerFunc = isFunction(calcer) ? calcer : function () {
      return getByPath(_this6, calcer);
    };
    var handlerFunc = isFunction(handler) ? handler : getByPath(this, handler);
    var watcher = new watcher_Watcher(calcerFunc, handlerFunc.bind(this));
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
      meta.template = node_Node.parse(meta.template);
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
      throw new error_InternalError('Invalid component template');
    }
    this.$element = element;
    utils_final(this, '$node', new node_Node(element));
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
    var template = new src_template(this.$element, {
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

  createClass_default()(Component, [{
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
}(entity_Entity)) || component__class);

// CONCATENATED MODULE: ./src/component/components/view.js





var view__dec, view__class, view__class2, view__temp;






/**
 * 内置视图组件
 * 可以加载并显示其它组件，并可以指定「转场效果」
 */
var view_View = (view__dec = decorators_template('<div></div>'), view__dec(view__class = (view__temp = view__class2 = function (_Component) {
  inherits_default()(View, _Component);

  function View() {
    classCallCheck_default()(this, View);

    return possibleConstructorReturn_default()(this, _Component.apply(this, arguments));
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

  createClass_default()(View, [{
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
        throw new error_InternalError('Invalid transition');
      }
    }
  }]);

  return View;
}(component_Component), view__class2.transition = {
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
}, view__temp)) || view__class);

// CONCATENATED MODULE: ./src/component/components/index.js


/* harmony default export */ var component_components = ({ View: view_View });
// CONCATENATED MODULE: ./src/component/index.js



component_Component.components = component_components;

/* harmony default export */ var src_component = (component_Component);
// CONCATENATED MODULE: ./src/bootstrap.js




function bootstrap(component, mountNode, options) {
  if (!component || !component.meta) {
    throw new error_InternalError('Involid Component');
  }
  options = options || {};
  if (isNull(options.append)) options.append = true;
  if (isFunction(component)) {
    component = new component();
  }
  component.$mount(mountNode, options.append);
  return component;
};
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Directive", function() { return src_Directive; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "meta", function() { return decorators_meta; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "event", function() { return decorators_event; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "model", function() { return decorators_model; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "watch", function() { return watch; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "template", function() { return decorators_template; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "components", function() { return decorators_components; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "dependencies", function() { return dependencies; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "directives", function() { return decorators_directives; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Component", function() { return src_component; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "bootstrap", function() { return bootstrap; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "decorators", function() { return decorators; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "config", function() { return a6a012e4b2330a1d222c55e1ab9811ca; });









var src_Directive = src_template.Directive;

error_InternalError.prefix = _23c5d47e93aeac869a10e176ec75647.name;

bootstrap.Component = src_component;
bootstrap.Directive = src_Directive;
bootstrap.decorators = decorators;
bootstrap.bootstrap = bootstrap;
bootstrap.config = a6a012e4b2330a1d222c55e1ab9811ca;

//持载模板相关对象
copy(decorators, bootstrap);
copy(_23c5d47e93aeac869a10e176ec75647, bootstrap);

bootstrap.component = function (name, component) {
  name = toSplitCase(name);
  if (!component) return src_component.components[name];
  component = isFunction(component) ? component : this.component(component);
  src_component.components[name] = component;
  return component;
};

bootstrap.directive = function (name, directive) {
  name = toSplitCase(name);
  if (!directive) return src_Directive.directives[name];
  directive = isFunction(directive) ? directive : this.directive(directive);
  src_Directive.directives[name] = directive;
  return directive;
};

bootstrap.defineComponent = function () {
  return src_component.extend.apply(src_component, arguments);
};

bootstrap.defineDirective = function () {
  return src_Directive.extend.apply(src_Directive, arguments);
};




window.mokit = bootstrap;
/* harmony default export */ var src = __webpack_exports__["default"] = (bootstrap);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(8);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(52) });


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(27);
var pIE = __webpack_require__(19);
var toObject = __webpack_require__(41);
var IObject = __webpack_require__(39);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(14)(function () {
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(54);
var toAbsoluteIndex = __webpack_require__(55);
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(23);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
__webpack_require__(67);
module.exports = __webpack_require__(33).f('iterator');


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(62)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(42)(String, 'String', function (iterated) {
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var defined = __webpack_require__(22);
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(31);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(32);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(11)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(12);
var getKeys = __webpack_require__(17);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(41);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(30);
var TO_STRING_TAG = __webpack_require__(11)('toStringTag');

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(69);
var step = __webpack_require__(70);
var Iterators = __webpack_require__(30);
var toIObject = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(42)(Array, 'Array', function (iterated, kind) {
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
/* 69 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(80);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(43);
var META = __webpack_require__(74).KEY;
var $fails = __webpack_require__(14);
var shared = __webpack_require__(25);
var setToStringTag = __webpack_require__(32);
var uid = __webpack_require__(18);
var wks = __webpack_require__(11);
var wksExt = __webpack_require__(33);
var wksDefine = __webpack_require__(34);
var enumKeys = __webpack_require__(75);
var isArray = __webpack_require__(76);
var anObject = __webpack_require__(12);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(21);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(31);
var gOPNExt = __webpack_require__(77);
var $GOPD = __webpack_require__(45);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(17);
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
  __webpack_require__(44).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(19).f = $propertyIsEnumerable;
  __webpack_require__(27).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(18)('meta');
var isObject = __webpack_require__(13);
var has = __webpack_require__(7);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(14)(function () {
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(27);
var pIE = __webpack_require__(19);
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(40);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(10);
var gOPN = __webpack_require__(44).f;
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
/* 78 */
/***/ (function(module, exports) {



/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('asyncIterator');


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('observable');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
module.exports = __webpack_require__(4).Object.setPrototypeOf;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(8);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(84).set });


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(13);
var anObject = __webpack_require__(12);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(35)(Function.call, __webpack_require__(45).f(Object.prototype, '__proto__').set, 2);
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
var $Object = __webpack_require__(4).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(31) });


/***/ })
/******/ ]);
});
//# sourceMappingURL=mokit.js.map