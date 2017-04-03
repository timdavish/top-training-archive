/**
 * Support routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.support')
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
     * @desc Support routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'contact',
                config: {
                    url: '/support/contact',
                    templateUrl: 'client/app/modules/support/contact/contact.html',
                    controller: 'ContactController',
                    controllerAs: 'vm',
                    title: 'Contact',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
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
                    url: '/support/faq/article/articles/{id}',
                    templateUrl: 'client/app/modules/support/faq/article/article.html',
                    controller: 'ArticleController',
                    controllerAs: 'vm',
                    title: 'Article',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    resolve: {
                        articleId: ['$stateParams', function($stateParams) {
                            return $stateParams.id;
                        }]
                    }
                }
            },
            {
                state: 'privacy',
                config: {
                    url: '/support/privacy',
                    templateUrl: 'client/app/modules/support/privacy/privacy.html',
                    controller: '',
                    controllerAs: 'vm',
                    title: 'Privacy',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            },
            {
                state: 'terms-of-service',
                config: {
                    url: '/support/terms-of-service',
                    templateUrl: 'client/app/modules/support/terms/terms-of-service.html',
                    controller: '',
                    controllerAs: 'vm',
                    title: 'Terms Of Service',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false // Require login at this state
                }
            }
        ];
    }
})();
