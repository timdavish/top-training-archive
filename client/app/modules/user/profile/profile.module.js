/**
 * Profile Module
 * @namespace Modules
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular.module('user.profile', [
		'profile.client',
		'profile.trainer'
	]);
})();
