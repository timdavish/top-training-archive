/**
 * Controller for events.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['auth', 'eventService'];

    /**
     * @namespace EventsController
     * @desc Controller for the events list
     * @memberof Controllers
     */
    function EventsController(auth, eventService) {
        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.userType = auth.getUserType;

        vm.events = eventService.events;
        vm.addEvent = addEvent;

        /* Functions */

        /**
         * @name addEvent
         * @desc Adds a new event
         * @memberof Controllers.EventsController
         */
        function addEvent() {
            // Ensure form is properly filled out
            if (!vm.title || vm.title === '' ||
                !vm.body || vm.body === '' ||
                !vm.slots || vm.slots === '') { return; }

            var userId = auth.getUserId();
            var event = {
                title: vm.title,
                body: vm.body,
                slots: $scope.slots,
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
