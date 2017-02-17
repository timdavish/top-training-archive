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
            // Get User Info
            getUserPayload: getUserPayload,
            getUserId: getUserId,
            getUserType: getUserType,
            getEmail: getEmail,
            getClientInfo: getClientInfo,
            getTrainerInfo: getTrainerInfo
        };

        return service;

        /* Functions */

        /**
         * @namespace signUp
         * @desc Signs up a new user
         * @param {user} user The user info to sign up with
         * @memberof Services.userService
         */
        function signUp(user) {
            return $http.post('/users/signUp', user).success(function(data) {
                authService.saveToken(data.token);
            });
        }

        /**
         * @namespace logIn
         * @desc Logs in an existing user
         * @param {user} user The user to log in
         * @memberof Services.userService
         */
        function logIn(user) {
            return $http.post('/users/login', user).success(function(data) {
                authService.saveToken(data.token);
            });
        }

        /**
         * @namespace logOut
         * @desc Logs the current user out
         * @memberof Services.userService
         */
        function logOut() {
            authService.removeToken();
        }

        /**
         * @namespace isLoggedIn
         * @desc Checks if a user is logged in
         * @memberof Services.userService
         */
        function isLoggedIn() {
            var token = authService.getToken();

            if (token) {
                var payload = authService.getPayload(token);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        /**
         * @namespace getUserPayload
         * @desc Retrieve the session payload for the user
         * @return {payload} payload with user data
         * @memberof Services.userService
         */
        function getUserPayload() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload;
            }
        }

        /**
         * @namespace getUserId
         * @desc Retrieve the _id of the user that's logged in
         * @memberof Services.userService
         */
        function getUserId() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload._id;
            }
        }

        /**
         * @namespace getUserType
         * @desc Retrieve the usertype of the user that's logged in
         * @memberof Services.userService
         */
        function getUserType() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.usertype;
            }
        }

        /**
         * @namespace getEmail
         * @desc Retrieve the email of the user that's logged in
         * @memberof Services.userService
         */
        function getEmail() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.email;
            }
        }

        /**
         * @namespace getClientInfo
         * @desc Retrieve the clientInfo of the user that's logged in
         * @memberof Services.userService
         */
        function getClientInfo() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.clientInfo;
            }
        }

        /**
         * @namespace getTrainerInfo
         * @desc Retrieve the trainerInfo of the user that's logged in
         * @memberof Services.userService
         */
        function getTrainerInfo() {
            if (service.isLoggedIn()) {
                var token = authService.getToken();
                var payload = authService.getPayload(token);

                return payload.trainerInfo;
            }
        }
    }
})();
