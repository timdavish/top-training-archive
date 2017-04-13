/**
 * Controller for faq.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.faq')
        .controller('FAQController', FAQController);

    FAQController.$inject = ['$q', 'support', 'logger'];

    /**
     * @namespace FAQController
     * @desc FAQ controller
     * @memberof Controllers
     */
    function FAQController($q, support, logger) {
        var vm = this;

		vm.generalArticles = [];
		vm.clientArticles = [];
		vm.trainerArticles = [];

		activate();

		/* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.FAQController
         */
		function activate() {
			// Promises that need to be resolved to activate
			var promises = [
				getArticles()
			];

			return $q.all(promises)
				.then(activateSuccess)
				.catch(activateFail);

			/* Functions */

			function activateSuccess() {
				logger.success('Activated FAQ view and ctrl');
			}

			function activateFail(error) {
				logger.error('Failed to activate FAQ view and ctrl', error);
			}
		}

		/**
         * @name getArticles
         * @desc Gets all the articles for the FAQ
         * @memberof Controllers.FAQController
         */
		function getArticles() {
			var deferred = $q.defer();

			support.getArticles()
				.then(getArticlesSuccess)
				.catch(getArticlesFail);

			return deferred.promise;

			/* Functions */

			function getArticlesSuccess(res) {
				// Set our articles
				vm.generalArticles = res.data.general;
				vm.clientArticles = res.data.client;
				vm.trainerArticles = res.data.trainer;
				deferred.resolve();
			}

			function getArticlesFail(error) {
				deferred.reject(error);
			}
		}
    }
})();
