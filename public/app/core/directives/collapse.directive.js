/**
 * Collapse Directive
 * @namespace Directives
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .directive('collapse', collapse);

    function collapse() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                more: '@'
            },
            controller: function ($scope, $element) {
                $scope.opened = false;
                $scope.toggle = function () {
                    $scope.opened = !$scope.opened;
                    $scope.opened ? $scope.more = "Read Less" : $scope.more = "Read More";
                };
            },
            template: '<div class="collapsible">' +
                          '<section ng-transclude ng-class="{opened: opened}"></section>' +
                          '<span class="more" ng-click="toggle()">{{more}}</span>' +
                      '</div>'
        };
    }
}.call(this));
