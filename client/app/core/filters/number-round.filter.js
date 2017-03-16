/**
 * Number Round Filter
 * @namespace Filters
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .filter('numberRound', numberRound);

    numberRound.$inject = ['$locale', 'numberFilter'];

    /**
     * @namespace numberRound
     * @desc Filter for rounding a number
     * @memberof Filters
     */
    function numberRound($locale, numberFilter) {
        var formats = $locale.NUMBER_FORMATS;

        return function(input, fractionSize) {
            // Get formatted value
            var formattedValue = numberFilter(input, fractionSize);

            // Get the decimalSepPosition
            var decimalIdx = formattedValue.indexOf(formats.DECIMAL_SEP);

            // If no decimal just return
            if (decimalIdx === -1) { return formattedValue; }

            // Build rounded number
            var whole = formattedValue.substring(0, decimalIdx);
            var decimal = (Number(formattedValue.substring(decimalIdx)) || "").toString();

            return whole + decimal.substring(1);
        }
    }
})();
