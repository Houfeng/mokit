/**
 * 控制器
 * @class Controller
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $class = require("./class");
    var console = require("./console");
    var self = exports;

    /**
     * 控制器基类
     */
    var Controller = $class.create({
        /**
         * 控制器默认action (需要在这里初始化view)
         * @method index
         */
        //index: function() {},

        /**
         * 设置当前 Controller 的 rootView
         * @method create
         * @param {Class} base 控制器基类
         * @param {Object} context 控制器的声明
         * @static
         */
        //setView: function() {},

        /**
         * 根视图
         * @property rootView
         */
        //rootView:null
    });

    /**
     * 创建一个控制器，继承自控制器基类
     * @method create
     * @param {Class} base 控制器基类
     * @param {Object} context 控制器的声明
     * @static
     */
    exports.create = function(base, context) {
        if (!context) {
            context = base;
            base = Controller;
        }
        return $class.create(base, context);
    };
    
    exports.Controller = Controller;
    
});