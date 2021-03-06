var mongoose = require('mongoose');
var getJson = require('../util/util').getJson;
var getIncId = require('../util/util').getIncId;


var declareModel = function(className, schema){
	
	var
		Model,
		incrementingKey,
		log = require('../util/log')(className, 1);
		
	for(var key in schema){
		var props = schema[key];
		if(props.incrementing){
			incrementingKey = key;
			delete props.incrementing;
		}
	}
	
	//log('incrementingKey', incrementingKey);
	schema = new mongoose.Schema(schema);
	
	if(incrementingKey){
		schema.pre('save', function(next, cb, arg){
			log('about to save...', incrementingKey);
			getIncId(Model, this, incrementingKey, next);
		});
	}
		
	Model = mongoose.model(className, schema);
	
	var
		allitems,
		itemData,
		logItem;
	
	var
	
		// private
		
		error = function(err){
			log('ERR');
			console.error('Error:', err);
		},
		
		save = function(item, cb){
			item.save(function(err, result){
				if (err){
					error(err);
					cb(null, err);
				}else{
					if(logItem) console.log(result);
					cb(result);
				}	
			});
		},
		
		normalizeId = function(thing){
			return (typeof thing === 'string' || thing === 'number' ? thing : thing.id) + ''; // also check if Model ?
		},
		
		handleResult = function(item, err, cb){
			if(err){
				cb({success:0, error:err});
			}else if(item){
				item.id = item._id;
				cb(item);
			}else{
				cb({success:0, error:'Item not found'})
			}
		},
		
		// public, non-chainable
		
		run = function(jobs, callback){
			var rn = function(){
				var job = jobs.shift();
				job(function(){
					// HANDLE ERRORS AND CONTINUE OR ABORT
					if(jobs.length){
						rn();
					}else if(callback){
						callback();
					}
				});
			};
			rn();
		},
		
		setProps = function(options){
			console.log(process.cwd());
			if(options.dataPath) itemData = getJson(options.dataPath);
			if(options.logItem) logItem = 1;
		},
		
		
		
		create = function(data, cb){
			var item = new Model(data);
			save(item, function(item, err){
				handleResult(item, err, cb);
			});
		},
		
		read = function(data, cb){
			var id = normalizeId(data);
			console.log('read', data, id);
			Model.findById(id, '-__v').exec(function(err, item){
				handleResult(item, err, cb);
			});
		},
		
		update = function(data, cb){
			var id = normalizeId(data);
			Model.findByIdAndUpdate(id, data).exec(function(err, item){
				handleResult(item, err, cb);
			});
		},
		
		remove = function(data, cb){
			var id = normalizeId(data); 
			Model.findById(id, function(err, item){
				if(err){
					cb({success:0, error:err});
					return;
				}else if(!item){
					cb({success:0, error:'item not found'});
					return;
				}
				console.log('remove:', err, item);
				item.remove(function(err){
					if(err){
						cb({success:0, error:err});	
					}else{
						cb({success:1});
					}	
				});
				
			});
		},
		
		// The following should not have any arguments except cb (callback) in order to mitigate
		// callback hell
		
		logItems = function(cb){
			console.log('allitems', allitems);
			var excludes = '_idXX,timestamp,__v'.split(',');
			find(function(items){
				console.log('item amount:', items.length);
				allitems = items;
				var itemprops = {};
				allitems.forEach(function(item){
					var props = [];
					for(var key in item.schema.paths){
						if(!~excludes.indexOf(key)){
							itemprops[key] = itemprops[key] || [];
							itemprops[key].push(item[key] || ' ');
						}
					}
				});
				log.table(itemprops);
				cb();
			});
		},
		
		XlogItems = function(cb){
			console.log('allitems', allitems);
			var excludes = '_id,timestamp,__v'.split(',');
			find(function(items){
				console.log('item amount:', items.length);
				allitems = items;
				var itemprops = [];
				allitems.forEach(function(item){
					var props = [];
					for(var key in item.schema.paths){
						if(!~excludes.indexOf(key)){
							props.push(key + ':' + (item[key] || ""));
						}
					}
					itemprops.push(props);
					//console.log('  ', props.join(', '));//, '\n', item.schema.paths);
				});
				log.logTable(itemprops);
				cb();
			});
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
			log(' * find items');
			Model.find(function(err, result){
				if (err){
					error(err);
				}else{
					cb(result);
				}	
			});
		},
		
		removeAll = function(cb){
			var rm = function(){
				var amt = allitems.length;
				var count = 0;
				log('removeAll', amt);
				
				allitems.forEach(function(item){
					item.remove(function(){	
						count++;
						if(count >= amt){
							cb();
						}
					});
				});
			};
			if(!allitems){
				find(function(result){
					if(!result || !result.length){
						log('no items to remove');
						cb();	
					}else{
						allitems = result;
						rm();
					}
				});
			}else{
				rm();
			}
			
		},
		
		createFromData = function(cb, dataPath){
			if(dataPath){
				itemData = getJson(dataPath);
			}
			var amt = itemData.length;
			var count = 0;
			log('createFromData', amt);
			var sv = function(){
				//log('sv', itemData.length);
				var data = itemData.pop();
				var item = new Model(data);
				save(item, function(){
					//log("sv'd");
					if(itemData.length){
						sv();
					}else{
						cb();
					}
				});
			};
			sv();
		};
	
	Model.setProps = setProps;
	Model.create = create,
	Model.read = read,
	Model.remove = remove,
	Model.update = update,
	Model.run = run;
	Model.logItems = logItems;
	Model.createFromData = createFromData;
	Model.countItems = countItems;
	Model.findAll = find;
	Model.save = save;
	Model.removeAll = removeAll;
	
	Model.tests = {
		all:[
			Model.removeAll,
			Model.createFromData,
			Model.countItems,
			Model.logItems,
			Model.removeAll,
			Model.countItems
		],
		log:[
			Model.logItems
		],
		init:[
			Model.removeAll,
			Model.createFromData,
			Model.countItems
		],
		remove:[
			Model.removeAll
		]
	}
	
	return Model;
};

module.exports = declareModel;