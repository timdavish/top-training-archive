/**
 * Authentication Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$window'];

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

        // Save the token into local storage
        function saveToken(token) {
            $window.localStorage[service.tokenName] = token;
        }

        // Drop the token from local storage
        function removeToken() {
            $window.localStorage.removeItem(service.tokenName);
        }

        // Retrieve the token from local storage
        function getToken() {
            return $window.localStorage[service.tokenName];
        }

        // Retrieve the payload from the token
        function getPayload(token) {
            return JSON.parse($window.atob(token.split('.')[1]));
        }
    }
})();
