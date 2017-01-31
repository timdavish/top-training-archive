/**
 * Router Helper Provider
 * @namespace Providers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode
    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelper);

    routerHelper.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerHelper($stateProvider, $urlRouterProvider) {
        this.$get = RouterHelper;

        RouterHelper.$inject = ['$state'];

        function RouterHelper($state) {
            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            /* Functions */

            function configureStates(states) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                // $urlRouterProvider.otherwise('home');
            }

            function getStates() { return $state.get(); }
        }
    }
})();
