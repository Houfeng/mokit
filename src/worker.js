/**
 * 工作线程
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    return (function() {
        var functionBodyRegx, URL, contentType, code, url;
        functionBodyRegx = /^[^{]+\{([\s\S]*)\}$/;
        URL = window.URL || window.webkitURL;
        contentType = {
            type: "text/javascript; charset=utf-8"
        };
        return function(fn) {
            code = fn.toString().match(functionBodyRegx)[1];
            url = window.opera ?
                "data:application/javascript," + encodeURIComponent(code) :
                URL.createObjectURL(new Blob([code], contentType));
            return new Worker(url);
        }
    })();
});