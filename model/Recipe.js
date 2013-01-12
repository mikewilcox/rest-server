var declareModel = require('./Model');

module.exports = declareModel('Recipe', {
	label: {type: String, required: true},
	recipeid:{type: Number, incrementing:true},
	productids:{type:Array},
	notes: {type: String},
	timestamp: {type: Date, default: Date.now}
	//
	// Also allow for pictures, instructions recipe category, etc
});
