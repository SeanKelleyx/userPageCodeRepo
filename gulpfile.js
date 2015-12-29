"use strict";

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	nano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	maps = require('gulp-sourcemaps'),
	del = require('del');

gulp.task('concatScripts', function(){
	return gulp.src(["js/jquery.js","js/bootstrap.js",
		"js/jquery.easing.min.js","js/jquery.fittext.js",
		"js/wow.min.js","js/creative.js","js/custom.js"])
	.pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ['concatScripts'], function(){
	return gulp.src("js/app.js")
	.pipe(uglify())
	.pipe(rename("app.min.js"))
	.pipe(gulp.dest('js'));
});

gulp.task("concatCSS", function(){
	return gulp.src(["css/bootstrap.css",
		"http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
		"http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic",
		"font-awesome/css/font-awesome.css","css/animate.min.css",
		"css/creative.css","css/main.css"])
	.pipe(maps.init())
    .pipe(concat('styles.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest("css"));
});

gulp.task("minifyCSS", ['concatCSS'], function(){
	return gulp.src("css/styles.css")
	.pipe(nano())
	.pipe(rename("styles.min.css"))
	.pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function(){
	gulp.watch('css/main.css',['minifyCSS']);
	gulp.watch('js/main.js', ['minifyScripts']);
});

gulp.task('clean', function(){
	del(['dist', 'css/application.css*','js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'minifyCSS'], function(){
	return gulp.src(["css/styles.min.css", "js/app.min.js", 
		'index.html', "img/**", "fonts/**", "font-awesome/fonts/**"], {base: "./"})
	.pipe(gulp.dest('dist'));
});

gulp.task("serve", ['watchFiles']);

gulp.task("default", ['clean'], function(){
	gulp.start('build');
});