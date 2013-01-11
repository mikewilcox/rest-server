var mongoose = require('mongoose');
var Product = require('../model/Product');

var test = require('./testMethods');




var exit = function(){
	console.log('[program exiting normally]');
	process.exit(0);
};

var allitems;


var logItems = function(){
	log(allitems);	
};

var countItems = function(cb){
	find(function(items){
		console.log('item amount:', items.length);
		allitems = items;
		cb(items);
	});
};

var find = function(cb){
	console.log(' * find items');
	Product.find(function(err, result){
		if (err){
			error(err);
		}else{
			cb(result);
		}	
	});
};


var save = function(item, cb){
	item.save(function(err, result){
		if (err){
			error(err);
		}else{
			cb(result);
		}	
	});
};

var createFromData = function(cb){
	var amt = testData.length;
	var count = 0;
	console.log('createFromData', amt);
	testData.forEach(function(data){
		var item = new Product(data);
		save(item, function(){	
			count++;
			console.log('item!', count, amt);
			if(count >= amt){
				cb();
			}
		});
	});
};

var runTests = function(){
	sequence([
		createFromData,
		countItems,
		logItems,
		exit
	]);
};


var onOpen = function(){
	//log('mongoose', mongoose);
	runTests();
};

test.connectdb(function(){
	test.setProps(Product, '../data/products.json');
	test.runTests([
		test.createFromData,
		test.countItems,
		//test.logItems,
		test.removeAll,
		test.countItems,
		test.exit
	]);	
});
