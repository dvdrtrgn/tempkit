/**
 * Task: Scripts
 * --------------------------------------------------
 */

'use strict';

// Dependencies
var pkg          = require('../package.json');
var gulp         = require('gulp');
var include      = require('gulp-include');
var jscs         = require('gulp-jscs');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var jshintConfig = require('../gulp_tasks/conf/js-lint.json');
//var rename       = require('gulp-rename');
//var header       = require('gulp-header');
//var moment       = require('moment');
//var uglify       = require('gulp-uglify');
//var banner       = '/*! <%= pkg.title %> | <%= moment().format("MMMM Do YYYY, h:mm:ss A") %> */\n';

// Task
gulp.task('scripts', function() {

  return gulp.src('./source/scripts/**/*.js')

    // Include JS
    // Similar to Sass `@import`
    .pipe(include())

    // Check JSCS
    .pipe(jscs({
      configPath: './gulp_tasks/conf/js-guide.json'
    }))

    // Lint JS
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish))

    // Add banner
    //.pipe(header(banner, {
    //  pkg: pkg,
    //  moment: moment
    //}))

    // Save uncompressed JS
    .pipe(gulp.dest('./build/scripts'))

    // Minify JS
    //.pipe(uglify({
    //  preserveComments: 'some'
    //}))
    // Add `.min` suffix
    //.pipe(rename({
    //  suffix: '.min'
    //}))

    // Save compressed JS
    .pipe(gulp.dest('./build/scripts'));
});
