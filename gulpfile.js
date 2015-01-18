var gulp = require('gulp'); 
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var rjs = require('gulp-r');//require('gulp-requirejs');//require('gulp-r');
var rename = require("gulp-rename");  
var concat = require('gulp-concat');
var jshint = require('gulp-jshint'); 
var htmlReporter = require('gulp-jshint-html-reporter');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare'); 



gulp.task('lint',function(){
	return gulp.src('public/js/*.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter(htmlReporter,{
			   	 filename:__dirname + '/jshint-output.html'
			   }));
});


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

gulp.task('installLib',function(){
	return gulp.src(mainBowerFiles({'debugging':true}))
			   .pipe(gulp.dest('public/js/libs'));
})

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


gulp.task('compass',function(){
	gulp.src('scss/*.scss')
		.pipe(plumber({errorHandler:errorHandler}))
		.pipe(compass({
			css: 'public/css',
      		sass: 'scss',
      		image: 'public/img'
		}))
		.on('error',function(error){
			console.log(error);
			this.emit('end');
		})
		//.pipe(minifyCSS())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch(['scss/*.scss','scss/**/*.scss'], ['compass']);
});

function errorHandler(e){
	gutil.beep(); 
	gutil.log(e);
}