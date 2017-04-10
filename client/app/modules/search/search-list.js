/**
 * Controller for search-list.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$q', '$stateParams', 'searchService', 'logger'];

    /**
     * @namespace SearchController
     * @desc Home controller
     * @memberof Controllers
     */
    function SearchController($q, $stateParams, searchService, logger) {
        var vm = this;

		vm.searchParams = {};
        vm.trainers = [];
        vm.count = 0;

        vm.viewProfile = viewProfile;

        activate();

        /* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.SearchController
         */
		 function activate() {
 			// Promises that need to be resolved to activate
 			var promises = [
				setSearchParams(),
				searchTrainers()
			];

 			return $q.all(promises)
 				.then(activateSuccess)
 				.catch(activateFail);

			/* Functions */

 			function activateSuccess() {
 				logger.success('Activated search-list view and ctrl');
 			}

 			function activateFail(error) {
 				logger.error('Failed to activate search-list view and ctrl', error);
 			}
 		}

        /**
         * @name setSearchParams
         * @desc Copies the search params sent over from home
         * @memberof Controllers.SearchController
         */
        function setSearchParams() {
			vm.searchParams.sport = $stateParams.sport;
			vm.searchParams.location = $stateParams.location;
			vm.searchParams.lat = $stateParams.lat;
			vm.searchParams.long = $stateParams.long;
        }

		/**
         * @name searchTrainers
         * @desc Searches for trainers
         * @memberof Controllers.SearchController
         */
		function searchTrainers() {
			return searchService.searchTrainers(vm.searchParams)
				.then(searchTrainersSuccess);

			/* Functions */

			function searchTrainersSuccess(data) {
				// Set search results from data
				var searchResults = data.data[0];

				if (searchResults) {
					vm.trainers = searchResults.trainers;
					vm.count = searchResults.count;
				}
			}
		}

        function viewProfile(trainer) {
            searchService.trainer = trainer;
        }
    }
})();
