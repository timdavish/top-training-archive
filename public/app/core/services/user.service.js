/**
 * userService Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('userService', userService);

    userService.$inject = ['$http', 'authService'];

    /**
     * @namespace userService
     * @desc Service factory for users
     * @memberof Services
     */
    function userService($http, authService) {
        var service = {
            signUp: signUp,
            logIn: logIn,
            logOut: logOut,
            isLoggedIn: isLoggedIn,
            // User Info
            getUserId: getUserId,
            getUserType: getUserType,
            getEmail: getEmail,
            getClientInfo: getClientInfo,
            getTrainerInfo: getTrainerInfo
        };

        return service;

        /* Functions */

        // Sign up a new user
        function signUp(user) {
            return $http.post('/users/signUp', user).success(function(data) {
                authService.saveToken(data.token);
            });
        }

        // Log in an existing user
        function logIn(user) {
            return $http.post('/users/login', user).success(function(data) {
                authService.saveToken(data.token);
            });
        }

        // Log current user out
        function logOut() {
            authService.removeToken();
        }

        // Check if the user is logged in
        function isLoggedIn() {
            var token = authService.getToken();

            if (token) {
                var payload = authService.getPayload(token);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        // Retrieve the _id of the user that's logged in
        function getUserId() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload._id;
            }
        }

        // Retrieve the usertype of the user that's logged in
        function getUserType() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.usertype;
            }
        }

        // Retrieve the email of the user that's logged in
        function getEmail() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.email;
            }
        }

        // Retrieve the clientInfo of the user that's logged in
        function getClientInfo() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.clientInfo;
            }
        }

        // Retrieve the trainerInfo of the user that's logged in
        function getTrainerInfo() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.trainerInfo;
            }
        }

        // Retrieve the email of the user that's logged in
        function getEmailById(id) {
            return $http.get('/users/' + id).then(function(res) {
                return res.email;
            });
        }
    }
})();
