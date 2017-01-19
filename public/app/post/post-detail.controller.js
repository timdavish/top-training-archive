/**
 * Controller for post-detail.ejs
 * @namespace Controllers
 */
(function() { // IIFE structure
    'use strict'; // Strict mode

    angular
        .module('main')
        .controller('PostDetailController', PostDetailController);

    PostDetailController.$inject = ['userService', 'posts', 'post'];

    function PostDetailController(userService, posts, post) {
        var vm = this;
        vm.isLoggedIn = userService.isLoggedIn;
        vm.post = post;
        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;

        function addComment() {
            if (vm.body === '') { return; }
            posts.addComment(post._id, {
                body: vm.body
            }).success(function(comment) {
                vm.post.comments.push(comment);
            })
            // reset scope variables to be blank so that they aren't reloaded
            // back into the page again
            vm.body = '';
        };

        function incrementUpvotes(comment) {
            posts.upvoteComment(post, comment);
        };
    }
})();
