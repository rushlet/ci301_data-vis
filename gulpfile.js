const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify-es').default;

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

gulp.task('clean-up', ['sass', 'html', 'js'], function(){
    del(['website/*', '!website/main.css', '!website/bundle.js', '!website/index.html', '!website/project.html', '!website/assets']);
});

gulp.task('minify-css', () => {
  return gulp.src('website/main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('website/'));
});

gulp.task('minify-js', function(){
  gulp.src('website/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('website/'));
});

gulp.task('default', ['html', 'sass', 'js', 'assets', 'clean-up']);
gulp.task('minify', ['minify-css', 'minify-js']);
