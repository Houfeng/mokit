/**
 * 用户
 */
define(function(require, exports, module) {
	"use strict";

	var app = require("../../src/app"),
		linq = require('../../src/linq'),
		utils = require('../../src/utils'),
		User = require('../models/user');

	var Contact = app.model.create({
		name: '',
		tel: '',
		initialize: function(_name, _tel) {
			this.name = _name;
			this.tel = _tel;
		}
	});

	Contact.data = [
		new Contact('张三', '3333333333'),
		new Contact('李四', '4444444444'),
		new Contact('王五', '5555555555'),
		new Contact('赵六', '6666666666'),
		new Contact('钱七', '7777777777'),
		new Contact('孙八', '8888888888'),
		new Contact('张三', '3333333333'),
		new Contact('李四', '4444444444'),
		new Contact('王五', '5555555555'),
		new Contact('赵六', '6666666666'),
		new Contact('钱七', '7777777777'),
		new Contact('孙八', '8888888888'),
		new Contact('张三', '3333333333'),
		new Contact('李四', '4444444444'),
		new Contact('王五', '5555555555'),
		new Contact('赵六', '6666666666'),
		new Contact('钱七', '7777777777'),
		new Contact('孙八', '8888888888')
	];
	Contact.findResult = Contact.data;

	Contact.findTypeList = ['all', 'name', 'tel'];
	Contact.findType = 'all';
	Contact.findKeyWord = '';
	Contact.find = function(findType, keyword, callback) {
		Contact.findType = findType;
		Contact.findKeyWord = keyword;
		Contact.findResult = linq.From(Contact.data).Where(function(x) {
			if (findType == 'all')
				return utils.contains(x.name, Contact.findKeyWord) || utils.contains(x.tel, Contact.findKeyWord);
			else
				return utils.contains(x[Contact.findType], Contact.findKeyWord);
		}).ToArray();
		Contact.notifyRender();
		if (callback) callback();
	};


	return Contact;
});