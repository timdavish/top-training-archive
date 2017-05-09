/**
 * Capitalize First All Filter
 * @namespace Filters
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .filter('capitalizeFirstAll', capitalizeFirstAll);

    /**
     * @namespace capitalizeFirstAll
     * @desc Filter for capitalizing the first letter of every word in a string
     * @memberof Filters
     */
    function capitalizeFirstAll() {
        return function(input) {
			var output = '';
			var words = input.split(' ');
			words.forEach(function(word) {
				output += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
			});

            return output.trim();
        };
    }
})();
