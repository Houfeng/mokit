/**
 * 本地存储模块
 * @class Store
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var json = require('./json');
    var console = require('./console');

    var socpe = (window.mokitAppName || "mokit") + "://";

    //window.top.__mokit_data_cache__ = window.top.__mokit_data_cache__ || {};
    /**
     * 数据全局缓存对象
     */
    exports.dataCache = {}; //window.top.__mokit_data_cache__;
    /**
     * 添加临时数据
     * @method temp.set
     * @param {String} key 键
     * @param {Object} value 值
     */
    /**
     * 获取临时数据
     * @method temp.get
     * @param {String} key 键
     */
    /**
     * 移除临时数据
     * @method temp.remove
     * @param {String} key 键
     */
    /**
     * 清空临时数据
     * @method temp.clear
     */
    exports.temp = {
        set: function(key, value) {
            key = socpe + key;
            exports.dataCache[key] = value;
        },
        get: function(key) {
            key = socpe + key;
            return exports.dataCache[key];
        },
        remove: function(key) {
            key = socpe + key;
            exports.dataCache[key] = null;
        },
        clear: function() {
            exports.dataCache = {};
        }
    };

    /**
     * 添加会话数据
     * @method session.set
     * @param {String} key 键
     * @param {Object} value 值
     */
    /**
     * 获取会话数据
     * @method session.get
     * @param {String} key 键
     */
    /**
     * 移除会话数据
     * @method session.remove
     * @param {String} key 键
     */
    /**
     * 清空会话数据
     * @method session.clear
     */
    exports.session = {
        set: function(key, value) {
            key = socpe + key;
            if (typeof sessionStorage !== 'undefined') {
                try {
                    sessionStorage.setItem(key, json.stringify(value));
                } catch (ex) {
                    console.error(ex.message);
                }
            }
            exports.temp.set('$sessionData/' + key, value);
        },
        get: function(key) {
            key = socpe + key;
            var value = exports.temp.get(key);
            if (value == null) {
                try {
                    value = json.parse(sessionStorage.getItem(key));
                } catch (ex) {
                    console.error(ex.message);
                }
            }
            return value;
        },
        remove: function(key) {
            key = socpe + key;
            if (typeof sessionStorage !== 'undefined') {
                try {
                    sessionStorage.removeItem(key);
                } catch (ex) {
                    console.error(ex.message);
                }
            }
            exports.temp.remove('$sessionData/' + key);
        },
        clear: function() {
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.clear();
            }
            exports.temp.clear();
        }
    };

    /**
     * 添加本地数据
     * @method local.set
     * @param {String} key 键
     * @param {Object} value 值
     */
    /**
     * 获取本地数据
     * @method local.get
     * @param {String} key 键
     */
    /**
     * 移除本地数据
     * @method local.remove
     * @param {String} key 键
     */
    /**
     * 清空本地数据
     * @method local.clear
     */
    exports.local = {
        set: function(key, value) {
            key = socpe + key;
            if (typeof localStorage !== 'undefined') {
                try {
                    localStorage.setItem(key, json.stringify(value));
                } catch (ex) {
                    console.error(ex.message);
                }
            }
            exports.temp.set('$localData/' + key, value);
        },
        get: function(key) {
            key = socpe + key;
            var value = exports.temp.get(key);
            if (value == null) {
                try {
                    value = json.parse(localStorage.getItem(key));
                } catch (ex) {
                    console.error(ex.message);
                }
            }
            return value;
        },
        remove: function(key) {
            key = socpe + key;
            if (typeof localStorage !== 'undefined') {
                try {
                    localStorage.removeItem(key);
                } catch (ex) {
                    console.error(ex.message);
                }
            }
            exports.temp.remove('$localData/' + key);
        },
        clear: function() {
            if (typeof localStorage !== 'undefined') {
                localStorage.clear();
            }
            exports.temp.clear();
        }
    };

});