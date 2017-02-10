/**
 * Controller for home.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$window', 'searchService', 'userService'];

    /**
     * @namespace HomeController
     * @desc Home controller
     * @memberof Controllers
     */
    function HomeController($http, $window, searchService, userService) {
        var vm = this;

        vm.isLoggedIn = userService.isLoggedIn;
        vm.sports = ["Basketball", "Baseball", "Cross Training"];
        vm.params = {};
        vm.getLocations = getLocations;
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
         * @name getLocation
         * @desc Gets all locations containing input value
         * @param {String} input The value to search addresses with
         * @memberof Controllers.HomeController
         */
        function getLocations(input) {
            // TODO: put this into a service
            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: input,
                    components: 'country:US|administrative_area:WA'
                    // , key: 'API_KEY'
                }
            }).then(function(response) {
                return response.data.results.map(function(result) {
                    return result.formatted_address;
                });
            });
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
