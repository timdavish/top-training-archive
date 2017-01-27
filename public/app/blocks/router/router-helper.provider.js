/**
 * Router Helper Provider
 * @namespace Providers
 */
(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelper);

    routerHelper.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function routerHelper($locationProvider, $stateProvider, $urlRouterProvider) {
        this.$get = RouterHelper;

        $locationProvider.html5Mode(true);

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
                $urlRouterProvider.otherwise('home');
            }

            function getStates() { return $state.get(); }
        }
    }
})();
