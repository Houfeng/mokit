/**
 * 应用启动模块
 */
define(function(require, exports, module) {
    "use strict";

    var app = require('../src/app'),
        ajax = require('../src/ajax'),
        $ = require('../src/jquery');

    /**
     * 加载配置文件
     */
    var config = app.config = require('config');

    /**
     * 样式配置
     */
    app.style.addStyle({
        'default': './styles/default/css/style.css',
        'black': './styles/black/style.css'
    }, module);

    /**
     * 语言配置
     */
    app.language.addLanguage({
        'zh-cn': './languages/zh-cn',
        'en-us': './languages/en-us'
    }, module);

    /**
     * 路由配置
     */
    app.route.addRoute([{
        pattern: '/home',
        target: './controllers/home',
        effect: [46, 47]
    }, {
        pattern: '/login',
        target: './controllers/login',
        effect: [27, 27]
    }, {
        pattern: '/about',
        target: './controllers/about',
        effect: [27, 27]
    }], module);

    //设置全局的Ajax Loading
    ajax.loadingOption = {
        pic: module.resovleUri('./images/loading.gif'),
        color: 'rgba(0,0,0,0.1)'
    };

    /**
     * 初始化应用程序
     */
    app.init({
        //language: navigator.language,
        //style: config.style,
        index: config.home
    });

});