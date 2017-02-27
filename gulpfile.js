
// Module dependencies
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plug = gulpLoadPlugins(); // Auto-load plugins
var del = require('del');
console.log(plug);

// Folders
var folder = {
    src: {
        base: 'public/',
        js: 'public/app/**/*.js',
        html: 'public/app/**/*.ejs',
        images: 'public/images/**/*',
        css: 'public/styles/**/*.css'
    },
    dest: {
        base: 'build/',
        js: 'build/app/',
        html: 'build/app/',
        images: 'build/images/',
        css: 'build/styles/'
    }
};

// Development mode
var devBuild = (process.env.NODE_ENV !== 'production') || true;
plug.util.log('Building for', devBuild ? 'development' : 'production');

// default task
gulp.task('default', ['run', 'serve']);

// run task
gulp.task('run', ['images', 'html', 'js', 'css']);

// serve task
gulp.task('serve', ['watch'], function() {
    var nodemonOpts = { script: 'server/server.js' };

    return plug.nodemon(nodemonOpts)
        .on('restart', function() {
            console.log('Nodemon', 'Server restarted');
        });
});

// lint task
gulp.task('lint', ['jslint', 'csslint']);

// jslint task
gulp.task('jslint', function() {
    var src = folder.src.js;
    var dest = folder.dest.js;

    return gulp.src(src)
        .pipe(plug.plumber())
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter());
});

// csslint
gulp.task('csslint', function() {
    var src = folder.src.css;
    var dest = folder.dest.css;

    return gulp.src(src)
        .pipe(plug.plumber())
        .pipe(plug.csslint())
        .pipe(plug.csslint.formatter());
});

// watch task
gulp.task('watch', function() {
    // image changes
    gulp.watch(folder.src.images, ['images']);

    // html changes
    gulp.watch(folder.src.html, ['html']);

    // js changes
    gulp.watch(folder.src.js, ['js']);

    // css changes
    gulp.watch(folder.src.css, ['css']);
});

// images task
gulp.task('images', function() {
    var src = folder.src.images;
    var dest = folder.dest.images;

    return gulp.src(src)
        .pipe(plug.plumber())
        .pipe(plug.size({showFiles: false}))
        .pipe(plug.newer(dest))
        .pipe(plug.imagemin({ optimizationLevel: 5}))
        .pipe(plug.size({showFiles: false}))
        .pipe(gulp.dest(dest));
});

// html task
gulp.task('html', function() {
    var src = folder.src.html;
    var dest = folder.dest.html;

    return gulp.src(src)
        .pipe(plug.plumber())
        .pipe(plug.size({showFiles: false}))
        .pipe(plug.newer(dest))
        .pipe(devBuild ? plug.util.noop() : plug.htmlclean())
        .pipe(plug.size({showFiles: false}))
        .pipe(gulp.dest(dest));
});

// js task
gulp.task('js', function() {
    var src = folder.src.js;
    var dest = folder.dest.js;

    return gulp.src(src)
        .pipe(plug.plumber())
        .pipe(plug.size({showFiles: false}))
        .pipe(plug.deporder())
        .pipe(devBuild ? plug.util.noop() : plug.stripdebug())
        .pipe(devBuild ? plug.util.noop() : plug.uglify())
        .pipe(devBuild ? plug.util.noop() : plug.concat('main.js'))
        .pipe(plug.size({showFiles: false}))
        .pipe(gulp.dest(dest));
});

// css task
gulp.task('css', function() {
    var src = folder.src.css;
    var dest = folder.dest.css;

    return gulp.src(src)
        .pipe(plug.plumber())
        .pipe(plug.size({showFiles: false}))
        .pipe(devBuild ? plug.util.noop() : plug.cleanCss({}))
        .pipe(devBuild ? plug.util.noop() : plug.concat('main.css'))
        .pipe(plug.size({showFiles: false}))
        .pipe(gulp.dest(dest));

});

// clean task
gulp.task('clean', function() {
    var dest = folder.dest.base;

    return del(dest);
});
