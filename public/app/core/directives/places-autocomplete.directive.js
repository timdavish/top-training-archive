/**
 * Places Autocomplete Directive
 * @namespace Directives
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .directive('placesAutoComplete', placesAutoComplete);

    /**
     * @namespace placesAutoComplete
     * @desc placesAutoComplete directive
     * @memberof Directives
     */
    function placesAutoComplete() {
        return {
            require: 'ngModel',
            link: function(scope, element, attributes, model) {
                var input = element[0];
                var options = {
                    types: ['(cities)'],
                    componentRestrictions: {country: 'US'}
                };

                scope.vm.placesAutoComplete = new google.maps.places.Autocomplete(input, options);

                google.maps.event.addListener(scope.vm.placesAutoComplete, 'place_changed', function() {
                    scope.$apply(function() {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    }
})();
