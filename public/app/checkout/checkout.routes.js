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
                    templateUrl: 'public/app/checkout/checkout.ejs',
                    controller: 'CheckoutController',
                    controllerAs: 'vm',
                    title: 'Checkout',
                    onEnter: ['$state', '$stateParams', 'authentication', function($state, $stateParams, authentication) {
                        if (!authentication.isLoggedIn()) {
                            $state.go('checkout/login/', { package: $stateParams.id });
                        } else if (authentication.currentUser().usertype === 'trainer') {
                            $state.go('home');
                        }
                    }]
                }
            },
            {
                state: 'checkout/login/',
                config: {
                    url: '/checkout/login/packages/{package}',
                    templateUrl: 'public/app/user/log-in.ejs',
                    controller: 'LogInController',
                    controllerAs: 'vm',
                    title: 'Login before Checkout',
                    onEnter: ['$state', '$stateParams', 'authentication', function($state, $stateParams, authentication) {
                        if (authentication.isLoggedIn()) {
                            $state.go('checkout', { id: $stateParams.package });
                        }
                    }]
                }
            }
        ];
    }
})();
