define([
	'dojo/dom',
	'dojo/on',
	'dojo/request',
], function(dom, on, request){
	
	var getUser = dom.byId('getUserBtn');
	var putUser = dom.byId('putUserBtn');
	var postUser = dom.byId('postUserBtn');
	var rmUser = dom.byId('rmUserBtn');
	
	
	on(getUser, 'click', function(){
		request('http://localhost:3000/user/50f1cf1e4292b4f83500001f').then(function(result){
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
				id:'50f2fa143aa08aee48000001'
			}
		}).then(function(result){
			console.log('result', result);
		});	
	});
	
	
	
});