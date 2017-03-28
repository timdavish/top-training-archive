/**
 * client/test/modules/user/user.routes.spec.js
 * User routes tests
 * @namespace Tests
 */
(function() { // IIFE structure

	// Suite block
	describe('Unit: User routes', function() {

		// Include modules before each describe or it in this block
		beforeEach(module('app'));

		// Suite block
		describe('State: log-in', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				$httpBackend
				state = 'log-in';

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
				expect(config.wantToReturn).toBeFalsy();
				expect(config.requiresLoggedIn).toBeFalsy();
			});

			// Test
			it('should respond to URL', function() {
				expect($state.href(state)).toEqual('#/log-in');
			});
		});

		// Suite block
		describe('State: sign-up-client', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				state = 'sign-up-client';

			// Inject dependencies
			beforeEach(inject(function(_$state_, _$rootScope_) {
				$state = _$state_;
				$rootScope = _$rootScope_;
			}));

			// Test
			it('should verify state config', function() {
				var config = $state.get(state);

				expect(config.url).toBeDefined();
				expect(config.wantToReturn).toBeFalsy();
				expect(config.requiresLoggedIn).toBeFalsy();
			});

			// Test
			it('should respond to URL', function() {
				expect($state.href(state)).toEqual('#/sign-up-client');
			});
		});

		// Suite block
		describe('State: sign-up-trainer', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				state = 'sign-up-trainer';

			// Inject dependencies
			beforeEach(inject(function(_$state_, _$rootScope_) {
				$state = _$state_;
				$rootScope = _$rootScope_;
			}));

			// Test
			it('should verify state config', function() {
				var config = $state.get(state);

				expect(config.url).toBeDefined();
				expect(config.wantToReturn).toBeFalsy();
				expect(config.requiresLoggedIn).toBeFalsy();
			});

			// Test
			it('should respond to URL', function() {
				expect($state.href(state)).toEqual('#/sign-up-trainer');
			});
		});

		// Suite block
		describe('State: trainer-profile', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				state = 'trainer-profile';

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
				expect(config.requiresLoggedIn).toBeTruthy();
			});

			// Test
			it('should respond to URL', function() {
				expect($state.href(state)).toEqual('#/profile/trainer');
			});
		});
	});
})();
