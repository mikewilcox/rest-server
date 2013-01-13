var mongoose = require('mongoose');
var log = require('../util/log')('RTR', 1);

var connectdb = function(cb){
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('db open.');
		if(cb) process.nextTick(cb);
	});
};
connectdb();


module.exports = function(app){
	require('./user')(app);	
}
