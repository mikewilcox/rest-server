var mongoose = require('mongoose');
var getUniqueId = require('../util/util').getUniqueId;
var getIncId = require('../util/util').getIncId;

var Product;
var schema = new mongoose.Schema({
	name: {type: String, required: true},
	fullname: {type: String},	
	notes: {type: String},
	categoryids:{type:Array},
	locationids:{type:Array},
	recurring:{type:Boolean, default:false},
	productid:{type: Number},
	timestamp: {type: Date, default: Date.now}
});


schema.pre('save', function(next, cb, arg){
	var me = this;
	console.log('about to save...', me.schema.name);
	getIncId(Product, 'productid', function(id){
		//var err = new Error('something went wrong');
		//next(err);
		// could find uniqueness here, but that might bog things down
		me.productid = id;
		next();
	});
	
});
schema.post('save', function(next, cb, arg){
	console.log('saved.');
});

Product = mongoose.model('Product', schema);


//var _save = Product.prototype.save;
//Product.prototype.save = function(data, cb){
//	_save.apply(this, arguments);
//}
//console.log('Product', Product.prototype.save);

module.exports = Product;