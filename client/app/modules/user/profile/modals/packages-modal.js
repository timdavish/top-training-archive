/**
 * Controller for packages-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('PackagesModalController', PackagesModalController);

    PackagesModalController.$inject = ['$element', 'close', 'title', 'packages'];

    /**
     * @namespace PackagesModalController
     * @desc Credentials Edit Modal Controller
     * @memberof Controllers
     */
    function PackagesModalController($element, close, title, packages) {
        var vm = this;

        vm.title = title;
        vm.tempPackages = angular.copy(packages);

        vm.save = save;
        vm.cancel = cancel;
		vm.addPackage = addPackage;

        /* Functions */

        function save() {
            close({
                status: {
                    save: true
                },
                packages: vm.tempPackages
            }, 0);
        }

        function cancel() {
            close({
                status: {
                    save: false
                }
            }, 0);
        }

		function addPackage() {
			vm.tempPackages.push({});
		}
    }
})();
