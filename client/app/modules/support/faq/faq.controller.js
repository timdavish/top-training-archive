/**
 * Controller for faq.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.faq')
        .controller('FAQController', FAQController);

    FAQController.$inject = [];

    /**
     * @namespace FAQController
     * @desc FAQ controller
     * @memberof Controllers
     */
    function FAQController() {
        var vm = this;

    }
})();
