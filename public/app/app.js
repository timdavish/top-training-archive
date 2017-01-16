
angular.module('main', ['ui.router'])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'AuthCtrl',
                //controllerAs: 'vm',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: '/views/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('home', {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts) {
                        return posts.getAllPosts();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/views/posts.html',
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
                controller: 'EventsCtrl',
                resolve: {
                    eventPromise: ['events', function(events) {
                        return events.getEvents();
                    }]
                }
            })
            .state('event', {
                url: '/events/{id}',
                templateUrl: '/app/event/eventdetail.html',
                controller: 'EventCtrl',
                resolve: {
                    event: ['$stateParams', 'events', function($stateParams, events) {
                        return events.getEvent($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);
