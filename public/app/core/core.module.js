/**
 * Module declarations
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app.core', [
        /* Angular modules */
        'ui.router',
        
        /* Blocks modules */
        'blocks.router'
    ]);
})();
