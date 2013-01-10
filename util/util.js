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
	}
}

module.exports = exports = util;