/**
 * Core Module
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app.core', [
        /* Angular & 3rd Party modules */
        'mwl.calendar',
        'ngAnimate',
        'ngMap',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router'
    ]);
})();
