/**
 * User.authentication routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('user.authentication')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for user.authentication routes
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
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'client/app/modules/user/authentication/login.html',
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
                state: 'signup-client',
                config: {
                    url: '/signup-client',
                    templateUrl: 'client/app/modules/user/authentication/signup-client.html',
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
                state: 'signup-trainer',
                config: {
                    url: '/signup-trainer',
                    templateUrl: 'client/app/modules/user/authentication/signup-trainer.html',
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
                state: 'forgot-password',
                config: {
                    url: '/forgot-password',
                    templateUrl: 'client/app/modules/user/authentication/forgot-password.html',
                    controller: 'ForgotPasswordController',
                    controllerAs: 'vm',
                    title: 'Forgot Password',
                    wantToReturn: false, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    onEnter: ['$state', 'authentication', function($state, authentication) {
                        if (authentication.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            }
        ];
    }
})();
