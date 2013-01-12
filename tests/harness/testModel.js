var testMethods = require('../testMethods');

module.exports = function(modelPath, dataPath, type, cb){
	var Model = require(modelPath);
	if(!type || type == 'all'){
		type = 'all'
	}
	console.log('recipe tests:', type);
	testMethods.connectdb(function(){
		Model.setProps({
			dataPath:dataPath,
			logItem: type === 'all'
		});
		
		if(!Model.tests[type]) throw Error('Error, no tests for ', type);
		console.log('run data test', type);
		var tests = Model.tests[type];
		if(cb){
			tests.push(cb)
		}
		Model.run(tests);	
	});
};