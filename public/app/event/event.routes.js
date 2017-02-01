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

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'events',
                config: {
                    url: '/events',
                    templateUrl: 'public/app/event/event-list.ejs',
                    controller: 'EventListController',
                    controllerAs: 'vm',
                    title: 'Events',
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
                    templateUrl: 'public/app/event/event-detail.ejs',
                    controller: 'EventDetailController',
                    controllerAs: 'vm',
                    title: 'Event',
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
