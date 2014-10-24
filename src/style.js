/**
 * 风格主题管理模块
 * @module mokit
 * @class Style
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery');
    var utils = require('./utils');
    var store = require('./store');
    var $event = require('./event');

    var styleTable = store.dataCache["$style"] = {};

    exports.events = $event.use(exports);

    exports.storeKey = "mokit://style/current-name";
    var currentName = null;
    utils.defineProperty(exports, 'currentName', {
        get: function() {
            currentName = currentName || store.local.get('style:' + exports.storeKey);
            return currentName;
        },
        set: function(name) {
            currentName = name;
            return currentName;
            //return store.local.set('style:' + exports.storeKey, name);
        }
    }, true);

    utils.defineProperty(exports, 'defaultName', {
        get: function() {
            return Object.getOwnPropertyNames(styleTable)[0];
        }
    }, true);

    /**
     * 添加风格
     * @method addStyle
     * @param {Object} styles 风格配置表
     * @param {Module} srcModule 当前模块
     * @static
     */
    exports.addStyle = function(styles, srcModule) {
        utils.each(styles, function(name) {
            styleTable[name] = (srcModule && srcModule.resovleUri) ? srcModule.resovleUri(this) : this;
        });
    };

    /**
     * 设置风格
     * @method setStyle
     * @param {String} name 设置当前风格
     * @static
     */
    exports.setStyle = function(name, callback) {
        if (!utils.isString(name)) return callback();
        if (styleTable[name]) {
            module.unload(styleTable[exports.currentName()]);
            require(styleTable[name], function(rs) {
                exports.currentName(name);
                exports.events.call("change", {
                    name: name,
                    style: rs
                });
                utils.async(function() {
                    if (callback) callback(name, rs);
                }, 45);
            });
        } else {
            console.error('style "' + name + '" not found.');
        }
    };

    exports.save = function() {
        return store.local.set(exports.storeKey, currentName);
    };

    exports.clear = function() {
        return store.local.set(exports.storeKey, "");
    };
});