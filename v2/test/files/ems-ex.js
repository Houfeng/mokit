module('EMS插件');

define(function(require, exports, module) {

	test("Text插件", function() {
		var rs = require('../../src/ems-text!1.json');
		ok(rs, 'Text加载成功: ' + rs);
	});
	
	
	test("JSON插件", function() {
		var rs = require('../../src/ems-json!1.json');
		ok(rs, 'JSON加载成功');
		equal(rs.name, 'houfeng', '对象的name为houfeng');
	});

});