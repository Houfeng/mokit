/**
 * 调式控制台
 * @class Console
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = require('./utils');
    var self = exports;

    self.prefix = '[mokit] ';

    /**
     * 是否开启
     * @property {Boolean} enabled
     * @static
     */
    self.enabled = true;

    /**
     * 打印日志信息
     * @method log
     * @param {String} msg 信息
     * @static
     */
    self.log = function(msg) {
        if (self.enabled) console.log(self.prefix + msg);
    };

    /**
     * 打印错误信息
     * @method error
     * @param {String} msg 信息
     * @static
     */
    self.error = function(msg) {
        if (self.enabled) console.error(self.prefix + msg);
    };

    /**
     * 打印信息
     * @method info
     * @param {String} msg 信息
     * @static
     */
    self.info = function(msg) {
        if (self.enabled) console.info(self.prefix + msg);
    };

    /**
     * 打印警告信息
     * @method warn
     * @param {String} msg 信息
     * @static
     */
    self.warn = function(msg) {
        if (self.enabled) console.warn(self.prefix + msg);
    };
});