/**
 * 数据模型
 * @class Model
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = require("./utils");
    var event = require("./event");
    var store = require("./store");
    var $class = require("./class");
    var linq = require("./linq");
    var langMgr = require('./language');

    var applyModel = function(model) {
        model.views = model.views || [];
        /**
         * 向模型注册一个view
         * @method registerView
         * @param  {View} view 关联的视图（view）
         * @return {void}      无返回值
         */
        model.registerView = function(view) {
            model.views.push(view);
        };
        /**
         * 从模型移除一个view
         * @method removeView
         * @param  {View} view 已注册的视图
         * @return {void}      无返回值
         */
        model.removeView = function(view) {
            var _views = [];
            utils.each(model.views, function(i, viewItem) {
                if (viewItem != view)
                    _views.push(viewItem);
            });
            model.views = _views;
        };
        /**
         * 通知所有关联视图更新呈现
         * @method notifyRender
         */
        model.notifyRender = function() {
            utils.each(model.views, function(i, viewItem) {
                viewItem.render();
            });
        };
    };

    /**
     * 模型基类
     */
    var Model = exports.Model = $class.create(function() {
        this.initialize = function() {
            var self = this;
            self.guid = utils.newGuid();
            applyModel(self);
        };
    });

    applyModel(Model);

    /**
     * 创建一个数据模型
     * @method create
     * @param {Model} base 父模型
     * @param {Object} context 模型定义
     * @static
     */
    exports.create = function(base, context) {
        if (!context) {
            context = base;
            base = Model;
        }
        context = context || {};
        return $class.create(base, context);
    };

    exports.Model = Model;

});