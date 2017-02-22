/**
 * Controller for profile.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state','authentication'];

    /**
     * @namespace ProfileController
     * @desc SignUpClient controller
     * @memberof Controllers
     */
    function ProfileController($state,authentication) {
        var vm = this;
        var model = authentication.getPayload(authentication.getToken());
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
        vm.reviews = model.reviews;

        vm.editSummary = false;
        vm.editPackages = false;
        vm.editSports = false;
        vm.editTrainerInfo = false;

        vm.CommitAllEdits = CommitAllEdits;
        vm.CancelAllEdits = CancelAllEdits;
        vm.AddReview = addReview;
        vm.AddEvent = addEvent;
        /**
        */
        function CommitAllEdits(){
            vm.summary = vm.tempSummary;
            vm.trainerInfo = vm.tempTrainerInfo;
            vm.packages = vm.tempPackages;
            vm.editTrainerInfo = false;
            vm.editSport=false;
            vm.editPackages=false;
            vm.editSummary = false;
        }
        function CancelAllEdits(){
          vm.tempSummary = vm.summary;
          vm.tempTrainerInfo = vm.tempTrainerInfo;
          vm.tempPackages = vm.packages;
          vm.editTrainerInfo = false;
          vm.editSport = false;
          vm.editPackages=false;
          vm.editSummary=false;
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
