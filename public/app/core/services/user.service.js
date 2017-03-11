(function() { //IIFE
    'use strict'; //We're Strict

    var mongoose = require('mongoose');

    angular.module('app.core')
        .factory('userService', userService);


    userService.$inject = ['$http', 'authentication'];

    function userService($http, authentication) {
        var service = {
            user: {},
            getUser: getUser

        };
        return service;
        var getUser = function(id) {
            return $http.get('/posts/' + id).success(function(data) {
                angular.copy(data, user);
            });
        };

    }
})();