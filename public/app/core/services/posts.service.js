/**
 * Posts Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('postService', postService);

    postService.$inject = ['$http', 'authService'];

    function postService($http, authService) {
        var service = {
            posts: [],
            addPost: addPost,
            getPosts: getPosts,
            getPost: getPost,
            upvotePost: upvotePost,
            addComment: addComment,
            upvoteComment: upvoteComment
        };

        return service;

        /* Functions */

        // Create a new post
        function addPost(post) {
            return $http.post('/posts', post, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                service.posts.push(data);
            });
        }

        // Get all posts
        function getPosts() {
            return $http.get('/posts').success(function(data) {
                angular.copy(data, service.posts);
            });
        }

        // Get a single post by id
        function getPost(id) {
            return $http.get('/posts/' + id).then(function(res) {
                return res.data;
            });
        }

        // Upvote a post
        function upvotePost(post) {
            return $http.put('/posts/' + post._id + '/upvote', null, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                post.upvotes += 1;
            });
        }

        // Add a comment to a post
        function addComment(id, comment) {
            return $http.post('/posts/' + id + '/comments', comment, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            });
        }

        // Upvote a comment
        function upvoteComment(post, comment) {
            return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                comment.upvotes += 1;
            });
        }
    }
})();
