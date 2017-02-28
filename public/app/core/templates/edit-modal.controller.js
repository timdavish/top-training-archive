/**
 * Controller for edit-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .controller('YesNoController', YesNoController);

    YesNoController.$inject = ['$scope', 'close'];

    /**
     * @namespace YesNoController
     * @desc YesNo controller
     * @memberof Controllers
     */
    function YesNoController($scope, close) {
        var vm = this;

        $scope.close = close;
        console.log('YesNoController activated.');

        // vm.close = close;

    }
})();
