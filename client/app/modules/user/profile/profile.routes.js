/**
 * User.profile routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('user.profile')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for user routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc User.profile routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'trainer-profile',
                config: {
                    url: '/profile/trainer',
                    templateUrl: 'client/app/modules/user/profile/trainer-profile.html',
                    controller: 'TrainerProfileController',
                    controllerAs: 'vm',
                    title: 'Profile',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: true, // Require login at this state
					search: false,
					resolve: {
                        model: ['$state', 'authentication', 'user', function($state, authentication, user) {
                            var search = $state.current.search;
							if (search) {
								var id = $state.params.id;
								user.getById(id)
									.then(function(trainer) {
										return trainer;
									});
							} else {
								return authentication.currentUser();
							}
                        }]
                    }
                }
            }
        ];
    }
})();
