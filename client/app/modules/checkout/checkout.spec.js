/**
 * checkout.spec
 * @namespace Tests
 */

// Suite block
describe('Unit: checkout', function() {

	// Include modules before each describe or it in this block
	beforeEach(module('app'));

	// Suite block
	describe('Page: checkout', function() {
		// Global variables inside this block
		var render,
			element,
			ctrl,
			scope;

		// Inject dependencies
		beforeEach(inject(function($injector) {
			var routeDetails = compileRouteTemplateWithController($injector, 'checkout', 'CheckoutController');

			ctrl = routeDetails.controller;
			scope = routeDetails.scope;

			render = function() {
				element = routeDetails.render();
			};
		}));
	});
});
