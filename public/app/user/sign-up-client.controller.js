/**
 * Controller for sign-up-client.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('SignUpClientController', SignUpClientController);

    SignUpClientController.$inject = ['$state', 'authentication'];

    /**
     * @namespace SignUpClientController
     * @desc SignUpClient controller
     * @memberof Controllers
     */
    function SignUpClientController($state, authentication) {
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
                $state.go('home');
            });
        }
    }
})();
