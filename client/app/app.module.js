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
        'app.blocks',
        'app.core',

        /* Feature Areas */
        'app.calendar',
        'app.checkout',
        'app.event',
        'app.layout',
        'app.post',
        'app.search',
        'app.user'
    ]);
})();
