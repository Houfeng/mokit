define(function(require, exports, module) {
	"use strict";

	var view = require('mokit/view');
	var moui= require('mokit-ui');

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
		getFindData: function(content) {
			var self = this;
			return {
				findType: self.el.findTypeBox.find(':selected').val(),
				findKeyWord: self.el.findBox.val()
			};
		},
		setFocus: function(content) {
			var self = this;
			self.el.findBox.focus();
		},
		onRender:function(content){
			var self = this;
			moui.use(self.ui);
		},
		onDisplay: function(content) {
			var self = this;
			self.setFocus();
		}
	});

});