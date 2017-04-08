/**
 * Support Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('support', support);

    support.$inject = ['$http'];

    /**
     * @namespace support
     * @desc Service factory for support
     * @memberof Services
     */
    function support($http) {
        var service = {
			// Contact
            sendRequest: sendRequest,
			// FAQ
			getArticles: getArticles
        };

        return service;

        /* Functions */

        /**
         * @namespace sendRequest
         * @desc Sends a support request
         * @param {object} params The params associated with the request
		 * @return {Promise} Resolved/rejected promise
         * @memberof Services.support
         */
        function sendRequest(params) {
			return $http.post('/support/sendRequest', params);
        }

		/**
         * @namespace getArticles
         * @desc Gets articles from article.json
		 * @return {Promise} Resolved/rejected promise with article data
         * @memberof Services.support
         */
        function getArticles() {
			return $http.get('client/app/modules/support/faq/articles/articles.json');
        }
    }
})();
