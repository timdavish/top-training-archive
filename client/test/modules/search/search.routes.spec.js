/**
 * client/test/modules/search/search.routes.spec.js
 * Search routes tests
 * @namespace Tests
 */
(function() { // IIFE structure

	// Suite block
	describe('Unit: Search routes', function() {

		// Include modules before each describe or it in this block
		beforeEach(module('app'));

		// Suite block
		describe('State: search', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				$httpBackend,
				state = 'search';

			// Inject dependencies
			beforeEach(inject(function(_$state_, _$rootScope_, _$httpBackend_) {
				$state = _$state_;
				$rootScope = _$rootScope_;
				$httpBackend = _$httpBackend_;
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
				expect($state.href(state)).toEqual('#/search');
			});
		});

		// Suite block
		describe('State: search/trainer', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				state = 'search/trainer';

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
				expect($state.href(state)).toEqual('#/search/trainer/');
			});
		});
	});
})();
