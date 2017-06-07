/**
 * Controller for client-profile.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('user.profile')
        .controller('ClientProfileController', ClientProfileController);

    ClientProfileController.$inject = ['$q', '$state', 'authentication', 'user', 'model', 'searchService', 'location', 'modal', 'moment', 'logger'];

    /**
     * @namespace ClientProfileController
     * @desc Client profile controller
     * @memberof Controllers
     */
    function ClientProfileController($q, $state, authentication, user, model, searchService, location, modal, moment, logger) {
        var vm = this;

        activate();

        /* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.ClientProfileController
         */
		function activate() {
			// Promises that need to be resolved to activate
			var promises = [];

			return $q.all(promises)
				.then(activateSuccess)
				.catch(activateFail);

			/* Functions */

			function activateSuccess() {
				logger.success('Activated client profile view and ctrl');
			}

			function activateFail(error) {
				logger.error('Failed to activate client profile view and ctrl', error);
			}
		}
    }
})();
