var gulp 		= require('gulp'),
	jade 		= require('gulp-jade'),
	sass 		= require('gulp-sass'),
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

// Task Sass
gulp.task('sass', function() {
	gulp.src('./public/css/sass/**/*.scss')
		.pipe(sass())
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
	return gulp.src(['./public/bower_components/modernizr/modernizr.js', './public/bower_components/jquery/dist/jquery.js', './public/bower_components/materialize/dist/js/materialize.js', './public/bower_components/holderjs/holder.js', 'public/js/custom.js'])
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
gulp.task('default', ['jade', 'sass', 'js'], function() {
	browserSync({
		server: './public/'
	});
	gulp.watch('./public/templates/**/*.jade', ['jade']);
	gulp.watch('./public/css/sass/**/*.scss', ['sass']);
	gulp.watch('./public/js/**/*.js', ['js']);
});