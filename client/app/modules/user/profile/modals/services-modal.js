/**
 * Controller for services-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('ServicesModalController', ServicesModalController);

    ServicesModalController.$inject = ['$element', 'close', 'title', 'ages', 'positions', 'specialties'];

    /**
     * @namespace ServicesModalController
     * @desc Credentials Edit Modal Controller
     * @memberof Controllers
     */
    function ServicesModalController($element, close, title, ages, positions, specialties) {
        var vm = this;

        vm.title = title;
        vm.ages = ages.toString();
        vm.positions = positions.toString();
        vm.specialties = specialties.toString();

        vm.save = save;
        vm.cancel = cancel;

        /* Functions */

        function save() {
            close({
                status: {
                    save: true
                },
				services: {
	                ages: vm.ages.split(','),
	                positions: vm.positions.split(','),
	                specialties: vm.specialties.split(',')
				}
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
