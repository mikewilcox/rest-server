// http://mongoosejs.com/docs/api.html#model_Model-remove


var mongoose = require('mongoose');
var log = require('../util/log')('USR', 1);
var sequence = require('../util/util').sequence;
var fs = require('fs');
var testData = JSON.parse(fs.readFileSync('../data/users.json', 'utf-8'));
mongoose.connect('mongodb://localhost/test');


var exit = function(){
	console.log('[program exiting normally]');
	process.exit(0);
};


var error = function(err){
	console.error(err);
}


var User = require('../model/User');

var create = function(name, age){
	name = name || 'Kevin';
	age = age || 21;
	var user = new User({ name: name, age:age, last:'Wilcox' });
	user.speak();
	return user;
}

var save = function(user, cb){
	user.save(function(err, result){
		if (err){
			error(err);
		}else{
			cb(result);
		}	
	});
};

var find = function(cb){
	console.log(' * find users');
	User.find(function(err, result){
		if (err){
			error(err);
		}else{
			cb(result);
		}	
	});
};


var countUsers = function(cb){
	find(function(users){
		console.log('user amount:', users.length);
		cb(users);
	});
};


var createUsersFromData = function(cb){
	var amt = testData.length;
	var count = 0;
	console.log('createUsersFromData', amt);
	testData.forEach(function(data){
		var user = new User(data);
		save(user, function(){	
			count++;
			console.log('user!', count, amt);
			if(count >= amt){
				cb();
			}
		});
	});
};


var runTests = function(){
	sequence([
		createUsersFromData,
		countUsers,
		exit
	]);
};


var onOpen = function(){
	runTests();
};


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('\n\n\n\n db open.');
	onOpen();
});

