/**
 * Events controller
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('EventsCtrl', EventsCtrl);

    EventsCtrl.$inject = ['$scope', 'auth', 'events'];

    function EventsCtrl($scope, auth, events) {
        $scope.events = events.events;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.userType = auth.getUserType();

        $scope.addEvent = function() {
            // Ensure form is properly filled out
            if (!$scope.title || $scope.title === '' ||
                !$scope.body || $scope.body === '' ||
                !$scope.slots || $scope.slots === '') { return; }

            var userId = auth.getUserId();
            events.addEvent(userId, {
                title: $scope.title,
                body: $scope.body,
                slots: $scope.slots,
                trainer: userId
            });
            // reset scope variables to be blank so that they aren't reloaded
            // back into the form again
            $scope.title = '';
            $scope.body = '';
            $scope.slots = '';
        };
    }
})();
