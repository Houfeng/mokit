/**
 * 视图
 * @module mokit
 * @class View
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery');
    var touch = require('./touch');
    var $class = require("./class");
    var tp = require('./tp');
    var utils = require('./utils');
    var ajax = require('./ajax');
    var json = require('./json');
    var $model = require('./model');
    var store = require('./store');
    var Task = require('./task');
    var console = require('./console');
    var language = require('./language');
    var $event = require('./event');
    var rootContainer = exports.rootContainer = $(document.body);

    /**
     * 视图加载是否显示蒙板
     */
    exports.showMask = false;

    /**
     * 扩展模板引擎
     */
    tp.extend(utils);

    /**
     * 模板类型
     */
    var templateType = exports.templateType = {
        uri: 'uri',
        element: 'element',
        content: 'content'
    };

    /**
     * 模板编译缓存
     */
    var templateCache = store.dataCache;

    /**
     * 获取模板内容
     * @param  {String}   tplType  模板类型
     * @param  {String}   tpl      模板
     * @param  {Function} callback 加载完成回调函数
     * @return {NULL}              无返值
     */
    var loadTemplate = function(tplType, tpl, callback) {
        if (!utils.isFunction(callback)) return;
        if (utils.isNull(tpl)) {
            console.error('编译模板错误');
        }
        tplType = tplType || templateType.uri;
        if (tplType == templateType.element) {
            callback($(tpl).html());
        } else if (tplType == templateType.uri) {
            ajax.get({
                url: tpl,
                callback: callback,
                dataType: 'text',
                noMask: !exports.showMask
            });
        } else {
            callback(tpl);
        }
    };

    /**
     * 编译模板
     */
    var complieTemplate = function(tplType, tpl, callback) {
        if (!utils.isFunction(callback)) return;
        if (utils.isNull(tpl)) console.error('编译模板错误');
        var cacheKey = tpl.split('?')[0].split('#')[0];
        if (templateCache[cacheKey]) {
            if (callback) callback(templateCache[cacheKey]);
        } else {
            loadTemplate(tplType, tpl, function(content) {
                templateCache[cacheKey] = tp.compile(content);
                if (callback) callback(templateCache[cacheKey]);
            });
        }
    };

    /**
     * 获取一个子模型对象
     * @param  {Object} root 源模型对象
     * @param  {Object} path 子模型对象路径
     * @return {NULL}        取到的子模型对象
     */
    var getModel = function(root, path) {
        if (!root || !path) return null;
        var nameList = path.split('.');
        utils.each(nameList, function(i, key) {
            root = (key && root[key]) ? root[key] : null;
        });
        return root;
    };

    /**
     * 设置一个子模型对象
     * @param  {Object} root  源模型对象
     * @param  {Object} path  子模型对象路径
     * @param  {Object} value 子对象
     * @return {NULL}         无返回值
     */
    var setModel = function(root, path, value) {
        if (root === null || path === null || value === null) return;
        var nameList = path.split('.');
        utils.each(nameList, function(i, key) {
            if (i < nameList.length - 1) {
                if (key && !root[key]) {
                    root[key] = new $model.Model();
                }
                root = root[key];
            } else {
                root[key] = value;
            }
        });
    };

    /**
     * 解析事件表达式
     */
    var parseEventExpr = function(expr) {
        var rs = {};
        var eventParts = expr.split('>');
        rs.eventName = (eventParts[0] || '');
        var methodParts = (eventParts[1] || '').split(':');
        rs.methodName = (methodParts[0] || '');
        rs.methodArgs = (methodParts[1] || '').split(',');
        //如果方法名包括‘!’则认为是View方法，否则是Controllor的Action
        if (utils.contains(rs.methodName, '!')) {
            rs.isViewMethod = true;
            rs.methodName = rs.methodName.toString().replace('!', '');
        }
        return rs;
    };

    /**
     * 解析绑定表达式
     */
    var parseBindExpr = function(expr) {
        var rs = {};
        var bindParts = expr.split('<');
        rs.filedName = (bindParts[1] || '');
        var attrParts = (bindParts[0] || '').split(':');
        rs.attrName = (attrParts[0] || '');
        rs.attrArg = (attrParts[1] || '');
        return rs;
    };

    /**
     * 视图基类，mokit 所有视图都需要继承这个此类
     */
    var View = $class.create(function() {

        /**
         * 视图模板型型
         * @property template
         */
        this.templateType = '';

        /**
         * 视图所使用的模板（URL或模板内容）
         * @property template
         */
        this.template = '';

        /**
         * 视图绑定的 ‘对象模型’
         * @property model
         */
        this.model = null;

        /**
         * 管理视图的 Controller
         * @property controller
         */
        this.controller = null;

        /**
         * 视图UI对角
         * @property ui
         */
        this.ui = null;

        /**
         * 视图的元素映射对象
         * 格式 {'name':'CSS3 选择器',...}
         * @property el
         */
        this.el = null;

        /**
         * 视图的名称（暂无用途）
         * @property name
         */
        this.name = '';

        /**
         * 在视图的容器
         * @property container
         */
        this.container = null;

        /**
         * 视图构造函数
         * @method initialize
         * @param  {Object} option 构造选项
         * @return {NULL}          无返回值
         */
        this.initialize = function(option) {
            var self = this;
            option = option || {};
            self.id = option.id || utils.newGuid();
            self.model = option.model || self.model || {};
            self.controller = option.controller || self.controller || {};
            self.template = option.template || self.template || '';
            self.templateType = option.templateType || self.templateType || templateType.uri;
            self.options = option.options || self.options || {}; //options 是用json控制视图行为或外观的
            if (self.model.registerView) {
                self.model.registerView(self);
            }
        };

        /**
         * 设置视图当前模型
         * @method setModel
         * @param {Model} model 模型
         */
        this.setModel = function(model) {
            var self = this;
            self.model = model;
        };

        /**
         * 移除一个元素事件绑定
         */
        this.removeElementEvent = function(elements, name, handler) {
            elements.each(function(i, element) {
                $event(element).off(name, handler);
            });
        };

        /**
         * 添加一个元素事件绑定
         */
        this.addElementEvent = function(elements, name, handler) {
            elements.each(function(i, element) {
                $event(element).on(name, handler);
            });
        };

        /**
         * 解除事件绑定
         */
        this.unbindEvent = function() {
            var view = this;
            if (!view.el) return;
            utils.each(view.el, function(name, elements) {
                view.removeElementEvent(elements);
            });
        };

        /**
         * 绑定所有 data-event 形式的元素事件
         */
        this.bindEvent = function() {
            var view = this;
            //查找所有事件绑定元素
            var elements = view.ui.find("[data-event]");
            if (view.ui.attr('data-event')) {
                elements.splice(0, 0, view.ui[0]); //将UI最顶层容器也加入元素组中
            }
            elements.each(function() {
                var element = $(this);
                //将 data-event 元素也放入 el 属性，以备清除事件
                var elementId = element.attr("id");
                if (elementId == null) {
                    elementId = utils.newGuid();
                    element.attr("id", "event:" + elementId);
                }
                view.el[elementId] = element;
                //获取将绑定的事件列表
                var eventItems = element.attr('data-event');
                if (!eventItems) return;
                eventItems = eventItems.split(';');
                //遍历某一元素的事件列表
                element.view = view;
                utils.each(eventItems, function(i, exprStr) {
                    var expr = parseEventExpr(exprStr);
                    var eventTarget = expr.isViewMethod ? view : view.controller;
                    var eventHandler = eventTarget[expr.methodName];
                    if (eventHandler) {
                        //添加元素事件
                        view.addElementEvent(element, expr.eventName, function(context) {
                            var expr = parseEventExpr(exprStr);
                            context.$element = element;
                            context.element = element[0];
                            context.view = element.view;
                            context.routeData = element.view.controller.route.routeData;
                            expr.methodArgs.reverse();
                            expr.methodArgs.push(context);
                            expr.methodArgs.reverse();
                            var rs = eventHandler.apply(eventTarget, expr.methodArgs);
                            expr = null;
                            return rs;
                        });
                    } else {
                        console.error((expr.isViewMethod ? 'method' : 'action') + ' "' + expr.methodName + '" not found');
                    }
                });
            });
        };

        /**
         * 绑定 data-data 形式的数据绑定
         */
        this.bindData = function() {
            var view = this;
            var elements = view.ui.find("[data-bind]");
            if (view.ui.attr('data-bind')) {
                elements.splice(0, 0, view.ui[0]); //将UI最顶层容器也加入元素组中
            }
            elements.each(function() {
                var element = $(this);
                var bindItems = element.attr('data-bind');
                if (!bindItems) return;
                bindItems = bindItems.split(';');
                utils.each(bindItems, function(i, expr) {
                    expr = parseBindExpr(expr);
                    if (element[expr.attrName]) {
                        var filed = getModel(view.model, expr.filedName);
                        if (expr.attrName && expr.attrArg) {
                            element[expr.attrName](expr.attrArg, filed);
                        } else {
                            element[expr.attrName](filed);
                        }
                    }
                });
            });
        };

        /**
         * 更新模型
         */
        this.updateModel = function() {
            var view = this;
            if (!view || !view.ui) return;
            var elements = view.ui.find("[data-bind]");
            if (view.ui.attr('[data-bind]')) { //将UI最顶层容器也加入元素组中
                elements.splice(0, 0, view.ui[0]);
            }
            elements.each(function() {
                var element = $(this);
                var bindItems = element.attr('data-bind');
                if (!bindItems) return;
                bindItems = bindItems.split(';');
                utils.each(bindItems, function(i, expr) {
                    expr = parseBindExpr(expr);
                    if (element[expr.attrName]) {
                        if (expr.attrName && expr.attrArg) {
                            setModel(view.model, expr.filedName, element[expr.attrName](expr.attrArg));
                        } else {
                            setModel(view.model, expr.filedName, element[expr.attrName]());
                        }
                    }
                });
            });
            return view.model;
        };

        /**
         * 处理子视图
         */
        this.renderChildView = function() {
            var view = this;
            view.children = view.children || {};
            var childs = view.ui.find('[data-view]');
            var _context = {
                'view': view
            };
            if (childs.length < 1) {
                if (view.onChildRender) view.onChildRender(_context);
                return;
            }
            var task = Task.create();
            childs.each(function() {
                var childHolder = $(this);
                task.add(function(done) {
                    var childUri = childHolder.attr('data-view');
                    if (!childUri) {
                        return done();
                    }
                    //取子视图Id及子模型
                    var childId = childHolder.attr('id');
                    if (utils.isNull(childId)) {
                        childId = utils.newGuid();
                        childHolder.attr('id', childId);
                    }
                    var childModelPath = childHolder.attr('data-model') || '';
                    var childModel = getModel(view.model, childModelPath) || view.model;
                    //取子视图选项
                    var childOptionsJson = childHolder.attr('data-options') || '{}';
                    var childOptions = json.parse(childOptionsJson);
                    //如果已存在
                    if (view.children[childId]) {
                        //view.children[childId].model = childModel;
                        view.children[childId].container = childHolder;
                        view.children[childId].render(childHolder, done);
                        return;
                    };
                    //如果不存在
                    childUri = module.resovleUri(childUri, view.templateType == templateType.uri ? view.template : location.href);
                    require(childUri, function(ChildView) {
                        view[childId] = view.children[childId] = new ChildView({
                            id: childId,
                            model: childModel,
                            controller: view.controller,
                            options: childOptions
                        });
                        view.children[childId].parent = view;
                        view.children[childId].root = view.root || view;
                        view.children[childId].container = childHolder;
                        view.children[childId].render(childHolder, done);
                    });
                });
            });
            task.end(function() {
                /**
                 * 在所有子视图呈现完成时
                 * @event onChildRender
                 */
                if (view.onChildRender) view.onChildRender(_context);
            });
        };

        /**
         * 移除所有子视图
         */
        this.removeChildView = function() {
            var view = this;
            if (!view.children) return;
            utils.each(view.children, function(childId, child) {
                if (child && child.remove) child.remove();
            });
        };

        /**
         * 设置页面标题
         */
        this.setPageTitle = function() {
            var view = this;
            if (!view || !view.ui) return;
            if (view.ui.attr('data-role') != 'page') return;
            var title = view.ui.attr('data-title');
            if (title) document.title = title;
        }

        /**
         * 按照字典映射元素
         */
        this.mapElements = function() {
            var view = this;
            if (!view || !view.ui) return;
            var maps = view.el;
            view.el = {};
            utils.each(maps, function(name, expr) {
                view.el[name] = view.ui.find(expr);
            });
        };

        /**
         * 呈现一个视图
         * @method render
         * @param  {Object}   container 容器(省略时自动在原有位置重绘)
         * @param  {Function} callback  完成呈现回调
         * @return {NULL}               无返回值
         */
        this.render = function(container, callback) {
            var self = this;
            /**
             * 在视图初始化前
             * @event onPreInit
             */
            if (self.onPreInit) self.onPreInit({
                view: self
            });
            complieTemplate(self.templateType, self.template, function(tpl) {
                var old_ui = self.ui;
                self.ui = $($.trim(tpl(self.model, {
                    lang: language.current(),
                    self: self,
                    model: self.model, //tp 模板引擎其实也会自动将执行时的第一个参数放入 $.model;
                    options: self.options
                })));
                if (!self.ui || self.ui.length < 1) {
                    return console.error('"' + self.name + '" 发现异常');
                }
                self.root = self.root || self;
                var _context = {
                    'view': self
                };
                self.mapElements(self);
                self.bindData(self);
                self.bindEvent(self);
                self.renderChildView(self);
                self.setPageTitle(self);
                /**
                 * 在视图初始化完成时
                 * @event onInit
                 */
                if (self.onInit) self.onInit(_context);
                if (old_ui) old_ui.remove();
                self.container = container || self.container || rootContainer;
                self.container = utils.isString(container) ? $(self.container) : self.container;
                if (!self.container) {
                    console.error("container error.");
                }
                if (self.container[0].tagName !== 'LINK') {
                    self.container.append(self.ui);
                } else {
                    self.container.after(self.ui);
                }

                /**
                 * 在视图呈现完成时
                 * @event onRender
                 */
                if (self.onRender) self.onRender(_context);
                if (callback) callback(self.ui);
            });
        };

        /**
         * 移动除一个视图
         * @method remove
         * @return {NULL} 无返回值
         */
        this.remove = function() {
            var self = this;
            //检查 onRemove 事件
            if (self.onRemove) self.onRemove({
                view: self
            });
            //调用模型的视图移除方法
            if (self.model && self.model.removeView) {
                self.model.removeView(self);
            }
            //移除事件
            self.unbindEvent();
            //移除所有子视图
            self.removeChildView();
            //清除自身 dom
            if (self.ui) {
                self.ui.empty().remove();
            }
            //置空
            self.model = null;
            self.controller = null;
            self.ui = null;
            self.el = null;
            self.name = null;
            self.container = null;
            self.children = null;
            self.templateType = null;
            self.template = null;
            self.options = null;
        };

        /**
         * 隐藏视图
         * @method hide
         * @return {NULL} 无返回值
         */
        this.hide = function() {
            var self = this;
            if (self.ui) self.ui.hide();
            if (self.onHide) self.onHide({
                view: self
            });
        };

        /**
         * 显示视图
         * @method show
         * @return {NULL} 无返回值
         */
        this.show = function() {
            var self = this;
            if (self.ui) self.ui.show();
            if (self.onShow) self.onShow({
                view: self
            });
        };

    });
    //----------------------视图基类结束----------------------

    /**
     * 创建一个视图
     * @method create
     * @param {View} base 视图基类（可省略）
     * @static
     */
    exports.create = function(base, context) {
        if (!context) {
            context = base;
            base = View;
        }
        return $class.create(base, context);
    };

});

/**** 参数对象 Context 的说明 ****/

/**
 * View 或 Controller 的参数对象
 * View 的所有 “事件方法” 的第一个参数
 * Controller 所有 “Action 方法” 的第一个参数
 * @class Context
 * @module mokit
 */

/**
 * 当前视图
 * @property view
 */

/**
 * 根视图
 * @property rootView
 */

/**
 * URL 路由数据 (仅在 Controller 中可以访问)
 * @property routeData
 */

/**
 * 事件对象
 * @property event
 */

/**
 * 事件源 jQuery 对象
 * @property $element
 */

/**
 * 事件源原生对对象
 * @property element
 */