/**
 * Controller for profile.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state', 'ModalService', 'authentication'];

    /**
     * @namespace ProfileController
     * @desc SignUpClient controller
     * @memberof Controllers
     */
    function ProfileController($state, ModalService, authentication) {
        var vm = this;
        // vm.model = authentication.currentUser();
        vm.model = {
            usertype: "trainer",
            trainerInfo: {
                reviews: [
                    {
                        author: "Crispy Chicken Nugget",
                        rating: 5,
                        type: "Verified Client",
                        content: "This is the best trainer I've ever had. Blah blah blah blah blah blah blah blah"
                    },
                    {
                        author: "Bill Cosby",
                        rating: 1,
                        type: "Testimonial",
                        content: "This is the worst trainer I've ever had. Blah blah blah blah blah blah blah blah"
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
                                "Position 1",
                                "Position 2"
                            ],
                            specialties: [
                                "Specialty 1",
                                "Specialty 2"
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
                            experience: 0,
                            school: "College/University"
                        },
                        services: {
                            ages: [
                                "Middle School",
                                "High School"
                            ],
                            positions: [
                                "Position 1",
                                "Position 2"
                            ],
                            specialties: [
                                "Specialty 1",
                                "Specialty 2"
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
        // Editing variables
        vm.editing = false;
        vm.changes = false;
        vm.editField = '';
        console.log(vm.model);

        // var model = authentication.getPayload(authentication.getToken());
        // console.log(model);
        // //ref Users.js - UserSchema
        // vm.userType = model.usertype;
        // vm.contact = model.contact;
        // vm.accounts = model.accounts;
        // vm.data = model.data;
        // vm.clientInfo = model.clientInfo;
        // vm.trainerInfo = model.trainerInfo;
        // vm.tempTrainerInfo = vm.trainerInfo;
        // vm.sports = model.sports;
        // vm.packages = model.packages;
        // vm.tempPackages = vm.packages;
        // vm.events = model.events;
        // vm.summary = model.summary;
        // vm.tempSummary = vm.summary;
        //
        // vm.experience = model.experience;
        // vm.tempExperience = vm.experience;
        // vm.reviews = model.reviews;


        vm.openModal = openModal;
        vm.edit = edit;
        vm.setEditField = setEditField;
        vm.commitEdits = commitEdits;
        vm.cancelEdits = cancelEdits;

        /* Functions */

        function openModal(type, set) {
            var templateUrl;
            var controller;
            var inputs;

            if (type === 'summary') {
                templateUrl = 'public/app/core/partials/edit-modal.html';
                controller = 'YesNoController';
                inputs = {
                    title: type,
                    summary: set.summary
                };
            }
            console.log(set.summary);
            console.log(inputs);

            ModalService.showModal({
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: 'vm',
                inputs: inputs,
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result.status.save) {
                        set.summary = result.summary;
                    }
                    console.log(result);
                    console.log(set.summary);
                });
            });
        }

        function edit(item) {
            vm.editingItem = {  };
        }

        function setEditField(field) {
            // Check for changes
            if (!vm.changes) {
                // Changes haven't been made, so toggle new edit field
                vm.editing = true;
                vm.editField = field;
            } else {
                // Changes have been made somewhere, alert the user before toggling new edit field
                alert('You have unsaved changes');
            }
        }

        function commitEdits() {
            // Reset editing variables
            vm.editing = false;
            vm.changes = false;
            vm.editField = '';

            vm.summary = vm.tempSummary;
            vm.experience = vm.tempExperience;
            vm.trainerInfo = vm.tempTrainerInfo;
            vm.packages = vm.tempPackages;
        }

        function cancelEdits() {
            // Reset editing variables
            vm.editing = false;
            vm.changes = false;
            vm.editField = '';

            vm.tempSummary = vm.summary;
            vm.tempExperience = vm.experience;
            vm.tempTrainerInfo = vm.tempTrainerInfo;
            vm.tempPackages = vm.packages;
        }

        /**
        *@name addReview
        *@desc Adds a review to the selected profile.
        (if you want to do this here)
        *@memberof Controllers.ProfileController
        */
        function addReview(){
          //Do an addreview
          //todo: add/remove
        }
        /**
        *@name addEvent
        *@desc Add's an event to the list
         (if you want to do this here.)
         *@memberof Controllers.ProfileController
        */
        function addEvent(){
          //Add an event
          //todo: add/remove
        }


    }
})();
