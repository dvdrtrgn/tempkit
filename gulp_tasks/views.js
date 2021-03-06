/**
 * Task: Views
 * --------------------------------------------------
 */

'use strict';

// Dependencies
var gulp     = require('gulp');
var minimist = require('minimist');
var jade     = require('gulp-pug');
//var htmlhint = require('gulp-htmlhint');

// Build options
var options = minimist(process.argv.slice(2), {
  string: [ 'env' ],
  default: {
    env: 'dev'
  }
});

// Task
gulp.task('views', function() {

  return gulp.src(['./source/views/ind*.jade', './source/views/ind*.pug'])

    // Jade compilation
    .pipe(jade({
      pretty: true,
      data: {
        env: options.env
      }
    }))

    // Lint HTML
    //.pipe(htmlhint({
    //  htmlhintrc: './gulp_tasks/_html-lint.json'
    //}))
    //.pipe(htmlhint.reporter())

    // Save optimized HTML
    .pipe(gulp.dest('./build'));
});
