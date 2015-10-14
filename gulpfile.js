// Plugins
var gulp 		= require('gulp'),
	jade 		= require('gulp-jade'),
	stylus 		= require('gulp-stylus'),
	jshint 		= require('gulp-jshint'),
	stylish 	= require('jshint-stylish'),
	cache 		= require('gulp-cached'),
	concat 		= require('gulp-concat'),
	imagemin 	= require('gulp-imagemin'),
	jpgcompress = require('imagemin-jpeg-recompress'),
	sprite 		= require('css-sprite').stream,
	browserSync = require('browser-sync'),
	reload 		= browserSync.reload;

// Path JS Files
var jsfiles = [
	'./public/bower_components/modernizr/modernizr.js',
	'./public/bower_components/jquery/dist/jquery.js',
	'./public/bower_components/magnific-popup/dist/jquery.magnific-popup.js',
	'./public/js/lib/magnific-popup.js',
	'./public/js/lib/fullpage.js'
];

// Task Jade
gulp.task('jade', function() {
	gulp.src('./public/templates/**/index.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', function(error) {
			console.error('' + error);
		})
		.pipe(gulp.dest('./public/'))
		.pipe(reload({
			stream: true
		}));
});

// Task Stylus
gulp.task('stylus', function() {
	gulp.src('./public/css/stylus/**/styles.styl')
		.pipe(stylus())
		.on('error', function(error) {
			console.error('' + error);
		})
		.pipe(gulp.dest('./public/css'))
		.pipe(reload({
			stream: true
		}));
});

// Task JSHint
gulp.task('jshint', function() {
	return gulp.src(jsfiles)
		.pipe(cache())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// Task JS
gulp.task('js', function() {
	return gulp.src(jsfiles)
		.pipe(concat({
			path: 'scripts.js',
			stat: {
				mode: 0666
			}
		}))
		.pipe(gulp.dest('./public/js/'))
		.pipe(reload({
			stream: true
		}));
});

// Task Images
gulp.task('img', function() {
	return gulp.src('./public/img/src/*.jpg')
		.pipe(jpgcompress({
			loops: 3
		})())
		.pipe(gulp.dest('./public/img'))
});

// Task Sprites
gulp.task('sprite', function() {
	return gulp.src('./public/img/src/*.png')
		.pipe(sprite({
			base64: true,
			style: '_base64.styl',
			processor: 'stylus'
		}))
		.pipe(gulp.dest('./public/css/stylus/core'));
});

// Task Default 
gulp.task('default', ['jade', 'stylus', 'jshint', 'js', 'img', 'sprite'], function() {
	browserSync({
		server: './public/'
	});
	gulp.watch('./public/templates/**/*.jade', ['jade']);
	gulp.watch('./public/css/stylus/**/*.styl', ['stylus']);
	gulp.watch(jsfiles, ['jshint']);
	gulp.watch('./public/js/**/*.js', ['js']);
	gulp.watch('public/img/src/**/*.jpg', ['img']);
	gulp.watch('public/img/src/**/*.png', ['sprite']);
});