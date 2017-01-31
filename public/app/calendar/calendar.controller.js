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

    function CalendarController(calendarConfig, eventService) {
        var vm = this;

        // These variables MUST be set as a minimum for the calendar to work
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.events = eventService.events;

        // [
        //     {
        //         title: 'An event',
        //         color: calendarConfig.colorTypes.warning,
        //         startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        //         endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate()
        //     }, {
        //         title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        //         // color: calendarConfig.colorTypes.info,
        //         startsAt: moment().subtract(1, 'day').toDate(),
        //         endsAt: moment().add(5, 'days').toDate()
        //     }, {
        //         title: 'This is a really long event title that occurs on every year',
        //         color: calendarConfig.colorTypes.important,
        //         startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        //         endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        //         recursOn: 'year'
        //     }
        // ];
        vm.cellIsOpen = true;
        vm.eventClicked = eventClicked;
        vm.eventEdited = eventEdited;
        vm.eventDeleted = eventDeleted;
        vm.timespanClicked = timespanClicked;


        /* Functions */

        function eventClicked(event) {
            console.log('Clicked', event);
        }

        function eventEdited(event) {
            console.log('Edited', event);
        }

        function eventDeleted(event) {
            console.log('Deleted', event);
        }

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
