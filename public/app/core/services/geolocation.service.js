/**
 * geolocationService Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('geolocationService', geolocationService);

    geolocationService.$inject = ['$q', '$window'];

    /**
     * @namespace geolocationService
     * @desc Service factory for geolocation
     * @memberof Services
     */
    function geolocationService($q, $window) {
        var service = {
            getCurrentLocation: getCurrentLocation
        };

        return service;

        /* Functions */

        /**
         * @namespace getCurrentLocation
         * @desc Attempts to get the user's location from their browser
         * @return {type} Google location object
         * @memberof Services.geolocationService
         */
        function getCurrentLocation() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        }
    }
})();
