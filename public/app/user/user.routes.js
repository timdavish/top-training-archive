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
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/user/login.ejs',
                    controller: 'LogInController',
                    controllerAs: 'vm',
                    title: 'Login',
                    onEnter: ['$state', 'userService', function($state, userService) {
                        if (userService.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                }
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: 'app/user/register.ejs',
                    controller: 'RegisterController',
                    controllerAs: 'vm',
                    title: 'Register',
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
