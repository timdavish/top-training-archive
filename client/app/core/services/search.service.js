/**
 * searchService Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('searchService', searchService);

    searchService.$inject = ['$http'];

    /**
     * @namespace searchService
     * @desc Service factory for searching
     * @memberof Services
     */
    function searchService($http) {
        var service = {
            trainer: {},

            searchTrainers: searchTrainers
        };

        return service;

        /* Functions */

        /**
         * @name searchTrainers
         * @desc Searches for trainers by sport and location
         * @param {Object} searchParams The searchParams to search with
		 * @return {promise} Resolved/rejected promise
		 * @memberof Services.searchService
         */
        function searchTrainers(searchParams) {
            return $http.post('/users/getTrainers', searchParams);
        }
    }
})();
