var express = require('express');
var app = express();
app.use(express.bodyParser());
app.all('/save', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

var fs = require("fs");

app.get('/', function(req, res){
	console.log('recieved request for root');
	
	var html = fs.readFileSync('./html/form.html', 'utf8');	
	res.send(html);
});

app.get('/save', function(req, res){
	console.log('cannot get save. Did you mean POST?');
	res.send({success:0});
});

app.options('/save', function(req, res){
	console.log('request permission for cross domain', req.headers.referrer);
	res.send({success:1});
});
app.post('/save', function(req, res){
	console.log('received POST for /save');
	console.log(req.body);
	res.send({success:1});
});

app.listen(3000);