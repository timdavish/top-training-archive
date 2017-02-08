/**
 * Authentication Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$window'];

    /**
     * @namespace authService
     * @desc Service factory for authentication
     * @memberof Services
     */
    function authService($http, $window) {
        var service = {
            tokenName: 'top-training-token',
            saveToken: saveToken,
            removeToken: removeToken,
            getToken: getToken,
            getPayload: getPayload
        };

        return service;

        /* Functions */

        /**
         * @namespace saveToken
         * @desc Saves the session token into local storage
         * @memberof Services.authService
         */
        function saveToken() {
            $window.localStorage[service.tokenName] = token;
        }

        /**
         * @namespace removeToken
         * @desc Removes the session token from local storage
         * @memberof Services.authService
         */
        function removeToken() {
            $window.localStorage.removeItem(service.tokenName);
        }

        /**
         * @namespace getToken
         * @desc Retrieves the session token from local storage
         * @memberof Services.authService
         */
        function getToken() {
            return $window.localStorage[service.tokenName];
        }

        /**
         * @namespace getPayload
         * @desc Retrieves the payload from the session token
         * @param {token} token The token to retrieve the payload from
         * @memberof Services.authService
         */
        function getPayload(token) {
            return JSON.parse($window.atob(token.split('.')[1]));
        }
    }
})();
