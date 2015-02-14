(function(){
	XMeet = {};
	xConfig ={};
	XMeet.Config=function(arg){
		if(arg=="" || arg ==undefined){
			//nothing todo;
		}else{
			arr = arg.split('&');
			for(i in arr){
				var tmp = arr[i].split('=');
				xConfig[tmp[0]]=tmp[1];
			}
		}
	}
    var documentReady=window.onload;
    window.onload=function(){
        var fileref = document.createElement('link');
            fileref.setAttribute("rel","stylesheet");
            fileref.setAttribute("type","text/css");
            fileref.setAttribute("href",'http://xpro.im/css/chatWrap.css');
		var defaultKey = window.location.host+window.location.pathname;		//默认聊天空间为:域名+url, url不带参数
		if(xConfig.xnest == undefined || xConfig.xnest==""){
			var xNest = defaultKey;
		}else{
			var xNest = window.location.host+":"+xConfig.xnest;
		}
        var chatConfig={
          linkKey: xNest,	//chatRoom ID
        } 
    	var myiframe,chartDiv;
        var chart=[
          '<div class="chat-expand hide">',
            '<div class="chat-head-close">',
              '<i class="fa fa-close pull-right close-chat"></i>',
            '</div>', 
            '<div class="chat-main chat-ifram-wrap">',
                '<iframe id="chatframe" name="chatframe" frameborder="0"',
                ' src="http://meet.xpro.im/chatBody.html?linkKey='+chatConfig.linkKey,
                '" scrolling="no" width="100%" height="100%">',
                '</iframe>',
            '</div>',
          '</div>',
          '<div class="chat-collapse-tools">',
            '<i class="fa fa-wechat"></i>',
            '偶遇在同页',
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
		if(documentReady){
        	documentReady(); 
		}
    }
})()

