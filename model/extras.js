var Deferred = require('promised-io/promise').Deferred;
var all = require("promised-io/promise").all;

module.exports = function(Model){
	Model.df = {};
	Model.prototype.df = {};
	Model.df.find = function(){
		var dfd = new Deferred();
		Model.find(function(err, result){
			if (err){
				dfd.reject(err);
			}else{
				dfd.resolve(result);
			}	
		});
		return dfd;
	};
	
	Model.df.clear = function(){
		var dfd = new Deferred();
		Model.find(function(err, result){
			if (err){
				dfd.reject(err);
			}else{
				
				var deferreds = result.map(function(item){
					var dfd = new Deferred();
					item.remove(function(err, result){
						if (err){
							dfd.reject(err);
						}else{
							dfd.resolve(result);
						}	
					});
					return dfd;
				});
				
				all(deferreds).then(function(){
					dfd.resolve();
				});
			}	
		});
		return dfd;
	};
	
	
	var _remove = Model.prototype.remove;
	Model.prototype.remove = function(callback, errback){
		
		var dfd = new Deferred();
		_remove.call(this, function(err, result){
			if (err){
				if(errback) errback(err);
				dfd.reject(err);
			}else{
				if(callback) callback(result);
				dfd.resolve(result);
			}	
		});
		console.log('PROTO!!!', !!dfd);
		return dfd;
	};
	
}