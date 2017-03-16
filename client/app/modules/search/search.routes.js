/**
 * Search routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.search')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /**
     * @namespace appRun
     * @desc Begins configuration for search routes
     * @memberof Configurations
     */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Search routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'search',
                config: {
                    url: '/search',
                    templateUrl: 'client/app/modules/search/search-list.ejs',
                    controller: 'SearchController',
                    controllerAs: 'vm',
                    title: 'Search',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
            {
                state: 'search/trainer',
                config: {
                    url: '/search/trainer/{id}',
                    templateUrl: 'client/app/modules/user/trainer-profile.ejs',
                    controller: 'TrainerSearchProfileController',
                    controllerAs: 'vm',
                    title: 'Trainer',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            }
        ];
    }
})();
