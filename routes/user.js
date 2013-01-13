var app = require('../app');

var User = require('../model/User');

app.options('/user', function(req, res){
	console.log('request permission for cross domain', req.headers.referrer);
	res.send({success:1});
});

app.options('/users', function(req, res){
	console.log('request permission for cross domain', req.headers.referrer);
	res.send({success:1});
});

app.get('/user/:id', function(req, res){
	console.log('get user', req.params.id);
	User.read(req.params, function(user){
		console.log('found user', user);
		res.send(user);	
	});
	
});

app.get('/users', function(req, res){
	console.log('get users', req.body);
	User.find(function(err, users){
		console.log('found users', users);
		res.send(users);	
	});
	
});

app.post('/user', function(req, res){
	console.log('received POST for /user');
	console.log(req.body, req.params);
	if(!req.body){
		res.send({success:0});
	}else{
		User.create(req.body, function(user){
			res.send(user);	
		});	
	}
});

app.put('/user', function(req, res){
	console.log('received PUT for /user');
	console.log(req.body, req.params);
	if(!req.body){
		res.send({success:0});
	}else{
		User.update(req.body, function(user){
			res.send(user);	
		});	
	}
});

app.del('/user', function(req, res){
	console.log('received DELETE for /user');
	console.log(req.body, req.params);
	if(!req.body){
		res.send({success:0});
	}else{
		User.remove(req.body, function(result){
			res.send(result);
		});	
	}
});

console.log('user route ready');
