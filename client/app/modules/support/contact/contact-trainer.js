/**
 * Controller for contact-trainer.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.contact')
        .controller('ContactTrainerController', ContactTrainerController);

    ContactTrainerController.$inject = ['$q', 'authentication', 'support', 'logger'];

    /**
     * @namespace ContactTrainerController
     * @desc Contact trainer controller
     * @memberof Controllers
     */
    function ContactTrainerController($q, authentication, support, logger) {
        var vm = this;

		vm.sendMessage = sendMessage;

		activate();

		/* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.ContactTrainerController
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
 				logger.error('Failed to activate contact-trainer view and ctrl', error);
 			}
 		}

		/**
         * @name setRequestParams
         * @desc Sets params for the support request form
         * @memberof Controllers.ContactTrainerController
         */
		function setRequestParams() {
			var deferred = $q.defer();

			// If a user is logged in and their data exists
			if (authentication.isLoggedIn() && authentication.currentUser()) {
				var contact = authentication.currentUser().contact;
				console.log(contact);

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
         * @name sendMessage
         * @desc Attempts to send support request
         * @memberof Controllers.ContactTrainerController
         */
		function sendMessage(isValid) {
			var params = getRequestParams();

			// Validate form and params
			if (isValid && paramsValid(params)) {
				support.sendRequest(params)
					.then(sendMessageSuccess)
					.catch(sendMessageFail);
			// Set an error message
			} else {
				sendMessageFail('Form didn\'t pass validation');
			}

			/* Functions */

			function sendMessageSuccess(data) {
				// Reset contact form
				nullifyRequestParams();
				logger.info('Finished sending support request', data);
			}

			function sendMessageFail(error) {
				logger.error('Failed to send support request', error);
			}
		}

		/**
         * @name paramsValid
         * @desc Validates params for the support request
         * @memberof Controllers.ContactTrainerController
         */
		function paramsValid(params) {
			return params.firstname && params.lastname && params.email && params.subject && params.content;
		}

		/**
         * @name getRequestParams
         * @desc Gets params for the support request from the form
         * @memberof Controllers.ContactTrainerController
         */
		function getRequestParams() {
			return {
				to: 'timdavish@gmail.com',
				firstname: vm.firstname,
				lastname: vm.lastname,
				email: vm.email,
				phone: vm.phone,
				subject: 'TopTraining: A potential client, ' + vm.firstname + ' has contacted you!',
				content: vm.content
			};
		}

		/**
         * @name nullifyRequestParams
         * @desc Reset contact form
         * @memberof Controllers.ContactTrainerController
         */
		function nullifyRequestParams() {
			vm.phone = null;
			vm.content = null;
		}
    }
})();
