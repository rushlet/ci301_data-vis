const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const del = require('del');

gulp.task('watch', function () {
    gulp.watch('source/**/*.*', ['default']);
});

gulp.task('html', function(){
		return gulp.src('source/html/**/*.html')
		.pipe(gulp.dest('website/'));
});

gulp.task('sass', function(cb) {
    return gulp.src('source/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('website/'));
    cb(err);
});

gulp.task('js', function(){
		return gulp.src('source/js/**/*.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('website/'));
});

gulp.task('assets', function(){
  return gulp.src('source/assets/**/*')
  .pipe(gulp.dest('website/assets'));
});

gulp.task('clean-up', ['sass'], function(){
    del(['website/*', '!website/main.css', '!website/bundle.js', '!website/index.html', '!website/spotify_auth.html', '!website/assets']);
});

gulp.task('default', ['html', 'sass', 'js', 'assets', 'clean-up']);
