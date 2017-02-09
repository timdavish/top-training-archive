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
        vm.zipcode = "";
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
            vm.zipcode = searchService.zipcode;
            vm.trainers = searchService.trainers;
        }
    }
})();
