/**
 * Equals Directive
 * @namespace Directives
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .directive('backButton', backButton);

		backButton.$inject = ['$window'];

    /**
     * @namespace backButton
     * @desc backButton directive
     * @memberof Directives
     */
    function backButton($window) {
		return {
        restrict: "A",
        link: function (scope, elem) {
            elem.bind("click", function () {
                $window.history.back();
            });
        }
    };
    }
})();
