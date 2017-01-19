/**
 * Controller for post-list.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('PostListController', PostListController);

    PostListController.$inject = ['userService', 'postService'];

    function PostListController(userService, postService) {
        var vm = this;
        vm.isLoggedIn = userService.isLoggedIn;

        vm.posts = postService.posts;
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

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

        function incrementUpvotes(post) {
            postService.upvotePost(post);
        };
    }
})();
