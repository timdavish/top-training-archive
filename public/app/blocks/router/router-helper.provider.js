/**
 * Router Helper
 * @namespace Router
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelper)
        .run(routerRun);

    routerHelper.$inject = ['$stateProvider', '$urlRouterProvider'];
    routerRun.$inject = ['$rootScope', '$state', 'authentication'];

    /**
     * @namespace routerHelper
     * @desc routerHelper used by entire app
     * @memberof Router
     */
    function routerHelper($stateProvider, $urlRouterProvider) {
        this.$get = RouterHelper;

        RouterHelper.$inject = ['$state'];

        /**
         * @namespace RouterHelper
         * @desc Router helper service
         * @memberof Router.routerHelper
         */
        function RouterHelper($state) {
            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            /* Functions */

            /**
             * @namespace configureStates
             * @desc configure states for the given state(s)
             * @param {state} states The state(s) to configure
             * @memberof Router.routerHelper.RouterHelper
             */
            function configureStates(states) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                $urlRouterProvider.otherwise('home');
            }

            /**
             * @namespace getStates
             * @desc returns all configured states
             * @memberof Router.routerHelper.RouterHelper
             */
            function getStates() { return $state.get(); }
        }
    }

    /**
     * @namespace routerRun
     * @desc Handles redirecting to/from login when login is required on a page
     * @memberof Router
     */
    function routerRun($rootScope, $state, authentication) {
        // Listen to state changes
        $rootScope.$on('$stateChangeStart', function(event, nextState, nextParams) {
            // If login required & you're logged out, set postLogInRoute
            if (nextState.requiresLoggedIn && !authentication.isLoggedIn()) {
                // Save nextState and its params
                $rootScope.returnToState = nextState;
                $rootScope.returnToStateParams = nextParams;

                event.preventDefault(); // Prevent any default events before changing state
                $state.go('log-in');
            }
        });
    }
})();
