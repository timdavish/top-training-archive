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

    function TopNavController(userService) {
        var vm = this;
        vm.isLoggedIn = userService.isLoggedIn;
        vm.getEmail = userService.getEmail;
        vm.userType = userService.getUserType;
        vm.logOut = userService.logOut;
    }
})();
