define(function(require, exports, module) {
    "use strict";

    var view = require('../../src/view');
    var grid = require('../../src/grid');

    /**
     * 测试页视图
     */
    return view.create({
        template: module.resovleUri('../templates/grid.html'),
        onRender: function(context) {
            var self = this;
            //setTimeout(function() {
                grid.use(self.ui);
            //}, 10);
        }
    });

});