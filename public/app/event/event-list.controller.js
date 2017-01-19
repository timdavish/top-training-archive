/**
 * Controller for events.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('EventListController', EventListController);

    EventListController.$inject = ['userService', 'eventService'];

    /**
     * @namespace EventListController
     * @desc Controller for the events list
     * @memberof Controllers
     */
    function EventListController(userService, eventService) {
        var vm = this;
        vm.isLoggedIn = userService.isLoggedIn;
        vm.userType = userService.getUserType;

        vm.events = eventService.events;
        vm.addEvent = addEvent;

        /* Functions */

        /**
         * @name addEvent
         * @desc Adds a new event
         * @memberof Controllers.EventListController
         */
        function addEvent() {
            // Ensure form is properly filled out
            if (!vm.title || vm.title === '' ||
                !vm.body || vm.body === '' ||
                !vm.slots || vm.slots === '') { return; }

            var userId = userService.getUserId();
            var event = {
                title: vm.title,
                body: vm.body,
                slots: vm.slots,
                trainer: userId
            };
            eventService.addEvent(userId, event).error(function(error) {
                vm.error = error;
            }).success(function() {
                // reset view model variables to be blank so that they aren't reloaded
                // back into the form again
                vm.title = '';
                vm.body = '';
                vm.slots = '';
            });
        };
    }
})();
