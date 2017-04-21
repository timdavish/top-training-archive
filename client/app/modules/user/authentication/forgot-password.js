/**
 * Controller for forgot-password.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('user.authentication')
        .controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['support', 'logger'];

    /**
     * @namespace ForgotPasswordController
     * @desc LogIn controller
     * @memberof Controllers
     */
    function ForgotPasswordController(support, logger) {
        var vm = this;

        vm.continueReset = continueReset;

        /* Functions */

        /**
         * @name continueReset
         * @desc Attempts to log in a user
         * @memberof Controllers.ForgotPasswordController
         */
        function continueReset(isValid) {
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
         * @memberof Controllers.ForgotPasswordController
         */
		function getRequestParams() {
			return {
				to: vm.email,
				firstname: '',
				lastname: '',
				email: vm.email,
				phone: '',
				subject: 'TopTraining Support: Reset password',
				content: 'Click here to continue resetting your password:'
			};
		}

		/**
         * @name nullifyRequestParams
         * @desc Reset contact form
         * @memberof Controllers.ForgotPasswordController
         */
		function nullifyRequestParams() {
			vm.email = null;
		}
    }
})();
