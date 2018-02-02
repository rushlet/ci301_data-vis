const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');

gulp.task('watch', function () {
    gulp.watch('source/**/*.*', ['default']);
});

gulp.task('html', function(){
		return gulp.src('source/html/**/*.html')
		.pipe(gulp.dest('website/'));
});

gulp.task('css', function(){
    return gulp.src('source/css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('website/'))
});

gulp.task('js', function(){
		return gulp.src('source/js/**/*.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('website/'));
});

gulp.task('assets', function(){
  return gulp.src('source/assets/**/*')
  .pipe(gulp.dest('website/assets'));
})

gulp.task('default', ['html', 'css', 'js', 'assets']);
