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

        vm.sport = "";
        vm.location = "";
        vm.trainers = [];

        activate();

        /* Functions */

        /**
         * @name activate
         * @desc Activates the controller
         * @memberof Controllers.SearchController
         */
        function activate() {
            vm.sport = searchService.sport;
            vm.location = searchService.location;
            vm.trainers = searchService.trainers;
        }
    }
})();
