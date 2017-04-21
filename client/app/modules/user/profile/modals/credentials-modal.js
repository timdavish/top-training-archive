/**
 * Controller for credentials-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('CredentialsModalController', CredentialsModalController);

    CredentialsModalController.$inject = ['$element', 'close', 'title', 'credentials'];

    /**
     * @namespace CredentialsModalController
     * @desc Credentials Edit Modal Controller
     * @memberof Controllers
     */
    function CredentialsModalController($element, close, title, credentials) {
        var vm = this;

        vm.title = title;
        vm.tempCredentials = angular.copy(credentials);

        vm.save = save;
        vm.cancel = cancel;

        /* Functions */

        function save() {
            close({
                status: {
                    save: true
                },
                credentials: vm.tempCredentials
            }, 0);
        }

        function cancel() {
            close({
                status: {
                    save: false
                }
            }, 0);
        }
    }
})();
