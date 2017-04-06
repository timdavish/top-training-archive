/**
 * Controller for home.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', '$window', 'authentication', 'searchService', 'location', 'logger'];

    /**
     * @namespace HomeController
     * @desc Home controller
     * @memberof Controllers
     */
    function HomeController($q, $window, authentication, searchService, location, logger) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn;
        vm.sports = ["Basketball", "Baseball", "Cross Training"];
        vm.params = {};
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

			console.log('trying browser location');
			location.getBrowserLocation()
                .then(reverseGeocodeLocation)
				.catch(function(error) {
					deferred.reject(error);
				});

			console.log('finished browser location');
			return deferred.promise;

			function reverseGeocodeLocation(loc) {
				var lat = loc.coords.latitude;
				var long = loc.coords.longitude;

				// Set search params (change this later)
				vm.params.lat = lat;
				vm.params.long = long;

				location.reverseGeocode(lat, long)
					.then(function(loc) {
						vm.params.location = loc;
						deferred.resolve(loc);
					});
			}
		}

        function tryClientLocation() {
			console.log('trying client location');
            // if (vm.isLoggedIn()) {
            //     vm.params.location = authentication.currentUser().clientInfo.zipcode;
            // }
        }

        /**
         * @name search
         * @desc Searches for trainers
         * @memberof Controllers.HomeController
         */
        function search() {
            // Ensure form is properly filled out
            if (!vm.params.sport || vm.params.sport === '' ||
                vm.sports.indexOf(vm.params.sport) === -1 ||
                !vm.params.lat || !vm.params.long) {

                // vm.error = 'Please fill the form out properly.'; // Display an error
                return;
            }

            searchService.searchTrainers(vm.params)
                .then(redirectToSearchResults)
                .catch(redirectToSearchResultsFailed);

            function redirectToSearchResults() {
                redirectTo('search');
            }

            function redirectToSearchResultsFailed(error) {
                vm.error = error;
                return $q.reject(error);
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
