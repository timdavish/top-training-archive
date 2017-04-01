/**
 * Support Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('support', support);

    support.$inject = ['$q', '$http', 'logger'];

    /**
     * @namespace support
     * @desc Service factory for support
     * @memberof Services
     */
    function support($q, $http, logger) {
        var service = {
            sendRequest: sendRequest
        };

        return service;

        /* Functions */

        /**
         * @namespace sendRequest
         * @desc Sends a support request
         * @param {object} params The params associated with the request
         * @memberof Services.support
         */
        function sendRequest(params) {
			var deferred = $q.defer();

			return $http.post('', params)
				.then(sendRequestComplete)
				.catch(sendRequestCatch);

			/* Functions */

			function sendRequestComplete(data) {
				logger.success('Contact sendRequest promise resolved');

				deferred.resolve(data);
			}

			function sendRequestCatch() {
				logger.error('Contact sendRequest promise rejected');

				deferred.reject('Error sending contact request');
			}

			return deferred;
        }
    }
})();
