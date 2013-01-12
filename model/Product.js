var mongoose = require('mongoose');
var getUniqueId = require('../util/util').getUniqueId;
var getIncId = require('../util/util').getIncId;

var Product;
var schema = new mongoose.Schema({
	label: {type: String, required: true},
	fulllabel: {type: String},	
	notes: {type: String},
	categoryids:{type:Array},
	locationids:{type:Array},
	recurring:{type:Boolean, default:false},
	productid:{type: Number},
	timestamp: {type: Date, default: Date.now}
});


schema.pre('save', function(next, cb, arg){
	console.log('about to save...');
	getIncId(Product, this, 'productid', next);
});
	
schema.post('save', function(item, num){
	console.log('saved.', item);
	
});

Product = mongoose.model('Product', schema);


//var _save = Product.prototype.save;
//Product.prototype.save = function(data, cb){
//	_save.apply(this, arguments);
//}
//console.log('Product', Product.prototype.save);

module.exports = Product;