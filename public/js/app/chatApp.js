define(["require","jquery","simpleSocket",'handlebars','json3'], 
    function(require,$,webSocket,Handlebars) {
        this["members"] = this["members"] || {};
        this["member_count"] = this["member_count"] || 0;
        this["pid"] = this["pid"] || 0;
        this["Chat"] = this["Chat"] || {};
        this["Chat"]["templates"] = this["Chat"]["templates"] || {};
        this["Chat"]["templates"]["chat"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
          var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
          return "<div class=\"chat-wrap chat-collapse\">\r\n  <div class=\"chat-expand hide\">\r\n    <div class=\"chat-head\">\r\n      <span class=\"title chat-title\">群聊("
            + escapeExpression(((helper = (helper = helpers.payload || (depth0 != null ? depth0.payload : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"payload","hash":{},"data":data}) : helper)))
            + "人)</span>\r\n      <i class=\"fa fa-close pull-right close-chat\"></i>\r\n    </div>\r\n    <div class=\"chat-main\"> \r\n    </div>\r\n    <div class=\"chat-foot\">\r\n      <textarea class=\"chat-text\" ></textarea>\r\n      <a href=\"#\" class=\"button button-raised button-pill button-inverse button-small pull-right chat-send\">发送(<u>S</u>)</a> \r\n    </div>\r\n  </div>\r\n  <div class=\"chat-collapse-tools\">\r\n    <i class=\"fa fa-wechat\"></i>\r\n    加入聊天室\r\n  </div>\r\n</div>";
        },"useData":true});
        this["Chat"]["templates"]["msg"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
          var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
          return "<div class=\"chat-item\">\r\n  <div class=\"chat-profile\">"
            + escapeExpression(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"from","hash":{},"data":data}) : helper)))
            + "<span class=\"pull-right\">"
            + escapeExpression(((helper = (helper = helpers.send_time || (depth0 != null ? depth0.send_time : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"send_time","hash":{},"data":data}) : helper)))
            + "</span></div> \r\n  <div class=\"chat-msg\">"
            + escapeExpression(((helper = (helper = helpers.payload || (depth0 != null ? depth0.payload : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"payload","hash":{},"data":data}) : helper)))
            + "\r\n  </div>\r\n</div>";
        },"useData":true});
        $('body').append(Chat.templates.chat({}));
        var ws=webSocket(); 
        ws.onopen = function () {
           // console.log("connected... success");  
        }; 
        ws.onmessage = function (evt) {
            var date=JSON.parse(evt.data);
            _parserMessage(date); 
        }; 
        ws.onclose = function () {
            console.log("Socket closed! error");   
        };
        $(document).ready(function() { 
                $('.chat-collapse-tools').on('click',function(e){
                    $('.chat-collapse-tools').addClass("hide");
                    $('.chat-expand').removeClass("hide"); 
                });
                $('.close-chat').on('click',function(e){
                    $('.chat-collapse-tools').removeClass("hide");
                    $('.chat-expand').addClass("hide"); 
                });
                $(".chat-send").on('click',function(e){
                    ws.send($(".chat-text").val()); 
        		   	$('.chat-text').val("");
                }); 
				$('.chat-text').keyup(function (e) {
        		    if(e.keyCode == 13 && e.ctrlKey){ // Ctrl+Enter is pressed
        		       ws.send($('.chat-text').val());
        		   	   $('.chat-text').val("");
					}
					if(e.altKey && e.keyCode==83){ // Alt+S is pressed
        		       ws.send($('.chat-text').val());
        		   	   $('.chat-text').val("");
					}
				});
        });
        function _parserMessage(message){
            switch(message.type)
            {
            case 'member_count':
              _renderCount(message);
              break;
            case 'members':
              _initMembers(message);
              break;
			case 'self':
              _initSelfInfo(message);
              break;
            case 'join':
              _renderJoin(message);
			  _joinMember(message);
              break;
			case 'leave':
              _renderLeave(message);
			  _leaveMember(message);
              break;
            case 'normal':
              _renderMessage(message)
              break;
            default:
              "";
            }
        }
		function _initMembers(message){
			this["members"] = message.payload;
		}
		function _joinMember(message){
			this["members"].push({"pid":message.from, "nickname":message.payload});
		}
		function _leaveMember(message){
			console.log(this['members']);
			//need to do ;
		}
		function _initSelfInfo(message){
            this["pid"] = message.payload;
        }
        function _renderCount(message){ 
        	this["member_count"] = message.payload;
            $('.chat-title').html("群聊("+this["member_count"]+"人)");
        }
        function _renderJoin(message){
			if( this["pid"] == message.from ){//自己join的消息不需要增加人数
			}else{
        		this["member_count"] += 1;
            	$('.chat-title').html("群聊("+this["member_count"]+"人)");
			}
        }
        function _renderLeave(message){
        	this["member_count"] -= 1;
            $('.chat-title').html("群聊("+this["member_count"]+"人)");
        }
        function _renderMessage(message){
			var nickname = "匿名";
			$.each(this["members"], function(k, v){
				if(v.pid == message.from){
					nickname= v.nickname;
				}
			});
			message.from = nickname+message.from;
            $('.chat-main').append(Chat.templates.msg(message)); 
        }
    }
);
