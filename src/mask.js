/**
 * 蒙板模块
 * @class Mask
 * @static
 * @module mokit
 */
define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery');

    //计数
    var maskCount = 0;
    var maskElement = null;

    //动画开始结束处理
    var showMask = function (option) {
        option = option || exports.option || {};
        if (maskCount < 1) {
            var buffer = [];
            buffer.push('<div style="width:100%;height:100%;z-index:999999999;position:fixed;left:0px;top:0px;');
            buffer.push('background-color:' + (option.color || '') + ';');
            buffer.push('opacity:' + (option.opacity || 1) + ';');
            if (option.pic) {
                buffer.push('background-image:url(' + option.pic);
                buffer.push(');background-repeat:no-repeat;background-position:center center;');
            }
            buffer.push('"></div>');
            maskElement = $(buffer.join(''));
            $(document.body).append(maskElement);
        }
        maskCount++;
    };

    var hideMask = function (option) {
        option = option || {};
        maskCount--;
        if (maskCount < 1 && maskElement) {
            maskElement.remove();
        }
    };

    /**
	 * 显示一个蒙板
	 * @method show
	 * @param {Object} option 选项，格式：{opacity:透明度,color:颜色,pic:进度图片}
	 * @static
	 */
    exports.show = exports.begin = showMask;

    /**
	 * 隐藏一个蒙板
	 * @method hide
	 * @param {Object} option 选项
	 * @static
	 */
    exports.hide = exports.end = hideMask;

    /**
	 * 默认选项
	 * @property {Object} option 
	 * @static
	 */
    exports.option = {};

});