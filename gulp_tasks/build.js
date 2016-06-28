/**
 * Task: Build
 * --------------------------------------------------
 */

'use strict';

// Dependencies
var gulp        = require('gulp');
var runSequence = require('run-sequence');

// Task
gulp.task('build', function(cb) {

  // Run tasks synchronously
  return runSequence(
    [ 'assets' ],
    [ 'scripts' ],
    [ 'styles' ],
    [ 'views' ],
    cb
  );
});
