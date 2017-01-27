/**
 * eventService Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('eventService', eventService);

    eventService.$inject = ['$http', 'authService', 'userService'];

    /**
     * @namespace eventService
     * @desc Service factory for events
     * @memberof Factories
     */
    function eventService($http, authService, userService) {
        var service = {
            events: [],
            addEvent: addEvent,
            getEvents: getEvents,
            getEvent: getEvent,
            signUpEvent: signUpEvent
        };

        return service;

        /* Functions */

        // Create a new event
        function addEvent(userId, event) {
            return $http.post('/events/addEvent/' + userId, event, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                service.events.push(data);
            });
        }

        // Get all events
        function getEvents() {
            return $http.get('/events/getEvents').success(function(data) {
                angular.copy(data, service.events);
            });
        }

        // Get a single event by id
        function getEvent(eventId) {
            return $http.get('/events/getEvent/' + eventId).then(function(res) {
                return res.data;
            });
        }

        // Sign a student up for an event
        function signUpEvent(event) {
            var userId = userService.getUserId();
            return $http.put('/events/signUpEvent/' + event._id + '/' + userId, null, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            });
        }
    }
})();
