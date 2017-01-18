/**
 * Controller for login.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$state', 'auth'];

    /**
     * @namespace LogInController
     * @desc LogIn controller
     * @memberof Controllers
     */
    function LogInController($state, auth) {
        var vm = this;
        vm.logIn = logIn;

        /* Functions */

        /**
         * @name logIn
         * @desc Attempts to log in a user
         * @memberof Controllers.LogInController
         */
        function logIn() {
            auth.logIn(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('home');
            });
        }
    }
})();
