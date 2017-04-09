/**
 * Controller for login.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$rootScope', '$state', 'authentication'];

    /**
     * @namespace LogInController
     * @desc LogIn controller
     * @memberof Controllers
     */
    function LogInController($rootScope, $state, authentication) {
        var vm = this;

        vm.logIn = logIn;

        /* Functions */

        /**
         * @name logIn
         * @desc Attempts to log in a user
         * @memberof Controllers.LogInController
         */
        function logIn() {
            authentication.logIn(vm.user)
				.then(logInSuccess)
				.catch(logInFail);

			/* Functions */

			function logInSuccess() {
				// If we have return state
                if ($rootScope.returnState && $rootScope.returnStateParams) {
                    // Go to return state
                    $state.go($rootScope.returnState.name, $rootScope.returnStateParams);

                    // Reset return state and its params
                    $rootScope.returnToState = null;
                    $rootScope.returnToStateParams = null;
                // Otherwise just go home
                } else {
                    $state.go('home');
                }
			}

			function logInFail(error) {
				vm.error = error;
			}
        }
    }
})();
