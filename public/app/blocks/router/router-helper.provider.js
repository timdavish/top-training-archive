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

    /**
     * @namespace routerHelper
     * @desc routerHelper used by entire app
     * @memberof Providers
     */
    function routerHelper($stateProvider, $urlRouterProvider) {
        this.$get = RouterHelper;

        RouterHelper.$inject = ['$state'];

        /**
         * @namespace RouterHelper
         * @desc Router helper service
         * @memberof Providers.routerHelper
         */
        function RouterHelper($state) {
            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            /* Functions */

            /**
             * @namespace configureStates
             * @desc configure states for the given state(s)
             * @param {state} states The state(s) to configure
             * @memberof Providers.routerHelper.RouterHelper
             */
            function configureStates(states) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                $urlRouterProvider.otherwise('home');
            }

            /**
             * @namespace getStates
             * @desc returns all configured states
             * @memberof Providers.routerHelper.RouterHelper
             */
            function getStates() { return $state.get(); }
        }
    }
})();
