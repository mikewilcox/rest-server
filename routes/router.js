var mongoose = require('mongoose');
var log = require('../util/log')('RTR', 1);

var connectdb = function(cb){
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		log('db open.');
		if(cb) process.nextTick(cb);
	});
};
connectdb(function(){
	var createRoute = require('./base');
	createRoute('../model/User', 'user');
	//require('./user');
});

