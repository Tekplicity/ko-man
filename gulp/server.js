'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
function isOnlyChange(event) {
    return event.type === 'changed';
}

// gulp.task('watch', function () {
//   gulp.watch(path.join(conf.paths.server, '/**/*.js'), function(event) {
//       console.log('watch:', event)
//   });
//
// });

gulp.task('env:dev', () => {
    env({
        vars: {NODE_ENV: 'development'}
    });
});

gulp.task('serve:dev', function () {
    nodemon({
        script: path.join(conf.paths.server, '/app.js'),
        ext: 'js'
    })
    .on('restart', function () {
        console.log('restarted!')
    })
});


gulp.task('serve', ['env:dev', 'serve:dev']);
