/**
 * Layout routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), 'home');
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/home',
                    templateUrl: 'public/app/layout/home.ejs',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    title: 'Home'
                }
            }
        ];
    }
})();
