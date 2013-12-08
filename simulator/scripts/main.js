/**
 * 应用启动模块
 */
define(function(require, exports, module) {
	var $ = require('./jquery');
	var ui = {
		'home': $("#home"),
		'view': $('#view')
	};
	
	var homePage = location.href.split('?')[1];
	ui.home.click(function() {
		ui.view.attr('src', homePage);
	}).click();
});