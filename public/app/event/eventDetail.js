/**
 * Event controller
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('EventCtrl', EventCtrl);

    EventCtrl.$inject = ['$scope', 'auth', 'event'];

    function EventCtrl($scope, auth, event) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.event = event;
    }
})();
