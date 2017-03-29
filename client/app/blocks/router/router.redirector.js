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
		// Whether or not we are already planning to return from a login
		$rootScope.returning = false;

        // Listen to state changes
        $rootScope.$on('$stateChangeStart', stateChangeStartHandler);

		/* Functions */

        /**
         * @namespace stateChangeStartHandler
         * @desc Handles stateChangeStarts
         * @param {event} event The transition event currently happening
         * @param {object} toState The state we are changing to
         * @param {object} toParams The params of the state we are changing to
         * @param {object} fromState The state we are changing from
         * @param {object} fromParams The params of the state we are changing from
         * @memberof Router.redirector
         */
        function stateChangeStartHandler(event, toState, toParams, fromState, fromParams) {
            // If login required & you're logged out, redirect to login
            if (toState.requiresLoggedIn && !authentication.isLoggedIn()) {
                // If we want to redirect back to auth-required state after login
				if (toState.wantToReturn) {
					$rootScope.returning = true;
					// Save toState and its params
	                $rootScope.returnState = toState;
	                $rootScope.returnStateParams = toParams;
				}

				// Prevent any state change events before manually changing state to login
				event.preventDefault();
                $state.go('log-in');
				$rootScope.returning = false;
            }

			// If we aren't already returning somewhere and
			// If state is changing to login and we want to return to our fromState
			if (!$rootScope.returning && toState.name === 'log-in' && fromState.wantToReturn) {
				// Save toState and its params
                $rootScope.returnState = fromState;
                $rootScope.returnStateParams = fromParams;
			}
        }
    }
})();
