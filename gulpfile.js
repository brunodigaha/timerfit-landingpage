// Plugins
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	cache = require('gulp-cached'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	jpgcompress = require('imagemin-jpeg-recompress'),
	sprite = require('css-sprite').stream,
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	usemin = require('gulp-usemin'),
	uglify = require('gulp-uglify'),
	minifyHtml = require('gulp-minify-html'),
	minifyCss = require('gulp-minify-css'),
	rev = require('gulp-rev'),
	gulpSequence = require('gulp-sequence');

// Path JS Files
var jsfiles = [
	// Bower Libraries
	'./public/bower_components/modernizr/modernizr.js',
	'./public/bower_components/jquery/dist/jquery.js',
	'./public/bower_components/bootstrap-stylus/js/collapse.js',
	'./public/bower_components/bootstrap-stylus/js/transition.js',
	'./public/bower_components/magnific-popup/dist/jquery.magnific-popup.js',
	'./public/bower_components/jquery-easing-original/jquery.easing.js',
	// JS Functions
	'./public/js/lib/magnific-popup.js',
	'./public/js/lib/easing.js',
	'./public/js/lib/show-nav.js',
	'./public/js/lib/collapse-nav.js'
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
		.pipe(gulp.dest('./public/img'));
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

gulp.task('usemin', function() {
	return gulp.src('./public/*.html')
		.pipe(usemin({
			css: [minifyCss, rev],
			html: [function() {
				return minifyHtml({
					empty: true
				});
			}],
			js: [uglify, rev]
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy', function() {
	return gulp.src('public/img/*.+(jpg|png|gif|svg)')
		//.pipe(rev())
		//.pipe(rev.manifest())
		.pipe(gulp.dest('dist/img'));
});

// Task Default 
gulp.task('dev', ['jade', 'stylus', 'jshint', 'js', 'img'], function() {
	browserSync({
		server: './public/'
	});
	gulp.watch('./public/templates/**/*.jade', ['jade']);
	gulp.watch('./public/css/stylus/**/*.styl', ['stylus']);
	gulp.watch(jsfiles, ['jshint']);
	gulp.watch('./public/js/**/*.js', ['js']);
	gulp.watch('public/img/src/**/*.jpg', ['img']);
});

gulp.task('prod', gulpSequence('usemin', 'copy'));