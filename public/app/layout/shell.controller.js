/**
 * Controller for shell.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = [];

    function ShellController() {}
})();
