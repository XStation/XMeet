define(["crypto"], function() {

    var socket={
    	supports:_checkSupports(),
    	wsUrl:'ws://meet.xpro.im:8080/xgate/websocket/',
    	customMark:'',
    	init:_initSocket
    };

console.log(globalConfig.linkKey);
console.log(window.location.pathname);
    if(globalConfig&&globalConfig.linkKey){
        socket['wsUrl']=socket.wsUrl+Crypto.MD5(window.location.host+globalConfig.linkKey);
    }else{
        socket['wsUrl']=socket.wsUrl+Crypto.MD5(window.location.host+window.location.pathname);
	}
    return socket.init;
    function _checkSupports(){
    	if ("WebSocket" in window) {
            return true;
        } else {
         	return false;
        };
    } 
    function _initSocket(){
    	if(socket.supports){
    		try {
              return new WebSocket(socket.wsUrl);
           	} catch (err) {
              return null;
           	}
    	}else
    		return null;
    }
    
});
