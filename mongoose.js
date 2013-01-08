//
// Mongoose docs http://mongoosejs.com/docs/api.html
//	http://mongoosejs.com/docs/models.html
// - careful of outdated docs
//
console.log('\n\n\nstart');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var exit = function(){
	console.log('[program exiting normally]');
	process.exit(0);
};

var nameValidator = function(value){
	console.log(' ---------------- NAME VALIDATOR', value, typeof value === 'string', value + 1);
	return true;
}
var ageValidator = function(value){
	console.log(' ---------------- AGE VALIDATOR', value, typeof value === 'number', value + 1);
	return true;
}
var fullname = function(){
	console.log('filllllll:', arguments);
	return "FULL"
}

var Kitten;
var makeModel = function(){
	var kittySchema = new mongoose.Schema({
		name: {type: String, required: true, validate: nameValidator},
		last:{type: String, required: true, validate: nameValidator},
		fullname:{type: String, get:fullname},
		age: {type: Number, required: true, validate: ageValidator},
		timestamp: {type: Date, default: Date.now}
	});
	
	kittySchema.methods.speak = function () {
		var greeting = this.name
			? "Meow! My name is " + this.name
			: "I don't have a name"
		
		console.log(greeting);
	};
	
	kittySchema.pre('save', function(next){
		console.log('about to save...', arguments);
		next();
	});
	kittySchema.post('save', function(){
		console.log('... save occured', arguments);
	});
	kittySchema.pre('remove', function(next){
		console.log('about to remove...');
		next();
	});
	kittySchema.post('remove', function(){
		console.log('... remove occured');
	});

	Kitten = mongoose.model('Kitten', kittySchema);
	
	return Kitten;
}

var makeKitten = function(){
	var kitty = new Kitten({ name: 'Figaro', age:13, last:'Wilcox' });
	kitty.speak();
	return kitty;
}

var saveKitten = function(kitty, callback){
	kitty.save(function (err, fluffy) {
		console.log('SAVE ARGS', err);
		if (err){
			console.error('error saving kitty', err);
		}else{
			console.log('kitty is saved!');
			callback();
		}
		
	});
}

var findKittens = function(callback){
	console.log(' * findKittens');
	Kitten.find(function (err, kittens) {
		if (err){
			console.error('error finding kittens', err);
		}
		callback(kittens);
	});
}

var removeKitten = function(kitten, callback){
	console.log(' * removeKitten');
	kitten.on('remove', function(){
		console.log('REMOVE EVENT');
	});
	kitten.remove(function(){ console.log('killed CALLBACK:', kitten); callback();});
}

var removeKittens = function(){
	findKittens(function(kittens){
		console.log(kittens.length, kittens);
		
		removeKitten(kittens[0], function(){
			// note removed is still in memory, we have to re-query
			findKittens(function(kittens){
				console.log('one less kitten: ', kittens.length, kittens);
				exit();	
			});
		});
	});
}

var onOpen = function(){
	makeModel();
	var kitten = makeKitten();
	console.log('name-o:', kitten.name, kitten.get('fullname'));
	
	saveKitten(kitten, function(){
		removeKittens();	
	});
	
}



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('OPEN');
	onOpen();
});