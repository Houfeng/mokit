/**
 * 控制器
 * @class Controller
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $class = require("./class"),
        console = require("./console");

    /**
     * 控制器基类
     */
    var Controller = exports.Controller = $class.create({
        /**
         * 控制器默认action (通常在些初始化view)
         * @method index
         */
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

});