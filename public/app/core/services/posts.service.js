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

        /**
         * @namespace addPost
         * @desc Adds a new post
         * @param {post} post The post to add
         * @memberof Services.postService
         */
        function addPost(post) {
            return $http.post('/posts/addPost', post, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                service.posts.push(data);
            });
        }

        /**
         * @namespace getPosts
         * @desc Get all posts
         * @memberof Services.postService
         */
        function getPosts() {
            return $http.get('/posts/getPosts').success(function(data) {
                angular.copy(data, service.posts);
            });
        }

        /**
         * @namespace getPost
         * @desc Get a single post by id
         * @param {id} id The id of the post to get
         * @memberof Services.postService
         */
        function getPost(id) {
            return $http.get('/posts/getPost/' + id).then(function(res) {
                return res.data;
            });
        }

        /**
         * @namespace upvotePost
         * @desc Upvote a post
         * @param {post} post The post to upvote
         * @memberof Services.postService
         */
        function upvotePost(post) {
            return $http.put('/posts/upvotePost/' + post._id, null, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                post.upvotes += 1;
            });
        }

        /**
         * @namespace addComment
         * @desc Add a comment to a post
         * @param {id} id The id of the post to add a comment to
         * @param {comment} comment The comment to add to the post
         * @memberof Services.postService
         */
        function addComment(id, comment) {
            return $http.post('/posts/addComment/' + id, comment, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            });
        }

        /**
         * @namespace upvoteComment
         * @desc Upvote a comment
         * @param {post} post The post that the comment is pinned to
         * @param {comment} comment The comment to upvote
         * @memberof Services.postService
         */
        function upvoteComment(post, comment) {
            return $http.put('/posts/upvoteComment/' + post._id + '/comments/' + comment._id, null, {
                headers: { Authorization: 'Bearer ' + authService.getToken() }
            }).success(function(data) {
                comment.upvotes += 1;
            });
        }
    }
})();
