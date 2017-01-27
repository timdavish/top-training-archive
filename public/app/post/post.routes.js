/**
 * Post routes
 * @namespace Configurations
 */
(function() {
    'use strict';

    angular
        .module('main')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'posts',
                config: {
                    url: '/posts',
                    templateUrl: 'app/post/post-list.ejs',
                    controller: 'PostListController',
                    controllerAs: 'vm',
                    title: 'Posts',
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
                    templateUrl: 'app/post/post-detail.ejs',
                    controller: 'PostDetailController',
                    controllerAs: 'vm',
                    title: 'Post',
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
