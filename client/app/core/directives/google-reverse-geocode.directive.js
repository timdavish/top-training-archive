/**
 * Google Reverse Geocode Directive
 * @namespace Directives
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .directive('googleReverseGeocode', googleReverseGeocode);

    /**
     * @namespace googleReverseGeocode
     * @desc googleReverseGeocode directive
     * @memberof Directives
     */
    function googleReverseGeocode() {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                lat: '=',
                long: '='
            },
            link: function (scope, element, attributes, model) {
                var latlng = new google.maps.LatLng(scope.lat, scope.long);

                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            scope.$apply(function() {
                                element.val(results[1].formatted_address);
                                model.$setViewValue(element.val());
                            });
                        }
                    }
                });
            }
        };
    }
})();
