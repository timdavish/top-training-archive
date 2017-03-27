/**
 * Controller for faq.html
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.faq')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['articleId'];

    /**
     * @namespace ArticleController
     * @desc Article controller
     * @memberof Controllers
     */
    function ArticleController(articleId) {
        var vm = this;

        vm.articleSource = 'client/app/modules/support/faq/articles/' + articleId + '.html';

        vm.getArticle = getArticle;

        /* Functions */

        function getArticle() {
            return vm.articleSource;
        }
    }
})();
