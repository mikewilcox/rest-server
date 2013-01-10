var log = function(name, enabled){
	if((enabled === false || enabled === 0)) { return function(){}; }
	return function(){
		var args = Array.prototype.slice.call(arguments);
		if(name) { args.unshift(" ["+name+"] "); }
		console.log.apply(console, args);
	};
};

module.exports = exports = log;