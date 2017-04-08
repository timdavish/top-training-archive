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
            searchResults: {},
            trainer: {},
            sport: "",
            location: "",

            searchTrainers: searchTrainers
        };

        return service;

        /* Functions */

        /**
         * @name searchTrainers
         * @desc Searches for trainers by sport and location
         * @param {Object} params The params to search with
		 * @return {promise} Resolved/rejected promise
		 * @memberof Services.searchService
         */
        function searchTrainers(params) {
            return $http.post('/users/getTrainers', params)
				.then(searchTrainersSuccess);

			/* Functions */

			function searchTrainersSuccess(data) {
				// Keep angular copy of data updated
				service.sport = params.sport.toLowerCase();
				service.location = params.location;
				angular.copy(data[0], service.searchResults);
			}
        }
    }
})();
