define(function(require, exports, module) {
	"use strict";

	var app = require('../../src/app'),
		move = require('../../src/move');

	/**
	 * 登陆页
	 */
	return app.view.create({
		template: module.resovleUri('../templates/menu.html'),
		open: function(event, callback) {
			var self = this;
			self.show();
			move(self.parent.ui[0]).ease('in-out').duration(200).x(200).end(callback);
		},
		close: function(event, callback) {
			var self = this;
			move(self.parent.ui[0]).ease('in-out').duration(200).x(0).end(function() {
				self.hide();
				if (callback) callback();
			});
		},
		onRender: function() {
			this.hide();
		}
	});

});