define(["require","jquery","app/simpleSocket",'handlebars','json3'], 
	function(require,jquery,ws,Handlebars) {
       this["Chat"] = this["Chat"] || {};
this["Chat"]["templates"] = this["Chat"]["templates"] || {};
this["Chat"]["templates"]["chat"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"chat-wrap\">\r\n      <div class=\"chat-main hide\">\r\n        <div class=\"chat-head clearfix\">\r\n          <h3 class=\"chat-title float-left\">GGG聊天室</h3>\r\n          <div class=\"chat-icon float-right\">\r\n            <a class=\"fa fa-times icon-button close-chat\"></a>\r\n          </div>\r\n        </div>\r\n        <div class=\"chat-body\"> \r\n        </div>\r\n        <div class=\"chat-send-box\"  >\r\n          <div class=\"send-box-text\">\r\n            <textarea class=\"chat-text\" placeholder=\"按回车发送消息\"></textarea>\r\n              <a class=\"send-box-icon btn \">发送</a> \r\n          </div> \r\n        </div>\r\n      </div>\r\n      <div class=\"chat-toolbar clearfix\">\r\n        <div class=\"toolbar-bg\"></div>\r\n        <p class=\"toolbar_cont clearfix\">        \r\n          <span class=\"toolbar_icon float-left\"></span>        \r\n          <em node-type=\"miniContent\" class=\"toolbar_font float-left\">进入聊天室</em>   \r\n        </p>\r\n      </div>\r\n    </div> ";
  },"useData":true});
        console.log(Chat.templates.chat)
        $('body').append(Chat.templates.chat({}));
		ws.onopen = function () {
               console.log("connected... success");  
        };

        ws.onmessage = function (evt) {
               console.log(evt.data+ '|| response'); 
               var date=JSON.parse(evt.data);
              $('.chat-body').append( date.payload+" at "+date['send_time']+"</br>"); 
        };

        ws.onclose = function () {
               console.log("Socket closed! error");  
                
        };

        $(document).ready(function() {
 
			$('.chat-toolbar').on('click',function(e){
			  	$('.chat-toolbar').hide();
			  	$('.chat-main').show(); 
			});
			$('.close-chat').on('click',function(e){
			  	$('.chat-toolbar').show();
			  	$('.chat-main').hide();
			});
			$(".send-box-icon").on('click',function(e){
				ws.send($(".chat-text").val());
				console.log($(".chat-text").val());
			});
			$(".chat-text").on('keyup',function(e){
				console.log($(".chat-text").val());
			});
		});
        return {
            color: "blue",
            size: "large",
            addToCart: function() {
                inventory.decrement(this);
                cart.add(this);
            }
        }
    }
);