/// <binding AfterBuild='libs' Clean='clean' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require('gulp');
var merge = require('merge-stream');
// helper to facilitate the 'clean' task
var rimraf = require('rimraf');

var paths = {
    npm: './node_modules/',
    lib: './wwwroot/lib/',
    css: './wwwroot/css/',
    toaster: './wwwroot/lib/angular2-toaster/'
};

// only include files that we need from node_modules
var libs = [
    paths.npm + 'angular2/bundles/angular2.dev.js',
    paths.npm + 'angular2/bundles/angular2-polyfills.js',
    paths.npm + 'angular2/bundles/http.dev.js',
    paths.npm + 'angular2/bundles/router.dev.js',
    paths.npm + 'es6-shim/es6-shim.js',
    paths.npm + 'systemjs/dist/system.js',
    paths.npm + 'systemjs/dist/system-polyfills.js',
    paths.npm + 'angular2/es6/dev/src/testing/shims_for_IE.js'
];

var css = [
    paths.npm + 'bootstrap/dist/css/bootstrap.css',
    paths.npm + 'angular2-toaster/lib/toaster.css'
];

var toasterLib = [

    paths.npm + 'angular2-toaster/lib/bodyOutputType.js',
    paths.npm + 'angular2-toaster/lib/toast.js',
    paths.npm + 'angular2-toaster/lib/toaster.service.js',
    paths.npm + 'angular2-toaster/lib/toaster-config.js',
    paths.npm + 'angular2-toaster/lib/toaster-container.component.js'
];

var toasterSrc = [
    paths.npm + 'angular2-toaster/angular2-toaster.js'
];

gulp.task('css', function () {
    return gulp.src(css).pipe(gulp.dest(paths.css));
});

// the entire content under rxjs folder is needed
gulp.task('rxjs', function () {
    return gulp.src(paths.npm + 'rxjs/**/*.js').pipe(gulp.dest(paths.lib + 'rxjs'));
});

gulp.task('toaster', function () {
    var libs = toasterLib.map(function (element) {
        return gulp.src(toasterLib).pipe(gulp.dest(paths.toaster + 'lib'));
    });
    
    var src = toasterSrc.map(function (element) {
        return gulp.src(toasterSrc).pipe(gulp.dest(paths.toaster));
    })
    return merge(src, libs);
});

// copy everything to libs folder
// we will bind this task so that files are copied after every build
gulp.task('libs', ['rxjs', 'css', 'toaster'], function () {
    return gulp.src(libs).pipe(gulp.dest(paths.lib));
});

// define a clean up task, we will hook it up to VS's clean event
gulp.task('clean', function (callback) {
    rimraf(paths.lib, callback);
});