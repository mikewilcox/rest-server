var express = require('express');
var app = express();
require('./routes/router')(app);

app.use(express.bodyParser());
app.all('/save', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

var fs = require("fs");

app.get('/', function(req, res){
	console.log('recieved request for root');
	var html = fs.readFileSync('./html/user.html', 'utf8');	
	res.send(html);
});



app.listen(3000);