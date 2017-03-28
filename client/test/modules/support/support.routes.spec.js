/**
 * client/test/modules/support/support.routes.spec.js
 * Support routes tests
 * @namespace Tests
 */
(function() { // IIFE structure

	// Suite block
	describe('Unit: Support routes', function() {

		// Include modules before each describe or it in this block
		beforeEach(module('app'));

		// Suite block
		describe('State: contact', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				$httpBackend,
				state = 'contact';

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
				expect($state.href(state)).toEqual('#/support/contact');
			});
		});

		// Suite block
		describe('State: faq', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				$httpBackend,
				state = 'faq';

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
				expect($state.href(state)).toEqual('#/support/faq');
			});
		});

		// Suite block
		describe('State: faq/articles', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				$httpBackend,
				state = 'faq/articles';

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
				expect($state.href(state)).toEqual('#/support/faq/articles/');
			});
		});

		// Suite block
		describe('State: privacy', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				$httpBackend,
				state = 'privacy';

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
				expect($state.href(state)).toEqual('#/support/privacy');
			});
		});

		// Suite block
		describe('State: terms-of-service', function() {
			// Global variables inside this block
			var $state,
				$rootScope,
				$httpBackend,
				state = 'terms-of-service';

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
				expect($state.href(state)).toEqual('#/support/terms-of-service');
			});
		});
	});
})();
