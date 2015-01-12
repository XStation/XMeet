({
 //   appDir:'./app',
    baseUrl: './',
 //   dir:'./app-build',
    optimize: "none",
    paths: { 
        'jquery': 'empty:',
        'handlebars':'empty:'
    },
//    mainConfigFile:'./config.js',
    removeCombined:true,
    name: "app/app",
//    include: [],
    out: "./app-build/prodect.js",
})