/**
 * Controller for home.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$window', 'searchService', 'userService'];

    /**
     * @namespace HomeController
     * @desc Home controller
     * @memberof Controllers
     */
    function HomeController($window, searchService, userService) {
        var vm = this;

        vm.isLoggedIn = userService.isLoggedIn;
        vm.params = {};

        vm.search = search;

        activate();

        /* Functions */

        /**
         * @name activate
         * @desc Activates the controller
         * @memberof Controllers.HomeController
         */
        function activate() {
            vm.params.zipcode = userService.getClientInfo().zipcode;
        }

        /**
         * @name search
         * @desc Searches for trainers
         * @memberof Controllers.HomeController
         */
        function search() {
            // Ensure form is properly filled out
            if (!vm.params.sport || vm.params.sport === '' ||
                !vm.params.zipcode || vm.params.zipcode === '') {

                // vm.error = 'Please fill the form out properly.';
                return;
            }

            searchService.searchTrainers(vm.params).error(function(error) {
                vm.error = error;
            }).success(function() {
                console.log("Trying to redirect!");
                var host = $window.location.host;
                var landingUrl = "http://" + host + "/#/search";
                console.log(landingUrl);
                $window.location.href = landingUrl;
            });
        }
    }
})();
