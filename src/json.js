/**
 * JSON模块
 * @class Json
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    //如果原生支持
    if (typeof JSON !== 'undefined') {
        exports.stringify = JSON.stringify;
        exports.parse = JSON.parse;
        return exports;
    }

    /**
     * 自定义的json转字符串
     */
    var obj2str = function(obj) {
        switch (typeof(obj)) {
            case 'string':
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
            case 'array':
                return '[' + obj.map(obj2str).join(',') + ']';
            case 'object':
                if (obj instanceof Array) {
                    var strArr = [];
                    var len = obj.length;
                    for (var i = 0; i < len; i++) {
                        strArr.push(obj2str(obj[i]));
                    }
                    return '[' + strArr.join(',') + ']';
                } else if (obj == null || obj == undefined) {
                    return 'null';
                } else {
                    var string = [];
                    for (var p in obj) {
                        string.push(obj2str(p) + ':' + obj2str(obj[p]));
                    }
                    return '{' + string.join(',') + '}';
                }
            case 'number':
                return obj;
            case 'boolean':
                return obj;
            case false:
                return obj;
        }
    };

    /**
     * 自定义的字符串转json
     */
    var str2obj = function(str) {
        if (str == null) return null;
        return (new Function("return " + str + ";"))();
    };

    /**
     * 将JavaScript对象转换为JSON字符串表示形式。
     * @method stringify
     * @param {Object} obj 对象
     * @static
     */
    exports.stringify = obj2str;
    /**
     * 将JSON字符串转换为JavaScript对象
     * @method parse
     * @param {String} str JSON字符串
     * @static
     */
    exports.parse = str2obj;
    return exports;

});