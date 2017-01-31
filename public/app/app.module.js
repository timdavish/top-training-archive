/**
 * Main App Module
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app', [
        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'app.core',

        /* Feature Areas */
        'app.layout',
        'app.user',
        'app.calendar',
        'app.event',
        'app.post'
    ]);
})();
