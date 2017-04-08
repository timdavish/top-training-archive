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
         * @param {object} event The event data
		 * @return {Promise} Resolved/rejected promise
		 * @memberof Services.eventService
         */
        function addEvent(event) {
            var userId = event.trainer;
			var headers = {
                headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
            };

            return $http.post('/events/addEvent/' + userId, event, headers)
				.then(addEventSuccess);

			/* Functions */

			function addEventSuccess(data) {
				service.events.push(data);
			}
        }

        /**
         * @name getEvents
         * @desc Get all events regardless of archived status (unsorted)
		 * @return {Promise} Resolved/rejected promise with event data
		 * @memberof Services.eventService
         */
        function getEvents() {
            return $http.get('/events/getEvents')
				.then(getEventsSuccess);

			/* Functions */

			function getEventsSuccess(data) {
				// Translate JSON'd dates back to moment dates for the calendar's sake
                translateDates(data);

                // Keep angular copy of data updated
                angular.copy(data, service.events);
			}
        }

        /**
         * @name getEventsBySport
         * @desc Get all events grouped and sorted by sport
		 * @return {Promise} Resolved/rejected promise with event data
		 * @memberof Services.eventService
         */
        function getEventsBySport() {
            return $http.get('/events/getEventsBySport')
				.then(getEventsBySportSuccess);

			/* Functions */

			function getEventsBySportSuccess(data) {
				// Translate JSON'd dates back to moment dates for the calendar's sake
                data[0].personal.forEach(function(sport) {
                    translateDates(sport.events);
                });
                data[0].group.forEach(function(sport) {
                    translateDates(sport.events);
                });

                // Keep angular copy of data updated
                angular.copy(data[0], service.eventsBySport);
			}
        }

        /**
         * @name translateDates
         * @desc Helper function to translate JSON'd dates back to moment dates for the calendar
         * @param {events} events The events to translate dates for
		 * @memberof Services.eventService
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
         * @param {number} eventId The id of the event to get
		 * @return {Promise} Resolved/rejected promise with event data
		 * @memberof Services.eventService
         */
        function getEvent(eventId) {
            return $http.get('/events/getEvent/' + eventId)
				.then(getEventSuccess);

			/* Functions */

			function getEventSuccess(data) {
				// Translate JSON'd moment date into readable format
                data.data.startsAt = moment(data.data.startsAt).format('h:mm a, MMMM Do, YYYY');
                data.data.endsAt = moment(data.data.endsAt).format('h:mm a, MMMM Do, YYYY');
                return data.data;
			}
        }

        /**
         * @name signUpEvent
         * @desc Sign a student up for an event
         * @param {event} event The event being signed up for
		 * @return {Promise} Resolved/rejected promise with event data
		 * @memberof Services.eventService
         */
        function signUpEvent(event) {
            var userId = authentication.currentUser()._id;
			var headers = {
                headers: { Authorization: 'Bearer ' + authentication.getToken() }
            };
            return $http.put('/events/signUpEvent/' + event._id + '/' + userId, null, headers);
        }
    }
})();
