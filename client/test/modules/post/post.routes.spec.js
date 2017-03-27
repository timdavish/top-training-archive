/**
 * client/test/modules/post/post.routes.spec.js
 * Post routes tests
 * @namespace Tests
 */
(function() { // IIFE structure

	// Suite block
	describe('Unit: Post routes', function() {

		// Include modules before each describe or it in this block
		beforeEach(module('app'));

		// Suite block
		describe('State: posts', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				state = 'posts';

			// Inject dependencies
			beforeEach(inject(function(_$state_, _$rootScope_) {
				$state = _$state_;
				$rootScope = _$rootScope_;
			}));

			// Test
			it('should verify state config', function() {
				var config = $state.get(state);

				expect(config.url).toBeDefined();
				expect(config.wantToReturn).toBeTruthy();
				expect(config.requiresLoggedIn).toBeFalsy();
			});

			// Test
			it('should respond to URL', function() {
				expect($state.href(state)).toEqual('#/posts');
			});
		});

		// Suite block
		describe('State: post', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				state = 'post';

			// Inject dependencies
			beforeEach(inject(function(_$state_, _$rootScope_) {
				$state = _$state_;
				$rootScope = _$rootScope_;
			}));

			// Test
			it('should verify state config', function() {
				var config = $state.get(state);

				expect(config.url).toBeDefined();
				expect(config.wantToReturn).toBeTruthy();
				expect(config.requiresLoggedIn).toBeFalsy();
			});

			// Test
			it('should respond to URL', function() {
				expect($state.href(state)).toEqual('#/posts/');
			});
		});
	});
})();
