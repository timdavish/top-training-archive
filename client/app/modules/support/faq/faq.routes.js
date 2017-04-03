/**
 * FAQ routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('support.faq')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for layout routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc FAQ routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'faq',
                config: {
                    url: '/support/faq',
                    templateUrl: 'client/app/modules/support/faq/faq.html',
                    controller: 'FAQController',
                    controllerAs: 'vm',
                    title: 'FAQ',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
            {
                state: 'faq/articles',
                config: {
                    url: '/support/faq/articles/{articleId}',
                    templateUrl: 'client/app/modules/support/faq/faq-article.html',
                    controller: 'FAQArticleController',
                    controllerAs: 'vm',
                    title: 'Article',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            }
        ];
    }
})();
