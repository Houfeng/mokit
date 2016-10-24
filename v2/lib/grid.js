/**
 * 网格布局组件
 * @class Grid
 * @static
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = require('./utils');
    var $ = require('./jquery');
    var self = exports;

    function handleSize(list, max) {
        var autoCount = 0;
        var fiexdStat = 0;
        utils.each(list, function(i) {
            if (this.indexOf('%') > -1) {
                list[i] = max * parseInt(this) / 100;
            } else {
                list[i] = parseInt(this);
            }
            if (isNaN(list[i])) {
                autoCount++;
            } else {
                fiexdStat += list[i];
            }
        });
        if (autoCount > 0) {
            var autoAvg = (max - fiexdStat) / autoCount;
            utils.each(list, function(i) {
                if (isNaN(list[i])) {
                    list[i] = autoAvg;
                }
            });
        }
        return list;
    };

    function layout(grid) {
        grid = $(grid);
        var scrollY = grid.attr('data-grid-scroll-x');
        var scrollX = grid.attr('data-grid-scroll-y');
        var rectifyX = parseInt(grid.attr("data-grid-rectify-x") || '0');
        var rectifyY = parseInt(grid.attr("data-grid-rectify-y") || '0');
        //取不包括“边框、填充、外边距”的大小
        var size = {
            width: grid.width(),
            height: grid.height()
        };
        //处理容器滚动
        if (scrollX && grid[0].scrollWidth > size.width) {
            size.width = grid[0].scrollWidth;
        }
        if (scrollX && grid[0].scrollHeight > size.height) {
            size.height = grid[0].scrollHeight;
        }
        //alert("grid:"+size.width+','+size.height);
        //处理容器纠偏
        size.width += rectifyX;
        size.height += rectifyY;
        //
        var cols = grid.attr("data-grid-cols");
        var rows = grid.attr("data-grid-rows");
        if (!cols || !rows) return;
        cols = handleSize(cols.split(','), size.width);
        rows = handleSize(rows.split(','), size.height);
        //
        var cells = null;
        var scope = grid.attr("data-grid-scope");
        if (scope == 'all') {
            cells = grid.find("[data-role~=cell]");
        } else {
            cells = grid.children("[data-role~=cell]");
        }
        //
        for (var r = 0; r < rows.length; r++) {
            for (var c = 0; c < cols.length; c++) {
                var cell = $(cells[cols.length * r + c]);
                //处理单元格外边距
                var width = cols[c];
                width -= (parseInt(cell.css('marginLeft')) + parseInt(cell.css('marginRight')));
                width -= (parseInt(cell.css('paddingLeft')) + parseInt(cell.css('paddingRight')));
                width -= (parseInt(cell.css('borderLeftWidth')) + parseInt(cell.css('borderRightWidth')));
                var height = rows[r];
                height -= (parseInt(cell.css('marginTop')) + parseInt(cell.css('marginBottom')));
                height -= (parseInt(cell.css('paddingTop')) + parseInt(cell.css('paddingBottom')));
                height -= (parseInt(cell.css('borderTopWidth')) + parseInt(cell.css('borderBottomWidth')));
                //alert("cell width:"+width+","+cols[c]);
                //处理单元格百分百问题
                if (width == size.width) width = '100%';
                if (height == size.height) height = '100%';
                //设置单元格大小
                cell.width(width).height(height);
            }
        }
    };

    /**
     * 对一个UI元素启用网格布局
     * @method use
     * @param  {jQueryObject} ui 要启用网格布局的UI对象（jQuery对象）
     * @return {void}    无返回值
     * @static
     */
    self.use = function(ui) {
        var grids = ui.find('[data-role~=grid]');

        //如果页面也是Grid
        var uiRole = ui.attr('data-role');
        if (uiRole && utils.contains(uiRole, 'grid')) {
            grids.splice(0, 0, ui[0]);
        }

        grids.each(function() {
            layout(this);
        }).resize(function() {
            layout(this);
        });

        $(window).resize(function() {
            grids.each(function() {
                layout(this);
            });
        });
    };
});