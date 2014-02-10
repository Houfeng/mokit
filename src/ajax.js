/**
 * ajax模块，提供基础的Ajax功能;
 * @class Ajax
 * @static
 * @module mokit
 */
define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery'),
		utils = require('./utils'),
		store = require('./store'),
		mask = require('./mask');

    exports.loadingOption = null;

    window.top.__mokit_ajax_filters__ = window.top.__mokit_ajax_filters__ || [];
    window.top.__mokit_ajax_setup__ = window.top.__mokit_ajax_setup__ || {};

    /**
	 * 数据缓存
	 */
    var ajaxCache = store.dataCache;

    /**
	 * 数据过滤器
	 */
    var dataFilters = window.top.__mokit_ajax_filters__;

    /**
	 * 过虑数据
	 */
    var filterData = function (name, data) {
        utils.each(dataFilters, function () {
            if (this != null && this[name]) {
                data = this[name](data);
            }
        });
        return data;
    };

    /**
	 * 添加数据过虑器，一个过虑器包含两个方法receive:过虑收到的数据，send:过虑发送的数据。
	 * @method addDataFilter
	 * @param {Object} filter 过滤器对像
	 * @return {void} 无返回值
	 * @static
	 */
    exports.addDataFilter = function (filter) {
        dataFilters.push(filter);
    };

    /**
	 * Ajax全局设置
	 * @method setup
	 * @param {Object} option 全局Ajax选项,同jQuery的setup保持一致
	 * @return {void} 无返回值
	 * @static
	 */
    exports.setup = function (option) {
        //utils.copy(option,window.top.__mokit_ajax_setup__);
        $.ajaxSetup(option);
    };

    /**
	 * ajax请求
	 * @method request
	 * @param {Object} option ajax选项，同jQuery的Ajax方式一致
	 * @return {void} 无返回值
	 * @static
	 */
    exports.request = function (option) {
        mask.begin(exports.loadingOption);
        if (exports.onBegin) exports.onBegin();
        option = option || {};
        option.url = option.url || "";
        var cacheKey = "ajax:" + option.url;
        ajaxCache[cacheKey] = ajaxCache[cacheKey] || {};
        option.url = utils.wrapUrl(option.url);
        option.type = option.type || "GET";
        option.dataType = option.dataType || "json";
        option.success = option.success || option.callback;
        //过滤发送数据
        option.data = filterData('send', option.data);
        //处理缓存
        if (option.success && option.cacheEnabled && ajaxCache[cacheKey].result != null) {
            mask.end(exports.loadingOption);
            option.success(ajaxCache[cacheKey].result);
            return;
        }
        //包装回调
        var success = option.success;
        option.success = ajaxCache[cacheKey].success = function (rs) {
            //过滤接收数据
            rs = filterData('receive', rs);
            if (option.cacheEnabled) {
                ajaxCache[cacheKey].result = rs;
            }
            if (success) success(rs);
            if (exports.onEnd) exports.onEnd();
            mask.end(exports.loadingOption);
        };

        //包装error
        var error = option.error;
        option.error = function () {
            mask.end(exports.loadingOption);
            if (error) error(arguments);
        };

        ajaxCache[cacheKey].xhr = $.ajax(option);
        return ajaxCache[cacheKey].xhr;
    };

    /**
	 * 向指定的URL发起一个GET请求
	 * @method get
	 * @param {Object} option 请求参数
	 * @static
	 */
    exports.get = function (option) {
        option.type = "GET";
        return exports.request(option);
    };

    /**
	 * 向指定的URL发起一个POST请求
	 * @method post
	 * @param {Object} option 请求参数
	 * @static
	 */
    exports.post = function (option) {
        option.type = "POST";
        return exports.request(option);
    };

    /**
	 * 释放请请求
	 * @method abort
	 * @param {String} url 要释放的请求url
	 * @static
	 */
    exports.abort = function (url) {
        if (url) {
            var cacheKey = "ajax:" + url;
            ajaxCache[cacheKey].success = null;
            ajaxCache[cacheKey].abort();
        } else {
            utils.each(ajaxCache, function (key, item) {
                item.success = null;
                item.abort();
            });
        }
        mask.end(exports.loadingOption);
    };

});