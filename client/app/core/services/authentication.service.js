/**
 * Authentication Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('authentication', authentication);

    authentication.$inject = ['$http', '$window'];

    /**
     * @namespace authentication
     * @desc Service factory for authentication
     * @memberof Services
     */
    function authentication($http, $window) {
        var service = {
            // Session Token
            tokenName: 'top-training-token',
            saveToken: saveToken,
            removeToken: removeToken,
            getToken: getToken,
            getPayload: getPayload,
            // User
            signUp: signUp,
            logIn: logIn,
            logOut: logOut,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };

        return service;

        /* Functions */

        /**
         * @namespace saveToken
         * @desc Saves the session token into local storage
         * @param {token} token The token representing the session
         * @memberof Services.authentication
         */
        function saveToken(token) {
            $window.localStorage[service.tokenName] = token;
        }

        /**
         * @namespace removeToken
         * @desc Removes the session token from local storage
         * @memberof Services.authentication
         */
        function removeToken() {
            $window.localStorage.removeItem(service.tokenName);
        }

        /**
         * @namespace getToken
         * @desc Retrieves the session token from local storage
         * @memberof Services.authentication
         */
        function getToken() {
            return $window.localStorage[service.tokenName];
        }

        /**
         * @namespace getPayload
         * @desc Retrieves the payload from the session token
         * @param {token} token The token to retrieve the payload from
		 * @return {object} Payload object
         * @memberof Services.authentication
         */
        function getPayload(token) {
            return JSON.parse($window.atob(token.split('.')[1]));
        }

        /**
         * @namespace signUp
         * @desc Signs up a new user
         * @param {user} user The user info to sign up with
		 * @return {Promise} Resolved/rejected promise with token data
         * @memberof Services.authentication
         */
        function signUp(user) {
            return $http.post('/users/signUp', user)
				.then(signUpSuccess);

			/* Functions */

			function signUpSuccess(data) {
				// Save user token
				service.saveToken(data.data.token);
			}
        }

        /**
         * @namespace logIn
         * @desc Logs in an existing user
         * @param {user} user The user to log in
		 * @return {Promise} Resolved/rejected promise with token data
         * @memberof Services.authentication
         */
        function logIn(user) {
            return $http.post('/users/login', user)
				.then(logInSuccess);

			/* Functions */

			function logInSuccess(data) {
				// Save user token
				service.saveToken(data.data.token);
			}
        }

        /**
         * @namespace logOut
         * @desc Logs the current user out
         * @memberof Services.authentication
         */
        function logOut() {
            service.removeToken();
        }

        /**
         * @namespace isLoggedIn
         * @desc Checks if a user is logged in
		 * @return {boolean} Returns true if user is logged in, else false
         * @memberof Services.authentication
         */
        function isLoggedIn() {
            var token = service.getToken();

            if (token) {
                var payload = service.getPayload(token);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        /**
         * @namespace currentUser
         * @desc Retrieve the logged in user's data from session token payload
         * @return {object} Object with all user data
         * @memberof Services.authentication
         */
        function currentUser() {
            if (service.isLoggedIn()) {
                var token = service.getToken();
                var payload = service.getPayload(token);
				var currentUser = {
					id: payload._id,
                    usertype: payload.usertype,
                    contact: payload.contact,
                    data: payload.data,
                    info: payload.usertype === 'client' ? payload.clientInfo : payload.trainerInfo
				};

                return currentUser;
            }
        }
    }
})();
