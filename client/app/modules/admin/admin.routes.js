/**
 * Admin routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.admin')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for admin routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Search routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/admin/dashboard',
                    templateUrl: 'client/app/modules/admin/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'Admin Dashboard',
                    wantToReturn: false, // Return to this state after login
                    requiresLoggedIn: true, // Require login at this state
					resolve: {
						isAdmin: ['$state', 'authentication', function($state, authentication) {
							var currentUser = authentication.currentUser();
							// console.log(currentUser);
							if (currentUser.usertype !== 'Admin') {
								$state.go('home');
							}
						}],

					}
                }
            }
        ];
    }
})();
