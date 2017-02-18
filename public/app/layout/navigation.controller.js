/**
 * Controller for navigation.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['authentication'];

    /**
     * @namespace NavigationController
     * @desc Top nav bar controller
     * @memberof Controllers
     */
    function NavigationController(authentication) {
        var vm = this;

        vm.currentUser = authentication.currentUser;
        vm.isLoggedIn = authentication.isLoggedIn;
        vm.logOut = authentication.logOut;
    }
})();
