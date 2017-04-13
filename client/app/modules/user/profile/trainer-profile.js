/**
 * Controller for trainer-profile.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('TrainerProfileController', TrainerProfileController);

    TrainerProfileController.$inject = ['$q', '$state', 'authentication', 'location', 'modal', 'logger'];

    /**
     * @namespace TrainerProfileController
     * @desc Trainer profile controller
     * @memberof Controllers
     */
    function TrainerProfileController($q, $state, authentication, location, modal, logger) {
        var vm = this;

		// Search determines whether this profile is viewed from search or not
		// True = get trainer model from api
		// True = show back button, don't show edit buttons
		// False = get trainer model from authentication
		// False = don't show back button, show edit buttons
		vm.search = $state.current.search;
        vm.model = {};
		vm.sport = '';
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
				setMapMarkers(),
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
			if (vm.search) {
				// Get our model from api
				// var id = $state.params.id;
			} else {
				// Get our model from authentication
				// vm.model = authentication.currentUser();
			}
			vm.model = {
	            usertype: "trainer",
	            trainerInfo: {
	                rating: 4.34,
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
	                reviews: [
	                    {
	                        author: "Tom Riddle",
	                        type: "Verified Client",
	                        rating: 5,
	                        title: "Highly Recommend",
	                        content: "This is the best trainer I've ever had. Blah blah blah blah blah blah blah blah",
	                        date: "February 21, 2017"
	                    },
	                    {
	                        author: "Bill Cosby",
	                        type: "Testimonial",
	                        rating: 4,
	                        title: "An Alright Trainer",
	                        content: "Wasn't the greatest or the worst trainer I've ever had. Blah blah blah blah blah blah blah blah",
	                        date: "January 2, 2017"
	                    }
	                ],
	                sports: [
	                    {
	                        sport: "basketball",
	                        packages: [
	                            {
	                                _id: 1,
	                                count: 1,
	                                size: 1,
	                                price: 30
	                            },
	                            {
	                                _id: 2,
	                                count: 2,
	                                size: 1,
	                                price: 25
	                            },
	                            {
	                                _id: 3,
	                                count: 5,
	                                size: 1,
	                                price: 22
	                            }
	                        ],
	                        events: [],
	                        summary: "NBA, College, High School; I've worked at every level. As a clinician for Converse for 7 years I specialized in teaching skills and prepping athletes. Learn fundamentals!",
	                        credentials: {
	                            experience: 7,
	                            school: "University of Washington"
	                        },
	                        services: {
	                            ages: [
	                                "Middle School",
	                                "High School"
	                            ],
	                            positions: [
	                                "Guard",
	                                "Forward",
	                                "Center"
	                            ],
	                            specialties: [
	                                "Shooting",
	                                "Defense"
	                            ]
	                        }
	                    },
	                    {
	                        sport: "baseball",
	                        packages: [
	                            {
	                                _id: 4,
	                                count: 1,
	                                size: 1,
	                                price: 30
	                            },
	                            {
	                                _id: 5,
	                                count: 2,
	                                size: 1,
	                                price: 25
	                            },
	                            {
	                                _id: 6,
	                                count: 5,
	                                size: 1,
	                                price: 22
	                            }
	                        ],
	                        events: [],
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
	                ]
	            },
	            clientInfo: {
	                events: [],
	                savedTrainers: [],
	                activeTrainers: [],
	                activeEvents: [],
	                activeSessions: []
	            },
	            data: {
	                lastActive: "2017-02-20T23:05:59.460Z",
	                created: "2017-02-20T23:05:59.460Z"
	            },
	            accounts: {
	                local: {
	                    hash: "b2df4a52b92180b8b9b67e6df2218692c27c154d89f7c35cc665dfe494990baf3b6e9981cf055c98154c994c3ea833fa8b5dec18a4bc19fe29a26ef00f6597b0",
	                    salt: "c524e64db380a8b44674ee7a6decc54c"
	                }
	            },
	            contact: {
	                lastname: "Builder",
	                firstname: "Bob",
	                email: "bob@asdf.com"
	            }
	        };
		}

		/**
         * @name setSport
         * @desc Sets the profile sport
         * @memberof Controllers.TrainerProfileController
         */
        function setSport() {
			vm.sport = vm.model.trainerInfo.sports[0].sport;
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
         * @name setMapMarkers
         * @desc Sets the markers on the map
         * @memberof Controllers.TrainerProfileController
         */
		function setMapMarkers() {
			var deferred = $q.defer();

			if (vm.model && vm.model.trainerInfo.locations) {
				vm.model.trainerInfo.locations.forEach(function(location) {
					vm.mapMarkers += '&markers=color:0xffce49';
					vm.mapMarkers += '|label:' + location.priority;
					vm.mapMarkers += '|' + location.geometry.coordinates[1] + ',' + location.geometry.coordinates[0];
				});
				deferred.resolve();
			} else {
				deferred.reject('Error getting trainer locations');
			}

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
	                error = 'TODO: edit training locations';
					inputs = {};
	            } else if (pane === vm.panes.packages) {
	                error = 'TODO: edit packages';
					inputs = {};
	            } else if (pane === vm.panes.credentials) {
	                templateUrl = 'client/app/modules/user/profile/modals/credentials-modal.html';
	                controller = 'CredentialsModalController';
	                inputs = {
	                    experience: data.credentials.experience,
	                    school: data.credentials.school
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
                    inputs: inputs
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

					if (pane === vm.panes.summary) {
						data.summary = result.summary;
					} else if (pane === vm.panes.locations) {

					} else if (pane === vm.panes.packages) {

					} else if (pane === vm.panes.credentials) {
						data.credentials.experience = result.experience;
						data.credentials.school = result.school;
					} else if (pane === vm.panes.services) {
						data.services.ages = result.ages;
						data.services.positions = result.positions;
						data.services.specialties = result.specialties;
					}

				}
			})
			.catch(function(error) {
				logger.error(error);
			});
		}
    }
})();
