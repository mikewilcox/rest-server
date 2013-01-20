define([
	'dojo/_base/declare',
	'dojo/when',
	'dojo/store/Memory',
	'dojo/store/Observable',
	'dojo/store/JsonRest'
], function(declare, when, Memory, Observable, JsonRest){
	
	// https://github.com/sirprize/dojo-local-storage/blob/master/LocalStorage.js
	
	console.log('Create JsonRest');
	
	var store = new JsonRest({
		target:'http://localhost:3000/user/'	
	});
	
	var MIKE = '50f358506955b39750000002';
	var DON = '50f1cf1e4292b4f83500001e';
	var postData = {
		firstname:'Bob',
		lastname:'Byron',
		age:56
	};
	var putData = {
		firstname:'Robert',
		lastname:'Byron',
		age:76
	};
	
	var removeUser = function(){
		when(store.remove(putData.id), function(result){
			console.log('JsonStore DEL', result, arguments);
		}, function(err){
			console.error('JsonStore DELETE error', err);
		});
	}
	
	var getUsers = function(){
		when(store.query({lastname:'Byron'}), function(result){
			console.log('JsonStore QUERY', result);
			removeUser();
		}, function(err){
			console.error('JsonStore QUERY error', err);
		});
	}
	
	var putUser = function(){
	
		when(store.put(putData), function(result){
			console.log('JsonStore PUT', result);
			getUsers();
		}, function(err){
			if(err.status == 404){
				console.error('User not found!');
			}
			console.error('JsonStore PUT error', err.status);
		});
	}
	
	var postUser = function(){
		when(store.add(postData), function(result){
			console.log('JsonStore POST', result);
			putData.id = result._id;
			putUser();
		}, function(err){
			console.error('JsonStore POST error', err);
		});
	};
	
	var getUser = function(){
		when(store.get(MIKE), function(result){
			console.log('JsonStore GET', result);
			postUser();
		}, function(err){
			console.error('JsonStore GET error', err);
		});
	};
	
	getUser();
	
});