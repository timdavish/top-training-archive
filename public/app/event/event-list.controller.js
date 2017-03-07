/**
 * Controller for events.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.event')
        .controller('EventListController', EventListController);

    EventListController.$inject = ['authentication', 'eventService'];

    /**
     * @namespace EventListController
     * @desc Controller for the events list
     * @memberof Controllers
     */
    function EventListController(authentication, eventService) {
        var vm = this;

        vm.currentUser = authentication.currentUser;
        vm.isLoggedIn = authentication.isLoggedIn;
        vm.events = eventService.events;
        vm.datePickerOpen = false;

        vm.addEvent = addEvent;
        vm.toggleDatePicker = toggleDatePicker;

        /* Functions */

        /**
         * @name addEvent
         * @desc Adds a new event
         * @memberof Controllers.EventListController
         */
        function addEvent() {
            // Ensure form is properly filled out
            if (!vm.title || vm.title === '' ||
                !vm.sport || vm.sport === '' ||
                !vm.description || vm.description === '' ||
                !vm.slots || vm.slots === '' ||
                !vm.startsAt || !vm.endsAt) {

                vm.error = 'Please fill the form out properly.';
                return;
            }

            var event = {
                title: vm.title,
                sport: vm.sport,
                description: vm.description,
                slots: vm.slots,
                startsAt: moment(vm.date).format("ddd MMM D YYYY " + moment(vm.startsAt).format("HH:mm") + " [GMT]ZZ").toString(),
                endsAt: moment(vm.date).format("ddd MMM D YYYY " + moment(vm.endsAt).format("HH:mm") + " [GMT]ZZ").toString(),
                trainer: vm.currentUser().id
            };

            eventService.addEvent(event).error(function(error) {
                vm.error = error;
            }).success(function() {
                // reset view model variables to be blank so that they aren't reloaded
                // back into the form again
                vm.title = '';
                vm.sport = '';
                vm.description = '';
                vm.slots = '';
            });
        }

        /**
         * @name toggle
         * @desc Toggles mini-calendar
         * @memberof Controllers.EventListController
         */
        function toggleDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.datePickerOpen = !vm.datePickerOpen;
        }
    }
})();
