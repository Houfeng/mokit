/**
 * 导航模块
 * @class Navigation
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var eventMgr = require('./event');
    var utils = require("./utils");

    /**
     * Uri改变事件，在Uri发现变化时触发。
     * @event change
     * @param {String} uri 当前Uri
     * @static
     */
    exports.change = eventMgr.create(exports, 'change');
    /**
     * 处理hashchange事件
     */
    window.hashChange = eventMgr.create(window, 'hashchange');

    var onHashChange = function() {
        var uri = getUri();
        var backIndex = _history.length - 2;
        var lastIndex = _history.length - 1;
        var isBack = (_history[backIndex] == uri);
        if (isBack) {
            _history.pop();
        } else if (_history[lastIndex] != uri) { //如果不是自已跳向自已
            _history.push(uri);
        }
        exports.change.trigger(uri, isBack, _history.length);
    };

    var _history = [getUri()];
    exports.history = function() {
        return _history;
    };
    window.__history = _history;

    /**
     * 获取当前Uri
     * @method getUri
     * @static
     */

    function getUri() {
        if (location.hash) {
            return location.hash.split('#')[1];
        }
        return null;
    };
    exports.getUri = getUri;

    /**
     * 设置当前uri
     * @method setUri
     * @param {String} uri 需要将Uri在路由配置添加配置
     * @static
     */

    function setUri(uri, _ignoreHandle) {
        if (uri == getUri()) return;
        if (uri && uri != '') {
            location.hash = '#' + uri;
        } else {
            location.hash = null;
        }
    };
    exports.setUri = setUri;

    /**
     * 返回
     * @method back
     */

    function back() {
        var backIndex = _history.length - 2;
        if (_history[backIndex])
            setUri(_history[backIndex]);
    };
    exports.back = back;

    /**
     * 重置当前页为首次进入页
     * @method reset
     */
    function reset() {
        _history = [getUri()];
    };
    exports.reset = reset;

    window.hashChange.bind(onHashChange);

});