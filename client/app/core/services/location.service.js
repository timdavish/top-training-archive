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
		var componentRestrictions = { country: 'US' };

        var service = {
            getBrowserLocation: getBrowserLocation,
			geocode: geocode,
			reverseGeocode: reverseGeocode,
			parseAddressComponents: parseAddressComponents
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
         * @desc Turns an address into a lat/long
		 * @param {String} address The address to geocode
         * @return {promise} Resolved/rejected promise with lat/long or error
         * @memberof Services.location
         */
        function geocode(address) {
			var deferred = $q.defer();

			if (!geocoder) {
				geocoder = new google.maps.Geocoder();
			}

			address = address.toString();

			geocoder.geocode({
				'address': address,
				componentRestrictions: componentRestrictions
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
					var location = results[0].geometry.location;
					var coordinates = {
						lat: location.lat(),
						long: location.lng()
					};
					deferred.resolve(coordinates);
				} else {
					deferred.reject(status);
				}
			});

			return deferred.promise;
		}

		/**
         * @namespace reverseGeocode
         * @desc Turns a lat/long into addresses
		 * @param {double} lat Latitude of location to reverse geocode
		 * @param {double} long Longitude of location to reverse geocode
         * @return {promise} Resolved/rejected promise with geocode results or error
         * @memberof Services.location
         */
        function reverseGeocode(lat, long) {
			var deferred = $q.defer();

			if (!geocoder) {
				geocoder = new google.maps.Geocoder();
			}

			lat = 47.6992;
			long = -122.3334;

			var latlng = new google.maps.LatLng(lat, long);

			geocoder.geocode({
				'latLng': latlng
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK && results) {
					deferred.resolve(results);
				} else {
					deferred.reject(status);
				}
			});

			return deferred.promise;
		}

		/**
         * @namespace parseAddressComponents
         * @desc Turns a lat/long into a formatted address
		 * @param {Array} location The location to parse components from
         * @return {promise} Resolved/rejected promise with parsed_components or error
         * @memberof Services.location
         */
        function parseAddressComponents(location) {
			var deferred = $q.defer();
			if (location) {
				var address_components = location.address_components;
				var parsed_components = {};
				address_components.forEach(function(component) {
					component.types.forEach(function(type) {
						parsed_components[type] = component.short_name;
					});
				});
				deferred.resolve(parsed_components);
			} else {
				deferred.reject('No location was supplied');
			}

			return deferred.promise;
		}
    }
})();
