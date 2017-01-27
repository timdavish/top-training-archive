/**
 * Layout routes
 * @namespace Configurations
 */
(function() {
    'use strict';

    angular
        .module('main')
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
                    templateUrl: 'app/layout/home.ejs'
                }
            }
        ];
    }
})();
