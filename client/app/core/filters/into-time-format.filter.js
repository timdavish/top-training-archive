/**
 * Into Time Format Filter
 * @namespace Filters
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .filter('intoTimeFormat', intoTimeFormat);

    /**
     * @namespace intoTimeFormat
     * @desc Filter for turning a number into time format
	 * @example
	 *	input = 55, output = '55 minutes'
	 * 	input = 60, output = '1 hour'
	 *	input = 65, output = '1 hour 5 minutes'
     * @memberof Filters
     */
    function intoTimeFormat() {
        return function(input) {
			var hour = Math.floor(input / 60);
			var minute = input % 60;

            var hourSegment;
			if (hour > 0) {
				hourSegment = hour;
				hourSegment += hour > 1 ? ' hours' : ' hour';
			}
			var minuteSegment;
			if (minute > 0) {
				minuteSegment = minute;
				minuteSegment += minute > 1 ? ' minutes' : ' minute';
			}

			return (hourSegment ? hourSegment : '') + (hourSegment && minuteSegment ? ' ' : '') + (minuteSegment ? minuteSegment : '');
        };
    }
})();
