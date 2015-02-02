Config your HTML page like this:
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;demo&lt;/title&gt;
    &lt;!--config--&gt;  
    &lt;script type="text/javascript"&gt;  
        chatConfig={  
          wsUrl:'ws://meet.xpro.im:8080/xgate/websocket',  
          linkKey:'yournameidyouwanted',//chatRoom ID, default the current page url    
          serverUrl:'http://meet.xpro.im'//web服务路径  
        }   
    &lt;/script&gt;   
    &lt;!-- 加载标签样式--&gt;  
    &lt;script type="text/javascript"  data-main="http://meet.xpro.im/js/chat"   src="http://meet.xpro.im/js/libs/require.js"&gt;&lt;/script&gt;   
  &lt;/head&gt;  
  &lt;body&gt;    
  &lt;/body&gt;  
&lt;/html&gt;  


