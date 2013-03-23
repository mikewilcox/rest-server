var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static('client'));
app.all('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});
module.exports = app;