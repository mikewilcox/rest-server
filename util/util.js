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
	
	getIncId = function(Item, property, cb){
		if(Item._incId){
			Item._incId++;
			cb(Item._incId);
		}else{
			Item.find(function(err, items){
				console.log('on save, found this many:', items);
				var id = 0;
				items.forEach(function(item){
					id = Math.max(id, item[property]);
				});
				Item._incId = id + 1;
				cb(Item._incId);
			});	
		}
		
		
	},
	
	getJson = function(path){
		// strip comments
		var text = fs.readFileSync(path, 'utf-8');
		text = text.replace(commentRegExp, '');
		return JSON.parse(text);
	};


module.exports = {
	sequence:sequence,
	getUniqueId:getUniqueId,
	getIncId:getIncId,
	getJson:getJson
};