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

        vm.emailFormat = "/[^@]+@[^@]+/";

        vm.signUpTrainer = signUpTrainer;

        /* Functions */

        /**
         * @name signUpTrainer
         * @desc Attempts to sign up a new trainer
         * @memberof Controllers.SignUpTrainerController
         */
        function signUpTrainer() {
            vm.user.usertype = "trainer";
			vm.user.sportData = {
				sport: 'basketball',
				locations: [
					{
						priority: 1,
						formatted_address: "E Yesler Way, Seattle, WA",
						geometry: {
							type: "Point",
							coordinates: [
								-122.3,
								47.62
							]
						}
					},
					{
						priority: 2,
						formatted_address: "Atlantic Ave, Seattle, WA",
						geometry: {
							type: "Point",
							coordinates: [
								-122.32,
								47.6
							]
						}
					}
				],
				packages: [
					{
						_id: 4,
						sessions: 1,
						slots: 1,
						price: 30
					},
					{
						_id: 5,
						sessions: 2,
						slots: 1,
						price: 50
					},
					{
						_id: 6,
						sessions: 5,
						slots: 1,
						price: 110
					}
				],
				events: [],
				profile: {
					rating: 0,
					summary: "A passionate coach with a true love for baseball. Specializing in hitting, fielding, fundamental drills, and mental focus.",
					credentials: {
						experience: 5,
						school: "University of Washington"
					},
					services: {
						ages: [
							"Middle School",
							"High School"
						],
						positions: [
							"Infield",
							"Outfield"
						],
						specialties: [
							"Fielding",
							"Hitting",
							"Base running"
						]
					}
				}
			};
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
