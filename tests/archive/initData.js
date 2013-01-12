// put us in a known state for our path = ?
//process.chdir(__dirname);

var test = require('./testMethods');
var User = require('../model/User');

test.connectdb(function(){
	Model.setProps({
		dataPath:'../data/users.json',
		logItem:1
	});
	Model.run([
		Model.removeAll,
		Model.createFromData,
		Model.countItems,
		//Model.logItems,
		Model.removeAll,
		Model.countItems,
		test.exit
	]);	
});
