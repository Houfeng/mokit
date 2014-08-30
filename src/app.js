/**
 * Mokit是一个符合MVC的WebApp基础开发框架
 * 当前版本: v2.0 beta 34
 * @author Houfeng
 * @module mokit
 * @main mokit
 */
//-----------------------------------------------
/**
 * 应用程序模块，用来初始化并启动一个应用。
 * @class App
 * @static
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    /**
     * mokit版本信息
     * @type {Object}
     * @final
     */
    exports.mokit = {
        version: '2.0 Beta 34',
        author: 'Houfeng'
    };

    /**
     * 导入依赖
     */
    var style = require('./style.css'),
        console = require('./console'),
        routeMgr = require('./route'),
        eventMgr = require("./event"),
        utils = require("./utils"),
        model = require('./model'),
        view = require('./view'),
        controller = require('./controller'),
        language = require('./language'),
        style = require('./style'),
        ajax = require('./ajax'),
        transitions = require('./transitions'),
        $ = require('./jquery'),
        Task = require('./task'),
        navigation = require('./navigation');


    /*---------------------------将常用模块载入并挂在App上---------------------------*/
    exports.route = routeMgr;
    exports.language = language;
    exports.style = style;
    exports.console = console;
    exports.utils = utils;
    exports.model = model;
    exports.view = view;
    exports.controller = controller;
    exports.ajax = ajax;
    /*---------------------------/将常用模块载入并挂在App上---------------------------*/


    exports.onstart = eventMgr.create(exports, 'onStart');

    var preSatrt = function(route) {
        var startContext = {
            'route': route
        };
        exports.onStart.trigger(startContext);
        return !startContext.cancel;
    };

    var currentControllerInstance = null;

    /**
     * 传送到下一个RootView
     */
    var changeController = function(nextControllerInstance, callback, isBack) {
        if (currentControllerInstance) {
            nextControllerInstance.route.effect = nextControllerInstance.route.effect || [0, 0];
            var effect = (isBack && currentControllerInstance) ?
                currentControllerInstance.route.effect[1] :
                nextControllerInstance.route.effect[0];
            transitions.change(
                currentControllerInstance.rootView,
                nextControllerInstance.rootView,
                effect, function() {
                    currentControllerInstance.rootView.remove();
                    currentControllerInstance.rootView = null;
                    delete currentControllerInstance.rootView;
                    currentControllerInstance = null;
                    currentControllerInstance = nextControllerInstance;
                    if (callback) callback();
                }, {
                    container: view.rootContainer
                });
        } else {
            currentControllerInstance = nextControllerInstance;
            if (callback) callback();
        }
    };

    /**
     * 启动一个视图
     */
    var _start = function(uri, isBack) {
        if (transitions.isAnimating()) return;
        var route = routeMgr.getRoute(uri);
        if (!route) return console.error(uri + ' not found');
        if (!preSatrt(route)) return;
        require(route.target, function(Controller) {
            var nextControllerInstance = new Controller();
            nextControllerInstance.route = route;
            nextControllerInstance.routeData = route.routeData;
            nextControllerInstance.setView = function(view, callback) {
                var self = this;
                view.root = view;
                self.rootView = view;
                if (!self.rootView) {
                    return console.error(uri + ' rootView not found');
                }
                self.rootView.controller = self;
                self.rootView.render(null, function() {
                    changeController(self, callback, isBack);
                });
            };
            if (nextControllerInstance.index) {
                nextControllerInstance.index({
                    'routeData': nextControllerInstance.routeData
                });
            }
        });
    };

    /**
     * 在URI发生改变时
     */
    navigation.change(function(uri, isBack) {
        if (uri)
            _start(uri, isBack);
    });

    /**
     * 启动一个路由uri
     * @method start
     * @param {String} uri 路由uri
     * @static
     */
    exports.start = function(uri) {
        if (uri != navigation.getUri()) {
            navigation.setUri(uri);
        } else {
            _start(uri);
        }
    };

    /**
     * 返回到上一个路由uri
     * @method back
     * @static
     */
    exports.back = navigation.back;

    /**
     * 初始化应用
     * @method init
     * @param {Object} option 应用程序初始化选项
     * @static
     */
    exports.init = function(option) {
        option = option || {};
        option.style = (option.style || style.currentName() || style.defaultName() || 'default').toLowerCase();
        option.language = (option.language || language.currentName() || language.defaultName() || 'en-us').toLowerCase();
        var navUri = navigation.getUri();
        window.navigation = navigation;
        if (navUri == null || navUri == option.splash) {
            navUri = option.index; //指定 index 
        }
        //完成初始化
        var doneInit = function() {
            language.setLanguage(option.language, function() {
                exports.start(navUri || option.index);
            });
        };
        //开始进行初始化
        var startInit = function() {
            //是否定义预初始化
            if (option.preInit) {
                option.preInit(doneInit);
            } else {
                doneInit();
            }
        };
        //首选加载样式
        style.setStyle(option.style, function() {
            //如果指定了 splash
            if (option.splash) {
                exports.start(option.splash);
                //如果没有preInit的话一闪而过不太好
                utils.async(startInit, 500);
            } else {
                startInit();
            }
        });
    };

});