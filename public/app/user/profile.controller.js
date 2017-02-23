/**
 * Controller for profile.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state', 'authentication'];

    /**
     * @namespace ProfileController
     * @desc SignUpClient controller
     * @memberof Controllers
     */
    function ProfileController($state, authentication) {
        var vm = this;
        var model = authentication.getPayload(authentication.getToken());
        // var model = authentication.currentUser; // This does similar to the above

        console.log(model);

        //ref Users.js - UserSchema
        vm.userType = model.usertype;
        vm.contact = model.contact;
        vm.accounts = model.accounts;
        vm.data = model.data;
        vm.clientInfo = model.clientInfo;
        vm.trainerInfo = model.trainerInfo;
        vm.tempTrainerInfo = vm.trainerInfo;
        vm.sports = model.sports;
        vm.packages = model.packages;
        vm.tempPackages = vm.packages;
        vm.events = model.events;
        vm.summary = model.summary;
        vm.tempSummary = vm.summary;

        vm.experience = model.experience;
        vm.tempExperience = vm.experience;
        vm.reviews = model.reviews;

        // Editing variables
        vm.editing = false;
        vm.changes = false;
        vm.editField = '';

        vm.setEditField = setEditField;
        vm.commitEdits = commitEdits;
        vm.cancelEdits = cancelEdits;

        vm.AddReview = addReview;
        vm.AddEvent = addEvent;

        /* Functions */

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
