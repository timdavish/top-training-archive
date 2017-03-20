/**
 * Router Helper
 * @namespace Router
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('blocks.router')
        .provider('router', router);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];

    /**
     * @namespace router
     * @desc router used by entire app
     * @memberof Router
     */
    function router($stateProvider, $urlRouterProvider) {
        this.$get = routerHelper;

        routerHelper.$inject = ['$state'];

        /**
         * @namespace routerHelper
         * @desc Router helper service
         * @memberof Router.router
         */
        function routerHelper($state) {
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
             * @memberof Router.router.routerHelper
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
             * @memberof Router.router.routerHelper
             */
            function getStates() { return $state.get(); }
        }
    }
})();
