/**
 * App Constants
 * @namespace Constants
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
