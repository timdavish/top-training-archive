/**
 * Events Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .factory('events', events);

    events.$inject = ['$http', 'auth'];

    function events($http, auth) {
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
        function signUpEvent(userId, eventId) {
            return $http.put('/events/signUpEvent/' + eventId + '/' + userId, null, {
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            });
        }
    }
})();
