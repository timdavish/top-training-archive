/**
 * Module declarations
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
        // 'app.core',
        // 'app.widgets',
        'blocks.router',

        /* Feature Areas */
        'app.layout',
        'app.user',
        'app.event',
        'app.post'
    ]);
})();
