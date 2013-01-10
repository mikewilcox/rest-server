var mongoose = require('mongoose');
var Deferred = require('promised-io/promise').Deferred;
var addExtras  = require('./extras');

var nameValidator = function(value){
	console.log(' ---------------- NAME VALIDATOR', value, typeof value === 'string', value + 1);
	return true;
}
var ageValidator = function(value){
	console.log(' ---------------- AGE VALIDATOR', value, typeof value === 'number', value + 1);
	return typeof value === 'number';
}
var fullname = function(){
	console.log('filllllll:', arguments);
	return "FULL"
}

var userSchema = new mongoose.Schema({
	firstname: {type: String, required: true, validate: nameValidator},
	lastname:{type: String, required: true, validate: nameValidator},
	fullname:{type: String, get:fullname},
	age: {type: Number, required: true, validate: ageValidator},
	timestamp: {type: Date, default: Date.now}
});

userSchema.methods.speak = function () {
	var greeting = this.name
		? "Meow! My name is " + this.name
		: "I don't have a name"
	
	console.log(greeting);
};

userSchema.pre('save', function(next){
	console.log('about to save...');
	next();
});
userSchema.post('save', function(){
	console.log('... save occured');
});
userSchema.pre('remove', function(next){
	console.log('about to remove...');
	next();
});
userSchema.post('remove', function(item){
	console.log('... remove occured', item);
});

User = mongoose.model('User', userSchema);


//addExtras(User);




//console.log('User', User);

module.exports = User;