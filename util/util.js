var count = 1;
var fs = require('fs');
var commentRegExp = /(\/\/.*)/mg;


var 
	sequence = function(fns){
		var callback = function(){
			if(fns.length){
				var fn = fns.shift();
				fn(function(){
					callback();	
				});		
			}
		};
		callback();	
	},
	
	getUniqueId = function(){
		count++;
		var r = Math.ceil( Math.random() + 10000 );
		var d = new Date().getTime();
		return d + r + count;
	},
	
	getIncId = function(Item, instance, property, cb){
		if(Item._incId){
			Item._incId++;
			instance[property] = Item._incId;
			cb();
		}else{
			Item.find(function(err, items){
				console.log('getIncId, found this many:', items);
				var id = 0;
				items.forEach(function(item){
					id = Math.max(id, item[property]);
				});
				Item._incId = id + 1;
				instance[property] = Item._incId;
				cb();
			});	
		}
		
		
	},
	
	forIn = function(obj, cb){ // note lack of context option
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				cb(key, obj[key]);
			}
		}
	},
	
	getJson = function(path){
		// strip comments
		var text = fs.readFileSync(path, 'utf-8');
		text = text.replace(commentRegExp, '');
		try{
			return JSON.parse(text);
		}catch(e){
			console.error('Error parsing json file ', path, e);
			throw new Error(e);
		}
	};


module.exports = {
	sequence:sequence,
	getUniqueId:getUniqueId,
	getIncId:getIncId,
	getJson:getJson
};