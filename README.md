Config your HTML page like this:
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;demo&lt;/title&gt;
    &lt;!--config--&gt;  
    &lt;script type="text/javascript"&gt;  
        chatConfig={  
          wsUrl:'ws://121.42.145.18:8080/xgate/websocket',  
          linkKey:'http://www.baidu.com',//chatRoom ID  
          serverUrl:'http://localhost:3000'//web服务路径  
        }   
    &lt;/script&gt;   
    &lt;!-- 加载标签样式--&gt;  
    &lt;script type="text/javascript"  data-main="http://localhost:3000/js/chat"   src="http://localhost:3000/js/libs/require.js"&gt;&lt;/script&gt;   
  &lt;/head&gt;  
  &lt;body&gt;    
  &lt;/body&gt;  
&lt;/html&gt;  
