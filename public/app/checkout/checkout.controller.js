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
        var step = 1;
        vm.selectedStep = 1;

        // Contact panel
        vm.contactPanelClick = contactPanelClick;
        vm.contactPanelShow = contactPanelShow;
        vm.contactContinue = contactContinue;
        // Summary panel
        vm.paymentPanelClick = paymentPanelClick;
        vm.paymentPanelShow = paymentPanelShow;
        vm.paymentContinue = paymentContinue;
        // Confirmation panel
        vm.confirmationPanelClick = confirmationPanelClick;
        vm.confirmationPanelShow = confirmationPanelShow;

        /* Functions */

        function contactPanelClick() {
            // console.log(step);
            if (vm.selectedStep !== 1) {
                contactPanelShow();
            }
        }

        function contactPanelShow() {
            vm.selectedStep = 1;

            var toHide = angular.element(document.getElementsByClassName("panel-collapse collapse in"));
            var toShow = angular.element(document.getElementById("checkout-collapse1"));

            toHide.collapse('hide');
            toShow.collapse('show');
        }

        function contactContinue() {
            if (validContactInput()) {
                step = 2;

                paymentPanelShow();
            }
        }

        function paymentPanelClick() {
            // console.log(step);
            if (vm.selectedStep !== 2 && step >= 2) {
                paymentPanelShow();
            }
        }

        function paymentPanelShow() {
            vm.selectedStep = 2;

            var toHide = angular.element(document.getElementsByClassName("panel-collapse collapse in"));
            var toShow = angular.element(document.getElementById("checkout-collapse2"));

            toHide.collapse('hide');
            toShow.collapse('show');
        }

        function paymentContinue() {
            if (validPaymentInput()) {
                step = 3;

                confirmationPanelShow();
            }
        }

        function confirmationPanelClick() {
            // console.log(step);
            if (vm.selectedStep !== 3 && step >= 3) {
                confirmationPanelShow();
            }
        }

        function confirmationPanelShow() {
            vm.selectedStep = 3;

            var toHide = angular.element(document.getElementsByClassName("panel-collapse collapse in"));
            var toShow = angular.element(document.getElementById("checkout-collapse3"));

            toHide.collapse('hide');
            toShow.collapse('show');
        }

        function validContactInput() {
            return (vm.name && !vm.name === '' && vm.number && !vm.number === '' || true);
        }

        function validPaymentInput() {
            return true;
        }
    }
})();
