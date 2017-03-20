/**
 * Calendar routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.calendar')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for calendar routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Calendar routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'calendar',
                config: {
                    url: '/calendar',
                    templateUrl: 'client/app/modules/calendar/calendar.ejs',
                    controller: 'CalendarController',
                    controllerAs: 'vm',
                    title: 'Calendar',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    resolve: {
                        eventPromise: ['eventService', function(eventService) {
                            return eventService.getEventsBySport();
                        }]
                    }
                }
            }
        ];
    }
})();
