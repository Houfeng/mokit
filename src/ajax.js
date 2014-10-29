/**
 * ajax模块，提供基础的Ajax功能;
 * @class Ajax
 * @static
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery');
    var utils = require('./utils');
    var store = require('./store');
    var mask = require('./mask');
    var self = exports;
    var top = window.top;

    /**
     * Ajax全局加载选项
     * {pic: '图片 URL',color: '背景颜色 rgba'}
     * @property loadingOption
     * @static
     */
    self.loadingOption = null;

    top.mokit = top.mokit || {};
    top.mokit.ajaxFilters = top.mokit.ajaxFilters || [];

    /**
     * 数据缓存
     */
    var ajaxCache = store.dataCache;

    /**
     * 数据过滤器
     */
    var dataFilters = top.mokit.ajaxFilters;

    /**
     * 过虑数据
     */
    var filterData = function(name, data) {
        utils.each(dataFilters, function() {
            if (this != null && this[name]) {
                data = this[name](data);
            }
        });
        return data;
    };

    /**
     * 添加数据过虑器，一个过虑器包含需要两个方法，receive:过虑收到的数据，send:过虑发送的数据。
     * @method addDataFilter
     * @param {Object} filter 过滤器对像
     * @return {void} 无返回值
     * @static
     */
    self.addDataFilter = function(filter) {
        dataFilters.push(filter);
    };

    self.option = {};
    /**
     * Ajax全局设置
     * @method setup
     * @param {Object} option 全局Ajax选项,同jQuery的setup保持一致
     * @return {void} 无返回值
     * @static
     */
    self.setup = function(option) {
        self.option = option || {};
        $.ajaxSetup(self.option);
    };

    /**
     * ajax请求
     * @method request
     * @param {Object} option ajax选项，同jQuery的Ajax方式一致
     * @return {void} 无返回值
     * @static
     */
    self.request = function(option) {
        option = option || {};
        if (!option.noMask) mask.begin(self.loadingOption);
        if (self.onBegin) self.onBegin();
        //处理选项参数
        option.$timeout = option.$timeout || self.option.$timeout || null;
        option.url = option.url || "";
        option.url = utils.wrapUrl(option.url);
        option.type = option.type || "GET";
        option.dataType = option.dataType || "json";
        option.success = option.success || option.callback;
        //默认错误对象
        option.errorArgs = {
            code: 500,
            message: '请求发生错误'
        };
        //过滤发送数据
        option.data = filterData('send', option.data);
        //包装 success 函数
        var success = option.success;
        option.success = function(rs) {
            if (option.aborted) return;
            option._cleartTimer();
            //过滤接收数据
            rs = filterData('receive', rs);
            if (success) success(rs, null);
            if (self.onEnd) self.onEnd();
            if (!option.noMask) mask.end(self.loadingOption);
        };
        //包装 error 函数
        var error = option.error || self.option.error;
        option.error = function() {
            if (option.aborted) return;
            option._cleartTimer();
            if (error) {
                error(arguments);
            } else {
                if (success) success(null, option.errorArgs);
            }
            if (!option.noMask) mask.end(self.loadingOption);
        };
        //取消请请函数
        option.abort = function() {
            option._cleartTimer();
            option.errorArgs.message = "请求被取消";
            option.aborted = true;
            if (option.xhr) {
                option.xhr.abort();
            }
            if (!option.noMask) mask.end(self.loadingOption);
        };
        option._createTimer = function() {
            if (!option.$timeout) return;
            option._timer = setTimeout(function() {
                if (option._timerCanceled || option._timer == null) return;
                option.abort();
                option.errorArgs.message = "请求超时";
                if (success) success(null, option.errorArgs);
                if (error) error(option.errorArgs);
                option._cleartTimer();
            }, option.$timeout);
        };
        option._cleartTimer = function() {
            if (option._timer) {
                clearTimeout(option._timer);
            }
            option._timer = null;
            option._timerCanceled = true;
        };
        //发起请求
        option._createTimer();
        option.xhr = $.ajax(option);
        //返回当前请求
        return option;
    };

    /**
     * 向指定的URL发起一个GET请求
     * @method get
     * @param {Object} option 请求参数
     * @static
     */
    self.get = function(option) {
        option.type = "GET";
        return self.request(option);
    };

    /**
     * 向指定的URL发起一个POST请求
     * @method post
     * @param {Object} option 请求参数
     * @static
     */
    self.post = function(option) {
        option.type = "POST";
        return self.request(option);
    };

});