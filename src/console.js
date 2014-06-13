/**
 * 调式控制台
 * @class Console
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = require('./utils');

    var target = '[mokit] ';

    /**
     * 是否开启
     * @property {Boolean} enabled
     * @static
     */
    exports.enabled = true;

    /**
     * 是否启用浏览器调试工具
     * @property {Boolean} userDebugger
     * @static
     */
    exports.useDebugger = true;

    var customConsole = null;
    /**
     * 在不支持console的平台上模拟console
     */
    var getCustomConsole = function() {
        if (!customConsole) {
            var consoleWindow = null;
            var out = function(msg, type, color) {
                if (!consoleWindow) {
                    consoleWindow = window.open('about:blank', '__console', 'width=600,height=300');
                }
                consoleWindow.document.title = 'console';
                color = color || '#000';
                consoleWindow.document.write('<strong style="color:' + color + ';">[' + type + ']</strong><div style="margin-bottom:8px;">' + msg + '</div>');
                consoleWindow.document.body.scrollTop = consoleWindow.document.body.offsetHeight;
            };
            customConsole = {
                log: function(msg) {
                    out(msg, 'log', 'black');
                },
                error: function(msg) {
                    out(msg, 'error', 'red');
                },
                info: function(msg) {
                    out(msg, 'info', 'blue');
                },
                warn: function(msg) {
                    out(msg, 'warn', 'orange');
                }
            };
        }
        return customConsole;
    };

    /**
     * 获取console
     */
    var getConsole = function() {
        if (window.console && exports.useDebugger) {
            return window.console;
        } else {
            return getCustomConsole();
        }
    };

    /**
     * 打印日志信息
     * @method log
     * @param {String} msg 信息
     * @static
     */
    exports.log = function(msg) {
        if (exports.enabled) getConsole().log(target + msg);
    };

    /**
     * 打印错误信息
     * @method error
     * @param {String} msg 信息
     * @static
     */
    exports.error = function(msg) {
        if (exports.enabled) getConsole().error(target + msg);
    };

    /**
     * 打印信息
     * @method info
     * @param {String} msg 信息
     * @static
     */
    exports.info = function(msg) {
        if (exports.enabled) getConsole().info(target + msg);
    };

    /**
     * 打印警告信息
     * @method warn
     * @param {String} msg 信息
     * @static
     */
    exports.warn = function(msg) {
        if (exports.enabled) getConsole().warn(target + msg);
    };
});