/**
 * Controller for profile.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [];

    /**
     * @namespace ProfileController
     * @desc SignUpClient controller
     * @memberof Controllers
     */
    function ProfileController(model) {
        var vm = this;
        //ref Users.js - UserSchema
        vm.userType = model.usertype;
        vm.contact = model.contact;
        vm.accounts = model.accounts;
        vm.data = model.data;
        vm.clientInfo = model.clientInfo;
        vm.trainerInfo = model.trainerInfo;
        vm.sports = model.sports;
        vm.packages = model.packages;
        vm.events = model.events;
        vm.summary = model.summary;
        vm.experience = model.experience;
        vm.reviews = model.reviews;

        vm.AddReview = addReview;
        vm.AddEvent = addEvent;
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
