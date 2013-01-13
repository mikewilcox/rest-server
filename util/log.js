/*
 *	log is accessed like:
 *		var log = require('../util/log')('FOO', 1);
 *		log('MOO'); // [FOO] MOO
 */

var log = function(name, enabled){
	if((enabled === false || enabled === 0)) { return function(){}; }
	var logger = function(){
		var args = Array.prototype.slice.call(arguments);
		if(name) { args.unshift(" ["+name+"] "); }
		console.log.apply(console, args);
	};
	logger.table = table;
	return logger;
};

/*
 *	table is accessed like:
 *		var log = require('../util/log')('FOO', 1);
 *		log.table(object);
 *
 *	object should contain arrays of equal length
 *		object = {
 *			a:[1,2]
 *			b:[4,5]
 *		}
 */

var forIn = function(obj, cb){
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			cb(key, obj[key]);
		}
	}
}

var padding = [''];
var _space = '';
for(var i=1; i<=50; i++){
	_space = _space += ' ';
	padding[i] = _space;
}

var pad = function(str, len){
	str = str + '';
	var amt = len - str.length;
	if(amt > 0){
		str += padding[amt];
	}
	return str;
}

var makeStr = function(chr, len){
	var str = '';
	for(var i = 0; i <= len; i++){
		str += chr;
	}
	return str;
}

var table = function(obj){
	
	var labels = [];
	var props = [];
	var values = [];
	
	// set labels
	forIn(obj, function(key, arr){
		labels.push(key);
		values.push(arr);
	});
	
	// set values into columns
	values[0].forEach(function(lbl, i){
		props[i] = [];
		values.forEach(function(arr, ii){
			props[i].push(arr[i]);
		});
	});
	props.unshift(labels);
	
	// get common value string lengths
	var totalLength = 0;
	props[0].forEach(function(m, i){
		var max = 0;
		props.forEach(function(ar){
			max = Math.max((ar[i]+'').length, max);
		});
		max++;
		console.log('max', max);
		totalLength += (max || 0) + 1;
		props.forEach(function(ar){
			if(ar[i]) ar[i] = pad(ar[i], max);
		});
	});
	
	// log it
	var line = makeStr('=', totalLength+1);
	var div = makeStr('.', totalLength+1);
	console.log(line);
	props.forEach(function(ar, i){
		if(i === 1) console.log(div);
		console.log('  ' + ar.join(' '));
	});
	console.log(line);
};




module.exports = exports = log;