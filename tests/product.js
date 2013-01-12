var mongoose = require('mongoose');
var Product = require('../model/ProductModel');
var test = require('./testMethods');

test.connectdb(function(){
	Product.setProps({
		dataPath:'../data/products.json',
		logItem:1
	});
	Product.run([
		Product.removeAll,
		Product.createFromData,
		Product.countItems,
		//Product.logItems,
		Product.removeAll,
		Product.countItems,
		test.exit
	]);	
});
