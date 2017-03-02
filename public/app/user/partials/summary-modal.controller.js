/**
 * Controller for summary-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.user')
        .controller('SummaryModalController', SummaryModalController);

    SummaryModalController.$inject = ['$element', 'close', 'title', 'summary'];

    /**
     * @namespace SummaryModalController
     * @desc Summary Edit Modal Controller
     * @memberof Controllers
     */
    function SummaryModalController($element, close, title, summary) {
        var vm = this;

        vm.title = title;
        vm.summary = summary;

        vm.save = save;
        vm.cancel = cancel;

        /* Functions */

        function save() {
            close({
                status: {
                    save: true
                },
                summary: vm.summary
            }, 500);
        }

        function cancel() {
            $element.modal('hide');
            close({
                status: {
                    save: false
                }
            }, 500);
        }
    }
})();
