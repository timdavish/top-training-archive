/**
 * App Constants
 * @namespace Constants
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

	/* global moment: false */
    angular.module('app.core')
        .constant('moment', moment);
})();
