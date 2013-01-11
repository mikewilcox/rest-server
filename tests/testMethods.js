var mongoose = require('mongoose');
var log = require('../util/log')('', 1);
var sequence = require('../util/util').sequence;
var getJson = require('../util/util').getJson;
var Product = require('../model/Product');

var exit = function(){
	console.log('[program exiting normally]');
	process.exit(0);
};

var
	allitems,
	Item,
	testData;

var
	setProps = function(_Item, dataPath){
		Item = _Item;
		testData = getJson(dataPath);
	},
	
	logItems = function(cb){
		log('allitems', allitems);
		cb();
	},
	
	countItems = function(cb){
		find(function(items){
			console.log('item amount:', items.length);
			allitems = items;
			cb(items);
		});
	},
	
	find = function(cb){
		// don't cache items, because they need to be refetched
		console.log(' * find items');
		Item.find(function(err, result){
			if (err){
				error(err);
			}else{
				cb(result);
			}	
		});
	},
	
	save = function(item, cb){
		item.save(function(err, result){
			if (err){
				error(err);
			}else{
				cb(result);
			}	
		});
	},
	
	removeAll = function(cb){
		var amt = allitems.length;
		var count = 0;
		console.log('removeAll', amt);
		allitems.forEach(function(item){
			item.remove(function(){	
				count++;
				if(count >= amt){
					cb();
				}
			});
		});
	},
	
	createFromData = function(cb){
		var amt = testData.length;
		var count = 0;
		console.log('createFromData', amt);
		testData.forEach(function(data){
			var item = new Item(data);
			save(item, function(){	
				count++;
				//console.log('item!', count, amt);
				if(count >= amt){
					cb();
				}
			});
		});
	},
	
	runTests = function(array){
		sequence(array);
	},
	
	
	connectdb = function(cb){
		mongoose.connect('mongodb://localhost/test');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
			console.log('\n\n\n\n db open.');
			cb();
		});
	};


module.exports = {
	setProps:setProps,
	logItems:logItems,
	createFromData:createFromData,
	countItems:countItems,
	find:find,
	save:save,
	removeAll:removeAll,
	runTests:runTests,
	connectdb:connectdb,
	exit:exit
};