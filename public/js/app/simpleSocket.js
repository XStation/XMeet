define([""], function() {
    var socket={
    	supports:_checkSupports(),
    	wsUrl:'ws://121.42.145.18:8080/xgate/websocket?xnest=thisisaname',
    	params:{'xnest':'thisisaname'},
    	customMark:'',
    	init:_initSocket
    }   
        
    return socket.init();
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