var gulp 		= require('gulp'),
	jade 		= require('gulp-jade'),
	stylus 		= require('gulp-stylus'),
	concat 		= require('gulp-concat'),
	browserSync = require('browser-sync'),
	reload 		= browserSync.reload;

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

// Task JS
gulp.task('js', function() {
	return gulp.src(['./public/bower_components/modernizr/modernizr.js', './public/bower_components/jquery/dist/jquery.js', './public/bower_components/bootstrap-stylus/js/collapse.js', './public/bower_components/bootstrap-stylus/js/transition.js', './public/js/animated-header.js', './public/js/smooth-scroll.js', './public/bower_components/scrollReveal.js/dist/scrollReveal.js', './public/js/scroll-reveal.js'])
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
gulp.task('default', ['jade', 'stylus', 'js'], function() {
	browserSync({
		server: './public/'
	});
	gulp.watch('./public/templates/**/*.jade', ['jade']);
	gulp.watch('./public/css/stylus/**/*.styl', ['stylus']);
	gulp.watch('./public/js/**/*.js', ['js']);
});