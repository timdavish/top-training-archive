/**
 * Controller for faq.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.faq')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$q', 'articleId', 'logger'];

    /**
     * @namespace ArticleController
     * @desc Article controller
     * @memberof Controllers
     */
    function ArticleController($q, articleId, logger) {
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
				.then(activateComplete);

			function activateComplete() {
				logger.info('Activated article view and controller');
			}
		}

		/**
         * @name setArticle
         * @desc Sets the article source
         * @memberof Controllers.ContactController
         */
		function setArticle() {
			vm.articleSource = 'client/app/modules/support/faq/articles/' + articleId + '.html';
		}
    }
})();
