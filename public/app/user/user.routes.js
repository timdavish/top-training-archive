/**
 * User routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'log-in',
                config: {
                    url: '/log-in',
                    templateUrl: 'public/app/user/log-in.ejs',
                    controller: 'LogInController',
                    controllerAs: 'vm',
                    title: 'Log In',
                    onEnter: ['$state', 'userService', function($state, userService) {
                        if (userService.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            },
            {
                state: 'sign-up-client',
                config: {
                    url: '/sign-up-client',
                    templateUrl: 'public/app/user/sign-up-client.ejs',
                    controller: 'SignUpClientController',
                    controllerAs: 'vm',
                    title: 'Client Sign Up',
                    onEnter: ['$state', 'userService', function($state, userService) {
                        if (userService.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            },
            {
                state: 'sign-up-trainer',
                config: {
                    url: '/sign-up-trainer',
                    templateUrl: 'public/app/user/sign-up-trainer.ejs',
                    controller: 'SignUpTrainerController',
                    controllerAs: 'vm',
                    title: 'Trainer Sign Up',
                    onEnter: ['$state', 'userService', function($state, userService) {
                        if (userService.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            }
        ];
    }
})();
