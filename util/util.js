var count = 1;
var fs = require('fs');
var commentRegExp = /(\/\/.*)/mg;
var util = {
	sequence: function(fns){
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
	getUniqueId: function(){
		count++;
		var r = Math.ceil( Math.random() + 10000 );
		var d = new Date().getTime();
		return d + r + count;
	},
	getJson: function(path){
		// strip comments
		var text = fs.readFileSync(path, 'utf-8');
		text = text.replace(commentRegExp, '');
		return JSON.parse(text);
	}
}

module.exports = exports = util;