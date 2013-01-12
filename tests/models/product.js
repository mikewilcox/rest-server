module.exports = function(type, cb){
	require('../harness/testModel')('../../model/Product', '../data/products.json', type, cb);
};