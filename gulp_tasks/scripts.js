/**
 * Task: Scripts
 * --------------------------------------------------
 */

'use strict';

// Dependencies
var gulp         = require('gulp');
var include      = require('gulp-include');
var jscs         = require('gulp-jscs');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var jshintConfig = require('../gulp_tasks/_js-lint.json');
var pkg          = require('../package.json');

// Task
gulp.task('scripts', function() {

  return gulp.src('./source/scripts/**/*.js')

    // Include JS
    // Similar to Sass `@import`
    .pipe(include())

    // Check JSCS
    .pipe(jscs({
      configPath: './gulp_tasks/_js-guide.json'
    }))

    // Lint JS
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish))

    // Save uncompressed JS
    .pipe(gulp.dest('./build/scripts'));

});
