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
            showToasts: false,

			// Message types
            info: info,
            success: success,
            warning: warning,
			error: error,

            // straight to console; bypass toastr
            log: $log.log
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
        function info(message, data, title) {
			// Log to the console
			$log.info('Info: ' + message, data);

			if (service.showToasts) {
				// Show a toast
				toastr.info(message, title);
			}
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
			// Log to the console
            $log.info('Success: ' + message, data);

			if (service.showToasts) {
				// Show a toast
				toastr.success(message, title);
			}
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
			// Log to the console
            $log.warn('Warning: ' + message, data);

			if (service.showToasts) {
				// Show a toast
				toastr.warning(message, title);
			}
        }

        /**
         * @namespace error
         * @desc Adds an error message to the log
         * @param {String} message Error message
         * @param {String} data Error data
         * @param {String} title Error title
         * @memberof Services.logger
         */
        function error(message, data, title) {
			// Log to the console
            $log.error('Error: ' + message, data);

			if (service.showToasts) {
				// Show a toast
				toastr.error(message, title);
			}
        }
    }
})();
