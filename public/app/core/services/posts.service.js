/**
 * postService Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('postService', postService);

    postService.$inject = ['$http', 'authService'];

    /**
     * @namespace postService
     * @desc Service factory for posts
     * @memberof Services
     */
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
            return $http.post('/posts/addPost', post, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                service.posts.push(data);
            });
        }

        // Get all posts
        function getPosts() {
            return $http.get('/posts/getPosts').success(function(data) {
                angular.copy(data, service.posts);
            });
        }

        // Get a single post by id
        function getPost(id) {
            return $http.get('/posts/getPost/' + id).then(function(res) {
                return res.data;
            });
        }

        // Upvote a post
        function upvotePost(post) {
            return $http.put('/posts/upvotePost/' + post._id, null, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                post.upvotes += 1;
            });
        }

        // Add a comment to a post
        function addComment(id, comment) {
            return $http.post('/posts/addComment/' + id, comment, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            });
        }

        // Upvote a comment
        function upvoteComment(post, comment) {
            return $http.put('/posts/upvoteComment/' + post._id + '/comments/' + comment._id, null, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                comment.upvotes += 1;
            });
        }
    }
})();
