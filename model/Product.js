var declareModel = require('./Model');


module.exports =  declareModel('Product', {
	label: {type: String, required: true},
	fulllabel: {type: String},	
	notes: {type: String},
	categoryids:{type:Array},
	locationids:{type:Array},
	recurring:{type:Boolean, default:false},
	productid:{type: Number, incrementing:true},
	timestamp: {type: Date, default: Date.now}
});