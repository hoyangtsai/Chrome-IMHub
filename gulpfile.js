'use strict';

var gulp = require('gulp');
var webpack = require("gulp-webpack");
var notify = require('gulp-notify');
var minifyCss = require('gulp-minify-css');

var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function() {
  return gulp.src('./app/App.js')
    .pipe(webpack(webpackConfig), null,
      function(err, stats) {
        notify.onError("Error: <%= err %>");
      })
    .pipe(gulp.dest('.'));
});

gulp.task('minify-css', function() {
  return gulp.src('app/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('watch', function() {
  gulp.watch(['app/*.js', 'app/**/*.js'], ['webpack']);
  gulp.watch('app/styles/*.css', ['minify-css']);
});

gulp.task('default', ['webpack','watch']);