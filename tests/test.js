/*
 * To run tests or modify data, start from test directory and run:
 * 		node test [model name or all] [test type]
 * 			1:  name of model, lower case, or all, for all models
 * 			2: test type:
 * 				all (runs tests)
 * 				init (erases current data and replaces it with test data)
 * 				remove (clears data from db)
 * 				
 */

var testMethods = require('./testMethods');
var test = process.argv[2];
var type = process.argv[3];

console.log('\n\n\n\nstart tests');

if(test === 'all'){
	var tests = [];
	require('fs').readdirSync('./models/').forEach(function(srcFile){
		var id = srcFile.split('.')[0];
		var mid = './models/' + id;
		tests.push(function(cb){
			require(mid)(type, function(){
				cb();
			});
		});
	});
	testMethods.run(tests, function(){
		process.exit(0);	
	});
}else{
	require('./models/'+test)(type, function(){
		console.log('DONE');
		process.exit(0);
	});
}