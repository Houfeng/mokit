define(function(require, exports, module) {
    "use strict";

    var view = require('mokit/view');
    var grid = require('mokit/grid');
    var move = require('mokit/move');
    var $event = require('mokit/event');
    var utils = require('mokit/utils');
    var $ = require('mokit/jquery');
    var touch = require('mokit/touch');

    /**
     * 测试页视图
     */
    return view.create({
        template: module.resovleUri('../templates/about.html'),
        el: {
            cell1: '#cell1',
            cell2: '#cell2'
        },
        //在视图呈现前
        onRender: function() {
            var self = this;
            grid.use(self.ui);
            var cell = self.el.cell1[0];
            $event.use(cell);
            cell.on('swipe', function(event) {
                self.el.cell1.html(event.direction);
                console.log(event.direction);
            }).on('tap', function() {
                self.el.cell1.html('tap');
                console.log('tap');
            }).on('taphold', function() {
                self.el.cell1.html('taphold');
                console.log('taphold');
            }).on('dbltap', function() {
                self.el.cell1.html('dbltap');
                console.log('dbltap');
            });
        },
        swiperight: function(context) {
            var self = this;
            self.el.cell2.html('swipe right');
        },
        swipeleft: function(context) {
            var self = this;
            self.el.cell2.html('swipe left');
        }
    });
});