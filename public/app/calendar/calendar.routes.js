/**
 * Calendar routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.calendar')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /**
     * @namespace appRun
     * @desc Begins configuration for calendar routes
     * @memberof Configurations
     */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
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
                    templateUrl: 'public/app/calendar/calendar.ejs',
                    controller: 'CalendarController',
                    controllerAs: 'vm',
                    title: 'Calendar',
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
