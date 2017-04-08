/**
 * postService Factory
 * @namespace Services
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.core')
        .factory('postService', postService);

    postService.$inject = ['$http', 'authentication'];

    /**
     * @namespace postService
     * @desc Service factory for posts
     * @memberof Services
     */
    function postService($http, authentication) {
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
		 * @return {promise} Resolved/rejected promise with post data
         * @memberof Services.postService
         */
        function addPost(post) {
			var headers = {
                headers: { Authorization: 'Bearer ' + authentication.getToken() }
            };
            return $http.post('/posts/addPost', post, headers)
				.then(addPostSuccess);

			/* Functions */

			function addPostSuccess(data) {
				service.posts.push(data);
			}
        }

        /**
         * @namespace getPosts
         * @desc Get all posts
		 * @return {promise} Resolved/rejected promise with post data
         * @memberof Services.postService
         */
        function getPosts() {
            return $http.get('/posts/getPosts')
				.then(getPostsSuccess);

			/* Functions */

			function getPostsSuccess(data) {
				angular.copy(data, service.posts);
			}
        }

        /**
         * @namespace getPost
         * @desc Get a single post by id
         * @param {id} id The id of the post to get
		 * @return {promise} Resolved/rejected promise with post data
         * @memberof Services.postService
         */
        function getPost(id) {
            return $http.get('/posts/getPost/' + id)
				.then(getPostsSuccess);

			/* Functions */

			function getPostsSuccess(data) {
				return data.data;
			}
        }

        /**
         * @namespace upvotePost
         * @desc Upvote a post
         * @param {post} post The post to upvote
		 * @return {promise} Resolved/rejected promise
         * @memberof Services.postService
         */
        function upvotePost(post) {
			var headers = {
                headers: { Authorization: 'Bearer ' + authentication.getToken() }
            };

            return $http.put('/posts/upvotePost/' + post._id, null, headers)
				.then(upVotePostSuccess);

			/* Functions */

			function upVotePostSuccess() {
				// Add to post's upvotes
				post.upvotes += 1;
			}
        }

        /**
         * @namespace addComment
         * @desc Add a comment to a post
         * @param {id} id The id of the post to add a comment to
         * @param {comment} comment The comment to add to the post
		 * @return {promise} Resolved/rejected promise with comment data
         * @memberof Services.postService
         */
        function addComment(id, comment) {
			var headers = {
                headers: { Authorization: 'Bearer ' + authentication.getToken() }
            };

            return $http.post('/posts/addComment/' + id, comment, headers);
        }

        /**
         * @namespace upvoteComment
         * @desc Upvote a comment
         * @param {post} post The post that the comment is pinned to
         * @param {comment} comment The comment to upvote
		 * @return {promise} Resolved/rejected promise
         * @memberof Services.postService
         */
        function upvoteComment(post, comment) {
			var headers = {
                headers: { Authorization: 'Bearer ' + authentication.getToken() }
            };

            return $http.put('/posts/upvoteComment/' + post._id + '/comments/' + comment._id, null, headers)
				.then(upvoteCommentSuccess);

			/* Functions */

			function upvoteCommentSuccess() {
				// Add to comment's upvotes
				comment.upvotes += 1;
			}
        }
    }
})();
