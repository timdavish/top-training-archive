/**
 * location Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('location', location);

    location.$inject = ['$q', '$window'];

    /**
     * @namespace location
     * @desc Service factory for geolocation
     * @memberof Services
     */
    function location($q, $window) {
		var geocoder = null;
		var geocoderOptions = {
			componentRestrictions: {country: 'US'}
		};

        var service = {
            getBrowserLocation: getBrowserLocation,
			geocode: geocode,
			reverseGeocode: reverseGeocode
        };

        return service;

        /* Functions */

        /**
         * @namespace getCurrentLocation
         * @desc Attempts to get the user's location from their browser
         * @return {promise} Resolved/rejected promise with location object or error
         * @memberof Services.location
         */
        function getBrowserLocation() {
			var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
					getBrowserLocationSuccess, // Success
					getBrowserLocationFail // Fail
				);
            }

            return deferred.promise;

			/* Functions */

			function getBrowserLocationSuccess(position) {
				deferred.resolve(position);
			}

			function getBrowserLocationFail(error) {
				deferred.reject(error);
			}
        }

		/**
         * @namespace geocode
         * @desc Turns a lat/long into a formatted address
		 * @param {String} address The address to geocode
         * @return {promise} Resolved/rejected promise with lat/long or error
         * @memberof Services.location
         */
        function geocode(address) {
			var deferred = $q.defer();

			if (!geocoder) {
				geocoder = new google.maps.Geocoder();
			}

			geocoder.geocode({
				'address': address.toString(),
				componentRestrictions: {
					country: 'US'
				}
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
					var location = results[0].geometry.location;
					var coordinates = {
						lat: location.lat(),
						long: location.lng()
					};
					console.log(results);
					deferred.resolve(coordinates);
				} else {
					deferred.reject(status);
				}
			});

			return deferred.promise;
		}

		/**
         * @namespace reverseGeocode
         * @desc Turns a lat/long into a formatted address
		 * @param {double} lat Latitude of location to reverse geocode
		 * @param {double} long Longitude of location to reverse geocode
         * @return {promise} Resolved/rejected promise with formatted address or error
         * @memberof Services.location
         */
        function reverseGeocode(lat, long) {
			var deferred = $q.defer();

			if (!geocoder) {
				geocoder = new google.maps.Geocoder();
			}

			var latlng = new google.maps.LatLng(lat, long);

			geocoder.geocode({ 'latLng': latlng }, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK && results && results[1]) {
					deferred.resolve(results[1].formatted_address);
				} else {
					deferred.reject(status);
				}
			});

			return deferred.promise;
		}
    }
})();
