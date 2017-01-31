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
        vm.events = eventService.events;
        vm.cellIsOpen = true;
        vm.eventClicked = eventClicked;
        vm.eventEdited = eventEdited;
        vm.eventDeleted = eventDeleted;
        vm.timespanClicked = timespanClicked;

        /* Functions */

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
