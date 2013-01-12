var declareModel = require('./Model');
var log = require('../util/log')('USR', 0);

var nameValidator = function(value){
	log(' ---------------- NAME VALIDATOR', value, typeof value === 'string', value + 1);
	return true;
}
var ageValidator = function(value){
	log(' ---------------- AGE VALIDATOR', value, typeof value === 'number', value + 1);
	return typeof value === 'number';
}
var fullname = function(){
	log('filllllll:', arguments);
	return "FULL"
}


module.exports = declareModel('User', {
	firstname: {type: String, required: true, validate: nameValidator},
	lastname:{type: String, required: true, validate: nameValidator},
	fullname:{type: String, get:fullname},
	age: {type: Number, required: true, validate: ageValidator},
	timestamp: {type: Date, default: Date.now}
});

//userSchema.methods.speak = function () {
//	var greeting = this.name
//		? "Meow! My name is " + this.name
//		: "I don't have a name"
//	
//	console.log(greeting);
//};

