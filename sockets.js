function startSockets(app, port){
	var
		io = require('socket.io').listen(app),
		fs = require('fs'),
		_port = port || 8080;
	
	app.listen(_port);
	
	
	function stream(socket){
		var
			i,
			amt = 3000,
			style = {
				backgroundColor:'#ff0000',
				width:'30px',
				height:'30px',
				
				borderLeftColor:'#000000',
				borderLeftStyle:'solid',
				borderLeftWidth:1,
				
				borderTopColor:'#000000',
				borderTopStyle:'solid',
				borderTopWidth:1,
				
				borderRightColor:'#000000',
				borderRightStyle:'solid',
				borderRightWidth:1,
				
				borderBottomColor:'#000000',
				borderBottomStyle:'solid',
				borderBottomWidth:1
			};
			
		socket.emit('stream', 'start');
		for(i = 0; i < amt; i += 1){
			socket.emit('stream', JSON.stringify(style));
		}
		socket.emit('stream', 'end');
	}
	
	io.sockets.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(data);
		});
		stream(socket);
	});
	console.log('sockets ready and listening on port ', _port);
}

module.exports.start = function(app, port){
	startSockets(app, port);
}