/**
 * Controller for log-in.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('LogInController', LogInController);

    LogInController.$inject = ['$state', '$stateParams', 'authentication'];

    /**
     * @namespace LogInController
     * @desc LogIn controller
     * @memberof Controllers
     */
    function LogInController($state, $stateParams, authentication) {
        var vm = this;

        vm.logIn = logIn;

        /* Functions */

        /**
         * @name logIn
         * @desc Attempts to log in a user
         * @memberof Controllers.LogInController
         */
        function logIn() {
            authentication.logIn(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                if ($stateParams.package) {
                    $state.go('checkout', { id: $stateParams.package });
                } else {
                    $state.go('home');
                }
            });
        }
    }
})();
