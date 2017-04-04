/**
 * Controller for faq-artcle.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.faq')
        .controller('FAQArticleController', FAQArticleController);

    FAQArticleController.$inject = ['$q', '$stateParams', 'logger'];

    /**
     * @namespace FAQArticleController
     * @desc FAQ Article controller
     * @memberof Controllers
     */
    function FAQArticleController($q, $stateParams, logger) {
        var vm = this;

		vm.articleSource = '';

		activate();

		/* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.ArticleController
         */
		 function activate() {
 			// Promises that need to be resolved to activate
 			var promises = [
 				setArticle()
 			];

 			return $q.all(promises)
 				.then(activateSuccess)
 				.catch(activateFail);

 			function activateSuccess() {
 				logger.success('Activated FAQ article view and ctrl');
 			}

 			function activateFail(error) {
 				logger.error('Failed to activate FAQ article view and ctrl', error);
 			}
 		}

		/**
         * @name setArticle
         * @desc Sets the article source
         * @memberof Controllers.ContactController
         */
		function setArticle() {
			var deferred = $q.defer();

			if ($stateParams.articleId) {
				vm.articleSource = 'client/app/modules/support/faq/articles/' + $stateParams.articleId + '.html';
				deferred.resolve();
			} else {
				deferred.reject('article does not exist');
			}

			return deferred.promise;
		}
    }
})();
