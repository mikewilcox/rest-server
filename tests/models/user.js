module.exports = function(type, cb){
	require('../harness/testModel')('../../model/User', '../data/users.json', type, cb);
};