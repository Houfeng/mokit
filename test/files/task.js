define(function (require) {
	var Task=require("../../src/task");
	var task=Task.create();
	task.add("fn1",function (done) {
		setTimeout(function () {
			done("fn1");
		},3000);
	}).add("fn2",function (done) {
		setTimeout(function () {
			done("fn2");
		},100);
	}).one(function(name,value) {
		alert(name);
	}).seq(function (rs) {
		alert(rs.fn1);
	});
});