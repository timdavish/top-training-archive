/**
 * Controller for post-list.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('app.post')
        .controller('PostListController', PostListController);

    PostListController.$inject = ['userService', 'postService'];

    /**
     * @namespace PostListController
     * @desc Post list controller
     * @memberof Controllers
     */
    function PostListController(userService, postService) {
        var vm = this;

        vm.isLoggedIn = userService.isLoggedIn;
        vm.posts = postService.posts;

        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

        /* Functions */

        /**
         * @name addPost
         * @desc Adds a post
         * @memberof Controllers.PostListController
         */
        function addPost() {
            if (!vm.title || vm.title === '') { return; }
            postService.addPost({
                title: vm.title,
                link: vm.link
            });
            // reset scope variables to be blank so that they aren't reloaded
            // back into the form again
            vm.title = '';
            vm.link = '';
        };

        /**
         * @name incrementUpvotes
         * @desc Increments the upvotes on a post
         * @param {post} post The post to increment upvotes for
         * @memberof Controllers.PostListController
         */
        function incrementUpvotes(post) {
            postService.upvotePost(post);
        };
    }
})();
