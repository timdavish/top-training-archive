/**
 * Logger
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    /**
     * @namespace logger
     * @desc Logger used by entire app
     * @memberof Services
     */
    function logger($log, toastr) {
        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            // straight to console; bypass toastr
            log: $log.log
        };

        return service;

        /* Functions */

        /**
         * @namespace error
         * @desc Adds an error message to the log
         * @param {String} message Error message
         * @param {String} data Error data
         * @param {String} title Error title
         * @memberof Services.logger
         */
        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        /**
         * @namespace info
         * @desc Adds an info message to the log
         * @param {String} message Info message
         * @param {String} data Info data
         * @param {String} title Info title
         * @memberof Services.logger
         */
        function info(message, data, title) {
            toastr.info(message, title);
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
        function success(message, data, title) {
            toastr.success(message, title);
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
        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
})();
