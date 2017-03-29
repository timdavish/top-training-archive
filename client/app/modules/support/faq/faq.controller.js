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

		activate();

		/* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.FAQController
         */
		function activate() {
			// Promises that need to be resolved to activate
			var promises = [];

			return $q.all(promises)
				.then(activateComplete);

			function activateComplete() {
				logger.info('Activated faq view and controller');
			}
		}
    }
})();
