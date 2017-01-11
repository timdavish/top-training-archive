
var app = angular.module('main', ['ui.router']);

// App config for routing
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: '/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts) {
                        return posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);

// Authentication factory
app.factory('auth', ['$http', '$window', function($http, $window) {
    var authFactory = {};
    var tokenName = 'flapper-news-token';

    // Save the token into local storage
    authFactory.saveToken = function(token) {
        $window.localStorage[tokenName] = token;
    };

    // Retrieve the token from local storage
    authFactory.getToken = function() {
        return $window.localStorage[tokenName];
    };

    // Check if the user is logged in
    authFactory.isLoggedIn = function() {
        var token = authFactory.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    // Return the username of the user that's logged in
    authFactory.currentUser = function() {
        if (authFactory.isLoggedIn()) {
            var token = authFactory.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    // Register a new user
    authFactory.register = function(user) {
        return $http.post('/register', user).success(function(data) {
            authFactory.saveToken(data.token);
        });
    };

    // Log in an existing user
    authFactory.logIn = function(user) {
        return $http.post('/login', user).success(function(data) {
            authFactory.saveToken(data.token);
        });
    };

    // Log out a user
    authFactory.logOut = function() {
        $window.localStorage.removeItem(tokenName);
    };

    return authFactory;
}])

// Posts factory
app.factory('posts', ['$http', 'auth', function($http, auth) {
    var postsFactory = {};

    // Contains all posts loaded client-side
    postsFactory.posts = [];

    // Create a new post
    postsFactory.addPost = function(post) {
        return $http.post('/posts', post, {
            headers: { Authorization: 'Bearer ' + auth.getToken() }
        }).success(function(data) {
            postsFactory.posts.push(data);
        });
    };

    // Get all posts
    postsFactory.getAll = function() {
        return $http.get('/posts').success(function(data) {
            angular.copy(data, postsFactory.posts);
        });
    };

    // Get a single post by id
    postsFactory.get = function(id) {
        return $http.get('/posts/' + id).then(function(res){
            return res.data;
        });
    };

    // Upvote a post
    postsFactory.upvotePost = function(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: { Authorization: 'Bearer ' + auth.getToken() }
        }).success(function(data) {
            post.upvotes += 1;
        });
    };

    // Add a comment to a post
    postsFactory.addComment = function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: { Authorization: 'Bearer ' + auth.getToken() }
        });
    };

    // Upvote a comment
    postsFactory.upvoteComment = function(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: { Authorization: 'Bearer ' + auth.getToken() }
        }).success(function(data) {
            comment.upvotes += 1;
        });
    };

    return postsFactory;
}]);

// Authentication controller
app.controller('AuthCtrl', [
    '$scope',
    '$state',
    'auth',
    function($scope, $state, auth) {
        $scope.user = {};

        $scope.register = function() {
            auth.register($scope.user).error(function(error) {
                $scope.error = error;
            }).then(function() {
                $state.go('home');
            });
        };

        $scope.logIn = function() {
            auth.logIn($scope.user).error(function(error) {
                $scope.error = error;
            }).then(function() {
                $state.go('home');
            });
        };
    }
]);

// Main controller
app.controller('MainCtrl', [
    '$scope',
    'auth',
    'posts',
    function($scope, auth, posts) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.posts = posts.posts;

        $scope.addPost = function() {
            if (!$scope.title || $scope.title === '') { return; }
            posts.addPost({
                title: $scope.title,
                link: $scope.link
            });
            // reset scope variables to be blank so that they aren't reloaded
            // back into the form again
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post) {
            posts.upvotePost(post);
        };
    }
]);

// Navigation controller
app.controller('NavCtrl', [
    '$scope',
    'auth',
    function($scope, auth) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
    }
]);

// Posts controller
app.controller('PostsCtrl', [
    '$scope',
    'auth',
    'posts',
    'post',
    function($scope, auth, posts, post) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.post = post;

        $scope.addComment = function() {
            if ($scope.body === '') { return; }
            posts.addComment(post._id, {
                body: $scope.body,
                author: 'user'
            }).success(function(comment) {
                $scope.post.comments.push(comment);
            })
            // reset scope variables to be blank so that they aren't reloaded
            // back into the page again
            $scope.body = '';
        };

        $scope.incrementUpvotes = function(comment) {
            posts.upvoteComment(post, comment);
        };
    }
]);
