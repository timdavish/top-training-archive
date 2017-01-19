/**
 * Main controller
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'userService', 'posts'];

    function MainCtrl($scope, userService, posts) {
        $scope.isLoggedIn = userService.isLoggedIn;
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
})();
