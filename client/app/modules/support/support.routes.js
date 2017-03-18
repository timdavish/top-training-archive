/**
 * Support routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.support')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /**
     * @namespace appRun
     * @desc Begins configuration for layout routes
     * @memberof Configurations
     */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Support routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'faq',
                config: {
                    url: '/support/faq',
                    templateUrl: 'client/app/modules/support/faq/faq.html',
                    controller: 'FAQController',
                    controllerAs: 'vm',
                    title: 'FAQ',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            }
        ];
    }
})();
