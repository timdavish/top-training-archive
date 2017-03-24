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
			'client/test/test-helpers.js', // Test helper functions
            'client/app/**/*.html',
            'client/app/**/*.js'
        ],

        // List of files to exclude
        exclude: [
        ],

        // Preprocess matching files before serving them to the browser
        preprocessors: {
        },

        // Test results reporter
        reporters: ['progress'],

        // Web server port
        port: 3000,

        // Enable/disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        logLevel: config.LOG_INFO,

        // Enable/disabled watching files and executing tests on file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['Chrome'],

        // Continuous integration mode
        // If true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        //
        concurrency: Infinity
    });
};
