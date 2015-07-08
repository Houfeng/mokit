/**
 * 语言管理器，用来实现本地化。
 * @class Language
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = require('./utils');
    var store = require('./store');
    var $event = require('./event');
    var console = require('./console');
    var self = exports;

    self.events = $event.use(self);

    self.storeKey = "language/current-name";
    self.canceKey = "language/table";

    //语言表
    var langeuageTable = store.dataCache[self.canceKey] = self.languages = {};
    var currentName = null;


    /**
     * currentName属性
     */
    utils.defineProperty(self, 'currentName', {
        get: function() {
            currentName = currentName || store.local.get(self.storeKey);
            return currentName;
        },
        set: function(name) {
            currentName = name;
            return currentName;
            //return store.local.set('language:current-name', name);
        }
    }, true);

    var _current = null;
    utils.defineProperty(exports, 'current', {
        get: function() {
            return _current;
        },
        set: function(value) {
            return _current = value;
        }
    }, true);

    utils.defineProperty(self, 'defaultName', {
        get: function() {
            var browserLanguage = (navigator.language || '').toLowerCase();
            if (langeuageTable[browserLanguage]) {
                return browserLanguage;
            } else {
                return Object.getOwnPropertyNames(langeuageTable)[0];
            }
        }
    }, true);

    /**
     * 添加系统可用本地化语言配置表
     * @method addLanguage
     * @param {Object} languages 语言配置对象
     * @param {Module} srcModule 当前模块
     * @static
     */
    self.addLanguage = function(languages, srcModule) {
        utils.each(languages, function(name) {
            langeuageTable[name] = (srcModule && srcModule.resovleUri) ? srcModule.resovleUri(this) : this;
        });
    };

    /**
     * 设置语言
     * @method setLanguage
     * @param {String} name 语言表名称
     * @param {Function} callback 切换完成回调
     * @static
     */
    self.setLanguage = function(name, callback) {
        if (!utils.isString(name)) return;
        var languageUri = langeuageTable[name];
        if (languageUri) {
            require(languageUri, function(rs) {
                self.current(rs);
                self.currentName(name);
                self.events.call('change', {
                    name: name,
                    lang: rs
                });
                if (callback) callback(name, rs);
            })
        } else {
            console.error('language "' + name + '" not found.');
        }
    };

    self.save = function() {
        return store.local.set(self.storeKey, currentName);
    };

    self.clear = function() {
        return store.local.set(self.storeKey, "");
    };
});