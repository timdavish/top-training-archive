/**
 * Controller for log-in.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$state', 'userService'];

    /**
     * @namespace LogInController
     * @desc LogIn controller
     * @memberof Controllers
     */
    function LogInController($state, userService) {
        var vm = this;

        vm.logIn = logIn;

        /* Functions */

        /**
         * @name logIn
         * @desc Attempts to log in a user
         * @memberof Controllers.LogInController
         */
        function logIn() {
            userService.logIn(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('home');
            });
        }
    }
})();
