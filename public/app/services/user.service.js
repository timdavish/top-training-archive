/**
 * userService Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .factory('userService', userService);

    userService.$inject = ['$http', 'auth'];

    /**
     * @namespace userService
     * @desc Service factory for users
     * @memberof Factories
     */
    function userService($http, auth) {
        var service = {
            register: register,
            logIn: logIn,
            logOut: logOut,
            isLoggedIn: isLoggedIn,
            getUserId: getUserId,
            getUserName: getUserName,
            getUserNameById: getUserNameById,
            getUserType: getUserType
        };

        return service;

        /* Functions */

        // Register a new user
        function register(user) {
            return $http.post('/users/register', user).success(function(data) {
                auth.saveToken(data.token);
            });
        }

        // Log in an existing user
        function logIn(user) {
            return $http.post('/users/login', user).success(function(data) {
                auth.saveToken(data.token);
            });
        }

        // Log current user out
        function logOut() {
            auth.dropToken();
        }

        // Check if the user is logged in
        function isLoggedIn() {
            var token = auth.getToken();

            if (token) {
                var payload = auth.getPayload(token);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        // Retrieve the _id of the user that's logged in
        function getUserId() {
            if (service.isLoggedIn()) {
                var token = auth.getToken();
                var payload = auth.getPayload(token);

                return payload._id;
            }
        }

        // Retrieve the username of the user that's logged in
        function getUserName() {
            if (service.isLoggedIn()) {
                var token = auth.getToken();
                var payload = auth.getPayload(token);

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
                var token = auth.getToken();
                var payload = auth.getPayload(token);

                return payload.usertype;
            }
        }
    }
})();
