/**
 * 用户
 */
define(function(require, exports, module) {
	"use strict";

	var app = require("mokit/app");

	var User = app.model.create({
		username: '',
		password: '',
		isLogin: false,
		initialize: function(_name, _pwd) {
			this.username = _name || '';
			this.password = _pwd || '';
		},
		login: function() {
			if (true||this.username == 'houfeng' && this.password == '12345') {
				this.isLogin = true;
			}
			return this.isLogin;
		},
		logout: function() {
			this.isLogin = false;
		}
	});

	var currentUser = null;

	app.utils.defineProperty(User, 'current', {
		set: function() {
			currentUser = value;
		},
		get: function() {
			if (currentUser === null) {
				currentUser = new User();
			}
			return currentUser;
		}
	}, true);

	return User;
});