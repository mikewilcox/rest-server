module.exports = function(type, cb){
	require('../harness/testModel')('../../model/Location', '../data/locations.json', type, cb);
};