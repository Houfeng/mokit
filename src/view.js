
/**
 * 视图
 * @module mokit
 * @class View
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery'),
        $class = require("./class"),
        tp = require('./tp'),
        utils = require('./utils'),
        ajax = require('./ajax'),
        json = require('./json'),
        $model = require('./model'),
        store = require('./store'),
        Task = require('./task'),
        console = require('./console'),
        language = require('./language'),
        eventMgr = require('./event');

    //----------------------有关模板处理开始----------------------
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

    /*
     * 获取模板内容
     * @param  {String}   tplType  模板类型
     * @param  {String}   tpl      模板
     * @param  {Function} callback 加载完成回调函数
     * @return {NULL}              无返值
     */
    var loadTemplate = function(tplType, tpl, callback) {
        tplType = tplType || templateType.uri;
        if (!tpl || !callback) return;
        if (tplType == templateType.element) {
            callback($(tpl).html());
        } else if (tplType == templateType.uri) {
            ajax.get({
                url: tpl,
                callback: callback,
                dataType: 'text'
            });
        } else {
            callback(tpl);
        }
    };

    /**
     * 编译模板
     */
    var complieTemplate = function(tplType, tpl, callback) {
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
    //----------------------有关模板处理结束----------------------


    //----------------------有关模型处理开始----------------------

    /*
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

    /*
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
    //----------------------有关模板处理结束----------------------


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
     * 处理事件绑定
     */
    var handleEvent = function(view) {
        //查找所有事件绑定元素
        var elements = view.ui.find("[data-event]");
        if (view.ui.attr('[data-event]')) {
            elements.splice(0, 0, view.ui[0]); //将UI最顶层容器也加入元素组中
        }
        elements.each(function() {
            var element = $(this);
            var eventItems = element.attr('data-event');
            if (!eventItems) return;
            eventItems = eventItems.split(';');
            //遍历某一元素的事件列表
            utils.each(eventItems, function(i, exprStr) {
                var expr = parseEventExpr(exprStr);
                var eventTarget = expr.isViewMethod ? view : view.controller;
                var eventHandler = eventTarget[expr.methodName];
                if (eventHandler) {
                    element.on(expr.eventName, function(context) {
                        var expr = parseEventExpr(exprStr);
                        context.$element = element;
                        context.element = element[0];
                        context.view = view;
                        context.routeData = view.controller.route.routeData;
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
                expr = null;
            });
        });
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
     * 处理数据绑定
     */
    var handleBind = function(view) {
        var elements = view.ui.find("[data-bind]");
        if (view.ui.attr('[data-bind]')) {
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

    var updateModel = function(view) {
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
    var handleChildView = function(view) {
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
                var childOptionJson = childHolder.attr('data-option') || '{}';
                var childOption = json.parse(childOptionJson);
                //如果已存在
                if (view.children[childId]) {
                    //view.children[childId].model = childModel;
                    view.children[childId].container = childHolder;
                    view.children[childId].render(childHolder, done);
                    return;
                };
                //如果不存在
                require(module.resovleUri(childUri, view.template), function(ChildView) {
                    view[childId] = view.children[childId] = new ChildView({
                        model: childModel,
                        controller: view.controller,
                        option: childOption
                    });
                    view.children[childId].parent = view;
                    view.children[childId].root = view.root || view;
                    view.children[childId].container = childHolder;
                    view.children[childId].render(childHolder, done);
                });
            });
        });
        task.end(function() {
            if (view.onChildRender) view.onChildRender(_context);
        });
    };

    var setPageTitle = function(view) {
        if (!view || !view.ui) return;
        if (view.ui.attr('data-role') != 'page') return;
        var title = view.ui.attr('data-title');
        if (title) document.title = title;
    }

    /**
     * 按照字典映射元素
     */
    var mapElements = function(view) {
        if (!view || !view.ui || !view.elMap) return;
        view.el = {};
        utils.each(view.elMap, function(key) {
            view.el[key] = view.ui.find(view.elMap[key]);
        });
    };

    var rootContainer = exports.rootContainer = $(document.body);

    //----------------------视图基类开始----------------------

    /**
     * 视图基类
     */
    var View = exports.View = $class.create(function() {
        this.template = '';
        this.model = null;
        this.controller = null;
        this.ui = null;
        this.el = null;
        this.name = '';
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
            self.name = utils.newGuid();
            self.model = option.model || self.model || {};
            self.controller = option.controller || self.controller || {};
            self.template = option.template || self.template || '';
            self.option = option.option || self.option || {}; //option是用json控制视图行为或外观的
            self.elMap = self.el;
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
         * 更新模型数据
         * @method updateModel
         */
        this.updateModel = function() {
            var self = this;
            return updateModel(self);
        };

        /**
         * 呈现一个视图
         * @method render
         * @param  {Object}   container 容器(可以省略)
         * @param  {Function} callback  完成呈现回调
         * @return {NULL}               无返回值
         */
        this.render = function(container, callback) {
            var self = this;
            if (self.onPreInit) self.onPreInit({
                view: self
            });
            complieTemplate(self.templateType, self.template, function(tpl) {
                var old_ui = self.ui;
                self.ui = $($.trim(tpl(self.model, {
                    lang: language.current(),
                    self: self,
                    model: self.model, //tp 模板引擎其实也会自动将执行时的第一个参数放入 $.model;
                    option: self.option
                })));
                if (!self.ui || self.ui.length < 1) {
                    return console.error(self.ui);
                }
                self.root = self.root || self;
                var _context = {
                    'view': self
                };
                mapElements(self);
                handleBind(self);
                handleEvent(self);
                handleChildView(self);
                setPageTitle(self);
                if (self.onInit) self.onInit(_context);
                if (old_ui) old_ui.remove();
                self.container = container || self.container || rootContainer;
                self.container = utils.isString(container) ? $(self.container) : self.container;
                if (self.container[0].tagName !== 'LINK') {
                    self.container.append(self.ui);
                } else {
                    self.container.after(self.ui);
                }
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
            if (self.ui) self.ui.remove();
            if (self.onRemove) self.onRemove({
                view: self
            });
            if (self.model.removeView) {
                self.model.removeView(self);
            }
            self.model = null;
            self.controller = null;
            self.ui = null;
            self.el = null;
            self.name = null;
            self.container = null;
        };

        this.hide = function() {
            var self = this;
            if (self.ui) self.ui.hide();
            if (self.onHide) self.onHide({
                view: self
            });
        };

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