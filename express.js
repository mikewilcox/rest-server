var express = require('express');
var app = express();

app.use(express.bodyParser());
require('./routes/router')(app);


app.all('/save', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

var fs = require("fs");

app.use(express.static('client'));

/*
app.get('/', function(req, res){
	console.log('recieved request for root');
	var html = fs.readFileSync('./client/index.html', 'utf8');	
	res.send(html);
});
*/


app.listen(3000);