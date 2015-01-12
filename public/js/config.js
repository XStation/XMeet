requirejs.config({ 
    baseUrl: 'http://localhost:3000/js', 
    waitSeconds:0,
    paths: {
        'jquery': 'http://localhost:3000/js/libs/jquery',
        'handlebars':'http://localhost:3000/js/libs/handlebars',
        'text':'http://localhost:3000/js/libs/text',
        'sockjs':'http://localhost:3000/js/libs/sockjs',
        'json3':'http://localhost:3000/js/libs/json3',
        'templates':'http://localhost:3000/js/libs/templates'
    },
    shim:{
        handlebars: {
            exports: 'Handlebars'
        },
        templates:{
            deps: ['handlebars'],
            exports: 'Handlebars'
        }
    },
    packages: [{
        name: 'hbs',
        location: 'http://localhost:3000/js/libs',
        main: 'hbs'
    }],
    hbs: {
        templateExtension: ".hbs",
        compilerPath: "http://localhost:3000/js/libs"
    },
    urlArgs: "bust=1" //+  (new Date()).getTime()
});

require(['app/app'], function() {
    console.log("!!!!!!");
}); 