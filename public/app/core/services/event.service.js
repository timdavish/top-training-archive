/**
 * eventService Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('eventService', eventService);

    eventService.$inject = ['$http', 'moment', 'authentication'];

    /**
     * @namespace eventService
     * @desc Service factory for events
     * @memberof Services
     */
    function eventService($http, moment, authentication) {
        var service = {
            events: [],
            eventsBySport: [],
            addEvent: addEvent,
            getEvents: getEvents,
            getEventsBySport: getEventsBySport,
            getEvent: getEvent,
            signUpEvent: signUpEvent
        };

        return service;

        /* Functions */

        /**
         * @name addEvent
         * @desc Create a new event
         * @memberof Services.eventService
         * @param {number} userId The id of the trainer who created the event
         * @param {event} event The event data
         * @return Success status
         */
        function addEvent(event) {
            var userId = event.trainer;
            return $http.post('/events/addEvent/' + userId, event, {
                headers: { Authorization: 'Bearer ' + authentication.getToken() }
            }).success(function(data) {
                service.events.push(data);
            });
        }

        /**
         * @name getEvents
         * @desc Get all events regardless of archived status (unsorted)
         * @memberof Services.eventService
         * @return Success status
         */
        function getEvents() {
            return $http.get('/events/getEvents').success(function(events) {
                // Translate JSON'd dates back to moment dates for the calendar's sake
                translateDates(events);

                // Keep angular copy of data updated
                angular.copy(events, service.events);
            });
        }

        /**
         * @name getEventsBySport
         * @desc Get all events grouped and sorted by sport
         * @memberof Services.eventService
         * @return Success status
         */
        function getEventsBySport() {
            return $http.get('/events/getEventsBySport').success(function(data) {
                // Translate JSON'd dates back to moment dates for the calendar's sake
                data[0].personal.forEach(function(sport) {
                    translateDates(sport.events);
                });
                data[0].group.forEach(function(sport) {
                    translateDates(sport.events);
                });

                // Keep angular copy of data updated
                angular.copy(data[0], service.eventsBySport);
            });
        }

        /**
         * @name translateDates
         * @desc Translate JSON'd dates back to moment dates for the calendar's sake
         * @memberof Services.eventService
         * @param {events} events The events to translate dates for
         * @return Success status
         */
        function translateDates(events) {
            events.forEach(function(event) {
                event.startsAt = new Date(event.startsAt);
                event.endsAt = new Date(event.endsAt);
            });
        }

        /**
         * @name getEvent
         * @desc Get a single event by id
         * @memberof Services.eventService
         * @param {number} eventId The id of the event to get
         * @return Success status
         */
        function getEvent(eventId) {
            return $http.get('/events/getEvent/' + eventId).then(function(res) {
                // Translate JSON'd moment date into readable format
                res.data.startsAt = moment(res.data.startsAt).format('h:mm a, MMMM Do, YYYY');
                res.data.endsAt = moment(res.data.endsAt).format('h:mm a, MMMM Do, YYYY');
                return res.data;
            });
        }

        /**
         * @name signUpEvent
         * @desc Sign a student up for an event
         * @memberof Services.eventService
         * @param {event} event The event being signed up for
         * @return Success status
         */
        function signUpEvent(event) {
            var userId = authentication.currentUser()._id;
            return $http.put('/events/signUpEvent/' + event._id + '/' + userId, null, {
                headers: { Authorization: 'Bearer ' + authentication.getToken() }
            });
        }
    }
})();
