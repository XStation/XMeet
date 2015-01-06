var cookieParser = require('socket.io-cookie');
var io = require('socket.io')();

var chats={}

io.use(cookieParser);


io.on('connection',function(_socket){
	var chatroom;
	if(_socket.request.headers.cookie.chatId)
	  if(chats[_socket.request.headers.cookie.chatId]){
	  	chatroom=chats[_socket.request.headers.cookie.chatId];
	  }else{
	  	chats[_socket.request.headers.cookie.chatId]={
	  		'chatName':'聊天室天字房'
	  	}
	  	chatroom=chats[_socket.request.headers.cookie.chatId];
	  }
	_socket.emit('join',chatroom);
	//console.log(_socket.request.headers.cookie.chatId);
	_socket.on('msg', function (msg) {
        console.log('Message Received: ', msg); 

        _socket.emit('new msg',{
        	'msg':msg
        });
    });

    _socket.on('history request', function() {
		var history = [
			{'name':'test1','msg':'xxxxxxxxxxxxxxxxxxx1'},
			{'name':'test2','msg':'xxxxxxxxxxxxxxxxxxx2'}
		]; 
		_socket.emit('history response', {
			history: history
		}); 
	});
});

exports.listen=function(_server){
	return io.listen(_server);
};