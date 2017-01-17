/**
 * Event controller
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('EventDetailCtrl', EventDetailCtrl);

    EventDetailCtrl.$inject = ['$scope', 'auth', 'events', 'event'];

    function EventDetailCtrl($scope, auth, events, event) {
        $scope.event = event;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.userType = auth.getUserType();

        $scope.signUp = function() {
            var userId = auth.getUserId();
            var eventId = event._id;

            // Disallow duplicate sign ups
            for (var i = 0; i < $scope.event.students.length; i++) {
                var student = $scope.event.students[i];
                if (student._id === userId) {
                    return;
                }
            }

            events.signUpEvent(userId, eventId).success(function(student) {
                $scope.event.students.push(student);
            });
        };
    }
})();
