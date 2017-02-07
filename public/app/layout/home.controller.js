/**
 * Controller for home.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['userService'];

    /**
     * @namespace HomeController
     * @desc Home controller
     * @memberof Controllers
     */
    function HomeController(userService) {
        var vm = this;

        vm.isLoggedIn = userService.isLoggedIn;
        // vm.getEmail = userService.getEmail;
        // vm.userType = userService.getUserType;
    }
})();
