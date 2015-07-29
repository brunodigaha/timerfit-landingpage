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
	gulp.src('./public/css/stylus/**/*.styl')
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
	return gulp.src(['./public/bower_components/modernizr/modernizr.js', 'public/js/custom.js'])
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