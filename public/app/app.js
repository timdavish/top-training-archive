
angular.module('main', ['ui.router'])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/app/common/login.html',
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
                templateUrl: '/app/common/register.html',
                controller: 'AuthCtrl',
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
                controller: 'EventsCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (!auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }],
                resolve: {
                    eventPromise: ['events', function(events) {
                        return events.getEvents();
                    }]
                }
            })
            .state('event', {
                url: '/events/{id}',
                templateUrl: '/app/event/eventdetail.html',
                controller: 'EventDetailCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (!auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }],
                resolve: {
                    event: ['$stateParams', 'events', function($stateParams, events) {
                        return events.getEvent($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);
