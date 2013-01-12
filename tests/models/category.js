module.exports = function(type, cb){
	require('../harness/testModel')('../../model/Category', '../data/categories.json', type, cb);
};