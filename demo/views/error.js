define(function(require, exports, module) {
	"use strict";

	var view = require('mokit/view');

	/**
	 * 测试页视图
	 */
	return view.create({
		templateType: view.templateType.content,
		template: '<div style="padding:15px;text-align:center;color:#fff">{#$(this.message)#}</div>'
	});

});