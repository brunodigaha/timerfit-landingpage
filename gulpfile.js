// Plugins
var gulp 		= require('gulp'),
	jade 		= require('gulp-jade'),
	stylus 		= require('gulp-stylus'),
	jshint 		= require('gulp-jshint'),
	stylish 	= require('jshint-stylish'),
	cache 		= require('gulp-cached'),
	concat 		= require('gulp-concat'),
	browserSync = require('browser-sync'),
	reload 		= browserSync.reload;

// Path JS Files
var jsfiles = [
	'./public/bower_components/modernizr/modernizr.js',
	'./public/bower_components/jquery/dist/jquery.js',
	'./public/bower_components/bootstrap-stylus/js/collapse.js',
	'./public/bower_components/bootstrap-stylus/js/transition.js',
	'./public/bower_components/scrollreveal/dist/scrollReveal.js',
	'./public/js/lib/animated-header.js',
	'./public/js/lib/smooth-scroll.js',
	'./public/js/lib/scroll-reveal.js'
];

// Task Jade
gulp.task('jade', function () {
	gulp.src('./public/templates/**/index.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', function (error) {
			console.error('' + error);
		})
		.pipe(gulp.dest('./public/'))
		.pipe(reload({
			stream: true
		}));
});

// Task Stylus
gulp.task('stylus', function () {
	gulp.src('./public/css/stylus/**/styles.styl')
		.pipe(stylus())
		.on('error', function (error) {
			console.error('' + error);
		})
		.pipe(gulp.dest('./public/css'))
		.pipe(reload({
			stream: true
		}));
});

// Task JSHint
gulp.task('jshint', function () {
	return gulp.src(jsfiles)
		.pipe(cache())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// Task JS
gulp.task('js', function () {
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

// Task Default 
gulp.task('default', ['jade', 'stylus', 'jshint', 'js'], function () {
	browserSync({
		server: './public/'
	});
	gulp.watch('./public/templates/**/*.jade', ['jade']);
	gulp.watch('./public/css/stylus/**/*.styl', ['stylus']);
	gulp.watch(jsfiles, ['jshint']);
	gulp.watch('./public/js/**/*.js', ['js']);
});