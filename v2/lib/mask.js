/**
 * 蒙板模块
 * @class Mask
 * @static
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery');
    var self = exports;

    /**
     * 默认选项
     * @property {Object} option
     * @static
     */
    self.option = {};
    self.maskCount = 0;
    self.maskElement = null;
    self.container = $(document.body);
    
    /**
     * 显示一个蒙板
     * @method show
     * @param {Object} option 选项，格式：{opacity:透明度,color:颜色,pic:进度图片}
     * @static
     */
    self.show = self.begin = function(option) {
        option = option || self.option || {};
        if (self.maskCount < 1) {
            var buffer = [];
            buffer.push('<div style="width:100%;height:100%;z-index:999999999;position:fixed;left:0px;top:0px;');
            buffer.push('background-color:' + (option.color || '') + ';');
            buffer.push('opacity:' + (option.opacity || 1) + ';');
            if (option.pic) {
                buffer.push('background-image:url(' + option.pic);
                buffer.push(');background-repeat:no-repeat;background-position:center center;');
            }
            buffer.push('"></div>');
            self.maskElement = $(buffer.join(''));
            self.container.append(self.maskElement);
        }
        self.maskCount++;
    };

    /**
     * 隐藏一个蒙板
     * @method hide
     * @param {Object} option 选项
     * @static
     */
    self.hide = self.end = function(option) {
        option = option || {};
        self.maskCount--;
        if (self.maskCount < 1 && self.maskElement) {
            self.maskElement.remove();
        }
    };
});