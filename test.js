console.log('\n\n\nstart');
var mongoose = require('mongoose');
mongoose.connect('localhost', 'test');
console.log('connected');

//var schema = new mongoose.Schema({ name: 'string' });
//console.log('schema', schema);

//var Cat = new mongoose.model('Dog', schema);


var Cat = new mongoose.model('Dog', { name: 'string' });

var kitty = new Cat({ name: 'Filo' });
kitty.save(function (err) {
	if (err){
		console.error('error', err);
	}else{
		console.log('meow');
	}
  
});

/*
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
*/