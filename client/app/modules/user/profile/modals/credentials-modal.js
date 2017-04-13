/**
 * Controller for credentials-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('CredentialsModalController', CredentialsModalController);

    CredentialsModalController.$inject = ['$element', 'close', 'title', 'experience', 'school'];

    /**
     * @namespace CredentialsModalController
     * @desc Credentials Edit Modal Controller
     * @memberof Controllers
     */
    function CredentialsModalController($element, close, title, experience, school) {
        var vm = this;

        vm.title = title;
        vm.experience = experience;
        vm.school = school;

        vm.save = save;
        vm.cancel = cancel;

        /* Functions */

        function save() {
            close({
                status: {
                    save: true
                },
                experience: vm.experience,
                school: vm.school
            }, 0);
        }

        function cancel() {
            $element.modal('hide');
            close({
                status: {
                    save: false
                }
            }, 0);
        }
    }
})();
