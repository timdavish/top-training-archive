/**
 * Google Auto Complete Directive
 * @namespace Directives
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .directive('googleAutoComplete', googleAutoComplete);

    /**
     * @namespace googleAutoComplete
     * @desc googleAutoComplete directive
     * @memberof Directives
     */
    function googleAutoComplete() {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, element, attributes, model) {
                var input = element[0];
                var options = scope.vm.autocompleteOptions;
                var googleAutoComplete = new google.maps.places.Autocomplete(input, options);

                google.maps.event.addListener(googleAutoComplete, 'place_changed', function() {
                    scope.$apply(function() {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    }
})();
