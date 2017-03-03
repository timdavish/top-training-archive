/**
 * Controller for profile.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state', 'authentication', 'ModalService'];

    /**
     * @namespace ProfileController
     * @desc SignUpClient controller
     * @memberof Controllers
     */
    function ProfileController($state, authentication, ModalService) {
        var vm = this;

        // vm.model = authentication.currentUser();
        vm.panes = {};
        vm.model = {
            usertype: "trainer",
            trainerInfo: {
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
                        rating: 3,
                        title: "An Alright Trainer",
                        content: "Wasn't the greatest or the worst trainer I've ever had. Blah blah blah blah blah blah blah blah",
                        date: "January 2, 2017"
                    }
                ],
                locations: [
                    {
                        type: "Point",
                        coordinates: [
                            -122.3,
                            47.6
                        ]
                    },
                    {
                        type: "Point",
                        coordinates: [
                            -100.3,
                            47.6
                        ]
                    }
                ],
                sports: [
                    {
                        sport: "basketball",
                        packages: [
                            {
                                count: 1,
                                size: 1,
                                price: 30
                            },
                            {
                                count: 2,
                                size: 1,
                                price: 25
                            },
                            {
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
                                count: 1,
                                size: 1,
                                price: 30
                            },
                            {
                                count: 2,
                                size: 1,
                                price: 25
                            },
                            {
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
        vm.sport = vm.model.trainerInfo.sports[0].sport;
        console.log(vm.model);

        vm.openModal = openModal;

        activate();

        /* Functions */

        function activate() {
            // Set profile panes
            vm.panes = {
                summary: 'summary',
                locations: 'locations',
                packages: 'packages',
                credentials: 'credentials',
                services: 'services'
            };
        }

        function openModal(pane, data) {
            var templateUrl;
            var controller;
            var inputs;
            var error;

            if (pane === vm.panes.summary) {
                templateUrl = 'public/app/user/modals/summary-modal.html';
                controller = 'SummaryModalController';
                inputs = {
                    summary: data.summary
                };
            } else if (pane === vm.panes.locations) {
                error = 'TODO: edit training locations';
            } else if (pane === vm.panes.packages) {
                error = 'TODO: edit packages';
            } else if (pane === vm.panes.credentials) {
                templateUrl = 'public/app/user/modals/credentials-modal.html';
                controller = 'CredentialsModalController';
                inputs = {
                    experience: data.credentials.experience,
                    school: data.credentials.school
                };
            } else if (pane === vm.panes.services) {
                templateUrl = 'public/app/user/modals/services-modal.html';
                controller = 'ServicesModalController';
                inputs = {
                    ages: data.services.ages,
                    positions: data.services.positions,
                    specialties: data.services.specialties
                };
            }

            // Make sure everything is set
            if (templateUrl && controller && inputs) {
                inputs.title = pane;

                ModalService.showModal({
                    templateUrl: templateUrl,
                    controller: controller,
                    controllerAs: 'vm',
                    inputs: inputs,
                }).then(function(modal) {
                    modalOnClose(modal, pane);
                });
            } else if (error) {
                console.log(error);
            }

            function modalOnClose(modal, pane) {
                modal.element.modal();
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
                });
            }
        }
    }
})();
