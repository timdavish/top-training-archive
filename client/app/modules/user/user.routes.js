/**
 * User routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
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
     * @desc User routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'log-in',
                config: {
                    url: '/log-in',
                    templateUrl: 'client/app/modules/user/log-in.ejs',
                    controller: 'LogInController',
                    controllerAs: 'vm',
                    title: 'Log In',
                    wantToReturn: false, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    onEnter: ['$state', 'authentication', function($state, authentication) {
                        if (authentication.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            },
            {
                state: 'sign-up-client',
                config: {
                    url: '/sign-up-client',
                    templateUrl: 'client/app/modules/user/sign-up-client.ejs',
                    controller: 'SignUpClientController',
                    controllerAs: 'vm',
                    title: 'Client Sign Up',
                    wantToReturn: false, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    onEnter: ['$state', 'authentication', function($state, authentication) {
                        if (authentication.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            },
            {
                state: 'sign-up-trainer',
                config: {
                    url: '/sign-up-trainer',
                    templateUrl: 'client/app/modules/user/sign-up-trainer.ejs',
                    controller: 'SignUpTrainerController',
                    controllerAs: 'vm',
                    title: 'Trainer Sign Up',
                    wantToReturn: false, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    onEnter: ['$state', 'authentication', function($state, authentication) {
                        if (authentication.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            },
            {
                state: 'trainer-profile',
                config: {
                    url: '/profile/trainer',
                    templateUrl: 'client/app/modules/user/trainer-profile.ejs',
                    controller: 'TrainerProfileController',
                    controllerAs: 'vm',
                    title: 'Profile',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: true // Require login at this state
                    // onEnter: ['$state', 'authentication', function($state, authentication) {
                    //     if (!authentication.isLoggedIn()) {
                    //         $state.go('home');
                    //     }
                    // }]
                }
            }
        ];
    }
})();
