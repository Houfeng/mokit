define(function (require) {
	var Task=require("../../src/task");
	//
	var task=Task.create();
	task.add("fn1",function (done) {
		setTimeout(function () {
			done("fn1");
		},1000);
	}).add("fn2",function (done) {
		setTimeout(function () {
			done("fn2");
		},500);
	}).end(function (rs) {
		alert("队列完成");
	});
	//
	
});