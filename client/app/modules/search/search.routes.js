/**
 * Search routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.search')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for search routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
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
                    url: '/search?{sport}&{location}&{lat}&{long}',
                    templateUrl: 'client/app/modules/search/search-list.html',
                    controller: 'SearchController',
                    controllerAs: 'vm',
                    title: 'Search',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
            {
                state: 'search/trainers',
                config: {
                    url: '/search/trainers/{id}',
                    templateUrl: 'client/app/modules/user/profile/trainer-profile.html',
                    controller: 'TrainerProfileController',
                    controllerAs: 'vm',
                    title: 'Trainer',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
					search: true
                }
            }
        ];
    }
})();
