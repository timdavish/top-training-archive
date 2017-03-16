/**
 * Checkout routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.checkout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /**
     * @namespace appRun
     * @desc Begins configuration for user routes
     * @memberof Configurations
     */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc User routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'checkout',
                config: {
                    url: '/checkout/packages/{id}',
                    templateUrl: 'client/app/modules/checkout/checkout.ejs',
                    controller: 'CheckoutController',
                    controllerAs: 'vm',
                    title: 'Checkout',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: true // Require login at this state
                }
            }
        ];
    }
})();
