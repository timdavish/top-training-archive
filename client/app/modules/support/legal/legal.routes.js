/**
 * Legal routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.legal')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for layout routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Legal routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'privacy',
                config: {
                    url: '/support/privacy',
                    templateUrl: 'client/app/modules/support/legal/privacy.html',
                    controller: '',
                    controllerAs: 'vm',
                    title: 'Privacy',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
            {
                state: 'terms-of-service',
                config: {
                    url: '/support/terms-of-service',
                    templateUrl: 'client/app/modules/support/legal/terms-of-service.html',
                    controller: '',
                    controllerAs: 'vm',
                    title: 'Terms of Service',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            }
        ];
    }
})();
