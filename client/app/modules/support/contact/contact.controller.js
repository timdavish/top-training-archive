/**
 * Controller for contact.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.contact')
        .controller('ContactController', ContactController);

    ContactController.$inject = [];

    /**
     * @namespace ContactController
     * @desc Contact controller
     * @memberof Controllers
     */
    function ContactController() {
        var vm = this;

    }
})();
