define(["require","jquery","simpleSocket",'handlebars','json3'], 
    function(require,$,webSocket,Handlebars) {
        this["members"] = this["members"] || {};
        this["member_count"] = this["member_count"] || 0;
        this["selfpid"] = this["selfpid"] || 0;
        this["Chat"] = this["Chat"] || {};
        this["Chat"]["templates"] = this["Chat"]["templates"] || {};
        this["Chat"]["templates"]["chat"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
          var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
          return "<div class=\"chat-head\">\r\n  <span class=\"title chat-title\" style=\"color:white\">偶遇( "
            + escapeExpression(((helper = (helper = helpers.payload || (depth0 != null ? depth0.payload : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"payload","hash":{},"data":data}) : helper)))
            + " 人)</span>\r\n</div>\r\n<div class=\"chat-main\"> \r\n</div>\r\n<div class=\"chat-foot\">\r\n      <textarea class=\"chat-text\" ></textarea>\r\n      <a href=\"#\" class=\"button button-raised button-pill button-inverse button-small pull-right chat-send\">发送</a> \r\n    </div>\r\n</div>";
        },"useData":true});
		//normal message
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

		//join message
        this["Chat"]["templates"]["joinmsg"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
          var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
          return "<div class=\"chat-item\">\r\n  <div class=\"chat-profile\">"
            + escapeExpression(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"from","hash":{},"data":data}) : helper)))
            + "<span class=\"pull-right\">"
            + escapeExpression(((helper = (helper = helpers.send_time || (depth0 != null ? depth0.send_time : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"send_time","hash":{},"data":data}) : helper)))
            + "</span></div> \r\n  <div class=\"chat-msg\">"
            + escapeExpression(((helper = (helper = helpers.payload || (depth0 != null ? depth0.payload : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"payload","hash":{},"data":data}) : helper)))
            + "\r\n  </div>\r\n</div>";
        },"useData":true});
		//leave message
        this["Chat"]["templates"]["leavemsg"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
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
            var d =JSON.parse(evt.data);
            _parserMessage(d); 
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
        		    if(e.keyCode == 13){ // Ctrl+Enter is pressed
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
			//由于消息的到达不一定有顺序性, 暂时不需要这个接口
            //case 'member_count':
            //  _renderCount(message);
            //  break;
            case 'members':
              _initMembers(message);
              break;
			case 'self':
              _initSelfInfo(message);
              break;
            case 'join':
			  _joinMember(message);
              break;
			case 'leave':
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
			var members = {};
			$.each(message.payload, function(k, v){
                members[v.pid] = v.nickname;
            });
			this['members'] = members;
			_renderCount();
		}
		function _joinMember(message){
			this["members"][message.from] = message.payload;
			_renderJoinMessage(message);
			_renderCount();
		}
		function _leaveMember(message){
			var pid = message.from;
			_renderLeaveMessage(message);
			delete(this["members"][pid]);
			_renderCount();
		}
		function _initSelfInfo(message){
            this["selfpid"] = message.payload;
        }
        function _renderCount(){ 
			var count = 0;
			$.each(this["members"], function(k, v){
				count++;
            });
        	this["member_count"] = count;
            $('.chat-title').html("请访问<a href='http://meet.xpro.im' target='parent'>meet.xpro.im</a>获取最新版本("+this["member_count"]+"人)");
        }

        function _renderJoinMessage(message){
			var nickname = "匿名";
			$.each(this["members"], function(k, v){
				if(k == message.from){
					nickname= v;
				}
			});
			if(this["selfpid"] == message.from){
				message.from = "我:";
			}else{
				message.from = nickname;
				//message.from = nickname+message.from;
			}
			var d = new Date();
			 message.send_time = d.toRelativeTime(message.send_time);
            $('.chat-main').append(Chat.templates.joinmsg(message)); 
            $('.chat-main').scrollTop($('.chat-main')[0].scrollHeight);
        }
        function _renderLeaveMessage(message){
			var nickname = "匿名";
			$.each(this["members"], function(k, v){
				if(k == message.from){
					nickname= v;
				}
			});
			if(this["selfpid"] == message.from){
				message.from = "我:";
			}else{
				message.from = nickname;
				//message.from = nickname+message.from;
			}
			var d = new Date();
			 message.send_time = d.toRelativeTime(message.send_time);
            $('.chat-main').append(Chat.templates.leavemsg(message)); 
            $('.chat-main').scrollTop($('.chat-main')[0].scrollHeight);
        }
        function _renderMessage(message){
			var nickname = "匿名";
			$.each(this["members"], function(k, v){
				if(k == message.from){
					nickname= v;
				}
			});
			if(this["selfpid"] == message.from){
				message.from = "我:";
			}else{
				message.from = nickname;
				//message.from = nickname+message.from;
			}
			var d = new Date();
			 message.send_time = d.toRelativeTime(message.send_time);
            $('.chat-main').append(Chat.templates.msg(message)); 
            $('.chat-main').scrollTop($('.chat-main')[0].scrollHeight);
        }
    }
);

Date.prototype.toRelativeTime = function(now_threshold) {
	var delta = new Date() - this;

	now_threshold = parseInt(now_threshold, 10);

	if (isNaN(now_threshold)) {
		now_threshold = 0;
	}

	if (delta <= now_threshold) {
		return '刚刚';
	}

	var units = null;
	var conversions = {
		'毫秒': 1, // ms    -> ms
		'秒': 1000,   // ms    -> sec
		'分钟': 60,     // sec   -> min
		'小时':   60,     // min   -> hour
		'天':    24,     // hour  -> day
		'月':  30,     // day   -> month (roughly)
		'年':   12      // month -> year
	};

	for (var key in conversions) {
		if (delta < conversions[key]) {
			break;
		} else {
			units = key; // keeps track of the selected key over the iteration
			delta = delta / conversions[key];
		}
	}

	// pluralize a unit when the difference is greater than 1.
	delta = Math.floor(delta);
	if(units=="毫秒"){
		return "刚刚";
	}else{
		return [delta, units].join(" ");
	}
};
