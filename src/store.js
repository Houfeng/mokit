/**
 * 本地存储模块
 * @class Store
 * @module mokit
 */
define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var json = require('./json');

    //window.top.__mokit_data_cache__ = window.top.__mokit_data_cache__ || {};

    /**
	 * 数据全局缓存对象
	 */
    exports.dataCache = {};//window.top.__mokit_data_cache__;

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
        set: function (key, value) {
            exports.dataCache[key] = value;
        },
        get: function (key) {
            return exports.dataCache[key];
        },
        remove: function (key) {
            exports.dataCache[key] = null;
        },
        clear: function () {
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
        set: function (key, value) {
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem(key, json.stringify(value));
            }
            exports.temp.set('sessionData:' + key, value);
        },
        get: function (key) {
            var value = exports.temp.get(key);
            if (value == null) {
                value = json.parse(sessionStorage.getItem(key));
            }
            return value;
        },
        remove: function (key) {
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.removeItem(key);
            }
            exports.temp.remove('sessionData:' + key);
        },
        clear: function () {
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
        set: function (key, value) {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, json.stringify(value));
            }
            exports.temp.set('localData:' + key, value);
        },
        get: function (key) {
            var value = exports.temp.get(key);
            if (value == null) {
                value = json.parse(localStorage.getItem(key));
            }
            return value;
        },
        remove: function (key) {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(key);
            }
            exports.temp.remove('localData:' + key);
        },
        clear: function () {
            if (typeof localStorage !== 'undefined') {
                localStorage.clear();
            }
            exports.temp.clear();
        }
    };

});