/**
 * Controller for contact-us.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.contact')
        .controller('ContactUsController', ContactUsController);

    ContactUsController.$inject = ['$q', 'authentication', 'support', 'logger'];

    /**
     * @namespace ContactUsController
     * @desc Contact controller
     * @memberof Controllers
     */
    function ContactUsController($q, authentication, support, logger) {
        var vm = this;

		vm.sendRequest = sendRequest;

		activate();

		/* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.ContactUsController
         */
		 function activate() {
 			// Promises that need to be resolved to activate
 			var promises = [
				setRequestParams()
			];

 			return $q.all(promises)
 				.then(activateSuccess)
 				.catch(activateFail);

			/* Functions */

 			function activateSuccess() {
 				logger.success('Activated contact view and ctrl');
 			}

 			function activateFail(error) {
 				logger.error('Failed to activate contact-us view and ctrl', error);
 			}
 		}

		/**
         * @name setRequestParams
         * @desc Sets params for the support request form
         * @memberof Controllers.ContactUsController
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
         * @memberof Controllers.ContactUsController
         */
		function sendRequest(isValid) {
			var params = getRequestParams();

			// Validate form
			if (isValid) {
				support.sendRequest(params)
					.then(sendRequestSuccess)
					.catch(sendRequestFail);
			// Set an error message
			} else {
				sendRequestFail('Form didn\'t pass validation');
			}

			/* Functions */

			function sendRequestSuccess(data) {
				// Reset contact form
				nullifyRequestParams();
				logger.info('Finished sending support request', data);
			}

			function sendRequestFail(error) {
				logger.error('Failed to send support request', error);
			}
		}

		/**
         * @name getRequestParams
         * @desc Gets params for the support request from the form
         * @memberof Controllers.ContactUsController
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

		/**
         * @name nullifyRequestParams
         * @desc Reset contact form
         * @memberof Controllers.ContactUsController
         */
		function nullifyRequestParams() {
			vm.firstname = null;
			vm.lastname = null;
			vm.email = null;
			vm.phone = null;
			vm.subject = null;
			vm.content = null;
		}
    }
})();
