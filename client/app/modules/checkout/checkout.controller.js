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

        /**
         * @name contactPanelClick
         * @desc Handles clicking on the contact panel
         * @memberof Controllers.CheckoutController
         */
        function contactPanelClick() {
            // console.log(step);
            if (vm.selectedStep !== 1) {
                contactPanelShow();
            }
        }

        /**
         * @name contactPanelShow
         * @desc Handles showing the contact panel
         * @memberof Controllers.CheckoutController
         */
        function contactPanelShow() {
            vm.selectedStep = 1;

            switchToPanel("checkout-collapse1");
        }

        /**
         * @name contactContinue
         * @desc Handles clicking on the contact panel continue button
         * @memberof Controllers.CheckoutController
         */
        function contactContinue() {
            if (validContactInput()) {
                step = 2;

                paymentPanelShow();
            }
        }

        /**
         * @name paymentPanelClick
         * @desc Handles clicking on the summary & payment panel
         * @memberof Controllers.CheckoutController
         */
        function paymentPanelClick() {
            // console.log(step);
            if (vm.selectedStep !== 2 && step >= 2) {
                paymentPanelShow();
            }
        }

        /**
         * @name paymentPanelShow
         * @desc Handles showing the summary & payment panel
         * @memberof Controllers.CheckoutController
         */
        function paymentPanelShow() {
            vm.selectedStep = 2;

            switchToPanel("checkout-collapse2");
        }

        /**
         * @name paymentContinue
         * @desc Handles clicking on the summary & payment panel order button
         * @memberof Controllers.CheckoutController
         */
        function paymentContinue() {
            if (validPaymentInput()) {
                step = 3;

                confirmationPanelShow();
            }
        }

        /**
         * @name confirmationPanelClick
         * @desc Handles clicking on the order confirmation panel
         * @memberof Controllers.CheckoutController
         */
        function confirmationPanelClick() {
            // console.log(step);
            if (vm.selectedStep !== 3 && step >= 3) {
                confirmationPanelShow();
            }
        }

        /**
         * @name confirmationPanelShow
         * @desc Handles showing the order confirmation panel
         * @memberof Controllers.CheckoutController
         */
        function confirmationPanelShow() {
            vm.selectedStep = 3;

            switchToPanel("checkout-collapse3");
        }

        /**
         * @name switchToPanel
         * @desc Helper function: handles hiding current panel and showing another
         * @memberof Controllers.CheckoutController
         */
        function switchToPanel(panel) {
            var toHide = angular.element(document.getElementsByClassName("panel-collapse collapse in"));
            var toShow = angular.element(document.getElementById(panel));

            toHide.collapse('hide');
            toShow.collapse('show');
        }

        /**
         * @name validContactInput
         * @desc Helper function: validates contact information panel fields
         * @memberof Controllers.CheckoutController
         */
        function validContactInput() {
            return (vm.name && !vm.name === '' && vm.number && !vm.number === '' || true);
        }

        /**
         * @name validPaymentInput
         * @desc Helper function: validates payment panel fields
         * @memberof Controllers.CheckoutController
         */
        function validPaymentInput() {
            return true;
        }
    }
})();
