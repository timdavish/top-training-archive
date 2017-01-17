/**
 * Navigation controller
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$scope', 'auth'];

    function NavCtrl($scope, auth) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.userName = auth.getUserName;
        $scope.userType = auth.getUserType;
        $scope.logOut = auth.logOut;
    }
})();
