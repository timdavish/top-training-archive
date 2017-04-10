/**
 * Controller for home.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', '$state', '$window', 'authentication', 'location', 'logger'];

    /**
     * @namespace HomeController
     * @desc Home controller
     * @memberof Controllers
     */
    function HomeController($q, $state, $window, authentication, location, logger) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn;
		vm.currentUser = authentication.currentUser;
        vm.sports = ["Basketball", "Baseball", "Cross Training"];
        vm.searchParams = {};
		// Set our autocomplete options for this page
		vm.autocompleteOptions = {
			types: ['geocode'],
			componentRestrictions: {country: 'US'}
		};

        vm.search = search;
        vm.redirectTo = redirectTo;

        activate();

        /* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.HomeController
         */
		 function activate() {
 			// Promises that need to be resolved to activate
 			var promises = [
				setSearchLocation()
			];

 			return $q.all(promises)
 				.then(activateSuccess)
 				.catch(activateFail);

			/* Functions */

 			function activateSuccess() {
 				logger.success('Activated home view and ctrl');
 			}

 			function activateFail(error) {
 				logger.error('Failed to activate home view and ctrl', error);
 			}
 		}

        /**
         * @name setSearchLocation
         * @desc Attempts to set search location
         * @memberof Controllers.HomeController
         */
        function setSearchLocation() {
			var deferred = $q.defer();

			tryBrowserLocation()
				.catch(tryClientLocation);

			return deferred.promise;
        }

		function tryBrowserLocation() {
			var deferred = $q.defer();

			location.getBrowserLocation()
                .then(reverseGeocodeLocation)
				.catch(function(error) {
					deferred.reject(error);
				});

			return deferred.promise;

			function reverseGeocodeLocation(loc) {
				var lat = loc.coords.latitude;
				var long = loc.coords.longitude;

				location.reverseGeocode(lat, long)
					.then(function(loc) {
						vm.searchParams.location = loc;
						deferred.resolve(loc);
					});
			}
		}

        function tryClientLocation() {
            if (vm.isLoggedIn() && vm.currentUser().info.zipcode) {
                vm.searchParams.location = authentication.currentUser().info.zipcode;
            }
        }

        /**
         * @name search
         * @desc Searches for trainers
         * @memberof Controllers.HomeController
         */
        function search() {
            // Ensure form is properly filled out
            if (!vm.searchParams.sport || vm.searchParams.sport === '' ||
                vm.sports.indexOf(vm.searchParams.sport) === -1 ||
				!vm.searchParams.location || vm.searchParams.location === '') {

                // vm.error = 'Please fill the form out properly.'; // Display an error
                return;
            }

			// Geocode search location
			location.geocode(vm.searchParams.location)
				.then(geocodeSuccess)
				.then(searchContinue)
				.catch(searchFail);

            function geocodeSuccess(data) {
				// Define our lat/long
				vm.searchParams.lat = data.lat;
				vm.searchParams.long = data.long;
            }

			function searchContinue() {
				$state.go('search', vm.searchParams);
			}

            function searchFail(error) {
                vm.error = error;
            }
        }

        /**
         * @name redirectTo
         * @desc redirects the browser to the specified page
         * @memberof Controllers.HomeController
         */
        function redirectTo(page) {
            var host = $window.location.host;
            var landingUrl = "http://" + host + "/#/" + page;
            $window.location.href = landingUrl;
        }
    }
})();
