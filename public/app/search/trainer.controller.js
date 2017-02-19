/**
 * Controller for trainer.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('TrainerController', TrainerController);

    TrainerController.$inject = ['searchService'];

    /**
     * @namespace TrainerController
     * @desc Home controller
     * @memberof Controllers
     */
    function TrainerController(searchService) {
        var vm = this;

        vm.trainer = searchService.trainer;
        vm.sport = searchService.sport;

        console.log(vm.trainer);

        /* Functions */
    }
})();
