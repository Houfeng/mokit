ems.config({
    packages: [{ 
        name: 'mokit',
        location: ems.resovleUri('../lib/'),
        main: 'app'
    },{ 
        name: 'mokit-ui',
        location: ems.resovleUri('../lib/ui/'),
        main: 'main'
    }]
});
/**
 * 应用启动模块
 */
define(function(require, exports, module) {
    "use strict";

    var app = require('mokit/app'),
        ajax = require('mokit/ajax'),
        $ = require('mokit/jquery');
        
    //var moui= require('mokit-ui');

    /**
     * 加载配置文件
     */
    var config = app.config = require('config');

    /**
     * 样式配置
     */
    app.style.addStyle({
        'light': './styles/light.css',
        'dark': './styles/dark.css'
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
        effect: [33, 32]
    }, {
        pattern: '/login',
        target: './controllers/login',
        effect: [33, 32]
    }, {
        pattern: '/about',
        target: './controllers/about',
        effect: [33, 32]
    }, {
        pattern: '/grid',
        target: './controllers/grid',
        effect: [33, 32]
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
        //splash: '/grid',
        index: config.home
    });

});