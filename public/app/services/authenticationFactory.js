/**
 * Authentication Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .factory('auth', auth);

    auth.$inject = ['$http', '$window'];

    function auth($http, $window) {
        var service = {
            tokenName: 'top-training-token',
            register: register,
            logIn: logIn,
            logOut: logOut,
            getUserId: getUserId,
            getUserName: getUserName,
            getUserNameById: getUserNameById,
            getUserType: getUserType,
            isLoggedIn: isLoggedIn,
            saveToken: saveToken,
            getToken: getToken,
            getPayload: getPayload
        };

        return service;

        /* Functions */

        // Register a new user
        function register(user) {
            return $http.post('/users/register', user).success(function(data) {
                service.saveToken(data.token);
            });
        }

        // Log in an existing user
        function logIn(user) {
            return $http.post('/users/login', user).success(function(data) {
                service.saveToken(data.token);
            });
        }

        // Log out a user
        function logOut() {
            $window.localStorage.removeItem(service.tokenName);
        }

        // Retrieve the _id of the user that's logged in
        function getUserId() {
            if (service.isLoggedIn()) {
                var token = service.getToken();
                var payload = service.getPayload(token);

                return payload._id;
            }
        }

        // Retrieve the username of the user that's logged in
        function getUserName() {
            if (service.isLoggedIn()) {
                var token = service.getToken();
                var payload = service.getPayload(token);

                return payload.username;
            }
        }

        // Retrieve the username of the user that's logged in
        function getUserNameById(id) {
            return $http.get('/users/' + id).then(function(res) {
                return res.username;
            });
        }

        // Retrieve the usertype of the user that's logged in
        function getUserType() {
            if (service.isLoggedIn()) {
                var token = service.getToken();
                var payload = service.getPayload(token);

                return payload.usertype;
            }
        }

        // Check if the user is logged in
        function isLoggedIn() {
            var token = service.getToken();

            if (token) {
                var payload = service.getPayload(token);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        // Save the token into local storage
        function saveToken(token) {
            $window.localStorage[service.tokenName] = token;
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
