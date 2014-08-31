define(function(require, exports, module) {
	"use strict";

	var app = require('mokit/app');

	/**
	 * 登陆页
	 */
	return app.view.create({
		template: module.resovleUri('../templates/login.html'),
		setLanguage: function(event, name) {
			var self = this;
			app.language.setLanguage(name, function() {
				self.render();
				app.language.save();
			});
		},
		setStyle: function(event, name) {
			app.style.setStyle(name);
			app.style.save();
		},
		alert: function(msg) {
			alert(msg);
		}
	});

});