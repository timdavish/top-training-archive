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

        activate();

        /* Functions */

        // Activate
        function activate() {
            vm.trainers = searchService.trainers;
        }
    }
})();
