define(function(require, exports, module) {
	"use strict";

	var app = require('mokit/app'),
		json = require('mokit/json'),
		HomeView = require('../views/home'),
		Contact = require('../models/contact'),
		console = require('mokit/console'),
		User = require('../models/user'),
		lang = require('mokit/language'),
		Error = require('../views/error'),
		navigation = require('mokit/navigation');

	return app.controller.create({

		/**
		 * 默认action
		 */
		index: function(context) {
			navigation.reset();
			var self = this;
			//setTimeout(function() {
				self.setView(new HomeView({
					model: Contact
				}));
			//}, 100000);
			
		},

		/**
		 * 查找联系人
		 */
		find: function(context) {
			var findData = context.view.getFindData();
			Contact.find(findData.findType, findData.findKeyWord);
		},

		/**
		 * 返回
		 */
		exit: function(context) {
			context.view.close(null, function() {
				User.current().logout();
				app.start('/login');
			});
		},

		openMenu: function(context) {
			context.view.children.menu.open();
		}

	});

});