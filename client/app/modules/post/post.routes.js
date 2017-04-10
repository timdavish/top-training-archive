/**
 * Post routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.post')
        .run(configureStates);

    configureStates.$inject = ['router'];

    /**
     * @namespace configureStates
     * @desc Begins configuration for post routes
     * @memberof Configurations
     */
    function configureStates(router) {
        router.configureStates(getStates());
    }

    /**
     * @namespace getStates
     * @desc Post routes
     * @memberof Configurations
     */
    function getStates() {
        return [
            {
                state: 'posts',
                config: {
                    url: '/posts',
                    templateUrl: 'client/app/modules/post/post-list.html',
                    controller: 'PostListController',
                    controllerAs: 'vm',
                    title: 'Posts',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    resolve: {
                        postPromise: ['postService', function(postService) {
                            return postService.getPosts();
                        }]
                    }
                }
            },
            {
                state: 'post',
                config: {
                    url: '/posts/{id}',
                    templateUrl: 'client/app/modules/post/post-detail.html',
                    controller: 'PostDetailController',
                    controllerAs: 'vm',
                    title: 'Post',
                    wantToReturn: true, // Return to this state after login
                    requiresLoggedIn: false, // Require login at this state
                    resolve: {
                        post: ['$stateParams', 'postService', function($stateParams, postService) {
                            return postService.getPost($stateParams.id);
                        }]
                    }
                }
            }
        ];
    }
})();
