/**
 * Controller for search-list.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['searchService'];

    /**
     * @namespace SearchController
     * @desc Home controller
     * @memberof Controllers
     */
    function SearchController(searchService) {
        var vm = this;

        vm.trainers = [];
        vm.count = 0;
        vm.sport = "";
        vm.location = "";

        vm.viewProfile = viewProfile;

        activate();

        /* Functions */

        /**
         * @name activate
         * @desc Activates the controller
         * @memberof Controllers.SearchController
         */
        function activate() {
            vm.trainers = searchService.searchResults.trainers;
            vm.count = searchService.searchResults.count;
            vm.sport = searchService.sport;
            vm.location = searchService.location;
        }

        function viewProfile(trainer) {
            searchService.trainer = trainer;
        }
    }
})();
