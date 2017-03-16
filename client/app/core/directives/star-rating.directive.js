/**
 * Review Stars Directive
 * @namespace Directives
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .directive('starRating', starRating);

    /**
     * @namespace starRating
     * @desc starRating directive
     * @memberof Directives
     */
    function starRating() {
        return {
            restrict: 'AE',
            scope: {
                rating: '=',
                readonly: '='
            },
            template:   '<ul class="star-rating">' +
                            '<li ng-repeat="star in stars" class="star" ng-click="">' +
                                '<i class="fa {{star.class}}" aria-hidden="true"></i>' +
                            '</li>' +
                        '</ul>',
            link: function(scope, element, attributes) {
                scope.max = 5; // Total number of stars

                if (scope.readonly) {
                    createStars();
                } else {
                    scope.$watch(''), function(oldVal, newVal) {
                        if (newVal) {

                        }
                    }
                }

                function createStars() {
                    scope.stars = [];

                    var base = Math.floor(scope.rating);
                    var decimal = scope.rating - base;

                    for (var i = 1; i <= scope.max; i++) {
                        if (i <= scope.rating) {
                            scope.stars.push({
                                class: 'fa-star'
                            });
                        } else if ((base + 1) === i && decimal >= .333) {
                            scope.stars.push({
                                class: 'fa-star-half-o'
                            });
                        } else {
                            scope.stars.push({
                                class: 'fa-star-o'
                            });
                        }
                    }
                }
            }
        };
    }
})();
