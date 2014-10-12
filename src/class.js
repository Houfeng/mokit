/**
 * 类型工厂，用来创建一个类型（class）,类似是java中的class关键字。
 * @class Class
 * @module mokit
 */
(function(owner) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = null;

    /**
     * 复制对象
     */
    var copyApply = function(src, tag, scope) {
        tag = tag || {};
        utils.each(src, function(name, item) {
            if (utils.isFunction(item)) {
                tag[name] = function() {
                    return item.apply(scope || this, arguments);
                };
            } else {
                tag[name] = utils.clone(item);
            }
        });
        return tag;
    };

    var rootClass = function() {};

    /**
     * 定义一个class(类)
     * @method create
     * @param {Class} _base 基类（可以省略）
     * @param {Object} _class 类型声明（可以省略，省略_class时,_base就是“类型声明”）
     */
    owner.create = function(_base, _class) {
        if (!_class) {
            _class = _base;
            _base = null;
        };
        _base = _base || rootClass;
        _class = _class || {};
        var _baseInstanse = utils.isFunction(_base) ? new _base() : _base;
        var _classInstanse = utils.isFunction(_class) ? new _class() : _class;
        //创建类型
        var theClass = function() {
            //重置实例，避免不应该出现的共享成员
            copyApply(this, this);
            //调用构造
            if (this.initialize) {
                return this.initialize.apply(this, arguments);
            }
        };
        //处理父子关系，通过prototype将父类成员添加到原型，可以使typeof instanseOf有效;
        theClass.base = _base;
        theClass.prototype = _baseInstanse;
        theClass.prototype.base = copyApply(utils.clone(_baseInstanse), {}, theClass.prototype); //clone一份父类的成员；;
        //定义实例扩展函数
        theClass.extend = function(context) {
            return copyApply(context, this.prototype);
        };
        theClass.copy = function(context) {
            return copyApply(context, this);
        };
        //处理实例成员
        theClass.extend(_classInstanse);
        //处理静态成员
        if (utils.isFunction(_base)) {
            theClass.copy(_base);
        };
        if (utils.isFunction(_class)) {
            theClass.copy(_class);
        };
        //返回创建好的类型
        return theClass;
    };

    //兼容AMD模块
    if (typeof define === 'function' && define.amd) {
        define('$class', ['utils'], function($utils) {
            utils = $utils;
            return owner;
        });
    } else {
        utils = $utils;
    }

})((typeof exports === 'undefined') ? (window.$class = {}) : exports);
//