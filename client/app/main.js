define([
	'dojo/dom',
	'dojo/on',
	'dojo/request',
	'./store'
], function(dom, on, request){
	
	var getUser = dom.byId('getUserBtn');
	var putUser = dom.byId('putUserBtn');
	var postUser = dom.byId('postUserBtn');
	var rmUser = dom.byId('rmUserBtn');
	var allUser = dom.byId('allUserBtn');
	
	var MIKE = '50f1cf1e4292b4f83500001f';
	var DON = '50f1cf1e4292b4f83500001e';
	
	on(getUser, 'click', function(){
		request('http://localhost:3000/user/' + MIKE).then(function(result){
			console.log('result', result);
		});	
	});
	
	on(allUser, 'click', function(){
		request('http://localhost:3000/users').then(function(result){
			console.log('result', result);
		});	
	});
	
	on(postUser, 'click', function(){
		request.post('http://localhost:3000/user', {
			data:{
				firstname:'Bob',
				lastname:'Byron',
				age:49
			}
		}).then(function(result){
			console.log('result', result);
		});	
	});
	
	on(putUser, 'click', function(){
		request.post('http://localhost:3000/user', {
			data:{
				firstname:'Robert',
				lastname:'Byron',
				age:55
			}
		}).then(function(result){
			console.log('result', result);
		});	
	});
	
	on(rmUser, 'click', function(){
		request.del('http://localhost:3000/user', {
			data:{
				id:'50f2f3caed4c2c6d48000001'
			}
		}).then(function(result){
			console.log('result', result);
		});	
	});
	
	
	
});