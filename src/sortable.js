/**
 * 排序组件，可以拖动排序。
 * @class Sortable
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $ = require('./jquery');

    var sortItems = null;
    var dragItem = null;
    var startPoint = null;
    var startOffset = null;
    var dragHolder = null;
    var matchSpace = {
        x: 30,
        y: 30
    };
    var sortOption = null;
    //
    $(document.body).bind('vmousedown', function(event) {
        startPoint = {
            x: event.pageX,
            y: event.pageY
        };
    }).bind('vmousemove', function(event) {
        if (!sortItems || !dragItem || !startPoint || !startOffset || !dragHolder) return;
        var point = {
            left: startOffset.left + event.pageX - startPoint.x,
            top: startOffset.top + event.pageY - startPoint.y
        };
        dragItem.css({
            'left': point.left,
            'top': point.top
        });
        //
        sortItems.each(function() {
            if (this == dragItem[0] || this == dragHolder[0]) return;
            var item = $(this);
            var itemOffset = item.offset();
            if (point.left > itemOffset.left - matchSpace.x && point.left < itemOffset.left + matchSpace.x && point.top > itemOffset.top - matchSpace.y && point.top < itemOffset.top + matchSpace.y) {
                dragHolder.remove();
                if (point.left < itemOffset.left || point.top < itemOffset.top) {
                    item.before(dragHolder);
                } else {
                    item.after(dragHolder);
                }
            }
        });
    }).bind('vmouseup', function(event) {
        if (!dragItem || !dragHolder) return;
        dragItem.css({
            'position': '',
            'left': '',
            'top': '',
            'zIndex': 0
        });
        dragHolder.replaceWith(dragItem);
        if (sortOption && sortOption.onEnd) sortOption.onEnd(dragItem);
        dragItem = null;
        startPoint = null;
        startOffset = null;
        dragHolder = null;
        sortItems = null;
        sortOption = null;
    });

    /**
     * 为元素集合启用拖动排序
     * @param  {Array} items  元素集合
     * @param  {Object} option 选项
     * @method use
     * @static
     */
    exports.use = function(items, option) {
        items.attr('draggable', false);
        items.find('a,img').attr('draggable', false);
        option = option || {};
        option.event = option.event || 'vmousedown';
        //
        items.bind(option.event, function(event) {
            sortOption = option;
            sortItems = items;
            dragItem = $(this);
            matchSpace = {
                x: dragItem.outerWidth() / 5,
                y: dragItem.outerHeight() / 5
            };
            startOffset = dragItem.offset();
            if (dragHolder) dragHolder.remove();
            dragHolder = dragItem.clone();
            dragHolder.width(startOffset.width).height(startOffset.height);
            dragHolder.css({
                'backgroundColor': '#eee',
                'solid': 'solid 1px #aaa;'
            }).html('');
            dragItem.css({
                'position': 'absolute',
                'zIndex': 99999,
                'left': startOffset.left,
                'top': startOffset.top
            });
            dragItem.before(dragHolder);
            if (option.onBegin) option.onBegin(dragItem);
        });
    };
});