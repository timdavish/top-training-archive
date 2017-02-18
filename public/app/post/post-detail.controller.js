/**
 * Controller for post-detail.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.post')
        .controller('PostDetailController', PostDetailController);

    PostDetailController.$inject = ['authentication', 'postService', 'post'];

    /**
     * @namespace PostDetailController
     * @desc Post detail controller
     * @memberof Controllers
     */
    function PostDetailController(authentication, postService, post) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn;
        vm.post = post;

        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;

        /* Functions */

        /**
         * @name addComment
         * @desc Adds a comment to a post
         * @memberof Controllers.PostDetailController
         */
        function addComment() {
            if (vm.body === '') { return; }
            postService.addComment(post._id, {
                body: vm.body
            }).success(function(comment) {
                vm.post.comments.push(comment);
            })
            // reset scope variables to be blank so that they aren't reloaded
            // back into the page again
            vm.body = '';
        };

        /**
         * @name incrementUpvotes
         * @desc Increments the upvotes on a comment
         * @param {comment} comment The comment to increment upvotes for
         * @memberof Controllers.PostDetailController
         */
        function incrementUpvotes(comment) {
            postService.upvoteComment(post, comment);
        };
    }
})();
