/**
 * Module config
 * @namespace Configurations
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    /**
     * @namespace config
     * @desc Configuration for main module
     * @memberof Configurations
     */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/app/layout/home.ejs'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/app/user/login.ejs',
                controller: 'LogInController',
                controllerAs: 'vm',
                onEnter: ['$state', 'userService', function($state, userService) {
                    if (userService.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: '/app/user/register.ejs',
                controller: 'RegisterController',
                controllerAs: 'vm',
                onEnter: ['$state', 'userService', function($state, userService) {
                    if (userService.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('posts', {
                url: '/posts',
                templateUrl: '/app/post/post-list.ejs',
                controller: 'PostListController',
                controllerAs: 'vm',
                resolve: {
                    postPromise: ['postService', function(postService) {
                        return postService.getPosts();
                    }]
                }
            })
            .state('post', {
                url: '/posts/{id}',
                templateUrl: '/app/post/post-detail.ejs',
                controller: 'PostDetailController',
                controllerAs: 'vm',
                resolve: {
                    post: ['$stateParams', 'postService', function($stateParams, postService) {
                        return postService.getPost($stateParams.id);
                    }]
                }
            })
            .state('events', {
                url: '/events',
                templateUrl: '/app/event/event-list.ejs',
                controller: 'EventListController',
                controllerAs: 'vm',
                resolve: {
                    eventPromise: ['eventService', function(eventService) {
                        return eventService.getEvents();
                    }]
                }
            })
            .state('event', {
                url: '/events/{id}',
                templateUrl: '/app/event/event-detail.ejs',
                controller: 'EventDetailController',
                controllerAs: 'vm',
                resolve: {
                    event: ['$stateParams', 'eventService', function($stateParams, eventService) {
                        return eventService.getEvent($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
})();
