var mongoose = require('mongoose');
var getUniqueId = require('../util/util').getUniqueId;

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
	console.log('about to save...', this);
	this.productid = getUniqueId();
	next();
});

Product = mongoose.model('Product', schema);

module.exports = Product;