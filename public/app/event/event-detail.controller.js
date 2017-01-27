/**
 * Controller for eventdetail.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.event')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['userService', 'eventService', 'event'];

    /**
     * @namespace EventDetailController
     * @desc Event detail controller
     * @memberof Controllers
     */
    function EventDetailController(userService, eventService, event) {
        var vm = this;
        vm.isLoggedIn = userService.isLoggedIn;
        vm.userType = userService.getUserType;

        vm.event = event;
        vm.signUpEvent = signUpEvent;

        /* Functions */

        /**
         * @name signUpEvent
         * @desc Signs current user up for an event
         * @memberof Controllers.EventDetailController
         */
        function signUpEvent() {
            eventService.signUpEvent(vm.event).error(function(error) {
                vm.error = error;
            }).success(function(student) {
                vm.event.students.push(student);
                vm.event.slotsTaken++;
            });
        }
    }
})();
