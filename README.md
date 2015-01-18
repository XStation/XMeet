Config your HTML page like this:
<!DOCTYPE html>
<html>
  <head>
    <title>demo</title>
    <!--config-->
    <script type="text/javascript">
        chatConfig={
          wsUrl:'ws://121.42.145.18:8080/xgate/websocket',
          linkKey:'http://www.baidu.com',//chatRoom ID
          serverUrl:'http://localhost:3000'//web服务路径
        } 
    </script> 
    <!-- 加载标签样式-->
    <script type="text/javascript"  data-main="http://localhost:3000/js/chat"   src="http://localhost:3000/js/libs/require.js"></script> 
  </head>
  <body>  
  </body>
</html>
