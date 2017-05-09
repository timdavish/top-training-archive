/**
 * Capitalize First Filter
 * @namespace Filters
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .filter('capitalizeFirst', capitalizeFirst);

    /**
     * @namespace capitalizeFirst
     * @desc Filter for capitalizing the first letter of a string
     * @memberof Filters
     */
    function capitalizeFirst() {
        return function(input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    }
})();
