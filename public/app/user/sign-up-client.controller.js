/**
 * Controller for sign-up-client.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('SignUpClientController', SignUpClientController);

    SignUpClientController.$inject = ['$rootScope', '$state', 'authentication'];

    /**
     * @namespace SignUpClientController
     * @desc SignUpClient controller
     * @memberof Controllers
     */
    function SignUpClientController($rootScope, $state, authentication) {
        var vm = this;

        vm.emailFormat = "/[^@]+@[^@]+/";

        vm.signUpClient = signUpClient;

        /* Functions */

        /**
         * @name signUpClient
         * @desc Attempts to sign up a new client
         * @memberof Controllers.SignUpClientController
         */
        function signUpClient() {
            vm.user.usertype = "client";
            authentication.signUp(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                // If we have return state
                if ($rootScope.returnState && $rootScope.returnStateParams) {
                    // Go to return state
                    $state.go($rootScope.returnState.name, $rootScope.returnStateParams);

                    // Reset return state and its params
                    $rootScope.returnToState = null;
                    $rootScope.returnToStateParams = null
                // Otherwise just go home
                } else {
                    $state.go('home');
                }
            });
        }
    }
})();
