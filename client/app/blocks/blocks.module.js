/**
 * Blocks Module
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app.blocks', [
        /* Blocks modules */
        'blocks.exception',
        'blocks.logger',
        'blocks.router'
    ]);
})();
