/**
 * click-to-edit Directive
 * @namespace Directives
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .directive('clickToEdit', clickToEdit);

    clickToEdit.$inject = ['$timeout'];

    /**
     * @namespace clickToEdit
     * @desc clickToEdit directive
     * @memberof Directives
     */
    function clickToEdit($timeout) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            transclude: true,
            replace: true,
            scope: {
                model: '=ngModel',
                type: '@'
            },
            template:
                '<div class="templateRoot">'+
                    '<div>'+
                        '<div ng-show="!editing" ng-click="toggle()">{{model}}<div class="edit-pencil glyphicon glyphicon-pencil"></div></div>'+
                        '<input class="inputText" type="text" ng-model="localModel" ng-enter="save()" ng-show="editing && type == \'inputText\'" />' +
                    '</div>'+
                    '<div ng-show="editing">'+
                        '<div class="glyphicon glyphicon-ok" ng-click="save()"></div>'+
                        '<div class="glyphicon glyphicon-remove" ng-click="cancel()"></div>'+
                    '</div>'+
                '</div>',
            link: function(scope, element, attributes, model) {
                scope.editing = false;
                scope.localModel = scope.model;

                scope.save = save;
                scope.cancel = cancel;
                scope.toggle = toggle;

                /* Functions */

                function save() {
                    scope.model = scope.localModel;
                    scope.toggle();
                }

                function cancel() {
                    scope.localModel = scope.model;
                    scope.toggle();
                }

                function toggle() {
                    scope.editing = !scope.editing;

                    // Search by class
                    var x1 = element[0].querySelector("." + scope.type);

                    $timeout(function() {
                        scope.editing ? x1.focus() : x1.blur();
                    }, 0);
                }
            }
        };
    }
})();
