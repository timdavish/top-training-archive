/**
 * Controller for contact.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.contact')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$q', 'support', 'logger'];

    /**
     * @namespace ContactController
     * @desc Contact controller
     * @memberof Controllers
     */
    function ContactController($q, support, logger) {
        var vm = this;

		vm.sendRequest = sendRequest;

		activate();

		/* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.ContactController
         */
		function activate() {
			// Promises that need to be resolved to activate
			var promises = [];

			return $q.all(promises)
				.then(activateComplete);

			function activateComplete() {
				logger.info('Activated contact view and controller');
			}
		}

		function sendRequest() {
			var params = {
				firstname: vm.firstname,
				lastname: vm.lastname,
				email: vm.email,
				phone: vm.phone,
				subject: vm.subject,
				content: vm.content
			};

			return support.sendRequest(params)
				.then(sendRequestComplete);

			function sendRequestComplete(data) {
				logger.info('Finished sending support request', data);
			}
		}
    }
})();
