/**
 * eventService Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .factory('eventService', eventService);

    eventService.$inject = ['$http', 'auth'];

    /**
     * @namespace eventService
     * @desc Service factory for events
     * @memberof Factories
     */
    function eventService($http, auth) {
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
                headers: { Authorization: 'Bearer ' + auth.getToken() }
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
            var userId = auth.getUserId();
            // Disallow duplicate event sign ups
            for (var i = 0; i < event.students.length; i++) {
                var student = event.students[i];
                if (student._id === userId) {
                    return new Error('You are already signed up for this event.');
                }
            }

            return $http.put('/events/signUpEvent/' + event._id + '/' + userId, null, {
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            });
        }
    }
})();
