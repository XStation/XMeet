(function(){
    var documentReay=window.onload;
    window.onload=function(){
        var fileref = document.createElement('link');
            fileref.setAttribute("rel","stylesheet");
            fileref.setAttribute("type","text/css");
            fileref.setAttribute("href",'http://localhost:3000/css/chatWrap.css');
        var chatConfig={
          linkKey:window.location.href,//chatRoom ID
        } 
    	var myiframe,chartDiv;
        var chart=[
          '<div class="chat-expand hide">',
            '<div class="chat-head-close">',
              '<i class="fa fa-close pull-right close-chat"></i>',
            '</div>', 
            '<div class="chat-main chat-ifram-wrap">',
                '<iframe id="chatframe" name="chatframe" frameborder="0"',
                ' src="http://localhost:3000/chatBody.html?linkKey='+chatConfig.linkKey,
                '" scrolling="no" width="100%" height="100%">',
                '</iframe>',
            '</div>',
          '</div>',
          '<div class="chat-collapse-tools">',
            '<i class="fa fa-wechat"></i>',
            '加入聊天室',
          '</div>'
        ]
        document.getElementsByTagName("head")[0].appendChild(fileref);
        chartDiv=document.createElement("div");
        chartDiv.className="chat-wrap chat-collapse";
        chartDiv.innerHTML=chart.join("");
        document.body.appendChild(chartDiv);  
        document.getElementsByClassName("chat-collapse-tools")[0].onclick = 
        function(){
            addClass(this,"hide");
            removeClass(document.getElementsByClassName("chat-expand")[0],"hide");
        } 
        document.getElementsByClassName("close-chat")[0].onclick = 
        function(){
            removeClass(document.getElementsByClassName("chat-collapse-tools")[0],"hide");
            addClass(document.getElementsByClassName("chat-expand")[0],"hide");
        } 

        function hasClass(obj, cls) {  
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
        }  
          
        function addClass(obj, cls) {  
            if (!hasClass(obj, cls)) obj.className += " " + cls;  
        }  
          
        function removeClass(obj, cls) {  
            if (hasClass(obj, cls)) {  
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
                obj.className = obj.className.replace(reg, ' ');  
            }  
        }  
          
        function toggleClass(obj,cls){  
            if(hasClass(obj,cls)){  
                removeClass(obj, cls);  
            }else{  
                addClass(obj, cls);  
            }  
        }
        documentReay(); 
    }
})()

