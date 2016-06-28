/**
 * Task: Styles
 * --------------------------------------------------
 */

'use strict';

// Dependencies
var pkg          = require('../package.json');
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var header       = require('gulp-header');
var scsslint     = require('gulp-scss-lint');
var sass         = require('gulp-sass');
var compass      = require('gulp-compass');

// Task
gulp.task('styles', function(cb) {

  // Run tasks synchronously
  return runSequence(
    [ 'styles-lint' ],
    [ 'styles-build' ],
    cb
  );
});

// Lint Sass
gulp.task('styles-lint', function() {

  return gulp.src('./source/styles/**/*.scss')

    // Lint Sass
    .pipe(scsslint({
      config: './gulp_tasks/_sass-lint.yml'
    }));

});

// Build styles
gulp.task('styles-build', function() {

  return gulp.src('./source/styles/*.scss')

    .pipe(compass({
        css: 'build/styles',
        sass: 'source/styles',
    }))

    // Compile Sass
    .pipe(sass({
      outputStyle: 'nested'
    }))

    // Save expanded CSS
    .pipe(gulp.dest('./build/styles'));
});
