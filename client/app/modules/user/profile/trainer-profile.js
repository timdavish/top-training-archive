/**
 * Controller for trainer-profile.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('user.profile')
        .controller('TrainerProfileController', TrainerProfileController);

    TrainerProfileController.$inject = ['$q', '$state', 'authentication', 'user', 'model', 'searchService', 'location', 'modal', 'moment', 'logger'];

    /**
     * @namespace TrainerProfileController
     * @desc Trainer profile controller
     * @memberof Controllers
     */
    function TrainerProfileController($q, $state, authentication, user, model, searchService, location, modal, moment, logger) {
        var vm = this;

		// Search determines whether this profile is viewed from search or not
		// True = get trainer model from api
		// True = show back button, don't show edit buttons
		// False = get trainer model from authentication
		// False = don't show back button, show edit buttons
		vm.search = $state.current.search;
        vm.model = {};
		vm.sport = ''; // For option select
		vm.sportBack = ''; // For back button
        vm.panes = {}; // For edit modals

        vm.openModal = openModal;

        activate();

        /* Functions */

		/**
         * @name activate
         * @desc Activates the view and controller
         * @memberof Controllers.TrainerProfileController
         */
		function activate() {
			// Promises that need to be resolved to activate
			var promises = [
				setModel(),
				setSport(),
				setProfilePanes()
			];

			return $q.all(promises)
				.then(activateSuccess)
				.catch(activateFail);

			/* Functions */

			function activateSuccess() {
				logger.success('Activated trainer profile view and ctrl');
			}

			function activateFail(error) {
				logger.error('Failed to activate trainer profile view and ctrl', error);
			}
		}

		/**
         * @name setModel
         * @desc Sets the profile model
         * @memberof Controllers.TrainerProfileController
         */
        function setModel() {
			vm.model = model;

			// Translate review dates
			if (vm.model.rating) {
				vm.model.rating.reviews.forEach(function(review) {
					review.date_formatted = moment(review.date).format('MMMM Do, YYYY');
				});
			}
		}

		/**
         * @name setSport
         * @desc Sets the profile sport
         * @memberof Controllers.TrainerProfileController
         */
        function setSport() {
			vm.sport = searchService.sport || vm.model.sports[0].sport;
			vm.sportBack = vm.sport;
		}


		/**
         * @name setProfilePanes
         * @desc Sets the panes for profile editing
         * @memberof Controllers.TrainerProfileController
         */
        function setProfilePanes() {
			var deferred = $q.defer();

			if (!vm.search) {
	            // Set profile panes
	            vm.panes = {
	                summary: 'summary',
	                locations: 'locations',
	                packages: 'packages',
	                credentials: 'credentials',
	                services: 'services'
	            };
			}

			// No matter what, this promise is resolved
			deferred.resolve();

			return deferred.promise;
        }

		/**
         * @name openModal
         * @desc Opens an edit modal for the given pane, supplied with the given data
		 * @param {String} pane The pane to open an edit modal for
		 * @param {Object} data The data related to the pane
         * @memberof Controllers.TrainerProfileController
         */
        function openModal(pane, data) {
            var templateUrl;
            var controller;
            var inputs;
            var error;

			if (pane) {
				if (pane === vm.panes.summary) {
	                templateUrl = 'client/app/modules/user/profile/modals/summary-modal.html';
	                controller = 'SummaryModalController';
	                inputs = {
	                    summary: data.summary
	                };
	            } else if (pane === vm.panes.locations) {
                    templateUrl = 'client/app/modules/user/profile/modals/locations-modal.html';
                    controller = 'LocationsModalController';
					inputs = {
						locations: data.locations
					};
	            } else if (pane === vm.panes.packages) {
					templateUrl = 'client/app/modules/user/profile/modals/packages-modal.html';
					controller = 'PackagesModalController';
					inputs = {
						packages: data.packages
					};
	            } else if (pane === vm.panes.credentials) {
	                templateUrl = 'client/app/modules/user/profile/modals/credentials-modal.html';
	                controller = 'CredentialsModalController';
	                inputs = {
	                    credentials: data.credentials
	                };
	            } else if (pane === vm.panes.services) {
	                templateUrl = 'client/app/modules/user/profile/modals/services-modal.html';
	                controller = 'ServicesModalController';
	                inputs = {
	                    ages: data.services.ages,
	                    positions: data.services.positions,
	                    specialties: data.services.specialties
	                };
	            }

				inputs.title = pane;
			}

            // Make sure everything is set
            if (templateUrl && controller && inputs) {
				var modalOptions = {
					templateUrl: templateUrl,
                    controller: controller,
                    controllerAs: 'vm',
                    inputs: inputs,
					bodyClass: 'modal-open'
				};

                modal.showModal(modalOptions)
					.then(showModalSuccess)
					.catch(showModalFail);
            } else if (error) {
                console.log(error);
            }

			/* Functions */

			function showModalSuccess(modal) {
				closeModalHandler(modal, pane, data);
			}

			function showModalFail(error) {
				logger.error(error);
			}
        }

		/**
         * @name closeModalHandler
         * @desc Handles closing the given modal
		 * @param {modal} modal The modal to handle
		 * @param {String} pane The pane this modal is handling
		 * @param {Object} data The data the pane is handling
         * @memberof Controllers.TrainerProfileController
         */
		function closeModalHandler(modal, pane, data) {
			modal.close.then(function(result) {
				if (result.status.save) {

					data[pane] = result[pane];

					user.update(vm.model)
						.then(function(result) {
							// Save user's token with new data
							authentication.saveToken(result.token);
						})
						.catch(function(error) {
							console.log('Error updating user', error);
						});


				}
			})
			.catch(function(error) {
				logger.error(error);
			});
		}
    }
})();
