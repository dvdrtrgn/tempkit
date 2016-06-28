/**
 * Task: Clean
 * --------------------------------------------------
 */

'use strict';

// Dependencies
var gulp        = require('gulp');
var del         = require('del');

// Task
gulp.task('clean', function(cb) {

  del('./.sass-cache/*');
  return del('./build/*');
});
