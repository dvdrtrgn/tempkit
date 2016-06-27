/**
 * Task: Views
 * --------------------------------------------------
 */

'use strict';

// Dependencies
var gulp     = require('gulp');
var minimist = require('minimist');
var jade     = require('gulp-pug');

// Build options
var options = minimist(process.argv.slice(2), {
  string: [ 'env' ],
  default: {
    env: 'dev'
  }
});

// Task
gulp.task('views', function() {

  return gulp.src('./source/views/index.jade')

    // Jade compilation
    .pipe(jade({
      pretty: true,
      data: {
        env: options.env
      }
    }))

    // Save optimized HTML
    .pipe(gulp.dest('./build'));

});
