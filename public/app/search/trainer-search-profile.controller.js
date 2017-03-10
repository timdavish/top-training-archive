/**
 * Controller for trainer-profile.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('TrainerSearchProfileController', TrainerSearchProfileController);

    TrainerSearchProfileController.$inject = ['searchService'];

    /**
     * @namespace TrainerSearchProfileController
     * @desc Trainer search profile controller
     * @memberof Controllers
     */
    function TrainerSearchProfileController(searchService) {
        var vm = this;

        vm.model = searchService.trainer;
        vm.sport = searchService.sport;
        vm.search = true; // Want to show back button
        vm.editable = false; // Don't want to show edit buttons

        // console.log(vm.model);
        // console.log(vm.sport);

        /* Functions */
    }
})();
