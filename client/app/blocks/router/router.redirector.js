/**
 * Router Helper
 * @namespace Router
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('blocks.router')
        .run(redirector);

    redirector.$inject = ['$rootScope', '$state', 'authentication'];

    /**
     * @namespace redirector
     * @desc Handles redirecting to/from login when login is required on a page
     * @memberof Router
     */
    function redirector($rootScope, $state, authentication) {
        // Listen to state changes
        $rootScope.$on('$stateChangeStart', stateChangeStartHandler);

        /**
         * @namespace stateChangeStartHandler
         * @desc Handles stateChangeStarts
         * @param {event} event The event happening by default
         * @param {object} toState The state we are changing to
         * @param {object} toParams The params of the state we are changing to
         * @param {object} fromState The state we are changing from
         * @param {object} fromParams The params of the state we are changing from
         * @memberof Router.redirector
         */
        function stateChangeStartHandler(event, toState, toParams, fromState, fromParams) {
            // If we want to store next state to return to
            if (toState.wantToReturn) {
                // Save toState and its params
                $rootScope.returnState = toState;
                $rootScope.returnStateParams = toParams;
            }

            // If login required & you're logged out, redirect to login
            if (toState.requiresLoggedIn && !authentication.isLoggedIn()) {
                event.preventDefault(); // Prevent any default events before changing state
                $state.go('log-in');
            }
        }
    }
})();
