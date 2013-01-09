// http://mongoosejs.com/docs/api.html#model_Model-remove
var exit = function(){
	console.log('[program exiting normally]');
	process.exit(0);
};


var mongoose = require('mongoose');
var Deferred = require('promised-io/promise').Deferred;
var all = require("promised-io/promise").all;
var fs = require('fs');
var testData = JSON.parse(fs.readFileSync('../data/users.json', 'utf-8'));

console.log('TestData:', testData);

// add a check in mongoose for if db connected
mongoose.connect('mongodb://localhost/test');

var User = require('../model/User');

var create = function(name, age){
	name = name || 'Kevin';
	age = age || 21;
	var user = new User({ name: name, age:age, last:'Wilcox' });
	user.speak();
	return user;
}

var save = function(user){
	var dfd = new Deferred();
	user.save(function(err, result){
		if (err){
			dfd.reject(err);
		}else{
			dfd.resolve(result);
		}	
	});
	return dfd;
};

var find = function(){
	var dfd = new Deferred();
	console.log(' * find users');
	User.find(function(err, result){
		if (err){
			dfd.reject(err);
		}else{
			dfd.resolve(result);
		}	
	});
	return dfd;
};

var countUsers = function(){
	var dfd = new Deferred();
	find().then(function(users){
		console.log('user amount:', users.length);
		dfd.resolve(users);
	});
	
	return dfd;
}

var createUsersFromData = function(){
	var dfd = new Deferred();
	var deferreds = testData.map(function(data){
		var user = new User(data);
		return save(user);
	});
	all(deferreds).then(function(){ dfd.resolve(); });
	return dfd;
};


var runTests = function(){
	createUsersFromData().then(
		countUsers().then(
		//	exit()	
		)
	);
};


var onOpen = function(){
	runTests();
	return;

	
	var user = create('Snookie', 10);
	console.log('name-o:', user.name, user.get('fullname'));
	
	save(user).then(function(){
		User.df.find().then(function(users){
			console.log('\nlist of users:', users.length);
			
			User.df.clear().then(function(){
				console.log('all users removed. testing...');
				User.df.find().then(function(users){
					console.log('\nlist of users:', users.length);
					exit();
				});
			})
			
			return;
			var dfd = users[0].remove(function(){
				console.log('user removed. testing...', dfd);
				User.df.find().then(function(users){
					console.log('\nlist of users:', users.length);
					exit();
				});
			})
		});
	});
	
	
}



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('\n\n\n\n db open.');
	onOpen();
});

