/**
 * Controller for edit-modal.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .controller('YesNoController', YesNoController);

    YesNoController.$inject = ['$scope', '$element', 'close', 'title', 'summary'];

    /**
     * @namespace YesNoController
     * @desc YesNo controller
     * @memberof Controllers
     */
    function YesNoController($scope, $element, close, title, summary) {
        var vm = this;

        vm.title = title;
        vm.summary = summary;

        vm.save = save;
        vm.cancel = cancel;

        /* Functions */

        function save() {
            console.log('Saving changes and closing modal..');
            close({
                status: {
                    save: true
                },
                summary: vm.summary
            }, 500);
        }

        function cancel() {
            console.log('Discarding changes and closing modal..');

            $element.modal('hide');

            close({
                status: {
                    save: false
                }
            }, 500);
        }
    }
})();
