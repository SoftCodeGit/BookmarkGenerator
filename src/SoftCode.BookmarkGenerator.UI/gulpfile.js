/// <binding BeforeBuild='config' AfterBuild='libs' Clean='clean' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require('gulp');
var merge = require('merge-stream');
// helper to facilitate the 'clean' task
var rimraf = require('rimraf');
// needed for running the config task
var env = require('./env-set-dont-checkin.json');
var envConfigSettings = require('./env-config.json');
var fs = require('fs');

var paths = {
    npm: './node_modules/',
    lib: './wwwroot/lib/',
    css: './wwwroot/css/',
    fonts: './wwwroot/fonts/',
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

var fonts = [
    paths.npm + 'bootstrap/dist/fonts/*'
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

gulp.task('fonts', function () {
    return gulp.src(fonts).pipe(gulp.dest(paths.fonts));
})

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

//copies all files that end in mock.json
gulp.task('mock', function () {
    gulp.src('scripts/app/**/*mock.json').pipe(gulp.dest('./wwwroot/app'));
});


// we will bind this task so that files are copied after every build
gulp.task('libs', ['rxjs', 'css', 'toaster', 'fonts', 'mock'], function () {
    return gulp.src(libs).pipe(gulp.dest(paths.lib));
});

// define a config task, this will change the export statement in config.ts in accordance to envConfig.json
// we'll need to run this task before the build
gulp.task('config', function (cb) {
    var content = envConfigSettings.preFix + envConfigSettings.envFileMap[env.buildEnv] + ";";
    console.log(content);
    fs.writeFile('./scripts/app/shared/config/config.ts', content, cb)
});

// define a clean up task, we will hook it up to VS's clean event
gulp.task('clean', function (callback) {
    rimraf(paths.lib, callback);
});


