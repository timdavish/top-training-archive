/**
 * Event routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.event')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /**
     * @namespace appRun
     * @desc Begins configuration for event routes
     * @memberof Configurations
     */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Event routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'events',
                config: {
                    url: '/events',
                    templateUrl: 'client/app/modules/event/event-list.ejs',
                    controller: 'EventListController',
                    controllerAs: 'vm',
                    title: 'Events',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    resolve: {
                        eventPromise: ['eventService', function(eventService) {
                            return eventService.getEvents();
                        }]
                    }
                }
            },
            {
                state: 'event',
                config: {
                    url: '/events/{id}',
                    templateUrl: 'client/app/modules/event/event-detail.ejs',
                    controller: 'EventDetailController',
                    controllerAs: 'vm',
                    title: 'Event',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    resolve: {
                        event: ['$stateParams', 'eventService', function($stateParams, eventService) {
                            return eventService.getEvent($stateParams.id);
                        }]
                    }
                }
            }
        ];
    }
})();
