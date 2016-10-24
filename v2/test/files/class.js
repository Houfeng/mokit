module('Class模块');

define(function(require, exports, module) {

	var $class = require('../../src/class');

	test("JSON模块", function() {

		ok($class && $class.create, '创建class模块');

		//类型A
		var A = $class.create({
			name: 'A',
			helloText: 'Hello:',
			say: function() {
				return "A:" + this.name;
			}
		});
		A.extend({
			hello: function() {
				return this.helloText + this.name;
			}
		});
		A.static({
			say: function() {
				return "Class A";
			}
		});
		notEqual(A, null, '创建类A');
		equal(typeof A, 'function', '验证类A为typeof为function');
		var a = new A();
		notEqual(a, null, '创建类A的实例');
		ok(a instanceof A, '验证a instanceof A');
		equal(a.name, 'A', '访问类A的name成员');
		equal(typeof a.say, 'function', '验证类A的say方法');
		equal(a.say(), 'A:A', '访问类A的say方法');
		equal(A.say(), 'Class A', '访问类A静态say方法');

		//类型B
		var B = $class.create(A, {
			name: 'B',
			say: function() {
				return "B:" + this.name;
			}
		});
		B.static({
			say: function() {
				return "Class B";
			}
		});
		notEqual(B, null, '创建类B,B继承于A');
		equal(typeof B, 'function', '验证类B为typeof为function');
		var b = new B();
		notEqual(b, null, '创建类b的实例');
		ok(b instanceof B, '验证b instanceof B');
		ok(b instanceof A, '验证b instanceof A');
		equal(b.name, 'B', '访问类B的name成员');
		equal(typeof a.say, 'function', '验证类B的say方法');
		equal(b.say(), 'B:B', '访问类B的say方法');
		notEqual(b.base, null, '访问类B的父类');
		equal(b.base.name, 'A', '访问类B的父类的name成员');
		equal(b.base.say(), 'A:B', '访问类B的父类的say方法');
		equal(B.say(), 'Class B', '访问类B静态say方法');
		equal(b.hello(), 'Hello:B', '访问类B的hello方法');
	});

});