var app = require('../app');

module.exports = function(modelPath, path){
	var log = require('../util/log')(path, 1);
	
	var Model = require(modelPath);
	
	log('create route for ', path, Model);
	
	app.all('/users', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});
		
	app.options('/' + path, function(req, res){
		log('request permission for cross domain', req.headers.referrer);
		res.send({success:1});
	});
	
	app.get('/' + path + '/:id', function(req, res){
		log('get item', req.params.id);
		Model.read(req.params, function(item){
			log('found item', item);
			res.send(item);	
		});
		
	});
	
	app.get('/' + path + 's', function(req, res){
		log('get items', req.body);
		Model.find(function(err, items){
			log('found items', items);
			res.send(items);	
		});
		
	});
	
	app.post('/' + path, function(req, res){
		log('received POST for /item');
		log(req.body, req.params);
		if(!req.body){
			res.send({success:0});
		}else{
			Model.create(req.body, function(item){
				res.send(item);	
			});	
		}
	});
	
	app.put('/' + path, function(req, res){
		log('received PUT for /item');
		log(req.body, req.params);
		if(!req.body){
			res.send({success:0});
		}else{
			Model.update(req.body, function(item){
				res.send(item);	
			});	
		}
	});
	
	app.del('/' + path, function(req, res){
		log('received DELETE for /item');
		log(req.body, req.params);
		if(!req.body){
			res.send({success:0});
		}else{
			Model.remove(req.body, function(result){
				res.send(result);
			});	
		}
	});
	
	log('router created for ', path);
};