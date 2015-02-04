this["Chat"] = this["Chat"] || {};
this["Chat"]["templates"] = this["Chat"]["templates"] || {};
this["Chat"]["templates"]["chat"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"chat-head\">\r\n  <span class=\"title chat-title\">群聊("
    + escapeExpression(((helper = (helper = helpers.payload || (depth0 != null ? depth0.payload : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"payload","hash":{},"data":data}) : helper)))
    + "人)</span>\r\n</div>\r\n<div class=\"chat-main\"> \r\n</div>\r\n<div class=\"chat-foot\">\r\n      <textarea class=\"chat-text\" ></textarea>\r\n      <a href=\"#\" class=\"button button-raised button-pill button-inverse button-small pull-right chat-send\">发送</a> \r\n    </div>\r\n</div>";
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