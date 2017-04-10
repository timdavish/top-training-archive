/**
 * user.authentication.signup-trainer.spec
 * @namespace Tests
 */

// Suite block
describe('Unit: user.authentication.signup-trainer', function() {

	// Include modules before each describe or it in this block
	beforeEach(module('app'));

	// Suite block
	describe('Page: signup-trainer', function() {
		// Global variables inside this block
		var render,
			element,
			ctrl,
			scope;

		// Inject dependencies
		beforeEach(inject(function($injector) {
			var routeDetails = compileRouteTemplateWithController($injector, 'signup-trainer', 'SignUpTrainerController');

			ctrl = routeDetails.controller;
			scope = routeDetails.scope;

			render = function() {
				element = routeDetails.render();
			};
		}));
	});
});
