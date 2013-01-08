var exit = function(){
	console.log('[program exiting normally]');
	process.exit(0);
};


var mongoose = require('mongoose');
// add a check in mongoose for if db connected
mongoose.connect('mongodb://localhost/test');

var User = require('../model/User');

var create = function(){
	var user = new User({ name: 'Figaro', age:13, last:'Wilcox' });
	user.speak();
	return user;
}

var save = function(user, callback, errback){
	user.save(function(err, user){
		if (err){
			console.error('error saving user', err);
			errback(err);
		}else{
			console.log('user is saved!');
			callback(user);
		}	
	});
}

var find = function(callback, errback){
	console.log(' * find users');
	User.find(function (err, users) {
		if (err){
			console.error('error finding users', err);
			errback(err);
		}else{
			callback(users);	
		}
		
	});
}


var onOpen = function(){
	var user = create();
	console.log('name-o:', user.name, user.get('fullname'));
	
	save(user, function(){
		find(function(users){
			console.log('users::::', users.length, '\n', users);
			exit();
		}, function(err){});
	}, function(err){});
	
	
	
}



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('OPEN');
	onOpen();
});

