var gulp = require('gulp'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    header = require('gulp-header'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    maps = require('gulp-sourcemaps'),
    pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %>\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/agency.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Concatenate CSS
gulp.task('concat-css', ['less'], function(){
	return gulp.src(['vendor/bootstrap/css/bootstrap.min.css',
		'vendor/font-awesome/css/font-awesome.min.css',
		'https://fonts.googleapis.com/css?family=Montserrat:400,700',
		'https://fonts.googleapis.com/css?family=Kaushan+Script',
		'https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic',
		'https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700',
		'css/agency.css',
        'css/sean.css'])
		.pipe(maps.init())
		.pipe(concat('main.css'))
		.pipe(maps.write('./'))
    	.pipe(gulp.dest("css"))
    	.pipe(browserSync.reload({
            stream: true
        }));
});

// Minify compiled CSS
gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src('css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Concatenate JS
gulp.task('concat-js', function(){
	return gulp.src(['vendor/jquery/jquery.min.js',
		'vendor/bootstrap/js/bootstrap.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js',
		'js/jqBootstrapValidation.js',
		'js/contact_me.js',
		'js/agency.js'])
		.pipe(maps.init())
		.pipe(concat('main.js'))
		.pipe(maps.write('./'))
    	.pipe(gulp.dest("js"))
    	.pipe(browserSync.reload({
            stream: true
        }));
});

// Minify JS
gulp.task('minify-js', ['concat-js'], function() {
    return gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Create html
gulp.task('dev-html', function(){
	return gulp.src('index.template')
		.pipe(replace('{{STYLE}}', 'css/main.css'))
		.pipe(replace('{{SCRIPT}}', 'js/main.js'))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({
            stream: true
        }));
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'));
    gulp.src(['node_modules/font-awesome/fonts/*'])
    	.pipe(gulp.dest('fonts'));
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    });
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js', 'dev-html', 'copy'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('index.template', ['dev-html']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
