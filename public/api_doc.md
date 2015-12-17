# 0x00 名词解释:  
{}里的表示变量  
xnest表示一个聊天室  
xnest_id表示该聊天室的id.(用户可以自己取, 最好不超过32个字符)  
连接地址:  
> ws://meet.xpro.im:8080/xgate/websocket/{$xnest_id}?nickname={$nickname}

$xnest_id: 代表聊天室的唯一标识
$nickname: 进入聊天室的昵称(进入一次后, 服务器会把该昵称写入到cookie, 下次不带昵称会默认是用cookie里的, 如果cookie和参数都没有, 服务器会默认使用一个随机的昵称)

# 0x01 客户端(如js)连接:
客户端通过websocket连接服务器  
连接成功后:服务器会推送一些该聊天室的数据过来  
格式为json文本,如下:  

	{  
		"from":"{$sender_id}",  
    	"xnest":"{$xnest_id}",  
    	"type":"{$type}",  
		"payload":"{$payload}",  
    	"send_time":"{$time}"  
	}
    

* from: 表示发送者的唯一id;  
* xnest:表示该聊天室的唯一id  
* type:表示该消息的类型, 主要有:   members | member_count | normal | join | leave | self | changename | history  
* payload:消息的有效内容  
* send_time:该消息发送出来的时间  

## 服务按如下次序推送消息过来:
### 1.接收自己在该聊天室的唯一id  
类型为:self, 有效内容为自己的id.  
例子:

    {
    	"from":"<0.31891.2>",
    	"xnest":"f45c6d7720375d90f660a7b7e3ae11bf",  
    	"type":"self",  
    	"payload":"<0.31891.2>",  
    	"send_time":"2015-4-8 14:2:6"  
    }

### 2.接收该聊天室的成员数量
类型为:member_count,有效内容为1, 及表示当前成员数量为1  
例子:

	{
    	"from":"<0.31891.2>",
    	"xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
		"type":"member_count",
    	"payload":1,
    	"send_time":"2015-4-8 14:2:6"
	}

### 3.接收成员列表
类型为:members, 内容为json数组, 包含当前所有聊天室成员的pid和nickname  
例子:

	{
    	"from":"<0.31891.2>",
    	"xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
   		"type":"members",
    	"payload":[{"pid":"<0.31891.2>","nickname":"小明"}],
    	"send_time":"2015-4-8 14:2:6"
	}
### 4.接收该聊天室的历史记录, 目前只会保留一定数量的记录
类型为:history,有效内容为第一层的payload, 格式是个列表, 每条记录包含发送者id, 内容和时间  
例子:

	{
    	"from":"<0.31891.2>",
    	"xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
    	"type":"history",
    	"payload":[
			{"from":"<0.1897.0>","payload":" 12121435131197391","send_time":"2015-06-24"},
			{"from":"<0.1897.0>","payload":" 1111435131194487","send_time":"2015-06-24"}, 
			{"from":"<0.1897.0>","payload":" 大大的1435131192974","send_time":"2015-06-24"}, 
			{"from":"<0.1897.0>","payload":"爱上对方1435131191173","send_time":"2015-06-24"}],
    	"send_time":"2015-4-8 14:2:6"
	}



# 0x02 连接建立成功后
连接保持期间, 如果有新加入的成员进来, 老成员离开 , 消息接收,  服务端都会推送一条消息给客户端,如下:  
### 1.接收新近成员消息(当有新成员加入聊天室时)  
类型为:join, payload为该加入成员的昵称, 加入成员的id在from字段里.  
例子:

	{
    	"from":"<0.31891.2>",
    	"xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
    	"type":"join",
    	"payload":"黑旋风李逵",
    	"send_time":"2015-4-8 14:2:6"
	}

### 2. 接收离开成员消息(当有其他成员离开聊天室时候)
类型为:leave,payload为固定的leave. 离开成员的id在from字段里.  
例子:

	{
    	"from":"<0.31916.2>",
    	"xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
    	"type":"leave",
    	"payload":"leave",
    	"send_time":"2015-4-8 14:23:28"
	}

### 3. 普通消息的发送(这里就直接发送消息体就可以了, 没有格式.)
比如我发送了:  大家好!  
js客户端可能是如下代码:
  
	ws.send("大家好");

**具体可参考最后面的js示例代码!**

### 4. 普通消息接收(及其他成员发送的消息)
类型为:normal, payload就是成员发送的消息.如上例,payload里就是大家好.from就是发送者的id.  
例子:

	{
	    "from":"<0.31891.2>",
	    "xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
	    "type":"normal",
	    "payload":"大家好",
	    "send_time":
	    "2015-4-8 14:25:30"
	}

