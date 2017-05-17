/**
 * Controller for signup-trainer.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('user.authentication')
        .controller('SignUpTrainerController', SignUpTrainerController);

    SignUpTrainerController.$inject = ['$state', 'authentication', 'location'];

    /**
     * @namespace SignUpTrainerController
     * @desc SignUpTrainer controller
     * @memberof Controllers
     */
    function SignUpTrainerController($state, authentication, location) {
        var vm = this;

		vm.continued = false;
		vm.sports = [
			"basketball",
			"baseball",
			"cross training"
		];
		vm.packageOptions = {
			lengths: ['30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90'],
			rates: ['10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
		};

		vm.session = {
			private: {
				length: '60',
				rate: '50'
			},
			small: {
				length: '60',
				rate: '30'
			},
			large: {
				length: '60',
				rate: '25'
			}
		};

        vm.locations = [];
        vm.emailFormat = "/[^@]+@[^@]+/";

		vm.continueSignUp = continueSignUp;
        vm.finishSignUp = finishSignUp;
		vm.addLocation = addLocation;
		vm.removeLocation = removeLocation;

        /* Functions */

		/**
         * @name continueSignUp
         * @desc Continues to the next part of sign up
         * @memberof Controllers.SignUpTrainerController
         */
		 function continueSignUp() {
			 // Switch to next form
			 vm.continued = true;

			 // Add user data
			 vm.user.usertype = "trainer";
		 }

        /**
         * @name finishSignUp
         * @desc Attempts to sign up a new trainer
         * @memberof Controllers.SignUpTrainerController
         */
        function finishSignUp() {
			// Convert services into arrays
			if (vm.user && vm.user.sportData.profile.services) {
				var services = vm.user.sportData.profile.services;
				services.ages = services.ages.split(',');
				services.positions = services.positions.split(',');
				services.specialties = services.specialties.split(',');
			}

			// Create packages from session input
			if (vm.session) {
				var packages = [];
				for (var type in vm.session) {
					var counts = [1, 2, 5, 10];
					for (var i = 0; i < counts.length; i++) {
						var next = {
							type: type,
							sessions: counts[i],
							price: vm.session[type].rate * counts[i]
						};
						packages.push(next);
					}
				}
				vm.user.sportData.packages = packages;
			}

			vm.user.sportData.locations = vm.locations;

			console.log(vm.user);

            authentication.signUp(vm.user)
				.then(signUpTrainerSuccess)
				.catch(signUpTrainerFail);

			/* Functions */

			function signUpTrainerSuccess() {
				$state.go('home');
			}

			function signUpTrainerFail(error) {
				vm.error = error;
			}
        }

		function addLocation() {
			if (vm.newLocation) {
				location.geocode(vm.newLocation)
					.then(geocodeSuccess);
			}

			function geocodeSuccess(data) {
				var newLocation = {
					priority: vm.locations.length + 1,
					formatted_address: vm.newLocation,
					geometry: {
						type: "Point",
						coordinates: [data.long, data.lat]
					}
				};

				vm.locations.push(newLocation);

				// Null out the field
				vm.newLocation = null;
			}
		}

		function removeLocation(priority) {
			// Remove the location
			vm.locations.splice(priority - 1, 1);

			// Reset priorities
			vm.locations.forEach(function(location, index) {
				location.priority = index + 1;
			});
		}
    }
})();
