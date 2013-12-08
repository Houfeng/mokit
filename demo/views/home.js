define(function(require, exports, module) {
	"use strict";

	var view = require('../../src/view');

	/**
	 * 测试页视图
	 */
	return view.create({
		template: module.resovleUri('../templates/home.html'),
		/**
		 * 元素
		 */
		el: {
			findTypeBox: '#findTypeBox',
			findBox: '#findBox'
		},
		getFindData: function(event) {
			var self = this;
			return {
				findType: self.el.findTypeBox.find(':selected').val(),
				findKeyWord: self.el.findBox.val()
			};
		},
		setFocus: function(event) {
			var self = this;
			self.el.findBox.focus();
		},
		onDisplay: function(event) {
			var self = this;
			self.setFocus();
		}
	});

});