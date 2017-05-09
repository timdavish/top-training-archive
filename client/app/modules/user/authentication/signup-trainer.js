/**
 * Controller for signup-trainer.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('user.authentication')
        .controller('SignUpTrainerController', SignUpTrainerController);

    SignUpTrainerController.$inject = ['$state', 'authentication'];

    /**
     * @namespace SignUpTrainerController
     * @desc SignUpTrainer controller
     * @memberof Controllers
     */
    function SignUpTrainerController($state, authentication) {
        var vm = this;

		vm.continued = false;
		vm.sports = [
			"basketball",
			"baseball",
			"cross training"
		];
        vm.emailFormat = "/[^@]+@[^@]+/";

		vm.continueSignUp = continueSignUp;
        vm.finishSignUp = finishSignUp;

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
    }
})();
