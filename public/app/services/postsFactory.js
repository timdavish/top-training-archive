/**
 * Posts Factory
 * @namespace Factories
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .factory('posts', posts);

    posts.$inject = ['$http', 'auth'];

    function posts($http, auth) {
        var service = {
            posts: [],
            addPost: addPost,
            getAllPosts: getAllPosts,
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
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            }).success(function(data) {
                service.posts.push(data);
            });
        }

        // Get all posts
        function getAllPosts() {
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
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            }).success(function(data) {
                post.upvotes += 1;
            });
        }

        // Add a comment to a post
        function addComment(id, comment) {
            return $http.post('/posts/' + id + '/comments', comment, {
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            });
        }

        // Upvote a comment
        function upvoteComment(post, comment) {
            return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            }).success(function(data) {
                comment.upvotes += 1;
            });
        }
    }
})();
