/**
 * Controller for eventdetail.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['auth', 'eventService', 'event'];

    /**
     * @namespace EventDetailController
     * @desc Event detail controller
     * @memberof Controllers
     */
    function EventDetailController(auth, eventService, event) {
        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.userType = auth.getUserType;

        vm.event = event;
        vm.signUpEvent = signUpEvent;

        /* Functions */

        /**
         * @name signUpEvent
         * @desc Signs current user up for an event
         * @memberof Controllers.EventDetailController
         */
        function signUpEvent() {
            eventService.signUpEvent(event).error(function(error) {
                vm.error = error;
            }).success(function(student) {
                vm.event.students.push(student);
                vm.event.slotsTaken++;
            });
        };
    }
})();
