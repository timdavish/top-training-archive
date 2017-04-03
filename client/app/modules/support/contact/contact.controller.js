/**
 * Controller for contact.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.contact')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$q', 'authentication', 'support', 'logger'];

    /**
     * @namespace ContactController
     * @desc Contact controller
     * @memberof Controllers
     */
    function ContactController($q, authentication, support, logger) {
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
 			var promises = [
				setRequestParams()
			];

 			return $q.all(promises)
 				.then(activateSuccess)
 				.catch(activateFail);

 			function activateSuccess() {
 				logger.success('Activated contact view and ctrl');
 			}

 			function activateFail(error) {
 				logger.error('Failed to activate contact view and ctrl', error);
 			}
 		}

		/**
         * @name setRequestParams
         * @desc Sets params for the support request form
         * @memberof Controllers.ContactController
         */
		function setRequestParams() {
			var deferred = $q.defer();

			// If a user is logged in and their data exists
			if (authentication.isLoggedIn() && authentication.currentUser()) {
				var contact = authentication.currentUser().contact;

				if (contact.firstname) {
					vm.firstname = contact.firstname;
				}
				if (contact.lastname) {
					vm.lastname = contact.lastname;
				}
				if (contact.email) {
					vm.email = contact.email;
				}
				if (contact.phone) {
					vm.phone = contact.phone;
				}
			}

			// No matter what, this promise is resolved
			deferred.resolve();

			return deferred.promise;
		}

		/**
         * @name sendRequest
         * @desc Attempts to send support request
         * @memberof Controllers.ContactController
         */
		function sendRequest() {
			var params = getRequestParams();

			support.sendRequest(params)
				.then(sendRequestSuccess)
				.catch(sendRequestFail);

			function sendRequestSuccess(data) {
				logger.info('Finished sending support request', data);
			}

			function sendRequestFail(error) {
				logger.error('Failed to send support request', error);
			}
		}

		/**
         * @name getRequestParams
         * @desc Gets params for the support request from the form
         * @memberof Controllers.ContactController
         */
		function getRequestParams() {
			return {
				firstname: vm.firstname,
				lastname: vm.lastname,
				email: vm.email,
				phone: vm.phone,
				subject: vm.subject,
				content: vm.content
			};
		}
    }
})();
