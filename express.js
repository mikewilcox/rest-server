var app = require('./app');


/*
var fs = require("fs");
app.get('/', function(req, res){
	console.log('recieved request for root');
	var html = fs.readFileSync('./client/index.html', 'utf8');	
	res.send(html);
});
*/

require('./routes/router');

app.listen(3000);