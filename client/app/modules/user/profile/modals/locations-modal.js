/**
 * Controller for locations-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('LocationsModalController', LocationsModalController);

    LocationsModalController.$inject = ['$element', 'close', 'title', 'locations', 'location'];

    /**
     * @namespace LocationsModalController
     * @desc Credentials Edit Modal Controller
     * @memberof Controllers
     */
    function LocationsModalController($element, close, title, locations, location) {
        var vm = this;

        vm.title = title;
		vm.tempLocations = angular.copy(locations);

        vm.save = save;
        vm.cancel = cancel;
		vm.addLocation = addLocation;

        /* Functions */

        function save() {
            close({
                status: {
                    save: true
                },
                locations: vm.tempLocations
            }, 0);
        }

        function cancel() {
            close({
                status: {
                    save: false
                }
            }, 0);
        }

		function addLocation() {
			if (vm.newLocation) {
				location.geocode(vm.newLocation)
					.then(geocodeSuccess);
			}

			function geocodeSuccess(data) {
				var newLocation = {
					priority: vm.tempLocations.length + 1,
					formatted_address: vm.newLocation,
					geometry: {
						type: "Point",
						coordinates: [data.long, data.lat]
					}
				};

				vm.tempLocations.push(newLocation);

				// Null out the field
				vm.newLocation = null;
			}
		}
    }
})();
