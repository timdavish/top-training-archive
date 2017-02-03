/**
 * Controller for calendar.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.calendar')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['moment', 'calendarConfig', 'eventService'];

    /**
     * @namespace CalendarController
     * @desc Calendar controller
     * @memberof Controllers
     */
    function CalendarController(moment, calendarConfig, eventService) {
        var vm = this;

        vm.filter = {};
        vm.events = [];
        vm.eventsBySport = eventService.eventsBySport;

        // Calendar variables
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.cellIsOpen = false;

        vm.updateFilter = updateFilter;
        vm.filterEvents = filterEvents;
        vm.eventClicked = eventClicked;
        vm.eventEdited = eventEdited;
        vm.eventDeleted = eventDeleted;
        vm.timespanClicked = timespanClicked;

        activate();

        /* Functions */

        /**
         * @name activate
         * @desc Activates the controller
         * @memberof Controllers.CalendarController
         */
        function activate() {
            vm.filter = {
                personal: {
                    active: true,
                    count: 0
                },
                group: {
                    active: true,
                    count: 0
                },
                basketball: {
                    active: true,
                    count: 0
                },
                baseball: {
                    active: false,
                    count: 0
                },
                weights: {
                    active: false,
                    count: 0
                }
            };

            filterEvents();
        }

        /**
         * @name updateFilter
         * @desc Updates the filter
         * @memberof Controllers.CalendarController
         */
        function updateFilter(filterKey) {
            // Flip the filter
            vm.filter[filterKey]['active'] = !vm.filter[filterKey]['active'];

            // Flip the class
            if (vm.filter[filterKey]['active']) {
                vm.class = "filterActive";
            } else {
                vm.class = "filterInactive";
            }

            // Filter events
            filterEvents();
        }

        /**
         * @name filterEvents
         * @desc Filters the calendar events based on what filters are selected
         * @memberof Controllers.CalendarController
         */
        function filterEvents() {
            var eventsFiltered = [];

            if (vm.filter['personal']['active']) {
                vm.eventsBySport.personal.forEach(function(sport) {
                    if (vm.filter[sport._id] && vm.filter[sport._id]['active']) {
                        sport.events.forEach(function(event) {
                            eventsFiltered.push(event);
                        });
                    }
                });
            }
            if (vm.filter['group']['active']) {
                vm.eventsBySport.group.forEach(function(sport) {
                    if (vm.filter[sport._id] && vm.filter[sport._id]['active']) {
                        sport.events.forEach(function(event) {
                            eventsFiltered.push(event);
                        });
                    }
                });
            }

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