### 5. 用户昵称改变昵称
用户可发送 ***@changename:新昵称***  来修改自己的昵称.发送后服务器会广播消息到所有用户
类型为:changename, payload成员修改后的昵称, 该成员的id在from字段里.  
例子:

	{
	    "from":"<0.31891.2>",
	    "xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
	    "type":"changename",
	    "payload":"黑旋风李逵",
	    "send_time":"2015-4-8 14:2:6"
	}

### 6. 用户获取更多历史聊天记录
用户可发送 ***@history:$cursor***  来获取聊天记录, 服务器收到后会以消息方式回应客户端以history为type的信息.  
ps: $cursor为数字,从0开始, 比如发送: @history:0   即表示获取最近的聊天记录(通常游标cursor偏移量为50条);  
在继续获取后面的记录, 可以发送 @history:1, 以此类推 @history:2  
类型为:history, payload为这次获取的聊天记录, 该成员的id在from字段里.  
例子:

	{
	    "from":"<0.31891.2>",
	    "xnest":"f45c6d7720375d90f660a7b7e3ae11bf",
	    "type":"history",
	    "payload":[
			{"from":"<0.1897.0>","payload":" 12121435131197391","send_time":"2015-06-24"},
			{"from":"<0.1897.0>","payload":" 1111435131194487","send_time":"2015-06-24"}, 
			{"from":"<0.1897.0>","payload":" 大大的1435131192974","send_time":"2015-06-24"}, 
			{"from":"<0.1897.0>","payload":"爱上对方1435131191173","send_time":"2015-06-24"}],
    	"send_time":"2015-4-8 14:2:6"
	}




# 0x03 js示例


`<html> 
<head> 
<title>Demo</title> 
<meta http-equiv="content-type" content="text/html;charset=utf-8"> 
<script src="jquery.js?bust=1" type="text/javascript"></script> 
<script type="text/javascript"> 

function sc(){ 
var div = document.getElementById("console_wrapper"); 
div.scrollTop = div.scrollHeight; 
} 

var ws; 

$(document).ready(function () { 
var s = setInterval("sc()", 500); 
if ("WebSocket" in window) { 
debug("Browser supports web sockets!", 'success'); 
connect($('#host').val()); 
$('#console_send').removeAttr('disabled'); 
} else { 
debug("Browser does not support web sockets", 'error'); 
}; 
// function to send data on the web socket 
function ws_send(str) { 
try { 
ws.send(str); 
} catch (err) { 
debug(err, 'error'); 
} 
} 
// connect to the specified host 
function connect(host) { 
debug("Connecting to " + host + " ..."); 
try { 
ws = new WebSocket(host); // create the web socket 
} catch (err) { 
debug(err, 'error'); 
} 
  $('#host_connect').attr('disabled', true); // disable the 'reconnect' button 
  ws.onopen = function () { 
  debug("connected... ", 'success'); // we are in! :D 
}; 
ws.onmessage = function (evt) { 
debug(evt.data, 'response'); // we got some data - show it omg!! 
}; 
ws.onclose = function () { 
   debug("Socket closed!", 'error'); // the socket was closed (this could be an error or simply that there is no server) 
   $('#host_connect').attr('disabled', false); // re-enable the 'reconnect button 
}; 
}; 

// function to display stuff, the second parameter is the class of the <p> (used for styling) 
function debug(msg, type) { 
$("#console").append('<p class="' + (type || '') + '">' + msg + '</p>'); 
}; 

// the user clicked to 'reconnect' button 
$('#host_connect').click(function () { 
debug("\n"); 
connect($('#host').val()); 
}); 
// the user clicked the send button 
$('#console_send').click(function () { 
var time = new Date().getTime(); 
var msg = $('#console_input').val() + time; 
ws_send(msg); 
$('#console_input').val(' '); 
}); 

$('#console_input').keyup(function (e) { 
if(e.keyCode == 13){ // enter is pressed 
ws_send($('#console_input').val()); 
   $('#console_input').val(' '); 
} 
}); 
}); 
</script> 

<style type="text/css"> 
.error {color: red;} 
.success {color: green;} 
#console_wrapper {background-color: black; color:white;padding:5px;} 
#console p {padding:0;margin:0;} 
</style> 
</head>
<body> 
<h1>Xmeet Demo</h1> 
<div id="server_wrapper" > 
<p>Server 
<input type="text" name="host" id="host" value="ws://meet.xpro.im:8080/xgate/websocket/xnestname" /> 
<input type="submit" name="host_connect" id="host_connect" value="重新连接" /> 
</p> 
</div> 

<div id="console_wrapper" style="overflow:auto; height:600px; border: 1px solid #999;"> 
<pre id="console"></pre> 
</div> 
<div> 
<input type="text" name="console_input" id="console_input" value="" /> 
<input type="submit" name="console_send" id="console_send" value="Send" /> 
</div> 
</body> 
</html>`
[运行一下]
