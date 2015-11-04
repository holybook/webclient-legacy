'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

var config = function (env) {
    return function() {
        gulp.src('config.json')
            .pipe($.ngConfig('holybook.config', {
                environment: env
            }))
            .pipe(gulp.dest('src/app'));
    };
};

gulp.task('local:config', config('local'));
gulp.task('production:config', config('production'));

gulp.task('styles', ['wiredep'], function () {
    return gulp.src('src/{app,components}/**/*.scss')
        .pipe($.sass({style: 'expanded'}))
        .on('error', handleError)
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp'))
        .pipe($.size());
});

var scripts = function () {
    return gulp.src('src/{app,components}/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
};

gulp.task('local:scripts', ['local:config'], scripts);
gulp.task('production:scripts', ['production:config'], scripts);

gulp.task('partials', function () {
    return gulp.src('src/{app,components}/**/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: 'holybook'
        }))
        .pipe(gulp.dest('.tmp'))
        .pipe($.size());
});

var html = function () {
    var htmlFilter = $.filter('*.html', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var assets;

    return gulp.src('src/*.html')
        .pipe($.inject(gulp.src('.tmp/{app,components}/**/*.js'), {
            read: false,
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            addPrefix: '../'
        }))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        //.pipe($.replace('bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts'))
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest('dist'))
        .pipe($.size());
};

gulp.task('local:html', ['styles', 'local:scripts', 'partials'], html);
gulp.task('production:html', ['styles', 'production:scripts', 'partials'], html);

gulp.task('images', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('misc', function () {
    return gulp.src('src/**/*.ico')
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('clean', function (done) {
    $.del(['.tmp', 'dist'], done);
});

gulp.task('build', ['production:html', 'images', 'fonts', 'misc']);
