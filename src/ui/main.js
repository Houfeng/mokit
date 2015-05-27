define(function(require, exports, module) {
	//引入样式表
	require('./main.css');
	require('./icon.css');
	//
	var device = require('../device');
	var grid = require('../grid');

	var self = exports;
	self.use = function(ui) {
		grid.use(ui);
	};

});