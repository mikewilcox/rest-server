define([
	'dojo/_base/declare',
	'dojo/when',
	'dojo/store/Memory',
	'dojo/store/Observable',
	'dojo/store/JsonRest'
], function(declare, when, Memory, Observable, JsonRest){
	
	console.log('Create JsonRest');
	
	var store = new JsonRest({
		target:'http://localhost:3000/user/'	
	});
	
	var MIKE = '50f1cf1e4292b4f83500001f';
	var DON = '50f1cf1e4292b4f83500001e';
	
	when(store.get(MIKE), function(result){
		console.log('JsonStore GET', result);
	}, function(err){
		console.error('JsonStore error', err);
	});
	
});