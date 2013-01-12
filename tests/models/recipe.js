module.exports = function(type, cb){
	require('../harness/testModel')('../../model/Recipe', '../data/recipes.json', type, cb);
};