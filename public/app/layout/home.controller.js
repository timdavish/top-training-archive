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
        vm.sports = ["Basketball", "Baseball", "Cross Training"];
        vm.params = {};
        vm.placesAutoComplete;

        vm.search = search;

        activate();

        /* Functions */

        /**
         * @name activate
         * @desc Activates the controller
         * @memberof Controllers.HomeController
         */
        function activate() {
            if (vm.isLoggedIn()) {
                vm.params.location = userService.getClientInfo().zipcode;
            }
        }

        /**
         * @name search
         * @desc Searches for trainers
         * @memberof Controllers.HomeController
         */
        function search() {
            // Ensure form is properly filled out
            if (!vm.params.sport || vm.params.sport === '' ||
                vm.sports.indexOf(vm.params.sport) === -1 ||
                !vm.params.location || vm.params.location === '') {

                // vm.error = 'Please fill the form out properly.'; // Display an error
                return;
            }

            searchService.searchTrainers(vm.params).error(function(error) {
                vm.error = error;
            }).success(function() {
                var host = $window.location.host;
                var landingUrl = "http://" + host + "/#/search";
                $window.location.href = landingUrl;
            });
        }
    }
})();
