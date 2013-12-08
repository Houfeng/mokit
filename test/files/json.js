module('JSON模块');

define(function(require, exports, module) {

	var json = require('../../mokit/json');

	test("JSON模块", function() {

		ok(json && json.parse && json.stringify, '创建JSON模块');

		var obj = json.parse('{"name":"houfeng","age":"100"}');

		notEqual(obj, null, '将字符串解析为JSON对象');
		equal(obj.name, 'houfeng', '对象的name为houfeng');

	});

});