/**
 * Controller for faq.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.faq')
        .controller('FAQController', FAQController);

    FAQController.$inject = ['$q', 'logger'];

    /**
     * @namespace FAQController
     * @desc FAQ controller
     * @memberof Controllers
     */
    function FAQController($q, logger) {
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
				getGeneralArticles(),
				getClientArticles(),
				getTrainerArticles()
			];

			return $q.all(promises)
				.then(activateComplete);

			function activateComplete() {
				logger.info('Activated faq view and controller');
			}
		}

		/**
         * @name getGeneralArticles
         * @desc Gets the articles for the general section
         * @memberof Controllers.FAQController
         */
		function getGeneralArticles() {
			vm.generalArticles.push(
				{ name: 'What is TopTraining?', link: 'what-is-toptraining', keywords: []},
				{ name: 'How does TopTraining keep me safe?', link: 'what-is-toptrainingasdf', keywords: ['safe', 'safety']}
			);
		}

		/**
         * @name getClientArticles
         * @desc Gets the articles for the client section
         * @memberof Controllers.FAQController
         */
		function getClientArticles() {
			vm.clientArticles.push(
				{ name: 'How do I book a training session?', link: 'what-is-toptraining', keywords: ['trainer', 'package', 'purchase']}
			);
		}

		/**
         * @name getTrainerArticles
         * @desc Gets the articles for the trainer section
         * @memberof Controllers.FAQController
         */
		function getTrainerArticles() {
			vm.trainerArticles.push(
				{ name: 'Trainer Expectations', link: 'what-is-toptraining', keywords: ['training', 'guidelines']}
			);
		}
    }
})();
