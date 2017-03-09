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
                    templateUrl: 'public/app/search/search-list.ejs',
                    controller: 'SearchController',
                    controllerAs: 'vm',
                    title: 'Search'
                }
            },
            {
                state: 'search/trainer',
                config: {
                    url: '/search/trainer/{id}',
                    // templateUrl: 'public/app/search/trainer.ejs',
                    templateUrl: 'public/app/user/trainer-profile.ejs',
                    controller: 'TrainerSearchProfileController',
                    controllerAs: 'vm',
                    title: 'Trainer'
                }
            }
        ];
    }
})();
