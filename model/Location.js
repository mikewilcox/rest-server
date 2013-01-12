var declareModel = require('./Model');

module.exports = declareModel('Location', {
	label: {type: String, required: true},
	description: {type: String},	
	notes: {type: String},
	locationid:{type: Number, incrementing:true},
	timestamp: {type: Date, default: Date.now}
});
