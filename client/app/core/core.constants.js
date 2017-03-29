/**
 * App Constants
 * @namespace Constants
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

	/* global toastr: false, moment: false */
    angular.module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
