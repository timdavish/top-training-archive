/**
 * Support Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('support', support);

    support.$inject = ['$q', '$http'];

    /**
     * @namespace support
     * @desc Service factory for support
     * @memberof Services
     */
    function support($q, $http) {
        var service = {
			// Contact
            sendRequest: sendRequest,
			// FAQ
			articles: [],
			getArticles: getArticles
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

			$http.post('', params)
				.then(sendRequestComplete)
				.catch(sendRequestCatch);

			return deferred.promise;

			/* Functions */

			function sendRequestComplete(result) {
				deferred.resolve(result);
			}

			function sendRequestCatch() {
				deferred.reject('sendRequest failed');
			}
        }

		/**
         * @namespace getArticles
         * @desc Gets articles from article.json
         * @memberof Services.support
         */
        function getArticles() {
			var deferred = $q.defer();

			$http.get('client/app/modules/support/faq/articles/articles.json')
				.then(getArticlesComplete)
				.catch(getArticlesCatch);

			return deferred.promise;

			/* Functions */

			function getArticlesComplete(result) {
				var data = result.data;
				deferred.resolve(data);
			}

			function getArticlesCatch() {
				deferred.reject('getArticles failed');
			}
        }
    }
})();
