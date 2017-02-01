/**
 * Controller for calendar.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.calendar')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['calendarConfig', 'eventService'];

    /**
     * @namespace CalendarController
     * @desc Calendar controller
     * @memberof Controllers
     */
    function CalendarController(calendarConfig, eventService) {
        var vm = this;

        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.events = [];
        vm.eventsBySport = eventService.eventsBySport
        vm.filter = { // move this to a service?
            // Keep all filter keys lowercase
            basketball: false,
            baseball: false,
            asdf: false
        };
        vm.updateFilter = updateFilter;
        vm.filterEvents = filterEvents;
        vm.eventClicked = eventClicked;
        vm.eventEdited = eventEdited;
        vm.eventDeleted = eventDeleted;
        vm.cellIsOpen = true;
        vm.timespanClicked = timespanClicked;

        /* Functions */

        /**
         * @name updateFilter
         * @desc Updates the filter
         * @memberof Controllers.CalendarController
         */
        function updateFilter(field) {
            // Flip the filter
            vm.filter[field] = !vm.filter[field];

            // Refilter events
            filterEvents();
        }

        /**
         * @name filterEvents
         * @desc Filters the calendar events based on what filters are selected
         * @memberof Controllers.CalendarController
         */
        function filterEvents() {
            var eventsFiltered = [];
            vm.eventsBySport.forEach(function(sport) {
                if (vm.filter[sport._id] === true) {
                    sport.events.forEach(function(event) {
                        eventsFiltered.push(event);
                    });
                }
            });
            vm.events = eventsFiltered;
        }

        /**
         * @name eventClicked
         * @desc Handles a calendar event being clicked
         * @memberof Controllers.CalendarController
         */
        function eventClicked(event) {
            console.log('Clicked', event);
        }

        /**
         * @name eventEdited
         * @desc Handles a calendar event being edited
         * @memberof Controllers.CalendarController
         */
        function eventEdited(event) {
            console.log('Edited', event);
        }

        /**
         * @name eventDeleted
         * @desc Handles a calendar event being deleted
         * @memberof Controllers.CalendarController
         */
        function eventDeleted(event) {
            console.log('Deleted', event);
        }

        /**
         * @name timespanClicked
         * @desc Handles a calendar timespan being clicked
         * @memberof Controllers.CalendarController
         */
        function timespanClicked(date, cell) {
            if (vm.calendarView === 'month') {
                if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            } else if (vm.calendarView === 'year') {
                if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            }
        }

    }
})();
