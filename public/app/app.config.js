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
            .state('login', {
                url: '/login',
                templateUrl: '/app/user/login.html',
                controller: 'LogInController',
                controllerAs: 'vm',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: '/app/user/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('home', {
                url: '/home',
                templateUrl: '/app/common/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts) {
                        return posts.getAllPosts();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/app/common/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts) {
                        return posts.getPost($stateParams.id);
                    }]
                }
            })
            .state('events', {
                url: '/events',
                templateUrl: '/app/event/events.html',
                controller: 'EventsController',
                controllerAs: 'vm',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (!auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }],
                resolve: {
                    eventPromise: ['eventService', function(eventService) {
                        return eventService.getEvents();
                    }]
                }
            })
            .state('event', {
                url: '/events/{id}',
                templateUrl: '/app/event/eventdetail.html',
                controller: 'EventDetailController',
                controllerAs: 'vm',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (!auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }],
                resolve: {
                    event: ['$stateParams', 'eventService', function($stateParams, eventService) {
                        return eventService.getEvent($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
})();
