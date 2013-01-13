module.exports = function(app){
	
	var User = require('../model/User');
	
	app.options('/user', function(req, res){
		console.log('request permission for cross domain', req.headers.referrer);
		res.send({success:1});
	});
	
	app.get('/user', function(req, res){
		console.log('get user', req.body);
		User.find(function(err, users){
			console.log('found users', users);
			//res.send({success:1});
			res.send(users[0]);	
		});
		
	});
	
	app.post('/user', function(req, res){
		console.log('received POST for /save');
		console.log(req.body);
		res.send({success:1});
	});
	
	console.log('user route ready');
	
};