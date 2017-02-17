/**
 * Controller for topnav.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('TopNavController', TopNavController);

    TopNavController.$inject = ['userService'];

    /**
     * @namespace TopNavController
     * @desc Top nav bar controller
     * @memberof Controllers
     */
    function TopNavController(userService) {
        var vm = this;

        vm.isLoggedIn;
        vm.logOut;
        vm.usertype = "";
        vm.firstname = "";

        activate();

        /* Functions */

        function activate() {
            vm.isLoggedIn = userService.isLoggedIn;
            vm.logOut = userService.logOut;

            if (vm.isLoggedIn()) {
                var payload = userService.getUserPayload();

                vm.userType = payload.usertype;
                vm.firstname = payload.contact.firstname;
            }
        }
    }
})();
