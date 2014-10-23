define(function(require, exports, module) {
    "use strict";

    var view = require('mokit/view');
    var grid = require('mokit/grid');
    var move = require('mokit/move');

    /**
     * 测试页视图
     */
    return view.create({
        template: module.resovleUri('../templates/about.html'),
        el: {
            block: '#block'
        },
        //在视图呈现前
        onRender: function() {
            var self = this;
            grid.use(self.ui);
            
        }
    });
});