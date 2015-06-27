var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat');

gulp.task('sass', function() {
	gulp.src('./public/css/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
	return gulp.src(['./public/bower_components/modernizr/modernizr.js', './public/bower_components/jquery/dist/jquery.js', './public/bower_components/materialize/dist/js/materialize.js', 'public/js/custom.js'])
		.pipe(concat({
			path: 'scripts.js',
			stat: {
				mode: 0666
			}
		}))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
	gulp.watch('./public/css/sass/**/*.scss', ['sass']);
	gulp.watch('./public/js/**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);