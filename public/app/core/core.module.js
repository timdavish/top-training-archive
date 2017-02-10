/**
 * Core Module
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app.core', [
        /* Angular modules */
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',

        /* Blocks modules */
        'blocks.exception',
        'blocks.logger',
        'blocks.router',

        /* 3rd Party modules */
        'mwl.calendar'
    ]);
})();
