/**
 * support.contact.routes.spec
 * @namespace Tests
 */

 // Suite block
 describe('Unit: support.contact routes', function() {

 	// Include modules before each describe or it in this block
 	beforeEach(module('app'));

 	// Suite block
 	describe('State: contact-us', function() {
 		// Global variables inside this block
 		var $state,
 			$rootScope,
 			$httpBackend,
 			state = 'contact-us';

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
});
