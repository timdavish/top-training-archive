/**
 * searchService Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('searchService', searchService);

    searchService.$inject = ['$http', 'authService'];

    /**
     * @namespace searchService
     * @desc Service factory for searching
     * @memberof Services
     */
    function searchService($http, authService) {
        var service = {
            sport: "",
            location: "",
            trainers: [],
            searchTrainers: searchTrainers
        };

        return service;

        /* Functions */

        /**
         * @name searchTrainers
         * @desc Searches for trainers by sport and location
         * @memberof Services.searchService
         * @param {Object} params The params to search with
         * @return Success status
         */
        function searchTrainers(params) {
            return $http.get('/users/getTrainers').success(function(trainers) {
                // Keep angular copy of data updated
                service.sport = params.sport;
                service.location = params.location;
                angular.copy(trainers, service.trainers);

            });
        }
    }
})();
