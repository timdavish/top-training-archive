/**
 * Core Module
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app.core', [
        /* Angular modules */
        'ui.router',

        /* Blocks modules */
        'blocks.exception',
        'blocks.logger',
        'blocks.router',

        /* 3rd Party modules */
        'mwl.calendar',
        'ui.bootstrap',
        'ngAnimate'
    ]);
})();
