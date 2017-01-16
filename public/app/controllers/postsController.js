/**
 * Posts controller
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('PostsCtrl', PostsCtrl);

    PostsCtrl.$inject = ['$scope', 'auth', 'posts', 'post'];

    function PostsCtrl($scope, auth, posts, post) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.post = post;

        $scope.addComment = function() {
            if ($scope.body === '') { return; }
            posts.addComment(post._id, {
                body: $scope.body
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
})();
