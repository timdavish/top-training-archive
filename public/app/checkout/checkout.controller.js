/**
 * Controller for checkout.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.checkout')
        .controller('CheckoutController', CheckoutController);

    CheckoutController.$inject = ['authentication'];

    /**
     * @namespace CheckoutController
     * @desc Checkout controller
     * @memberof Controllers
     */
    function CheckoutController(authentication) {
        var vm = this;

        vm.currentUser = authentication.currentUser;
        vm.package = {
            owner: {
                contact: {
                    firstname: 'Bob',
                    lastname: 'Builder'
                }
            },
            count: 1,
            size: 1,
            price: 25.00
        };
        vm.subtotal = vm.package.price * vm.package.count;
        vm.tax = vm.package.price * .095;
    }
})();
