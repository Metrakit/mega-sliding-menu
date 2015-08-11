// packages
var gulp           = require('gulp'),
    notify         = require('gulp-notify'),
    jshint         = require('gulp-jshint'),
    browserSync    = require('browser-sync'),
    reload         = browserSync.reload;
    compass        = require('gulp-compass'),
    plumber        = require('gulp-plumber')
    path           = require('path');

// paths
var path = {
        src: "src",
        dist: "dist",
        icons: path.join(__dirname, "node_modules/gulp-notify/node_modules/node-notifier/node_modules/growly/example/")
};

// Error Handler
var plumberErrorHandler = { errorHandler: notify.onError({
        title: "SASS ERROR",
        message: "Error: <%= error.message %>",
        icon: path.icons + "muffin.png",
    })
};

// Browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        baseDir: "./examples/"
    });
});

// Javascript
gulp.task('js', function() {
    var masterJS = [path.src + '/js/*.js'];
    return gulp.src(masterJS)
        .pipe(jshint())
        .pipe(notify({
            icon: path.icons + "cake.png",
            title: "JAVASCRIPT ERROR",
            message: function (file) {
                if (file.jshint.success) return false;

                var errors = file.jshint.results.map(function (data) {
                    if (data.error) {
                        return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                    }
                }).join("\n");
                return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
            }
        }));
});
 
// Sass
gulp.task('compass', function() {
  gulp.src(path.src + '/scss/*.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(compass({
      css: path.dist + '/css/',
    }))
    .pipe(reload({stream: true}));
});

// Default task
gulp.task('default', ['browser-sync', 'js', 'compass'], function () {
    gulp.watch(path.src + "/js/*.js", ['js', browserSync.reload]);
    gulp.watch(path.src + "/scss/*.scss", ['compass']);
});


