define(function(require, exports, module) {
	"use strict";

	var app = require('../../src/app'),
		AboutView = require('../views/about');

	/**
	 * 登陆页控制器
	 */
	return app.controller.create({

		/**
		 * 默认action
		 */
		index: function(context) {
			var self = this;
			self.setView(new AboutView());
		}
	});

});