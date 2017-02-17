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
    function ProfileController() {
        var vm = this;

    }
})();
