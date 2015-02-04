(function(){
 
    window.chatConfig=window.chatConfig||{
        wsUrl:'ws://121.42.145.18:8080/xgate/websocket',
        linkKey:temp,//'http://www.baidu.com',
        serverUrl:'http://localhost:3000'
    }   
    window.globalConfig=window.globalConfig||{
        serviceUrl:chatConfig.serverUrl+"/", 
        libPath:chatConfig.serverUrl+'/js/libs/',
        appPath:chatConfig.serverUrl+'/js/app/',
        extLibPath:chatConfig.serverUrl+'/js/extlibs/',
        ctlPath:chatConfig.serverUrl+'controllers/',
        tplPath:chatConfig.serverUrl+'/js/app/tpl/',
        serverUrl:chatConfig.serverUrl,
        wsUrl:chatConfig.wsUrl,
        linkKey:chatConfig.linkKey,
        set:function(k,v){
            this[k]=v;
        },
        get:function(k){
            return this[k]?this[k]:"";
        }
    };
})(window);
requirejs.config({ 
    baseUrl:globalConfig.serverUrl+'/js/app/', 
    waitSeconds:0,
    paths: {
        'jquery': globalConfig.libPath+'jquery',
        'buttons':globalConfig.extLibPath+'buttons',
        'moment':globalConfig.libPath+'moment', 
        'bootstrap':globalConfig.libPath+'bootstrap',
        'handlebars':globalConfig.libPath+'handlebars',
        'text':globalConfig.libPath+'text',
        'json3':globalConfig.libPath+'json3',
        'crypto':globalConfig.extLibPath+'2.0.0-crypto-md5',
        'templates':globalConfig.libPath+'templates'
    },
    shim:{
        crypto:{
            exports: 'Crypto'
        },
        jquery:{
            exports: '$'
        },
        json3:{
            exports: 'JSON'
        },
        handlebars: {
            exports: 'Handlebars',
            deps: ['css!'+globalConfig.serviceUrl+'css/style']
        },
        templates:{
            deps: ['handlebars'],
            exports: 'Handlebars'
        }
    },
    packages: [{
        name: 'hbs',
        location: globalConfig.libPath,
        main: 'hbs'
    }],
    hbs: {
        templateExtension: ".hbs",
        compilerPath:globalConfig.libPath
    },
    map: {
        '*': {
              'css':globalConfig.libPath+'css.js' 
        } 
    },
    urlArgs: "bust=1" //+  (new Date()).getTime()
});

require(['chatApp'], function() {
   
}); 