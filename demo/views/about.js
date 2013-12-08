define(function(require, exports, module) {
	"use strict";

	var view = require('../../src/view'),
		grid = require('../../src/grid');

	/**
	 * 测试页视图
	 */
	return view.create({
		template: module.resovleUri('../templates/about.html'),
		onRender: function() {
			var self = this;
			grid.use(self.ui);
		},
		test: function(context) {
			alert(0);
		}
	});

});