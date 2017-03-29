/**
 * Logger
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    /**
     * @namespace logger
     * @desc Logger used by entire app
     * @memberof Services
     */
    function logger($log) {
        var service = {
			// Message types
			log: $log.log, // Log normally
            info: info, // Log an info
            success: success, // Log a success
            warning: warning, // Log a warning
			error: error, // Log an error
        };

        return service;

        /* Functions */

        /**
         * @namespace info
         * @desc Adds an info message to the log
         * @param {String} message Info message
         * @param {String} data Info data
         * @param {String} title Info title
         * @memberof Services.logger
         */
        function info(message, data) {
			$log.info('Info: ' + message, data);
        }

        /**
         * @namespace success
         * @desc Adds a success message Successto the log
         * @param {String} message Success message
         * @param {String} data Success data
         * @param {String} title Success title
         * @memberof Services.logger
         */
        function success(message, data) {
            $log.info('Success: ' + message, data);
        }

        /**
         * @namespace warning
         * @desc Adds a warning message to the log
         * @param {String} message Warning message
         * @param {String} data Warning data
         * @param {String} title Warning title
         * @memberof Services.logger
         */
        function warning(message, data) {
            $log.warn('Warning: ' + message, data);
        }

        /**
         * @namespace error
         * @desc Adds an error message to the log
         * @param {String} message Error message
         * @param {String} data Error data
         * @param {String} title Error title
         * @memberof Services.logger
         */
        function error(message, data) {
            $log.error('Error: ' + message, data);
        }
    }
})();
