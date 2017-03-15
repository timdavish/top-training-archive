/**
 * Post routes
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.post')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /**
     * @namespace appRun
     * @desc Begins configuration for post routes
     * @memberof Configurations
     */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
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
                    templateUrl: 'public/app/post/post-list.ejs',
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
                    templateUrl: 'public/app/post/post-detail.ejs',
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
