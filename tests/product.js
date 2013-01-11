var mongoose = require('mongoose');
var Product = require('../model/Product');

var test = require('./testMethods');

test.connectdb(function(){
	test.setProps(Product, '../data/product.json');
	test.runTests([
		test.createFromData,
		test.countItems,
		//test.logItems,
		test.removeAll,
		test.countItems,
		test.exit
	]);	
});
