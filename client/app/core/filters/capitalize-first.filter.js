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
        return function(token) {
            return token.charAt(0).toUpperCase() + token.slice(1);
        };
    }
})();
