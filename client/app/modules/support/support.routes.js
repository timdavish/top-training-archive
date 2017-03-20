/**
 * Support routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.support')
        .run(configureStates);

    configureStates.$inject = ['routerHelper'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for layout routes
     * @memberof Configurations
     */
    function configureStates(routerHelper) {
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
                state: 'contact',
                config: {
                    url: '/support/contact',
                    templateUrl: 'client/app/modules/support/contact/contact-us.html',
                    controller: '',
                    controllerAs: 'vm',
                    title: 'Contact',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
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
