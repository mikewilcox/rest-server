var declareModel = require('./Model');

module.exports = declareModel('Category', {
	label: {type: String, required: true},
	notes: {type: String},
	categoryid:{type: Number, incrementing:true},
	timestamp: {type: Date, default: Date.now}
});
