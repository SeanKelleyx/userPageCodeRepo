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
    pkg = require('./package.json'),
    gutil = require('gulp-util'),
    critical = require('critical').stream,
    del = require('del'),
    htmlmin = require('gulp-htmlmin');
    //ftp = require( 'vinyl-ftp' ),
    //ftpCreds = require('./ftp-creds.js');

// Set the banner content
var banner = ['/*!\n',
    ' * Sean Kelley - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
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
	return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
		'node_modules/font-awesome/css/font-awesome.min.css',
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

// Copy down fonts from node_modules
gulp.task('copy-fonts', function(){
    return gulp.src(['node_modules/font-awesome/fonts/**'])
        .pipe(gulp.dest('./fonts'));
})

// Concatenate JS
gulp.task('concat-js', function(){
	return gulp.src(['node_modules/jquery/dist/jquery.min.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'js/jqBootstrapValidation.js',
		'js/contact_me.js',
		'js/agency.js',
        'js/sean.js'])
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
        .pipe(uglify().on('error', function(e){
					console.log(e);
				}))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minify HTML
gulp.task('minify-html', ['critical'],function(){
    return gulp.src('build/index.build.html')
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build'));
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

gulp.task('html', ['copy-files-build'], function(){
    return gulp.src('index.template')
        .pipe(replace('{{STYLE}}', 'css/main.min.css'))
        .pipe(replace('{{SCRIPT}}', 'js/main.min.js'))
        .pipe(rename('index.build.html'))
        .pipe(gulp.dest('./build'));
});

gulp.task('del', function(){
    del(['build']);
});

gulp.task('copy-files-build', ['del', 'less', 'minify-css', 'minify-js', 'copy-fonts'], function(){
    return gulp.src([".htaccess", "css/main.min.css", "fonts/**", "img/**", "js/main.min.js", "mail/contact_me.php", "vendor/**", "auth/**"], {base: "./"})
        .pipe(gulp.dest('build'));
});

//critical css
gulp.task('critical', ['html'], function () {
    return gulp.src('build/index.build.html')
        .pipe(critical({base: 'build/', inline: true, css: ['css/main.min.css']}))
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('build'));
});

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        },
    });
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js', 'dev-html', 'copy-fonts'], function() {

    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/sean.js', ['minify-js']);
    gulp.watch('index.template', ['dev-html']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

// Run production build
gulp.task('build', ['minify-html'], function(){
    return del(['build/index.build.html']);
});

// Deploy site to hosting server
/*gulp.task('deploy', ['build'], function(){
    var conn = ftp.create({
        host:     ftpCreds.host,
        user:     ftpCreds.user,
        password: ftpCreds.password
    });*/
    //return gulp.src(['build/**/**'], {base: './build'})
      //  .pipe(conn.dest('/public_html'));
//});
