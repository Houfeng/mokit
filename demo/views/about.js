define(function(require, exports, module) {
	"use strict";

	var view = require('mokit/view'),
		grid = require('mokit/grid');
	//var docViewer = require('../doc_viewer');
	var Hammer = require('mokit/hammer');
	var move = require('mokit/move');

	/**
	 * 测试页视图
	 */
	return view.create({
		template: module.resovleUri('../templates/about.html'),
		el:{
		    block:'#block'
		},
		//在视图呈现前
		onRender: function() {
			var self = this;
			grid.use(self.ui);
			//docViewer.use(self.el.frm);
			var oldScale=1;
			Hammer( self.el.block[0]).on('transform',function(event){
			    //if(event.gesture.touches.length<2)return;
			    //if(Math.abs(oldScale-event.gesture.scale)>0.5)return;
			    oldScale=event.gesture.scale;
			    if(event.gesture.scale<0.5||event.gesture.scale>2)return;
			    setTimeout(function(){
			        self.el.block.css('transform','scale('+event.gesture.scale+')');
			    },0);
			    console.log(event.gesture.scale);
			});
		},
		//测试方法
		test: function(context) {
			//alert(0);
		}
	});
});