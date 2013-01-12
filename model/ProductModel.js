var mongoose = require('mongoose');
var getUniqueId = require('../util/util').getUniqueId;
var getIncId = require('../util/util').getIncId;
var declareModel = require('./Model');


var Product = declareModel('Product', {
	label: {type: String, required: true},
	fulllabel: {type: String},	
	notes: {type: String},
	categoryids:{type:Array},
	locationids:{type:Array},
	recurring:{type:Boolean, default:false},
	productid:{type: Number, incrementing:true},
	timestamp: {type: Date, default: Date.now}
});

console.log('Created Product', Product);

module.exports = Product;