/**
 * Controller for register.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$state', 'userService'];

    /**
     * @namespace RegisterController
     * @desc Register controller
     * @memberof Controllers
     */
    function RegisterController($state, userService) {
        var vm = this;
        vm.register = register;

        /* Functions */

        /**
         * @name register
         * @desc Attempts to register a new user
         * @memberof Controllers.RegisterController
         */
        function register() {
            userService.register(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('home');
            });
        }
    }
})();
