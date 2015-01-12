var gulp = require('gulp');
var path = require('path');
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var rjs = require('gulp-r');//require('gulp-requirejs');//require('gulp-r');
var rename = require("gulp-rename");
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('clean',function(cb){
	 del([
	 	'bower_components',
	 	'public/js/libs',
	 	'public/js/app.min.js',
	 	'public/js/app-build'],cb);
});

gulp.task('bower',['clean'],function(){
	return bower();
})

gulp.task('install',['bower'],function(){
	return gulp.src(mainBowerFiles({'debugging':true}))
			   .pipe(gulp.dest('public/js/libs'));
})

gulp.task('templates',function(){
	gulp.src('public/js/libs/hbs/*.hbs')
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
	      namespace: 'Chat.templates',
	      noRedeclare: true, // Avoid duplicate declarations
	    }))
	    .pipe(concat('templates.js'))
    	.pipe(gulp.dest('public/js/libs'));
});

gulp.task('compile',['install'],function(){
	//console.log(path.join("public/js"));
	return gulp.src(["public/js/**/*.js","public/js/*.js"]).
				pipe(
					rjs({
						baseUrl:"./", 
						optimize: "none",
					    paths: { 
					        'jquery': 'empty:',
					        'handlebars':'empty:'
					    },
					    mainConfigFile:'public/js/config.js',
					    removeCombined:true,
					    name: "public/js/app/app",
					    include: ["public/js/app/b"], 
						out:'./app-build/prodect.js'
					})
				).
				pipe(rename({
					"extname":".min.js"
				})).
				pipe(gulp.dest("/public/js/dispay")); 
});