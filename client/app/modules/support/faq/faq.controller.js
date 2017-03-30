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
				setGeneralArticles(),
				setClientArticles(),
				setTrainerArticles()
			];

			return $q.all(promises)
				.then(activateComplete);

			function activateComplete() {
				logger.info('Activated faq view and controller');
			}
		}

		function setGeneralArticles() {
			vm.generalArticles.push(
				{ name: 'What is TopTraining?', link: 'what-is-toptraining'},
				{ name: 'How does TopTraining keep me safe?', link: 'what-is-toptrainingasdf'}
			);
		}

		function setClientArticles() {
			vm.clientArticles.push(
				{ name: 'What is TopTraining?', link: 'what-is-toptraining'},
				{ name: 'How does TopTraining keep me safe?', link: 'what-is-toptrainingasdf'}
			);
		}

		function setTrainerArticles() {
			vm.trainerArticles.push(
				{ name: 'What is TopTraining?', link: 'what-is-toptraining'},
				{ name: 'How does TopTraining keep me safe?', link: 'what-is-toptrainingasdf'}
			);
		}
    }
})();
