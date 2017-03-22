/**
 * Support Module
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('app.support', [
        /* Support sub-modules */
        'support.about',
        'support.contact',
        'support.faq'
    ]);
})();
