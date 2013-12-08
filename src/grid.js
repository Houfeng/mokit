/**
 * 网格布局组件
 * @class Grid
 * @static
 * @module mokit
 */
define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = require('./utils'),
        $ = require('./jquery');

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
        var size = {
            width: ((scrollX && grid[0].scrollWidth > grid[0].offsetWidth) ? grid[0].scrollWidth : grid[0].offsetWidth) + rectifyX,
            height: ((scrollY && grid[0].scrollHeight > grid[0].offsetHeight) ? grid[0].scrollHeight : grid[0].offsetHeight) + rectifyY
        };
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
                if (cols[c] == size.width) cols[c] = '100%';
                cell.outerWidth(cols[c]).outerHeight(rows[r]);
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
    exports.use = function(ui) {
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