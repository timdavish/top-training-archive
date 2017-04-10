/**
 * Karma configuration
 */

// Export the config
module.exports = function(config) {
    config.set({
        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Frameworks to use
        frameworks: ['jasmine'],

        // List of files/patterns to load in the browser
        files: [
			'bower_components/angular/angular.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-animate/angular-animate.min.js',
			'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/angular-ui-router/release/angular-ui-router.min.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
			'bower_components/moment/min/moment.min.js',
			'bower_components/interactjs/dist/interact.min.js',
			'bower_components/rrule/lib/rrule.js',
			'https://maps.googleapis.com/maps/api/js?libraries=places,visualization&key=AIzaSyAyLamwtoSIwmfGd1xXJpH3MOpWTancJpA',
			'bower_components/ngmap/build/scripts/ng-map.min.js',
			'bower_components/angular-modal-service/dst/angular-modal-service.min.js',

			'client/app/**/*.module.js', // Load modules first
			'client/app/**/*.js', // All other app js
			'client/app/**/*.html', // App html

			'client/test/test-helpers.js', // Test helper functions
			'client/app/**/*.spec.js' // Tests
        ],

        // List of files to exclude
        exclude: [],

        // Preprocess matching files before serving them to the browser
        preprocessors: {},

        // Test results reporter
        reporters: ['progress'],

        // Web server port
        port: 3000,

        // Enable/disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        logLevel: config.LOG_INFO,

        // Enable/disabled watching files and executing tests on file changes
        autoWatch: false,

        // Start these browsers
        browsers: ['Chrome'],

        // Continuous integration mode
        // If true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        //
        concurrency: Infinity
    });
};
