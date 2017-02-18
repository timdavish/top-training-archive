/**
 * Controller for eventdetail.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.event')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['authentication', 'eventService', 'event'];

    /**
     * @namespace EventDetailController
     * @desc Event detail controller
     * @memberof Controllers
     */
    function EventDetailController(authentication, eventService, event) {
        var vm = this;

        vm.currentUser = authentication.currentUser();
        vm.isLoggedIn = authentication.isLoggedIn();
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
            }).success(function(client) {
                vm.event.clients.push(client);
                vm.event.slotsTaken++;
            });
        }
    }
})();
