/**
 * Contact routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.contact')
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
     * @desc Contact routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'contact',
                config: {
                    url: '/support/contact',
                    templateUrl: 'client/app/modules/support/contact/contact.html',
                    controller: 'ContactController',
                    controllerAs: 'vm',
                    title: 'Contact',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            }
        ];
    }
})();
